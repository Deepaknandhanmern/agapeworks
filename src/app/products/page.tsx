import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { FaWordpress, FaShopify } from "react-icons/fa6";

// Served directly from this site (public/downloads/vivira.zip) — not a
// redirect to the subdomain. That file isn't in the repo yet; drop the real
// plugin .zip in at that path and this link starts working.
const VIVIRA_DOWNLOAD_PATH = "/downloads/vivira.zip";

export const metadata: Metadata = {
  title: "Products — Agape Works",
  description: "Vivira — an AI cart plugin for WooCommerce that recovers abandoned carts automatically.",
};

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 pb-16 pt-8 text-center sm:pt-10">
          {/* eslint-disable-next-line @next/next/no-img-element -- small static logo, not worth next/image */}
          <img src="/vivira-logo.svg" alt="Vivira" className="size-14" />
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Vivira — an AI cart that recovers itself
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            Vivira watches for abandoned carts and brings shoppers back automatically, so stores
            keep the sales they&apos;d otherwise lose.
          </p>

          <Tabs defaultValue="wordpress" className="mt-4 flex w-full flex-col items-center">
            <TabsList>
              <TabsTrigger value="wordpress" className="gap-2">
                <FaWordpress className="size-4" /> WordPress
              </TabsTrigger>
              <TabsTrigger value="shopify" className="gap-2">
                <FaShopify className="size-4" /> Shopify
              </TabsTrigger>
            </TabsList>

            <TabsContent value="wordpress" className="w-full">
              <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-8 text-center shadow-sm">
                <h2 className="text-xl font-semibold text-foreground">Vivira for WooCommerce</h2>
                <p className="max-w-md text-muted-foreground">
                  Install Vivira on your WordPress + WooCommerce store to start recovering
                  abandoned carts automatically.
                </p>
                <a
                  href={VIVIRA_DOWNLOAD_PATH}
                  download
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Download for WordPress
                </a>
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
      </main>
    </div>
  );
}
