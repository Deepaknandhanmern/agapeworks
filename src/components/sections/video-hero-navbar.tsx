"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Digital Experiences", href: "/portfolio" },
  { label: "Capabilities", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function VideoHeroNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-10 text-white">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6"
      >
        <a href="/">
          <Image src="/logo-white.png" alt="Agape Works" width={181} height={32} className="h-7 w-auto" priority />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/contact"
          className="liquid-glass hidden rounded-full px-6 py-2.5 text-sm text-white transition-transform hover:scale-[1.03] md:inline-flex"
        >
          start a project
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="hero-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex items-center justify-center md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <div
        id="hero-mobile-nav"
        inert={!open ? true : undefined}
        className="grid bg-black/95 transition-[grid-template-rows] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-6 px-8 pt-2 pb-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg font-medium text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-8 pb-8">
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="liquid-glass inline-flex rounded-full px-6 py-2.5 text-sm text-white"
            >
              start a project
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
