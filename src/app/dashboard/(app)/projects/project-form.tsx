"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState } from "@/lib/actions/blog-actions";

export type ProjectFormValues = {
  name: string;
  url: string;
  description: string;
  order: number;
  screenshot: string | null;
  category: string;
};

export function ProjectForm({
  action,
  defaultValues,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  defaultValues?: Partial<ProjectFormValues>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [preview, setPreview] = useState<string | null>(defaultValues?.screenshot ?? null);

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={defaultValues?.name} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="url">Live URL (optional)</Label>
        <Input id="url" name="url" type="url" defaultValue={defaultValues?.url} placeholder="https://" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" defaultValue={defaultValues?.description} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category">Section</Label>
        <select
          id="category"
          name="category"
          defaultValue={defaultValues?.category ?? "project"}
          className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <option value="project">Recent projects</option>
          <option value="landing_page">Landing Page</option>
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="order">Display order</Label>
        <Input id="order" name="order" type="number" defaultValue={defaultValues?.order ?? 0} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="screenshotFile">
          Screenshot (only needed if the live URL blocks embedding)
        </Label>
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element -- preview of a user-uploaded file, not worth next/image
          <img src={preview} alt="Screenshot preview" className="mb-2 h-40 w-full rounded-md border object-cover" />
        )}
        <input
          id="screenshotFile"
          name="screenshotFile"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
          className="text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground"
        />
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" disabled={pending} className="w-fit">
        {pending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
