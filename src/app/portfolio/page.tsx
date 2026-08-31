import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { PortfolioHero } from "@/components/sections/portfolio-hero";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { PortfolioSpotlight } from "@/components/sections/portfolio-spotlight";
import { DeviceShowcase } from "@/components/sections/device-showcase";
import { getProjects } from "@/lib/portfolio-data";
import { getAllCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio — Agape Works",
  description: "Live projects built and shipped by Agape Works — click a project to preview it right on this page.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();
  const featured = projects.find((p) => p.url) ?? null;

  const spotlightProject = projects.find((p) => p.name === "UCX Group" && p.screenshot);
  const spotlightCaseStudy = getAllCaseStudies().find((cs) => cs.slug === "ucx-group");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <PortfolioHero featured={featured} />

        <section id="all-work" className="mx-auto w-full max-w-5xl px-4 pb-24 pt-8">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              All projects
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Click any project to preview the live site right here on this page.
            </p>
          </div>
          <PortfolioGrid projects={projects} />
        </section>

        {spotlightProject?.screenshot && spotlightCaseStudy && (
          <PortfolioSpotlight
            clientName={spotlightProject.name}
            headline="One project, up close"
            summary={spotlightCaseStudy.summary}
            services={spotlightCaseStudy.services}
            screenshot={spotlightProject.screenshot}
            caseStudySlug={spotlightCaseStudy.slug}
          />
        )}

        <section className="mx-auto w-full max-w-5xl px-4 py-24">
          <div className="mb-16 flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Built for every screen
            </h2>
            <p className="max-w-lg text-muted-foreground">
              A mobile app and a SaaS dashboard, screen by screen — the same craft behind every
              project above.
            </p>
          </div>
          <DeviceShowcase />
        </section>
      </main>
    </div>
  );
}
