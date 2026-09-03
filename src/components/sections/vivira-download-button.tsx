"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

// Lead-capture gate, not an account - a name/email save (no password, no
// session) before the actual .zip download starts, mirroring the newsletter
// signup's DB-backed-but-passwordless pattern rather than a real auth build.
export function ViviraDownloadButton({
  href,
  label = "Download for WordPress",
  className,
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const startDownload = () => {
    trackEvent("vivira_download", { platform: "wordpress" });
    const link = document.createElement("a");
    link.href = href;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/vivira-download-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }

      setOpen(false);
      setStatus("idle");
      setName("");
      setEmail("");
      startDownload();
    } catch {
      setError("Couldn't reach the server. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("mt-2 h-11 px-6", className)}
      >
        {label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Before you download</DialogTitle>
            <DialogDescription>
              Just your name and email - no account or password needed. The download starts
              right after.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="lead-name">Name</Label>
              <Input
                id="lead-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Jane Cooper"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="lead-email">Email</Label>
              <Input
                id="lead-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="jane@yourstore.com"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={status === "loading"} className="mt-1">
              {status === "loading" ? "Starting download…" : "Download Vivira"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
