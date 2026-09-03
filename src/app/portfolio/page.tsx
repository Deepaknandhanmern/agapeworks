import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { PortfolioHero } from "@/components/sections/portfolio-hero";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { getProjects } from "@/lib/portfolio-data";

const PORTFOLIO_TITLE = "Portfolio - Agape Works";
const PORTFOLIO_DESCRIPTION =
  "Live projects built and shipped by Agape Works - click a project to preview it right on this page.";

export const metadata: Metadata = {
  title: PORTFOLIO_TITLE,
  description: PORTFOLIO_DESCRIPTION,
  alternates: { canonical: "/portfolio" },
  openGraph: { title: PORTFOLIO_TITLE, description: PORTFOLIO_DESCRIPTION, url: "/portfolio" },
  twitter: { title: PORTFOLIO_TITLE, description: PORTFOLIO_DESCRIPTION },
};

export default async function PortfolioPage() {
  const [projects, landingPages] = await Promise.all([
    getProjects("project"),
    getProjects("landing_page"),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <PortfolioHero />

        <section id="all-work" className="mx-auto w-full max-w-5xl px-4 pb-24 pt-8">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Recent projects
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Click any project to preview the live site right here on this page.
            </p>
          </div>
          <PortfolioGrid projects={projects} />
        </section>

        {landingPages.length > 0 && (
          <section id="landing-pages" className="mx-auto w-full max-w-5xl px-4 pb-24">
            <div className="mb-10 flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Landing Page
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Click any page to preview it right here on this page.
              </p>
            </div>
            <PortfolioGrid projects={landingPages} />
          </section>
        )}
      </main>
    </div>
  );
}
