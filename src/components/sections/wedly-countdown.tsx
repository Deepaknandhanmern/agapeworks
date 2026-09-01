"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// Fixed target, not "10 days from whenever someone visits" — a countdown
// that never arrives isn't a countdown. Set once, here, to 10 days out.
const LAUNCH_AT = new Date("2026-09-10T00:00:00+05:30").getTime();

function getRemaining() {
  const diff = Math.max(0, LAUNCH_AT - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function WedlyCountdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const interval = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Days", value: remaining?.days },
    { label: "Hours", value: remaining?.hours },
    { label: "Minutes", value: remaining?.minutes },
    { label: "Seconds", value: remaining?.seconds },
  ];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.22),transparent_70%)] blur-2xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-6 px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
          <Heart className="size-3.5 text-amber-300" /> Coming Soon
        </span>

        <h1
          className="animate-shimmer bg-clip-text text-6xl font-semibold tracking-tight text-transparent sm:text-7xl"
          style={{
            backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.35) 0%, #ffffff 50%, rgba(255,255,255,0.35) 100%)",
            backgroundSize: "200% auto",
          }}
        >
          Wedly
        </h1>

        <div className="grid grid-cols-4 gap-3 sm:gap-5">
          {units.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-4 sm:px-5">
              <span className="font-mono text-3xl font-semibold tabular-nums text-amber-300 sm:text-4xl">
                {unit.value !== undefined ? String(unit.value).padStart(2, "0") : "--"}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/40">{unit.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
