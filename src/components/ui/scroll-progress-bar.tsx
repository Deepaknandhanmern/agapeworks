"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin fixed bar at the very top of the viewport that fills as the page is scrolled. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "0%",
        background: "linear-gradient(90deg, #f97316, #9333ea)",
      }}
      className="fixed inset-x-0 top-0 z-[100] h-1"
    />
  );
}
