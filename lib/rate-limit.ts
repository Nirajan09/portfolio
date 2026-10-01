type Entry = { count: number; resetAt: number };

const hits = new Map<string, Entry>();

/**
 * Fixed-window, in-memory limiter. Good enough to blunt a single abusive
 * client. On serverless hosts memory is per-instance, so use a shared store
 * (e.g. Upstash/Redis) if you need strict global limits.
 */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000,
): { allowed: boolean; retryAfter: number } {
  const now = Date.now();

  if (hits.size > 500) {
    for (const [k, entry] of hits) if (entry.resetAt <= now) hits.delete(k);
  }

  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  if (entry.count >= limit) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { allowed: true, retryAfter: 0 };
}