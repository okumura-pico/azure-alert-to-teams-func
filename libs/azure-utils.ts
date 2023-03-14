import { ResourceManagementClient } from "@azure/arm-resources";
import { EnvironmentCredential } from "@azure/identity";

const apiVersion = process.env.AZURE_API_VERSION;

const credential = new EnvironmentCredential();

const resourceIdPattern = new RegExp(
  "^/subscriptions/(.+?)/resourcegroups/(.+?)/.*",
  "i"
);

const parseResourceId = (
  resourceId: string
): { subscriptionId: string; resourceGroupName: string } => {
  const matches = resourceId.match(resourceIdPattern);

  if (!matches || matches?.length < 3) {
    throw new Error(`Invalid resource id: ${resourceId}`);
  }

  return {
    subscriptionId: matches[1],
    resourceGroupName: matches[2],
  };
};

export interface ResourceDesc {
  tenantId?: string;
  groupName: string;
  id: string;
  name?: string;
  location?: string;
}

/**
 * リソースIDからリソースを返します
 */
export const getResourceById = async (
  resourceId: string
): Promise<ResourceDesc> => {
  const { subscriptionId, resourceGroupName } = parseResourceId(resourceId);
  const client = new ResourceManagementClient(credential, subscriptionId, {apiVersion});

  const resource = await client.resources.getById(
    resourceId,
    client.apiVersion
  );

  return {
    tenantId: resource.identity?.tenantId,
    groupName: resourceGroupName,
    id: resourceId,
    name: resource.name,
    location: resource.location,
  };
};

/**
 * Azure PortalへのURLを返します
 * @param resource
 */
export const genPortalUrl = (resource: ResourceDesc): string => {
  return (
    "https://portal.azure.com/#@" +
    encodeURIComponent(resource.tenantId!) +
    "/resource" +
    resource.id
  );
};

export const genAlertUrl = (alertId: string): string =>
  "https://ms.portal.azure.com/#blade/Microsoft_Azure_Monitoring/AlertDetailsTemplateBlade/alertId/" +
  encodeURIComponent(alertId);
