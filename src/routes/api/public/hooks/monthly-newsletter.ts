import { createFileRoute } from '@tanstack/react-router';

// Monthly newsletter sender: creates a Mailchimp campaign to the configured
// audience and sends it. Triggered by pg_cron on the 1st of each month.
//
// Auth: this route is under /api/public/ which bypasses platform auth, so we
// gate it with the Supabase anon key (same pattern used by other cron hooks)
// and reject everything else.

const SITE_URL = 'https://project--deb780b1-75ae-489c-aa24-abec8fc6ac34.lovable.app';

function buildHtml(monthLabel: string) {
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#faf7f2;font-family:Georgia,serif;color:#2b2b2b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#faf7f2;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:24px;padding:40px 32px;box-shadow:0 4px 24px rgba(0,0,0,0.04);">
        <tr><td>
          <p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#a47148;margin:0 0 8px;">Iridescence Healing · ${monthLabel}</p>
          <h1 style="font-size:28px;line-height:1.2;margin:0 0 16px;color:#2b2b2b;">A new month of circles & ceremonies.</h1>
          <p style="font-size:16px;line-height:1.6;margin:0 0 20px;">Hi friend,</p>
          <p style="font-size:16px;line-height:1.6;margin:0 0 20px;">A gentle hello as we step into ${monthLabel}. Below are this month's gatherings — small, intentional spaces to soften, breathe, and come home to yourself.</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${SITE_URL}/events" style="display:inline-block;background:#a47148;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:999px;font-size:15px;">See upcoming events</a>
          </div>
          <p style="font-size:16px;line-height:1.6;margin:0 0 12px;">Looking for something more personal? Explore <a href="${SITE_URL}/offerings" style="color:#a47148;">private offerings</a> or <a href="${SITE_URL}/quiz" style="color:#a47148;">take the quiz</a> to find what's calling you.</p>
          <p style="font-size:16px;line-height:1.6;margin:24px 0 0;">With love,<br/>Iridescence Healing</p>
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
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`anystring:${key}`)}`,
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Mailchimp ${path} failed [${res.status}]: ${body}`);
  }
  return res.status === 204 ? null : await res.json();
}

export const Route = createFileRoute('/api/public/hooks/monthly-newsletter')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apikey = request.headers.get('apikey');
        if (!apikey || apikey !== process.env.SUPABASE_PUBLISHABLE_KEY) {
          return new Response('Unauthorized', { status: 401 });
        }

        const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
        const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
        const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
        if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_SERVER_PREFIX) {
          console.error('Missing Mailchimp environment variables');
          return new Response('Server misconfigured', { status: 500 });
        }

        try {
          const now = new Date();
          const monthLabel = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });

          // 1. Create campaign
          const campaign = await mc(
            MAILCHIMP_SERVER_PREFIX,
            MAILCHIMP_API_KEY,
            '/campaigns',
            {
              method: 'POST',
              body: JSON.stringify({
                type: 'regular',
                recipients: { list_id: MAILCHIMP_AUDIENCE_ID },
                settings: {
                  subject_line: `${monthLabel} · circles, ceremonies & quiet moments`,
                  preview_text: 'This month at Iridescence Healing.',
                  title: `Monthly Newsletter — ${monthLabel}`,
                  from_name: 'Iridescence Healing',
                  reply_to: 'hello@iridescencehealing.com',
                },
              }),
            },
          );

          const campaignId = campaign?.id;
          if (!campaignId) throw new Error('No campaign id returned');

          // 2. Set HTML content
          await mc(
            MAILCHIMP_SERVER_PREFIX,
            MAILCHIMP_API_KEY,
            `/campaigns/${campaignId}/content`,
            {
              method: 'PUT',
              body: JSON.stringify({ html: buildHtml(monthLabel) }),
            },
          );

          // 3. Send
          await mc(
            MAILCHIMP_SERVER_PREFIX,
            MAILCHIMP_API_KEY,
            `/campaigns/${campaignId}/actions/send`,
            { method: 'POST' },
          );

          return new Response(
            JSON.stringify({ success: true, campaignId, month: monthLabel }),
            { headers: { 'Content-Type': 'application/json' } },
          );
        } catch (err) {
          console.error('Monthly newsletter send failed:', err);
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to send newsletter' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } },
          );
        }
      },
    },
  },
});