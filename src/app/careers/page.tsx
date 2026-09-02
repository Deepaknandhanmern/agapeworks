import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { DotPattern } from "@/components/ui/dot-pattern";
import {
  Users,
  MessageCircle,
  Repeat,
  Globe2,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers - Agape Works",
  description:
    "Agape Works hires senior engineers only - no bait-and-switch juniors. Remote-first, direct client access, weekly working demos.",
};

const lookingFor = [
  {
    icon: Users,
    title: "Genuinely senior",
    description:
      "You've shipped production software end to end, more than once, without someone senior reviewing every decision.",
  },
  {
    icon: MessageCircle,
    title: "Comfortable talking to clients directly",
    description:
      "There's no account-manager layer here - engineers scope and discuss work with clients themselves.",
  },
  {
    icon: Repeat,
    title: "Fine shipping every week",
    description:
      "Every engagement runs on a visible weekly cadence. If you'd rather work quietly for months, this isn't the fit.",
  },
  {
    icon: Globe2,
    title: "Remote-first discipline",
    description:
      "We're a distributed team across time zones. You'll need to communicate well async, not just show up to calls.",
  },
];

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 pb-16 pt-8 text-center sm:pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Careers
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Senior engineers only. No exceptions.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            Agape Works is a small, remote-first team - the people who scope a project are the
            same people who build it. That only works if everyone on the team is genuinely
            senior.
          </p>
        </section>

        <section className="border-t bg-muted/20">
          <div className="mx-auto w-full max-w-5xl px-4 py-24">
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                What we look for
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Four things that matter more to us than years of experience or a specific stack.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {lookingFor.map(({ icon: Icon, title, description }) => (
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

        <section className="mx-auto w-full max-w-3xl px-4 py-24 text-center">
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-foreground">
            No open-role list - and that's on purpose
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            We're small enough that we hire when the right person turns up, not on a fixed
            headcount plan. If the description above sounds like you, send a short note - what you've built, and a link to your code or past work - rather than a formal
            application. We read every message ourselves.
          </p>
        </section>

        <section className="relative overflow-hidden border-t bg-muted/20">
          <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground">
              Think you're a fit?
            </h2>
            <p className="max-w-md text-muted-foreground">
              Email us directly - no forms, no ATS.
            </p>
            <a
              href="mailto:studio@agapeworks.in?subject=Interested in working at Agape Works"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Mail className="size-4" />
              studio@agapeworks.in
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
