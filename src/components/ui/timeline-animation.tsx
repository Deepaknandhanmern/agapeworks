"use client";

import * as React from "react";
import { motion, useInView, type Variants } from "framer-motion";

// Scroll-triggered stagger wrapper - all children share one `timelineRef`
// (typically the section root) and animate once it scrolls into view, each
// offset by `animationNum` via the passed-in variants' `custom` argument.
interface TimelineContentProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants: Variants;
}

export function TimelineContent({
  children,
  as = "div",
  animationNum,
  timelineRef,
  customVariants,
  className,
  ...rest
}: TimelineContentProps) {
  const MotionTag = React.useMemo(() => motion.create(as), [as]);
  const isInView = useInView(timelineRef, { once: true, amount: 0.1 });

  return (
    <MotionTag
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
