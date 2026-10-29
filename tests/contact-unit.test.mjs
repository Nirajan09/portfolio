import test, { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Unit Test Suite for Contact Form Security & Validation Logic
 * Uses Node.js native test runner (node --test) - Zero extra dependencies required.
 */

// Mirroring the exact logic & regex defined in lib/contact.ts and lib/rate-limit.ts
const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  messageMin: 10,
  message: 2000,
};

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const stripCRLF = (str) =>
  typeof str === "string" ? str.replace(/[\r\n\t]+/g, " ").trim() : "";

function validateContact(raw) {
  const source = typeof raw === "object" && raw !== null ? raw : {};
  const read = (key) =>
    typeof source[key] === "string" ? source[key].trim() : "";

  const data = {
    name: stripCRLF(read("name")),
    email: stripCRLF(read("email")),
    subject: stripCRLF(read("subject")),
    message: read("message"),
  };

  const errors = {};

  if (!data.name) {
    errors.name = "Please enter your name.";
  } else if (data.name.length > CONTACT_LIMITS.name) {
    errors.name = `Name must be ${CONTACT_LIMITS.name} characters or fewer.`;
  }

  if (!data.email) {
    errors.email = "Please enter your email address.";
  } else if (
    data.email.length > CONTACT_LIMITS.email ||
    !EMAIL_PATTERN.test(data.email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.subject) {
    errors.subject = "Please enter a subject.";
  } else if (data.subject.length > CONTACT_LIMITS.subject) {
    errors.subject = `Subject must be ${CONTACT_LIMITS.subject} characters or fewer.`;
  }

  if (!data.message) {
    errors.message = "Please write a message.";
  } else if (data.message.length < CONTACT_LIMITS.messageMin) {
    errors.message = `Please write at least ${CONTACT_LIMITS.messageMin} characters.`;
  } else if (data.message.length > CONTACT_LIMITS.message) {
    errors.message = `Message must be ${CONTACT_LIMITS.message} characters or fewer.`;
  }

  return Object.keys(errors).length > 0
    ? { ok: false, errors }
    : { ok: true, data };
}

function createRateLimiter(limit = 5, windowMs = 600000) {
  const hits = new Map();
  return function rateLimit(key) {
    const now = Date.now();
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfter: 0 };
    }
    if (entry.count >= limit) {
      return {
        allowed: false,
        retryAfter: Math.ceil((entry.resetAt - now) / 1000),
      };
    }
    entry.count += 1;
    return { allowed: true, retryAfter: 0 };
  };
}

describe("Contact Security & Sanitization Unit Tests", () => {
  describe("CRLF Injection Prevention (stripCRLF)", () => {
    it("should strip \\r and \\n linebreaks from name inputs", () => {
      const maliciousName = "Jane Doe\r\nBcc: hacker@victim.com";
      const sanitized = stripCRLF(maliciousName);
      assert.strictEqual(sanitized, "Jane Doe Bcc: hacker@victim.com");
      assert.strictEqual(sanitized.includes("\r"), false);
      assert.strictEqual(sanitized.includes("\n"), false);
    });

    it("should strip multiple consecutive newlines and carriage returns", () => {
      const maliciousSubject = "Urgent Request\r\n\r\nInjected Header: Value";
      const sanitized = stripCRLF(maliciousSubject);
      assert.strictEqual(sanitized, "Urgent Request Injected Header: Value");
    });

    it("should trim surrounding whitespace and tabs", () => {
      const input = "\t  John Smith \n\r ";
      const sanitized = stripCRLF(input);
      assert.strictEqual(sanitized, "John Smith");
    });
  });

  describe("RFC 5322 Email Validation", () => {
    it("should accept valid standard email formats", () => {
      const validEmails = [
        "nirajantiwari09@gmail.com",
        "developer.pro+filter@sub.domain.co",
        "user_name-123@domain.org",
        "first.last@company.io",
      ];
      for (const email of validEmails) {
        assert.strictEqual(
          EMAIL_PATTERN.test(email),
          true,
          `Expected ${email} to be valid`
        );
      }
    });

    it("should reject malicious, malformed, or injected email strings", () => {
      const invalidEmails = [
        "plainaddress",
        "@missing-local.com",
        "missing-domain@",
        "user@domain..com",
        "user@.domain.com",
        "user@-domain.com",
        "user@domain.com\r\nBcc: victim@target.com",
        "two@@emails.com",
        "spaces in@address.com",
      ];
      for (const email of invalidEmails) {
        assert.strictEqual(
          EMAIL_PATTERN.test(email),
          false,
          `Expected ${email} to be invalid`
        );
      }
    });
  });

  describe("Field Boundary Limits", () => {
    const validBase = {
      name: "Nirajan Tiwari",
      email: "nirajan@example.com",
      subject: "Collaboration Inquiry",
      message: "Hello Nirajan, I would like to discuss a project with you.",
    };

    it("should accept valid payload within limits", () => {
      const result = validateContact(validBase);
      assert.strictEqual(result.ok, true);
    });

    it("should reject name exceeding 80 characters", () => {
      const result = validateContact({
        ...validBase,
        name: "A".repeat(81),
      });
      assert.strictEqual(result.ok, false);
      assert.match(result.errors.name, /80 characters/);
    });

    it("should reject subject exceeding 120 characters", () => {
      const result = validateContact({
        ...validBase,
        subject: "S".repeat(121),
      });
      assert.strictEqual(result.ok, false);
      assert.match(result.errors.subject, /120 characters/);
    });

    it("should reject message shorter than 10 characters", () => {
      const result = validateContact({
        ...validBase,
        message: "Hi!",
      });
      assert.strictEqual(result.ok, false);
      assert.match(result.errors.message, /at least 10 characters/);
    });

    it("should reject message exceeding 2000 characters", () => {
      const result = validateContact({
        ...validBase,
        message: "M".repeat(2001),
      });
      assert.strictEqual(result.ok, false);
      assert.match(result.errors.message, /2000 characters/);
    });
  });

  describe("In-Memory Rate Limiter Mechanics", () => {
    it("should allow up to 5 requests within window and reject 6th request", () => {
      const rateLimit = createRateLimiter(5, 600000);
      const testIp = "192.0.2.42";

      for (let i = 1; i <= 5; i++) {
        const res = rateLimit(testIp);
        assert.strictEqual(res.allowed, true, `Request #${i} should be allowed`);
        assert.strictEqual(res.retryAfter, 0);
      }

      const blockedRes = rateLimit(testIp);
      assert.strictEqual(blockedRes.allowed, false, "Request #6 must be blocked");
      assert.ok(blockedRes.retryAfter > 0, "Retry-After must be positive seconds");
    });

    it("should isolate limits between different IP addresses", () => {
      const rateLimit = createRateLimiter(5, 600000);
      const ipA = "192.0.2.100";
      const ipB = "192.0.2.200";

      // Exhaust IP A
      for (let i = 1; i <= 5; i++) {
        rateLimit(ipA);
      }
      assert.strictEqual(rateLimit(ipA).allowed, false);

      // IP B should still be allowed
      assert.strictEqual(rateLimit(ipB).allowed, true);
    });
  });
});
