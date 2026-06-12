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
  source?: string
}

const Email = ({ name = '', email = '', source = 'lead_magnet' }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New lead signup{name ? ` — ${name}` : ''}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>A new soul joined your list ✨</Heading>
        <Text style={lead}>
          Someone just signed up through your website. They've also been added
          to Mailchimp and sent the free meditation.
        </Text>
        <Section style={card}>
          {name ? <Row label="Name" value={name} /> : null}
          <Row label="Email" value={email} />
          <Row label="Source" value={source} />
        </Section>
        <Hr style={hr} />
        <Text style={muted}>With love, Iridescence Healing</Text>
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
    `New signup — ${d.name || d.email || 'Iridescence'}`,
  displayName: 'Lead signup (owner)',
  to: 'info@iridescencehealing.com',
  previewData: {
    name: 'Aurora Moon',
    email: 'aurora@example.com',
    source: 'lead_magnet',
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