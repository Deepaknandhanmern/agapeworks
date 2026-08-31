import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import {
  SESSION_COOKIE,
  SESSION_DURATION_MS,
  createSessionToken,
  isValidSessionToken,
} from "@/lib/session-token";
import { TOTP_PENDING_COOKIE, PENDING_DURATION_MS, createPendingToken, isValidPendingToken } from "@/lib/totp-pending-token";
import { verifyTotp } from "@/lib/totp";

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is not set.");
  }
  return secret;
}

/** Verifies a submitted password against ADMIN_PASSWORD_HASH. */
export async function verifyPassword(password: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    throw new Error("ADMIN_PASSWORD_HASH environment variable is not set.");
  }
  return bcrypt.compare(password, hash);
}

/** Sets the signed session cookie. Call only after verifyPassword succeeds. */
export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(getSessionSecret()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Cached per-request: safe to call from many Server Components/Actions
 * without re-reading cookies() repeatedly.
 */
export const isAuthenticated = cache(async (): Promise<boolean> => {
  const cookieStore = await cookies();
  return isValidSessionToken(cookieStore.get(SESSION_COOKIE)?.value, getSessionSecret());
});

/** Guard for Server Actions — every mutation must call this first. */
export async function requireAuth(): Promise<void> {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

/** 2FA is opt-in — off entirely until this env var is set. */
export function isTotpEnabled(): boolean {
  return !!process.env.ADMIN_TOTP_SECRET;
}

/** Sets the short-lived "password step passed" cookie. Call only after verifyPassword succeeds. */
export async function createPendingTotpSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(TOTP_PENDING_COOKIE, createPendingToken(getSessionSecret()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PENDING_DURATION_MS / 1000,
  });
}

export async function destroyPendingTotpSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(TOTP_PENDING_COOKIE);
}

export async function hasPendingTotpSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return isValidPendingToken(cookieStore.get(TOTP_PENDING_COOKIE)?.value, getSessionSecret());
}

/** Verifies a submitted 6-digit code against ADMIN_TOTP_SECRET. */
export function verifyTotpCode(code: string): boolean {
  const secret = process.env.ADMIN_TOTP_SECRET;
  if (!secret) return false;
  return verifyTotp(secret, code);
}
