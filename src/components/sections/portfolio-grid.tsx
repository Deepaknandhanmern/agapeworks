"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Globe } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";

function LivePreview({
  url,
  screenshot,
  title,
}: {
  url: string;
  screenshot?: string | null;
  title: string;
}) {
  return (
    <div className="relative w-full" style={{ paddingTop: "62.5%" }}>
      <div className="absolute inset-0 overflow-hidden bg-muted transition-transform duration-500 group-hover:scale-110">
        {screenshot ? (
          // eslint-disable-next-line @next/next/no-img-element -- static local asset, not worth next/image for a single file
          <img src={screenshot} alt={`${title} website preview`} className="h-full w-full object-cover object-top" />
        ) : (
          <iframe
            src={url}
            title={title}
            loading="lazy"
            tabIndex={-1}
            className="pointer-events-none absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25]"
          />
        )}
      </div>
    </div>
  );
}

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = React.useState<Project | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) =>
          project.url ? (
            <button
              key={project.id}
              type="button"
              onClick={() => setActive(project)}
              className="group flex flex-col overflow-hidden rounded-xl border bg-card text-left shadow-sm transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <LivePreview url={project.url} screenshot={project.screenshot} title={project.name} />
              <div className="flex flex-1 flex-col gap-1 p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-foreground">{project.name}</h3>
                  <ExternalLink className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
            </button>
          ) : (
            <div
              key={project.id}
              aria-disabled="true"
              className="flex flex-col overflow-hidden rounded-xl border border-dashed bg-muted/20 text-left"
            >
              <div className="relative w-full" style={{ paddingTop: "62.5%" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="size-10 text-muted-foreground/40" />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1 p-5">
                <h3 className="font-semibold text-muted-foreground">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
            </div>
          )
        )}
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="w-full max-w-[95vw] gap-3 p-4 sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>{active?.name}</DialogTitle>
            <DialogDescription>
              {active?.description}
              {active?.url && (
                <>
                  {" "}
                  <a href={active.url} target="_blank" rel="noopener noreferrer">
                    Open in a new tab
                  </a>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="h-[75vh] w-full overflow-hidden rounded-lg border bg-muted">
            {active?.screenshot ? (
              // eslint-disable-next-line @next/next/no-img-element -- static local asset, not worth next/image for a single file
              <img
                src={active.screenshot}
                alt={`${active.name} website preview`}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              active?.url && (
                <iframe src={active.url} title={active.name} className="h-full w-full" />
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
