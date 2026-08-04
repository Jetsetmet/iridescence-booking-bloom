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
  customer_email?: string
  customer_name?: string
  amount_total?: number
  currency?: string
  event_name?: string
  payment_status?: string
}

const Email = ({
  customer_email = '',
  customer_name = '',
  amount_total = 0,
  currency = 'usd',
  event_name = 'Stripe Payment Link booking',
  payment_status = 'paid',
}: Props) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount_total / 100)

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New paid event booking — {event_name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New paid event booking</Heading>
          <Text style={lead}>
            Someone just completed a payment through Stripe for an event on your
            website.
          </Text>
          <Section style={card}>
            <Row label="Event" value={event_name} />
            <Row label="Amount" value={`${formattedAmount} (${payment_status})`} />
            {customer_name ? <Row label="Customer name" value={customer_name} /> : null}
            {customer_email ? <Row label="Customer email" value={customer_email} /> : null}
          </Section>
          <Hr style={hr} />
          <Text style={muted}>
            You can also view this payment in your Stripe dashboard.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <Section style={{ marginBottom: 10 }}>
    <Text style={rowLabel}>{label}</Text>
    <Text style={rowValue}>{value}</Text>
  </Section>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) =>
    `New paid event booking — ${d.event_name || 'Stripe Payment'}`,
  displayName: 'Stripe payment notification (owner)',
  to: 'info@iridescencehealing.com',
  previewData: {
    customer_email: 'aurora@example.com',
    customer_name: 'Aurora Moon',
    amount_total: 4000,
    currency: 'usd',
    event_name: 'Full Moon Sound Bath',
    payment_status: 'paid',
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
