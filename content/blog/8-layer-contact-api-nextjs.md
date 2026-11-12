---
title: "Building an 8-Layer Defensive Contact API in Next.js Without Annoying CAPTCHAs"
summary: "How I protected a serverless Next.js contact endpoint against CSRF, header injection, flood spam, and cloud IP blocks using layered HTTP checks and browser-direct delivery."
publishedAt: "2026-11-12"
category: "Backend & Security"
tags:
  - "Next.js"
  - "TypeScript"
  - "API Security"
  - "Rate Limiting"
featured: true
---

Public contact forms are magnets for automated abuse. Drop an unprotected `POST /api/contact` route onto the internet and within days you will see scripted spam, oversized payloads, cross-origin form posts, and CRLF header injection attempts.

The common shortcut is slapping a visual CAPTCHA widget in front of visitors. Instead of degrading UX for legitimate recruiters and clients, I designed the contact route on this portfolio as an **8-layer defensive funnel** in Next.js App Router — zero puzzles required for humans.

## Why Layered Defense Matters on Serverless

A single validation check is rarely enough because different attacks target different layers of your server stack:

- **Cross-site requests** abuse browsers where cookies or ambient authority exist.
- **Large unparsed JSON payloads** waste serverless execution time and memory before field checks even run.
- **Instant bot submissions** bypass naive HTML `required` attributes completely.
- **CRLF sequences** (`\r\n`) attempt to inject extra headers into downstream email relays.

Ordering checks from **cheapest to most expensive** ensures abusive traffic is rejected at the edge of the handler before parsing bodies or allocating validation objects.

## Request Funnel Architecture

Every `POST` request hitting `app/api/contact/route.ts` must clear these checks in sequence:

| Stage | Verification Check | Rejection / Outcome |
| :--- | :--- | :--- |
| 1 | `Content-Type` contains `application/json` | `415 Unsupported Media Type` |
| 2 | `Sec-Fetch-Site` (`same-origin`) or `Origin` host match | `403 Forbidden` |
| 3 | Multi-proxy IP resolution + fixed-window rate limiter | `429 Too Many Requests` + `Retry-After` |
| 4 | Raw body character cap (`10,000` chars max) | `413 Payload Too Large` |
| 5 | Safe `JSON.parse` wrapper | `400 Bad Request` |
| 6 | Invisible honeypot field (`website`) must be empty | Silent `200 OK` (no dispatch) |
| 7 | Human completion time check (`>= 1500 ms`) | Silent `200 OK` (no dispatch) |
| 8 | Strict field schema + CRLF stripping | `400 Bad Request` or sanitized handoff |

Notice stages 6 and 7: when a bot fills a hidden honeypot field or submits in under 1.5 seconds, returning a fake `200 OK` prevents the scraper from tuning its payload or retrying aggressively.

## Multi-Proxy IP Resolution & Fixed-Window Rate Limiting

On cloud platforms like Vercel or behind Cloudflare, relying blindly on one IP header can misidentify every visitor as `unknown` or lock out legitimate users behind shared proxies. The route resolves the client address across standard forwarding headers before calling [`rateLimit`](https://github.com/Nirajan09/portfolio):

```ts title="lib/rate-limit.ts"
type Entry = { count: number; resetAt: number };

const hits = new Map<string, Entry>();

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
```

### Tradeoff: In-Memory vs. Distributed Stores

Because warm serverless instances retain module scope briefly between requests, an in-memory `Map` with opportunistic pruning (`hits.size > 500`) stops burst abuse from a single client with **zero external Redis latency or billing overhead**. Once multi-region strict enforcement becomes necessary, the `rateLimit(key)` function boundary can be swapped for Upstash Redis without changing a single line in the API route.

## Shared Schema Validation & CRLF Sanitization

Both the browser UI and the server endpoint share identical field validation logic in `lib/contact.ts`:

- **No silent discrepancy**: Client feedback matches exact server enforcement rules.
- **CRLF stripping**: Single-line fields (`name`, `email`, `subject`) strip carriage returns and newlines to eliminate email header injection vectors.
- **Every response disables caching**: Failures and successes both return `Cache-Control: no-store` so intermediary proxies never cache private submissions or rate-limit responses.

## Solving Free-Tier Cloud IP Blocks with Browser-Direct Dispatch

One subtle failure mode when integrating email relays like **Web3Forms** inside serverless routes is that shared cloud IP ranges (AWS/Vercel) frequently trigger upstream anti-bot heuristics when called from the backend.

To solve this reliably without sacrificing server-side security guarantees:

1. The browser sends the payload to `POST /api/contact`.
2. Next.js runs all 8 security checks, sanitizes every string, and verifies timing/rate limits.
3. Once verified, the API returns the authorized sanitized payload to the client, which dispatches the final `POST` directly from the visitor's browser session.

All critical invariants stay enforced inside the route handler, while email delivery inherits the visitor's legitimate network reputation.

## Key Takeaways

- **Defense in depth doesn't require friction**: Combining `Sec-Fetch-Site`, body caps, honeypots, timing heuristics, and rate limiting stops scripted abuse before a human ever notices anything.
- **Verify your security boundaries automatically**: Every layer in `/api/contact` is covered by native `node --test` unit tests and an automated HTTP integration script so regressions get caught immediately.
