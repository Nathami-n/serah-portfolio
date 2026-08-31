import { PlaceholderPage } from "~/components/placeholder-page";
import { pageMeta } from "~/lib/meta";

import type { Route } from "./+types/events";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: "Events",
    description:
      "Book Serah Ke for weddings, corporate events and private functions across Kenya.",
    path: "/events",
  });

export default function Events() {
  return (
    <PlaceholderPage
      title="Upcoming shows"
      description="A listing of confirmed dates is on the way. In the meantime, Serah performs at weddings, corporate events and private functions across Kenya, solo or with a full band. Message her directly for availability."
      actionLabel="Ask about a date"
    />
  );
}
