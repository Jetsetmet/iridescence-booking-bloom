DO $$
DECLARE
  email_job_id integer;
BEGIN
  SELECT jobid INTO email_job_id
  FROM cron.job
  WHERE jobname = 'process-email-queue'
  LIMIT 1;

  IF email_job_id IS NOT NULL THEN
    PERFORM cron.alter_job(
      job_id := email_job_id,
      command := $cron$
  SELECT CASE
    WHEN (SELECT retry_after_until FROM public.email_send_state WHERE id = 1) > now()
      THEN NULL
    WHEN EXISTS (SELECT 1 FROM pgmq.q_auth_emails LIMIT 1)
      OR EXISTS (SELECT 1 FROM pgmq.q_transactional_emails LIMIT 1)
      THEN net.http_post(
        url := 'https://iridescence-booking-bloom.lovable.app/lovable/email/queue/process',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Lovable-Context', 'cron',
          'Authorization', 'Bearer ' || (
            SELECT decrypted_secret FROM vault.decrypted_secrets
            WHERE name = 'email_queue_service_role_key'
          )
        ),
        body := '{}'::jsonb
      )
    ELSE NULL
  END;
$cron$
    );
  END IF;
END $$;