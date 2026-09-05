"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import type { ActionState } from "@/lib/actions/blog-actions";

// Deliberately separate from lib/actions/testimonial-actions.ts (the
// dashboard's own create/update/delete, which requires auth): this one is
// reachable by anyone with the page's URL, so it's scoped down hard - no
// order/published fields accepted from the client, always saved unpublished
// so nothing goes live without you reviewing it in /dashboard/testimonials
// first.
const publicTestimonialSchema = z.object({
  quote: z.string().min(10, "Tell us a bit more - a few words won't do it justice.").max(1000),
  authorName: z.string().min(1, "Your name is required").max(191),
  authorRole: z.string().max(191).optional(),
  authorCompany: z.string().max(191).optional(),
});

export async function submitPublicTestimonialAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = publicTestimonialSchema.safeParse({
    quote: formData.get("quote"),
    authorName: formData.get("authorName"),
    authorRole: formData.get("authorRole"),
    authorCompany: formData.get("authorCompany"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  // Honeypot - a real visitor never fills this (it's visually hidden), a
  // bot filling every field usually does. Silently "succeed" instead of
  // telling the bot what tripped it.
  if (formData.get("website")) {
    return undefined;
  }

  await db.testimonial.create({
    data: {
      quote: parsed.data.quote,
      authorName: parsed.data.authorName,
      authorRole: parsed.data.authorRole || null,
      authorCompany: parsed.data.authorCompany || null,
      published: false,
    },
  });

  return undefined;
}
