import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PortfolioSpotlight({
  clientName,
  headline,
  summary,
  services,
  screenshot,
  caseStudySlug,
}: {
  clientName: string;
  headline: string;
  summary: string;
  services: string[];
  screenshot: string;
  caseStudySlug: string;
}) {
  return (
    <section className="border-t bg-muted/20">
      <div className="mx-auto w-full max-w-5xl px-4 py-24">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            Featured Client
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">{headline}</h2>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border bg-card shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element -- static local asset, not worth next/image for a single file */}
            <img
              src={screenshot}
              alt={`${clientName} website preview`}
              className="w-full object-cover object-top"
            />
          </div>

          <div className="flex flex-col items-start gap-4 text-left">
            <h3 className="text-2xl font-semibold text-foreground">{clientName}</h3>
            <p className="leading-7 text-muted-foreground">{summary}</p>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {service}
                </span>
              ))}
            </div>
            <Link
              href={`/case-studies/${caseStudySlug}`}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
            >
              Read the full case study
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
