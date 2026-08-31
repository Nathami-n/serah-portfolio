import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type * as React from "react";

/**
 * Shared motion primitives. ALL motion on the site goes through these.
 *
 * -------------------------------------------------------------------------
 * THE RULE THAT MATTERS MOST: content must never depend on JS to be visible.
 * -------------------------------------------------------------------------
 * The obvious implementation of a scroll reveal is `initial={{ opacity: 0 }}`
 * plus `whileInView`. On an SSR site that is a correctness bug, not a style
 * choice: React renders `style="opacity:0"` into the HTML, so if JavaScript
 * fails, is blocked, or has not hydrated yet, the visitor gets a blank page
 * with a working header and footer around it. That is exactly what happened
 * here, caught in a screenshot.
 *
 * So these components render their children plainly on the server and only
 * become animated once mounted on the client. The first paint is always
 * readable; the animation is an enhancement layered on afterwards.
 *
 * Other rules enforced here:
 *   - transform and opacity only, nothing that triggers layout or paint
 *   - ONE easing curve, no springs, no overshoot: bouncy UI reads as a template
 *   - travel stays 12-20px, big slide-ins read as a template too
 *   - reveals fire ONCE, the page must not re-animate on scroll-up
 *   - prefers-reduced-motion collapses everything to a plain opacity swap
 *
 * The old site hand-rolled framer-motion in twelve components, each with its
 * own easing, distance and duration, including two `setInterval` loops that
 * re-rendered a button every second forever just to make it bob, and a
 * `yoyo: Infinity` prop that framer-motion removed several majors ago (so it
 * silently did nothing).
 */

/** The site's single easing curve. */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * True only after the component has mounted in the browser.
 *
 * Deliberately NOT `typeof window !== "undefined"`: that would be true during
 * hydration and produce a server/client markup mismatch. The effect runs after
 * hydration, so the first client render still matches the server's.
 */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
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
 * a light touch further down is the goal; fade-up on everything is itself a
 * listed tell.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const reduced = useReducedMotion();
  const mounted = useMounted();

  // Server and first client render: plain, visible markup.
  if (!mounted || reduced) {
    return <div className={className}>{children}</div>;
  }

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

/**
 * The hero's entrance. Runs on mount rather than on scroll, because it is
 * already in view.
 */
export function HeroReveal({ children, index = 0, className }: RevealProps) {
  const reduced = useReducedMotion();
  const mounted = useMounted();

  if (!mounted || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: EASE,
        delay: 0.08 + index * 0.09,
      }}
    >
      {children}
    </motion.div>
  );
}
