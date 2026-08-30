import { readexPro } from "@/lib/hero-fonts";
import { Header } from "@/components/ui/header-3";

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

      <Header variant="dark" />

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
