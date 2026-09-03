import type { Metadata } from "next";
import { ViviraProductHeader } from "@/components/sections/vivira-product-header";
import { ViviraRoiSliderCalculator } from "@/components/sections/vivira-roi-slider-calculator";
import { ViviraRecoveryJourney } from "@/components/sections/vivira-recovery-journey";
import { ViviraPricingSection } from "@/components/sections/vivira-pricing-section";
import { ViviraEngineDirectory } from "@/components/sections/vivira-engine-directory";
import { ViviraGradientFooter } from "@/components/sections/vivira-gradient-footer";
import { getViviraDownloadHref } from "@/lib/vivira";

const PRODUCTS_TITLE = "Vivira AI - Autonomous Revenue Recovery for WooCommerce | Agape Works";
const PRODUCTS_DESCRIPTION =
  "Vivira AI recovers 20-30% of abandoned-cart revenue through autonomous WhatsApp sequences, 0-100 COD fraud shields, and 1-click UPI purchases - 50 engines across 8 suites.";

export const metadata: Metadata = {
  title: PRODUCTS_TITLE,
  description: PRODUCTS_DESCRIPTION,
  alternates: { canonical: "/products" },
  openGraph: { title: PRODUCTS_TITLE, description: PRODUCTS_DESCRIPTION, url: "/products" },
  twitter: { title: PRODUCTS_TITLE, description: PRODUCTS_DESCRIPTION },
};

export default async function ProductsPage() {
  const downloadHref = await getViviraDownloadHref();

  return (
    <div className="vivira-theme relative flex min-h-screen flex-col bg-background text-foreground">
      {/* Soft ambient color blobs (Vivira's orange/purple mark) instead of a
          hard diagonal gradient sweep - color still reads as dominant, but
          as depth/glow rather than a flat poster-style wash. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.20),transparent_70%)] blur-3xl" />
        <div className="absolute -right-1/4 top-1/4 h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.20),transparent_70%)] blur-3xl" />
        <div className="absolute -left-1/3 bottom-0 h-[75vh] w-[75vh] rounded-full bg-[radial-gradient(circle,rgba(192,38,211,0.16),transparent_70%)] blur-3xl" />
        <div className="absolute -right-1/3 -bottom-1/4 h-[65vh] w-[65vh] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.14),transparent_70%)] blur-3xl" />
      </div>

      <main className="flex-1">
        <ViviraProductHeader downloadHref={downloadHref} />

        <section id="roi" className="relative overflow-hidden px-4 py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[560px] -translate-x-[60%] -translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.16),transparent_70%)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 bottom-0 h-[340px] w-[480px] -translate-x-[20%] translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.14),transparent_70%)] blur-3xl"
          />
          <div className="relative">
            <ViviraRoiSliderCalculator />
          </div>
        </section>

        <div className="border-t">
          <ViviraRecoveryJourney />
        </div>

        <section id="pricing" className="border-t">
          <ViviraPricingSection downloadHref={downloadHref} />
        </section>

        <div className="border-t">
          <ViviraEngineDirectory />
        </div>

        <section className="relative overflow-hidden border-t px-4 py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-[70%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.18),transparent_70%)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-[30%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.18),transparent_70%)] blur-3xl"
          />
          <div className="liquid-glass relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 overflow-hidden rounded-3xl px-8 py-16 text-center">
            <h2 className="relative max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Stop losing carts to abandonment.
            </h2>
            <p className="relative max-w-md text-muted-foreground">
              Start free in three minutes - upgrade to Pro or Enterprise whenever recoveries are
              paying for themselves.
            </p>
            <a
              href="#pricing"
              className="relative inline-flex h-12 items-center justify-center gap-2 rounded-lg px-8 text-base font-medium text-white shadow-lg shadow-orange-500/20 transition-transform hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(90deg, #f97316 0%, #9333ea 100%)" }}
            >
              Start 7-Day Free Trial
            </a>
          </div>
        </section>
      </main>

      <ViviraGradientFooter />
    </div>
  );
}
