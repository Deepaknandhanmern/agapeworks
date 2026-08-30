import Image from "next/image";
import { readexPro } from "@/lib/hero-fonts";

const navLinks = [
  { label: "services", href: "/services" },
  { label: "portfolio", href: "/portfolio" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

export function AgapeHero() {
  return (
    <section
      className={`${readexPro.className} relative h-screen w-full overflow-hidden bg-black text-white antialiased`}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4"
      />

      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between gap-4 px-6 pt-6 md:px-10">
        <a
          href="/"
          className="flex items-center gap-2 rounded-full bg-neutral-900/90 py-3 pl-4 pr-6 backdrop-blur"
        >
          <Image
            src="/logo-white.png"
            alt="Agape"
            width={181}
            height={32}
            className="h-5 w-auto"
            priority
          />
        </a>

        <div className="hidden items-center gap-1 rounded-full bg-neutral-900/90 px-3 py-2 backdrop-blur md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-5 py-2 text-sm text-neutral-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="/contact"
          className="rounded-full bg-white px-6 py-3 text-sm font-normal text-black transition-colors hover:bg-neutral-200"
        >
          book a demo
        </a>
      </nav>

      <div className="relative h-full w-full">
        <h1 className="absolute left-4 top-[18%] text-[14vw] font-medium leading-[0.95] tracking-[-0.04em] text-white md:left-10 md:text-[13vw]">
          build
        </h1>
        <h1 className="absolute right-4 top-[38%] text-[14vw] font-medium leading-[0.95] tracking-[-0.04em] text-white md:right-10 md:text-[13vw]">
          with
        </h1>
        <h1 className="absolute left-[18%] top-[58%] text-[14vw] font-medium leading-[0.95] tracking-[-0.04em] text-white md:left-[28%] md:text-[13vw]">
          care
        </h1>

        <p className="absolute left-6 top-[46%] max-w-[240px] text-[15px] leading-snug text-white/90 md:left-10">
          we partner with founders to design, build, and ship software that holds up under real users
        </p>

        <div className="absolute right-6 top-[14%] md:right-24">
          <div className="flex items-center justify-end gap-3">
            <div className="hidden h-px w-24 rotate-[20deg] bg-white/40 md:block" />
            <span className="text-4xl font-medium tracking-tight md:text-5xl">weekly</span>
          </div>
          <p className="mt-1 text-right text-xs text-white/70 md:text-sm">ships & demos</p>
        </div>

        <div className="absolute left-6 bottom-20 md:left-20 md:bottom-24">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-medium tracking-tight md:text-5xl">remote</span>
            <div className="hidden h-px w-24 rotate-[-20deg] bg-white/40 md:block" />
          </div>
          <p className="mt-1 text-xs text-white/70 md:text-sm">first, globally distributed</p>
        </div>

        <div className="absolute right-6 bottom-16 md:right-20 md:bottom-20">
          <div className="flex items-center justify-end gap-3">
            <div className="hidden h-px w-24 rotate-[-20deg] bg-white/40 md:block" />
            <span className="text-4xl font-medium tracking-tight md:text-5xl">5</span>
          </div>
          <p className="mt-1 text-right text-xs text-white/70 md:text-sm">regions we deliver in</p>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}
