import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  CLIENT_SESSION_COOKIE,
  CLIENT_SESSION_DURATION_MS,
  createClientSessionToken,
  verifyClientSessionToken,
} from "./session-token";

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET environment variable is not set.");
  return secret;
}

/** Canonical form stored in the session and matched against `ClientProject.clientEmail`. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function createClientSession(email: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CLIENT_SESSION_COOKIE, createClientSessionToken(normalizeEmail(email), getSessionSecret()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CLIENT_SESSION_DURATION_MS / 1000,
  });
}

export async function destroyClientSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CLIENT_SESSION_COOKIE);
}

/** Cached per-request - returns the signed-in client's normalized email, or null. */
export const getClientEmail = cache(async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return verifyClientSessionToken(cookieStore.get(CLIENT_SESSION_COOKIE)?.value, getSessionSecret());
});

/** Guard for every client-portal page - redirects to /signin if not signed in. */
export async function requireClientEmail(): Promise<string> {
  const email = await getClientEmail();
  if (!email) redirect("/signin");
  return email;
}
