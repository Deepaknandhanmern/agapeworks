"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Menu, Play, X } from "lucide-react";
import { MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { Magnetic } from "@/components/ui/magnetic";
import {
  CapabilitiesMenuContent,
  ProductsMenuContent,
  CompanyMenuContent,
} from "@/components/ui/header-3";

// Homepage hero - same structure as a pasted "space travel" hero mockup
// (segmented pill nav with an active link, badge pill, two-line serif
// headline, arrow-icon CTAs), reskinned with real Agape Works content: real
// nav routes, the studio's own real logo asset, and the uploaded background
// image in place of the mockup's fabricated spacecraft photo.
//
// Hosted locally (public/hero-background.jpg, downloaded from the original
// Supabase URL) rather than referenced remotely - a remote source makes
// next/image's optimizer fetch it cross-origin on every cold cache miss,
// which was costing real LCP time in production.
const BACKGROUND_IMAGE = "/hero-background.jpg";

// Same top-level items as the shared Header (src/components/ui/header-3.tsx).
// Mobile keeps a flat link list (a dropdown doesn't make sense in the
// full-screen overlay); desktop below reuses the actual mega-menu panel
// content via MenuItem so it can't drift from the shared Header.
const navLinks = [
  { label: "Capabilities", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Company", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
];

const pillTriggerClassName =
  "rounded-full px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white";

function DesktopHeroNavLinks() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div onMouseLeave={() => setActive(null)} className="relative flex items-center gap-1">
      <MenuItem setActive={setActive} active={active} item="Capabilities" dark triggerClassName={pillTriggerClassName}>
        <CapabilitiesMenuContent dark />
      </MenuItem>
      <MenuItem setActive={setActive} active={active} item="Products" dark triggerClassName={pillTriggerClassName}>
        <ProductsMenuContent dark />
      </MenuItem>
      <MenuItem setActive={setActive} active={active} item="Company" dark triggerClassName={pillTriggerClassName}>
        <CompanyMenuContent dark />
      </MenuItem>
      <HoveredLink href="/portfolio" dark className={pillTriggerClassName}>
        Portfolio
      </HoveredLink>
    </div>
  );
}

export function AgapeHero() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative min-h-screen w-full isolate overflow-hidden bg-black text-white"
      onMouseMove={(e) => {
        const el = glowRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }}
    >
      <Image
        src={BACKGROUND_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/50" />
      {/* Soft cursor-following glow, behind the content (z-10) but above
          the background image/overlay - purely decorative, ignores clicks. */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] opacity-70 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(500px circle at var(--mx, 50%) var(--my, 40%), rgba(249,115,22,0.18), transparent 60%)",
        }}
      />

      {/* z-20: the hero content block below is also z-10, and since equal
          z-index ties break by DOM order, that later block would otherwise
          paint over this header's dropdown wherever they vertically overlap. */}
      <header className="relative z-20 xl:top-4">
        <div className="mx-6 flex items-center justify-between pt-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-white.png" alt="Agape Works" width={181} height={32} className="h-8 w-auto" priority />
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
              <DesktopHeroNavLinks />
              <Link
                href="/contact"
                className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-white/90"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

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
          {/* Spacing rhythm (flex-col gap-8, with the heading+paragraph
              grouped at a tighter gap-4) and the always-row button layout
              are borrowed from a reference "animated-hero" component's
              content alignment - copy, background, buttons, and the serif
              headline font are unchanged. Each child keeps its own
              animate-fade-slide-in-N class so the staggered entrance still
              plays the same as before; only the spacing mechanism moved
              from individual margins to the parent's gap. */}
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <div className="animate-fade-slide-in-1 inline-flex items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur">
              <span className="inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-neutral-900">
                Open
              </span>
              <span className="text-sm font-medium text-white/90">
                Currently taking on new projects
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="animate-fade-slide-in-2 text-4xl font-normal font-serif tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                Software, built{" "}
                <br className="hidden sm:block" />
                with genuine care
              </h1>

              <p className="animate-fade-slide-in-3 mx-auto max-w-2xl text-base leading-relaxed tracking-tight text-white/80 sm:text-lg">
                We build high-performance software that modernizes your operations and ships in
                weeks, not quarters.
              </p>
            </div>

            <div className="animate-fade-slide-in-4 flex flex-row flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <Link
                  href="/scope"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-3 text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  Our products
                  <Play className="h-4 w-4" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
