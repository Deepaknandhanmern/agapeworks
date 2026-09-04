import { SiWordpress, SiShopify } from "react-icons/si";
import { Reveal } from "@/components/ui/reveal";
import { ViviraDownloadButton } from "@/components/sections/vivira-download-button";

export function ViviraPlatformDownload({ downloadHref }: { downloadHref: string }) {
  return (
    <section id="download" className="relative mx-auto w-full max-w-4xl px-4 py-24">
      <Reveal className="mb-12 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Get Vivira for your store
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Pick your platform.</p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="liquid-glass flex flex-col items-center gap-4 rounded-2xl p-8 text-center">
            <SiWordpress className="size-12 text-foreground" />
            <h3 className="text-lg font-semibold text-foreground">WordPress + WooCommerce</h3>
            <p className="text-sm text-muted-foreground">
              Available now - install the plugin directly, Free Starter tier included.
            </p>
            <ViviraDownloadButton href={downloadHref} label="Download for WordPress" />
          </div>

          <div className="liquid-glass flex flex-col items-center gap-4 rounded-2xl p-8 text-center opacity-70">
            <SiShopify className="size-12 text-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Shopify</h3>
            <p className="text-sm text-muted-foreground">In active development - not available yet.</p>
            <button
              type="button"
              disabled
              className="mt-2 inline-flex h-11 cursor-not-allowed items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-muted-foreground"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
