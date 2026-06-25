import type { BookingInput, LeadInput, QuizInput } from "./funnel.schemas";

async function postForm<TInput, TOutput>(path: string, data: TInput): Promise<TOutput> {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const payload = (await response.json().catch(() => ({}))) as {
    error?: string;
  } & TOutput;

  if (!response.ok) {
    throw new Error(payload.error || "Unable to process your request. Please try again.");
  }

  return payload;
}

export function submitLeadRequest(data: LeadInput) {
  return postForm<LeadInput, { ok: true }>("/api/public/forms/lead", data);
}

export function submitBookingRequest(data: BookingInput) {
  return postForm<BookingInput, { ok: true }>("/api/public/forms/booking", data);
}

export function submitQuizRequest(data: QuizInput) {
  return postForm<QuizInput, { ok: true }>("/api/public/forms/quiz", data);
}