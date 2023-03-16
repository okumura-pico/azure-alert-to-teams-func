import * as card from "adaptivecards";

// テーブルセル
export const newTableCell = (
  text: string,
  weight = card.TextWeight.Default
): card.TableCell => {
  const cell = new card.TableCell();
  const textBlock = new card.TextBlock(text);

  textBlock.weight = weight;

  cell.addItem(textBlock);

  return cell;
};

// テーブル列定義
export const newColumnDefinition = (
  physicalSize: number
): card.TableColumnDefinition => {
  const columnDef = new card.TableColumnDefinition();
  columnDef.width = new card.SizeAndUnit(physicalSize, card.SizeUnit.Weight);
  return columnDef;
};

// toJSON失敗時用
export const fallbackPropertyBag: card.PropertyBag = {
  type: "TextBlock",
  text: "Serialize error.",
};

// 日時に書式を付けます
export const formatDate = (src: string | undefined): string | undefined => {
  if (src) {
    const date = new Date(src);
    const withoutMilliSec = date.toISOString().split(".")[0] + "Z";
    return "{{DATE(" + withoutMilliSec + ", SHORT)}}";
  }
};
