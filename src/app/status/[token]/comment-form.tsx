"use client";

import { CommentFormBase } from "@/components/sections/comment-form-base";

export function CommentForm({ token }: { token: string }) {
  const onSubmit = async (data: { authorName: string; message: string }) => {
    try {
      const res = await fetch(`/api/status/${token}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) return { ok: false, error: json.error ?? "Something went wrong. Please try again." };
      return { ok: true };
    } catch {
      return { ok: false, error: "Couldn't reach the server. Please try again." };
    }
  };

  return <CommentFormBase onSubmit={onSubmit} />;
}
