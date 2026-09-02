"use client";

import type { CSSProperties } from "react";
import { Play, Sparkles, Star } from "lucide-react";

// Standalone hero built to a pasted spec for a company called "Qumica" - // not wired into any page. Not part of the Agape Works / Vahi / Sellara /
// Wedly product set; kept here as a self-contained reference component.
const VIDEO_SRC =
  "https://cdn.sceneai.art/Hero%20Section%20Video/247f75dd-335a-4aaa-ba65-47df2f7b24b9.mp4";

const navLinks = [
  { label: "Product", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
];

const avatarUrls = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
];

const integrations = ["Zapier", "Make", "n8n", "UiPath", "Tray.io", "Workato"];

export function QumicaHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-100"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/10" />

      {/* Floating pill nav */}
      <header className="absolute inset-x-0 top-6 z-20 flex justify-center px-4">
        <div className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-xl sm:px-4">
          <a href="#" className="pl-2 text-sm font-semibold tracking-tight text-white">
            Qumica
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#"
            className="rounded-full border border-white/40 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-2xl transition-colors hover:bg-white/25"
          >
            Generate
          </a>
        </div>
      </header>

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col items-center px-4 pt-32 text-center sm:pt-44">
        {/* Social proof */}
        <div className="mb-8 flex origin-center scale-105 flex-col items-center gap-2 sm:flex-row sm:gap-4">
          <div className="flex -space-x-3">
            {avatarUrls.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- decorative avatar stack, not a real user
              <img
                key={src}
                src={src}
                alt=""
                className="size-9 rounded-full border-2 border-black object-cover"
                style={{ zIndex: avatarUrls.length - i }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-orange-400 text-orange-400" />
              ))}
            </div>
            <span className="text-sm text-white/80">Trusted by 500+ teams</span>
          </div>
        </div>

        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
          Ready to <span className="font-serif italic font-normal">elevate</span> your digital
          infrastructure?
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-7 text-white/70 sm:text-lg">
          We build high-performance solutions to modernize operations
          <br className="hidden md:block" />
          and drive growth across your entire organization.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[length:200%_200%] bg-gradient-to-r from-orange-500 via-purple-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 animate-gradient-shift"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full">
              <span className="block h-full w-1/3 bg-white/30 blur-md animate-shimmer-sweep" />
            </span>
            <Sparkles className="size-4" />
            Generate
          </a>

          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/20"
          >
            <Play className="size-4" />
            View Platform
          </a>
        </div>
      </div>

      {/* Integration marquee */}
      <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-4">
        <p className="text-[10px] font-medium uppercase tracking-[10px] text-white/50">
          Integrating with leading automation
        </p>
        <div className="w-full overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-16" style={{ "--duration": "25s" } as CSSProperties}>
            {[...integrations, ...integrations].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-lg font-semibold text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
