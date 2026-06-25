import { createFileRoute } from "@tanstack/react-router";
import { leadInput } from "@/lib/funnel.schemas";

export const Route = createFileRoute("/api/public/forms/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = leadInput.parse(await request.json());
          const { submitLeadData } = await import("@/lib/funnel.server");
          return Response.json(await submitLeadData(data));
        } catch (error) {
          console.error("lead form submission failed", error);
          return Response.json(
            { error: "Unable to process your request. Please try again." },
            { status: 400 },
          );
        }
      },
    },
  },
});