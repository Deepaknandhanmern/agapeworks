import { ProjectForm } from "../project-form";
import { createProjectAction } from "@/lib/actions/project-actions";

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-foreground">New project</h1>
      <ProjectForm
        action={createProjectAction}
        defaultValues={{ category: category === "landing_page" ? "landing_page" : "project" }}
      />
    </div>
  );
}
