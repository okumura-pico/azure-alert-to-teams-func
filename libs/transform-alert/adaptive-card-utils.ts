import * as card from "adaptivecards";
import { genPortalUrl, ResourceDesc } from "../azure-utils";

const newTableCell = (
  text: string,
  weight = card.TextWeight.Default
): card.TableCell => {
  const cell = new card.TableCell();
  const textBlock = new card.TextBlock(text);

  textBlock.weight = weight;

  cell.addItem(textBlock);

  return cell;
};

export const newResourceTableRow = (resource: ResourceDesc): card.TableRow => {
  const row = new card.TableRow();

  // 1列目はAzure Portalへのリンクにします
  row.addCell(newTableCell(`[${resource.name}](${genPortalUrl(resource)})}`));
  row.addCell(newTableCell(resource.groupName));
  row.addCell(newTableCell(resource.location ?? "-"));

  return row;
};

// リソース表示用のテーブルを作成します
export const newResourceTable = (): card.Table => {
  const table = new card.Table();
  table.addColumn(new card.TableColumnDefinition());
  table.addColumn(new card.TableColumnDefinition());
  table.addColumn(new card.TableColumnDefinition());

  const headerRow = new card.TableRow();
  headerRow.style = "Emphasis";
  headerRow.addCell(newTableCell("名前", card.TextWeight.Bolder));
  headerRow.addCell(newTableCell("グループ", card.TextWeight.Bolder));
  headerRow.addCell(newTableCell("ロケーション", card.TextWeight.Bolder));

  return table;
};

// 日時に書式を付けます
export const formatDate = (src: string | undefined): string | undefined => {
  if (src) {
    const date = new Date(src);
    const withoutMilliSec = date.toISOString().split(".")[0] + "Z";
    return "{{DATE(" + withoutMilliSec + ", SHORT)}}";
  }
};
