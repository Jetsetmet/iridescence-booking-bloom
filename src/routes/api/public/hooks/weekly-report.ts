import { createFileRoute } from '@tanstack/react-router'
import { createClient } from '@supabase/supabase-js'
import { enqueueNotification } from '@/lib/email/enqueue-notification.server'

export const Route = createFileRoute('/api/public/hooks/weekly-report')({
  server: {
    handlers: {
      POST: async ({ request: _request }) => {
        const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!url || !key) {
          return Response.json(
            { error: 'Server not configured' },
            { status: 500 },
          )
        }
        const supabase = createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        })

        const now = new Date()
        const since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

        const [bookingsRes, leadsRes, quizzesRes] = await Promise.all([
          supabase
            .from('bookings')
            .select(
              'created_at,name,email,phone,offering,preferred_date,notes',
            )
            .gte('created_at', since.toISOString())
            .order('created_at', { ascending: false }),
          supabase
            .from('leads')
            .select('created_at,name,email,source')
            .gte('created_at', since.toISOString())
            .order('created_at', { ascending: false }),
          supabase
            .from('quiz_results')
            .select('created_at,name,email,recommended_offering')
            .gte('created_at', since.toISOString())
            .order('created_at', { ascending: false }),
        ])

        const fmt = (d: Date) =>
          d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })

        await enqueueNotification('weekly-report', {
          rangeStart: fmt(since),
          rangeEnd: fmt(now),
          bookings: bookingsRes.data ?? [],
          leads: leadsRes.data ?? [],
          quizzes: quizzesRes.data ?? [],
        })

        return Response.json({
          ok: true,
          counts: {
            bookings: bookingsRes.data?.length ?? 0,
            leads: leadsRes.data?.length ?? 0,
            quizzes: quizzesRes.data?.length ?? 0,
          },
        })
      },
    },
  },
})