"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedCheckmark } from "@/components/ui/animated-checkmark";

type Status = "idle" | "loading" | "success" | "error";

/**
 * The actual comment form (fields, loading/error/success state) - the
 * status page (token-based) and the client portal (session-based) post
 * comments through different endpoints, but the form itself is identical,
 * so only `onSubmit` differs between the two thin wrappers that use this.
 */
export function CommentFormBase({
  onSubmit,
  defaultAuthorName,
}: {
  onSubmit: (data: { authorName: string; message: string }) => Promise<{ ok: boolean; error?: string }>;
  defaultAuthorName?: string;
}) {
  const router = useRouter();
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await onSubmit({
      authorName: String(formData.get("authorName") ?? ""),
      message: String(formData.get("message") ?? ""),
    });

    if (!result.ok) {
      setErrorMessage(result.error ?? "Something went wrong. Please try again.");
      setStatus("error");
      return;
    }

    setStatus("success");
    (e.target as HTMLFormElement).reset();
    router.refresh();
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 rounded-xl border bg-card p-4 text-sm text-foreground">
        <AnimatedCheckmark className="size-4 text-[#006300]" strokeWidth={4} />
        Feedback sent - thanks!
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="ml-auto text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-xl border bg-card p-5">
      <div className="grid gap-2">
        <Label htmlFor="authorName">Your name</Label>
        <Input
          id="authorName"
          name="authorName"
          placeholder="Jane Cooper"
          defaultValue={defaultAuthorName}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Feedback</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Looks great - one thing I noticed is..."
          className="min-h-24 resize-none"
          required
        />
      </div>
      {status === "error" && <p className="text-sm text-destructive">{errorMessage}</p>}
      <Button type="submit" disabled={status === "loading"} className="w-fit">
        {status === "loading" ? "Sending..." : "Send feedback"}
      </Button>
    </form>
  );
}
