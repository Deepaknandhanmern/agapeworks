import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";

// Only the 13 engines actually built, tested, and live in the plugin as of
// 2026-09-03 (see Vivira_AI_Website_Content_and_Copy.md Section 5). Do not
// add an engine here until it's been through that same verification -
// several previously listed here (GST invoice, live courier GPS, Gemini
// Vision, virtual mannequin, CEO briefing, Meta CAPI, multi-currency, etc.)
// exist only as unaudited code, not as something a customer can use today.
const suites = [
  {
    name: "Recovery & Conversion",
    range: "1-5",
    engines: [
      "WhatsApp 3-Step Abandoned Cart Recovery",
      "Slide-Out Cart Drawer",
      "Mobile Sticky Buy Bar",
      "Social Proof Popups",
      "Exit-Intent Discount Offer",
    ],
  },
  {
    name: "Fraud & Delivery Risk",
    range: "6-7",
    engines: ["COD Fraud & RTO Risk Shield (0-100 scoring + WhatsApp verification)", "Delivery Risk Profiling"],
  },
  {
    name: "AI & Automation",
    range: "8-10",
    engines: [
      "AI WhatsApp Support & Shopping Agent (with human hand-off)",
      "On-Site AI Chat Widget (text + voice)",
      "Visual Automation Builder + AI Workflow Generator",
    ],
  },
  {
    name: "Analytics & Controls",
    range: "11-13",
    engines: [
      "Customer Segmentation (VIP, high-value, returning, inactive, risk flags)",
      "Revenue Attribution Analytics",
      "AI Token & Budget Usage Controls",
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
