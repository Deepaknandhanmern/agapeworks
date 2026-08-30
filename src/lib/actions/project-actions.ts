"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { saveUploadedImage } from "@/lib/upload";
import type { ActionState } from "@/lib/actions/blog-actions";

const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  order: z.coerce.number().int().default(0),
});

async function resolveScreenshot(formData: FormData, existing?: string | null): Promise<string | null> {
  const file = formData.get("screenshotFile");
  if (file instanceof File && file.size > 0) {
    return saveUploadedImage(file);
  }
  return existing ?? null;
}

export async function createProjectAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAuth();

  const parsed = projectSchema.safeParse({
    name: formData.get("name"),
    url: formData.get("url"),
    description: formData.get("description"),
    order: formData.get("order") || 0,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  let screenshot: string | null;
  try {
    screenshot = await resolveScreenshot(formData);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Image upload failed." };
  }

  await db.project.create({
    data: {
      name: parsed.data.name,
      url: parsed.data.url || null,
      description: parsed.data.description,
      order: parsed.data.order,
      screenshot,
    },
  });

  revalidatePath("/portfolio");
  redirect("/dashboard/projects");
}

export async function updateProjectAction(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAuth();

  const existing = await db.project.findUnique({ where: { id } });
  if (!existing) return { error: "Project not found." };

  const parsed = projectSchema.safeParse({
    name: formData.get("name"),
    url: formData.get("url"),
    description: formData.get("description"),
    order: formData.get("order") || 0,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  let screenshot: string | null;
  try {
    screenshot = await resolveScreenshot(formData, existing.screenshot);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Image upload failed." };
  }

  await db.project.update({
    where: { id },
    data: {
      name: parsed.data.name,
      url: parsed.data.url || null,
      description: parsed.data.description,
      order: parsed.data.order,
      screenshot,
    },
  });

  revalidatePath("/portfolio");
  redirect("/dashboard/projects");
}

export async function deleteProjectAction(id: string): Promise<void> {
  await requireAuth();
  await db.project.delete({ where: { id } }).catch(() => null);
  revalidatePath("/portfolio");
  revalidatePath("/dashboard/projects");
}
