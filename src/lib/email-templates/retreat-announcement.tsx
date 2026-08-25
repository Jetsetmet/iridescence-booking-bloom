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

const Email = () => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>A new retreat in Türkiye and beautiful gatherings this season.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>Iridescence Healing · A Journey Awaits</Text>

        <Heading as="h1" style={h1}>
          A Journey Awaits...
        </Heading>

        <Text style={greeting}>Hi Beautiful Soul,</Text>
        <Text style={bodyText}>
          I hope you're doing well.
        </Text>
        <Text style={bodyText}>
          I have a new retreat I would love to announce and some beautiful offerings coming up over the next few months, and I'd love to share them with you.
        </Text>

        <Section style={retreatCard}>
          <Text style={retreatFlag}>🇹🇷 NEW RETREAT</Text>
          <Heading as="h2" style={h2}>Resonance & Remembrance</Heading>
          <Text style={subtitle}>An Istanbul & Cappadocia Journey of Connection & Discovery</Text>
          <Text style={dateLine}>June 9–15, 2027</Text>

          <Text style={bodyText}>
            I'm so excited to finally share this very special retreat.
          </Text>
          <Text style={bodyText}>
            Join me for an unforgettable journey through the vibrant heart of Istanbul and the breathtaking landscapes of Cappadocia, where we'll slow down, reconnect and immerse ourselves in the beauty, rhythm and magic of Türkiye.
          </Text>
          <Text style={bodyText}>
            Together we'll wander bustling bazaars, sip traditional Turkish coffee, experience the warmth of a traditional hammam, witness the mesmerising Whirling Dervish Ceremony, watch the sunrise over Cappadocia's incredible valleys, and create space to reconnect with ourselves through breathwork, sound healing, cacao, movement and meaningful connection.
          </Text>
          <Text style={bodyText}>
            This retreat is an invitation to experience the beauty of another culture while remembering something beautiful within yourself.
          </Text>

          <Text style={listTitle}>Your Journey Includes</Text>
          {[
            'Boutique luxury accommodation',
            'Daily yoga, meditation & breathwork',
            'Immersive sound healing journeys',
            'Heart-opening cacao ceremony',
            'Traditional Turkish hammam experience',
            'Whirling Dervish Ceremony',
            'Bosphorus Sunset Cruise',
            'Turkish coffee & fortune reading',
            'Ancient underground cities & artisan villages',
            'Curated cultural experiences throughout Istanbul & Cappadocia',
            'Optional sunrise hot-air balloon flight',
          ].map((item, i) => (
            <Text key={i} style={listItem}>✨ {item}</Text>
          ))}

          <Text style={highlight}>Only 10 places available · $4,200 per person</Text>

          <Button href="mailto:info@iridescencehealing.com?subject=Reserving%20my%20spot%20%E2%80%94%20Resonance%20%26%20Remembrance%20Retreat" style={cta}>
            Reserve your spot
          </Button>
          <Button href="https://buy.stripe.com/00w3cwdky7Tq1IOc631Jm0m" style={cta}>
            Confirm & pay
          </Button>
          <Text style={eventMeta}>Full cancellation available up to 3 months before the retreat date.</Text>
        </Section>

        <Heading as="h2" style={h2}>🌙 Upcoming Events</Heading>
        <Text style={bodyText}>
          If Türkiye isn't calling you just yet, I'd love to welcome you to one of my upcoming gatherings.
        </Text>

        <Section style={eventCard}>
          <Text style={eventEmoji}>💛</Text>
          <Text style={eventDate}>Monday, August 17 · 6:30 PM</Text>
          <Heading as="h3" style={h3}>Virtual "Open Your Heart" Breathwork Journey</Heading>
          <Text style={bodyText}>
            A gentle hour of guided breath to soften the heart, release stored emotion and reconnect with yourself—from wherever you are.
          </Text>
          <Text style={eventMeta}>Online · $25</Text>
        </Section>

        <Section style={eventCard}>
          <Text style={eventEmoji}>🌕</Text>
          <Text style={eventDate}>Thursday, August 27 · 6:30 PM</Text>
          <Heading as="h3" style={h3}>Full Moon Lunar Eclipse Sound Bath - Thursday 27th</Heading>
          <Text style={bodyText}>
            Lie back and allow the soothing vibrations of crystal bowls, chimes and gong to wash through the body, calming the mind and inviting the nervous system home.
          </Text>
          <Text style={eventMeta}>New Orleans · $40</Text>
        </Section>

        <Section style={eventCard}>
          <Text style={eventEmoji}>🌹</Text>
          <Text style={eventDate}>Wednesday, September 9 · 6:30 PM</Text>
          <Heading as="h3" style={h3}>Cacao + Heart Circle</Heading>
          <Text style={bodyText}>
            An intimate evening of ceremonial cacao, heartfelt connection and gentle sharing in a beautiful sanctuary space.
          </Text>
          <Text style={eventMeta}>Uptown New Orleans · $40</Text>
        </Section>

        <Button href="https://www.iridescencehealing.com/events" style={ctaOutline}>
          Reserve your place & view all upcoming events
        </Button>

        <Text style={closing}>
          Whether we meet online, in New Orleans, or on this magical journey through Türkiye, I'd love to share space with you.
        </Text>
        <Text style={closing}>
          Thank you, as always, for being part of this beautiful community.
        </Text>

        <Hr style={hr} />

        <Text style={signOff}>
          With love,
          <br />
          Met 🤍
          <br />
          <span style={signatureTitle}>Transformational Wellness Practitioner</span>
          <br />
          <span style={signatureTitle}>Retreat Facilitator & Wellness Experience Designer</span>
        </Text>

        <Text style={siteLink}>
          <a href="https://www.iridescencehealing.com" style={link}>www.iridescencehealing.com</a>
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'A Journey Awaits...',
  displayName: 'Retreat announcement newsletter',
  previewData: {},
} satisfies TemplateEntry

