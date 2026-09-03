"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Briefcase, Database, Server, Clock, Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import Switch from "@/components/ui/simple-toggle";

// Pricing isn't decided yet - every tier shows "Coming soon" instead of a
// dollar amount. Feature bullets stay at the level of general capability
// categories (not specific quotas/limits), since committing to exact specs
// before the pricing model is final would just have to be walked back later.
// Card chrome (popular badge/border, checkmark list, hover-ring button) is
// adapted from a pasted animated-pricing template - its monthly/yearly
// toggle and per-plan dollar amounts were dropped since there's no real
// price yet to animate between.
const plans = [
  {
    name: "Starter",
    description: "For small WooCommerce stores just getting started with cart recovery.",
    buttonText: "Notify me",
    popular: false,
    features: [
      { text: "Automated cart-recovery nudges", icon: <Briefcase size={20} /> },
      { text: "Recovery activity log", icon: <Database size={20} /> },
      { text: "Email support", icon: <Server size={20} /> },
    ],
    includes: ["Includes:", "Core WooCommerce integration", "Basic recovery reporting"],
  },
  {
    name: "Business",
    description: "For growing stores that want more automation and visibility.",
    buttonText: "Notify me",
    popular: true,
    features: [
      { text: "Everything in Starter", icon: <Briefcase size={20} /> },
      { text: "Revenue-recovered analytics", icon: <Database size={20} /> },
      { text: "Priority support", icon: <Server size={20} /> },
    ],
    includes: ["Everything in Starter, plus:", "Advanced recovery rules", "Multi-channel nudges"],
  },
  {
    name: "Enterprise",
    description: "For high-volume stores that need dedicated support.",
    buttonText: "Notify me",
    popular: false,
    features: [
      { text: "Everything in Business", icon: <Briefcase size={20} /> },
      { text: "Dedicated onboarding", icon: <Database size={20} /> },
      { text: "SLA-backed support", icon: <Server size={20} /> },
    ],
    includes: ["Everything in Business, plus:", "Custom integrations", "Dedicated account contact"],
  },
];

export function ViviraPricingSection() {
  const pricingRef = useRef<HTMLDivElement>(null);
  // Purely cosmetic for now - every tier shows "Coming soon" either way,
  // since there's no real monthly/yearly price yet to switch between.
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
          Pricing - coming soon
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-muted-foreground"
        >
          Plans are still being finalized. Tell us which fits your store and we&apos;ll let you
          know the moment pricing goes live.
        </TimelineContent>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className={cn("text-sm font-medium", !isYearly ? "text-foreground" : "text-muted-foreground")}>
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} aria-label="Toggle yearly billing" />
          <span className={cn("text-sm font-medium", isYearly ? "text-foreground" : "text-muted-foreground")}>
            Yearly
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, index) => (
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
                  <span className="text-xs font-semibold text-white">Popular</span>
                </div>
              )}

              <h3 className="mb-1 text-2xl font-semibold text-foreground">{plan.name}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{plan.description}</p>

              <div className="mb-6 flex items-center gap-2 text-foreground">
                <Clock className="size-5 text-muted-foreground" />
                <span className="text-lg font-semibold">Coming soon</span>
              </div>

              <Link
                href="/contact"
                className={cn(
                  "group relative mb-6 block w-full overflow-hidden rounded-xl p-3 text-center text-sm font-semibold transition-all duration-300 ease-out",
                  plan.popular
                    ? "text-white shadow-md"
                    : "border border-border text-foreground hover:border-orange-500 hover:text-orange-600",
                )}
                style={plan.popular ? { background: "linear-gradient(90deg, #f97316 0%, #9333ea 100%)" } : undefined}
              >
                {plan.buttonText}
              </Link>

              <ul className="space-y-2 py-2">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3">
                    <span className="grid place-content-center text-foreground/70">{feature.icon}</span>
                    <span className="text-sm text-muted-foreground">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto space-y-2 border-t pt-4">
                <h4 className="mb-2 text-sm font-medium text-foreground">{plan.includes[0]}</h4>
                <ul className="space-y-2">
                  {plan.includes.slice(1).map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="grid size-5 shrink-0 place-content-center rounded-full border border-orange-500/30 bg-orange-500/10">
                        <Check className="size-3 text-orange-600" />
                      </span>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
