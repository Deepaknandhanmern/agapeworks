"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function MaintenanceScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden bg-background px-4 text-center">
      {/* Ambient glow — a slow breathing pulse behind the mark. */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.06),transparent_70%)] blur-2xl"
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="relative flex flex-col items-center gap-6">
        <Image src="/logo-black.png" alt="Agape Works" width={181} height={32} className="h-7 w-auto" priority />

        {/* Orbiting-ring motif — a quiet "in progress" signal, not a spinner tied to a real load state. */}
        <div className="relative flex size-16 items-center justify-center">
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-dashed border-foreground/20"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <span className="size-3 rounded-full bg-foreground" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Agape Works</h1>
          <p className="text-muted-foreground">We&apos;re currently upgrading our website.</p>
          <p className="text-muted-foreground">We&apos;ll be back shortly.</p>
        </div>

        <a href="mailto:studio@agapeworks.in" className="text-sm font-medium text-foreground underline underline-offset-4">
          studio@agapeworks.in
        </a>
      </div>
    </div>
  );
}
