REVOKE EXECUTE ON FUNCTION public.queue_meditation_email_for_lead() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.queue_meditation_email_for_lead() TO service_role;