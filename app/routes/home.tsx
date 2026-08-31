import { BookingCta } from "~/components/home/booking-cta";
import { FeaturedMusic } from "~/components/home/featured-music";
import { Hero } from "~/components/home/hero";
import { Story } from "~/components/home/story";
import { SITE, SOCIAL_LINKS } from "~/content/site";
import { musicGroupSchema, pageMeta } from "~/lib/meta";

import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: SITE.tagline,
    description: SITE.description,
    path: "/",
  });

/**
 * Home.
 *
 * Route files stay thin: they own `meta` and compose sections. No copy, no
 * layout detail. All copy lives in app/content/.
 */
export default function Home() {
  return (
    <>
      {/*
        Structured data. This is what lets Google understand that the scattered
        YouTube / Instagram / TikTok profiles and this site are one artist,
        rather than unrelated pages that happen to share a name.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(musicGroupSchema(SOCIAL_LINKS)),
        }}
      />
      <Hero />
      <FeaturedMusic />
      <Story />
      <BookingCta />
    </>
  );
}
