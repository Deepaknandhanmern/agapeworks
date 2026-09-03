import { notFound } from "next/navigation";
import { ProjectForm } from "../project-form";
import { updateProjectAction } from "@/lib/actions/project-actions";
import { getProjectByIdForDashboard } from "@/lib/data/dashboard";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectByIdForDashboard(id);
  if (!project) notFound();

  const action = updateProjectAction.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-foreground">Edit project</h1>
      <ProjectForm
        action={action}
        defaultValues={{
          name: project.name,
          url: project.url ?? "",
          description: project.description,
          order: project.order,
          screenshot: project.screenshot,
          category: project.category,
        }}
      />
    </div>
  );
}
