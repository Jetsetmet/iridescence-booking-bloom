const OWNER_EMAIL = 'info@iridescencehealing.com'

/**
 * Queue an owner-notification email through the configured app-email pipeline.
 * Failures are logged without blocking the user-facing form submission.
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