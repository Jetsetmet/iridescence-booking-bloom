-- Allow public form submissions while keeping reads/updates/deletes restricted
-- Service role bypasses RLS so backend/admin code retains full access.

GRANT INSERT ON public.bookings TO anon, authenticated;
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT INSERT ON public.quiz_results TO anon, authenticated;

CREATE POLICY "Anyone can submit a booking"
  ON public.bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can submit quiz results"
  ON public.quiz_results FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);