"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function setEnquiryStatusAction(id: string, status: "new" | "read" | "archived") {
  await requireAuth();
  await db.enquiry.update({ where: { id }, data: { status } }).catch(() => null);
  revalidatePath("/dashboard/enquiries");
}
