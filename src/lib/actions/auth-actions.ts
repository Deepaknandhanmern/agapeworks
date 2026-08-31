"use server";

import { redirect } from "next/navigation";
import {
  createSession,
  destroySession,
  verifyPassword,
  isTotpEnabled,
  createPendingTotpSession,
  destroyPendingTotpSession,
  hasPendingTotpSession,
  verifyTotpCode,
} from "@/lib/auth";

function resolveNext(next: FormDataEntryValue | null): string {
  return typeof next === "string" && next.startsWith("/dashboard") ? next : "/dashboard";
}

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const password = formData.get("password");
  const next = resolveNext(formData.get("next"));

  if (typeof password !== "string" || password.length === 0) {
    return { error: "Enter the password." };
  }

  const valid = await verifyPassword(password);
  if (!valid) {
    return { error: "Incorrect password." };
  }

  if (!isTotpEnabled()) {
    await createSession();
    redirect(next);
  }

  await createPendingTotpSession();
  redirect(`/dashboard/login/verify?next=${encodeURIComponent(next)}`);
}

export async function verifyTotpAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  if (!(await hasPendingTotpSession())) {
    redirect("/dashboard/login");
  }

  const code = formData.get("code");
  const next = resolveNext(formData.get("next"));

  if (typeof code !== "string" || code.length === 0) {
    return { error: "Enter the 6-digit code." };
  }

  if (!verifyTotpCode(code)) {
    return { error: "Incorrect or expired code." };
  }

  await destroyPendingTotpSession();
  await createSession();
  redirect(next);
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/dashboard/login");
}
