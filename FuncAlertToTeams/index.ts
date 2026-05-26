import { HttpHandler, HttpRequest, InvocationContext, HttpResponseInit } from "@azure/functions";
import fetch, { RequestInit } from "node-fetch";
import { CommonAlert } from "../types/microsoft-azure-monitor-common-alert";
import { transformCommonAlert } from "../libs/transform-alert/transform-common-alert";

const makeMessage = (adaptiveCard: any): any => ({
  type: "message",
  attachments: [
    {
      contentType: "application/vnd.microsoft.card.adaptive",
      contentUrl: null,
      content: adaptiveCard,
    },
  ],
});

const postToTeams = async (adaptiveCard: any): Promise<void> => {
  const message = makeMessage(adaptiveCard);
  const requestInit: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  };

  if (!process.env["TEAMS_WEBHOOK_URL"]) {
    throw new Error("Environment variable TEAMS_WEBHOOK_URL must be defined.");
  }

  const response = await fetch(process.env.TEAMS_WEBHOOK_URL, requestInit);

  if (response.status !== 200) {
    const body = await response.text();
    throw new Error("Cannot post to Teams. " + body);
  }
};

const createFallbackCard = (err: any, body: any) => ({
  type: "AdaptiveCard",
  $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
  version: "1.5",
  msTeams: { width: "full" },
  body: [
    {
      type: "TextBlock",
      text: "Common Alert transformation error.",
      wrap: true,
    },
    {
      type: "TextBlock",
      text: JSON.stringify(err),
      wrap: true,
    },
    {
      type: "TextBlock",
      text: JSON.stringify(body),
      wrap: true,
    },
  ],
});

/**
 * Entry point
 */
const httpTrigger: HttpHandler = async (
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> => {
  const rawBody = await req.text();
  try {
    const parsed = JSON.parse(rawBody) as CommonAlert;
    const card = await transformCommonAlert(parsed);
    await postToTeams(card);

    return { status: 204 };
  } catch (err) {
    context.log(err);
    await postToTeams(createFallbackCard(err, rawBody));

    return { status: 500 };
  }
};

export default httpTrigger;
