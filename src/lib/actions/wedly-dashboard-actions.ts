"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { recordAudit } from "@/lib/audit";

export async function deleteWedlyWaitlistSignupAction(id: string): Promise<void> {
  await requireAuth();
  await db.wedlyWaitlistSignup.delete({ where: { id } }).catch(() => null);
  await recordAudit({ action: "delete", entity: "wedly waitlist signup", entityId: id });

  revalidatePath("/dashboard/wedly");
}
