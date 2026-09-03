"use client";

import { useRef, useState } from "react";
import { Database, Server, Sparkles, Check, Star, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import Switch from "@/components/ui/simple-toggle";
import { ViviraDownloadButton } from "@/components/sections/vivira-download-button";
import { ViviraUpiPaymentDialog } from "@/components/sections/vivira-upi-payment-dialog";

// Real pricing - the Free tier installs the plugin directly (same lead-
// capture -> download flow as before); Pro/Enterprise open the UPI payment
// dialog since there's no card-billing backend wired into this page.
const plans = [
  {
    name: "Free Starter",
    monthly: 0,
    yearly: 0,
    yearlySavings: null as string | null,
    description: "Up to 50 recoveries/month - see Vivira work before you commit to more.",
    popular: false,
    features: [
      { text: "Up to 50 recoveries/month", icon: <Database size={20} /> },
      { text: "1-step recovery sequence", icon: <Server size={20} /> },
      { text: "Basic COD check", icon: <ShieldCheck size={20} /> },
    ],
  },
  {
    name: "Pro Growth",
    monthly: 1999,
    yearly: 19990,
    yearlySavings: "Save ₹3,998/yr - equivalent to ₹1,665/mo",
    description: "For growing stores that want the full recovery sequence, live.",
    popular: true,
    features: [
      { text: "Unlimited recoveries", icon: <Database size={20} /> },
      { text: "Full 3-step recovery sequence", icon: <Server size={20} /> },
      { text: "0-100 COD fraud shield", icon: <ShieldCheck size={20} /> },
      { text: "Sizing confirmation + live tracking", icon: <Sparkles size={20} /> },
      { text: "GST invoice PDF + 9 AM CEO briefing", icon: <Database size={20} /> },
    ],
  },
  {
    name: "Enterprise AI",
    monthly: 4999,
    yearly: 49990,
    yearlySavings: "Save ₹9,998/yr - equivalent to ₹4,165/mo",
    description: "Everything in Pro, plus the full AI sales and merchandising suite.",
    popular: false,
    features: [
      { text: "Everything in Pro Growth", icon: <Database size={20} /> },
      { text: "Gemini Vision Snap & Find", icon: <Sparkles size={20} /> },
      { text: "Voice note transcriber", icon: <Server size={20} /> },
      { text: "Virtual mannequin + shoppable reels", icon: <ShieldCheck size={20} /> },
      { text: "Meta CAPI sync + priority concierge", icon: <Database size={20} /> },
    ],
  },
];

export function ViviraPricingSection({ downloadHref }: { downloadHref: string }) {
  const pricingRef = useRef<HTMLDivElement>(null);
  const [isYearly, setIsYearly] = useState(false);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
    hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl overflow-hidden px-4 py-24" ref={pricingRef}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[360px] w-[400px] -translate-x-1/4 -translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.16),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[440px] translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.18),transparent_70%)] blur-3xl"
      />

      <div className="relative mx-auto mb-10 max-w-2xl text-center">
        <TimelineContent
          as="h2"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="mb-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          Simple, transparent pricing
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-muted-foreground"
        >
          Start free, upgrade when recoveries pay for themselves.
        </TimelineContent>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className={cn("text-sm font-medium", !isYearly ? "text-foreground" : "text-muted-foreground")}>
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} aria-label="Toggle yearly billing" />
          <span className={cn("text-sm font-medium", isYearly ? "text-foreground" : "text-muted-foreground")}>
            Yearly <span className="text-orange-600">(save 20%)</span>
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, index) => {
          const price = isYearly ? plan.yearly : plan.monthly;
          const isFree = plan.monthly === 0;

          return (
            <TimelineContent
              key={plan.name}
              as="div"
              animationNum={2 + index}
              timelineRef={pricingRef}
              customVariants={revealVariants}
              className={cn("relative", plan.popular && "lg:-translate-y-5")}
            >
              <div
                className={cn(
                  "liquid-glass relative flex h-full flex-col rounded-2xl p-6 transition-transform hover:-translate-y-1",
                  plan.popular && "ring-2 ring-orange-500",
                )}
              >
                {plan.popular && (
                  <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-xl rounded-tr-2xl bg-gradient-to-r from-orange-500 to-purple-600 px-3 py-1">
                    <Star className="size-3.5 fill-current text-white" />
                    <span className="text-xs font-semibold text-white">Most Popular</span>
                  </div>
                )}

                <h3 className="mb-1 text-2xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{plan.description}</p>

                <div className="mb-1 flex items-end gap-1 text-foreground">
                  <span className="text-3xl font-bold tracking-tight">
                    {isFree ? "₹0" : `₹${price.toLocaleString("en-IN")}`}
                  </span>
                  <span className="pb-1 text-sm text-muted-foreground">
                    / {isYearly ? "year" : "month"}
                  </span>
                </div>
                <p className="mb-6 h-4 text-xs font-medium text-orange-600">
                  {isYearly ? plan.yearlySavings : " "}
                </p>

                {isFree ? (
                  <ViviraDownloadButton
                    href={downloadHref}
                    label="Start free"
                    className="mb-6 w-full"
                  />
                ) : (
                  <ViviraUpiPaymentDialog
                    planName={plan.name}
                    amount={price}
                    billingLabel={isYearly ? "yearly" : "monthly"}
                    trigger={
                      <button
                        type="button"
                        className={cn(
                          "group relative mb-6 block w-full overflow-hidden rounded-xl p-3 text-center text-sm font-semibold transition-all duration-300 ease-out",
                          plan.popular
                            ? "text-white shadow-md"
                            : "border border-border text-foreground hover:border-orange-500 hover:text-orange-600",
                        )}
                        style={
                          plan.popular
                            ? { background: "linear-gradient(90deg, #f97316 0%, #9333ea 100%)" }
                            : undefined
                        }
                      >
                        Get {plan.name}
                      </button>
                    }
                  />
                )}

                <ul className="mt-auto space-y-2 border-t pt-4">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3">
                      <span className="grid size-5 shrink-0 place-content-center rounded-full border border-orange-500/30 bg-orange-500/10">
                        <Check className="size-3 text-orange-600" />
                      </span>
                      <span className="text-sm text-muted-foreground">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TimelineContent>
          );
        })}
      </div>
    </div>
  );
}
