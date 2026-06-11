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

interface Props {
  name?: string
  email?: string
  phone?: string
  offering?: string
  preferred_date?: string
  notes?: string
}

const Email = ({
  name = 'Someone',
  email = '',
  phone = '',
  offering = '',
  preferred_date = '',
  notes = '',
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New session request from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New session request</Heading>
        <Text style={lead}>
          A new soul has requested a session through your website.
        </Text>
        <Section style={card}>
          <Row label="Name" value={name} />
          <Row label="Email" value={email} />
          {phone ? <Row label="Phone" value={phone} /> : null}
          <Row label="Offering" value={offering} />
          {preferred_date ? <Row label="Preferred date" value={preferred_date} /> : null}
          {notes ? <Row label="Notes" value={notes} /> : null}
        </Section>
        <Hr style={hr} />
        <Text style={muted}>
          Reply directly to {email || 'them'} to confirm the booking.
        </Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label, value }: { label: string; value: string }) => (
  <Section style={{ marginBottom: 10 }}>
    <Text style={rowLabel}>{label}</Text>
    <Text style={rowValue}>{value}</Text>
  </Section>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) =>
    `New session request — ${d.name ?? 'Iridescence'}`,
  displayName: 'Booking notification (owner)',
  to: 'info@iridescencehealing.com',
  previewData: {
    name: 'Aurora Moon',
    email: 'aurora@example.com',
    phone: '555-1234',
    offering: 'Crystal Reiki',
    preferred_date: 'Saturday afternoon',
    notes: 'Looking forward to it!',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, serif' }
const container = { padding: '32px 28px', maxWidth: 560, margin: '0 auto' }
const h1 = { fontSize: 26, color: '#1f1b2e', margin: '0 0 12px' }
const lead = { fontSize: 15, color: '#4a4458', lineHeight: '22px' }
const card = {
  marginTop: 18,
  padding: '20px 22px',
  backgroundColor: '#faf6f1',
  borderRadius: 14,
}
const rowLabel = {
  fontSize: 11,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#6b5d8a',
  margin: '0 0 2px',
}
const rowValue = { fontSize: 15, color: '#1f1b2e', margin: 0 }
const hr = { borderColor: '#eee', margin: '24px 0' }
const muted = { fontSize: 13, color: '#6b6577' }