import { HugeiconsIcon } from "@hugeicons/react";
import { LinkSquare02Icon } from "@hugeicons/core-free-icons";

import { Image } from "~/components/image";
import { Reveal } from "~/components/motion/primitives";
import { Container, Section } from "~/components/section";
import { AWARD, BIO_PARAGRAPHS, FACTS } from "~/content/bio";
import { PRESS } from "~/content/music";
import { pageMeta } from "~/lib/meta";

import type { Route } from "./+types/about";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: "About",
    description:
      "Serah Nyaboke, known as Serah Ke, sings Rhumba and Zilizopendwa. She started singing at three in a church choir and holds an honorary music industry award.",
    path: "/about",
    image: "awards-studio",
  });

/**
 * About.
 *
 * Prose-led, which is the third distinct structure on the site after the home
 * page's grid and the music page's rows.
 *
 * The press links are the strongest credibility material she has, so they sit
 * here in the open. The old site hid them behind a floating circular button
 * that slid a panel in from off-screen using a hardcoded `-left-[1000px]` and
 * an `x: 1000` animation, which only landed correctly at one viewport width.
 */
export default function About() {
  return (
    <>
      <Section className="pb-16 pt-14 sm:pb-20 sm:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div className="flex min-w-0 flex-col gap-6">
              <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
                Serah Nyaboke
              </h1>

              {BIO_PARAGRAPHS.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={
                    index === 0
                      ? "w-full max-w-[60ch] text-lg leading-[1.6] text-foreground/90 sm:text-xl"
                      : "w-full max-w-[62ch] text-base leading-[1.65] text-muted-foreground"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="min-w-0">
              <Image
                slug="awards-studio"
                alt="Serah seated on a stool against a dark panelled wall, holding a bouquet of yellow flowers."
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="rounded-lg"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Facts as a definition list, not a row of icon cards. */}
      <section className="border-y border-border/60 bg-card/40 py-14">
        <Container>
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((fact) => (
              <div key={fact.term} className="flex min-w-0 flex-col gap-1.5">
                <dt className="text-xs text-muted-foreground">{fact.term}</dt>
                <dd className="font-display text-base">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="flex min-w-0 flex-col gap-5">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Recognition
              </h2>
              <div className="border-l-2 border-primary pl-5">
                <p className="font-display text-lg font-medium">
                  {AWARD.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {AWARD.presenter}
                </p>
                <p className="mt-3 max-w-[46ch] text-sm leading-[1.65] text-muted-foreground">
                  {AWARD.note}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-5">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Press
              </h2>
              <ul className="flex flex-col border-t border-border/60">
                {PRESS.map((item, index) => (
                  <li key={item.href}>
                    <Reveal index={Math.min(index, 3)}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start justify-between gap-4 border-b border-border/60 py-4 transition-colors hover:text-primary"
                      >
                        <div className="flex min-w-0 flex-col gap-1">
                          <span className="text-xs text-muted-foreground">
                            {item.outlet}
                          </span>
                          <span className="text-sm leading-[1.5]">
                            {item.title}
                          </span>
                        </div>
                        <HugeiconsIcon
                          icon={LinkSquare02Icon}
                          size={16}
                          strokeWidth={1.8}
                          className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                        />
                      </a>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
