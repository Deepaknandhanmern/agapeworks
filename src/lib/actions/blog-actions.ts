"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import { saveUploadedImage } from "@/lib/upload";

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1).default("Agape Works"),
  tags: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  published: z.boolean().default(false),
});

function parseTags(raw: string | undefined): string {
  const tags = (raw ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  return JSON.stringify(tags);
}

async function resolveCoverImage(formData: FormData, existing?: string | null): Promise<string | null> {
  const file = formData.get("coverImageFile");
  if (file instanceof File && file.size > 0) {
    return saveUploadedImage(file);
  }
  return existing ?? null;
}

export type ActionState = { error?: string } | undefined;

export async function createBlogPostAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAuth();

  const parsed = blogPostSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug") || slugify(String(formData.get("title") ?? "")),
    description: formData.get("description"),
    content: formData.get("content"),
    author: formData.get("author") || "Agape Works",
    tags: formData.get("tags"),
    date: formData.get("date"),
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const existingSlug = await db.blogPost.findUnique({ where: { slug: parsed.data.slug } });
  if (existingSlug) {
    return { error: "That slug is already in use by another post." };
  }

  let coverImage: string | null;
  try {
    coverImage = await resolveCoverImage(formData);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Image upload failed." };
  }

  await db.blogPost.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      content: parsed.data.content,
      author: parsed.data.author,
      tags: parseTags(parsed.data.tags),
      date: new Date(parsed.data.date),
      published: parsed.data.published,
      coverImage,
    },
  });

  revalidatePath("/blog");
  redirect("/dashboard/blog");
}

export async function updateBlogPostAction(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAuth();

  const existing = await db.blogPost.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Post not found." };
  }

  const parsed = blogPostSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug") || existing.slug,
    description: formData.get("description"),
    content: formData.get("content"),
    author: formData.get("author") || "Agape Works",
    tags: formData.get("tags"),
    date: formData.get("date"),
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  if (parsed.data.slug !== existing.slug) {
    const clash = await db.blogPost.findUnique({ where: { slug: parsed.data.slug } });
    if (clash) return { error: "That slug is already in use by another post." };
  }

  let coverImage: string | null;
  try {
    coverImage = await resolveCoverImage(formData, existing.coverImage);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Image upload failed." };
  }

  await db.blogPost.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      content: parsed.data.content,
      author: parsed.data.author,
      tags: parseTags(parsed.data.tags),
      date: new Date(parsed.data.date),
      published: parsed.data.published,
      coverImage,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
  if (parsed.data.slug !== existing.slug) revalidatePath(`/blog/${parsed.data.slug}`);
  redirect("/dashboard/blog");
}

export async function deleteBlogPostAction(id: string): Promise<void> {
  await requireAuth();

  const existing = await db.blogPost.findUnique({ where: { id } });
  if (!existing) return;

  await db.blogPost.delete({ where: { id } });

  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath("/dashboard/blog");
}
