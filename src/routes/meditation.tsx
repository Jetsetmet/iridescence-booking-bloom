import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/meditation")({
  beforeLoad: () => {
    throw redirect({ to: "/breath-yoga" });
  },
});