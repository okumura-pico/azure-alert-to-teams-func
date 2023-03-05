// Alert for log alerts

import { BaseEssentials } from './essentials';
import { BaseCondition, Metric } from './metric';
import { MetricAlertContext } from './metric-data';
import { DateString, Dimension, NumberString, UrlString } from './util';

export interface Table {
    name: string;
    columns: Array<{ name: string; type: string }>;
    rows: string[][];
}

export interface BaseLogAlertContext {
    SearchQuery: string;
    SearchIntervalStartTimeUtc: DateString;
    SearchIntervalEndtimeUtc: DateString;
    ResultCount: number;
    LinkToSearchResults: UrlString;
    LinkToFilteredSearchResultsUI: UrlString;
    LinkToSearchResultsAPI: UrlString;
    LinkToFilteredSearchResultsAPI: UrlString;
    SearchIntervalDurationMin: NumberString;
    SearchIntervalInMinutes: NumberString;
    Threshold: NumberString;
    Operator: string;
    Dimensions: Dimension[];
    SearchResults: Array<{
        tables: Table[];
        dataSources: {
            resourceId: string;
            tables: string[];
        };
    }>;
    IncludedSearchResults: 'True' | 'False';
    AlertType: string;
}

// ** monitoringService = Log Analytics
export type LogAlertLogAnalyticsContext = BaseLogAlertContext & {
    SeverityDescription: string;
    WorkspaceId: string;
    AffectedConfigurationItems: string[];
};

// ** monitoringService = Application Insights
export type LogAlertApplicationInsights = BaseLogAlertContext & {
    ApplicationId: string;
};

// ** monitoringService = Log Alerts V2
export interface LogAlertLogAlertV2Context {
    properties: { [k: string]: string };
    conditionType: string;
    condition: BaseCondition & {
        allOf: Array<
            Metric & {
                searchQuery: string;
                metricMeasureColumn: string;
                targetResourceTypes: string;
                failingPeriods: {
                    numberOfEvaluationPeriods: number;
                    minFailingPeriodsToAlert: number;
                };
                linkToSearchResultsUI: UrlString;
                linkToFilteredSearchResultsUI: UrlString;
                linkToSearchResultsAPI: UrlString;
                linkToFilteredSearchResultsAPI: UrlString;
            }
        >;
    };
}

export interface LogData {
    essentials: BaseEssentials & {
        signalType: 'Log';
    };
    alertContext?: LogAlertLogAnalyticsContext | LogAlertApplicationInsights | LogAlertLogAlertV2Context;
}
