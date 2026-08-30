import { ProjectForm } from "../project-form";
import { createProjectAction } from "@/lib/actions/project-actions";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-foreground">New project</h1>
      <ProjectForm action={createProjectAction} />
    </div>
  );
}
