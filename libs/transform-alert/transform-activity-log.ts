import * as card from "adaptivecards";
import { ActivityLogData } from "../../types/microsoft-azure-monitor-common-alert";
import { transformEssentials } from "./transform-essentials";

const extractTitle = (src: ActivityLogData): string | undefined => {
  if (src.alertContext) {
    if ("properties" in src.alertContext) {
      if ("title" in src.alertContext.properties) {
        return src.alertContext.properties.title;
      }

      if ("description" in src.alertContext.properties) {
        return src.alertContext.properties.description;
      }
    }

    return src.alertContext.channels.toString();
  }
};

/**
 * Activity Logアラートを変換
 * @param src
 * @returns
 */
export const transformActivityLog = async (
  src: ActivityLogData
): Promise<card.AdaptiveCard> => {
  const title = extractTitle(src);
  const essentials = await transformEssentials(
    src.essentials,
    title ?? "Activity Log Alert !!"
  );

  const dst = new card.AdaptiveCard();

  dst.addItem(essentials);

  return dst;
};
