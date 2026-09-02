import Link from "next/link";
import { getAllProjectsForDashboard } from "@/lib/data/dashboard";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "../delete-button";
import { deleteProjectAction } from "@/lib/actions/project-actions";

export default async function DashboardProjectsPage() {
  const projects = await getAllProjectsForDashboard();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
        <Button asChild>
          <Link href="/dashboard/projects/new">New project</Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">URL</th>
              <th className="p-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b last:border-0">
                <td className="p-4 font-medium text-foreground">{project.name}</td>
                <td className="p-4 text-muted-foreground">{project.url ?? " - "}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/projects/${project.id}`}>Edit</Link>
                    </Button>
                    <DeleteButton
                      action={deleteProjectAction.bind(null, project.id)}
                      label={project.name}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-muted-foreground">
                  No projects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
