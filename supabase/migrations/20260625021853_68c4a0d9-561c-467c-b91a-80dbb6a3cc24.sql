
DROP POLICY IF EXISTS "Anyone can submit a booking" ON public.bookings;
CREATE POLICY "Anyone can submit a booking" ON public.bookings
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(btrim(name)) BETWEEN 1 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(email) <= 320
    AND length(btrim(offering)) BETWEEN 1 AND 200
    AND status = 'new'
    AND (notes IS NULL OR length(notes) <= 5000)
    AND (phone IS NULL OR length(phone) <= 50)
    AND (preferred_date IS NULL OR length(preferred_date) <= 100)
  );

DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;
CREATE POLICY "Anyone can submit a lead" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(email) <= 320
    AND (name IS NULL OR length(name) <= 200)
    AND source IN ('lead_magnet', 'newsletter', 'quiz', 'booking', 'contact')
  );

DROP POLICY IF EXISTS "Anyone can submit quiz results" ON public.quiz_results;
CREATE POLICY "Anyone can submit quiz results" ON public.quiz_results
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(btrim(recommended_offering)) BETWEEN 1 AND 200
    AND (email IS NULL OR (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 320))
    AND (name IS NULL OR length(name) <= 200)
    AND jsonb_typeof(answers) = 'object'
    AND length(answers::text) <= 20000
  );
