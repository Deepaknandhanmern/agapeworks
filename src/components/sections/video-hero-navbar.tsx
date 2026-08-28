"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { index: "01", label: "Works", href: "/portfolio" },
  { index: "02", label: "Services", href: "/services" },
  { index: "03", label: "About", href: "/about" },
  { index: "04", label: "Contact", href: "/contact" },
];

function useClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());

    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function VideoHeroNavbar() {
  const [open, setOpen] = useState(false);
  const time = useClock();

  return (
    <header className="absolute inset-x-0 top-0 z-10 text-white">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1340px] items-center justify-between px-[15px] py-9 min-[810px]:max-[1199.98px]:px-[18px] min-[810px]:max-[1199.98px]:py-[30px] max-[809.98px]:px-[18px] max-[809.98px]:py-6"
      >
        <ul className="hidden items-center gap-10 min-[810px]:flex min-[810px]:max-[1199.98px]:gap-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative inline-flex items-center gap-1.5 pb-1"
              >
                <span className="text-[8px] leading-3 tracking-[-0.08px] font-medium uppercase text-white/60">
                  {item.index} /
                </span>
                <span className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase">
                  {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100 motion-reduce:transition-none"
                />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="hero-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex items-center justify-center min-[810px]:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        <div className="hidden flex-col items-end gap-1 text-right min-[810px]:flex">
          <a
            href="mailto:deepak@agapeworks.in"
            className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase text-white/80 transition-colors hover:text-white"
          >
            deepak@agapeworks.in
          </a>
          <span className="text-[8px] leading-3 tracking-[-0.08px] font-medium uppercase text-white/60">
            CUP {time}
          </span>
        </div>
      </nav>

      <div
        id="hero-mobile-nav"
        inert={!open ? true : undefined}
        className="grid bg-black/95 transition-[grid-template-rows] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] min-[810px]:hidden motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-6 px-[18px] pt-2 pb-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block text-[28px] leading-8 tracking-[-0.84px] font-medium uppercase"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-1 px-[18px] pb-8">
            <a
              href="mailto:deepak@agapeworks.in"
              className="text-xs font-medium uppercase text-white/80"
            >
              deepak@agapeworks.in
            </a>
            <span className="text-[8px] font-medium uppercase text-white/60">
              CUP {time}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
