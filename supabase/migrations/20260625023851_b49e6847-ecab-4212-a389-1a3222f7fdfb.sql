DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(email) <= 320
  AND (name IS NULL OR length(name) <= 200)
  AND source IS NOT NULL
  AND length(source) BETWEEN 1 AND 60
  AND source ~ '^[a-zA-Z0-9_-]+$'
);