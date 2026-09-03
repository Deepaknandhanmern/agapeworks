"use client";

import { useEffect, useRef } from "react";
import { Globe, ArrowRight } from "lucide-react";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { instrumentSerif } from "./asme-fonts";
import { VideoPlaceholder } from "./video-placeholder";

const HERO_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

export function AsmeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const opacity = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !HERO_VIDEO_SRC) return;

    const animateOpacity = (to: number, duration: number, onDone?: () => void) => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      const from = opacity.current;
      const start = performance.now();

      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        opacity.current = from + (to - from) * t;
        video.style.opacity = String(opacity.current);
        if (t < 1) {
          raf.current = requestAnimationFrame(step);
        } else {
          raf.current = null;
          onDone?.();
        }
      };
      raf.current = requestAnimationFrame(step);
    };

    const onCanPlay = () => {
      video.play().catch(() => {});
      animateOpacity(1, 500);
    };

    const onTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && opacity.current > 0) {
        animateOpacity(0, 500);
      }
    };

    const onEnded = () => {
      opacity.current = 0;
      video.style.opacity = "0";
      window.setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        animateOpacity(1, 500);
      }, 100);
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      {HERO_VIDEO_SRC ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-bottom"
          style={{ opacity: 0 }}
          muted
          autoPlay
          playsInline
          preload="auto"
          src={HERO_VIDEO_SRC}
        />
      ) : (
        <VideoPlaceholder label="hero background video" />
      )}

      {/* Navbar */}
      <div className="relative z-20 px-6 py-6">
        <nav className="asme-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
          <div className="flex items-center">
            <Globe className="text-white" size={24} />
            <span className="ml-2 text-lg font-semibold text-white">Asme</span>
            <div className="ml-8 hidden items-center gap-8 md:flex">
              <a href="#features" className="text-sm font-medium text-white/80 hover:text-white">
                Features
              </a>
              <a href="#pricing" className="text-sm font-medium text-white/80 hover:text-white">
                Pricing
              </a>
              <a href="#about" className="text-sm font-medium text-white/80 hover:text-white">
                About
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className="text-sm font-medium text-white">
              Sign Up
            </button>
            <button
              type="button"
              className="asme-glass rounded-full px-6 py-2 text-sm font-medium text-white"
            >
              Login
            </button>
          </div>
        </nav>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 -translate-y-[20%] flex-col items-center justify-center px-6 py-12 text-center">
        <h1
          className={`${instrumentSerif.className} whitespace-nowrap text-7xl tracking-tight text-white md:text-8xl lg:text-9xl`}
        >
          Know it then <em className="italic">all</em>.
        </h1>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="asme-glass mt-10 flex w-full max-w-xl items-center gap-3 rounded-full py-2 pl-6 pr-2"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-transparent text-white outline-none placeholder:text-white/40"
          />
          <button
            type="submit"
            aria-label="Subscribe"
            className="rounded-full bg-white p-3 text-black"
          >
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="mt-6 max-w-xl px-4 text-sm leading-relaxed text-white">
          Stay updated with the latest news and insights. Subscribe to our newsletter today and
          never miss out on exciting updates.
        </p>

        <button
          type="button"
          className="asme-glass mt-8 rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
        >
          Manifesto
        </button>
      </div>

      {/* Social icons */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <a
          href="#"
          aria-label="Instagram"
          className="asme-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="#"
          aria-label="Twitter"
          className="asme-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
        >
          <FaXTwitter size={20} />
        </a>
        <a
          href="#"
          aria-label="Website"
          className="asme-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
        >
          <Globe size={20} />
        </a>
      </div>
    </div>
  );
}
