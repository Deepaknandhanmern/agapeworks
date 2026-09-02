import { ArrowRight } from "lucide-react";

// Every project gets identical treatment in the grid below (same card, same
// click-to-preview) — this intro deliberately doesn't single any one of them
// out as "featured."
export function PortfolioHero() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 text-center sm:pt-10">
      <div className="flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          Our Work
        </div>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Live projects, not mockups.
        </h1>
        <p className="max-w-md text-balance text-lg leading-7 text-muted-foreground">
          Every site below is real, shipped, and running in production. Click any of them to
          preview it right here.
        </p>
        <a
          href="#all-work"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Browse all work
          <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
