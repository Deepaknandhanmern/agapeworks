// Pure crypto helpers with no framework imports, so both the auth DAL
// (src/lib/auth.ts, Server Components/Actions) and proxy.ts (the request
// gate, which shouldn't depend on next/headers or React APIs) can verify a
// session cookie the same way without duplicating the HMAC logic.
import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "agape_admin_session";
export const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionToken(secret: string): string {
  const expires = Date.now() + SESSION_DURATION_MS;
  const payload = `${expires}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function isValidSessionToken(token: string | undefined, secret: string): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expectedSignature = sign(payload, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expires = Number(payload);
  return Number.isFinite(expires) && Date.now() < expires;
}
