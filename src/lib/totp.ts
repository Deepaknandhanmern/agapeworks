// RFC 6238 TOTP (the algorithm behind Google Authenticator/Authy/1Password),
// built on RFC 4226 HOTP — implemented with Node's built-in `crypto` rather
// than a new dependency, matching how session-token.ts/vahi/session-token.ts
// already hand-roll HMAC-based tokens in this codebase. Framework-free so it
// has no dependency on anything but `crypto`.
import { createHmac, timingSafeEqual, randomBytes } from "crypto";

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const STEP_SECONDS = 30;
const DIGITS = 6;

function base32Decode(secret: string): Buffer {
  const cleaned = secret.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = "";
  for (const char of cleaned) {
    const value = BASE32_ALPHABET.indexOf(char);
    if (value === -1) continue;
    bits += value.toString(2).padStart(5, "0");
  }
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return Buffer.from(bytes);
}

function base32Encode(buffer: Buffer): string {
  let bits = "";
  for (const byte of buffer) bits += byte.toString(2).padStart(8, "0");
  let output = "";
  for (let i = 0; i + 5 <= bits.length; i += 5) {
    output += BASE32_ALPHABET[parseInt(bits.slice(i, i + 5), 2)];
  }
  // Trailing bits shorter than 5 are dropped, matching standard base32 without padding.
  return output;
}

function hotp(secret: string, counter: number): string {
  const key = base32Decode(secret);
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigUInt64BE(BigInt(counter));

  const hash = createHmac("sha1", key).update(counterBuffer).digest();
  const offset = hash[hash.length - 1] & 0x0f;
  const binary =
    ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff);

  return (binary % 10 ** DIGITS).toString().padStart(DIGITS, "0");
}

export function generateTotp(secret: string, at: number = Date.now()): string {
  const counter = Math.floor(at / 1000 / STEP_SECONDS);
  return hotp(secret, counter);
}

/** Accepts a code from the current step or one step before/after, to tolerate clock drift. */
export function verifyTotp(secret: string, code: string, window = 1): boolean {
  const cleaned = code.trim();
  if (!/^\d{6}$/.test(cleaned)) return false;

  const counter = Math.floor(Date.now() / 1000 / STEP_SECONDS);
  for (let offset = -window; offset <= window; offset++) {
    const expected = hotp(secret, counter + offset);
    const a = Buffer.from(cleaned);
    const b = Buffer.from(expected);
    if (a.length === b.length && timingSafeEqual(a, b)) return true;
  }
  return false;
}

/** For the one-off setup script only — generates a new random secret. */
export function generateTotpSecret(): string {
  return base32Encode(randomBytes(20));
}

/** For the one-off setup script only — the URI most authenticator apps can import directly. */
export function buildOtpauthUri(secret: string, accountLabel = "admin"): string {
  const issuer = "Agape Works";
  return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountLabel)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&digits=${DIGITS}&period=${STEP_SECONDS}`;
}
