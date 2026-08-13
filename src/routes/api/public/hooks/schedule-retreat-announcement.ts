import { createFileRoute } from '@tanstack/react-router';
import { render } from '@react-email/components';
import * as React from 'react';
import { TEMPLATES } from '@/lib/email-templates/registry';
import { createCampaignAndSchedule, updateScheduledCampaignContent } from '@/lib/mailchimp.server';

// One-time hook: schedules the retreat announcement newsletter to the Mailchimp
// audience. Protected by the Supabase anon key.

function getTomorrow9amChicago(): string {
  const now = new Date();
  // Build a date representing "now" in America/Chicago, then add one day and
  // pin it to 9:00 AM local time.
  const chicagoNow = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/Chicago' }),
  );
  const tomorrow = new Date(chicagoNow);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);

  // Convert the Chicago-local 9 AM to a UTC ISO timestamp
  const offset = tomorrow.getTime() - chicagoNow.getTime();
  const utcTime = new Date(now.getTime() + offset);
  return utcTime.toISOString();
}

export const Route = createFileRoute('/api/public/hooks/schedule-retreat-announcement')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apikey = request.headers.get('apikey');
        if (!apikey || apikey !== process.env.SUPABASE_PUBLISHABLE_KEY) {
          return new Response('Unauthorized', { status: 401 });
        }

        try {
          const template = TEMPLATES['retreat-announcement'];
          if (!template) {
            throw new Error('retreat-announcement template not found');
          }

          const element = React.createElement(template.component, template.previewData || {});
          const html = await render(element);

          const scheduleTime = getTomorrow9amChicago();

          const url = new URL(request.url);
          const existingId = url.searchParams.get('campaignId');
          if (existingId) {
            const updated = await updateScheduledCampaignContent({
              campaignId: existingId,
              html,
              scheduleTime,
            });
            return new Response(JSON.stringify({ success: true, ...updated }), {
              headers: { 'Content-Type': 'application/json' },
            });
          }

          const { campaignId, scheduledFor } = await createCampaignAndSchedule({
            subjectLine: 'A Journey Awaits...',
            previewText: 'A new retreat in Türkiye and beautiful gatherings this season.',
            title: 'Retreat Announcement — Resonance & Remembrance',
            html,
            scheduleTime,
          });

          return new Response(
            JSON.stringify({ success: true, campaignId, scheduledFor }),
            { headers: { 'Content-Type': 'application/json' } },
          );
        } catch (err) {
          console.error('Schedule retreat announcement failed:', err);
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to schedule campaign' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } },
          );
        }
      },
    },
  },
});
