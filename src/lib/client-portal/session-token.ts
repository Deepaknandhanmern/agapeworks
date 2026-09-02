// Client-portal tokens - parallel to src/lib/session-token.ts (admin) and
// src/lib/vahi/session-token.ts (Vahi), kept separate because this is
// per-email (not per-admin, not per-billing-account) and passwordless, so it
// needs a second, short-lived token type for the magic link itself on top of
// the usual session cookie. Same HMAC approach so proxy.ts can verify the
// session without framework imports.
//
// A raw email cannot sit next to the "." delimiter every token here uses - // most real addresses contain a "." (in the local part or the domain), which
// would break `token.split(".")` parsing. The email segment is base64url
// (RFC 4648 §5, alphabet A-Za-z0-9-_, no ".") encoded before signing and
// decoded after the signature check passes, for both token types below.
import { createHmac, timingSafeEqual } from "crypto";

export const CLIENT_SESSION_COOKIE = "client_session";
const CLIENT_SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
const MAGIC_LINK_DURATION_MS = 1000 * 60 * 15; // 15 minutes

const SESSION_PURPOSE = "client_session";
const MAGIC_LINK_PURPOSE = "client_magic";

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

function encodeEmail(email: string): string {
  return Buffer.from(email, "utf8").toString("base64url");
}

function decodeEmail(encoded: string): string | null {
  try {
    return Buffer.from(encoded, "base64url").toString("utf8");
  } catch {
    return null;
  }
}

/**
 * Verifies signature + expiry on a `${purpose}.${emailB64}.${expires}` token
 * and returns the decoded email, or null. Shared by both token types below - * the purpose prefix keeps a magic-link token from ever verifying as a
 * session token (or vice versa) even though they'd otherwise share a shape.
 */
function verify(token: string | undefined, secret: string, expectedPurpose: string): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [purpose, emailB64, expiresStr, signature] = parts;
  if (purpose !== expectedPurpose) return null;

  const payload = `${purpose}.${emailB64}.${expiresStr}`;
  const expectedSignature = sign(payload, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() >= expires) return null;

  return decodeEmail(emailB64);
}

export function createClientSessionToken(email: string, secret: string): string {
  const expires = Date.now() + CLIENT_SESSION_DURATION_MS;
  const payload = `${SESSION_PURPOSE}.${encodeEmail(email)}.${expires}`;
  return `${payload}.${sign(payload, secret)}`;
}

/** Returns the session's email if the token is valid and unexpired, else null. */
export function verifyClientSessionToken(token: string | undefined, secret: string): string | null {
  return verify(token, secret, SESSION_PURPOSE);
}

export function createMagicLinkToken(email: string, secret: string): string {
  const expires = Date.now() + MAGIC_LINK_DURATION_MS;
  const payload = `${MAGIC_LINK_PURPOSE}.${encodeEmail(email)}.${expires}`;
  return `${payload}.${sign(payload, secret)}`;
}

/** Returns the linked email if the magic-link token is valid and unexpired, else null. */
export function verifyMagicLinkToken(token: string | undefined, secret: string): string | null {
  return verify(token, secret, MAGIC_LINK_PURPOSE);
}

export { CLIENT_SESSION_DURATION_MS };
