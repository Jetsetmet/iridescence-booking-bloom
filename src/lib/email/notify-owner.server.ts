import * as React from 'react'
import { render } from '@react-email/components'
import { sendLovableEmail } from '@lovable.dev/email-js'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'Iridescence Healing'
const SENDER_DOMAIN = 'notify.notify.iridescencehealing.com'
const FROM_DOMAIN = 'notify.iridescencehealing.com'
const OWNER_EMAIL = 'info@iridescencehealing.com'

/**
 * Send an owner-notification email directly via Lovable Emails, bypassing the
 * pgmq queue and service-role-key dependency. Use for fire-and-forget
 * notifications where delivery should not block the user-facing submit but
 * should not silently fail either — failures are logged for observability.
 */
export async function notifyOwner(
  templateName: string,
  templateData: Record<string, any> = {},
  recipient: string = OWNER_EMAIL,
): Promise<void> {
  const apiKey = process.env.LOVABLE_API_KEY
  if (!apiKey) {
    console.error('notifyOwner: LOVABLE_API_KEY missing')
    return
  }
  const template = TEMPLATES[templateName]
  if (!template) {
    console.error('notifyOwner: template not found', { templateName })
    return
  }

  try {
    const element = React.createElement(template.component, templateData)
    const html = await render(element)
    const text = await render(element, { plainText: true })
    const subject =
      typeof template.subject === 'function'
        ? template.subject(templateData)
        : template.subject

    await sendLovableEmail(
      {
        to: template.to ?? recipient,
        from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject,
        html,
        text,
        purpose: 'transactional',
        idempotency_key: `${templateName}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      },
      { apiKey },
    )
  } catch (err) {
    // Never let notification failures break the user-facing submission
    console.error('notifyOwner: send failed', { templateName, err })
  }
}