import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { AnimatedFeatureCard } from "@/components/ui/feature-card-1";
import { Marquee } from "@/components/ui/marquee";
import { mainServices, supportingServices } from "@/lib/services-data";
import { DotPattern } from "@/components/ui/dot-pattern";
import { techStack } from "@/lib/tech-stack-data";

const cardColors = ["orange", "purple", "blue"] as const;

const SERVICES_TITLE = "Services - Agape Works";
const SERVICES_DESCRIPTION =
  "Web, mobile, SaaS, and e-commerce development, AI solutions, custom software, SEO & AEO, and digital marketing - built on Next.js, React, React Native, Flutter, Laravel, PHP, WordPress, WooCommerce, and MySQL.";

export const metadata: Metadata = {
  title: SERVICES_TITLE,
  description: SERVICES_DESCRIPTION,
  openGraph: { title: SERVICES_TITLE, description: SERVICES_DESCRIPTION, url: "/services" },
  twitter: { title: SERVICES_TITLE, description: SERVICES_DESCRIPTION },
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-16 pt-8 text-center sm:pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Our Services
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Everything it takes to plan, build, and grow your product.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            From first line of code to first page of search - Agape Works covers the full
            stack, in-house.
          </p>
        </section>

        {/* How We Help */}
        <section className="mx-auto w-full max-w-5xl px-4 pb-24">
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              How We Help
            </h2>
            <p className="max-w-lg text-muted-foreground">
              The core disciplines behind every product we build - including AI.
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

        {/* Technologies */}
        <section className="border-t bg-muted/20 py-24">
          <div className="mx-auto mb-12 flex w-full max-w-5xl flex-col items-center gap-3 px-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Technologies we use
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Proven, production-grade tools - not whatever&apos;s trending this week.
            </p>
          </div>
          <Marquee speed={28} pauseOnHover className="mt-0 sm:mt-0">
            {techStack.map(({ name, icon: Icon, color }) => (
              <div key={name} className="flex shrink-0 items-center gap-3 px-8">
                <Icon className="size-7" style={{ color }} aria-hidden="true" />
                <span className="text-base font-medium whitespace-nowrap text-foreground">
                  {name}
                </span>
              </div>
            ))}
          </Marquee>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground">
              Not sure which service you need?
            </h2>
            <p className="max-w-md text-muted-foreground">
              Tell us about your project and we&apos;ll recommend the right scope - no
              obligation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <AntiMetalButton href="/scope" label="Get an instant estimate" className="w-56" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
