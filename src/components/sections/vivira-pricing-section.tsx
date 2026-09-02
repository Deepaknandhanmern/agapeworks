"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, CheckCheck, Database, Server, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";

// Pricing isn't decided yet - every tier shows "Coming soon" instead of a
// dollar amount. Feature bullets stay at the level of general capability
// categories (not specific quotas/limits), since committing to exact specs
// before the pricing model is final would just have to be walked back later.
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
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

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
    <div className="relative mx-auto w-full max-w-7xl px-4 py-24" ref={pricingRef}>
      <div className="mx-auto mb-10 max-w-2xl text-center">
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
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative h-full transition-shadow ${
                plan.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              <CardHeader className="text-left">
                <div className="flex justify-between">
                  <h3 className="mb-1 text-2xl font-semibold text-foreground">{plan.name}</h3>
                  {plan.popular && (
                    <span className="h-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{plan.description}</p>
                <motion.div
                  animate={{ scale: hoveredPlan === plan.name ? 1.03 : 1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Clock className="size-4" />
                  <span className="text-lg font-semibold">Coming soon</span>
                </motion.div>
              </CardHeader>

              <CardContent className="pt-0">
                <Link
                  href="/contact"
                  className={`mb-6 block w-full rounded-xl p-3 text-center text-sm font-medium transition-colors ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border text-foreground hover:bg-accent"
                  }`}
                >
                  {plan.buttonText}
                </Link>

                <ul className="space-y-2 py-2">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3">
                      <span className="grid place-content-center text-foreground/70">
                        {feature.icon}
                      </span>
                      <span className="text-sm text-muted-foreground">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 border-t pt-4">
                  <h4 className="mb-2 text-sm font-medium text-foreground">{plan.includes[0]}</h4>
                  <ul className="space-y-2">
                    {plan.includes.slice(1).map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="grid size-5 shrink-0 place-content-center rounded-full border border-primary/40 bg-primary/5">
                          <CheckCheck className="size-3 text-primary" />
                        </span>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
