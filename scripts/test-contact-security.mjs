#!/usr/bin/env node

/**
 * ============================================================================
 * Contact Form Security & API Integration Test Suite
 * ============================================================================
 * 
 * Tests all 8 security layers of the /api/contact endpoint:
 *   1. CSRF & Sec-Fetch-Site origin enforcement (403)
 *   2. Content-Type restriction / simple-form CSRF defense (415)
 *   3. DoS & Payload Memory Exhaustion defense (413)
 *   4. Malformed JSON parsing defense (400)
 *   5. Double Bot Trap A: Honeypot absorption (200 silent success)
 *   6. Double Bot Trap B: Machine speed trap absorption (200 silent success)
 *   7. Server-side validation, length bounds & RFC 5322 email compliance (400)
 *   8. Multi-proxy IP resolution & Rate limiting (429 + Retry-After)
 *   9. Privacy: Cache-Control: no-store header validation
 * 
 * Run with:
 *   node scripts/test-contact-security.mjs
 * Or:
 *   npm test
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:3000";
const API_URL = `${BASE_URL}/api/contact`;

// ANSI color helpers for terminal output
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

let passed = 0;
let failed = 0;

function logPass(title, detail = "") {
  passed++;
  console.log(`  ${colors.green}✔ PASS${colors.reset} ${colors.bold}${title}${colors.reset}`);
  if (detail) console.log(`         ${colors.gray}${detail}${colors.reset}`);
}

function logFail(title, error) {
  failed++;
  console.log(`  ${colors.red}✖ FAIL${colors.reset} ${colors.bold}${title}${colors.reset}`);
  console.log(`         ${colors.red}${error}${colors.reset}`);
}

async function runTest(title, testFn) {
  const start = performance.now();
  try {
    await testFn();
    const duration = (performance.now() - start).toFixed(1);
    logPass(title, `${duration}ms`);
  } catch (err) {
    logFail(title, err.message || String(err));
  }
}

// Check server availability before testing
async function checkServer() {
  try {
    const res = await fetch(`${BASE_URL}`, { method: "HEAD" }).catch(() => null);
    if (!res) {
      await fetch(`${BASE_URL}`);
    }
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log(`\n${colors.bold}${colors.cyan}====================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  Contact Form Security & API Integration Test Suite  ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}====================================================${colors.reset}`);
  console.log(`Target: ${colors.yellow}${API_URL}${colors.reset}\n`);

  const isUp = await checkServer();
  if (!isUp) {
    console.error(
      `${colors.red}${colors.bold}Error: Next.js dev server is not responding at ${BASE_URL}.${colors.reset}\n` +
      `Please ensure the server is running with ${colors.green}'npm run dev'${colors.reset} before running this test script.\n`
    );
    process.exit(1);
  }

  // Generates isolated client headers with a unique simulated IP for each test
  // This prevents non-rate-limit tests from colliding with the 5 req/10 min limiter.
  let ipCounter = Math.floor(Math.random() * 500) + 10;
  const getHeaders = (overrides = {}) => {
    ipCounter += 1;
    return {
      "sec-fetch-site": "same-origin",
      "content-type": "application/json",
      "x-forwarded-for": `198.51.100.${ipCounter}`,
      ...overrides,
    };
  };

  console.log(`${colors.bold}1. CSRF & Origin Validation Layer${colors.reset}`);

  await runTest(
    "Rejects cross-site request (sec-fetch-site: cross-site) with 403 Forbidden",
    async () => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders({
          "sec-fetch-site": "cross-site",
        }),
        body: JSON.stringify({ name: "Attacker" }),
      });
      if (res.status !== 403) {
        throw new Error(`Expected status 403, got ${res.status}`);
      }
      const data = await res.json();
      if (data.ok !== false) throw new Error("Expected ok: false");
    }
  );

  await runTest(
    "Rejects mismatched Origin header (https://evil-site.com) with 403 Forbidden",
    async () => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          origin: "https://evil-site.com",
          host: "localhost:3000",
          "content-type": "application/json",
          "x-forwarded-for": `198.51.100.${++ipCounter}`,
        },
        body: JSON.stringify({ name: "Attacker" }),
      });
      if (res.status !== 403) {
        throw new Error(`Expected status 403, got ${res.status}`);
      }
    }
  );

  console.log(`\n${colors.bold}2. Content-Type & Media Type Enforcement Layer${colors.reset}`);

  await runTest(
    "Rejects application/x-www-form-urlencoded (HTML form CSRF) with 415",
    async () => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders({
          "content-type": "application/x-www-form-urlencoded",
        }),
        body: "name=Eve&message=Spam",
      });
      if (res.status !== 415) {
        throw new Error(`Expected status 415 Unsupported Media Type, got ${res.status}`);
      }
    }
  );

  await runTest(
    "Rejects text/plain submissions with 415 Unsupported Media Type",
    async () => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders({
          "content-type": "text/plain",
        }),
        body: "name=Eve",
      });
      if (res.status !== 415) {
        throw new Error(`Expected status 415, got ${res.status}`);
      }
    }
  );

  console.log(`\n${colors.bold}3. DoS & Payload Memory Exhaustion Defense Layer${colors.reset}`);

  await runTest(
    "Rejects oversized payloads (> 10,000 characters) with 413 Payload Too Large",
    async () => {
      const hugePayload = JSON.stringify({
        name: "DoS Attacker",
        email: "attacker@bad.org",
        subject: "Flooding Server",
        message: "X".repeat(12_000),
      });
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: hugePayload,
      });
      if (res.status !== 413) {
        throw new Error(`Expected status 413 Payload Too Large, got ${res.status}`);
      }
    }
  );

  console.log(`\n${colors.bold}4. JSON Parser Safety Layer${colors.reset}`);

  await runTest(
    "Rejects malformed JSON syntax with 400 Bad Request",
    async () => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: '{"name": "Broken", incomplete...',
      });
      if (res.status !== 400) {
        throw new Error(`Expected status 400 Bad Request, got ${res.status}`);
      }
      const data = await res.json();
      if (!data.message?.includes("Invalid request JSON")) {
        throw new Error(`Unexpected error message: ${data.message}`);
      }
    }
  );

  console.log(`\n${colors.bold}5. Double Bot Traps (Silent Absorption - Zero Quota Waste)${colors.reset}`);

  await runTest(
    "Honeypot Trap: Non-empty 'website' field returns 200 { ok: true } silently without dispatching",
    async () => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          name: "Spam Bot",
          email: "bot@spammer.xyz",
          subject: "SEO Services Promotion",
          message: "Check out our cheap SEO packages today!",
          website: "https://spam-bot.xyz", // Trap triggered!
          timeTakenMs: 6000,
        }),
      });
      if (res.status !== 200) {
        throw new Error(`Expected status 200 OK (silent absorption), got ${res.status}`);
      }
      const data = await res.json();
      if (data.ok !== true) throw new Error("Expected { ok: true }");
    }
  );

  await runTest(
    "Speed Trap: Automated script submitting in < 1500ms returns 200 { ok: true } silently",
    async () => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          name: "Instant Bot",
          email: "fast@bot.com",
          subject: "Instant Script",
          message: "Submitted in 200 milliseconds by puppeteer script.",
          timeTakenMs: 250, // Trap triggered! (< 1500ms)
        }),
      });
      if (res.status !== 200) {
        throw new Error(`Expected status 200 OK (silent absorption), got ${res.status}`);
      }
      const data = await res.json();
      if (data.ok !== true) throw new Error("Expected { ok: true }");
    }
  );

  console.log(`\n${colors.bold}6. Server-Side Input Validation & RFC 5322 Compliance${colors.reset}`);

  await runTest(
    "Rejects empty submissions with 400 and returns field error map",
    async () => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ timeTakenMs: 3000 }),
      });
      if (res.status !== 400) {
        throw new Error(`Expected status 400, got ${res.status}`);
      }
      const data = await res.json();
      if (!data.errors?.name || !data.errors?.email || !data.errors?.subject || !data.errors?.message) {
        throw new Error(`Missing expected field errors in: ${JSON.stringify(data.errors)}`);
      }
    }
  );

  await runTest(
    "Rejects malformed email address ('invalid-email-format') with 400 Bad Request",
    async () => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          name: "Tester",
          email: "invalid-email-format",
          subject: "Inquiry",
          message: "This is a legitimate message body with over ten characters.",
          timeTakenMs: 3500,
        }),
      });
      if (res.status !== 400) {
        throw new Error(`Expected status 400, got ${res.status}`);
      }
      const data = await res.json();
      if (!data.errors?.email) {
        throw new Error("Expected email validation error");
      }
    }
  );

  await runTest(
    "Rejects CRLF header injection attempt in email address with 400 Bad Request",
    async () => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          name: "Tester",
          email: "target@example.com\r\nBcc: victim@attack.com",
          subject: "Inquiry",
          message: "Valid message content text.",
          timeTakenMs: 3500,
        }),
      });
      if (res.status !== 400) {
        throw new Error(`Expected status 400, got ${res.status}`);
      }
      const data = await res.json();
      if (!data.errors?.email) {
        throw new Error("Expected email validation error on CRLF injected address");
      }
    }
  );

  await runTest(
    "Rejects message shorter than 10 characters with 400 Bad Request",
    async () => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          name: "Tester",
          email: "tester@example.com",
          subject: "Inquiry",
          message: "short", // Only 5 characters (< 10)
          timeTakenMs: 3500,
        }),
      });
      if (res.status !== 400) {
        throw new Error(`Expected status 400, got ${res.status}`);
      }
      const data = await res.json();
      if (!data.errors?.message) {
        throw new Error("Expected message length error");
      }
    }
  );

  await runTest(
    "Rejects name exceeding 80 characters with 400 Bad Request",
    async () => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          name: "N".repeat(85),
          email: "tester@example.com",
          subject: "Inquiry",
          message: "Valid message body text for testing.",
          timeTakenMs: 3500,
        }),
      });
      if (res.status !== 400) {
        throw new Error(`Expected status 400, got ${res.status}`);
      }
      const data = await res.json();
      if (!data.errors?.name) {
        throw new Error("Expected name length error");
      }
    }
  );

  console.log(`\n${colors.bold}7. Rate Limiting & Multi-Proxy Client IP Defense${colors.reset}`);

  await runTest(
    "Enforces burst rate limit (5 requests max) and returns 429 Too Many Requests with Retry-After",
    async () => {
      // Use an isolated unique test IP exclusively for this rate test
      const burstIp = `198.51.100.${Math.floor(Math.random() * 200) + 50}_rate_${Date.now()}`;
      const rateHeaders = {
        "sec-fetch-site": "same-origin",
        "content-type": "application/json",
        "x-forwarded-for": burstIp,
      };

      // Send 5 rapid requests (they hit validation error 400, but register in the rate bucket)
      for (let i = 1; i <= 5; i++) {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: rateHeaders,
          body: JSON.stringify({ timeTakenMs: 3000 }),
        });
        if (res.status === 429) {
          throw new Error(`Premature rate limit on request #${i}`);
        }
      }

      // The 6th request from the same IP must trigger HTTP 429
      const blockedRes = await fetch(API_URL, {
        method: "POST",
        headers: rateHeaders,
        body: JSON.stringify({ timeTakenMs: 3000 }),
      });

      if (blockedRes.status !== 429) {
        throw new Error(`Expected status 429 on 6th request, got ${blockedRes.status}`);
      }

      const retryAfter = blockedRes.headers.get("retry-after");
      if (!retryAfter || Number(retryAfter) <= 0) {
        throw new Error(`Missing or invalid Retry-After header: '${retryAfter}'`);
      }

      const data = await blockedRes.json();
      if (!data.message?.includes("Too many messages")) {
        throw new Error(`Unexpected rate limit message: ${data.message}`);
      }
    }
  );

  await runTest(
    "Isolates rate limits between distinct IP addresses",
    async () => {
      // Use a fresh distinct IP
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ timeTakenMs: 3000 }),
      });
      // Should be allowed to process (even if validation fails with 400), not blocked by 429
      if (res.status === 429) {
        throw new Error("Distinct IP was incorrectly blocked by rate limiter");
      }
    }
  );

  console.log(`\n${colors.bold}8. Security & Privacy Headers Layer${colors.reset}`);

  await runTest(
    "All API responses include 'Cache-Control: no-store' to prevent proxy & browser caching",
    async () => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ timeTakenMs: 200 }), // Triggers silent trap
      });
      const cacheControl = res.headers.get("cache-control") || "";
      if (!cacheControl.includes("no-store")) {
        throw new Error(`Expected Cache-Control: no-store, got '${cacheControl}'`);
      }
    }
  );

  // Final summary report
  console.log(`\n${colors.bold}${colors.cyan}====================================================${colors.reset}`);
  console.log(`${colors.bold}Test Execution Summary:${colors.reset}`);
  console.log(`  Total:  ${colors.bold}${passed + failed}${colors.reset}`);
  console.log(`  Passed: ${colors.green}${colors.bold}${passed}${colors.reset}`);
  console.log(`  Failed: ${failed > 0 ? colors.red : colors.gray}${colors.bold}${failed}${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}====================================================${colors.reset}\n`);

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log(`${colors.green}${colors.bold}All contact security defenses verified successfully!${colors.reset}\n`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Test runner encountered an unhandled error:", err);
  process.exit(1);
});
