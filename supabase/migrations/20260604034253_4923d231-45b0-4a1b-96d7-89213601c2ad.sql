CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

SELECT cron.schedule(
  'send-monthly-newsletter',
  '0 9 1 * *',
  $$
  SELECT net.http_post(
    url := 'https://project--deb780b1-75ae-489c-aa24-abec8fc6ac34.lovable.app/api/public/hooks/monthly-newsletter',
    headers := '{"Content-Type": "application/json", "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmYnVkcGxreHVncWh1YW9sbGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNDM2MjksImV4cCI6MjA5NDYxOTYyOX0.RH23fXwE_hXFB8lHBRP4DaR9NimzbvvDrp30sX_3iN0"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);