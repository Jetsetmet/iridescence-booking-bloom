import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { syncToMailchimp } from "./mailchimp.server";
import { enqueueNotification } from "./email/enqueue-notification.server";

const emailSchema = z.string().trim().email().max(255).toLowerCase();

// Use the publishable (anon) key for these public form inserts.
// RLS policies allow anon INSERT on leads, bookings, and quiz_results,
// so we avoid depending on the service-role key being present in the
// server runtime environment.
function getPublicClient() {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase public client not configured");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const leadInput = z.object({
  email: emailSchema,
  name: z.string().trim().max(120).optional(),
  source: z.string().trim().max(60).default("lead_magnet"),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => leadInput.parse(d))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("leads")
      .insert({ email: data.email, name: data.name ?? null, source: data.source });
    if (error && !error.message.includes("duplicate")) {
      console.error("submitLead insert failed", error);
      throw new Error("Unable to process your request. Please try again.");
    }
    await syncToMailchimp({ email: data.email, name: data.name, tags: [data.source] });
    return { ok: true };
  });

const bookingInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: emailSchema,
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  offering: z.string().trim().min(1).max(80),
  preferred_date: z.string().trim().max(120).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => bookingInput.parse(d))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("bookings").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      offering: data.offering,
      preferred_date: data.preferred_date || null,
      notes: data.notes || null,
    });
    if (error) {
      console.error("submitBooking insert failed", error);
      throw new Error("Unable to process your request. Please try again.");
    }
    // Also capture as a lead for the nurture list
    await supabaseAdmin.from("leads").insert({
      email: data.email,
      name: data.name,
      source: "booking",
    });
    await syncToMailchimp({
      email: data.email,
      name: data.name,
      tags: ["booking", `offering:${data.offering}`],
    });
    await enqueueNotification("booking-notification", {
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      offering: data.offering,
      preferred_date: data.preferred_date || "",
      notes: data.notes || "",
    });
    return { ok: true };
  });

const quizInput = z.object({
  email: emailSchema.optional().or(z.literal("")),
  name: z.string().trim().max(120).optional().or(z.literal("")),
  answers: z.record(z.string(), z.string()),
  recommended_offering: z.string().trim().min(1).max(80),
});

export const submitQuiz = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => quizInput.parse(d))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("quiz_results").insert({
      email: data.email || null,
      name: data.name || null,
      answers: data.answers,
      recommended_offering: data.recommended_offering,
    });
    if (error) {
      console.error("submitQuiz insert failed", error);
      throw new Error("Unable to process your request. Please try again.");
    }
    if (data.email) {
      await supabaseAdmin.from("leads").insert({
        email: data.email,
        name: data.name || null,
        source: "quiz",
      });
      await syncToMailchimp({
        email: data.email,
        name: data.name || null,
        tags: ["quiz", `recommended:${data.recommended_offering}`],
      });
    }
    await enqueueNotification("quiz-notification", {
      name: data.name || "Anonymous",
      email: data.email || "",
      recommended_offering: data.recommended_offering,
      answers: data.answers,
    });
    return { ok: true };
  });
