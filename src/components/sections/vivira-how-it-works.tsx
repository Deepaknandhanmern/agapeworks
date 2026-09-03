import { ScanSearch, Sparkles, Send, ShoppingCart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    title: "Detect",
    description: "A shopper leaves checkout - Vivira sees the cart go cold in real time.",
    icon: ScanSearch,
  },
  {
    title: "Draft",
    description: "It writes a personalized nudge referencing what's actually in the cart.",
    icon: Sparkles,
  },
  {
    title: "Send",
    description: "The message goes out automatically, no one has to remember to follow up.",
    icon: Send,
  },
  {
    title: "Return",
    description: "The shopper comes back to a pre-filled cart and finishes checking out.",
    icon: ShoppingCart,
  },
];

export function ViviraHowItWorks() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-20">
      {/* Local color wash, same pairing used elsewhere on this page and on
          the homepage's own sectioned glows - keeps the page from reading
          as flat black between the hero and the next section's own glow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[380px] w-[420px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.18),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-[340px] w-[380px] translate-x-1/4 translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.16),transparent_70%)] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <Reveal className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            How it works
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Four steps, none of them manual.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.1}>
              <div className="liquid-glass flex h-full flex-col gap-3 rounded-2xl p-6">
                <step.icon className="size-5 text-foreground" />
                <h3 className="font-medium text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
