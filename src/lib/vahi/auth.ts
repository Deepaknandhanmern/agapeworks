import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import {
  VAHI_SESSION_COOKIE,
  VAHI_SESSION_DURATION_MS,
  createVahiSessionToken,
  verifyVahiSessionToken,
} from "@/lib/vahi/session-token";

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET environment variable is not set.");
  return secret;
}

export async function verifyVahiLogin(email: string, password: string): Promise<string | null> {
  const account = await db.billingAccount.findUnique({ where: { email }, select: { id: true, passwordHash: true } });
  if (!account) return null;
  const valid = await bcrypt.compare(password, account.passwordHash);
  return valid ? account.id : null;
}

export async function createVahiSession(accountId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(VAHI_SESSION_COOKIE, createVahiSessionToken(accountId, getSessionSecret()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: VAHI_SESSION_DURATION_MS / 1000,
  });
}

export async function destroyVahiSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(VAHI_SESSION_COOKIE);
}

/** Cached per-request — returns the logged-in account's id, or null. */
export const getVahiAccountId = cache(async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return verifyVahiSessionToken(cookieStore.get(VAHI_SESSION_COOKIE)?.value, getSessionSecret());
});

/** Guard for every Vahi page/action — redirects to login if not signed in. */
export async function requireVahiAccount(): Promise<string> {
  const accountId = await getVahiAccountId();
  if (!accountId) redirect("/vahi/login");
  return accountId;
}
