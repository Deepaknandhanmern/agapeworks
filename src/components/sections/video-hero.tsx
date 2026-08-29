"use client";

import { useEffect, useState } from "react";
import { VideoHeroNavbar } from "./video-hero-navbar";
import { instrumentSerif } from "@/lib/hero-fonts";

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

  return (
    <section className="relative flex h-screen min-h-[720px] w-full flex-col overflow-hidden bg-[hsl(201,100%,13%)] text-white">
      <video
        key={slide.src}
        src={slide.src}
        preload="auto"
        muted
        autoPlay
        playsInline
        loop
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none"
      />

      <VideoHeroNavbar />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-[90px] text-center">
        {/* Video of the day + availability */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/60">
            Today’s wave — {slide.label}
          </p>

          <div className="flex items-center gap-2">
            <span className="relative flex size-[7px]">
              <span
                aria-hidden="true"
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 motion-reduce:hidden"
                style={{ backgroundColor: slide.accent }}
              />
              <span
                className="relative inline-flex size-[7px] rounded-full"
                style={{ backgroundColor: slide.accent }}
              />
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-white/80">
              Available for work
            </span>
          </div>
        </div>

        <h1
          className={`${instrumentSerif.className} animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] sm:text-7xl md:text-8xl`}
        >
          agapeworks<em className="not-italic text-white/60">.</em>
        </h1>

        <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          I craft bold brands and modern websites with purpose — blending
          strategy, design, and code into experiences that move people and
          grow businesses.
        </p>

        <a
          href="/contact"
          className="liquid-glass animate-fade-rise-delay-2 mt-12 cursor-pointer rounded-full px-14 py-5 text-base text-white transition-transform hover:scale-[1.03]"
        >
          start a project
        </a>
      </div>

      <style>{`
        .liquid-glass {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
            rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
            rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        @keyframes fade-rise {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-rise { animation: fade-rise 0.8s ease-out both; }
        .animate-fade-rise-delay { animation: fade-rise 0.8s ease-out 0.2s both; }
        .animate-fade-rise-delay-2 { animation: fade-rise 0.8s ease-out 0.4s both; }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-rise, .animate-fade-rise-delay, .animate-fade-rise-delay-2 {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
