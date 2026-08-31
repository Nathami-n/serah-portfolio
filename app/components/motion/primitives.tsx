import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import type * as React from "react";

import { cn } from "~/lib/utils";

/**
 * Shared motion primitives. ALL motion on the site goes through these.
 *
 * -------------------------------------------------------------------------
 * RULE 1: content must never depend on JS to be visible.
 * -------------------------------------------------------------------------
 * The obvious way to write a scroll reveal is `initial={{ opacity: 0 }}` plus
 * `whileInView`. On an SSR site that is a correctness bug, not a style choice:
 * React renders `style="opacity:0"` into the HTML, so if JavaScript fails, is
 * blocked, or has not hydrated yet, the visitor gets a blank page with a
 * working header and footer around it. That happened here and was caught in a
 * screenshot.
 *
 * So every primitive renders its children plainly on the server, and only
 * becomes animated after mounting on the client. First paint is always
 * readable; motion is layered on afterwards.
 *
 * -------------------------------------------------------------------------
 * RULE 2: taste. Motion should be felt, not watched.
 * -------------------------------------------------------------------------
 *   - transform and opacity only, never anything that triggers layout or paint
 *   - ONE easing curve for entrances. No springs on UI, no overshoot: bouncy
 *     easing is a template tell
 *   - travel stays 12-24px. Big slide-ins read as a template
 *   - reveals fire ONCE. The page must not re-animate on scroll-up
 *   - prefers-reduced-motion collapses everything to a plain opacity swap, or
 *     to nothing at all where the effect is purely decorative
 *
 * The old site hand-rolled framer-motion in twelve components, each with its
 * own easing, distance and duration, including two `setInterval` loops that
 * re-rendered a button every second forever to make it bob, and a
 * `yoyo: Infinity` prop that framer-motion removed several majors ago, so it
 * silently did nothing.
 */

/** The site's single entrance curve, a gentle decelerating ease-out. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * True only after the component has mounted in the browser.
 *
 * Deliberately NOT `typeof window !== "undefined"`, which is true during
 * hydration and would produce a server/client markup mismatch. The effect runs
 * after hydration, so the first client render still matches the server's.
 */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Motion is off when the visitor asked for less of it, or before hydration. */
function useMotionEnabled() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return mounted && !reduced;
}

interface RevealProps {
  children: React.ReactNode;
  /** Stagger position. Multiplied by 60ms, capped so nothing waits too long. */
  index?: number;
  className?: string;
}

/**
 * Fade and rise into view, once.
 *
 * Do NOT wrap every section in this. One orchestrated entrance in the hero and
 * a light touch further down is the goal; fade-up on absolutely everything is
 * itself a listed tell.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const enabled = useMotionEnabled();
  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: EASE,
        delay: Math.min(index * 0.06, 0.3),
      }}
    >
      {children}
    </motion.div>
  );
}

/** The hero's entrance. Runs on mount, since it is already in view. */
export function HeroReveal({ children, index = 0, className }: RevealProps) {
  const enabled = useMotionEnabled();
  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.08 + index * 0.09 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Headline that resolves word by word.
 *
 * Words, not letters. Letter-by-letter animation on a headline is a novelty
 * effect that hurts readability and takes far too long on a long line; the old
 * site did exactly that on hover, re-animating each character's opacity. Words
 * read as one deliberate movement and finish quickly.
 *
 * The full text is always present for screen readers and for search engines via
 * the server render; only the visual presentation is staggered.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
}) {
  const enabled = useMotionEnabled();
  if (!enabled) return <Tag className={className}>{text}</Tag>;

  const words = text.split(" ");

  return (
    <Tag className={className}>
      {/*
        The visible words are aria-hidden and the whole string is exposed once
        via sr-only, so assistive tech reads a sentence rather than a list of
        disconnected words.
      */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            // inline-block so transform applies; the trailing space is kept
            // outside the animated span so the line still wraps naturally.
            className="inline-block whitespace-pre"
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: "0.4em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: EASE,
                delay: delay + i * 0.055,
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/**
 * Slow parallax drift for a decorative image.
 *
 * The element moves at a slightly different rate to the page as it scrolls
 * through the viewport. Kept deliberately small (a ~40px range): heavy parallax
 * is motion-sick territory and reads as a template.
 *
 * A spring smooths the raw scroll value so the movement does not judder on a
 * trackpad. This is the one place a spring is appropriate, because it is
 * damping a continuous input rather than easing a UI transition.
 */
export function Parallax({
  children,
  className,
  distance = 40,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useMotionEnabled();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });
  const y = useTransform(smooth, [0, 1], [distance, -distance]);

  if (!enabled) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/**
 * A thin progress bar showing how far down the page the visitor is.
 *
 * Cheap, genuinely useful on the long pages, and it uses `scaleX` on a
 * transform rather than animating width, so it never triggers layout.
 */
export function ScrollProgress() {
  const enabled = useMotionEnabled();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-100 h-0.5 origin-left bg-primary/70"
    />
  );
}

/**
 * Hover lift. A small, fast rise on pointer devices only.
 *
 * `@media (hover: hover)` matters: on touch, a hover style sticks after a tap
 * and looks like a stuck state. Tailwind's `hover:` variant already compiles
 * with that guard in v4.
 */
export function HoverLift({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const enabled = useMotionEnabled();
  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Counts a number up when it scrolls into view.
 *
 * Tolerates non-numeric values by rendering them as-is, and uses tabular
 * figures so the digits do not jitter mid-count.
 */
export function CountUp({
  value,
  className,
  suffix = "",
}: {
  value: number;
  className?: string;
  suffix?: string;
}) {
  const enabled = useMotionEnabled();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(enabled ? 0 : value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!enabled || started) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setStarted(true);
        observer.disconnect();

        const duration = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // Ease-out cubic, so it decelerates into the final value.
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * value));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, started, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {enabled ? display : value}
      {suffix}
    </span>
  );
}

/** Re-exported so pages can build one-off motion without importing the lib. */
export type { MotionValue };
