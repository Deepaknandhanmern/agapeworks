"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";
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

// Both login steps are rate limited per client IP. 8 attempts per 10 minutes
// is far above what a real admin needs (a typo or two) and far below what a
// password guessing run needs to be useful.
const LOGIN_LIMIT = { limit: 8, windowMs: 10 * 60 * 1000 };

async function clientKey(step: string): Promise<string> {
  const h = await headers();
  // Left-most X-Forwarded-For entry is the original client; falls back to a
  // shared bucket when there's no proxy header, which is strictly safer
  // (everyone shares one limit) than trusting a spoofable value blindly.
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip")?.trim() || "unknown";
  return `${step}:${ip}`;
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

  const key = await clientKey("login");
  const limit = checkRateLimit(key, LOGIN_LIMIT);
  if (!limit.ok) {
    return {
      error: `Too many attempts. Try again in ${Math.ceil(limit.retryAfterSeconds / 60)} minute(s).`,
    };
  }

  const valid = await verifyPassword(password);
  if (!valid) {
    return { error: "Incorrect password." };
  }

  resetRateLimit(key);

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

  // Rate limited separately from the password step - a 6-digit code is only
  // a million possibilities, so unlimited guesses would defeat the point of
  // the second factor entirely.
  const key = await clientKey("totp");
  const limit = checkRateLimit(key, LOGIN_LIMIT);
  if (!limit.ok) {
    return {
      error: `Too many attempts. Try again in ${Math.ceil(limit.retryAfterSeconds / 60)} minute(s).`,
    };
  }

  if (!verifyTotpCode(code)) {
    return { error: "Incorrect or expired code." };
  }

  resetRateLimit(key);
  await destroyPendingTotpSession();
  await createSession();
  redirect(next);
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/dashboard/login");
}
