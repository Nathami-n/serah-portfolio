import { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

/**
 * Reduced-motion check without pulling in the motion library.
 *
 * This component's animation is pure CSS, so importing `useReducedMotion` from
 * `motion/react` just to read a media query dragged the whole animation
 * runtime into the bundle for a component that does not use it.
 *
 * Returns false on the server and on first client render so the markup matches,
 * then corrects after hydration. Subscribes to changes, because a visitor can
 * toggle the OS setting while the page is open.
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * A slow horizontal marquee of song titles, used as a section divider.
 *
 * WHY A MARQUEE HERE
 * ------------------
 * It is doing a job rather than decorating: it names the repertoire. A visitor
 * who does not know Zilizopendwa sees "Charonyi Ni Wasi / Sina Makosa / Ndaya"
 * drift past and understands what this artist actually sings, without reading a
 * list. It also gives the page a moment of movement between two static
 * sections, which is where the rhythm needed one.
 *
 * IMPLEMENTATION
 * A CSS animation on a duplicated track, not JavaScript. The content is
 * rendered twice and the track translates exactly -50%, so the second copy
 * lands where the first began and the loop is seamless. Being pure CSS it
 * costs no main-thread work and keeps running smoothly during scroll.
 *
 * `prefers-reduced-motion` stops the animation and centres a static row
 * instead. A permanently moving element is one of the clearest ways to make a
 * page unusable for someone with vestibular sensitivity, so this is not
 * optional.
 *
 * aria-hidden throughout: the titles are all listed properly on /music, so
 * repeating them to a screen reader as an endless stream adds nothing.
 */

interface MarqueeProps {
  items: readonly string[];
  className?: string;
  /** Seconds for one full pass. Higher is slower. */
  duration?: number;
}

export function Marquee({ items, className, duration = 40 }: MarqueeProps) {
  const reduced = usePrefersReducedMotion();

  if (items.length === 0) return null;

  const row = (
    <ul className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-8 sm:gap-12">
          <span className="whitespace-nowrap font-display text-2xl text-muted-foreground sm:text-3xl">
            {item}
          </span>
          {/* Separator dot, in the brand colour, between every title. */}
          <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-primary/50" />
        </li>
      ))}
    </ul>
  );

  if (reduced) {
    return (
      <div
        aria-hidden="true"
        className={cn("overflow-hidden border-y border-border/60 py-6", className)}
      >
        <div className="flex justify-center px-5">{row}</div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden border-y border-border/60 py-6",
        className,
      )}
      /*
       * The mask lives on the STATIC wrapper, not the moving track. Putting it
       * on the animated element would translate the fade along with the
       * content and the edges would stop fading.
       */
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex w-max"
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        {row}
        {/* The duplicate that makes the loop seamless. */}
        {row}
      </div>
    </div>
  );
}
