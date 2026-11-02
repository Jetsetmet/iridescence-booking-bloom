import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  customer_name?: string
  amount_total?: number
  currency?: string
  event_name?: string
  customer_email?: string
  /** Renders the owner-facing copy of a confirmation already sent to the customer. */
  copy_for_owner?: boolean
}

const Email = ({
  customer_name = '',
  amount_total = 0,
  currency = 'usd',
  event_name = 'your booking',
  customer_email = '',
  copy_for_owner = false,
}: Props) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount_total / 100)

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        {copy_for_owner
          ? `Copy of booking confirmation — ${event_name}`
          : `Your booking is confirmed — ${event_name}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={brand}>Iridescence Healing</Text>
          <Heading style={h1}>
            {copy_for_owner
              ? 'Booking confirmed — copy for your records'
              : 'Your booking is confirmed'}
          </Heading>
          {copy_for_owner ? (
            <Text style={lead}>
              This is a copy of the confirmation sent to{' '}
              {customer_email ? (
                <Link href={`mailto:${customer_email}`} style={link}>
                  {customer_email}
                </Link>
              ) : (
                customer_name || 'the customer'
              )}
              .
            </Text>
          ) : (
            <>
              <Text style={lead}>
                {customer_name ? `Dear ${customer_name},` : 'Hello,'}
              </Text>
              <Text style={lead}>
                Thank you for your payment — your spot is reserved. We can't wait
                to share this experience with you.
              </Text>
            </>
          )}
          <Section style={card}>
            <Row label="Booking" value={event_name} />
            <Row label="Amount paid" value={formattedAmount} />
            {copy_for_owner && customer_email ? (
              <Row label="Sent to" value={customer_email} />
            ) : null}
          </Section>
          {!copy_for_owner && (
            <Text style={lead}>
              If you have any questions before then, just reply to this email or
              write to us at{' '}
              <Link href="mailto:info@iridescencehealing.com" style={link}>
                info@iridescencehealing.com
              </Link>
              .
            </Text>
          )}
          <Hr style={hr} />
          <Text style={muted}>With love, Met &amp; the Iridescence Healing team</Text>
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
    `Booking confirmed — ${d.event_name || 'Iridescence Healing'}`,
  displayName: 'Booking confirmation (customer)',
  previewData: {
    customer_name: 'Aurora',
    amount_total: 4000,
    currency: 'usd',
    event_name: 'Full Moon Sound Bath',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, Arial, sans-serif',
}
const container = { padding: '32px 28px', maxWidth: 560, margin: '0 auto' }
const brand = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: 20,
  color: '#7a4fa3',
  margin: '0 0 16px',
}
const h1 = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: 28,
  color: '#1f1b2e',
  margin: '0 0 12px',
}
const lead = { fontSize: 15, color: '#4a4458', lineHeight: '22px' }
const card = {
  marginTop: 18,
  marginBottom: 18,
  padding: '20px 22px',
  backgroundColor: '#f7f2fa',
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
const link = { color: '#7a4fa3' }
const hr = { borderColor: '#eee', margin: '24px 0' }
const muted = { fontSize: 13, color: '#6b6577' }
