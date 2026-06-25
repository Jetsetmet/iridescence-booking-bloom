import { createServerFn } from "@tanstack/react-start";
import { bookingInput, leadInput, quizInput } from "./funnel.schemas";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => leadInput.parse(d))
  .handler(async ({ data }) => {
    const { submitLeadData } = await import("./funnel.server");
    return submitLeadData(data);
  });

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => bookingInput.parse(d))
  .handler(async ({ data }) => {
    const { submitBookingData } = await import("./funnel.server");
    return submitBookingData(data);
  });

export const submitQuiz = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => quizInput.parse(d))
  .handler(async ({ data }) => {
    const { submitQuizData } = await import("./funnel.server");
    return submitQuizData(data);
  });
