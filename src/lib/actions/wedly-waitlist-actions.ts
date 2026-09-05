"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import type { ActionState } from "@/lib/actions/blog-actions";
import { sendWedlyWaitlistConfirmation } from "@/lib/email/send-wedly-waitlist-confirmation";

const waitlistSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  name: z.string().max(191).optional(),
});

export async function joinWedlyWaitlistAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Honeypot - a real visitor never fills this (it's visually hidden), a
  // bot filling every field usually does. Silently "succeed" instead of
  // telling the bot what tripped it.
  if (formData.get("website")) {
    return undefined;
  }

  const parsed = waitlistSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  try {
    await db.wedlyWaitlistSignup.create({ data: parsed.data });
  } catch (error) {
    // Unique constraint on email - already on the list, treat as success
    // rather than telling a returning visitor their own email is "invalid".
    const isDuplicate =
      typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
    if (!isDuplicate) throw error;
  }

  await sendWedlyWaitlistConfirmation(parsed.data.email, parsed.data.name);

  return undefined;
}
