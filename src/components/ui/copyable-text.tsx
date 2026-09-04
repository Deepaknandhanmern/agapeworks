"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Click-to-copy text (e.g. an email address) with a brief checkmark confirmation. */
export function CopyableText({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) - nothing to fall back to gracefully, just no-op.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn("inline-flex items-center gap-1.5 transition-colors hover:text-foreground", className)}
    >
      {text}
      {copied ? (
        <Check className="size-3.5 shrink-0 text-emerald-500" />
      ) : (
        <Copy className="size-3.5 shrink-0 opacity-40" />
      )}
    </button>
  );
}
