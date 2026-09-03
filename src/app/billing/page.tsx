import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Check } from "lucide-react";
import { vahiPlans } from "@/lib/products-data";

const BILLING_TITLE = "Vahi - GST Billing - Agape Works";
const BILLING_DESCRIPTION =
  "Vahi is a simple GST-compliant invoicing and billing tool for small businesses - track payments, share invoices over WhatsApp, priced per year.";

export const metadata: Metadata = {
  title: BILLING_TITLE,
  description: BILLING_DESCRIPTION,
  alternates: { canonical: "/billing" },
  openGraph: { title: BILLING_TITLE, description: BILLING_DESCRIPTION, url: "/billing" },
  twitter: { title: BILLING_TITLE, description: BILLING_DESCRIPTION },
};

const includes = [
  "GST-compliant invoices with correct tax calculation",
  "Payment tracking so you always know who owes you",
  "Share invoices instantly over WhatsApp or email",
  "Works from your phone - no computer needed",
  "Your data backed up, never on paper alone",
];

export default function BillingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-16 pt-8 text-center sm:pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Vahi
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            GST billing, without the paperwork headache.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            Create GST-compliant invoices, track who&apos;s paid and who hasn&apos;t, and share
            bills over WhatsApp - all from your phone. Priced per year.
          </p>
        </section>

        {/* Pricing */}
        <section className="border-t">
          <div className="mx-auto w-full max-w-3xl px-4 py-20">
            <div className="grid gap-6 sm:grid-cols-2">
              {vahiPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col gap-5 rounded-2xl border p-6 ${
                    plan.featured ? "border-foreground bg-foreground text-background shadow-lg" : "bg-card"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                      Most picked
                    </span>
                  )}
                  <div>
                    <p className={`text-xs font-medium uppercase tracking-wide ${plan.featured ? "text-background/60" : "text-muted-foreground"}`}>
                      {plan.name}
                    </p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight">{plan.price}</p>
                  </div>
                  <p className={`text-sm ${plan.featured ? "text-background/80" : "text-muted-foreground"}`}>
                    {plan.tagline}
                  </p>
                  <ul className="flex flex-col gap-2 border-t pt-4 text-sm" style={{ borderColor: plan.featured ? "rgba(255,255,255,0.15)" : undefined }}>
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2">
                        <Check className={`mt-0.5 size-4 shrink-0 ${plan.featured ? "text-background" : "text-foreground"}`} />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    className={`mt-auto inline-flex h-11 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                      plan.featured ? "bg-background text-foreground hover:bg-background/90" : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    Choose {plan.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="border-t bg-muted/20">
          <div className="mx-auto w-full max-w-2xl px-4 py-24">
            <div className="mb-10 flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Everything you need to bill properly
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Pro adds unlimited invoices and multi-branch support - both tiers get the same core tool.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-xl border bg-card p-4 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-t">
          <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground">
              Ready to stop chasing payments on paper?
            </h2>
            <p className="max-w-md text-muted-foreground">
              Tell us a bit about your business - we&apos;ll set you up.
            </p>
            <AntiMetalButton href="/contact" label="Get started" />
          </div>
        </section>
      </main>
    </div>
  );
}
