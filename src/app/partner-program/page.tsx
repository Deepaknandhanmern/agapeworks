import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Building2,
  Handshake,
  ClipboardList,
  Users2,
  Wallet,
  ShieldCheck,
} from "lucide-react";

const PARTNER_PROGRAM_TITLE = "Partner Program - Agape Works";
const PARTNER_PROGRAM_DESCRIPTION =
  "Refer clients or resell under your own brand - how Agape Works' agency and referral partner program actually works.";

export const metadata: Metadata = {
  title: PARTNER_PROGRAM_TITLE,
  description: PARTNER_PROGRAM_DESCRIPTION,
  openGraph: { title: PARTNER_PROGRAM_TITLE, description: PARTNER_PROGRAM_DESCRIPTION, url: "/partner-program" },
  twitter: { title: PARTNER_PROGRAM_TITLE, description: PARTNER_PROGRAM_DESCRIPTION },
};

const tracks = [
  {
    icon: Building2,
    title: "Agency partners",
    tagline: "White-label",
    description:
      "You keep the client relationship and the brand - we're the engineering team behind the curtain.",
    points: [
      "We work under your brand; your client only ever sees you",
      "Reporting, standups, and demos happen with you, not your client",
      "Scales up or down with your pipeline - no headcount to carry between projects",
    ],
  },
  {
    icon: Handshake,
    title: "Referral partners",
    tagline: "Introduce & earn",
    description:
      "Consultants, advisors, and operators who run into founders needing a build team - and don't want to build one themselves.",
    points: [
      "Introduce a client, we run the engagement, you get a referral payout",
      "No obligation beyond the introduction - you don't manage delivery",
      "Transparent terms agreed upfront, in writing, before any work starts",
    ],
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Tell us which track fits",
    description:
      "Agency white-label or referral - reach out and we'll figure out the right fit together.",
  },
  {
    icon: Users2,
    title: "One short call",
    description:
      "We agree scope, reporting lines, and - for referrals - the exact payout terms, before anything is signed.",
  },
  {
    icon: ShieldCheck,
    title: "We deliver, you stay in the loop",
    description:
      "Weekly demos and direct access the whole way through, whether it's your brand on the work or ours.",
  },
  {
    icon: Wallet,
    title: "Get paid",
    description:
      "Referral payouts go out on the terms agreed in step two. No chasing, no surprises.",
  },
];

const faqs = [
  {
    question: "Is there a minimum number of referrals or a contract?",
    answer:
      "No. Send one client or ten - there's no minimum, no exclusivity requirement, and no long-term contract to sign.",
  },
  {
    question: "What's the referral payout?",
    answer:
      "It depends on the engagement size and scope, so we agree it case by case, in writing, before we start work with the client you introduced.",
  },
  {
    question: "Can an agency white-label the entire engagement, including client calls?",
    answer:
      "Yes - that's the default for this track. We can join calls under your name, use your reporting templates, and stay off any client-facing communication if you'd rather run it yourself.",
  },
  {
    question: "Do you compete with agencies for the same clients?",
    answer:
      "No - the agency track exists because we'd rather be your delivery team than a competitor. We don't approach your clients directly.",
  },
];

export default function PartnerProgramPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-16 pt-8 text-center sm:pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Partner Program
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Bring the client. We&apos;ll bring the team.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            Two ways to work with Agape Works without joining as a client yourself - refer a
            project our way, or resell our delivery under your own brand.
          </p>
        </section>

        {/* Tracks */}
        <section className="mx-auto w-full max-w-5xl px-4 pb-24">
          <div className="grid gap-6 sm:grid-cols-2">
            {tracks.map(({ icon: Icon, title, tagline, description, points }) => (
              <div key={title} className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent">
                    <Icon className="size-5 text-foreground" />
                  </div>
                  <Badge variant="secondary">{tagline}</Badge>
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">{title}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
                <ul className="flex flex-col gap-2 pt-2">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-foreground">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-t bg-muted/20">
          <div className="mx-auto w-full max-w-5xl px-4 py-24">
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                How the program works
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Four steps, whichever track you're on.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map(({ icon: Icon, title, description }, i) => (
                <div key={title} className="flex flex-col gap-3 rounded-xl border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
                    <Icon className="size-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-2xl px-4 py-24">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Partner program FAQ
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-t bg-muted/20">
          <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground">
              Have a client or a pipeline in mind?
            </h2>
            <p className="max-w-md text-muted-foreground">
              Tell us which track fits - agency or referral - and we&apos;ll take it from there.
            </p>
            <AntiMetalButton href="/contact" label="Apply to partner" />
          </div>
        </section>
      </main>
    </div>
  );
}
