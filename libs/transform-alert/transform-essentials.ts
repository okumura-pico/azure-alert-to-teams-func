import * as card from "adaptivecards";
import { BaseEssentials } from "../../types/microsoft-azure-monitor-common-alert";
import {
  genAlertUrl,
  genPortalUrl,
  getResourceById,
  ResourceDesc,
} from "../azure-utils";
import {
  fallbackPropertyBag,
  formatDate,
  newColumnDefinition,
  newTableCell,
} from "./adaptive-card-utils";
import { iconFired, iconResolved } from "./config";

if (!process.env["AZURE_TENANT_ID"]) {
  throw new Error("Define `AZURE_TENANT_ID' environment variable.");
}

const tenantId = process.env["AZURE_TENANT_ID"];

const severities = {
  Sev0: "attention", // Critical
  Sev1: "attention", // Error
  Sev2: "warning", // Warning
  Sev3: "accent", // Informational
  Sev4: "default", // Verbose
};

const createTopColumnSet = (src: BaseEssentials, title: string) => {
  let style: undefined | string;
  let icon: string;
  let time: string | undefined;

  if (src.monitorCondition === "Fired") {
    style = severities[src.severity];
    icon = iconFired;
    time = src.firedDateTime;
  } else {
    style = "good";
    icon = iconResolved;
    time = src.resolvedDateTime;
  }

  // left column
  const image = new card.Image();
  image.url = icon;

  const leftColumn = new card.Column();
  leftColumn.width = "auto";
  leftColumn.addItem(image);

  // right column
  const titleText = new card.TextBlock(title);
  titleText.style = "heading";
  const timeText = new card.TextBlock(formatDate(time));
  timeText.isSubtle = true;

  const rightColumn = new card.Column();
  rightColumn.width = "stretch";
  rightColumn.addItem(titleText);
  rightColumn.addItem(timeText);

  // top column set
  const topColumnSet = new card.ColumnSet();
  topColumnSet.style = style;
  topColumnSet.addColumn(leftColumn);
  topColumnSet.addColumn(rightColumn);

  return topColumnSet;
};

const newResourceTableRow = (resource: ResourceDesc): card.TableRow => {
  const row = new card.TableRow();

  // 1列目はAzure Portalへのリンクにします
  row.addCell(
    newTableCell(
      `[${resource.name ?? "Resource not found"}](${genPortalUrl(resource)})`
    )
  );
  row.addCell(newTableCell(resource.resourceGroup ?? "―"));
  row.addCell(newTableCell(resource.location ?? "―"));

  return row;
};

// リソース表示用のテーブルを作成します
const newResourceTable = (): card.Table => {
  const table = new card.Table();

  table.addColumn(newColumnDefinition(1));
  table.addColumn(newColumnDefinition(1));
  table.addColumn(newColumnDefinition(1));

  const headerRow = new card.TableRow();
  headerRow.style = "Emphasis";
  headerRow.addCell(newTableCell("名前", card.TextWeight.Bolder));
  headerRow.addCell(newTableCell("グループ", card.TextWeight.Bolder));
  headerRow.addCell(newTableCell("ロケーション", card.TextWeight.Bolder));

  table.addRow(headerRow);

  return table;
};

// table of resources
const createResourceTable = async (
  alertTargetIDs: string[]
): Promise<card.Table | card.TextBlock> => {
  try {
    const table = newResourceTable();
    const resources = await Promise.all(
      alertTargetIDs.map((x) => getResourceById(x))
    );

    resources.forEach((resource) =>
      table.addRow(newResourceTableRow(resource))
    );

    return table;
  } catch (err) {
    console.log(err);

    const errText = "⚠ Cannot retrieve Azure Resource information.\n" + err;
    const errBlock = new card.TextBlock(errText);
    errBlock.size = card.TextSize.Small;

    return errBlock;
  }
};

// link button
const createLinkButton = (src: BaseEssentials) => {
  const action = new card.OpenUrlAction();
  action.title = "アラートを開く";
  action.url = genAlertUrl(tenantId, src.alertId);
  const actionSet = new card.ActionSet();
  actionSet.addAction(action);

  return actionSet;
};

// fact set
const createFactSet = (src: BaseEssentials) => {
  const factSet = new card.FactSet();
  factSet.spacing = card.Spacing.Large;
  factSet.facts.push(new card.Fact("Alert Rule", src.alertRule));
  factSet.facts.push(new card.Fact("Severity", src.severity));
  factSet.facts.push(new card.Fact("Description", src.description));

  return factSet;
};

/**
 * 共通Essential部分を変換
 * 
 * @param src
 * @param title
 * @returns
 */
export const transformEssentials = async (
  src: BaseEssentials,
  title: string
): Promise<card.PropertyBag[]> => {
  // card.Container を toJSON すると、
  // card.Tableの列定義が失われてしまうので、
  // containerではなく配列を返す

  // container
  const container: card.PropertyBag[] = [];

  container.push(
    createTopColumnSet(src, title).toJSON() ?? fallbackPropertyBag
  );

  if (src.alertTargetIDs) {
    const table = await createResourceTable(src.alertTargetIDs);
    container.push(table.toJSON() ?? fallbackPropertyBag);
  }

  container.push(createLinkButton(src).toJSON() ?? fallbackPropertyBag);
  container.push(createFactSet(src).toJSON() ?? fallbackPropertyBag);

  return container;
};
