"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// A circle + checkmark that draw themselves in via animated `pathLength`,
// instead of a static icon just fading/scaling in - used on form success
// states across the site (contact, testimonial, comments).
export function AnimatedCheckmark({
  className,
  strokeWidth = 3,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 52 52"
      className={cn("size-12 text-primary", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.circle
        cx={26}
        cy={26}
        r={23}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.path
        d="M15 27l7 7 15-15"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.45 }}
      />
    </svg>
  );
}
