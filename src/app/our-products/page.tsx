import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import {
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
  Bot,
  BarChart3,
  LayoutTemplate,
  BookHeart,
  Camera,
  QrCode,
} from "lucide-react";
import { Header } from "@/components/ui/header-3";
import { Reveal } from "@/components/ui/reveal";

// Loaded only here - this page's editorial/luxury treatment is deliberately
// distinct from the rest of the site (see .luxury-theme, globals.css), and
// from Vivira's and Wedly's own brand fonts on their dedicated pages.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-luxury-display",
});

const TITLE = "Our Products - Agape Works";
const DESCRIPTION =
  "Vivira, an AI cart-recovery plugin for WooCommerce, and Wedly, an all-in-one wedding platform - two products built by Agape Works.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/our-products" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/our-products" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

function GoldRule() {
  return (
    <div
      className="h-px w-20"
      style={{ background: "linear-gradient(90deg, transparent, #a8823a, transparent)" }}
      aria-hidden="true"
    />
  );
}

export default function OurProductsPage() {
  return (
    <div
      className={`luxury-theme ${playfair.variable} bg-background`}
      style={{ "--font-montserrat": "var(--font-luxury-display)" } as CSSProperties}
    >
      <Header />

      <main className="pt-32">
        {/* Editorial intro */}
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 pb-20 text-center">
          <Reveal className="flex flex-col items-center gap-6">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#a8823a]">
              Our Products
            </span>
            <h1 className="max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              Two products. One standard of care.
            </h1>
            <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
              Everything we build - for our own clients or under our own name - is held to the
              same bar: real functionality, honestly described, never oversold.
            </p>
            <GoldRule />
          </Reveal>
        </section>

        {/* Vivira */}
        <section className="border-t border-[#1a1613]/8">
          <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal className="order-2 flex flex-col gap-6 lg:order-1">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element -- small static logo, not worth next/image */}
                <img src="/vivira-logo.svg" alt="" className="size-8" />
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700">
                  Live now
                </span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">Vivira</h2>
              <p className="text-lg leading-7 text-muted-foreground">
                An AI cart-recovery plugin for WooCommerce - recovers abandoned carts
                automatically, so stores keep the sales they&apos;d otherwise lose.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  { icon: MessageCircle, text: "WhatsApp 3-step abandoned cart recovery" },
                  { icon: ShieldCheck, text: "COD fraud & RTO risk shield" },
                  { icon: Bot, text: "AI WhatsApp support & shopping agent" },
                  { icon: BarChart3, text: "Revenue attribution analytics" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#a8823a]/10">
                      <Icon className="size-3 text-[#a8823a]" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <a
                href="https://vivira.agapeworks.in"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-[#a8823a] px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[#a8823a] hover:text-white"
              >
                Explore Vivira
                <ArrowUpRight className="size-4" />
              </a>
            </Reveal>
            <Reveal delay={0.1} className="order-1 lg:order-2">
              <div
                className="flex aspect-square items-center justify-center rounded-2xl border border-[#1a1613]/8 p-10"
                style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(147,51,234,0.08))" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- small static logo, not worth next/image */}
                <img src="/vivira-logo.svg" alt="Vivira" className="h-24 w-auto sm:h-32" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Wedly */}
        <section className="border-t border-[#1a1613]/8 bg-white/50">
          <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <div
                className="flex aspect-square items-center justify-center rounded-2xl border border-[#1a1613]/8 p-10"
                style={{ background: "linear-gradient(135deg, rgba(139,41,66,0.08), rgba(232,153,141,0.12))" }}
              >
                <Image
                  src="/wedly-logo.png"
                  alt="Wedly"
                  width={220}
                  height={220}
                  className="h-32 w-auto sm:h-40"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#8B2942]/10 px-3 py-1 text-xs font-medium text-[#8B2942]">
                  Coming soon
                </span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">Wedly</h2>
              <p className="text-lg leading-7 text-muted-foreground">
                An all-in-one wedding platform - a wedding website, guest RSVPs, and a live photo
                wall guests can post to with just a QR code, built for real Indian weddings.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  { icon: LayoutTemplate, text: "Wedding website, 9 ceremony templates" },
                  { icon: BookHeart, text: "RSVP & guestbook" },
                  { icon: Camera, text: "Live memory wall - guests upload with just a QR code" },
                  { icon: QrCode, text: "Guest check-in & seating finder" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#a8823a]/10">
                      <Icon className="size-3 text-[#a8823a]" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <a
                href="https://wedly.agapeworks.in"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-[#a8823a] px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[#a8823a] hover:text-white"
              >
                Join the waitlist
                <ArrowUpRight className="size-4" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-[#1a1613]/8">
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5 px-4 py-24 text-center sm:px-6">
            <GoldRule />
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Have an idea for what&apos;s next?
            </h2>
            <p className="max-w-md text-muted-foreground">
              We build products under our own name the same way we build them for clients - real
              scope, real access, shipped visibly.
            </p>
            <a
              href="/contact"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#1a1613] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1a1613]/90"
            >
              Get in touch
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
