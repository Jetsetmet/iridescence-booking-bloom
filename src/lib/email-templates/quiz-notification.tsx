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
  recommended_offering?: string
  answers?: Record<string, string>
}

const Email = ({
  name = 'Someone',
  email = '',
  recommended_offering = '',
  answers = {},
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New quiz result from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New quiz submission</Heading>
        <Text style={lead}>
          {name} just completed the offering quiz.
        </Text>
        <Section style={card}>
          <Text style={rowLabel}>Name</Text>
          <Text style={rowValue}>{name}</Text>
          {email ? (
            <>
              <Text style={rowLabel}>Email</Text>
              <Text style={rowValue}>{email}</Text>
            </>
          ) : null}
          <Text style={rowLabel}>Recommended offering</Text>
          <Text style={rowValue}>{recommended_offering}</Text>
        </Section>
        {Object.keys(answers).length ? (
          <Section style={card}>
            <Text style={rowLabel}>Answers</Text>
            {Object.entries(answers).map(([k, v]) => (
              <Text key={k} style={rowValue}>
                {k}: {v}
              </Text>
            ))}
          </Section>
        ) : null}
        <Hr style={hr} />
        <Text style={muted}>Captured to your Mailchimp list automatically.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) =>
    `New quiz result — ${d.recommended_offering ?? 'Iridescence'}`,
  displayName: 'Quiz notification (owner)',
  to: 'info@iridescencehealing.com',
  previewData: {
    name: 'Aurora Moon',
    email: 'aurora@example.com',
    recommended_offering: 'Cacao Ceremony',
    answers: { feeling: 'tender', goal: 'open heart' },
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
  margin: '8px 0 2px',
}
const rowValue = { fontSize: 15, color: '#1f1b2e', margin: 0 }
const hr = { borderColor: '#eee', margin: '24px 0' }
const muted = { fontSize: 13, color: '#6b6577' }