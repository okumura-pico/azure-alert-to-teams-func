import { DateString, Dimension } from './util';

export interface Metric {
    metricName: string;
    metricNamespace: string | null;
    operator: 'Equals' | 'GreaterThan' | 'GreaterThanOrEqual' | 'LessThan' | 'LessThanOrEqual';
    threshold: string;
    timeAggregation: 'Average' | 'Total' | 'Sum' | 'Count' | 'Minimum' | 'Maximum' | string;
    dimensions: Dimension[];
    metricValue: number;
    alertSensitivity: string;
    failingPeriods: {
        numberOfEvaluationPeriods: number;
        minFailingPeriodsToAlert: number;
    };
    ignoreDataBefore: null;
    webTestName: string | null;
}

export interface BaseCondition {
    windowSize: 'PT1M' | 'PT5M' | 'PT15M' | 'PT30M' | 'PT1H' | 'PT6H' | 'PT12H' | 'PT24H';
    windowStartTime: DateString;
    windowEndTime: DateString;
}
