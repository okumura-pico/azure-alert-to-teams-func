import { ResourceGraphClient } from "@azure/arm-resourcegraph";
import { QueryRequest } from "@azure/arm-resourcegraph/esm/models";
import { EnvironmentCredential } from "@azure/identity";

const credential = new EnvironmentCredential();

export interface ResourceDesc {
  id: string;
  name: string;
  tenantId: string;
  resourceGroup: string;
  location: string;
}

/**
 * リソースIDからリソースを返します
 */
export const getResourceById = async (
  resourceId: string
): Promise<ResourceDesc> => {
  const client = new ResourceGraphClient(credential);
  const query: QueryRequest = {
    query: `Resources | where id == '${resourceId}'`,
  };

  const response = await client.resources(query);

  return {
    id: resourceId,
    name: response.data[0]?.name,
    tenantId: response.data[0]?.tenantId,
    resourceGroup: response.data[0]?.resourceGroup,
    location: response.data[0]?.location,
  };
};

/**
 * Azure PortalへのURLを返します
 * @param resource
 */
export const genPortalUrl = (resource: ResourceDesc): string => {
  return (
    "https://portal.azure.com/#@" +
    encodeURIComponent(resource.tenantId) +
    "/resource" +
    resource.id
  );
};

/**
 * Azure Monitor AlertへのURLを返します
 * @param tenantId
 * @param alertId
 * @returns
 */
export const genAlertUrl = (tenantId: string, alertId: string): string =>
  "https://portal.azure.com/" +
  "#@" +
  tenantId +
  "/blade/Microsoft_Azure_Monitoring/AlertDetailsTemplateBlade/alertId/" +
  encodeURIComponent(alertId);
