import { createFileRoute } from "@tanstack/react-router";
import { quizInput } from "@/lib/funnel.schemas";

export const Route = createFileRoute("/api/public/forms/quiz")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = quizInput.parse(await request.json());
          const { submitQuizData } = await import("@/lib/funnel.server");
          return Response.json(await submitQuizData(data));
        } catch (error) {
          console.error("quiz form submission failed", error);
          return Response.json(
            { error: "Unable to process your request. Please try again." },
            { status: 400 },
          );
        }
      },
    },
  },
});