import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { EASE } from "./primitives";

/**
 * Cross-fade between routes.
 *
 * Deliberately restrained: a short fade with a few pixels of rise, keyed on the
 * pathname. No slide-across, no scale, no directional transition. Elaborate
 * page transitions feel expensive the first time and obstructive by the fifth,
 * because they sit between the visitor and the thing they clicked for.
 *
 * There is no exit animation. Exit transitions require holding the outgoing
 * route mounted while the new one loads, which delays the content; on a site
 * whose job is to get someone to the music, that trade is not worth it.
 *
 * Renders children untouched before hydration and under prefers-reduced-motion,
 * so the server HTML is never hidden behind an animation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || reduced) return <>{children}</>;

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
