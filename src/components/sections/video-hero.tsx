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

const slides = [
  {
    label: "WATER WAVE",
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4",
    accent: "#F598F2",
  },
  {
    label: "GRIDWAVE",
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4",
    accent: "#ffffff",
  },
  {
    label: "LIGHT TUNNEL",
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4",
    accent: "#ffffff",
  },
];

const videoSources = slides.map((slide) => slide.src);

function usePreloadedVideos(sources: string[]) {
  const [resolved, setResolved] = useState<string[]>(sources);

  useEffect(() => {
    let cancelled = false;
    const objectUrls: string[] = [];

    Promise.all(
      sources.map(async (src, i) => {
        try {
          const res = await fetch(src);
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          objectUrls[i] = url;
          return url;
        } catch {
          return src;
        }
      })
    ).then((urls) => {
      if (!cancelled) setResolved(urls);
    });

    return () => {
      cancelled = true;
      objectUrls.forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [sources]);

  return resolved;
}

export function VideoHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoSrcs = usePreloadedVideos(videoSources);
  const shouldReduceMotion = useReducedMotion();
  const accent = slides[activeIndex].accent;

  return (
    <section
      className={cn(
        figtree.className,
        "relative flex h-screen min-h-[720px] w-full flex-col overflow-hidden bg-black text-white"
      )}
    >
      {slides.map((slide, i) => (
        <video
          key={slide.src}
          src={videoSrcs[i]}
          muted
          autoPlay
          playsInline
          loop
          aria-hidden="true"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none",
            i === activeIndex ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
      <div className="absolute inset-0 z-[1] bg-black/10" />

      <VideoHeroNavbar />

      <div className="relative z-[2] mx-auto flex h-full w-full max-w-[1340px] flex-col items-end justify-end gap-[150px] px-[15px] pt-[190px] pb-[60px] min-[810px]:max-[1199.98px]:gap-7 min-[810px]:max-[1199.98px]:px-6 min-[810px]:max-[1199.98px]:pb-[52px] max-[809.98px]:items-start max-[809.98px]:gap-[72px] max-[809.98px]:px-[18px] max-[809.98px]:pt-[140px] max-[809.98px]:pb-11">
        {/* Video switcher + availability */}
        <div className="flex w-full items-center justify-between max-[809.98px]:flex-col max-[809.98px]:items-start max-[809.98px]:gap-7">
          <div className="flex flex-[4] flex-wrap items-center gap-6">
            {slides.map((slide, i) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "role-link inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[-0.12px] transition-[opacity,transform] duration-300 hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:translate-x-0",
                  i === activeIndex ? "opacity-100" : "opacity-55 hover:opacity-75"
                )}
              >
                <span className="text-[8px] leading-3 tracking-[-0.08px] text-white/60">
                  0{i + 1} /
                </span>
                {slide.label}
              </button>
            ))}
          </div>

          <div className="flex flex-1 items-center justify-end gap-2 max-[809.98px]:justify-start">
            <motion.span
              aria-hidden="true"
              className="size-[7px] shrink-0 rounded-full"
              style={{ backgroundColor: accent, boxShadow: `0 0 8px 2px ${accent}` }}
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
            agapeworks<span style={{ color: accent }}>.</span>
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
