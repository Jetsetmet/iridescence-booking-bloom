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
  try {
    const { enqueueNotification } = await import('./enqueue-notification.server')
    await enqueueNotification(templateName, templateData, recipient)
  } catch (err) {
    // Never let notification failures break the user-facing submission
    console.error('notifyOwner: enqueue failed', { templateName, err })
  }
}