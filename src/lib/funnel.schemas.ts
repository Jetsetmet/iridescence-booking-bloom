import { z } from "zod";

const emailSchema = z.string().trim().email().max(255).toLowerCase();

export const leadInput = z.object({
  email: emailSchema,
  name: z.string().trim().max(120).optional(),
  source: z.string().trim().max(60).default("lead_magnet"),
});

export type LeadInput = z.infer<typeof leadInput>;

export const bookingInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: emailSchema,
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  offering: z.string().trim().min(1).max(80),
  preferred_date: z.string().trim().max(120).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingInput>;

export const quizInput = z.object({
  email: emailSchema.optional().or(z.literal("")),
  name: z.string().trim().max(120).optional().or(z.literal("")),
  answers: z.record(z.string(), z.string()),
  recommended_offering: z.string().trim().min(1).max(80),
});

export type QuizInput = z.infer<typeof quizInput>;