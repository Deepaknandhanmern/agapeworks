"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState } from "@/lib/actions/blog-actions";

export type TestimonialFormValues = {
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  order: number;
  avatar: string | null;
  published: boolean;
};

export function TestimonialForm({
  action,
  defaultValues,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  defaultValues?: Partial<TestimonialFormValues>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [preview, setPreview] = useState<string | null>(defaultValues?.avatar ?? null);

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="quote">Quote</Label>
        <textarea
          id="quote"
          name="quote"
          defaultValue={defaultValues?.quote}
          required
          rows={4}
          className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="authorName">Author name</Label>
        <Input id="authorName" name="authorName" defaultValue={defaultValues?.authorName} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="authorRole">Role (optional)</Label>
        <Input id="authorRole" name="authorRole" defaultValue={defaultValues?.authorRole} placeholder="Founder" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="authorCompany">Company (optional)</Label>
        <Input id="authorCompany" name="authorCompany" defaultValue={defaultValues?.authorCompany} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="order">Display order</Label>
        <Input id="order" name="order" type="number" defaultValue={defaultValues?.order ?? 0} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="avatarFile">Avatar (optional)</Label>
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element -- preview of a user-uploaded file, not worth next/image
          <img src={preview} alt="Avatar preview" className="mb-2 size-16 rounded-full border object-cover" />
        )}
        <input
          id="avatarFile"
          name="avatarFile"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
          className="text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          name="published"
          defaultChecked={defaultValues?.published ?? true}
          className="size-4 rounded border-input"
        />
        Published (visible on the site)
      </label>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" disabled={pending} className="w-fit">
        {pending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
