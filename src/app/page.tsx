import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { ColorfulBentoGrid } from "@/components/ui/colorful-bento-grid";
import { Integrations } from "@/components/ui/integrations-4-2";
import HowItWorks from "@/components/ui/how-it-works";
import { DotPattern } from "@/components/ui/dot-pattern";
import { WorldMap } from "@/components/ui/map";
import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";
import { LinkPreview } from "@/components/ui/link-preview";
import { VideoHero } from "@/components/sections/video-hero";
import { Gauge, ShieldCheck } from "lucide-react";
import Link from "next/link";

const process = [
  {
    title: "Discover",
    description: "We learn your business, users, and constraints before writing a line of code.",
    colorTheme: "orange",
  },
  {
    title: "Design",
    description: "Clear scope, clear architecture, clear timeline — agreed before we start building.",
    colorTheme: "blue",
  },
  {
    title: "Build",
    description: "Weekly ships, tight feedback loops, no black-box silence between updates.",
    colorTheme: "purple",
  },
  {
    title: "Grow",
    description: "We stay on to measure impact and iterate — not disappear after launch.",
    colorTheme: "orange",
  },
] as const;

const testimonials = [
  {
    quote: "Big effort - high quality. Best Framer content out there.",
    author: "Jan Dittrich",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of Jan Dittrich",
  },
  {
    quote:
      "I'm building a new website and it's absolutely ridiculous how valuable your content has been.",
    author: "Michael Riddering",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of Michael Riddering",
  },
  {
    quote: "Way too much value for free to be honest.",
    author: "James Traf",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of James Traf",
  },
];

export default function Home() {
  return (
    <div className="home-theme flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <VideoHero />

        {/* About us */}
        <section className="border-b">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-start px-4 py-24">
            <p className="text-xl leading-9 text-muted-foreground md:text-2xl md:leading-10">
              We&apos;re Agape Works — a small, senior, remote-first team building web, mobile,
              and SaaS products for founders worldwide. We&apos;ve shipped real, live sites like{" "}
              <LinkPreview
                url="https://zenvyracleaning.in"
                className="font-semibold text-foreground"
              >
                Zenvyra Cleaning
              </LinkPreview>{" "}
              and{" "}
              <LinkPreview
                url="https://ucx-group.com"
                className="font-semibold text-foreground"
              >
                UCX Group
              </LinkPreview>{" "}
              — see for yourself, or{" "}
              <Link
                href="/about"
                prefetch={false}
                className="font-semibold text-foreground underline underline-offset-4"
              >
                read the full story
              </Link>
              .
            </p>
          </div>
        </section>

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

        {/* Services */}
        <ColorfulBentoGrid />

        {/* Integrations */}
        <section className="border-t">
          <Integrations />
        </section>

        {/* Process */}
        <section className="border-t bg-white">
          <div className="mx-auto w-full max-w-5xl px-4 pt-24">
            <div className="mb-4 flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                How we work
              </h2>
              <p className="max-w-lg text-muted-foreground">
                A simple, transparent process from first conversation to shipped product.
              </p>
            </div>
          </div>
          <HowItWorks features={[...process]} />
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
                Headquartered in India, with teams delivering across the US, Europe, Australia,
                and the GCC.
              </p>
            </div>
            <WorldMap
              lineColor="#d1f140"
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

        {/* Testimonials */}
        <section className="border-t">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 py-24">
            <div className="flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                What people are saying
              </h2>
            </div>
            <ScrollReelTestimonials testimonials={testimonials} />
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-t bg-muted/20">
          <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
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
