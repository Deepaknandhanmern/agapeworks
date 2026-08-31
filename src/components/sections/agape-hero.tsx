import { readexPro, silkscreen } from "@/lib/hero-fonts";
import { Header } from "@/components/ui/header-3";
import { HeroStat } from "@/components/sections/hero-stat";

// Cinematic video hero — full-bleed looping video behind a single centered
// composition (headline, subhead, CTA) with a real-stats footer. Uses the
// site's shared Header (dark variant) for nav, same as every other page —
// this section deliberately does not introduce a second nav system.
export function AgapeHero() {
  return (
    <section
      className={`${readexPro.className} relative flex h-screen w-full flex-col overflow-hidden bg-black text-white antialiased`}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4"
      />
      {/* Wash for text legibility across the whole viewport, heavier toward the bottom where the stats footer sits */}
      <div className="pointer-events-none absolute inset-0 bg-black/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="relative z-10 flex h-full flex-col">
        <Header variant="dark" />

        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <h1
            className={`${silkscreen.className} text-balance text-[13vw] leading-[1.05] tracking-tight sm:text-[9vw] md:text-[clamp(28px,6.2vw,80px)] md:tracking-[-0.02em]`}
          >
            <span className="block">Software, built</span>
            <span className="block">with genuine care.</span>
          </h1>

          <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-white/80 md:mt-8 md:max-w-lg md:text-lg">
            A small team of senior engineers who design, build, and ship software that holds up
            under real users.
          </p>

          <a
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 hover:scale-[1.02] md:mt-10"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.15), 0 0 22px rgba(255,255,255,0.32), 0 0 44px rgba(255,255,255,0.12)",
            }}
          >
            Get Started
          </a>
        </div>

        <div className="grid grid-cols-2 gap-6 px-6 pb-10 sm:grid-cols-4 sm:gap-4 md:pb-14">
          <HeroStat glyph="<" staticValue="2–4" suffix=" wks" label="To first working demo" displayClassName={silkscreen.className} delay={0} />
          <HeroStat glyph="%" target={100} suffix="%" label="Code ownership, yours" displayClassName={silkscreen.className} delay={80} />
          <HeroStat glyph="*" target={0} label="Bait-and-switch juniors" displayClassName={silkscreen.className} delay={160} />
          <HeroStat glyph="#" target={1} suffix="+" label="Senior engineer, every call" displayClassName={silkscreen.className} delay={240} />
        </div>
      </div>
    </section>
  );
}
