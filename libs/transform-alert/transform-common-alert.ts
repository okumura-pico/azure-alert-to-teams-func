import * as card from "adaptivecards";
import { CommonAlert } from "../../types/microsoft-azure-monitor-common-alert";
import { transformActivityLog } from "./transform-activity-log";
import { transformLog } from "./transform-log";
import { transformMetric } from "./transform-metric";

// アラート別変換関数
const transformFuncsBySignalType = {
  "Activity Log": transformActivityLog,
  Log: transformLog,
  Metric: transformMetric,
};

/**
 * 共通アラートを変換
 * @param src
 */
export const transformCommonAlert = (
  src: CommonAlert
): Promise<card.AdaptiveCard> => {
  const signalType = src.data.essentials.signalType;
  const transformFunc = transformFuncsBySignalType[signalType];

  if (!transformFunc) {
    throw new Error(`Unknown signal type: ${signalType}`);
  }

  // anyをやめたい
  return transformFunc(src.data as any);
};
