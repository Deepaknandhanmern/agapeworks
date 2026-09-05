import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import {
  Sparkles,
  LayoutTemplate,
  BookHeart,
  Camera,
  QrCode,
  Gift,
  Lock,
  Bot,
  Gamepad2,
  Wand2,
  Wifi,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { WedlyWaitlistForm } from "@/components/sections/wedly-waitlist-form";

// Loaded only here, not site-wide - Wedly has its own brand identity
// (serif display + geometric sans) distinct from the rest of Agape Works.
// The two CSS variables below are re-bound to --font-inter/--font-montserrat
// (see the wrapper div's style prop) so the site's existing `font-sans` /
// `font-heading` utilities and the global `h1..h6 { @apply font-heading }`
// rule (globals.css) pick these up automatically within this page, with no
// need to repeat `style={{ fontFamily: ... }}` on every heading.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-wedly-display",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-wedly-body",
});

const TITLE = "Wedly - Coming Soon";
const DESCRIPTION =
  "Wedly is a wedding-day platform launching soon: a wedding website, live QR photo wall, guest check-in, and more, built for Indian weddings. Join the waitlist for early access.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/wedly" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/wedly" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

// Only what's actually built and working today (per the Wedly app itself,
// 2026-09-05) - no unbuilt feature presented as live. See the "in active
// development" list below for what's UI-complete but still running on
// placeholder/canned logic.
const builtFeatures = [
  {
    icon: LayoutTemplate,
    title: "Wedding website, 9 ceremony templates",
    description: "Hindu, Muslim, and Christian templates, built for multi-day event structures.",
  },
  {
    icon: BookHeart,
    title: "RSVP & guestbook",
    description: "Real guest responses and messages, collected in one place for the couple.",
  },
  {
    icon: Camera,
    title: "Live memory wall",
    description:
      "Guests scan a QR code and upload photos or videos with no login - streamed live to a screen at the event.",
  },
  {
    icon: QrCode,
    title: "Guest check-in & seating",
    description: "QR check-in at the door, plus a seating and table finder guests can look up themselves.",
  },
  {
    icon: Gift,
    title: "Digital shagun & gifting",
    description: "A digital way for guests to send gifts, alongside the traditional envelope.",
  },
  {
    icon: Lock,
    title: "Private by default",
    description: "Password-gated pages for weddings that aren't meant to be public.",
  },
];

// UI-complete inside the app today, but running on canned/simulated logic
// rather than real AI or persisted multiplayer state - deliberately not
// listed above as "built," matching how this site treats every other
// in-progress feature (see /products/changelog for the same pattern).
const inProgressFeatures = [
  { icon: Bot, title: "AI concierge for guests" },
  { icon: Gamepad2, title: "Trivia games & DJ jukebox" },
  { icon: Wand2, title: "AI avatar portraits & disposable-camera mode" },
  { icon: Wifi, title: "WhatsApp & Google Drive auto-sync" },
];

const pricingTiers = [
  { name: "Essential", price: "₹1,499" },
  { name: "Live Experience", price: "₹3,499", popular: true },
  { name: "Royal Celebration", price: "₹5,999" },
];

export default function WedlyPage() {
  return (
    <div
      className={`wedly-theme ${playfair.variable} ${jakarta.variable} flex min-h-screen flex-col bg-background`}
      style={
        {
          "--font-inter": "var(--font-wedly-body)",
          "--font-montserrat": "var(--font-wedly-display)",
        } as CSSProperties
      }
    >
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-6 sm:px-6">
        <div className="flex items-center gap-2">
          <div
            className="flex size-8 items-center justify-center rounded-lg"
            style={{ background: "linear-gradient(135deg, #D4AF37, #f5e6b8)" }}
          >
            <Sparkles className="size-4 text-[#1C1917]" />
          </div>
          <span className="font-heading text-lg font-semibold text-foreground">Wedly</span>
        </div>
        <a
          href="#waitlist"
          className="rounded-full border border-[#1C1917]/15 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#1C1917]/5"
        >
          Join waitlist
        </a>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section
          id="waitlist"
          className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 pb-20 pt-10 text-center sm:pt-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-1 text-xs font-medium text-[#8a6d1f]">
            <span className="size-1.5 rounded-full bg-[#D4AF37]" />
            Coming soon - early access opening soon
          </div>

          <h1 className="max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Your wedding, beautifully hosted.
          </h1>

          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            A wedding website, guest RSVPs, and a live photo wall your guests can post to with
            just a QR code - built for real Indian weddings, one ceremony at a time.
          </p>

          <WedlyWaitlistForm />
          <p className="text-xs text-muted-foreground">No spam. One email when early access opens.</p>
        </section>

        {/* Built features */}
        <section className="border-t border-[#1C1917]/5 bg-white/40">
          <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6">
            <Reveal className="mb-10 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                What&apos;s already built
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Real, working functionality in the app today - not a mockup.
              </p>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {builtFeatures.map(({ icon: Icon, title, description }, i) => (
                <Reveal key={title} delay={i * 0.05}>
                  <div className="flex h-full flex-col gap-3 rounded-xl border border-[#1C1917]/10 bg-white p-6 shadow-sm">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#D4AF37]/15">
                      <Icon className="size-5 text-[#8a6d1f]" />
                    </div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* In active development */}
        <section className="border-t border-[#1C1917]/5">
          <div className="mx-auto w-full max-w-3xl px-4 py-20 text-center sm:px-6">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                In active development
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
                Visible in the app today, but still running on placeholder logic until launch -
                not sold, not promised, not live yet.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {inProgressFeatures.map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 rounded-lg border border-dashed border-[#1C1917]/15 bg-white/40 px-4 py-3 text-left text-sm text-muted-foreground"
                >
                  <Icon className="size-4 shrink-0 text-[#1C1917]/40" />
                  {title}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="border-t border-[#1C1917]/5 bg-white/40">
          <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Planned pricing
              </h2>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                Not live yet, and subject to change before launch - full plan details will be
                shared with early access.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {pricingTiers.map((tier) => (
                <Reveal key={tier.name}>
                  <div
                    className={`flex h-full flex-col items-center gap-2 rounded-xl border p-8 ${
                      tier.popular
                        ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-md"
                        : "border-[#1C1917]/10 bg-white"
                    }`}
                  >
                    {tier.popular && (
                      <span className="mb-1 rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-medium text-[#1C1917]">
                        Popular
                      </span>
                    )}
                    <h3 className="font-semibold text-foreground">{tier.name}</h3>
                    <p className="text-3xl font-semibold text-foreground">{tier.price}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-[#1C1917]/5">
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5 px-4 py-20 text-center sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Be first to know when Wedly opens.
            </h2>
            <WedlyWaitlistForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1C1917]/5 px-4 py-8 text-center text-xs text-muted-foreground sm:px-6">
        <p>
          Wedly is built by{" "}
          <a href="https://agapeworks.in" className="underline underline-offset-4 hover:text-foreground">
            Agape Works
          </a>
        </p>
        <p className="mt-1">&copy; {new Date().getFullYear()} Agape Works</p>
      </footer>
    </div>
  );
}
