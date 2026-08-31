"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function deleteNewsletterSubscriberAction(id: string): Promise<void> {
  await requireAuth();
  await db.newsletterSubscriber.delete({ where: { id } }).catch(() => null);
  revalidatePath("/dashboard/newsletter");
}
