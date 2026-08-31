import { PlaceholderPage } from "~/components/placeholder-page";
import { pageMeta } from "~/lib/meta";

import type { Route } from "./+types/shop";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: "Shop",
    description: "Merchandise from Serah Ke, coming soon.",
    path: "/shop",
  });

export default function Shop() {
  return (
    <PlaceholderPage
      title="Shop"
      description="There is nothing to buy here yet. When there is, it will be here. Until then, the music is all on YouTube and the fastest way to reach Serah is WhatsApp."
      actionLabel="Message Serah"
    />
  );
}
