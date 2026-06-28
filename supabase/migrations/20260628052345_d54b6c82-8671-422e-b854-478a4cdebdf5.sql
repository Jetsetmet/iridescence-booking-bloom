CREATE OR REPLACE FUNCTION public.queue_owner_notification_for_lead()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pgmq, extensions, pg_temp
AS $$
DECLARE
  owner_email constant text := 'info@iridescencehealing.com';
  normalized_owner text := lower(owner_email);
  unsubscribe_token text;
  message_id text;
  first_name text;
  source_label text;
  email_html text;
  email_text text;
BEGIN
  message_id := 'lead-notification-db-' || NEW.id::text;

  IF EXISTS (
    SELECT 1 FROM public.email_send_log
    WHERE message_id = message_id
      AND status IN ('pending', 'sent')
  ) THEN
    RETURN NEW;
  END IF;

  first_name := nullif(btrim(coalesce(NEW.name, '')), '');
  source_label := nullif(btrim(coalesce(NEW.source, '')), '');

  SELECT token
  INTO unsubscribe_token
  FROM public.email_unsubscribe_tokens
  WHERE email = normalized_owner
    AND used_at IS NULL
  LIMIT 1;

  IF unsubscribe_token IS NULL THEN
    unsubscribe_token := encode(gen_random_bytes(32), 'hex');
    INSERT INTO public.email_unsubscribe_tokens (token, email)
    VALUES (unsubscribe_token, normalized_owner)
    ON CONFLICT (email) DO NOTHING;

    SELECT token
    INTO unsubscribe_token
    FROM public.email_unsubscribe_tokens
    WHERE email = normalized_owner
      AND used_at IS NULL
    LIMIT 1;
  END IF;

  IF unsubscribe_token IS NULL THEN
    INSERT INTO public.email_send_log (message_id, template_name, recipient_email, status, error_message)
    VALUES (message_id, 'lead-notification', owner_email, 'suppressed', 'Owner email has unsubscribed');
    RETURN NEW;
  END IF;

  email_text := concat(
    'New website signup', E'\n\n',
    CASE WHEN first_name IS NOT NULL THEN 'Name: ' || first_name || E'\n' ELSE '' END,
    'Email: ', NEW.email, E'\n',
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
    CASE WHEN first_name IS NOT NULL THEN '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Name</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || first_name || '</p>' ELSE '' END,
    '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Email</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || NEW.email || '</p>',
    '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Source</p><p style="font-size:15px;color:#1f1b2e;margin:0;">' || coalesce(source_label, 'website') || '</p>',
    '</div><hr style="border:0;border-top:1px solid #eee;margin:24px 0;" />',
    '<p style="font-size:13px;color:#6b6577;">Iridescence Healing website notification</p>',
    '</div></body></html>'
  );

  INSERT INTO public.email_send_log (message_id, template_name, recipient_email, status)
  VALUES (message_id, 'lead-notification', owner_email, 'pending');

  PERFORM public.enqueue_email(
    'transactional_emails',
    jsonb_build_object(
      'message_id', message_id,
      'to', owner_email,
      'from', 'Iridescence Healing <noreply@notify.iridescencehealing.com>',
      'sender_domain', 'notify.notify.iridescencehealing.com',
      'subject', 'New signup — ' || coalesce(first_name, NEW.email, 'Iridescence'),
      'html', email_html,
      'text', email_text,
      'purpose', 'transactional',
      'label', 'lead-notification',
      'idempotency_key', message_id,
      'unsubscribe_token', unsubscribe_token,
      'queued_at', now()
    )
  );

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.queue_owner_notification_for_booking()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pgmq, extensions, pg_temp
AS $$
DECLARE
  owner_email constant text := 'info@iridescencehealing.com';
  normalized_owner text := lower(owner_email);
  unsubscribe_token text;
  message_id text;
  email_html text;
  email_text text;
