import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { getClientProjectByToken } from "@/lib/data/status-page";
import { PHASES } from "@/lib/client-project-phases";
import { CommentForm } from "./comment-form";

function PhaseStepper({ currentPhase }: { currentPhase: string }) {
  const currentIndex = PHASES.indexOf(currentPhase as (typeof PHASES)[number]);

  return (
    <ol className="flex w-full items-center">
      {PHASES.map((phase, i) => {
        const isDone = i < currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <li key={phase} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex size-8 items-center justify-center rounded-full border-2 text-xs font-semibold ${
                  isDone
                    ? "border-foreground bg-foreground text-background"
                    : isCurrent
                      ? "border-foreground text-foreground"
                      : "border-muted-foreground/30 text-muted-foreground/50"
                }`}
              >
                {isDone ? <Check className="size-4" /> : i + 1}
              </div>
              <span
                className={`text-xs font-medium ${isCurrent ? "text-foreground" : "text-muted-foreground"}`}
              >
                {phase}
              </span>
            </div>
            {i < PHASES.length - 1 && (
              <div className={`mx-2 h-0.5 flex-1 ${isDone ? "bg-foreground" : "bg-muted-foreground/20"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default async function StatusPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const project = await getClientProjectByToken(token);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4">
        <Link href="/">
          <Image src="/logo-black.png" alt="Agape Works" width={181} height={32} className="h-6 w-auto" />
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-12">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {project.projectName}
          </h1>
          <p className="text-sm text-muted-foreground">Status for {project.clientName}</p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <PhaseStepper currentPhase={project.phase} />
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold text-foreground">What&apos;s shipped</h2>
          {project.updates.length === 0 ? (
            <p className="rounded-xl border border-dashed bg-card/50 p-6 text-center text-sm text-muted-foreground">
              No updates yet — check back soon.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {project.updates.map((update) => (
                <li key={update.id} className="rounded-xl border bg-card p-5">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p className="font-medium text-foreground">{update.title}</p>
                    <p className="shrink-0 text-xs text-muted-foreground">
                      {update.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="whitespace-pre-wrap text-sm text-muted-foreground">{update.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold text-foreground">Leave feedback</h2>
          <CommentForm token={token} />
        </div>

        {project.comments.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-foreground">Feedback so far</h2>
            <ul className="flex flex-col gap-3">
              {project.comments.map((comment) => (
                <li key={comment.id} className="rounded-xl border bg-card p-4">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-foreground">{comment.authorName}</p>
                    <p className="shrink-0 text-xs text-muted-foreground">
                      {comment.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="whitespace-pre-wrap text-sm text-muted-foreground">{comment.message}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
