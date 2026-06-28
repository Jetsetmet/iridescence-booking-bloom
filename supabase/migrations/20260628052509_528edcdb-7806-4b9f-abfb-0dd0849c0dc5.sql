DROP TRIGGER IF EXISTS trg_queue_owner_notification_for_lead ON public.leads;
DROP TRIGGER IF EXISTS trg_queue_owner_notification_for_booking ON public.bookings;
DROP TRIGGER IF EXISTS trg_queue_owner_notification_for_quiz ON public.quiz_results;

DROP FUNCTION IF EXISTS public.queue_owner_notification_for_lead();
DROP FUNCTION IF EXISTS public.queue_owner_notification_for_booking();
DROP FUNCTION IF EXISTS public.queue_owner_notification_for_quiz();

CREATE OR REPLACE FUNCTION public.email_html_escape(value text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public, pg_temp
AS $$
  SELECT replace(
    replace(
      replace(
        replace(
          replace(coalesce(value, ''), '&', '&amp;'),
          '<', '&lt;'
        ),
        '>', '&gt;'
      ),
      '"', '&quot;'
    ),
    '''', '&#39;'
  )
$$;

CREATE OR REPLACE FUNCTION public.queue_missing_owner_notifications()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pgmq, extensions, pg_temp
AS $$
DECLARE
  owner_email constant text := 'info@iridescencehealing.com';
  normalized_owner text := lower(owner_email);
  owner_token text;
  queued_message_id text;
  queued_count integer := 0;
  lead_row public.leads%rowtype;
  booking_row public.bookings%rowtype;
  quiz_row public.quiz_results%rowtype;
  email_html text;
  email_text text;
  first_name text;
  source_label text;
  person_name text;
BEGIN
  IF EXISTS (SELECT 1 FROM public.suppressed_emails WHERE email = normalized_owner) THEN
    RETURN 0;
  END IF;

  SELECT token
  INTO owner_token
  FROM public.email_unsubscribe_tokens
  WHERE email = normalized_owner
    AND used_at IS NULL
  LIMIT 1;

  IF owner_token IS NULL THEN
    owner_token := encode(gen_random_bytes(32), 'hex');
    INSERT INTO public.email_unsubscribe_tokens (token, email)
    VALUES (owner_token, normalized_owner)
    ON CONFLICT (email) DO NOTHING;

    SELECT token
    INTO owner_token
    FROM public.email_unsubscribe_tokens
    WHERE email = normalized_owner
      AND used_at IS NULL
    LIMIT 1;
  END IF;

  IF owner_token IS NULL THEN
    RETURN 0;
  END IF;

  FOR lead_row IN
    SELECT l.*
    FROM public.leads l
    WHERE l.created_at <= now() - interval '5 minutes'
      AND l.created_at >= now() - interval '7 days'
      AND l.source NOT IN ('booking', 'quiz')
      AND NOT EXISTS (
        SELECT 1 FROM public.email_send_log e
        WHERE e.message_id = 'lead-notification-db-' || l.id::text
      )
      AND NOT EXISTS (
        SELECT 1 FROM public.email_send_log e
        WHERE e.template_name = 'lead-notification'
          AND lower(e.recipient_email) = normalized_owner
          AND e.status = 'sent'
          AND e.created_at BETWEEN l.created_at - interval '30 seconds' AND l.created_at + interval '5 minutes'
      )
    ORDER BY l.created_at DESC
    LIMIT 25
  LOOP
    queued_message_id := 'lead-notification-db-' || lead_row.id::text;
    first_name := nullif(btrim(coalesce(lead_row.name, '')), '');
    source_label := nullif(btrim(coalesce(lead_row.source, '')), '');

    email_text := concat(
      'New website signup', E'\n\n',
      CASE WHEN first_name IS NOT NULL THEN 'Name: ' || first_name || E'\n' ELSE '' END,
      'Email: ', lead_row.email, E'\n',
      'Source: ', coalesce(source_label, 'website'), E'\n\n',
      'Iridescence Healing website notification'
    );

    email_html := concat(
      '<!doctype html><html><head><meta charset="utf-8"><title>New website signup</title></head>',
      '<body style="margin:0;background:#ffffff;font-family:Georgia,serif;color:#4a4458;">',
      '<div style="max-width:560px;margin:0 auto;padding:32px 28px;">',
      '<h1 style="font-size:26px;color:#1f1b2e;margin:0 0 12px;">New website signup</h1>',
      '<p style="font-size:15px;line-height:22px;">Someone just signed up through your website.</p>',
      '<div style="margin-top:18px;padding:20px 22px;background:#faf6f1;border-radius:14px;">',
      CASE WHEN first_name IS NOT NULL THEN '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Name</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || public.email_html_escape(first_name) || '</p>' ELSE '' END,
      '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Email</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || public.email_html_escape(lead_row.email) || '</p>',
      '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Source</p><p style="font-size:15px;color:#1f1b2e;margin:0;">' || public.email_html_escape(coalesce(source_label, 'website')) || '</p>',
      '</div><hr style="border:0;border-top:1px solid #eee;margin:24px 0;" />',
      '<p style="font-size:13px;color:#6b6577;">Iridescence Healing website notification</p>',
      '</div></body></html>'
    );

    PERFORM public.enqueue_email(
      'transactional_emails',
      jsonb_build_object(
        'message_id', queued_message_id,
        'to', owner_email,
        'from', 'Iridescence Healing <noreply@notify.iridescencehealing.com>',
        'sender_domain', 'notify.notify.iridescencehealing.com',
        'subject', 'New signup — ' || coalesce(first_name, lead_row.email, 'Iridescence'),
        'html', email_html,
        'text', email_text,
        'purpose', 'transactional',
        'label', 'lead-notification',
        'idempotency_key', queued_message_id,
        'unsubscribe_token', owner_token,
        'queued_at', now()
      )
    );

    INSERT INTO public.email_send_log (message_id, template_name, recipient_email, status)
    VALUES (queued_message_id, 'lead-notification', owner_email, 'pending');
    queued_count := queued_count + 1;
  END LOOP;

  FOR booking_row IN
    SELECT b.*
    FROM public.bookings b
    WHERE b.created_at <= now() - interval '5 minutes'
      AND b.created_at >= now() - interval '7 days'
      AND NOT EXISTS (
        SELECT 1 FROM public.email_send_log e
        WHERE e.message_id = 'booking-notification-db-' || b.id::text
      )
      AND NOT EXISTS (
        SELECT 1 FROM public.email_send_log e
        WHERE e.template_name = 'booking-notification'
          AND lower(e.recipient_email) = normalized_owner
          AND e.status = 'sent'
          AND e.created_at BETWEEN b.created_at - interval '30 seconds' AND b.created_at + interval '5 minutes'
      )
    ORDER BY b.created_at DESC
    LIMIT 25
  LOOP
    queued_message_id := 'booking-notification-db-' || booking_row.id::text;

    email_text := concat(
      'New session request', E'\n\n',
      'Name: ', booking_row.name, E'\n',
      'Email: ', booking_row.email, E'\n',
      CASE WHEN nullif(btrim(coalesce(booking_row.phone, '')), '') IS NOT NULL THEN 'Phone: ' || booking_row.phone || E'\n' ELSE '' END,
      'Offering: ', booking_row.offering, E'\n',
      CASE WHEN nullif(btrim(coalesce(booking_row.preferred_date, '')), '') IS NOT NULL THEN 'Preferred date: ' || booking_row.preferred_date || E'\n' ELSE '' END,
      CASE WHEN nullif(btrim(coalesce(booking_row.notes, '')), '') IS NOT NULL THEN E'\nNotes: ' || booking_row.notes || E'\n' ELSE '' END,
      E'\nIridescence Healing website notification'
    );

    email_html := concat(
      '<!doctype html><html><head><meta charset="utf-8"><title>New session request</title></head>',
      '<body style="margin:0;background:#ffffff;font-family:Georgia,serif;color:#4a4458;">',
      '<div style="max-width:560px;margin:0 auto;padding:32px 28px;">',
      '<h1 style="font-size:26px;color:#1f1b2e;margin:0 0 12px;">New session request</h1>',
      '<p style="font-size:15px;line-height:22px;">A new soul has requested a session through your website.</p>',
      '<div style="margin-top:18px;padding:20px 22px;background:#faf6f1;border-radius:14px;">',
      '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Name</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || public.email_html_escape(booking_row.name) || '</p>',
      '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Email</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || public.email_html_escape(booking_row.email) || '</p>',
      CASE WHEN nullif(btrim(coalesce(booking_row.phone, '')), '') IS NOT NULL THEN '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Phone</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || public.email_html_escape(booking_row.phone) || '</p>' ELSE '' END,
      '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Offering</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || public.email_html_escape(booking_row.offering) || '</p>',
      CASE WHEN nullif(btrim(coalesce(booking_row.preferred_date, '')), '') IS NOT NULL THEN '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Preferred date</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || public.email_html_escape(booking_row.preferred_date) || '</p>' ELSE '' END,
      CASE WHEN nullif(btrim(coalesce(booking_row.notes, '')), '') IS NOT NULL THEN '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Notes</p><p style="font-size:15px;color:#1f1b2e;margin:0;">' || public.email_html_escape(booking_row.notes) || '</p>' ELSE '' END,
      '</div><hr style="border:0;border-top:1px solid #eee;margin:24px 0;" />',
      '<p style="font-size:13px;color:#6b6577;">Reply directly to ', public.email_html_escape(booking_row.email), ' to confirm the booking.</p>',
      '</div></body></html>'
    );

    PERFORM public.enqueue_email(
      'transactional_emails',
      jsonb_build_object(
        'message_id', queued_message_id,
        'to', owner_email,
        'from', 'Iridescence Healing <noreply@notify.iridescencehealing.com>',
        'sender_domain', 'notify.notify.iridescencehealing.com',
        'subject', 'New session request — ' || coalesce(booking_row.name, 'Iridescence'),
        'html', email_html,
        'text', email_text,
        'purpose', 'transactional',
        'label', 'booking-notification',
        'idempotency_key', queued_message_id,
        'unsubscribe_token', owner_token,
        'queued_at', now()
      )
    );

    INSERT INTO public.email_send_log (message_id, template_name, recipient_email, status)
    VALUES (queued_message_id, 'booking-notification', owner_email, 'pending');
    queued_count := queued_count + 1;
  END LOOP;

  FOR quiz_row IN
    SELECT q.*
    FROM public.quiz_results q
    WHERE q.created_at <= now() - interval '5 minutes'
      AND q.created_at >= now() - interval '7 days'
      AND NOT EXISTS (
        SELECT 1 FROM public.email_send_log e
        WHERE e.message_id = 'quiz-notification-db-' || q.id::text
      )
      AND NOT EXISTS (
        SELECT 1 FROM public.email_send_log e
        WHERE e.template_name = 'quiz-notification'
          AND lower(e.recipient_email) = normalized_owner
          AND e.status = 'sent'
          AND e.created_at BETWEEN q.created_at - interval '30 seconds' AND q.created_at + interval '5 minutes'
      )
    ORDER BY q.created_at DESC
    LIMIT 25
  LOOP
    queued_message_id := 'quiz-notification-db-' || quiz_row.id::text;
    person_name := coalesce(nullif(btrim(coalesce(quiz_row.name, '')), ''), 'Anonymous');

    email_text := concat(
      'New quiz submission', E'\n\n',
      'Name: ', person_name, E'\n',
      CASE WHEN nullif(btrim(coalesce(quiz_row.email, '')), '') IS NOT NULL THEN 'Email: ' || quiz_row.email || E'\n' ELSE '' END,
      'Recommended offering: ', quiz_row.recommended_offering, E'\n\n',
      'Answers: ', quiz_row.answers::text, E'\n\n',
      'Iridescence Healing website notification'
    );

    email_html := concat(
      '<!doctype html><html><head><meta charset="utf-8"><title>New quiz submission</title></head>',
      '<body style="margin:0;background:#ffffff;font-family:Georgia,serif;color:#4a4458;">',
      '<div style="max-width:560px;margin:0 auto;padding:32px 28px;">',
      '<h1 style="font-size:26px;color:#1f1b2e;margin:0 0 12px;">New quiz submission</h1>',
      '<p style="font-size:15px;line-height:22px;">Someone completed the offering quiz.</p>',
      '<div style="margin-top:18px;padding:20px 22px;background:#faf6f1;border-radius:14px;">',
      '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Name</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || public.email_html_escape(person_name) || '</p>',
      CASE WHEN nullif(btrim(coalesce(quiz_row.email, '')), '') IS NOT NULL THEN '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Email</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || public.email_html_escape(quiz_row.email) || '</p>' ELSE '' END,
      '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Recommended offering</p><p style="font-size:15px;color:#1f1b2e;margin:0;">' || public.email_html_escape(quiz_row.recommended_offering) || '</p>',
      '</div><hr style="border:0;border-top:1px solid #eee;margin:24px 0;" />',
      '<p style="font-size:13px;color:#6b6577;">Iridescence Healing website notification</p>',
      '</div></body></html>'
    );

    PERFORM public.enqueue_email(
      'transactional_emails',
      jsonb_build_object(
        'message_id', queued_message_id,
        'to', owner_email,
        'from', 'Iridescence Healing <noreply@notify.iridescencehealing.com>',
        'sender_domain', 'notify.notify.iridescencehealing.com',
        'subject', 'New quiz result — ' || coalesce(quiz_row.recommended_offering, 'Iridescence'),
        'html', email_html,
        'text', email_text,
        'purpose', 'transactional',
        'label', 'quiz-notification',
        'idempotency_key', queued_message_id,
        'unsubscribe_token', owner_token,
        'queued_at', now()
      )
    );

    INSERT INTO public.email_send_log (message_id, template_name, recipient_email, status)
    VALUES (queued_message_id, 'quiz-notification', owner_email, 'pending');
    queued_count := queued_count + 1;
  END LOOP;

  RETURN queued_count;
END;
$$;

REVOKE ALL ON FUNCTION public.queue_missing_owner_notifications() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.queue_missing_owner_notifications() FROM anon;
REVOKE ALL ON FUNCTION public.queue_missing_owner_notifications() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.queue_missing_owner_notifications() TO service_role;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'queue-missing-owner-notifications') THEN
    PERFORM cron.unschedule('queue-missing-owner-notifications');
  END IF;
END $$;

SELECT cron.schedule(
  'queue-missing-owner-notifications',
  '* * * * *',
  $$SELECT public.queue_missing_owner_notifications();$$
);