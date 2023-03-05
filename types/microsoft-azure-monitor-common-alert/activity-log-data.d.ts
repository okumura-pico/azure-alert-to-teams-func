// Alert form activity log alerts

import { BaseEssentials } from './essentials';
import { DateString, NumberString } from './util';

export interface BaseActivityLogContext {
    authorization?: {
        action: string;
        scope: string;
    } | null;
    channels: string | number;
    correlationId: string;
    eventTimestamp: DateString;
    eventDataId: string;
    level: string;
    operationName: string;
    operationId: string;
    status: string;
    subStatus?: string;
    submissionTimestamp: DateString;
}

// ** monitoringService = Activity log - Administrative
export type ActivityLogAlertAdministrativeContext = BaseActivityLogContext & {
    eventSource: string;
    claims: string;
    caller: string;
};

// ** monitoringService = Activity log - Policy
export type ActivityLogAlertPolicyContext = BaseActivityLogContext & {
    eventSource: string;
    claims: string;
    caller: string;
    properties: {
        isComplianceCheck: 'True' | 'False';
        resourceLocation: string;
        ancestors: string;
        policies: string;
    };
};

// ** monitoringService = Activity log - Autoscale
export type ActivityLogAlertAutoScaleContext = BaseActivityLogContext & {
    eventSource: string;
    claims: string;
    caller: string;
    properties: {
        description: string;
        resourceName: string;
        oldInstancesCount: NumberString;
        newInstancesCount: NumberString;
        activeAutoscaleProfile: string;
        lastScaleActionTime: string; // "Wed, 21 Aug 2019 16:17:47 GMT"
    };
};

// ** monitoringService = Activity log - Security
export type ActivityLogAlertSecurityContext = BaseActivityLogContext & {
    eventSource: string;
    properties: {
        threatStatus: string;
        category: string;
        threatID: NumberString;
        filePath: string;
        protectionType: string;
        actionTaken: string;
        resourceType: string;
        severity: string;
        compromisedEntity: string;
        remediationSteps: string;
        attackedResourceType: string;
    };
};

// ** monitoringService = Service health
export type ActivityLogAlertServiceHealthContext = BaseActivityLogContext & {
    eventSource: number;
    claims: string | null;
    caller: string | null;
    httpRequest: string | null;
    properties: {
        title: string;
        service: string;
        region: string;
        communication: string;
        incidentType: string;
        trackingId: string;
        impactStartTime: DateString;
        impactMitigationTime: DateString;
        impactedServices: string;
        impactedServicesTableRows: string;
        defaultLanguageTitle: string;
        defaultLanguageContent: string;
        stage: string;
        communicationId: string;
        maintenanceId: string;
        isHIR: 'true' | 'false';
        version: string;
    };
    ResourceType: string | null;
};

// ** monitoringService = Resource health
export type ActivityLogAlertResourceHealthContext = BaseActivityLogContext & {
    eventSource: string;
    properties: {
        title: string;
        details: string | null;
        currentHealthStatus: string;
        previousHealthStatus: string;
        type: string;
        cause: string;
    };
};

export interface ActivityLogData {
    essentials: BaseEssentials & {
        signalType: 'Activity Log';
    };
    alertContext?:
        | ActivityLogAlertAdministrativeContext
        | ActivityLogAlertPolicyContext
        | ActivityLogAlertAutoScaleContext
        | ActivityLogAlertSecurityContext
        | ActivityLogAlertServiceHealthContext
        | ActivityLogAlertResourceHealthContext;
}
