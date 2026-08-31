import type { ReactNode } from "react";
import { Check, FileText, Download } from "lucide-react";
import { PHASES } from "@/lib/client-project-phases";
import { FilePreviewDialog, isPreviewable } from "./file-preview-dialog";
import type { ClientProject, ProjectUpdate, ProjectComment, ProjectFile } from "@/generated/prisma/client";

// Extracted from src/app/status/[token]/page.tsx so the client portal
// (/client/[id]) can show identical content without duplicating ~150 lines.
// Purely presentational — the two pages differ only in how they authorize
// access (token match vs. session-email ownership) and how comments get
// posted (the commentForm slot), not in what's displayed.

type ProjectWithDetail = ClientProject & {
  updates: ProjectUpdate[];
  comments: ProjectComment[];
};

type FileWithUrl = ProjectFile & { url: string | null };

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

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

export function ClientProjectStatus({
  project,
  files,
  commentForm,
  uploadForm,
}: {
  project: ProjectWithDetail;
  files: FileWithUrl[];
  commentForm: ReactNode;
  /** Only the session-based client portal offers this — the token-based status page stays read/comment-only. */
  uploadForm?: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{project.projectName}</h1>
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
                    {update.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">{update.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {(uploadForm || files.length > 0) && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-foreground">Files</h2>
          {uploadForm && <div className="mb-3">{uploadForm}</div>}
          {files.length > 0 && (
            <ul className="flex flex-col gap-2">
              {files.map((file) => (
                <li key={file.id} className="flex items-center gap-3 rounded-xl border bg-card p-4">
                  <FileText className="size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{file.fileName}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.sizeBytes)}</p>
                  </div>
                  {file.url ? (
                    <>
                      {isPreviewable(file.contentType) && (
                        <FilePreviewDialog fileName={file.fileName} url={file.url} contentType={file.contentType} />
                      )}
                      <a
                        href={file.url}
                        className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
                      >
                        <Download className="size-3.5" />
                        Download
                      </a>
                    </>
                  ) : (
                    <span className="shrink-0 text-xs text-muted-foreground">Unavailable</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Leave feedback</h2>
        {commentForm}
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
                    {comment.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">{comment.message}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
