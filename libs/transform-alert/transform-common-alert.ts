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

interface MsTeamsAdaptiveCard {
  type: "AdaptiveCard";
  $schema: "http://adaptivecards.io/schemas/adaptive-card.json";
  version: "1.5";
  msTeams: { width: string };
  body?: any;
}

/**
 * 共通アラートを変換
 * @param src
 */
export const transformCommonAlert = async (
  src: CommonAlert
): Promise<MsTeamsAdaptiveCard> => {
  const signalType = src.data.essentials.signalType;
  const transformFunc = transformFuncsBySignalType[signalType];

  if (!transformFunc) {
    throw new Error(`Unknown signal type: ${signalType}`);
  }

  // anyをやめたい
  const body = await transformFunc(src.data as any);

  return {
    type: "AdaptiveCard",
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.5",
    msTeams: { width: "full" },
    body,
  };
};
