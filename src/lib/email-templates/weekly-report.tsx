import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface BookingRow {
  created_at: string
  name?: string | null
  email?: string | null
  phone?: string | null
  offering?: string | null
  preferred_date?: string | null
  notes?: string | null
}
interface LeadRow {
  created_at: string
  name?: string | null
  email: string
  source?: string | null
}
interface QuizRow {
  created_at: string
  name?: string | null
  email?: string | null
  recommended_offering: string
}

interface Props {
  rangeStart?: string
  rangeEnd?: string
  bookings?: BookingRow[]
  leads?: LeadRow[]
  quizzes?: QuizRow[]
}

const fmtDate = (iso?: string | null) => {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

const Email = ({
  rangeStart = '',
  rangeEnd = '',
  bookings = [],
  leads = [],
  quizzes = [],
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`Weekly report — ${bookings.length} enquiries, ${leads.length} signups, ${quizzes.length} quizzes`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Your weekly Iridescence report ✨</Heading>
        <Text style={lead}>
          {rangeStart} — {rangeEnd}
        </Text>
        <Section style={summaryCard}>
          <Text style={summaryRow}>
            <strong>{bookings.length}</strong> session enquiries
          </Text>
          <Text style={summaryRow}>
            <strong>{leads.length}</strong> newsletter / meditation signups
          </Text>
          <Text style={summaryRow}>
            <strong>{quizzes.length}</strong> quiz completions
          </Text>
        </Section>

        <Heading as="h2" style={h2}>
          Session enquiries
        </Heading>
        {bookings.length === 0 ? (
          <Text style={muted}>No new enquiries this week.</Text>
        ) : (
          bookings.map((b, i) => (
            <Section key={i} style={card}>
              <Text style={rowValue}>
                <strong>{b.name || '(no name)'}</strong> — {b.offering || ''}
              </Text>
              <Text style={rowSmall}>
                {b.email || ''}
                {b.phone ? ` · ${b.phone}` : ''}
              </Text>
              {b.preferred_date ? (
                <Text style={rowSmall}>Preferred: {b.preferred_date}</Text>
              ) : null}
              {b.notes ? <Text style={rowSmall}>"{b.notes}"</Text> : null}
              <Text style={rowStamp}>{fmtDate(b.created_at)}</Text>
            </Section>
          ))
        )}

        <Hr style={hr} />
        <Heading as="h2" style={h2}>
          Newsletter & meditation signups
        </Heading>
        {leads.length === 0 ? (
          <Text style={muted}>No new signups this week.</Text>
        ) : (
          leads.map((l, i) => (
            <Section key={i} style={cardSlim}>
              <Text style={rowValue}>
                {l.name ? `${l.name} — ` : ''}
                {l.email}
              </Text>
              <Text style={rowStamp}>
                {l.source || 'lead_magnet'} · {fmtDate(l.created_at)}
              </Text>
            </Section>
          ))
        )}

        <Hr style={hr} />
        <Heading as="h2" style={h2}>
          Quiz completions
        </Heading>
        {quizzes.length === 0 ? (
          <Text style={muted}>No new quiz results this week.</Text>
        ) : (
          quizzes.map((q, i) => (
            <Section key={i} style={cardSlim}>
              <Text style={rowValue}>
                {q.name ? `${q.name} — ` : ''}
                {q.email || '(no email)'}
              </Text>
              <Text style={rowStamp}>
                Recommended: {q.recommended_offering} · {fmtDate(q.created_at)}
              </Text>
            </Section>
          ))
        )}

        <Hr style={hr} />
        <Text style={muted}>With love, Iridescence Healing</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) =>
    `Weekly Iridescence report — ${d.rangeStart || ''} to ${d.rangeEnd || ''}`,
  displayName: 'Weekly report (owner)',
  to: 'info@iridescencehealing.com',
  previewData: {
    rangeStart: 'Jun 16',
    rangeEnd: 'Jun 23',
    bookings: [
      {
        created_at: new Date().toISOString(),
        name: 'Aurora Moon',
        email: 'aurora@example.com',
        phone: '555-1234',
        offering: 'Reiki & Sound',
        preferred_date: 'Fri evening',
        notes: 'Looking to ground after a hard week.',
      },
    ],
    leads: [
      {
        created_at: new Date().toISOString(),
        name: 'River Star',
        email: 'river@example.com',
        source: 'lead_magnet',
      },
    ],
    quizzes: [
      {
        created_at: new Date().toISOString(),
        name: 'Sage',
        email: 'sage@example.com',
        recommended_offering: 'The Resonance Reset',
      },
    ],
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, serif' }
const container = { padding: '32px 28px', maxWidth: 600, margin: '0 auto' }
const h1 = { fontSize: 26, color: '#1f1b2e', margin: '0 0 8px' }
const h2 = {
  fontSize: 18,
  color: '#1f1b2e',
  margin: '28px 0 12px',
}
const lead = { fontSize: 14, color: '#6b5d8a', margin: '0 0 18px' }
const summaryCard = {
  padding: '18px 22px',
  backgroundColor: '#faf6f1',
  borderRadius: 14,
  marginBottom: 8,
}
const summaryRow = { fontSize: 15, color: '#1f1b2e', margin: '4px 0' }
const card = {
  marginBottom: 12,
  padding: '14px 18px',
  backgroundColor: '#faf6f1',
  borderRadius: 12,
}
const cardSlim = {
  marginBottom: 8,
  padding: '10px 16px',
  backgroundColor: '#faf6f1',
  borderRadius: 10,
}
const rowValue = { fontSize: 15, color: '#1f1b2e', margin: '0 0 4px' }
const rowSmall = { fontSize: 13, color: '#4a4458', margin: '2px 0' }
const rowStamp = {
  fontSize: 12,
  color: '#6b5d8a',
  margin: '4px 0 0',
}
const hr = { borderColor: '#eee', margin: '24px 0' }
const muted = { fontSize: 13, color: '#6b6577' }