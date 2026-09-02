"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Generic scroll-triggered entrance for homepage sections - fades/rises in
 * once as it enters the viewport, `once: true` so it doesn't replay on every
 * scroll up/down. Respects prefers-reduced-motion via Framer's own hook
 * (renders instantly visible, no transform) rather than the CSS media-query
 * pattern used elsewhere in globals.css, since this is a JS-driven
 * animation, not a CSS keyframe.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
