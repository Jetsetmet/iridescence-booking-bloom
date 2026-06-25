import { createClient } from "@supabase/supabase-js";
import type { BookingInput, LeadInput, QuizInput } from "./funnel.schemas";

// Use the publishable key for public form inserts. RLS policies allow public
// form submissions while keeping reads private.
function getPublicClient() {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("Public database client not configured");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function submitLeadData(data: LeadInput) {
  const { syncToMailchimp } = await import("./mailchimp.server");
  const { notifyOwner } = await import("./email/notify-owner.server");
  const { error } = await getPublicClient()
    .from("leads")
    .insert({ email: data.email, name: data.name ?? null, source: data.source });

  if (error && !error.message.includes("duplicate")) {
    console.error("submitLead insert failed", error);
    throw new Error("Unable to process your request. Please try again.");
  }

  try {
    await syncToMailchimp({ email: data.email, name: data.name, tags: [data.source] });
  } catch (e) {
    console.error("submitLead mailchimp failed", e);
  }

  // The meditation email itself is also backed by a database trigger for the
  // meditation sources, so live and preview keep behaving the same after deploys.
  await notifyOwner("lead-notification", {
    name: data.name ?? "",
    email: data.email,
    source: data.source,
  });

  return { ok: true };
}

export async function submitBookingData(data: BookingInput) {
  const { syncToMailchimp } = await import("./mailchimp.server");
  const { notifyOwner } = await import("./email/notify-owner.server");
  const supabase = getPublicClient();
  const { error } = await supabase.from("bookings").insert({
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

  await supabase.from("leads").insert({
    email: data.email,
    name: data.name,
    source: "booking",
  });

  try {
    await syncToMailchimp({
      email: data.email,
      name: data.name,
      tags: ["booking", `offering:${data.offering}`],
    });
  } catch (e) {
    console.error("submitBooking mailchimp failed", e);
  }

  await notifyOwner("booking-notification", {
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    offering: data.offering,
    preferred_date: data.preferred_date || "",
    notes: data.notes || "",
  });

  return { ok: true };
}

export async function submitQuizData(data: QuizInput) {
  const { syncToMailchimp } = await import("./mailchimp.server");
  const { notifyOwner } = await import("./email/notify-owner.server");
  const supabase = getPublicClient();
  const { error } = await supabase.from("quiz_results").insert({
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
    await supabase.from("leads").insert({
      email: data.email,
      name: data.name || null,
      source: "quiz",
    });
    try {
      await syncToMailchimp({
        email: data.email,
        name: data.name || null,
        tags: ["quiz", `recommended:${data.recommended_offering}`],
      });
    } catch (e) {
      console.error("submitQuiz mailchimp failed", e);
    }
  }

  await notifyOwner("quiz-notification", {
    name: data.name || "Anonymous",
    email: data.email || "",
    recommended_offering: data.recommended_offering,
    answers: data.answers,
  });

  return { ok: true };
}