"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

const highlights = [
  "AI Shopping Assistant",
  "AI Store Builder",
  "AI Customer Support",
  "Own It For Life",
  "Premium Storefronts",
];

export function SellaraComingSoon() {
  return (
    <section className="relative overflow-hidden border-t bg-black py-20">
      {/* Ambient glow — a slow, subtle breathing effect behind the text. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.25),transparent_70%)] blur-2xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-5 px-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60"
        >
          <Sparkles className="size-3.5 text-amber-300" /> Sellara — AI Commerce Platform
        </motion.span>

        <h2
          className="animate-shimmer bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.35) 0%, #ffffff 50%, rgba(255,255,255,0.35) 100%)",
            backgroundSize: "200% auto",
          }}
        >
          Coming soon
        </h2>

        <p className="max-w-md text-white/50">
          Your store. Your brand. AI that helps you sell. We&apos;re building it —{" "}
          <Link href="/sellara" className="underline underline-offset-4 hover:text-white/80">
            take an early look
          </Link>
          .
        </p>
      </div>

      <Marquee pauseOnHover className="mt-10 [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
        {highlights.map((item, i) => (
          <span key={i} className="mx-6 flex items-center gap-2 text-sm font-medium text-white/30">
            <span className="size-1 rounded-full bg-white/20" />
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
