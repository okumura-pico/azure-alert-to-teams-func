import * as card from "adaptivecards";
import { MetricData } from "../../types/microsoft-azure-monitor-common-alert";
import { humanizeCamelCase } from "../string-utils";
import { transformEssentials } from "./transform-essentials";

const extractTitle = (src: MetricData): string | undefined => {
  for (const metric of src.alertContext?.condition?.allOf ?? []) {
    // 先頭の要素だけ返す
    return `${metric.metricName} is ${humanizeCamelCase(metric.operator)} ${
      metric.threshold
    }`;
  }
};

/**
 * Metricアラートを変換
 * @param src
 * @returns
 */
export const transformMetric = async (
  src: MetricData
): Promise<card.AdaptiveCard> => {
  const title = extractTitle(src);
  const essentials = await transformEssentials(
    src.essentials,
    title ?? "Metric Alert !!"
  );
  const dst = new card.AdaptiveCard();

  dst.addItem(essentials);

  return dst;
};
