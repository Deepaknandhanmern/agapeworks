import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";

// Exactly the engines given in the spec, grouped into the suites given -
// engines 31-41 weren't itemized in the source content, so this list has
// an honest gap between Owner Intelligence (#30) and Milestone Engines
// (#42) rather than inventing filler to round the count out.
const suites = [
  {
    name: "Recovery & Cart Engines",
    range: "1-5",
    engines: ["WhatsApp 3-Step", "Exit Nudge", "10-min Timer", "Back-in-Stock", "SMS Fallback"],
  },
  {
    name: "Fraud & Logistics",
    range: "6-10",
    engines: [
      "0-100 COD Scorer",
      "Partial COD Deposit",
      "Live Courier GPS",
      "AI Address Verifier",
      "1-Click Pre-Dispatch Cancel",
    ],
  },
  {
    name: "AI Sales & Search",
    range: "11-16",
    engines: [
      "Gemini Vision Snap & Find",
      "Voice Transcriber",
      "Sizing Concierge",
      "Complete the Look",
      "Multi-language AI",
      "Semantic Search",
    ],
  },
  {
    name: "Merchandising",
    range: "17-22",
    engines: [
      "Virtual Mannequin",
      "Shoppable Reels",
      "Volume Discounts",
      "Color Palette",
      "FOMO Badges",
      "Post-Purchase Upsells",
    ],
  },
  {
    name: "Retention & Tax",
    range: "23-28",
    engines: [
      "GST Invoice PDF",
      "5% Cashback Wallet",
      "Scratch Cards",
      "VIP LTV Scorer",
      "Fake Review Shield",
      "Multi-Currency",
    ],
  },
  {
    name: "Owner Intelligence",
    range: "29-30",
    engines: ["9:00 AM CEO Briefing", "Meta CAPI Server-Sync"],
  },
  {
    name: "Milestone Engines",
    range: "42-50",
    engines: [
      "WhatsApp 5-Star Reviews & Google Sync",
      "Price Drop Watchdog",
      "Gift Finder",
      "Product Care Guide",
      "Search Recovery",
      "Festival VIP Broadcast",
      "Birthday VIP Gifts",
      "Doorstep UPI",
      "Pre-Order Restock Gate",
    ],
  },
];

export function ViviraEngineDirectory() {
  return (
    <section className="relative mx-auto w-full max-w-4xl px-4 py-24">
      <Reveal className="mb-10 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          The engine directory
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Autonomous engines across {suites.length} suites, working together on every order.
        </p>
      </Reveal>

      <Reveal>
        <Accordion type="single" collapsible className="liquid-glass rounded-2xl px-6">
          {suites.map((suite) => (
            <AccordionItem key={suite.name} value={suite.name}>
              <AccordionTrigger className="text-foreground hover:no-underline">
                <span className="flex items-center gap-3">
                  {suite.name}
                  <span className="text-xs font-normal text-muted-foreground">#{suite.range}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {suite.engines.map((engine) => (
                    <li key={engine} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="size-1.5 shrink-0 rounded-full bg-orange-500" />
                      {engine}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