BEGIN
  message_id := 'booking-notification-db-' || NEW.id::text;

  IF EXISTS (
    SELECT 1 FROM public.email_send_log
    WHERE message_id = message_id
      AND status IN ('pending', 'sent')
  ) THEN
    RETURN NEW;
  END IF;

  SELECT token
  INTO unsubscribe_token
  FROM public.email_unsubscribe_tokens
  WHERE email = normalized_owner
    AND used_at IS NULL
  LIMIT 1;

  IF unsubscribe_token IS NULL THEN
    unsubscribe_token := encode(gen_random_bytes(32), 'hex');
    INSERT INTO public.email_unsubscribe_tokens (token, email)
    VALUES (unsubscribe_token, normalized_owner)
    ON CONFLICT (email) DO NOTHING;

    SELECT token
    INTO unsubscribe_token
    FROM public.email_unsubscribe_tokens
    WHERE email = normalized_owner
      AND used_at IS NULL
    LIMIT 1;
  END IF;

  IF unsubscribe_token IS NULL THEN
    INSERT INTO public.email_send_log (message_id, template_name, recipient_email, status, error_message)
    VALUES (message_id, 'booking-notification', owner_email, 'suppressed', 'Owner email has unsubscribed');
    RETURN NEW;
  END IF;

  email_text := concat(
    'New session request', E'\n\n',
    'Name: ', NEW.name, E'\n',
    'Email: ', NEW.email, E'\n',
    CASE WHEN nullif(btrim(coalesce(NEW.phone, '')), '') IS NOT NULL THEN 'Phone: ' || NEW.phone || E'\n' ELSE '' END,
    'Offering: ', NEW.offering, E'\n',
    CASE WHEN nullif(btrim(coalesce(NEW.preferred_date, '')), '') IS NOT NULL THEN 'Preferred date: ' || NEW.preferred_date || E'\n' ELSE '' END,
    CASE WHEN nullif(btrim(coalesce(NEW.notes, '')), '') IS NOT NULL THEN E'\nNotes: ' || NEW.notes || E'\n' ELSE '' END,
    E'\nIridescence Healing website notification'
  );

  email_html := concat(
    '<!doctype html><html><head><meta charset="utf-8"><title>New session request</title></head>',
    '<body style="margin:0;background:#ffffff;font-family:Georgia,serif;color:#4a4458;">',
    '<div style="max-width:560px;margin:0 auto;padding:32px 28px;">',
    '<h1 style="font-size:26px;color:#1f1b2e;margin:0 0 12px;">New session request</h1>',
    '<p style="font-size:15px;line-height:22px;">A new soul has requested a session through your website.</p>',
    '<div style="margin-top:18px;padding:20px 22px;background:#faf6f1;border-radius:14px;">',
    '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Name</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || NEW.name || '</p>',
    '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Email</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || NEW.email || '</p>',
    CASE WHEN nullif(btrim(coalesce(NEW.phone, '')), '') IS NOT NULL THEN '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Phone</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || NEW.phone || '</p>' ELSE '' END,
    '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Offering</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || NEW.offering || '</p>',
    CASE WHEN nullif(btrim(coalesce(NEW.preferred_date, '')), '') IS NOT NULL THEN '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Preferred date</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || NEW.preferred_date || '</p>' ELSE '' END,
    CASE WHEN nullif(btrim(coalesce(NEW.notes, '')), '') IS NOT NULL THEN '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Notes</p><p style="font-size:15px;color:#1f1b2e;margin:0;">' || NEW.notes || '</p>' ELSE '' END,
    '</div><hr style="border:0;border-top:1px solid #eee;margin:24px 0;" />',
    '<p style="font-size:13px;color:#6b6577;">Reply directly to ', NEW.email, ' to confirm the booking.</p>',
    '</div></body></html>'
  );

  INSERT INTO public.email_send_log (message_id, template_name, recipient_email, status)
  VALUES (message_id, 'booking-notification', owner_email, 'pending');

  PERFORM public.enqueue_email(
    'transactional_emails',
    jsonb_build_object(
      'message_id', message_id,
      'to', owner_email,
      'from', 'Iridescence Healing <noreply@notify.iridescencehealing.com>',
      'sender_domain', 'notify.notify.iridescencehealing.com',
      'subject', 'New session request — ' || coalesce(NEW.name, 'Iridescence'),
      'html', email_html,
      'text', email_text,
      'purpose', 'transactional',
      'label', 'booking-notification',
      'idempotency_key', message_id,
      'unsubscribe_token', unsubscribe_token,
      'queued_at', now()
    )
  );

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.queue_owner_notification_for_quiz()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pgmq, extensions, pg_temp
AS $$
DECLARE
  owner_email constant text := 'info@iridescencehealing.com';
  normalized_owner text := lower(owner_email);
  unsubscribe_token text;
  message_id text;
  person_name text;
  email_html text;
  email_text text;
