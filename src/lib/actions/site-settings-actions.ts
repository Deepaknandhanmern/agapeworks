"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import type { AvailabilityStatus } from "@/lib/availability";

export async function setAvailabilityStatusAction(status: AvailabilityStatus) {
  await requireAuth();

  await db.siteSetting.upsert({
    where: { key: "availability_status" },
    create: { key: "availability_status", value: status },
    update: { value: status },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/settings");
}
