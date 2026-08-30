import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Check, ArrowUpRight } from "lucide-react";
import { digitalPresencePlans, digitalPresenceIncludes } from "@/lib/products-data";
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

        {/* Pricing tiers */}
        <section className="border-t">
          <div className="mx-auto w-full max-w-5xl px-4 py-20">
            <div className="grid gap-6 md:grid-cols-3">
              {digitalPresencePlans.map((plan) => (
                <div
                  key={plan.term}
                  className={`relative flex flex-col gap-5 rounded-2xl border p-6 ${
                    plan.featured ? "border-foreground bg-foreground text-background shadow-lg" : "bg-card"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                      Most popular
                    </span>
                  )}

                  <div>
                    <p
                      className={`text-xs font-medium uppercase tracking-wide ${
                        plan.featured ? "text-background/60" : "text-muted-foreground"
                      }`}
                    >
                      {plan.term}
                    </p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight">{plan.price}</p>
                    <p className={`text-sm ${plan.featured ? "text-background/70" : "text-muted-foreground"}`}>
                      {plan.perYear}
                      {plan.savings && (
                        <span
                          className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                            plan.featured ? "bg-background/15 text-background" : "bg-accent text-foreground"
                          }`}
                        >
                          {plan.savings}
                        </span>
                      )}
                    </p>
                  </div>

                  <p className={`text-sm ${plan.featured ? "text-background/80" : "text-muted-foreground"}`}>
                    {plan.tagline}
                  </p>

                  {plan.perks.length > 0 && (
                    <ul className="flex flex-col gap-2 border-t pt-4 text-sm" style={{ borderColor: plan.featured ? "rgba(255,255,255,0.15)" : undefined }}>
                      {plan.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2">
                          <Check className={`mt-0.5 size-4 shrink-0 ${plan.featured ? "text-background" : "text-foreground"}`} />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <a
                    href="/contact"
                    className={`mt-auto inline-flex h-11 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                      plan.featured
                        ? "bg-background text-foreground hover:bg-background/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    Choose {plan.term}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="border-t bg-muted/20">
          <div className="mx-auto w-full max-w-3xl px-4 py-24">
            <div className="mb-10 flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Every plan includes the same complete package
              </h2>
              <p className="max-w-lg text-muted-foreground">
                The only difference between tiers is how long it's covered, and the price per year.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {digitalPresenceIncludes.map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-xl border bg-card p-4 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Vahi teaser */}
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
                Create GST-compliant invoices, track payments, and share bills over WhatsApp —
                from ₹1,999/year.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform group-hover:scale-[1.03]">
              See pricing
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
