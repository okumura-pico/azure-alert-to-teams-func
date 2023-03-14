// Alert for metric alerts

import { BaseAlertData } from "./essentials";
import { BaseCondition, Metric } from "./metric";

export interface MetricAlertContext {
    properties: { [k: string]: string };
    conditionType: string;
    condition: BaseCondition & {
        allOf: Metric[];
    };
}

export interface MetricData extends BaseAlertData<"Metric"> {
    alertContext?: MetricAlertContext;
}
