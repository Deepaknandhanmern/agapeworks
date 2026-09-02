import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { About3 } from "@/components/ui/about-3";
import Testimonial1 from "@/components/ui/testimonial-1";
import { DosAndDonts } from "@/components/sections/dos-and-donts";
import { DotPattern } from "@/components/ui/dot-pattern";
import {
  Globe2,
  MessageCircle,
  Repeat,
  ShieldCheck,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About — Agape Works",
  description:
    "Agape Works is a remote-first product engineering team built on one standard: selfless, deliberate care for the product and the people building it.",
};

const values = [
  {
    icon: Users,
    title: "Senior engineers only",
    description:
      "No bait-and-switch juniors. The people who scope your project are the people who build it.",
  },
  {
    icon: MessageCircle,
    title: "Direct access, no account layer",
    description:
      "You talk to the engineers and designers on your project — not a go-between relaying messages.",
  },
  {
    icon: Repeat,
    title: "Weekly, working demos",
    description:
      "Every engagement runs on a visible cadence. You see real progress every week, not a status report.",
  },
  {
    icon: ShieldCheck,
    title: "Documentation, built in",
    description:
      "Your team can pick up the code the day we leave. Nothing lives only in our heads.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-16 pt-8 text-center sm:pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            About Us
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Work, done with agape.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            Agape means selfless, deliberate care — for the product, and for the people we build
            it with. That&apos;s not a tagline here. It&apos;s the standard every engagement is
            held to.
          </p>
        </section>

        {/* How we work */}
        <section className="border-t">
          <Testimonial1 />
        </section>

        {/* Mission */}
        <section className="mx-auto w-full max-w-3xl px-4 pb-24 text-center">
          <p className="text-lg leading-8 text-muted-foreground">
            Most software studios optimize for one of two things: speed, or polish. We built Agape
            Works around a different bet — that a small team of senior engineers, working
            directly with a client and shipping visibly every week, produces better outcomes than
            either extreme. Fixed scope. Real access. Code your own team can maintain long after
            we&apos;re gone.
          </p>
        </section>

        {/* Values */}
        <section className="border-t bg-muted/20">
          <div className="mx-auto w-full max-w-5xl px-4 py-24">
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                What that looks like in practice
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Four commitments we hold on every engagement, regardless of size.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex flex-col gap-3 rounded-xl border bg-card p-6 shadow-sm"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent">
                    <Icon className="size-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section className="border-t">
          <DosAndDonts />
        </section>

        {/* Where we work */}
        <section className="mx-auto w-full max-w-3xl px-4 py-24 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-accent">
              <Globe2 className="size-6 text-foreground" />
            </div>
          </div>
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-foreground">
            Remote-first, by design
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            We&apos;re a distributed team working with founders and product teams across
            continents and time zones. Remote-first isn&apos;t a compromise for us — it&apos;s
            how we&apos;ve chosen to hire the right person for each engagement, wherever they are.
          </p>
        </section>

        {/* Team, process, and honest stats */}
        <section className="border-t">
          <About3
            title="The team behind the work"
            description="A small, senior, remote-first team — the people who scope your project are the same people who build it, every time."
            mainImage={{
              src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
              alt: "Engineers collaborating on a laptop",
            }}
            secondaryImage={{
              src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
              alt: "Remote engineer working from a laptop",
            }}
            breakout={{
              src: "/logo-black.png",
              alt: "Agape Works",
              title: "Fixed scope. Real access. Weekly demos.",
              description:
                "Every engagement runs on the same standard — no matter the size of the project.",
              buttonText: "See our process",
              buttonUrl: "/services",
            }}
            companies={[]}
            achievementsTitle="What we actually commit to"
            achievementsDescription="No inflated numbers — just the standard every engagement is held to, the same one listed above."
            achievements={[
              { label: "Weeks to first ship", value: "2–4" },
              { label: "Reply time, every message", value: "1 day" },
              { label: "Bait-and-switch juniors", value: "0" },
              { label: "Senior engineer on your call", value: "1+" },
            ]}
          />
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-t bg-muted/20">
          <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground">
              Want to see how we&apos;d approach your project?
            </h2>
            <p className="max-w-md text-muted-foreground">
              Tell us what you&apos;re building — we&apos;ll tell you what it takes to get it
              shipped.
            </p>
            <AntiMetalButton href="/contact" label="Get in touch" />
          </div>
        </section>
      </main>
    </div>
  );
}
