"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function deleteWedlyWaitlistSignupAction(id: string): Promise<void> {
  await requireAuth();
  await db.wedlyWaitlistSignup.delete({ where: { id } }).catch(() => null);
  revalidatePath("/dashboard/wedly");
}
