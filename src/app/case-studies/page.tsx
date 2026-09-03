import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { getAllCaseStudies } from "@/lib/content";
import { ArrowRight } from "lucide-react";

const CASE_STUDIES_TITLE = "Case Studies - Agape Works";
const CASE_STUDIES_DESCRIPTION = "How Agape Works has approached real client projects, end to end.";

export const metadata: Metadata = {
  title: CASE_STUDIES_TITLE,
  description: CASE_STUDIES_DESCRIPTION,
  alternates: { canonical: "/case-studies" },
  openGraph: { title: CASE_STUDIES_TITLE, description: CASE_STUDIES_DESCRIPTION, url: "/case-studies" },
  twitter: { title: CASE_STUDIES_TITLE, description: CASE_STUDIES_DESCRIPTION },
};

export default function CaseStudiesIndexPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-16 pt-8 text-center sm:pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Case Studies
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            How we&apos;ve approached real projects.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            The brief, the approach, and what shipped - for clients we&apos;ve built with,
            end to end.
          </p>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-24">
          <div className="grid gap-6 sm:grid-cols-2">
            {caseStudies.map((cs) => (
              <a
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group flex flex-col gap-3 rounded-xl border bg-card p-6 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <div className="flex flex-wrap gap-2">
                  {cs.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold text-foreground group-hover:underline">
                  {cs.title}
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">{cs.summary}</p>
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                  Read case study
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
