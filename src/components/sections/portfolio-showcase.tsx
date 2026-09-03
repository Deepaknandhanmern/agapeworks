import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/portfolio-data";

// Two-column layout adapted from a pasted "hero with product mockup"
// template - kept the browser-window framing device (that's just chrome,
// not content) but dropped the fake app UI entirely (a made-up "Vaib"
// dashboard with invented feature icons isn't Agape's product to show).
// What's inside the frame is a real, live project instead - same
// screenshot/iframe fallback pattern already used on /portfolio
// (src/components/sections/portfolio-grid.tsx's LivePreview).
export async function PortfolioShowcase() {
  const projects = await getProjects();
  const featured = projects.find((p) => p.url);
  if (!featured) return null;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-16 px-4 py-24 lg:flex-row lg:gap-20">
      <div className="max-w-lg space-y-6 text-center lg:text-left">
        <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
          Built to be seen, not just pitched.
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Every engagement ships as a working product, not a slide deck. Here&apos;s one of
          them, live.
        </p>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          See the full portfolio
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="relative mx-auto w-full max-w-md">
        <div className="absolute -left-4 -top-4 -z-10 h-full w-full rotate-6 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 shadow-xl" />
        <div className="absolute -left-8 -top-8 -z-20 h-full w-full rotate-12 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-600 shadow-xl" />

        <div className="relative overflow-hidden rounded-2xl border bg-background shadow-2xl">
          <div className="flex items-center gap-3 border-b bg-muted/50 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="size-2.5 rounded-full bg-red-500" />
              <div className="size-2.5 rounded-full bg-yellow-500" />
              <div className="size-2.5 rounded-full bg-green-500" />
            </div>
            <div className="min-w-0 flex-1 truncate rounded-full border bg-background px-3 py-1 text-center text-xs text-muted-foreground">
              {featured.url}
            </div>
          </div>

          <div className="relative w-full" style={{ paddingTop: "62.5%" }}>
            <div className="absolute inset-0 overflow-hidden bg-muted">
              {featured.screenshot ? (
                // eslint-disable-next-line @next/next/no-img-element -- static local asset, not worth next/image for a single file
                <img
                  src={featured.screenshot}
                  alt={`${featured.name} website preview`}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <iframe
                  src={featured.url!}
                  title={featured.name}
                  loading="lazy"
                  tabIndex={-1}
                  className="pointer-events-none absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
