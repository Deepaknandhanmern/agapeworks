"use client";

import * as React from "react";

// Count-up on scroll-into-view — easeOutCubic, fires once. `target` is
// parsed as a number; pass a non-numeric `staticValue` (e.g. a range like
// "2–4") for stats that can't honestly be animated as a single count.
export function HeroStat({
  glyph,
  target,
  suffix = "",
  decimals = 0,
  staticValue,
  label,
  delay = 0,
  displayClassName,
}: {
  glyph: string;
  target?: number;
  suffix?: string;
  decimals?: number;
  staticValue?: string;
  label: string;
  delay?: number;
  displayClassName?: string;
}) {
  const [value, setValue] = React.useState(staticValue ?? "0");
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (staticValue !== undefined || target === undefined) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1500;
        const start = performance.now() + delay;

        const tick = (now: number) => {
          const elapsed = now - start;
          if (elapsed < 0) {
            requestAnimationFrame(tick);
            return;
          }
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue((target * eased).toFixed(decimals));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals, delay, staticValue]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5 text-center">
      <span aria-hidden className={`text-2xl text-white sm:text-3xl ${displayClassName ?? ""}`}>
        {glyph}
      </span>
      <span className="font-medium tabular-nums tracking-tight text-white sm:text-2xl">
        {value}
        {suffix}
      </span>
      <span className="text-xs text-white/50 sm:text-[13px]">{label}</span>
    </div>
  );
}
