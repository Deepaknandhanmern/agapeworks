import type { Metadata } from "next";
import { CircleCheck, Wrench } from "lucide-react";
import { ViviraProductHeader } from "@/components/sections/vivira-product-header";
import { ViviraGradientFooter } from "@/components/sections/vivira-gradient-footer";
import { getViviraDownloadHref } from "@/lib/vivira";

const TITLE = "Changelog & Roadmap - Vivira AI";
const DESCRIPTION =
  "What's actually live in Vivira AI today, and what's still in active development - no inflated claims.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/products/changelog" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/products/changelog" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

// Kept in sync by hand with vivira-engine-directory.tsx and
// Vivira_AI_Website_Content_and_Copy.md Section 5 - move an item from
// "in development" to "live" only after it's been through the same
// verification those got (built, tested, actually loaded in the plugin).
const live = [
  "WhatsApp 3-Step Abandoned Cart Recovery",
  "Slide-Out Cart Drawer",
  "Mobile Sticky Buy Bar",
  "Social Proof Popups",
  "Exit-Intent Discount Offer",
  "COD Fraud & RTO Risk Shield (0-100 scoring + WhatsApp verification)",
  "Delivery Risk Profiling",
  "AI WhatsApp Support & Shopping Agent (with human hand-off)",
  "On-Site AI Chat Widget (text + voice)",
  "Visual Automation Builder + AI Workflow Generator",
  "Customer Segmentation (VIP, high-value, returning, inactive, risk flags)",
  "Revenue Attribution Analytics",
  "AI Token & Budget Usage Controls",
];

const inDevelopment = [
  "GST invoice generation",
  "Live courier tracking",
  "9AM CEO daily briefing",
  "Gemini Vision product-photo search",
  "Virtual mannequin preview",
  "Multi-currency switching",
  "Meta CAPI server-side sync",
];

export default async function ViviraChangelogPage() {
  const downloadHref = await getViviraDownloadHref();

  return (
    <div className="vivira-theme relative flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1 pt-32">
        <ViviraProductHeader downloadHref={downloadHref} />

        <section className="mx-auto w-full max-w-3xl px-4 py-16">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Changelog &amp; roadmap
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              What&apos;s actually built and verified today, versus what&apos;s still in
              progress. We&apos;d rather tell you 13 things work than claim 50 and disappoint you.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <CircleCheck className="size-5 text-emerald-500" />
              Live now ({live.length})
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {live.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-lg border bg-card px-3 py-2 text-sm text-foreground"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Wrench className="size-5 text-muted-foreground" />
              In active development ({inDevelopment.length})
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Exists as code today, but hasn&apos;t passed the same verification as the list
              above - not sold, not promised, not loaded in the live product yet.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {inDevelopment.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-lg border border-dashed bg-muted/20 px-3 py-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <ViviraGradientFooter />
    </div>
  );
}
