const SURVEYMONKEY_TOKEN =
  "OYSqDsU4uamYEjIek8-uF4HQyF.uT9zhmqqBrbdGESJ03Fu4tQDpFg0TV3oEPniWydvRLHJi0MYRd1jljjKMacF9mbkX5Hu9WK3pjRNVl153kMrws8sHc5h.bsyrlAid";
const bearer = `Bearer ${SURVEYMONKEY_TOKEN}`;
const BASE_URL = "https://api.surveymonkey.com/v3";
const FEEDBACK_SURVEY_ID = "";
const FEEDBACK_EMAIL_COLLECTOR_ID = "402987079";

export async function sendFeedbackSurvey(recipients: string[]) {
  const { id: messageId, edit_message_link } = await createFeedbackMessage(
    FEEDBACK_EMAIL_COLLECTOR_ID,
    "Clover Bank values your opinion"
  );
  await addRecipientsToMessage(
    FEEDBACK_EMAIL_COLLECTOR_ID,
    messageId,
    recipients
  );
  await sendMessage(FEEDBACK_EMAIL_COLLECTOR_ID, messageId);
  return edit_message_link;
}

async function createFeedbackMessage(
  collectorId: string,
  subject: string
): Promise<{ id: string; edit_message_link: string }> {
  const response = await fetch(
    `${BASE_URL}/collectors/${collectorId}/messages`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({
        type: "invite",
        subject,
      }),
    }
  );
  const data: any = await response.json();
  return data;
}

async function addRecipientsToMessage(
  collectorId: string,
  messageId: string,
  recipients: string[]
) {
  const response = await fetch(
    `${BASE_URL}/collectors/${collectorId}/messages/${messageId}/recipients/bulk`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({
        contacts: recipients.map((recipient) => ({ email: recipient })),
      }),
    }
  );
  return response.json();
}

async function sendMessage(collectorId: string, messageId: string) {
  const response = await fetch(
    `${BASE_URL}/collectors/${collectorId}/messages/${messageId}/send`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({}),
    }
  );
  return response.json();
}
