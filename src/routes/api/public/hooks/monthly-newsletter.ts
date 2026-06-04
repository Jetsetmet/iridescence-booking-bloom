import { createFileRoute } from '@tanstack/react-router';
import { createCampaignAndSend, buildNewsletterHtml } from '@/lib/mailchimp.server';

// Monthly newsletter sender: creates a Mailchimp campaign to the configured
// audience and sends it. Triggered by pg_cron on the 1st of each month.
//
// Auth: this route is under /api/public/ which bypasses platform auth, so we
// gate it with the Supabase anon key (same pattern used by other cron hooks).

export const Route = createFileRoute('/api/public/hooks/monthly-newsletter')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apikey = request.headers.get('apikey');
        if (!apikey || apikey !== process.env.SUPABASE_PUBLISHABLE_KEY) {
          return new Response('Unauthorized', { status: 401 });
        }

        try {
          const now = new Date();
          const monthLabel = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });

          const html = buildNewsletterHtml({
            monthLabel,
            bodyHtml: `<p>A gentle hello as we step into ${monthLabel}. Below are this month's gatherings — small, intentional spaces to soften, breathe, and come home to yourself.</p>`,
            ctaText: 'See upcoming events',
            ctaUrl: 'https://project--deb780b1-75ae-489c-aa24-abec8fc6ac34.lovable.app/events',
          });

          const { campaignId } = await createCampaignAndSend({
            subjectLine: `${monthLabel} · circles, ceremonies & quiet moments`,
            previewText: 'This month at Iridescence Healing.',
            title: `Monthly Newsletter — ${monthLabel}`,
            html,
          });

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
