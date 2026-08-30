import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getClientProjectByIdForDashboard } from "@/lib/data/dashboard";
import { getSignedFileUrl } from "@/lib/storage";
import { ClientProjectDetail } from "./client-project-detail";

export default async function ClientProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getClientProjectByIdForDashboard(id);
  if (!project) notFound();

  const h = await headers();
  const host = h.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";
  const statusUrl = `${protocol}://${host}/status/${project.statusToken}`;

  const files = await Promise.all(
    project.files.map(async (file) => ({ ...file, url: await getSignedFileUrl(file.storagePath) })),
  );

  return (
    <ClientProjectDetail project={{ ...project, files }} statusUrl={statusUrl} />
  );
}
