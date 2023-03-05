// Alert for metric alerts

import { BaseEssentials } from "./essential";
import { Condition } from "./metric";

export interface MetricAlertContext {
  properties: { [k: string]: string };
  conditionType: string;
  condition: Condition;
}

export interface MetricData {
  essentials: BaseEssentials & {
    signalType: "Metric";
  };
  alertContext?: MetricAlertContext;
}
