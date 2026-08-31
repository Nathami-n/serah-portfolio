import { Link } from "react-router";

import { Image } from "~/components/image";
import { Reveal } from "~/components/motion/primitives";
import { Container } from "~/components/section";
import { AWARD } from "~/content/bio";

/**
 * The story section.
 *
 * Structurally different from the section above it on purpose: an offset
 * two-column with a portrait bleeding to one side, rather than another grid of
 * cards. Three consecutive sections of bordered cards is what makes a page read
 * as generated, so the rhythm has to change here.
 *
 * Padding is also deliberately larger than the section above. Sections must not
 * all breathe at the same rate.
 */
export function Story() {
  return (
    <section className="border-y border-border/60 bg-card/40 py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal className="min-w-0 lg:order-2">
            <Image
              slug="awards-sit"
              alt="Serah in a black wide-brimmed hat and red plaid shirt, seated in a pink armchair."
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="rounded-lg"
            />
          </Reveal>

          <div className="flex min-w-0 flex-col gap-6 lg:order-1">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                These songs were
                <br className="hidden sm:block" /> never meant to be
                <br className="hidden sm:block" /> museum pieces.
              </h2>
            </Reveal>

            <Reveal index={1}>
              <p className="w-full max-w-[52ch] text-base leading-[1.65] text-muted-foreground sm:text-lg">
                Franco, Mpongo Love, Les Wanyika. Serah sings them straight, at
                full length, with the arrangements intact. No irony, no remix,
                no apology for the tempo. It takes a voice that can actually
                carry the originals, and that is rarer than the sheer number of
                covers out there suggests.
              </p>
            </Reveal>

            {/*
              The award, stated plainly. It is verifiable: the trophy is
              engraved with her name and the Tuko article reports it
              independently. No invented metrics, no fabricated quotes.
            */}
            <Reveal index={2}>
              <div className="mt-2 border-l-2 border-primary pl-5">
                <p className="font-display text-lg font-medium">
                  {AWARD.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {AWARD.presenter}
                </p>
              </div>
            </Reveal>

            <Reveal index={3}>
              <Link
                to="/about"
                className="mt-2 w-fit border-b border-foreground/25 pb-2 pt-2 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                Read her story
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
