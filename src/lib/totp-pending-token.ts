// Proves "the admin password step already passed" for the ~5 minutes it
// takes to open an authenticator app and type a code - separate cookie,
// separate name, short expiry, so it can never be mistaken for (or replayed
// as) the real admin session token in src/lib/session-token.ts.
import { createHmac, timingSafeEqual } from "crypto";

export const TOTP_PENDING_COOKIE = "agape_admin_2fa_pending";
const PENDING_DURATION_MS = 1000 * 60 * 5; // 5 minutes

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createPendingToken(secret: string): string {
  const expires = Date.now() + PENDING_DURATION_MS;
  const payload = `pending.${expires}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function isValidPendingToken(token: string | undefined, secret: string): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [tag, expiresStr, signature] = parts;
  if (tag !== "pending") return false;

  const payload = `${tag}.${expiresStr}`;
  const expectedSignature = sign(payload, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expires = Number(expiresStr);
  return Number.isFinite(expires) && Date.now() < expires;
}

export { PENDING_DURATION_MS };
