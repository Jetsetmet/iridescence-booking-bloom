import { createServerFn } from "@tanstack/react-start";
import { createCampaignAndSend, buildNewsletterHtml } from "@/lib/mailchimp.server";

export const sendNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: {
    password: string;
    subjectLine: string;
    previewText?: string;
    headline?: string;
    bodyHtml: string;
    ctaText?: string;
    ctaUrl?: string;
    imageUrl?: string;
  }) => data)
  .handler(async ({ data }) => {
    const adminPassword = process.env.NEWSLETTER_ADMIN_PASSWORD;
    if (adminPassword && data.password !== adminPassword) {
      throw new Error("Invalid password");
    }

    const now = new Date();
    const monthLabel = now.toLocaleString("en-US", { month: "long", year: "numeric" });

    const html = buildNewsletterHtml({
      monthLabel,
      headline: data.headline,
      bodyHtml: data.bodyHtml,
      ctaText: data.ctaText,
      ctaUrl: data.ctaUrl,
      imageUrl: data.imageUrl,
    });

    const result = await createCampaignAndSend({
      subjectLine: data.subjectLine,
      previewText: data.previewText,
      title: data.subjectLine,
      html,
    });

    return result;
  });
