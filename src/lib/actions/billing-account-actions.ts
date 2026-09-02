"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";

export type CreateBillingAccountState =
  | { error: string; password?: undefined }
  | { password: string; email: string; error?: undefined }
  | undefined;

const accountSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  email: z.email("Enter a valid email address"),
  gstNumber: z.string().optional(),
  phone: z.string().optional(),
});

/** Generates a readable one-time password - shown to admin once to hand off. */
function generatePassword(): string {
  return randomBytes(6).toString("base64url").slice(0, 8);
}

export async function createBillingAccountAction(
  _prevState: CreateBillingAccountState,
  formData: FormData,
): Promise<CreateBillingAccountState> {
  await requireAuth();

  const parsed = accountSchema.safeParse({
    businessName: formData.get("businessName"),
    email: formData.get("email"),
    gstNumber: formData.get("gstNumber") || undefined,
    phone: formData.get("phone") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const existing = await db.billingAccount.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const password = generatePassword();
  const passwordHash = await bcrypt.hash(password, 10);

  await db.billingAccount.create({
    data: { ...parsed.data, passwordHash },
  });

  revalidatePath("/dashboard/billing-accounts");
  return { password, email: parsed.data.email };
}
