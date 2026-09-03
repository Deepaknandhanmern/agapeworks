"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadViviraReleaseAction } from "@/lib/actions/vivira-actions";

type Status = "idle" | "loading" | "error";

export function UploadReleaseForm() {
  const router = useRouter();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await uploadViviraReleaseAction(formData);

    if (!result.ok) {
      setErrorMessage(result.error ?? "Something went wrong. Please try again.");
      setStatus("error");
      return;
    }

    setStatus("idle");
    formRef.current?.reset();
    router.refresh();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-3 rounded-xl border bg-card p-4"
    >
      <div className="grid min-w-0 flex-1 gap-2">
        <Label htmlFor="vivira-release-file">Upload a new release (.zip)</Label>
        <Input id="vivira-release-file" name="file" type="file" accept=".zip" required />
      </div>
      <Button type="submit" disabled={status === "loading"} className="shrink-0">
        <UploadCloud className="size-4" />
        {status === "loading" ? "Uploading..." : "Upload"}
      </Button>
      {status === "error" && <p className="w-full text-sm text-destructive">{errorMessage}</p>}
    </form>
  );
}
