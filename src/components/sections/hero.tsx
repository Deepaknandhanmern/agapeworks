"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <AuroraBackground className="h-auto min-h-[90vh]">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex w-full max-w-2xl flex-col items-center gap-6 px-4 py-24 text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-950/10 bg-white/40 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
          <Sparkles className="size-3.5" />
          Consulting &amp; product engineering
        </div>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
          Work, done with agape — deliberate care that shows in the product.
        </h1>
        <p className="max-w-xl text-balance text-lg leading-7 font-light text-slate-700 dark:text-neutral-300">
          Agape Works partners with founders and product teams to plan, build, and ship
          software that holds up under real users and real growth.
        </p>
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
          <AntiMetalButton href="/contact" label="Book a demo" />
          <a
            href="/services"
            className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium text-slate-950 hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
          >
            See what we do
            <ArrowRight className="size-4" />
          </a>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
