import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { ScopeForm } from "@/components/sections/scope-form";
import { Clock, ShieldCheck, Users } from "lucide-react";

const SCOPE_TITLE = "Instant Project Estimate - Agape Works";
const SCOPE_DESCRIPTION =
  "Tell us what you're building and get a rough timeline, budget range, and build phases in seconds - powered by the same AI capability Agape Works builds for clients.";

export const metadata: Metadata = {
  title: SCOPE_TITLE,
  description: SCOPE_DESCRIPTION,
  alternates: { canonical: "/scope" },
  openGraph: { title: SCOPE_TITLE, description: SCOPE_DESCRIPTION, url: "/scope" },
  twitter: { title: SCOPE_TITLE, description: SCOPE_DESCRIPTION },
};

const points = [
  {
    icon: Clock,
    label: "Instant",
    value: "A rough scope in seconds, not a week of back-and-forth",
  },
  {
    icon: ShieldCheck,
    label: "Honest",
    value: "Conservative, realistic ranges - not an inflated best case",
  },
  {
    icon: Users,
    label: "No commitment",
    value: "No email required - this doesn't create a lead or a quote",
  },
];

export default function ScopePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-12 pt-8 text-center sm:pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            AI project scoping
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Get a rough scope before you talk to us.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            Describe your project and get an instant, honest read on timeline, budget, and how
            we&apos;d phase the build - the same AI capability we build for clients, demoed on
            our own site.
          </p>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <div className="flex flex-col gap-6">
              {points.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                    <Icon className="size-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <ScopeForm />
          </div>
        </section>
      </main>
    </div>
  );
}
