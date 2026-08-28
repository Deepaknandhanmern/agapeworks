"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Figtree } from "next/font/google";
import { VideoHeroNavbar } from "./video-hero-navbar";
import { cn } from "@/lib/utils";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const springEase = [0.16, 1, 0.3, 1] as const;

// Self-hosted from /public/videos (remuxed with ffmpeg -movflags +faststart)
// instead of the original CloudFront URLs: those files had their moov atom
// after mdat ("not fast-start"), which forces browsers to fetch most/all of
// a 7-18MB file before playback can begin at all. Fast-start files stream
// and start playing almost immediately.
const slides = [
  {
    label: "WATER WAVE",
    src: "/videos/water-wave.mp4",
    accent: "#F598F2",
  },
  {
    label: "GRIDWAVE",
    src: "/videos/gridwave.mp4",
    accent: "#ffffff",
  },
  {
    label: "LIGHT TUNNEL",
    src: "/videos/light-tunnel.mp4",
    accent: "#ffffff",
  },
];

// Homepage is statically generated, so this can't be computed at build
// time (it would freeze on whatever day the site was last deployed).
// It's picked client-side on mount instead, so it reflects the visitor's
// actual current day; the SSR/first-paint render uses slides[0] as a
// stable default to avoid a hydration mismatch, then switches right after.
function useVideoOfTheDay() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setIndex(new Date().getDate() % slides.length), 0);
    return () => clearTimeout(id);
  }, []);

  return index;
}

export function VideoHero() {
  const slideIndex = useVideoOfTheDay();
  const slide = slides[slideIndex];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        figtree.className,
        "relative flex h-screen min-h-[720px] w-full flex-col overflow-hidden bg-black text-white"
      )}
    >
      <video
        key={slide.src}
        src={slide.src}
        preload="auto"
        muted
        autoPlay
        playsInline
        loop
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none"
      />
      <div className="absolute inset-0 z-[1] bg-black/10" />

      <VideoHeroNavbar />

      <div className="relative z-[2] mx-auto flex h-full w-full max-w-[1340px] flex-col items-end justify-end gap-[150px] px-[15px] pt-[190px] pb-[60px] min-[810px]:max-[1199.98px]:gap-7 min-[810px]:max-[1199.98px]:px-6 min-[810px]:max-[1199.98px]:pb-[52px] max-[809.98px]:items-start max-[809.98px]:gap-[72px] max-[809.98px]:px-[18px] max-[809.98px]:pt-[140px] max-[809.98px]:pb-11">
        {/* Video of the day + availability */}
        <div className="flex w-full items-center justify-between max-[809.98px]:flex-col max-[809.98px]:items-start max-[809.98px]:gap-7">
          <p className="text-xs font-medium uppercase tracking-[-0.12px] text-white/60">
            Today’s wave — {slide.label}
          </p>

          <div className="flex items-center gap-2">
            <motion.span
              aria-hidden="true"
              className="size-[7px] shrink-0 rounded-full"
              style={{ backgroundColor: slide.accent, boxShadow: `0 0 8px 2px ${slide.accent}` }}
              animate={
                shouldReduceMotion ? undefined : { scale: [1, 1.45, 1], opacity: [1, 0.45, 1] }
              }
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-xs font-medium uppercase tracking-[-0.12px] text-white/80">
              Available for work
            </span>
          </div>
        </div>

        {/* Name + CTA */}
        <div className="flex w-full items-end justify-between max-[809.98px]:flex-col max-[809.98px]:items-start max-[809.98px]:gap-8">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: springEase }}
            className="flex-[2] text-[clamp(64px,8.5vw,132px)] leading-[92%] font-medium tracking-[-4px] uppercase min-[810px]:max-[1199.98px]:text-[clamp(56px,10vw,96px)] min-[810px]:max-[1199.98px]:leading-[100%] min-[810px]:max-[1199.98px]:tracking-[-3px] max-[809.98px]:text-[clamp(40px,13vw,64px)] max-[809.98px]:leading-[104%] max-[809.98px]:tracking-[-2px]"
          >
            agapeworks<span style={{ color: slide.accent }}>.</span>
          </motion.h1>

          <div className="flex flex-1 flex-col items-start gap-6 pl-[50px] max-[809.98px]:max-w-[420px] max-[809.98px]:pl-0 min-[810px]:max-[1199.98px]:pl-6">
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, ease: springEase }}
              className="text-base leading-6 font-medium tracking-[-0.16px] text-white/80"
            >
              I craft bold brands and modern websites with purpose — blending
              strategy, design, and code into experiences that move people and
              grow businesses.
            </motion.p>

            <motion.a
              href="/contact"
              initial={shouldReduceMotion ? false : { opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, delay: 0.08, ease: springEase }}
              className="group relative inline-flex items-center overflow-hidden rounded-full border border-white px-6 py-3 text-sm font-medium lowercase transition-colors duration-300 hover:border-[#F598F2] hover:text-black"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-y-full bg-[#F598F2] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 motion-reduce:transition-none"
              />
              <span className="relative">start a project</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
