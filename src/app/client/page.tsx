import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/ui/header-3";
import { requireClientEmail } from "@/lib/client-portal/auth";
import { getClientProjectsByEmail } from "@/lib/data/client-portal";
import { LogoutButton } from "./logout-button";

export const metadata: Metadata = {
  title: "My Projects — Agape Works",
};

const phaseStyles: Record<string, string> = {
  Discovery: "bg-muted text-muted-foreground",
  Build: "bg-accent text-foreground",
  QA: "bg-amber-500/10 text-amber-600",
  Launched: "bg-[#0ca30c]/10 text-[#006300]",
};

function hasUnreadActivity(project: {
  clientLastViewedAt: Date | null;
  updates: { createdAt: Date }[];
  files: { createdAt: Date }[];
}): boolean {
  const latest = [...project.updates, ...project.files]
    .map((item) => item.createdAt.getTime())
    .sort((a, b) => b - a)[0];
  if (latest === undefined) return false;
  if (!project.clientLastViewedAt) return true;
  return latest > project.clientLastViewedAt.getTime();
}

export default async function ClientPortalPage() {
  const email = await requireClientEmail();
  const projects = await getClientProjectsByEmail(email);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-3xl px-4 py-12">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">My Projects</h1>
              <p className="text-sm text-muted-foreground">Signed in as {email}</p>
            </div>
            <LogoutButton />
          </div>

          {projects.length === 0 ? (
            <p className="rounded-xl border border-dashed bg-card/50 p-8 text-center text-sm text-muted-foreground">
              No projects found for this email yet.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/client/${project.id}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border bg-card p-5 transition-shadow hover:shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      {hasUnreadActivity(project) && (
                        <span
                          className="size-2 shrink-0 rounded-full bg-primary"
                          aria-label="New activity"
                          title="New activity"
                        />
                      )}
                      <div>
                        <p className="font-medium text-foreground">{project.projectName}</p>
                        <p className="text-sm text-muted-foreground">{project.clientName}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${phaseStyles[project.phase] ?? phaseStyles.Discovery}`}
                      >
                        {project.phase}
                      </span>
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
