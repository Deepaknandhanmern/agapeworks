import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { FaWordpress, FaShopify } from "react-icons/fa6";
import { ViviraProductHeader } from "@/components/sections/vivira-product-header";
import { ViviraDownloadButton } from "@/components/sections/vivira-download-button";
import { ViviraRoiCalculator } from "@/components/sections/vivira-roi-calculator";
import { ViviraPricingSection } from "@/components/sections/vivira-pricing-section";

// Served directly from this site (public/downloads/vivira.zip) - not a
// redirect to the subdomain. That file isn't in the repo yet; drop the real
// plugin .zip in at that path and this link starts working.
const VIVIRA_DOWNLOAD_PATH = "/downloads/vivira.zip";

export const metadata: Metadata = {
  title: "Vivira - Agape Works",
  description: "Vivira - an AI cart plugin for WooCommerce that recovers abandoned carts automatically.",
};

export default function ProductsPage() {
  return (
    <div className="vivira-theme relative flex min-h-screen flex-col text-foreground">
      {/* Color, not black, is the dominant background here - black is
          reserved for UI surfaces (nav, cards, footer) on top of it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(160deg,#f97316_0%,#c026d3_45%,#9333ea_75%,#000000_100%)]"
      />

      <main className="flex-1">
        <ViviraProductHeader />

        <section id="install" className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 pb-16 pt-8 text-center">
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
              <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-8 text-center shadow-sm">
                <h2 className="text-xl font-semibold text-foreground">Vivira for WooCommerce</h2>
                <p className="max-w-md text-muted-foreground">
                  Install Vivira on your WordPress + WooCommerce store to start recovering
                  abandoned carts automatically.
                </p>
                <ViviraDownloadButton href={VIVIRA_DOWNLOAD_PATH} />
              </div>
            </TabsContent>

            <TabsContent value="shopify" className="w-full">
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed bg-muted/20 p-8 text-center">
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
        </section>

        <section className="border-t bg-muted/20 px-4 py-24">
          <ViviraRoiCalculator />
        </section>

        <section className="border-t">
          <ViviraPricingSection />
        </section>
      </main>
    </div>
  );
}
