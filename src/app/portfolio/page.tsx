import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { getProjects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Portfolio — Agape Works",
  description: "Live projects built and shipped by Agape Works — click a project to preview it right on this page.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-16 pt-8 text-center sm:pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Our Work
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Live projects, not mockups.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            Click any project below to preview the live site right here on this page.
          </p>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-24">
          <PortfolioGrid projects={projects} />
        </section>
      </main>
    </div>
  );
}
