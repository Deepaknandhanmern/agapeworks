import type { Metadata } from "next";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { ColorfulBentoGrid } from "@/components/ui/colorful-bento-grid";
import { Integrations } from "@/components/ui/integrations-4-2";
import HowItWorks from "@/components/ui/how-it-works";
import { DotPattern } from "@/components/ui/dot-pattern";
import { WorldMap } from "@/components/ui/map";
import { AgapeHero } from "@/components/sections/agape-hero";
import { SiteBanner } from "@/components/sections/site-banner";
import Testimonial1 from "@/components/ui/testimonial-1";
import { FAQ } from "@/components/ui/faq-section";
import { ProductsTeaser } from "@/components/sections/products-teaser";
import { Reveal } from "@/components/ui/reveal";
import { ShieldCheck } from "lucide-react";

const HOME_TITLE = "Agape Works - Software Development Company in Coimbatore & Chennai";
const HOME_DESCRIPTION =
  "Agape Works builds web, mobile, SaaS, and AI-powered software for businesses in Coimbatore, Chennai, and beyond - fixed scope, senior engineers only, weekly working demos.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
  },
  twitter: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

const process = [
  {
    title: "Discover",
    description: "We learn your business, users, and constraints before writing a line of code.",
    colorTheme: "orange",
  },
  {
    title: "Design",
    description: "Clear scope, clear architecture, clear timeline - agreed before we start building.",
    colorTheme: "blue",
  },
  {
    title: "Build",
    description: "Weekly ships, tight feedback loops, no black-box silence between updates.",
    colorTheme: "purple",
  },
  {
    title: "Grow",
    description: "We stay on to measure impact and iterate - not disappear after launch.",
    colorTheme: "orange",
  },
] as const;

export default function Home() {
  return (
    <div className="home-theme flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <SiteBanner />
        <AgapeHero />

        {/* About us */}
        <Reveal>
          <section className="border-b">
            <Testimonial1 />
          </section>
        </Reveal>

        {/* Services */}
        <Reveal>
          <ColorfulBentoGrid />
        </Reveal>

        {/* Integrations */}
        <Reveal>
          <section className="border-t">
            <Integrations />
          </section>
        </Reveal>

        {/* Process */}
        <Reveal>
          <section className="relative overflow-hidden border-t bg-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.16),transparent_70%)] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[560px] -translate-x-[15%] -translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.14),transparent_70%)] blur-3xl"
            />
            <div className="relative mx-auto w-full max-w-5xl px-4 pt-24">
              <div className="mb-4 flex flex-col items-center gap-3 text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                  How we work
                </h2>
                <p className="max-w-lg text-muted-foreground">
                  A simple, transparent process from first conversation to shipped product.
                </p>
              </div>
            </div>
            <div className="relative">
              <HowItWorks features={[...process]} />
            </div>
          </section>
        </Reveal>

        {/* Why us */}
        <Reveal>
          <section className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 h-[380px] w-[380px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.16),transparent_70%)] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/4 h-[300px] w-[300px] -translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.14),transparent_70%)] blur-3xl"
            />
            <div className="relative mx-auto w-full max-w-3xl px-4 py-24">
              <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                  Care isn&apos;t a slogan here - it&apos;s the process.
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Agape means selfless, deliberate care - and that&apos;s the standard we hold our
                  engagements to. Fixed scope, weekly demos, and code your own team can maintain
                  long after we&apos;re gone.
                </p>
                <ul className="flex flex-col gap-3 pt-2">
                  {[
                    "Senior engineers only - no bait-and-switch juniors",
                    "Fixed-scope engagements with weekly, working demos",
                    "Documentation and handoff built in, not bolted on",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Products */}
        <Reveal>
          <ProductsTeaser />
        </Reveal>

        {/* Global reach */}
        <Reveal>
          <section className="border-t">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 py-24">
              <div className="flex flex-col items-center gap-3 text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                  Wherever your team is, we&apos;re already there
                </h2>
                <p className="max-w-lg text-muted-foreground">
                  Headquartered in India, with teams delivering across the US, Europe, Australia,
                  and the GCC.
                </p>
              </div>
              <WorldMap
                lineColor="#fcd34d"
                dots={[
                  {
                    start: { lat: 28.6139, lng: 77.209, label: "India", hq: true },
                    end: { lat: 40.7128, lng: -74.006, label: "New York" },
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209, label: "India", hq: true },
                    end: { lat: 51.5074, lng: -0.1278, label: "London" },
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209, label: "India", hq: true },
                    end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209, label: "India", hq: true },
                    end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
                  },
                ]}
              />
            </div>
          </section>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <section className="border-t">
            <FAQ />
          </section>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <section className="relative overflow-hidden border-t bg-muted/20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-[65%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.2),transparent_70%)] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-[35%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.2),transparent_70%)] blur-3xl"
            />
            <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
            <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
              <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground">
                Ready to build something worth shipping?
              </h2>
              <p className="max-w-md text-muted-foreground">
                Tell us where your product is today - we&apos;ll tell you what it takes to get it
                where it needs to be.
              </p>
              <AntiMetalButton href="/contact" label="Book a demo" />
            </div>
          </section>
        </Reveal>
      </main>
    </div>
  );
}
