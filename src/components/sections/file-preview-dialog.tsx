"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

/** Images and PDFs preview inline; anything else just gets the existing download link. */
export function isPreviewable(contentType: string): boolean {
  return contentType.startsWith("image/") || contentType === "application/pdf";
}

export function FilePreviewDialog({
  fileName,
  url,
  contentType,
}: {
  fileName: string;
  url: string;
  contentType: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
        >
          <Eye className="size-3.5" />
          Preview
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] gap-3 p-4 sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{fileName}</DialogTitle>
        </DialogHeader>
        <div className="h-[75vh] w-full overflow-hidden rounded-lg border bg-muted">
          {contentType.startsWith("image/") ? (
            // eslint-disable-next-line @next/next/no-img-element -- signed, expiring URL — not worth next/image's remote-pattern config for this
            <img src={url} alt={fileName} className="h-full w-full object-contain" />
          ) : (
            <iframe src={url} title={fileName} className="h-full w-full" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
