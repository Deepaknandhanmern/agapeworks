"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { ViviraDownloadButton } from "@/components/sections/vivira-download-button";

// Same nav/hero mechanics as a pasted generic "SaaS template" (fixed blurred
// dark nav, centered gradient headline, badge pill, hamburger overlay),
// reskinned for Vivira: real nav items (matching the same labels used
// site-wide, per the "menu items should be the same everywhere" rule), a
// real badge/headline/subhead, and no fabricated "dashboard preview"
// screenshot - the template's mockup images belonged to an unrelated demo.
const navLinks = [
  { label: "Capabilities", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Company", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
];

export function ViviraProductHeader({ downloadHref }: { downloadHref: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Guide lines at the nav's own max-w-7xl edges (40rem half-width) -
          a subtle nod to the page's container width, hidden on mobile
          where there's no room for them to read as intentional. */}
      <div className="pointer-events-none fixed inset-y-0 left-1/2 hidden w-px -translate-x-[calc(50%+40rem)] bg-black/10 md:block" />
      <div className="pointer-events-none fixed inset-y-0 left-1/2 hidden w-px translate-x-[calc(-50%+40rem)] bg-black/10 md:block" />

      <header className="fixed top-0 z-50 w-full border-b border-black/10 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/vivira-logo-mark.png" alt="Vivira" width={47} height={28} className="w-auto" />
              <span className="text-lg font-semibold text-foreground">Vivira</span>
            </Link>

            <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden items-center md:flex">
              <ViviraDownloadButton href={downloadHref} label="Download" className="mt-0 h-10 px-4 text-sm" />
            </div>

            <button
              type="button"
              className="text-foreground md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="border-t border-black/10 bg-white/95 backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <ViviraDownloadButton href={downloadHref} label="Download" className="mt-2 h-10 w-full text-sm" />
            </div>
          </div>
        )}
      </header>

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32">
        {/* Same spacing rhythm as the homepage hero (agape-hero.tsx) - a
            flex-col gap-8 container with the heading+paragraph grouped at a
            tighter gap-4, replacing individual mb-* margins. Copy and the
            CTA target are unchanged; colors flipped for the light page. */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-center backdrop-blur-sm">
            <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
            <span className="text-xs text-foreground/70">
              Official Meta Cloud API v20.0 verified · 3-minute WordPress setup
            </span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h1 className="max-w-3xl px-6 text-center text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span
                style={{
                  background: "linear-gradient(to bottom, #0a0a0a, #0a0a0a, rgba(10,10,10,0.6))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Turn abandoned carts into
              </span>
              <br />
              {/* Brand gradient (same orange->purple as vivira-logo.svg /
                  products-teaser.tsx's "Live now") on the hero's signature
                  line, reusing the site's existing shimmer sweep. */}
              <span
                className="animate-shimmer bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #f97316 0%, #c2410c 35%, #9333ea 70%, #f97316 100%)",
                  backgroundSize: "200% auto",
                }}
              >
                recovered revenue, on autopilot
              </span>
            </h1>

            <p className="max-w-2xl px-6 text-center text-sm leading-relaxed tracking-tight text-muted-foreground sm:text-base">
              70% of shoppers leave your store without completing checkout. Vivira recovers 20-30%
              of lost sales through autonomous WhatsApp sequences, 0-100 COD fraud shields, and
              1-click UPI purchases.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <div className="relative">
              <a
                href="#pricing"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg px-8 text-base font-medium text-white shadow-lg shadow-orange-500/20 transition-transform hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(90deg, #f97316 0%, #9333ea 100%)" }}
              >
                Start 7-Day Free Trial
                <ArrowRight size={16} />
              </a>
              {/* Same Open Peeps figure/pose used for "WhatsApp reminder
                  sent" in "The recovery, illustrated" (BodyDevice - its
                  hand/phone prop sits at a known, consistent torso-height
                  position, unlike BodyPointingUp which turned out to reach
                  up-and-diagonally rather than straight ahead). Positioned
                  to the button's left, unflipped, so that hand lands on the
                  button rather than reaching away from it - hidden below sm
                  where there's no room beside it. */}
              <img
                src="/gestures/reminder-sent.svg"
                alt=""
                aria-hidden="true"
                style={{ transform: "rotate(-8deg)" }}
                className="pointer-events-none absolute -left-24 -top-16 hidden h-36 w-auto sm:block"
              />
            </div>
            <a
              href="#journey"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-black/10 px-8 text-base font-medium text-foreground transition-colors hover:bg-black/5"
            >
              Watch Live 6-Step Demo
            </a>
          </div>
          <p className="-mt-4 text-xs text-muted-foreground">No credit card needed</p>
        </div>
      </section>
    </>
  );
}
