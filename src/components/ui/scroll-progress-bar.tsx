"use client";

import { useEffect, useRef } from "react";

/**
 * Thin fixed bar at the very top of the viewport that fills as the page is
 * scrolled.
 *
 * Plain scroll listener rather than framer-motion's useScroll/useSpring: this
 * renders in the root layout, so pulling framer-motion in here shipped it to
 * every route on the site, text-only pages included. A passive listener that
 * writes one transform inside rAF is a fraction of the cost and looks the same.
 */
export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[100] h-1 origin-left"
      style={{
        transform: "scaleX(0)",
        background: "linear-gradient(90deg, #f97316, #9333ea)",
      }}
    />
  );
}
