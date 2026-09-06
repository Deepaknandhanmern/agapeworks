import "server-only";

/**
 * Small in-process sliding-window rate limiter, used to stop the admin login
 * from accepting unlimited password guesses.
 *
 * Deliberately in-memory: this app runs as a single long-lived Node process,
 * and a shared store (Redis/Postgres) would be a new dependency for one
 * counter. The tradeoff is that counters reset on deploy and aren't shared
 * across instances - if this is ever scaled horizontally, this needs to move
 * to shared storage or the limit becomes per-instance.
 */

type Entry = { hits: number[] };

const buckets = new Map<string, Entry>();

// Keeps the Map from growing without bound if it's hit with many distinct
// keys (spoofed X-Forwarded-For, say). Evicts the oldest entries first.
const MAX_KEYS = 5_000;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function checkRateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  const cutoff = now - windowMs;

  let entry = buckets.get(key);
  if (!entry) {
    if (buckets.size >= MAX_KEYS) {
      const oldest = buckets.keys().next();
      if (!oldest.done) buckets.delete(oldest.value);
    }
    entry = { hits: [] };
    buckets.set(key, entry);
  }

  entry.hits = entry.hits.filter((t) => t > cutoff);

  if (entry.hits.length >= limit) {
    const oldestHit = entry.hits[0];
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((oldestHit + windowMs - now) / 1000)),
    };
  }

  entry.hits.push(now);
  return { ok: true, remaining: limit - entry.hits.length, retryAfterSeconds: 0 };
}

/** Clears a key's counter - call after a successful login so one bad day
 *  of typos doesn't keep locking out a legitimate admin. */
export function resetRateLimit(key: string): void {
  buckets.delete(key);
}