BEGIN
  message_id := 'quiz-notification-db-' || NEW.id::text;

  IF EXISTS (
    SELECT 1 FROM public.email_send_log
    WHERE message_id = message_id
      AND status IN ('pending', 'sent')
  ) THEN
    RETURN NEW;
  END IF;

  person_name := coalesce(nullif(btrim(coalesce(NEW.name, '')), ''), 'Anonymous');

  SELECT token
  INTO unsubscribe_token
  FROM public.email_unsubscribe_tokens
  WHERE email = normalized_owner
    AND used_at IS NULL
  LIMIT 1;

  IF unsubscribe_token IS NULL THEN
    unsubscribe_token := encode(gen_random_bytes(32), 'hex');
    INSERT INTO public.email_unsubscribe_tokens (token, email)
    VALUES (unsubscribe_token, normalized_owner)
    ON CONFLICT (email) DO NOTHING;

    SELECT token
    INTO unsubscribe_token
    FROM public.email_unsubscribe_tokens
    WHERE email = normalized_owner
      AND used_at IS NULL
    LIMIT 1;
  END IF;

  IF unsubscribe_token IS NULL THEN
    INSERT INTO public.email_send_log (message_id, template_name, recipient_email, status, error_message)
    VALUES (message_id, 'quiz-notification', owner_email, 'suppressed', 'Owner email has unsubscribed');
    RETURN NEW;
  END IF;

  email_text := concat(
    'New quiz submission', E'\n\n',
    'Name: ', person_name, E'\n',
    CASE WHEN nullif(btrim(coalesce(NEW.email, '')), '') IS NOT NULL THEN 'Email: ' || NEW.email || E'\n' ELSE '' END,
    'Recommended offering: ', NEW.recommended_offering, E'\n\n',
    'Answers: ', NEW.answers::text, E'\n\n',
    'Iridescence Healing website notification'
  );

  email_html := concat(
    '<!doctype html><html><head><meta charset="utf-8"><title>New quiz submission</title></head>',
    '<body style="margin:0;background:#ffffff;font-family:Georgia,serif;color:#4a4458;">',
    '<div style="max-width:560px;margin:0 auto;padding:32px 28px;">',
    '<h1 style="font-size:26px;color:#1f1b2e;margin:0 0 12px;">New quiz submission</h1>',
    '<p style="font-size:15px;line-height:22px;">Someone completed the offering quiz.</p>',
    '<div style="margin-top:18px;padding:20px 22px;background:#faf6f1;border-radius:14px;">',
    '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Name</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || person_name || '</p>',
    CASE WHEN nullif(btrim(coalesce(NEW.email, '')), '') IS NOT NULL THEN '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Email</p><p style="font-size:15px;color:#1f1b2e;margin:0 0 10px;">' || NEW.email || '</p>' ELSE '' END,
    '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b5d8a;margin:0 0 2px;">Recommended offering</p><p style="font-size:15px;color:#1f1b2e;margin:0;">' || NEW.recommended_offering || '</p>',
    '</div><hr style="border:0;border-top:1px solid #eee;margin:24px 0;" />',
    '<p style="font-size:13px;color:#6b6577;">Iridescence Healing website notification</p>',
    '</div></body></html>'
  );

  INSERT INTO public.email_send_log (message_id, template_name, recipient_email, status)
  VALUES (message_id, 'quiz-notification', owner_email, 'pending');

  PERFORM public.enqueue_email(
    'transactional_emails',
    jsonb_build_object(
      'message_id', message_id,
      'to', owner_email,
      'from', 'Iridescence Healing <noreply@notify.iridescencehealing.com>',
      'sender_domain', 'notify.notify.iridescencehealing.com',
      'subject', 'New quiz result — ' || coalesce(NEW.recommended_offering, 'Iridescence'),
      'html', email_html,
      'text', email_text,
      'purpose', 'transactional',
      'label', 'quiz-notification',
      'idempotency_key', message_id,
      'unsubscribe_token', unsubscribe_token,
      'queued_at', now()
    )
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_queue_owner_notification_for_lead ON public.leads;
CREATE TRIGGER trg_queue_owner_notification_for_lead
AFTER INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.queue_owner_notification_for_lead();

DROP TRIGGER IF EXISTS trg_queue_owner_notification_for_booking ON public.bookings;
CREATE TRIGGER trg_queue_owner_notification_for_booking
AFTER INSERT ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.queue_owner_notification_for_booking();

DROP TRIGGER IF EXISTS trg_queue_owner_notification_for_quiz ON public.quiz_results;
CREATE TRIGGER trg_queue_owner_notification_for_quiz
AFTER INSERT ON public.quiz_results
FOR EACH ROW
EXECUTE FUNCTION public.queue_owner_notification_for_quiz();