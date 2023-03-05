import * as AzureMonitor from 'microsoft-azure-monitor-common-alert';

const essentials: AzureMonitor.BaseEssentials = {
    alertId: '',
    alertRule: '',
    severity: 'Sev0',
    monitorCondition: 'Fired',
    monitoringService: '',
    alertTargetIDs: [''],
    originAlertId: '',
    firedDateTime: '',
    resolvedDateTime: '',
    description: '',
    essentialsVersion: '',
    alertContextVersion: '',
};

const metric: AzureMonitor.Metric = {
    metricName: '',
    metricNamespace: null,
    operator: 'Equals',
    threshold: '',
    timeAggregation: 'Average',
    dimensions: [{ name: '', value: '' }],
    metricValue: 1,
    alertSensitivity: '',
    failingPeriods: {
        numberOfEvaluationPeriods: 1,
        minFailingPeriodsToAlert: 1,
    },
    ignoreDataBefore: null,
    webTestName: null,
};

// # Metric alert
const metricAlert: AzureMonitor.CommonAlert = {
    schemaId: '',
    data: {
        essentials: {
            ...essentials,
            signalType: 'Metric',
        },
        alertContext: {
            properties: {},
            conditionType: '',
            condition: {
                windowSize: 'PT1M',
                windowStartTime: '',
                windowEndTime: ',',
                allOf: [metric],
            },
        },
    },
};

// # Log alerts

const baseLogAlertContext: AzureMonitor.BaseLogAlertContext = {
    SearchQuery: '',
    SearchIntervalStartTimeUtc: '',
    SearchIntervalEndtimeUtc: '',
    ResultCount: 1,
    LinkToSearchResults: '',
    LinkToFilteredSearchResultsUI: '',
    LinkToSearchResultsAPI: '',
    LinkToFilteredSearchResultsAPI: '',
    SearchIntervalDurationMin: '',
    SearchIntervalInMinutes: '',
    Threshold: '',
    Operator: '',
    Dimensions: [{ name: '', value: '' }],
    SearchResults: [
        {
            tables: [],
            dataSources: {
                resourceId: '',
                tables: [],
            },
        },
    ],
    IncludedSearchResults: 'True',
    AlertType: '',
};

// ## log analytics
const commonAlertLogAnalytics: AzureMonitor.CommonAlert = {
    schemaId: '',
    data: {
        essentials: {
            ...essentials,
            signalType: 'Log',
        },
        alertContext: {
            ...baseLogAlertContext,
            SeverityDescription: '',
            WorkspaceId: '',
            AffectedConfigurationItems: [],
        },
    },
};

// ## application insights
const commonAlertApplicationInsights: AzureMonitor.CommonAlert = {
    schemaId: '',
    data: {
        essentials: {
            ...essentials,
            signalType: 'Log',
        },
        alertContext: {
            ...baseLogAlertContext,
            ApplicationId: '',
        },
    },
};

// ## log alerts v2
const commonAlertLogAlertV2: AzureMonitor.CommonAlert = {
    schemaId: '',
    data: {
        essentials: {
            ...essentials,
            signalType: 'Log',
        },
        alertContext: {
            properties: {},
            conditionType: '',
            condition: {
                windowSize: 'PT1M',
                windowStartTime: '',
                windowEndTime: ',',
                allOf: [
                    {
                        ...metric,
                        searchQuery: '',
                        metricMeasureColumn: '',
                        targetResourceTypes: '',
                        failingPeriods: {
                            numberOfEvaluationPeriods: 1,
                            minFailingPeriodsToAlert: 1,
                        },
                        linkToSearchResultsUI: '',
                        linkToFilteredSearchResultsUI: '',
                        linkToSearchResultsAPI: '',
                        linkToFilteredSearchResultsAPI: '',
                    },
                ],
            },
        },
    },
};

// # Activity log alerts

const baseActivityLogContext: AzureMonitor.BaseActivityLogContext = {
    authorization: null,
    channels: '',
    correlationId: '',
    eventTimestamp: '',
    eventDataId: '',
    level: '',
    operationName: '',
    operationId: '',
    status: '',
    subStatus: '',
    submissionTimestamp: '',
};

// ## administrative
const commonAlertAdministrative: AzureMonitor.CommonAlert = {
    schemaId: '',
    data: {
        essentials: {
            ...essentials,
            signalType: 'Activity Log',
        },
        alertContext: {
            ...baseActivityLogContext,
            eventSource: '',
            claims: '',
            caller: '',
        },
    },
};

// ## policy
const commonAlertPolicy: AzureMonitor.CommonAlert = {
    schemaId: '',
    data: {
        essentials: {
            ...essentials,
            signalType: 'Activity Log',
        },
        alertContext: {
            ...baseActivityLogContext,
            eventSource: '',
            claims: '',
            caller: '',
            properties: {
                isComplianceCheck: 'True',
                resourceLocation: '',
                ancestors: '',
                policies: '',
            },
        },
    },
};

// ## autoscale
const commonAlertAutoScale: AzureMonitor.CommonAlert = {
    schemaId: '',
    data: {
        essentials: {
            ...essentials,
            signalType: 'Activity Log',
        },
        alertContext: {
            ...baseActivityLogContext,
            eventSource: '',
            claims: '',
            caller: '',
            properties: {
                description: '',
                resourceName: '',
                oldInstancesCount: '',
                newInstancesCount: '',
                activeAutoscaleProfile: '',
                lastScaleActionTime: '',
            },
        },
    },
};

// ## security
const commonAlertSecurity: AzureMonitor.CommonAlert = {
    schemaId: '',
    data: {
        essentials: {
            ...essentials,
            signalType: 'Activity Log',
        },
        alertContext: {
            ...baseActivityLogContext,
            eventSource: '',
            properties: {
                threatStatus: '',
                category: '',
                threatID: '',
                filePath: '',
                protectionType: '',
                actionTaken: '',
                resourceType: '',
                severity: '',
                compromisedEntity: '',
                remediationSteps: '',
                attackedResourceType: '',
            },
        },
    },
};

// ## service health
const commonAlertServiceHealth: AzureMonitor.CommonAlert = {
    schemaId: '',
    data: {
        essentials: {
            ...essentials,
            signalType: 'Activity Log',
        },
        alertContext: {
            ...baseActivityLogContext,
            eventSource: 1,
            claims: null,
            caller: null,
            httpRequest: null,
            properties: {
                title: '',
                service: '',
                region: '',
                communication: '',
                incidentType: '',
                trackingId: '',
                impactStartTime: '',
                impactMitigationTime: '',
                impactedServices: '',
                impactedServicesTableRows: '',
                defaultLanguageTitle: '',
                defaultLanguageContent: '',
                stage: '',
                communicationId: '',
                maintenanceId: '',
                isHIR: 'true',
                version: '',
            },
            ResourceType: null,
        },
    },
};

// ## resource health
const commonAlertResourceHealth: AzureMonitor.CommonAlert = {
    schemaId: '',
    data: {
        essentials: {
            ...essentials,
            signalType: 'Activity Log',
        },
        alertContext: {
            ...baseActivityLogContext,
            eventSource: '',
            properties: {
                title: '',
                details: '',
                currentHealthStatus: '',
                previousHealthStatus: '',
                type: '',
                cause: '',
            },
        },
    },
};
