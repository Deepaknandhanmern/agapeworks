"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Menu, Play, X } from "lucide-react";

// Homepage hero — same structure as a pasted "space travel" hero mockup
// (segmented pill nav with an active link, badge pill, two-line serif
// headline, arrow-icon CTAs), reskinned with real Agape Works content: real
// nav routes, the studio's own real logo asset, and the uploaded background
// image in place of the mockup's fabricated spacecraft photo.
const BACKGROUND_IMAGE =
  "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg";

// Same top-level items as the shared Header (src/components/ui/header-3.tsx)
// used on every other page — Capabilities/Company point at the closest
// single-page proxy for those dropdowns' content since this nav is a flat
// link list, not a mega-menu.
const navLinks = [
  { label: "Capabilities", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Company", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
];

export function AgapeHero() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full isolate overflow-hidden bg-black text-white">
      {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed hero background, not worth next/image here */}
      <img src={BACKGROUND_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-black/50" />

      <header className="relative z-10 xl:top-4">
        <div className="mx-6 flex items-center justify-between pt-4">
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- small static logo, not worth next/image */}
            <img src="/logo-white.png" alt="Agape Works" className="h-8 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-white/90"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur md:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5 text-white/90" /> : <Menu className="h-5 w-5 text-white/90" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[9] flex flex-col justify-center gap-8 bg-black/95 px-8 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {navLinks.map((link) => (
          <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="text-3xl font-medium text-white">
            {link.label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-3xl font-medium text-white underline underline-offset-4">
          Get in touch
        </Link>
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 sm:pt-28 md:pt-32 lg:pt-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-slide-in-1 mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur">
              <span className="inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-neutral-900">
                Open
              </span>
              <span className="text-sm font-medium text-white/90">
                Currently taking on new projects
              </span>
            </div>

            <h1 className="animate-fade-slide-in-2 text-4xl font-normal font-serif tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Software, built
              <br className="hidden sm:block" />
              with genuine care
            </h1>

            <p className="animate-fade-slide-in-3 mx-auto mt-6 max-w-2xl text-base text-white/80 sm:text-lg">
              We build high-performance software that modernizes your operations and ships in
              weeks, not quarters.
            </p>

            <div className="animate-fade-slide-in-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/scope"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-3 text-sm font-medium text-white/90 transition-colors hover:text-white"
              >
                See our work
                <Play className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
