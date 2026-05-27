import crypto from "crypto";

type SyncInput = {
  email: string;
  name?: string | null;
  tags?: string[];
  mergeFields?: Record<string, string>;
};

export async function syncToMailchimp(input: SyncInput): Promise<void> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const server = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !audienceId || !server) {
    console.warn("[mailchimp] missing env, skipping sync");
    return;
  }

  const email = input.email.trim().toLowerCase();
  const subscriberHash = crypto.createHash("md5").update(email).digest("hex");
  const url = `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`;

  const [firstName, ...rest] = (input.name || "").trim().split(/\s+/);
  const merge_fields: Record<string, string> = { ...(input.mergeFields || {}) };
  if (firstName) merge_fields.FNAME = firstName;
  if (rest.length) merge_fields.LNAME = rest.join(" ");

  const body = {
    email_address: email,
    status_if_new: "subscribed",
    merge_fields,
    tags: input.tags || [],
  };

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error(`[mailchimp] sync failed ${res.status}: ${text}`);
    }
  } catch (e) {
    console.error("[mailchimp] sync error", e);
  }
}