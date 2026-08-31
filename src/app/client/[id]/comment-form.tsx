"use client";

import { CommentFormBase } from "@/components/sections/comment-form-base";
import { addClientCommentAction } from "@/lib/client-portal/actions";

export function ClientCommentForm({ projectId, defaultAuthorName }: { projectId: string; defaultAuthorName?: string }) {
  const onSubmit = async (data: { authorName: string; message: string }) => {
    const formData = new FormData();
    formData.set("authorName", data.authorName);
    formData.set("message", data.message);
    return addClientCommentAction(projectId, formData);
  };

  return <CommentFormBase onSubmit={onSubmit} defaultAuthorName={defaultAuthorName} />;
}
