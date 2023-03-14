import * as card from "adaptivecards";
import { LogData } from "../../types/microsoft-azure-monitor-common-alert";
import { humanizeCamelCase } from "../string-utils";
import { transformEssentials } from "./transform-essentials";

/**
 * Logアラートを変換
 * @param src
 */
export const transformLog = async (
  src: LogData
): Promise<card.AdaptiveCard> => {
  let title = "Log Alert !!"; // 既定値
  let linkToSearchResult = "https://portal.azure.com/"; // 既定値

  if (src.alertContext) {
    if ("AlertType" in src.alertContext) {
      title = src.alertContext.AlertType;
      linkToSearchResult = src.alertContext.LinkToFilteredSearchResultsUI;
    } else {
      // Log alert v2 schema
      for (const metric of src.alertContext.condition.allOf) {
        // 先頭の要素を使う
        title = `${metric.metricName} is ${humanizeCamelCase(metric.operator)}`;
        linkToSearchResult = metric.linkToFilteredSearchResultsUI;
        break;
      }
    }
  }

  const essentials = await transformEssentials(src.essentials, title);
  const dst = new card.AdaptiveCard();

  dst.addItem(essentials);

  // ログ表示ボタン
  const openUrl = new card.OpenUrlAction();
  openUrl.title = "ログを開く";
  openUrl.url = linkToSearchResult;
  const actionSet = new card.ActionSet();
  actionSet.addAction(openUrl);

  dst.addItem(actionSet);

  return dst;
};
