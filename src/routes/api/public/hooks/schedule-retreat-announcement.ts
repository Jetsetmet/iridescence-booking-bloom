import { createFileRoute } from '@tanstack/react-router';
import { render } from '@react-email/components';
import * as React from 'react';
import { TEMPLATES } from '@/lib/email-templates/registry';
import { createCampaignAndSchedule } from '@/lib/mailchimp.server';

// One-time hook: schedules the retreat announcement newsletter to the Mailchimp
// audience. Protected by the Supabase anon key.

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

          // Default: tomorrow 9:00 AM Chicago (UTC-5) = 14:00 UTC
          const now = new Date();
          const tomorrow9amChicago = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() + 1,
            14,
            0,
            0,
          ));
          const scheduleTime = tomorrow9amChicago.toISOString();

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
