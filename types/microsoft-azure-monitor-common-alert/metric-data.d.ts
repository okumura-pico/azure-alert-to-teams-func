// Alert for metric alerts

import { BaseEssentials } from './essentials';
import { BaseCondition, Metric } from './metric';

export interface MetricAlertContext {
    properties: { [k: string]: string };
    conditionType: string;
    condition: BaseCondition & {
        allOf: Metric[];
    };
}

export interface MetricData {
    essentials: BaseEssentials & {
        signalType: 'Metric';
    };
    alertContext?: MetricAlertContext;
}
