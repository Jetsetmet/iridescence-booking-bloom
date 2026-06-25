CREATE OR REPLACE FUNCTION public.queue_meditation_email_for_lead()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pgmq, pg_temp
AS $$
DECLARE
  normalized_email text;
  unsubscribe_token text;
  message_id text;
  first_name text;
  email_html text;
  email_text text;
BEGIN
  IF NEW.source NOT IN ('heart_opening_meditation', 'lead_magnet') THEN
    RETURN NEW;
  END IF;

  normalized_email := lower(btrim(NEW.email));
  first_name := nullif(btrim(coalesce(NEW.name, '')), '');
  message_id := 'lead-magnet-' || NEW.id::text;

  IF EXISTS (
    SELECT 1 FROM public.suppressed_emails WHERE email = normalized_email
  ) THEN
    INSERT INTO public.email_send_log (
      message_id,
      template_name,
      recipient_email,
      status,
      error_message
    ) VALUES (
      message_id,
      'lead-magnet',
      normalized_email,
      'suppressed',
      'Recipient is suppressed'
    );
    RETURN NEW;
  END IF;

  SELECT token
  INTO unsubscribe_token
  FROM public.email_unsubscribe_tokens
  WHERE email = normalized_email
    AND used_at IS NULL
  LIMIT 1;

  IF unsubscribe_token IS NULL THEN
    unsubscribe_token := encode(gen_random_bytes(32), 'hex');
    INSERT INTO public.email_unsubscribe_tokens (token, email)
    VALUES (unsubscribe_token, normalized_email)
    ON CONFLICT (email) DO NOTHING;

    SELECT token
    INTO unsubscribe_token
    FROM public.email_unsubscribe_tokens
    WHERE email = normalized_email
      AND used_at IS NULL
    LIMIT 1;
  END IF;

  IF unsubscribe_token IS NULL THEN
    INSERT INTO public.email_send_log (
      message_id,
      template_name,
      recipient_email,
      status,
      error_message
    ) VALUES (
      message_id,
      'lead-magnet',
      normalized_email,
      'suppressed',
      'Recipient has unsubscribed'
    );
    RETURN NEW;
  END IF;

  email_text := concat(
    'A gift for your heart',
    CASE WHEN first_name IS NOT NULL THEN ', ' || first_name ELSE '' END,
    E'\n\nWelcome, dear one. As promised — here is your free 11-minute meditation and breathwork practice for the heart.\n\nBegin the practice: https://www.youtube.com/watch?v=DZl8dguC3cE\n\nFind a quiet corner. Place a hand on your heart. Press play when you''re ready — there''s no rush.\n\nWith love,\nMet · Iridescence Healing'
  );

  email_html := concat(
    '<!doctype html><html><head><meta charset="utf-8"><title>Your meditation for the heart</title></head>',
    '<body style="margin:0;background:#ffffff;font-family:Georgia,serif;color:#4a4458;">',
    '<div style="max-width:560px;margin:0 auto;padding:32px 28px;">',
    '<h1 style="font-size:26px;color:#1f1b2e;margin:0 0 12px;">A gift for your heart',
    CASE WHEN first_name IS NOT NULL THEN ', ' || first_name ELSE '' END,
    '</h1>',
    '<p style="font-size:15px;line-height:22px;">Welcome, dear one. As promised — here is your free 11-minute meditation and breathwork practice for the heart. For moments of grief, heartache, or heaviness. Let Met hold you through every breath.</p>',
    '<div style="text-align:center;margin:28px 0;"><a href="https://www.youtube.com/watch?v=DZl8dguC3cE" style="background:#a47148;color:#ffffff;padding:14px 28px;border-radius:999px;font-size:15px;text-decoration:none;display:inline-block;">Begin the practice</a></div>',
    '<p style="font-size:15px;line-height:22px;">Find a quiet corner. Place a hand on your heart. Press play when you''re ready — there''s no rush.</p>',
    '<hr style="border:0;border-top:1px solid #eee;margin:24px 0;" />',
    '<p style="font-size:13px;color:#6b6577;">With love,<br />Met · Iridescence Healing</p>',
    '</div></body></html>'
  );

  INSERT INTO public.email_send_log (
    message_id,
    template_name,
    recipient_email,
    status
  ) VALUES (
    message_id,
    'lead-magnet',
    normalized_email,
    'pending'
  );

  PERFORM public.enqueue_email(
    'transactional_emails',
    jsonb_build_object(
      'message_id', message_id,
      'to', normalized_email,
      'from', 'Iridescence Healing <noreply@notify.iridescencehealing.com>',
      'sender_domain', 'notify.notify.iridescencehealing.com',
      'subject', 'Your meditation for the heart 🤍',
      'html', email_html,
      'text', email_text,
      'purpose', 'transactional',
      'label', 'lead-magnet',
      'idempotency_key', message_id,
      'unsubscribe_token', unsubscribe_token,
      'queued_at', now()
    )
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS queue_meditation_email_for_lead ON public.leads;

CREATE TRIGGER queue_meditation_email_for_lead
AFTER INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.queue_meditation_email_for_lead();