import * as card from "adaptivecards";
import { BaseEssentials } from "../../types/microsoft-azure-monitor-common-alert";
import { genAlertUrl, getResourceById } from "../azure-utils";
import {
  formatDate,
  newResourceTable,
  newResourceTableRow,
} from "./adaptive-card-utils";
import { iconFired, iconResolved } from "./config";

const severities = {
  Sev0: "Attention",
  Sev1: "Attention",
  Sev2: "Warning",
  Sev3: "Accent",
  Sev4: "Accent",
};

export const transformEssentials = async (
  src: BaseEssentials,
  title: string
): Promise<card.CardElement> => {
  let style: undefined | string;
  let icon: string;
  let time: string | undefined;

  if (src.monitorCondition === "Fired") {
    style = severities[src.severity];
    icon = iconFired;
    time = src.firedDateTime;
  } else {
    style = "Good";
    icon = iconResolved;
    time = src.resolvedDateTime;
  }

  // container
  const container = new card.Container();

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
  topColumnSet.bleed = true;
  topColumnSet.style = style;
  topColumnSet.addColumn(leftColumn);
  topColumnSet.addColumn(rightColumn);

  container.addItem(topColumnSet);

  // table of resources
  if (src.alertTargetIDs) {
    const table = newResourceTable();

    const resources = await Promise.all(
      src.alertTargetIDs.map((x) => getResourceById(x))
    );

    resources.forEach((resource) =>
      table.addRow(newResourceTableRow(resource))
    );

    container.addItem(table);
  }

  // link button
  const action = new card.OpenUrlAction();
  action.title = "アラートを開く";
  action.url = genAlertUrl(src.alertId);
  const actionSet = new card.ActionSet();
  actionSet.addAction(action);

  container.addItem(actionSet);

  // fact set
  const factSet = new card.FactSet();
  factSet.spacing = card.Spacing.Large;
  factSet.facts.push(new card.Fact("Alert Rule", src.alertRule));
  factSet.facts.push(new card.Fact("Severity", src.severity));
  factSet.facts.push(new card.Fact("Description", src.description));

  container.addItem(factSet);

  return container;
};
