// Alert for log alerts

import { BaseEssentials } from "./essential";
import { Condition, Metric } from "./metric";
import { MetricAlertContext } from "./metric-data";
import { DateString, Dimension, NumberString, UrlString } from "./util";

interface Table {
  name: string;
  columns: Array<{ name: string; type: string }>;
  rows: Array<Array<string>>;
}

interface BaseLogAlertContext {
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
  Threshold: Number;
  Operator: string;
  Dimensions: Array<Dimension>;
  SearchResults: {
    tables: Array<Table>;
    dataSources: Array<{
      resourceId: string;
      tables: Array<string>;
    }>;
  };
  IncludedSearchResults: "True" | "False";
  AlertType: string;
}

// ** monitoringService = Log Analytics
export type LogAlertLogAnalyticsContext = BaseLogAlertContext & {
  SeverityDescription: string;
  WorkspaceId: string;
  AffectedConfigurationItems: Array<string>;
};

// ** monitoringService = Application Insights
export type LogAlertApplicationInsights = BaseLogAlertContext & {
  ApplicationId: string;
};

// ** monitoringService = Log Alerts V2
export type LogAlertLogAlertV2Context = MetricAlertContext & {
  condition: Condition & {
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
};

export interface LogData {
  essentials: BaseEssentials & {
    signalType: "Log";
  };
  alertContext?:
    | LogAlertLogAnalyticsContext
    | LogAlertApplicationInsights
    | LogAlertLogAlertV2Context;
}
