"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { saveUploadedImage } from "@/lib/upload";
import type { ActionState } from "@/lib/actions/blog-actions";

const testimonialSchema = z.object({
  quote: z.string().min(1, "Quote is required"),
  authorName: z.string().min(1, "Author name is required"),
  authorRole: z.string().optional(),
  authorCompany: z.string().optional(),
  order: z.coerce.number().int().default(0),
  published: z.coerce.boolean().default(true),
});

async function resolveAvatar(formData: FormData, existing?: string | null): Promise<string | null> {
  const file = formData.get("avatarFile");
  if (file instanceof File && file.size > 0) {
    return saveUploadedImage(file);
  }
  return existing ?? null;
}

export async function createTestimonialAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAuth();

  const parsed = testimonialSchema.safeParse({
    quote: formData.get("quote"),
    authorName: formData.get("authorName"),
    authorRole: formData.get("authorRole"),
    authorCompany: formData.get("authorCompany"),
    order: formData.get("order") || 0,
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  let avatar: string | null;
  try {
    avatar = await resolveAvatar(formData);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Image upload failed." };
  }

  await db.testimonial.create({
    data: {
      quote: parsed.data.quote,
      authorName: parsed.data.authorName,
      authorRole: parsed.data.authorRole || null,
      authorCompany: parsed.data.authorCompany || null,
      order: parsed.data.order,
      published: parsed.data.published,
      avatar,
    },
  });

  revalidatePath("/");
  revalidatePath("/about");
  redirect("/dashboard/testimonials");
}

export async function updateTestimonialAction(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAuth();

  const existing = await db.testimonial.findUnique({ where: { id } });
  if (!existing) return { error: "Testimonial not found." };

  const parsed = testimonialSchema.safeParse({
    quote: formData.get("quote"),
    authorName: formData.get("authorName"),
    authorRole: formData.get("authorRole"),
    authorCompany: formData.get("authorCompany"),
    order: formData.get("order") || 0,
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  let avatar: string | null;
  try {
    avatar = await resolveAvatar(formData, existing.avatar);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Image upload failed." };
  }

  await db.testimonial.update({
    where: { id },
    data: {
      quote: parsed.data.quote,
      authorName: parsed.data.authorName,
      authorRole: parsed.data.authorRole || null,
      authorCompany: parsed.data.authorCompany || null,
      order: parsed.data.order,
      published: parsed.data.published,
      avatar,
    },
  });

  revalidatePath("/");
  revalidatePath("/about");
  redirect("/dashboard/testimonials");
}

export async function deleteTestimonialAction(id: string): Promise<void> {
  await requireAuth();
  await db.testimonial.delete({ where: { id } }).catch(() => null);
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/dashboard/testimonials");
}
