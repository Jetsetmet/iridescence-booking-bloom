import * as React from 'react'
import { render } from '@react-email/components'
import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'Iridescence Healing'
const SENDER_DOMAIN = 'notify.notify.iridescencehealing.com'
const FROM_DOMAIN = 'notify.iridescencehealing.com'

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Enqueue a transactional notification email directly from a server function,
 * bypassing the JWT-protected /lovable/email/transactional/send route.
 * Use only for templates with a fixed `to` recipient (owner notifications).
 */
export async function enqueueNotification(
  templateName: string,
  templateData: Record<string, any> = {},
  recipientOverride?: string,
): Promise<void> {
  const template = TEMPLATES[templateName]
  if (!template) {
    console.error('enqueueNotification: template not found', { templateName })
    return
  }
  const recipient = template.to ?? recipientOverride
  if (!recipient) {
    console.error('enqueueNotification: no recipient', { templateName })
    return
  }

  try {
    const messageId = crypto.randomUUID()
    const normalizedEmail = recipient.toLowerCase()

    // Suppression check
    const { data: suppressed } = await supabaseAdmin
      .from('suppressed_emails')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle()
    if (suppressed) {
      console.log('enqueueNotification: recipient suppressed', { templateName })
      return
    }

    // Unsubscribe token (reuse or create)
    let unsubscribeToken: string
    const { data: existing } = await supabaseAdmin
      .from('email_unsubscribe_tokens')
      .select('token, used_at')
      .eq('email', normalizedEmail)
      .maybeSingle()
    if (existing && !existing.used_at) {
      unsubscribeToken = existing.token
    } else {
      unsubscribeToken = generateToken()
      await supabaseAdmin
        .from('email_unsubscribe_tokens')
        .upsert(
          { token: unsubscribeToken, email: normalizedEmail },
          { onConflict: 'email', ignoreDuplicates: true },
        )
      const { data: stored } = await supabaseAdmin
        .from('email_unsubscribe_tokens')
        .select('token')
        .eq('email', normalizedEmail)
        .maybeSingle()
      if (stored?.token) unsubscribeToken = stored.token
    }

    const element = React.createElement(template.component, templateData)
    const html = await render(element)
    const text = await render(element, { plainText: true })
    const subject =
      typeof template.subject === 'function'
        ? template.subject(templateData)
        : template.subject

    await supabaseAdmin.from('email_send_log').insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: recipient,
      status: 'pending',
    })

    const { error } = await supabaseAdmin.rpc('enqueue_email', {
      queue_name: 'transactional_emails',
      payload: {
        message_id: messageId,
        to: recipient,
        from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject,
        html,
        text,
        purpose: 'transactional',
        label: templateName,
        idempotency_key: messageId,
        unsubscribe_token: unsubscribeToken,
        queued_at: new Date().toISOString(),
      },
    })
    if (error) {
      console.error('enqueueNotification: enqueue failed', { templateName, error })
    }
  } catch (err) {
    // Never let notification failures break the user-facing submission
    console.error('enqueueNotification: unexpected error', { templateName, err })
  }
}