import { ActivityLogData } from './activity-log-data';
import { LogData } from './log-data';
import { MetricData } from './metric-data';

/**
 * Common alert definition
 * Generated from JSON schema
 */
export interface CommonAlert {
    schemaId?: string;
    data: MetricData | LogData | ActivityLogData;
    [k: string]: unknown;
}
