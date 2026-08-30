"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "loading" | "success" | "error";

export function CommentForm({ token }: { token: string }) {
  const router = useRouter();
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(`/api/status/${token}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: formData.get("authorName"),
          message: formData.get("message"),
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
      router.refresh();
    } catch {
      setErrorMessage("Couldn't reach the server. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 rounded-xl border bg-card p-4 text-sm text-foreground">
        <CheckCircle2 className="size-4 text-[#006300]" />
        Feedback sent — thanks!
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
    <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-xl border bg-card p-5">
      <div className="grid gap-2">
        <Label htmlFor="authorName">Your name</Label>
        <Input id="authorName" name="authorName" placeholder="Jane Cooper" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Feedback</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Looks great — one thing I noticed is..."
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
