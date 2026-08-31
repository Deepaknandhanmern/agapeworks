"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { Check, Copy, FileText, Download, Trash2 } from "lucide-react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  setPhaseAction,
  postUpdateAction,
  uploadFileAction,
  deleteFileAction,
} from "@/lib/actions/client-project-actions";
import { PHASES } from "@/lib/client-project-phases";
import { playChime } from "@/lib/play-chime";
import type { ClientProject, ProjectUpdate, ProjectComment, ProjectFile } from "@/generated/prisma/client";

type FullClientProject = ClientProject & {
  updates: ProjectUpdate[];
  comments: ProjectComment[];
  files: (ProjectFile & { url: string | null })[];
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const phaseStyles: Record<string, string> = {
  Discovery: "bg-muted text-muted-foreground",
  Build: "bg-accent text-foreground",
  QA: "bg-amber-500/10 text-amber-600",
  Launched: "bg-[#0ca30c]/10 text-[#006300]",
};

function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : "Copy status link"}
    </Button>
  );
}

function PhaseSelector({ id, currentPhase }: { id: string; currentPhase: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-2">
      {PHASES.map((phase) => (
        <button
          key={phase}
          type="button"
          disabled={pending || phase === currentPhase}
          onClick={() =>
            startTransition(async () => {
              await setPhaseAction(id, phase);
              playChime();
              notify.success(`Phase updated to ${phase}`);
            })
          }
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            phase === currentPhase
              ? (phaseStyles[phase] ?? phaseStyles.Discovery)
              : "border text-muted-foreground hover:bg-accent"
          }`}
        >
          {phase}
        </button>
      ))}
    </div>
  );
}

function PostUpdateForm({ id }: { id: string }) {
  const action = postUpdateAction.bind(null, id);
  const [state, formAction, pending] = useActionState(action, undefined);
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending && !state?.error) {
      playChime();
      notify.success("Update posted — client notified", { title: "Client notified" });
    }
    wasPending.current = pending;
  }, [pending, state]);

  return (
    <form action={formAction} className="flex flex-col gap-3 rounded-xl border bg-card p-5">
      <div className="grid gap-2">
        <Label htmlFor="title">What shipped</Label>
        <Input id="title" name="title" placeholder="Checkout flow is live" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="body">Details — and what&apos;s next</Label>
        <Textarea
          id="body"
          name="body"
          placeholder="Built and tested the checkout flow end to end. Next up: connecting the payment provider."
          className="min-h-24 resize-none"
          required
        />
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={pending} className="w-fit">
        {pending ? "Posting..." : "Post update & notify client"}
      </Button>
    </form>
  );
}

function UploadFileForm({ id }: { id: string }) {
  const action = uploadFileAction.bind(null, id);
  const [state, formAction, pending] = useActionState(action, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending && !state?.error) {
      playChime();
      notify.success("File uploaded");
      formRef.current?.reset();
    }
    wasPending.current = pending;
  }, [pending, state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-wrap items-end gap-3 rounded-xl border bg-card p-4">
      <div className="grid min-w-0 flex-1 gap-2">
        <Label htmlFor="file">Upload a file</Label>
        <Input id="file" name="file" type="file" required />
      </div>
      <Button type="submit" disabled={pending} className="shrink-0">
        {pending ? "Uploading..." : "Upload"}
      </Button>
      {state?.error && <p className="w-full text-sm text-destructive">{state.error}</p>}
    </form>
  );
}

function FilesSection({ id, files }: { id: string; files: FullClientProject["files"] }) {
  const [pending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <UploadFileForm id={id} />
      {files.length === 0 ? (
        <p className="rounded-xl border border-dashed bg-card/50 p-4 text-center text-sm text-muted-foreground">
          No files uploaded yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {files.map((file) => (
            <li key={file.id} className="flex items-center gap-3 rounded-xl border bg-card p-4">
              <FileText className="size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{file.fileName}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(file.sizeBytes)}</p>
              </div>
              {file.url && (
                <a
                  href={file.url}
                  className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
                >
                  <Download className="size-3.5" />
                  Download
                </a>
              )}
              <button
                type="button"
                disabled={pending && deletingId === file.id}
                onClick={() =>
                  startTransition(async () => {
                    setDeletingId(file.id);
                    await deleteFileAction(id, file.id);
                    playChime();
                    notify.warning("File deleted");
                  })
                }
                className="shrink-0 text-muted-foreground hover:text-destructive disabled:opacity-50"
                aria-label={`Delete ${file.fileName}`}
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ClientProjectDetail({
  project,
  statusUrl,
}: {
  project: FullClientProject;
  statusUrl: string;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="mb-1 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-foreground">{project.projectName}</h1>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${phaseStyles[project.phase] ?? phaseStyles.Discovery}`}
          >
            {project.phase}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {project.clientName} · {project.clientEmail}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-card p-4">
        <p className="flex-1 truncate text-sm text-muted-foreground">{statusUrl}</p>
        <CopyLinkButton url={statusUrl} />
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold text-foreground">Phase</h2>
        <PhaseSelector id={project.id} currentPhase={project.phase} />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Files</h2>
        <FilesSection id={project.id} files={project.files} />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Post an update</h2>
        <PostUpdateForm id={project.id} />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Updates</h2>
        {project.updates.length === 0 ? (
          <p className="rounded-xl border border-dashed bg-card/50 p-4 text-center text-sm text-muted-foreground">
            No updates posted yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {project.updates.map((update) => (
              <li key={update.id} className="rounded-xl border bg-card p-4">
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

      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Client feedback</h2>
        {project.comments.length === 0 ? (
          <p className="rounded-xl border border-dashed bg-card/50 p-4 text-center text-sm text-muted-foreground">
            No feedback yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {project.comments.map((comment) => (
              <li key={comment.id} className="rounded-xl border bg-card p-4">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <p className="font-medium text-foreground">{comment.authorName}</p>
                  <p className="shrink-0 text-xs text-muted-foreground">
                    {comment.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">{comment.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
