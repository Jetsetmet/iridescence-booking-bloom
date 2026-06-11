import React from 'react'
import {
  Body,
  Button,
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
}

const MEDITATION_URL = 'https://www.youtube.com/watch?v=tdbMnz-Jpgs'

const Email = ({ name = '' }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your 11-minute meditation for the heart is here ✨</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>A gift for your heart{name ? `, ${name}` : ''}</Heading>
        <Text style={lead}>
          Welcome, dear one. As promised — here is your free 11-minute meditation
          and breathwork practice for the heart. For moments of grief, heartache,
          or heaviness. Let Met hold you through every breath.
        </Text>
        <Section style={{ textAlign: 'center', margin: '28px 0' }}>
          <Button href={MEDITATION_URL} style={button}>
            Begin the practice
          </Button>
        </Section>
        <Text style={lead}>
          Find a quiet corner. Place a hand on your heart. Press play when you're
          ready — there's no rush.
        </Text>
        <Hr style={hr} />
        <Text style={muted}>
          With love,<br />
          Met · Iridescence Healing
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Your meditation for the heart 🤍',
  displayName: 'Lead magnet — heart meditation',
  previewData: { name: 'Aurora' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, serif' }
const container = { padding: '32px 28px', maxWidth: 560, margin: '0 auto' }
const h1 = { fontSize: 26, color: '#1f1b2e', margin: '0 0 12px' }
const lead = { fontSize: 15, color: '#4a4458', lineHeight: '22px' }
const button = {
  backgroundColor: '#a47148',
  color: '#ffffff',
  padding: '14px 28px',
  borderRadius: 999,
  fontSize: 15,
  textDecoration: 'none',
  display: 'inline-block',
}
const hr = { borderColor: '#eee', margin: '24px 0' }
const muted = { fontSize: 13, color: '#6b6577' }