const main = { backgroundColor: '#faf7f2', fontFamily: 'Georgia, serif' }
const container = {
  padding: '40px 32px',
  maxWidth: 600,
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: 24,
}
const eyebrow = {
  fontSize: 11,
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  color: '#a47148',
  margin: '0 0 16px',
}
const h1 = {
  fontSize: 32,
  lineHeight: '1.2',
  color: '#1f1b2e',
  margin: '0 0 24px',
  fontWeight: 400,
}
const h2 = {
  fontSize: 24,
  lineHeight: '1.25',
  color: '#1f1b2e',
  margin: '36px 0 16px',
  fontWeight: 400,
}
const h3 = {
  fontSize: 18,
  lineHeight: '1.3',
  color: '#1f1b2e',
  margin: '6px 0 10px',
  fontWeight: 400,
}
const greeting = {
  fontSize: 17,
  lineHeight: '1.6',
  color: '#2b2b2b',
  margin: '0 0 12px',
}
const bodyText = {
  fontSize: 16,
  lineHeight: '1.7',
  color: '#2b2b2b',
  margin: '0 0 14px',
}
const retreatCard = {
  margin: '28px 0',
  padding: '28px',
  backgroundColor: '#faf6f1',
  borderRadius: 20,
}
const retreatFlag = {
  fontSize: 13,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#a47148',
  margin: '0 0 10px',
}
const subtitle = {
  fontSize: 16,
  color: '#4a4458',
  margin: '0 0 6px',
  fontStyle: 'italic' as const,
}
const dateLine = {
  fontSize: 15,
  color: '#6b5d8a',
  margin: '0 0 18px',
  fontWeight: 600,
}
const listTitle = {
  fontSize: 16,
  color: '#1f1b2e',
  margin: '22px 0 10px',
  fontWeight: 600,
}
const listItem = {
  fontSize: 15,
  lineHeight: '1.5',
  color: '#2b2b2b',
  margin: '0 0 6px',
}
const highlight = {
  fontSize: 16,
  color: '#1f1b2e',
  margin: '20px 0 18px',
  fontWeight: 600,
}
const cta = {
  display: 'inline-block',
  backgroundColor: '#a47148',
  color: '#ffffff',
  textDecoration: 'none',
  padding: '14px 28px',
  borderRadius: 999,
  fontSize: 15,
  marginTop: 8,
}
const ctaOutline = {
  display: 'inline-block',
  backgroundColor: '#ffffff',
  color: '#a47148',
  textDecoration: 'none',
  padding: '12px 24px',
  borderRadius: 999,
  border: '1px solid #a47148',
  fontSize: 15,
  margin: '12px 0 0',
}
const eventCard = {
  margin: '16px 0',
  padding: '20px',
  backgroundColor: '#faf6f1',
  borderRadius: 16,
}
const eventEmoji = {
  fontSize: 20,
  margin: '0 0 4px',
}
const eventDate = {
  fontSize: 14,
  color: '#6b5d8a',
  margin: '0 0 4px',
  fontWeight: 600,
}
const eventMeta = {
  fontSize: 14,
  color: '#4a4458',
  margin: '10px 0 0',
}
const closing = {
  fontSize: 16,
  lineHeight: '1.7',
  color: '#2b2b2b',
  margin: '16px 0 0',
}
const hr = { borderColor: '#eee8df', margin: '32px 0' }
const signOff = {
  fontSize: 16,
  lineHeight: '1.7',
  color: '#2b2b2b',
  margin: '0',
}
const signatureTitle = {
  fontSize: 14,
  color: '#6b5d8a',
}
const siteLink = {
  margin: '18px 0 0',
  fontSize: 14,
}
const link = {
  color: '#a47148',
  textDecoration: 'underline',
}
