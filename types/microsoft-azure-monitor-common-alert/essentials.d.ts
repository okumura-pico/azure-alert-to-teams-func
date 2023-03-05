import { DateString } from "./util";

export interface BaseEssentials {
  alertId: string;
  alertRule?: string;
  severity: "Sev0" | "Sev1" | "Sev2" | "Sev3" | "Sev4";
  monitorCondition: "Fired" | "Resolved";
  monitoringService?: string;
  alertTargetIDs?: string[];
  originAlertId?: string;
  firedDateTime?: DateString;
  resolvedDateTime?: DateString;
  description?: string;
  essentialsVersion?: string;
  alertContextVersion?: string;
  [k: string]: unknown;
}
