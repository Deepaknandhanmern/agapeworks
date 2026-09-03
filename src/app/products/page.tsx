import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { FaWordpress, FaShopify } from "react-icons/fa6";
import { ViviraProductHeader } from "@/components/sections/vivira-product-header";
import { ViviraHowItWorks } from "@/components/sections/vivira-how-it-works";
import { ViviraDownloadButton } from "@/components/sections/vivira-download-button";
import { ViviraRoiCalculator } from "@/components/sections/vivira-roi-calculator";
import { ViviraPricingSection } from "@/components/sections/vivira-pricing-section";
import { ViviraGradientFooter } from "@/components/sections/vivira-gradient-footer";
import { getViviraDownloadHref } from "@/lib/vivira";

const PRODUCTS_TITLE = "Vivira - Agape Works";
const PRODUCTS_DESCRIPTION =
  "Vivira - an AI cart plugin for WooCommerce that recovers abandoned carts automatically.";

export const metadata: Metadata = {
  title: PRODUCTS_TITLE,
  description: PRODUCTS_DESCRIPTION,
  openGraph: { title: PRODUCTS_TITLE, description: PRODUCTS_DESCRIPTION, url: "/products" },
  twitter: { title: PRODUCTS_TITLE, description: PRODUCTS_DESCRIPTION },
};

export default async function ProductsPage() {
  const downloadHref = await getViviraDownloadHref();

  return (
    <div className="vivira-theme relative flex min-h-screen flex-col bg-background text-foreground">
      {/* Soft ambient color blobs (Vivira's orange/purple mark) instead of a
          hard diagonal gradient sweep - color still reads as dominant, but
          as depth/glow rather than a flat poster-style wash. Lower opacity
          than the original dark version - the same colors read stronger
          against white than they did against black. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.20),transparent_70%)] blur-3xl" />
        <div className="absolute -right-1/4 top-1/4 h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.20),transparent_70%)] blur-3xl" />
        <div className="absolute -left-1/3 bottom-0 h-[75vh] w-[75vh] rounded-full bg-[radial-gradient(circle,rgba(192,38,211,0.16),transparent_70%)] blur-3xl" />
        <div className="absolute -right-1/3 -bottom-1/4 h-[65vh] w-[65vh] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.14),transparent_70%)] blur-3xl" />
      </div>

      <main className="flex-1">
        <ViviraProductHeader downloadHref={downloadHref} />

        <ViviraHowItWorks />

        <section id="install" className="relative overflow-hidden px-4 pb-16 pt-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[400px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.18),transparent_70%)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 bottom-0 h-[300px] w-[320px] -translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.16),transparent_70%)] blur-3xl"
          />
          <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
          <Tabs defaultValue="wordpress" className="mt-4 flex w-full flex-col items-center">
            <TabsList>
              <TabsTrigger value="wordpress" className="gap-2">
                <FaWordpress className="size-4 text-[#21759B]" /> WordPress
              </TabsTrigger>
              <TabsTrigger value="shopify" className="gap-2">
                <FaShopify className="size-4 text-[#95BF47]" /> Shopify
              </TabsTrigger>
            </TabsList>

            <TabsContent value="wordpress" className="w-full">
              <div className="liquid-glass flex flex-col items-center gap-4 rounded-2xl p-8 text-center">
                <h2 className="text-xl font-semibold text-foreground">Vivira for WooCommerce</h2>
                <p className="max-w-md text-muted-foreground">
                  Install Vivira on your WordPress + WooCommerce store to start recovering
                  abandoned carts automatically.
                </p>
                <ViviraDownloadButton href={downloadHref} />
              </div>
            </TabsContent>

            <TabsContent value="shopify" className="w-full">
              <div className="liquid-glass flex flex-col items-center gap-4 rounded-2xl border-dashed p-8 text-center">
                <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                  <Clock className="size-3.5" /> Coming soon
                </span>
                <h2 className="text-xl font-semibold text-foreground">Vivira for Shopify</h2>
                <p className="max-w-md text-muted-foreground">
                  A Shopify version of Vivira is on the way. WooCommerce stores can install it
                  today from the WordPress tab.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          </div>
        </section>

        <section className="relative overflow-hidden border-t bg-muted/20 px-4 py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[560px] -translate-x-[60%] -translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.16),transparent_70%)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 bottom-0 h-[340px] w-[480px] -translate-x-[20%] translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.14),transparent_70%)] blur-3xl"
          />
          <div className="relative">
            <ViviraRoiCalculator />
          </div>
        </section>

        <section id="pricing" className="border-t">
          <ViviraPricingSection />
        </section>

        <section className="relative overflow-hidden px-4 py-24">
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
              Install Vivira on your store and let it start recovering sales you&apos;d
              otherwise lose - no setup beyond connecting your store.
            </p>
            <div className="relative">
              <ViviraDownloadButton href={downloadHref} />
            </div>
          </div>
        </section>
      </main>

      <ViviraGradientFooter />
    </div>
  );
}
