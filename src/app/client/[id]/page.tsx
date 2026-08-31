import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/ui/header-3";
import { requireClientEmail } from "@/lib/client-portal/auth";
import { getClientProjectForEmail, markProjectViewed } from "@/lib/data/client-portal";
import { getSignedFileUrl } from "@/lib/storage";
import { ClientProjectStatus } from "@/components/sections/client-project-status";
import { ClientCommentForm } from "./comment-form";
import { UploadFileForm } from "./upload-file-form";

export default async function ClientProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const email = await requireClientEmail();
  const project = await getClientProjectForEmail(id, email);
  if (!project) notFound();

  // Fire-and-forget: powers the unread indicator on /client, not worth
  // blocking the page render or failing it if this write hiccups.
  void markProjectViewed(id, email).catch(() => {});

  const files = await Promise.all(
    project.files.map(async (file) => ({ ...file, url: await getSignedFileUrl(file.storagePath) })),
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-2xl flex-col px-4 py-12">
          <Link
            href="/client"
            className="mb-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            All projects
          </Link>
          <ClientProjectStatus
            project={project}
            files={files}
            commentForm={<ClientCommentForm projectId={project.id} defaultAuthorName={project.clientName} />}
            uploadForm={<UploadFileForm projectId={project.id} />}
          />
        </section>
      </main>
    </div>
  );
}
