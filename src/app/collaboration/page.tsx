import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import {
  Building2,
  Handshake,
  MessageCircle,
  Repeat,
  ShieldCheck,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Collaboration — Agape Works",
  description:
    "How Agape Works collaborates with clients and partners — direct access, weekly demos, and a handful of ways to work together.",
};

const principles = [
  {
    icon: MessageCircle,
    title: "Direct access, no account layer",
    description:
      "You talk to the engineers and designers building your product — not a go-between relaying messages.",
  },
  {
    icon: Repeat,
    title: "Weekly, working demos",
    description:
      "Every engagement runs on a visible cadence. You see real progress every week, not a status report.",
  },
  {
    icon: ShieldCheck,
    title: "Documentation and handoff, built in",
    description:
      "Your team can pick up the code the day we leave. Nothing lives only in our heads.",
  },
];

const partnerTypes = [
  {
    icon: Users,
    title: "Founders & product teams",
    description:
      "Direct engagements — you bring the vision and the users, we bring the team to build and ship it.",
  },
  {
    icon: Building2,
    title: "Agencies (white-label)",
    description:
      "Need overflow engineering capacity without growing headcount? We work behind your brand, reporting to you — your client only ever sees you.",
  },
  {
    icon: Handshake,
    title: "Referral partners",
    description:
      "Consultants and advisors who send us clients get a fair, transparent referral arrangement — ask us for the details.",
  },
];

export default function CollaborationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-16 pt-20 text-center sm:pt-28">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Collaboration
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Partnership isn&apos;t a checkbox — it&apos;s how we work.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            Agape means selfless, deliberate care — for the product, and for the people we build
            it with. Here&apos;s what that looks like day to day.
          </p>
        </section>

        {/* Principles */}
        <section className="mx-auto w-full max-w-5xl px-4 pb-24">
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              How we work together
            </h2>
            <p className="max-w-lg text-muted-foreground">
              The same three commitments, on every engagement, regardless of size.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {principles.map(({ icon: Icon, title, description }) => (
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
        </section>

        {/* Partner types */}
        <section className="border-t bg-muted/20">
          <div className="mx-auto w-full max-w-5xl px-4 py-24">
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Ways to collaborate
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Most of our work is direct client engagements — but there are a few other ways in.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {partnerTypes.map(({ icon: Icon, title, description }) => (
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

        {/* CTA */}
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
          <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground">
            Interested in partnering with us?
          </h2>
          <p className="max-w-md text-muted-foreground">
            Tell us which of these fits — client, agency, or referral partner — and we&apos;ll
            take it from there.
          </p>
          <AntiMetalButton href="/contact" label="Get in touch" />
        </section>
      </main>
    </div>
  );
}
