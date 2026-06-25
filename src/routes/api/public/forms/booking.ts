import { createFileRoute } from "@tanstack/react-router";
import { bookingInput } from "@/lib/funnel.schemas";

export const Route = createFileRoute("/api/public/forms/booking")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = bookingInput.parse(await request.json());
          const { submitBookingData } = await import("@/lib/funnel.server");
          return Response.json(await submitBookingData(data));
        } catch (error) {
          console.error("booking form submission failed", error);
          return Response.json(
            { error: "Unable to process your request. Please try again." },
            { status: 400 },
          );
        }
      },
    },
  },
});