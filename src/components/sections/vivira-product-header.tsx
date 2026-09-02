"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";

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

export function ViviraProductHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
        <nav className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/vivira-logo.svg" alt="Vivira" width={28} height={28} />
              <span className="text-lg font-semibold text-white">Vivira</span>
            </Link>

            <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <Link
                href="/contact"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Contact
              </Link>
              <a
                href="#install"
                className="inline-flex h-10 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-gray-100"
              >
                Get started
              </a>
            </div>

            <button
              type="button"
              className="text-white md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-black/95 backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="#install"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-black"
              >
                Get started
              </a>
            </div>
          </div>
        )}
      </header>

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32">
        {/* Page-level ambient blobs (src/app/products/page.tsx) already
            supply the color here - just a soft top lift for text contrast. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent)]"
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-white/70">Live now for WooCommerce</span>
          </div>

          <h1
            className="mb-6 max-w-3xl px-6 text-center text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            style={{
              background: "linear-gradient(to bottom, #ffffff, #ffffff, rgba(255,255,255,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Vivira - an AI cart
            <br />
            that recovers itself
          </h1>

          <p className="mb-10 max-w-2xl px-6 text-center text-sm text-white/60 sm:text-base">
            Vivira watches for abandoned carts and brings shoppers back automatically, so stores
            keep the sales they&apos;d otherwise lose.
          </p>

          <a
            href="#install"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-white via-white/95 to-white/60 px-8 text-base font-medium text-black transition-transform hover:scale-105 active:scale-95"
          >
            Get started
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
