import { createFileRoute } from '@tanstack/react-router';
import {
  createCampaignAndSchedule,
  updateScheduledCampaignContent,
  sendCampaignTest,
} from '@/lib/mailchimp.server';

const SITE = 'https://www.iridescencehealing.com';
const EVENTS_URL = `${SITE}/events`;
const PAY_URL = 'https://buy.stripe.com/00w6oI5S66Pm87c8TR1Jm0l';
const IMAGE_URL = `${SITE}/media/two-sacred-gatherings.jpg`;

function buildHtml(): string {
  const p = 'font-size:16px;line-height:1.7;margin:0 0 18px;color:#2b2b2b;';
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#faf7f2;font-family:Georgia,serif;color:#2b2b2b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#faf7f2;padding:28px 14px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.05);">
        <tr><td>
          <a href="${EVENTS_URL}"><img src="${IMAGE_URL}" alt="Full Moon Sound Bath — Thursday 6 PM, Uptown New Orleans" width="600" style="width:100%;display:block;border:0;" /></a>
        </td></tr>
        <tr><td style="padding:32px 30px;">
          <p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#a47148;margin:0 0 14px;">Release · Reset · Receive</p>
          <h1 style="font-size:28px;line-height:1.25;margin:0 0 20px;color:#2b1a3d;">Closing the eclipse portal</h1>
          <p style="${p}">This week marks the closing of the eclipse portal — a space that began with the Solar Eclipse, inviting us to release old patterns, stories and anything we&rsquo;re ready to leave behind.</p>
          <p style="${p}">As we move through the Partial Lunar Eclipse, the energy shifts from letting go to opening up to possibility. What have you been calling into your life? What magic are you ready to receive? &#10024;</p>
          <p style="${p}">Join me <strong>Thursday at 6 PM</strong> for a deeply restorative Full Moon Sound Bath with crystal bowls, gong, chimes and healing frequencies — a space to reset the nervous system, reconnect with your intentions and get excited about what&rsquo;s ready to unfold.</p>
          <p style="${p}"><strong>Release. Reset. Receive.</strong> &#127765;&#10024;</p>
          <div style="margin:24px 0;padding:18px 20px;background:#f7f2fa;border-radius:16px;">
            <p style="margin:0 0 6px;font-size:16px;color:#2b1a3d;"><strong>Thursday | 6 PM | Uptown New Orleans</strong></p>
            <p style="margin:0;font-size:16px;color:#4a4458;">$40 &middot; Limited spaces</p>
          </div>
          <div style="text-align:center;margin:28px 0 8px;">
            <a href="${PAY_URL}" style="display:inline-block;background:#a47148;color:#ffffff;text-decoration:none;padding:14px 30px;border-radius:999px;font-size:16px;">Reserve your space &mdash; $40</a>
          </div>
          <div style="text-align:center;margin:0 0 8px;">
            <a href="${EVENTS_URL}" style="display:inline-block;border:1px solid #d8cfc4;color:#2b1a3d;text-decoration:none;padding:12px 26px;border-radius:999px;font-size:15px;">See all upcoming events</a>
          </div>
          <p style="font-size:14px;line-height:1.6;text-align:center;color:#6b6577;margin:16px 0 0;">Or reserve at <a href="${EVENTS_URL}" style="color:#a47148;">www.iridescencehealing.com/events</a></p>
          <p style="${p}margin-top:26px;">With love,<br/>Met &middot; Iridescence Healing</p>
        </td></tr>
      </table>
      <p style="font-size:12px;color:#8a8a8a;margin:16px 0 0;">You&rsquo;re receiving this because you subscribed at iridescencehealing.com. <a href="*|UNSUB|*" style="color:#8a8a8a;">Unsubscribe</a></p>
    </td></tr>
  </table>
</body></html>`;
}

export const Route = createFileRoute('/api/public/hooks/eclipse-sound-bath')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apikey = request.headers.get('apikey');
        if (!apikey || apikey !== process.env.SUPABASE_PUBLISHABLE_KEY) {
          return new Response('Unauthorized', { status: 401 });
        }

        try {
          const url = new URL(request.url);
          const testEmail = url.searchParams.get('testEmail');
          const existingId = url.searchParams.get('campaignId');
          const scheduleTime =
            url.searchParams.get('scheduleTime') ??
            new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
          const html = buildHtml();

          if (existingId && testEmail) {
            await sendCampaignTest({ campaignId: existingId, emails: [testEmail] });
            return Response.json({ success: true, tested: testEmail, campaignId: existingId });
          }

          if (existingId) {
            const updated = await updateScheduledCampaignContent({
              campaignId: existingId,
              html,
              scheduleTime,
            });
            return Response.json({ success: true, ...updated });
          }

          const created = await createCampaignAndSchedule({
            subjectLine: 'Release. Reset. Receive. 🌕 Full Moon Sound Bath this Thursday',
            previewText: 'Thursday 6 PM · Uptown New Orleans · $40 · limited spaces',
            title: 'Eclipse Portal — Full Moon Sound Bath',
            html,
            scheduleTime,
          });

          if (testEmail) {
            await sendCampaignTest({ campaignId: created.campaignId, emails: [testEmail] });
          }

          return Response.json({ success: true, ...created, tested: testEmail ?? null });
        } catch (err) {
          console.error('eclipse-sound-bath campaign failed:', err);
          return Response.json(
            { success: false, error: (err as Error).message },
            { status: 500 },
          );
        }
      },
    },
  },
});
