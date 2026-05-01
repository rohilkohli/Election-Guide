/**
 * Lightweight in-memory rate limiter for the /api/chat endpoint.
 *
 * Tracks the number of requests per IP address within a rolling window.
 * Old entries are pruned lazily on every call to keep memory bounded.
 *
 * This is intentionally simple — suitable for a single-process Next.js
 * server.  For a multi-instance deployment, swap the Map for a Redis-backed
 * store.
 */

interface RateLimitRecord {
  count: number;
  windowStart: number;
}

const store = new Map<string, RateLimitRecord>();

/** Maximum requests allowed per IP within the window. */
export const RATE_LIMIT_MAX = 20;
/** Rolling window duration in milliseconds (1 minute). */
export const RATE_LIMIT_WINDOW_MS = 60_000;

/**
 * Returns `true` when the caller is within the allowed rate and increments
 * their counter; returns `false` when they have exceeded the limit.
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Lazy prune: remove entries whose window has expired.
  for (const [key, record] of store.entries()) {
    if (now - record.windowStart >= RATE_LIMIT_WINDOW_MS) {
      store.delete(key);
    }
  }

  const record = store.get(ip);

  if (!record) {
    store.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (now - record.windowStart >= RATE_LIMIT_WINDOW_MS) {
    // Window has rolled over — reset.
    store.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count += 1;
  return true;
}
