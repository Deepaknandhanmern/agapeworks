"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

// --- Abstract UI content (no fabricated screenshots) ---------------------

function SkeletonLine({ className }: { className?: string }) {
  return <div className={cn("rounded-full bg-foreground/10", className)} />;
}

const MOBILE_STEPS = [
  {
    label: "Onboarding",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-4 px-5">
        <div className="size-12 rounded-2xl bg-primary/15" />
        <SkeletonLine className="h-3 w-28" />
        <SkeletonLine className="h-2.5 w-20" />
        <div className="mt-4 h-9 w-full rounded-full bg-primary/90" />
      </div>
    ),
  },
  {
    label: "Home feed",
    content: (
      <div className="flex h-full flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <SkeletonLine className="h-3 w-16" />
          <div className="size-6 rounded-full bg-foreground/10" />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border p-2.5">
            <div className="size-9 shrink-0 rounded-lg bg-primary/15" />
            <div className="flex flex-1 flex-col gap-1.5">
              <SkeletonLine className="h-2.5 w-3/4" />
              <SkeletonLine className="h-2 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "Profile",
    content: (
      <div className="flex h-full flex-col items-center gap-3 p-4">
        <div className="mt-2 size-14 rounded-full bg-primary/15" />
        <SkeletonLine className="h-3 w-24" />
        <SkeletonLine className="h-2 w-16" />
        <div className="mt-3 grid w-full grid-cols-2 gap-2">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1 rounded-xl border p-3">
              <SkeletonLine className="h-2.5 w-8" />
              <SkeletonLine className="h-2 w-10" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const SAAS_STEPS = [
  {
    label: "Browser",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-10 text-center">
        <SkeletonLine className="h-4 w-3/5" />
        <SkeletonLine className="h-2.5 w-2/5" />
        <div className="mt-3 h-8 w-32 rounded-full bg-primary/90" />
      </div>
    ),
  },
  {
    label: "Dashboard",
    content: (
      <div className="flex h-full gap-3 p-4">
        <div className="flex w-10 shrink-0 flex-col items-center gap-3 rounded-lg bg-foreground/5 py-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="size-4 rounded bg-foreground/15" />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-1.5 rounded-lg border p-2.5">
                <SkeletonLine className="h-2 w-8" />
                <SkeletonLine className="h-2.5 w-10" />
              </div>
            ))}
          </div>
          <div className="mt-1 flex-1 rounded-lg border bg-foreground/5" />
        </div>
      </div>
    ),
  },
  {
    label: "Analytics",
    content: (
      <div className="flex h-full flex-col gap-3 p-4">
        <SkeletonLine className="h-2.5 w-24" />
        <div className="flex flex-1 items-end gap-2 rounded-lg border p-3">
          {[40, 65, 35, 80, 55, 70, 45].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-primary/70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex gap-3">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-primary/70" />
              <SkeletonLine className="h-2 w-10" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Mobile",
    content: (
      <div className="flex h-full items-center justify-center bg-foreground/5 p-4">
        <div className="flex h-full w-[38%] flex-col gap-2 rounded-2xl border-[3px] border-foreground/20 bg-background p-2.5">
          <SkeletonLine className="h-2 w-1/2" />
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-1.5 rounded-lg border p-1.5">
              <div className="size-4 shrink-0 rounded bg-primary/15" />
              <SkeletonLine className="h-1.5 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

// --- Scroll-driven step logic ---------------------------------------------

function useScrollStep(totalSteps: number) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.25"],
  });
  const [step, setStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(totalSteps - 1, Math.max(0, Math.floor(v * totalSteps)));
    setStep(idx);
  });

  return { ref, scrollYProgress, step };
}

// --- Mockups ---------------------------------------------------------------

function PhoneMockup() {
  const { ref, scrollYProgress, step } = useScrollStep(MOBILE_STEPS.length);
  const rotate = useTransform(scrollYProgress, [0, 1], [-7, 7]);
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-6">
      <div className="flex h-[400px] items-center justify-center">
        <motion.div
          style={{ rotate, y }}
          className="relative h-[360px] w-[186px] rounded-[2rem] border-[6px] border-primary bg-primary shadow-xl"
        >
          <div className="absolute left-1/2 top-0 z-10 h-4 w-16 -translate-x-1/2 rounded-b-xl bg-primary" />
          <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] bg-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full w-full"
              >
                {MOBILE_STEPS[step].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-foreground">Mobile App Development</span>
        <span className="text-xs text-muted-foreground">{MOBILE_STEPS[step].label}</span>
      </div>
    </div>
  );
}

function BrowserMockup() {
  const { ref, step } = useScrollStep(SAAS_STEPS.length);

  return (
    <div ref={ref} className="flex flex-col items-center gap-6">
      <div className="flex h-[400px] w-full max-w-md items-center">
        <div className="w-full overflow-hidden rounded-xl border bg-card shadow-xl">
          <div className="flex items-center gap-1.5 border-b bg-muted/40 px-3 py-2">
            <span className="size-2 rounded-full bg-foreground/20" />
            <span className="size-2 rounded-full bg-foreground/20" />
            <span className="size-2 rounded-full bg-foreground/20" />
          </div>
          <div className="h-[280px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full w-full"
              >
                {SAAS_STEPS[step].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-foreground">SaaS Development</span>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {SAAS_STEPS.map((s, i) => (
            <span key={s.label} className="flex items-center gap-1.5">
              <span className={cn(i === step ? "text-foreground" : undefined)}>{s.label}</span>
              {i < SAAS_STEPS.length - 1 && <span>→</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DeviceShowcase() {
  return (
    <div className="grid gap-16 sm:grid-cols-2">
      <PhoneMockup />
      <BrowserMockup />
    </div>
  );
}
