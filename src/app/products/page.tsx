import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Sparkles } from "lucide-react";
import { SellaraComingSoon } from "@/components/sections/sellara-coming-soon";

export const metadata: Metadata = {
  title: "Products — Agape Works",
  description:
    "The Digital Presence Plan — a complete website, hosting, and care, sold as one flat payment for 1, 2, or 3 years. No monthly billing.",
};

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-16 pt-8 text-center sm:pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Products
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            One website. One payment. Years of peace of mind.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            The Digital Presence Plan gets your business a website, hosting, and ongoing care —
            paid once upfront for the term you choose. No monthly bills to track.
          </p>
        </section>

        {/* Sellara — not launched yet, so a simple animated teaser rather
            than a full pitch with pricing/CTAs (see /sellara for the full
            early-access page this still links to). */}
        <SellaraComingSoon />

        {/* Digital Presence Plan — launching soon, no pricing disclosed here */}
        <section className="border-t bg-muted/20">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 px-4 py-16 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5" /> Launching soon
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Digital Presence Plan
            </h2>
            <p className="max-w-lg text-muted-foreground">
              A complete website, hosting, and ongoing care — one flat payment, no monthly bills.
              Get in touch to be first in line.
            </p>
            <a
              href="/contact"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get in touch
            </a>
          </div>
        </section>

        {/* Vahi teaser — no pricing disclosed here, see /billing to learn more */}
        <section className="border-t bg-muted/20">
          <a
            href="/billing"
            className="group mx-auto flex w-full max-w-5xl flex-col items-start gap-4 px-4 py-14 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                Now available
              </span>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Vahi — GST billing, without the paperwork
              </h2>
              <p className="mt-2 max-w-lg text-muted-foreground">
                Create GST-compliant invoices, track payments, and share bills over WhatsApp.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform group-hover:scale-[1.03]">
              Learn more
            </span>
          </a>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-t">
          <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground">
              Ready to get your business online?
            </h2>
            <p className="max-w-md text-muted-foreground">
              Tell us a bit about your business — we&apos;ll take it from there.
            </p>
            <AntiMetalButton href="/contact" label="Get started" />
          </div>
        </section>
      </main>
    </div>
  );
}
