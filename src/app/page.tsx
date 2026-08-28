import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { VerticalTabs } from "@/components/ui/vertical-tabs";
import { ArcGalleryHero } from "@/components/ui/arc-gallery-hero-component";
import { Integrations } from "@/components/ui/integrations-4-2";
import { FlowSection } from "@/components/ui/story-scroll";
import { WorldMap } from "@/components/ui/map";
import { VideoHero } from "@/components/sections/video-hero";
import { ArrowRight, Gauge, ShieldCheck } from "lucide-react";

const teamImages = [
  "https://images.unsplash.com/photo-1755004609214-c252674df1ca?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1750218537952-0ae056c7f53a?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1755038995605-038a7345658f?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546238232-20216dec9f72?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1753724223372-9a1df8eb5212?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1754079132860-5b37dab49daa?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1754079132962-2f6c62f14d33?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1754764987594-2236e7736115?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1755048796967-75a82d214846?q=80&w=400&auto=format&fit=crop",
];

const process = [
  {
    step: "01",
    title: "Discover",
    description: "We learn your business, users, and constraints before writing a line of code.",
  },
  {
    step: "02",
    title: "Design",
    description: "Clear scope, clear architecture, clear timeline — agreed before we start building.",
  },
  {
    step: "03",
    title: "Build",
    description: "Weekly ships, tight feedback loops, no black-box silence between updates.",
  },
  {
    step: "04",
    title: "Grow",
    description: "We stay on to measure impact and iterate — not disappear after launch.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <VideoHero />

        {/* Trust strip */}
        <section className="border-y bg-muted/20">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Trusted by teams shipping real products
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-muted-foreground/70">
              <span>Northwind</span>
              <span>Solace</span>
              <span>Fernbank</span>
              <span>Loom &amp; Co.</span>
              <span>Vantage</span>
            </div>
          </div>
        </section>

        <ArcGalleryHero images={teamImages} />

        {/* About Us */}
        <FlowSection aria-label="Who we are" style={{ backgroundColor: "#000", color: "#fff" }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">01 — Who we are</p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div>
            <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold uppercase leading-[0.85] tracking-tight">
              Agape
              <br />
              Means
              <br />
              Care
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
            Agape means selfless, deliberate care — the standard we hold every engagement to.
            Direct access to the people building your product, weekly working demos, and
            documentation your team can actually pick up when we&apos;re done.
          </p>
          <a
            href="/about"
            className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium underline underline-offset-4 hover:opacity-80"
          >
            More about us
            <ArrowRight className="size-4" />
          </a>
        </FlowSection>

        {/* Services */}
        <section id="services">
          <VerticalTabs />
          <div className="mx-auto -mt-8 flex w-full max-w-5xl justify-center px-4 pb-12">
            <a
              href="/services"
              className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              View all services
              <ArrowRight className="size-4" />
            </a>
          </div>
        </section>

        {/* Integrations */}
        <section className="border-t">
          <Integrations />
        </section>

        {/* Process */}
        <section className="border-t bg-muted/20">
          <div className="mx-auto w-full max-w-5xl px-4 py-24">
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                How we work
              </h2>
              <p className="max-w-lg text-muted-foreground">
                A simple, transparent process from first conversation to shipped product.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {process.map(({ step, title, description }) => (
                <div key={step} className="flex flex-col gap-2">
                  <span className="text-sm font-mono text-muted-foreground">{step}</span>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="mx-auto w-full max-w-5xl px-4 py-24">
          <div className="grid items-center gap-10 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Care isn&apos;t a slogan here — it&apos;s the process.
              </h2>
              <p className="leading-7 text-muted-foreground">
                Agape means selfless, deliberate care — and that&apos;s the standard we hold our
                engagements to. Fixed scope, weekly demos, and code your own team can maintain
                long after we&apos;re gone.
              </p>
              <ul className="flex flex-col gap-3 pt-2">
                {[
                  "Senior engineers only — no bait-and-switch juniors",
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
            <div className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Gauge className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Typical engagement
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border p-4">
                  <p className="text-2xl font-semibold text-foreground">2–4</p>
                  <p className="text-muted-foreground">weeks to first ship</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-2xl font-semibold text-foreground">100%</p>
                  <p className="text-muted-foreground">code ownership, yours</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global reach */}
        <section className="border-t">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 py-24">
            <div className="flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Wherever your team is, we&apos;re already there
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Remote-first by design — we&apos;ve shipped projects for clients across five
                continents.
              </p>
            </div>
            <WorldMap
              lineColor="#0ea5e9"
              dots={[
                {
                  start: { lat: 64.2008, lng: -149.4937, label: "Fairbanks" },
                  end: { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
                },
                {
                  start: { lat: 64.2008, lng: -149.4937, label: "Fairbanks" },
                  end: { lat: -15.7975, lng: -47.8919, label: "Brasília" },
                },
                {
                  start: { lat: -15.7975, lng: -47.8919, label: "Brasília" },
                  end: { lat: 38.7223, lng: -9.1393, label: "Lisbon" },
                },
                {
                  start: { lat: 51.5074, lng: -0.1278, label: "London" },
                  end: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                },
                {
                  start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                  end: { lat: 43.1332, lng: 131.9113, label: "Vladivostok" },
                },
                {
                  start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                  end: { lat: -1.2921, lng: 36.8219, label: "Nairobi" },
                },
              ]}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-muted/20">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground">
              Ready to build something worth shipping?
            </h2>
            <p className="max-w-md text-muted-foreground">
              Tell us where your product is today — we&apos;ll tell you what it takes to get it
              where it needs to be.
            </p>
            <AntiMetalButton href="/contact" label="Book a demo" />
          </div>
        </section>
      </main>
    </div>
  );
}
