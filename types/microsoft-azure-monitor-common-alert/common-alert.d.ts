import { ActivityLogData } from "./activity-log-data";
import { LogData } from "./log-data";
import { MetricData } from "./metric-data";

export type CommonAlertDataTypeAlias = MetricData | LogData | ActivityLogData;

/**
 * Common alert definition
 */
export interface CommonAlert {
  schemaId?: string;
  data: CommonAlertDataTypeAlias;
  [k: string]: unknown;
}
