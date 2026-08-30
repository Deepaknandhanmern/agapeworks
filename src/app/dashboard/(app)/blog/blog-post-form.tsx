"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState } from "@/lib/actions/blog-actions";

export type BlogPostFormValues = {
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  tags: string;
  date: string;
  published: boolean;
  coverImage: string | null;
};

export function BlogPostForm({
  action,
  defaultValues,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  defaultValues?: Partial<BlogPostFormValues>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [preview, setPreview] = useState<string | null>(defaultValues?.coverImage ?? null);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={defaultValues?.title} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="slug">Slug (URL path)</Label>
        <Input
          id="slug"
          name="slug"
          placeholder="leave blank to generate from title"
          defaultValue={defaultValues?.slug}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" defaultValue={defaultValues?.description} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="content">Content (Markdown / MDX)</Label>
        <textarea
          id="content"
          name="content"
          required
          defaultValue={defaultValues?.content}
          rows={16}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="author">Author</Label>
          <Input id="author" name="author" defaultValue={defaultValues?.author ?? "Agape Works"} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            defaultValue={defaultValues?.date ?? new Date().toISOString().slice(0, 10)}
            required
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input id="tags" name="tags" defaultValue={defaultValues?.tags} placeholder="SEO, SaaS, Strategy" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="coverImageFile">Cover image</Label>
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element -- preview of a user-uploaded file, not worth next/image
          <img src={preview} alt="Cover preview" className="mb-2 h-40 w-full rounded-md border object-cover" />
        )}
        <input
          id="coverImageFile"
          name="coverImageFile"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
          className="text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={defaultValues?.published ?? true}
          className="size-4 rounded border-input"
        />
        <Label htmlFor="published">Published (visible on the site)</Label>
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" disabled={pending} className="w-fit">
        {pending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
