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

export function buildNewsletterHtml(opts: {
  monthLabel: string;
  headline?: string;
  bodyHtml: string;
  ctaText?: string;
  ctaUrl?: string;
  imageUrl?: string;
}): string {
  const siteUrl = "https://project--deb780b1-75ae-489c-aa24-abec8fc6ac34.lovable.app";
  const headline = opts.headline || `A new month of circles & ceremonies.`;
  const greeting = `Hi friend,`;
  const signOff = `With love,<br/>Iridescence Healing`;
  const cta = opts.ctaText && opts.ctaUrl
    ? `<div style="text-align:center;margin:32px 0;"><a href="${opts.ctaUrl}" style="display:inline-block;background:#a47148;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:999px;font-size:15px;">${opts.ctaText}</a></div>`
    : "";
  const heroImg = opts.imageUrl
    ? `<img src="${opts.imageUrl}" alt="Newsletter header" style="width:100%;border-radius:16px;margin-bottom:24px;display:block;" />`
    : "";

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#faf7f2;font-family:Georgia,serif;color:#2b2b2b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#faf7f2;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:24px;padding:40px 32px;box-shadow:0 4px 24px rgba(0,0,0,0.04);">
        <tr><td>
          <p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#a47148;margin:0 0 8px;">Iridescence Healing · ${opts.monthLabel}</p>
          ${heroImg}
          <h1 style="font-size:28px;line-height:1.2;margin:0 0 16px;color:#2b2b2b;">${headline}</h1>
          <p style="font-size:16px;line-height:1.6;margin:0 0 20px;">${greeting}</p>
          <div style="font-size:16px;line-height:1.6;margin:0 0 20px;">${opts.bodyHtml}</div>
          ${cta}
          <p style="font-size:16px;line-height:1.6;margin:24px 0 0;">${signOff}</p>
        </td></tr>
      </table>
      <p style="font-size:12px;color:#8a8a8a;margin:16px 0 0;">You're receiving this because you subscribed at iridescencehealing. <a href="*|UNSUB|*" style="color:#8a8a8a;">Unsubscribe</a></p>
    </td></tr>
  </table>
</body></html>`;
}

async function mc(prefix: string, key: string, path: string, init?: RequestInit) {
  const res = await fetch(`https://${prefix}.api.mailchimp.com/3.0${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`anystring:${key}`).toString("base64")}`,
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Mailchimp ${path} failed [${res.status}]: ${body}`);
  }
  return res.status === 204 ? null : await res.json();
}

export async function createCampaignAndSend(opts: {
  subjectLine: string;
  previewText?: string;
  html: string;
  title?: string;
}): Promise<{ campaignId: string }> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const server = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !audienceId || !server) {
    throw new Error("Missing Mailchimp environment variables");
  }

  const audience = await mc(
    server,
    apiKey,
    `/lists/${audienceId}`
  );
  const defaults = (audience as any)?.campaign_defaults || {};

  const campaign = await mc(server, apiKey, "/campaigns", {
    method: "POST",
    body: JSON.stringify({
      type: "regular",
      recipients: { list_id: audienceId },
      settings: {
        subject_line: opts.subjectLine,
        preview_text: opts.previewText || "",
        title: opts.title || opts.subjectLine,
        from_name: defaults.from_name,
        reply_to: defaults.from_email,
      },
    }),
  }) as { id: string } | null;

  const campaignId = campaign?.id;
  if (!campaignId) throw new Error("No campaign id returned from Mailchimp");

  await mc(server, apiKey, `/campaigns/${campaignId}/content`, {
    method: "PUT",
    body: JSON.stringify({ html: opts.html }),
  });

  await mc(server, apiKey, `/campaigns/${campaignId}/actions/send`, {
    method: "POST",
  });

  return { campaignId };
}