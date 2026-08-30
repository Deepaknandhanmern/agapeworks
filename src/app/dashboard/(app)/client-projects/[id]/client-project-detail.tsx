"use client";

import { useActionState, useState, useTransition } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { setPhaseAction, postUpdateAction } from "@/lib/actions/client-project-actions";
import { PHASES } from "@/lib/client-project-phases";
import type { ClientProject, ProjectUpdate, ProjectComment } from "@/generated/prisma/client";

type FullClientProject = ClientProject & {
  updates: ProjectUpdate[];
  comments: ProjectComment[];
};

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
          disabled={pending}
          onClick={() => startTransition(() => setPhaseAction(id, phase))}
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
