// Account-scoped session tokens for Vahi - parallel to src/lib/session-token.ts
// (the admin dashboard's), kept separate because Vahi has many accounts
// (one per business) instead of one shared admin password. Same HMAC
// approach so proxy.ts can verify it without framework imports.
import { createHmac, timingSafeEqual } from "crypto";

export const VAHI_SESSION_COOKIE = "vahi_session";
export const VAHI_SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createVahiSessionToken(accountId: string, secret: string): string {
  const expires = Date.now() + VAHI_SESSION_DURATION_MS;
  const payload = `${accountId}.${expires}`;
  return `${payload}.${sign(payload, secret)}`;
}

/** Returns the accountId if the token is valid and unexpired, else null. */
export function verifyVahiSessionToken(token: string | undefined, secret: string): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [accountId, expiresStr, signature] = parts;
  const payload = `${accountId}.${expiresStr}`;

  const expectedSignature = sign(payload, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() >= expires) return null;

  return accountId;
}
