"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const VIVIRA_URL = "https://vivira.agapeworks.in";

export function ProductsTeaser() {
  return (
    <section className="border-t bg-muted/20">
      <div className="mx-auto w-full max-w-5xl px-4 py-24">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Beyond client work, we build our own products
          </h2>
          <p className="max-w-lg text-muted-foreground">
            The same team, applying what we know to problems we&apos;ve chosen ourselves.
          </p>
        </div>

        <a
          href={VIVIRA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-3xl bg-black px-8 py-14 text-center sm:px-16"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative background watermark, not worth next/image */}
          <img
            src="/vivira-logo.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 size-64 opacity-[0.07] sm:size-80"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-[65%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.3),transparent_70%)] blur-2xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-[35%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.28),transparent_70%)] blur-2xl"
            animate={{ scale: [1.15, 1, 1.15], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          <div className="relative z-10 flex flex-col items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- small static logo, not worth next/image */}
            <img src="/vivira-logo.svg" alt="" className="size-10" />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
              Vivira
            </span>

            <h3
              className="animate-shimmer bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,0.35) 0%, #ffffff 50%, rgba(255,255,255,0.35) 100%)",
                backgroundSize: "200% auto",
              }}
            >
              Live now
            </h3>

            <p className="max-w-md text-white/50">
              An AI cart plugin for WooCommerce — recovers abandoned carts and nudges shoppers
              toward checkout, automatically.
            </p>

            <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors group-hover:text-orange-400">
              Visit Vivira
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
