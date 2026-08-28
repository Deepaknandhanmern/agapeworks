import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { AnimatedFeatureCard } from "@/components/ui/feature-card-1";
import { AIVoiceInput } from "@/components/ui/ai-voice-input";
import { DeviceShowcase } from "@/components/sections/device-showcase";
import { Marquee } from "@/components/ui/marquee";
import { mainServices, supportingServices } from "@/lib/services-data";
import { techStack } from "@/lib/tech-stack-data";

const cardColors = ["orange", "purple", "blue"] as const;

export const metadata: Metadata = {
  title: "Services — Agape Works",
  description:
    "Web, mobile, SaaS, and e-commerce development, AI solutions, custom software, SEO & AEO, and digital marketing — built on Next.js, React, React Native, Flutter, Laravel, PHP, WordPress, WooCommerce, and MySQL.",
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-16 pt-20 text-center sm:pt-28">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Our Services
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Everything it takes to plan, build, and grow your product.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            From first line of code to first page of search — Agape Works covers the full
            stack, in-house.
          </p>
        </section>

        {/* Main Services */}
        <section className="mx-auto w-full max-w-5xl px-4 pb-24">
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Main Services
            </h2>
            <p className="max-w-lg text-muted-foreground">
              The core disciplines behind every product we build.
            </p>
          </div>
          <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mainServices.map(({ step, title, description, icon: Icon }, i) => (
              <AnimatedFeatureCard
                key={step}
                index={step}
                tag={title}
                title={description}
                icon={<Icon strokeWidth={1.5} />}
                color={cardColors[i % cardColors.length]}
              />
            ))}
          </div>
        </section>

        {/* AI Solutions demo */}
        <section className="border-t bg-muted/20">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 px-4 py-24 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              AI Solutions
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Built-in AI, not bolted on
            </h2>
            <p className="max-w-lg text-muted-foreground">
              A taste of the kind of voice and conversational interfaces we build into products —
              click the mic to try it.
            </p>
            <div className="mt-4 w-full max-w-md rounded-2xl border bg-card p-4 shadow-sm">
              <AIVoiceInput demoMode />
            </div>
          </div>
        </section>

        {/* Supporting / Technical Services */}
        <section className="border-t bg-muted/20">
          <div className="mx-auto w-full max-w-5xl px-4 py-24">
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Supporting &amp; Technical Services
              </h2>
              <p className="max-w-lg text-muted-foreground">
                The infrastructure and upkeep that keep a product running after launch.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
              {supportingServices.map(({ step, title, description, icon: Icon }) => (
                <div key={step} className="flex flex-col gap-3 bg-card p-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-muted-foreground">{step}</span>
                    <Icon className="size-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Device showcase */}
        <section className="mx-auto w-full max-w-5xl px-4 pb-24">
          <div className="mb-16 flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Built for every screen
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Scroll to see how a mobile app and a SaaS dashboard come together, screen by
              screen.
            </p>
          </div>
          <DeviceShowcase />
        </section>

        {/* Technologies */}
        <section className="border-t bg-muted/20 py-24">
          <div className="mx-auto mb-12 flex w-full max-w-5xl flex-col items-center gap-3 px-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Technologies we use
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Proven, production-grade tools — not whatever&apos;s trending this week.
            </p>
          </div>
          <Marquee durationSeconds={28}>
            {techStack.map(({ name, icon: Icon, color }) => (
              <div
                key={name}
                className="flex shrink-0 items-center gap-3 rounded-full border bg-card px-6 py-3 shadow-sm"
              >
                <Icon className="size-6" style={{ color }} aria-hidden="true" />
                <span className="text-sm font-medium whitespace-nowrap text-foreground">
                  {name}
                </span>
              </div>
            ))}
          </Marquee>
        </section>

        {/* CTA */}
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
          <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground">
            Not sure which service you need?
          </h2>
          <p className="max-w-md text-muted-foreground">
            Tell us about your project and we&apos;ll recommend the right scope — no
            obligation.
          </p>
          <AntiMetalButton href="/contact" label="Book a demo" />
        </section>
      </main>
    </div>
  );
}
