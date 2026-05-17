
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  source TEXT NOT NULL DEFAULT 'lead_magnet',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  offering TEXT NOT NULL,
  preferred_date TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.quiz_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  name TEXT,
  answers JSONB NOT NULL,
  recommended_offering TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- No public policies: inserts will go through server functions using the service role.
-- This keeps PII (emails, phones, notes) private and never exposed to the browser.
