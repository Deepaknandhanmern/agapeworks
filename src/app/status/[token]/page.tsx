import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getClientProjectByToken } from "@/lib/data/status-page";
import { getSignedFileUrl } from "@/lib/storage";
import { ClientProjectStatus } from "@/components/sections/client-project-status";
import { CommentForm } from "./comment-form";

export default async function StatusPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const project = await getClientProjectByToken(token);
  if (!project) notFound();

  const files = await Promise.all(
    project.files.map(async (file) => ({ ...file, url: await getSignedFileUrl(file.storagePath) })),
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4">
        <Link href="/">
          <Image src="/logo-black.png" alt="Agape Works" width={181} height={32} className="h-6 w-auto" />
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-col px-4 py-12">
        <ClientProjectStatus project={project} files={files} commentForm={<CommentForm token={token} />} />
      </main>
    </div>
  );
}
