
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO anon, authenticated;

GRANT INSERT, SELECT ON public.email_send_log TO anon, authenticated;
GRANT INSERT, SELECT, UPDATE ON public.email_unsubscribe_tokens TO anon, authenticated;
GRANT SELECT ON public.suppressed_emails TO anon, authenticated;

ALTER TABLE public.email_send_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_unsubscribe_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppressed_emails ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public can insert send log" ON public.email_send_log;
CREATE POLICY "public can insert send log" ON public.email_send_log
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public can read send log" ON public.email_send_log;
CREATE POLICY "public can read send log" ON public.email_send_log
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public can manage unsub tokens" ON public.email_unsubscribe_tokens;
CREATE POLICY "public can manage unsub tokens" ON public.email_unsubscribe_tokens
  FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public can read suppression" ON public.suppressed_emails;
CREATE POLICY "public can read suppression" ON public.suppressed_emails
  FOR SELECT TO anon, authenticated USING (true);
