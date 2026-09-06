"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { recordAudit } from "@/lib/audit";

export async function deleteNewsletterSubscriberAction(id: string): Promise<void> {
  await requireAuth();
  await db.newsletterSubscriber.delete({ where: { id } }).catch(() => null);
  await recordAudit({ action: "delete", entity: "newsletter subscriber", entityId: id });

  revalidatePath("/dashboard/newsletter");
}

/** Bulk delete for the subscriber list's checkbox selection. */
export async function deleteNewsletterSubscribersAction(
  ids: string[],
): Promise<{ deleted: number }> {
  await requireAuth();
  if (ids.length === 0) return { deleted: 0 };

  const result = await db.newsletterSubscriber.deleteMany({ where: { id: { in: ids } } });
  await recordAudit({
    action: "delete",
    entity: "newsletter subscriber",
    summary: `Bulk deleted ${result.count} subscriber(s)`,
  });
  revalidatePath("/dashboard/newsletter");
  return { deleted: result.count };
}
