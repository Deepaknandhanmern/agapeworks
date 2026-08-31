import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";

/**
 * A live, embedded preview — not the pointer-events-none thumbnail used in
 * the grid below. This one is meant to actually be scrolled/clicked, so the
 * hero reads as "experience our work" rather than "here's a screenshot."
 */
function LiveWindow({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-lg">
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-destructive/40" />
          <span className="size-2.5 rounded-full bg-amber-500/40" />
          <span className="size-2.5 rounded-full bg-[#0ca30c]/40" />
        </div>
        <div className="ml-2 flex-1 truncate rounded-md bg-background px-3 py-1 text-center text-xs text-muted-foreground">
          {project.url?.replace(/^https?:\/\//, "")}
        </div>
      </div>
      <div className="relative h-[420px] w-full bg-muted sm:h-[480px]">
        {project.screenshot ? (
          // eslint-disable-next-line @next/next/no-img-element -- static local asset, not worth next/image for a single file
          <img
            src={project.screenshot}
            alt={`${project.name} website preview`}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          project.url && (
            <iframe src={project.url} title={project.name} className="h-full w-full" />
          )
        )}
      </div>
    </div>
  );
}

export function PortfolioHero({ featured }: { featured: Project | null }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:pt-10">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Our Work
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Live projects, not mockups.
          </h1>
          <p className="max-w-md text-balance text-lg leading-7 text-muted-foreground">
            Every site below is real, shipped, and running in production. Scroll the preview,
            click around — this is what we build.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#all-work"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Browse all work
              <ArrowRight className="size-4" />
            </Link>
            {featured?.url && (
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
              >
                Open {featured.name} live
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>
        </div>

        {featured?.url ? (
          <LiveWindow project={featured} />
        ) : (
          <div className="flex h-[420px] items-center justify-center rounded-2xl border border-dashed bg-muted/20 sm:h-[480px]">
            <p className="text-sm text-muted-foreground">A live preview will appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
}
