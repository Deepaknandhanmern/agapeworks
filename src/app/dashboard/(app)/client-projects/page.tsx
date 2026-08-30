import Link from "next/link";
import { getAllClientProjectsForDashboard } from "@/lib/data/dashboard";
import { Button } from "@/components/ui/button";

const phaseStyles: Record<string, string> = {
  Discovery: "bg-muted text-muted-foreground",
  Build: "bg-accent text-foreground",
  QA: "bg-amber-500/10 text-amber-600",
  Launched: "bg-[#0ca30c]/10 text-[#006300]",
};

export default async function ClientProjectsPage() {
  const projects = await getAllClientProjectsForDashboard();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Client projects</h1>
        <Button asChild>
          <Link href="/dashboard/client-projects/new">New client project</Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <p className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
          No client projects yet — create one to generate a status page.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/client-projects/${project.id}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-5 transition-colors hover:bg-accent"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground">{project.projectName}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${phaseStyles[project.phase] ?? phaseStyles.Discovery}`}
                  >
                    {project.phase}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.clientName} · {project.clientEmail}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Updated{" "}
                {project.updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
