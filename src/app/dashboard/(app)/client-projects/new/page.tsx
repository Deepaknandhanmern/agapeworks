import { ClientProjectForm } from "../client-project-form";

export default function NewClientProjectPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-foreground">New client project</h1>
      <ClientProjectForm />
    </div>
  );
}
