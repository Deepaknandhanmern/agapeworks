"use client";

import { useTransition } from "react";
import { notify } from "@/components/ui/toast";
import type { Enquiry } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { setEnquiryStatusAction } from "@/lib/actions/enquiry-actions";
import { playChime } from "@/lib/play-chime";

const statusStyles: Record<string, string> = {
  new: "bg-accent text-foreground",
  read: "bg-muted text-muted-foreground",
  archived: "bg-muted text-muted-foreground/60",
};

const priorityStyles: Record<string, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-amber-500/10 text-amber-600",
  low: "bg-muted text-muted-foreground",
};

export function EnquiryRow({ enquiry }: { enquiry: Enquiry }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-foreground">{enquiry.name}</p>
            {enquiry.priority && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase ${priorityStyles[enquiry.priority] ?? priorityStyles.low}`}
              >
                {enquiry.priority}
              </span>
            )}
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[enquiry.status]}`}>
              {enquiry.status}
            </span>
          </div>
          <a href={`mailto:${enquiry.email}`} className="text-sm text-muted-foreground hover:underline">
            {enquiry.email}
          </a>
          {enquiry.company && <p className="text-sm text-muted-foreground">{enquiry.company}</p>}
        </div>
        <p className="text-xs text-muted-foreground">
          {enquiry.createdAt.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="mb-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="rounded-full border px-2 py-0.5">{enquiry.service}</span>
        <span className="rounded-full border px-2 py-0.5">{enquiry.budget}</span>
        <span className="rounded-full border px-2 py-0.5">{enquiry.timeline}</span>
        {enquiry.source && <span className="rounded-full border px-2 py-0.5">via {enquiry.source}</span>}
      </div>

      {enquiry.aiSummary && (
        <p className="mb-2 text-sm italic text-muted-foreground">&ldquo;{enquiry.aiSummary}&rdquo;</p>
      )}

      <p className="mb-4 whitespace-pre-wrap text-sm text-foreground">{enquiry.message}</p>

      <div className="flex gap-2">
        {enquiry.status !== "read" && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                await setEnquiryStatusAction(enquiry.id, "read");
                playChime();
                notify.success(`Marked ${enquiry.name}'s enquiry as read`);
              })
            }
          >
            Mark read
          </Button>
        )}
        {enquiry.status !== "archived" && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                await setEnquiryStatusAction(enquiry.id, "archived");
                playChime();
                notify.warning(`Archived ${enquiry.name}'s enquiry`);
              })
            }
          >
            Archive
          </Button>
        )}
      </div>
    </div>
  );
}
