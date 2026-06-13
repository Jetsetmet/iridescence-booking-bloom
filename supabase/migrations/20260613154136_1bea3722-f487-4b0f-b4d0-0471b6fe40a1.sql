
DROP POLICY IF EXISTS "public can insert send log" ON public.email_send_log;
DROP POLICY IF EXISTS "public can read send log"   ON public.email_send_log;
DROP POLICY IF EXISTS "public can read suppression" ON public.suppressed_emails;
DROP POLICY IF EXISTS "public can manage unsub tokens" ON public.email_unsubscribe_tokens;

REVOKE ALL ON public.email_send_log           FROM anon, authenticated;
REVOKE ALL ON public.suppressed_emails        FROM anon, authenticated;
REVOKE ALL ON public.email_unsubscribe_tokens FROM anon, authenticated;

GRANT ALL ON public.email_send_log            TO service_role;
GRANT ALL ON public.suppressed_emails         TO service_role;
GRANT ALL ON public.email_unsubscribe_tokens  TO service_role;

ALTER FUNCTION public.enqueue_email(text, jsonb)               SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint)               SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb)   SET search_path = public, pgmq;

REVOKE ALL ON FUNCTION public.enqueue_email(text, jsonb)               FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.delete_email(text, bigint)               FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb)   FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)               TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint)               TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb)   TO service_role;
