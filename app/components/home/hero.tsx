import { Link } from "react-router";

import { Image } from "~/components/image";
import { HeroReveal, Parallax, WordReveal } from "~/components/motion/primitives";
import { buttonStyles } from "~/components/ui/button";
import { HERO_PHOTO } from "~/content/gallery";
import { whatsappLink } from "~/content/site";

/**
 * Hero.
 *
 * Deliberately NOT the generated-page hero: no blurred glow blob behind the
 * text, no masked grid, no pill badge above the h1, no accent-coloured word
 * mid-headline, no gradient-filled text. Each of those is a specifically
 * documented tell.
 *
 * What carries it instead is her photograph, at a size that respects it. The
 * portrait is the subject of the page, so it gets real estate rather than
 * sitting in a decorated frame.
 *
 * The old hero had a `setInterval` re-rendering the page every 1000ms to bob a
 * button, and a `yoyo: Infinity` transition prop that framer-motion removed
 * several majors ago, so it did nothing at all.
 */
export function Hero() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        {/* min-w-0 so this text column cannot force the grid past the viewport */}
        <div className="flex min-w-0 flex-col items-start gap-6">
          {/*
            Word-by-word resolve rather than a single fade. The full string is
            exposed to assistive tech in one piece; only the visual
            presentation is staggered.
          */}
          <WordReveal
            as="h1"
            text="The African classics, sung properly."
            className="font-display text-[clamp(2.75rem,8vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
          />

          <HeroReveal index={1}>
            <p className="w-full max-w-[46ch] text-lg leading-[1.6] text-muted-foreground">
              Serah Ke sings Rhumba and Zilizopendwa. Franco, Mpongo Love, Les
              Wanyika, the Maroon Commandos. For the people who remember them,
              and the people meeting them for the first time.
            </p>
          </HeroReveal>

          <HeroReveal index={2} className="w-full">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/music" className={buttonStyles({ size: "lg" })}>
                Listen
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "outline", size: "lg" })}
              >
                Book for an event
              </a>
            </div>
          </HeroReveal>
        </div>

        <HeroReveal index={2} className="min-w-0">
          {/*
            `priority` on this one image only: it is the largest thing above the
            fold, so it should not be lazy-loaded. Marking everything priority
            is the same as marking nothing.

            `sizes` matters as much as the srcset. At the lg breakpoint this
            column is a little under half of a 1152px container, so telling the
            browser 45vw stops it fetching the 1920px variant for a ~520px box.
          */}
          {/* Small parallax drift, ~40px over the scroll through. */}
          <Parallax distance={28}>
            <Image
              slug={HERO_PHOTO}
              alt="Serah Ke seated against a dark panelled wall, laughing, holding a bouquet of yellow flowers."
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="rounded-lg"
            />
          </Parallax>
        </HeroReveal>
      </div>
    </section>
  );
}
