import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Unit Test Suite for Contact Form Security & Validation Logic
 * Uses Node.js native test runner (node --test) - Zero extra dependencies required.
 */

// Mirroring the exact logic & regex defined in lib/contact.ts and lib/rate-limit.ts
const CONTACT_LIMITS = {
  nameMin: 2,
  name: 80,
  email: 254,
  subjectMin: 3,
  subject: 120,
  messageMin: 10,
  message: 2000,
};

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const stripCRLF = (str) =>
  typeof str === "string" ? str.replace(/[\r\n\t]+/g, " ").trim() : "";

function validateField(field, value) {
  const clean = field === "message" ? (typeof value === "string" ? value.trim() : "") : stripCRLF(value);

  switch (field) {
    case "name": {
      if (!clean) return "Please enter your name.";
      if (clean.length < CONTACT_LIMITS.nameMin) {
        return `Name must be at least ${CONTACT_LIMITS.nameMin} characters.`;
      }
      if (clean.length > CONTACT_LIMITS.name) {
        return `Name must be ${CONTACT_LIMITS.name} characters or fewer.`;
      }
      if (/\d/.test(clean)) {
        return "Name cannot contain numbers.";
      }
      if (/[^\p{L}\s.'-]/u.test(clean)) {
        return "Name can only contain letters, spaces, hyphens, and apostrophes.";
      }
      if (!/^[\p{L}]/u.test(clean)) {
        return "Name must start with a letter.";
      }
      const letters = (clean.match(/\p{L}/gu) || []).length;
      if (letters < CONTACT_LIMITS.nameMin) {
        return `Name must contain at least ${CONTACT_LIMITS.nameMin} letters.`;
      }
      return undefined;
    }

    case "email": {
      if (!clean) return "Please enter your email address.";
      if (clean.length > CONTACT_LIMITS.email) {
        return `Email must be ${CONTACT_LIMITS.email} characters or fewer.`;
      }
      if (/\s/.test(clean)) {
        return "Email address cannot contain spaces.";
      }
      if (!clean.includes("@")) {
        return "Email address must include an '@' symbol.";
      }
      const parts = clean.split("@");
      if (parts.length !== 2 || !parts[0] || !parts[1]) {
        return "Please enter a valid email address.";
      }
      const domain = parts[1];
      if (!domain.includes(".")) {
        return "Email domain must include a top-level domain (e.g. .com).";
      }
      if (!EMAIL_PATTERN.test(clean)) {
        return "Please enter a valid email address.";
      }
      return undefined;
    }

    case "subject": {
      if (!clean) return "Please enter a subject.";
      if (clean.length < CONTACT_LIMITS.subjectMin) {
        return `Subject must be at least ${CONTACT_LIMITS.subjectMin} characters.`;
      }
      if (clean.length > CONTACT_LIMITS.subject) {
        return `Subject must be ${CONTACT_LIMITS.subject} characters or fewer.`;
      }
      if (/<[^>]*>/.test(clean)) {
        return "Subject cannot contain HTML tags.";
      }
      const letters = (clean.match(/\p{L}/gu) || []).length;
      if (letters < 2) {
        if (/^\d+$/.test(clean)) {
          return "Subject cannot contain only numbers.";
        }
        return "Subject must contain meaningful text.";
      }
      return undefined;
    }

    case "message": {
      if (!clean) return "Please write a message.";
      if (clean.length < CONTACT_LIMITS.messageMin) {
        return `Please write at least ${CONTACT_LIMITS.messageMin} characters.`;
      }
      if (clean.length > CONTACT_LIMITS.message) {
        return `Message must be ${CONTACT_LIMITS.message} characters or fewer.`;
      }
      if (/<script/i.test(clean)) {
        return "Message cannot contain script tags.";
      }
      const letters = (clean.match(/\p{L}/gu) || []).length;
      if (letters < 5) {
        if (/^[\d\s.,!?-]+$/.test(clean)) {
          return "Message cannot contain only numbers.";
        }
        return "Message must contain meaningful text.";
      }
      return undefined;
    }
  }
}

function isFieldValid(field, value) {
  if (!value || typeof value !== "string" || value.trim().length === 0) return false;
  return validateField(field, value) === undefined;
}

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

  for (const field of ["name", "email", "subject", "message"]) {
    const error = validateField(field, data[field]);
    if (error) {
      errors[field] = error;
    }
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

    it("should reject name shorter than 2 characters", () => {
      const result = validateContact({
        ...validBase,
        name: "A",
      });
      assert.strictEqual(result.ok, false);
      assert.match(result.errors.name, /at least 2 characters/);
    });

    it("should reject name containing numeric digits", () => {
      const result = validateContact({
        ...validBase,
        name: "John123",
      });
      assert.strictEqual(result.ok, false);
      assert.match(result.errors.name, /cannot contain numbers/);
    });

    it("should reject name containing special symbols or punctuation", () => {
      const result = validateContact({
        ...validBase,
        name: "John@Doe#",
      });
      assert.strictEqual(result.ok, false);
      assert.match(result.errors.name, /letters, spaces, hyphens/);
    });

    it("should reject name not starting with a letter", () => {
      const result = validateContact({
        ...validBase,
        name: "-John",
      });
      assert.strictEqual(result.ok, false);
      assert.match(result.errors.name, /start with a letter/);
    });

    it("should accept valid international names with hyphens and apostrophes", () => {
      const names = ["Al", "René", "Jean-Luc", "O'Connor", "李明", "Dr. Smith"];
      for (const name of names) {
        assert.strictEqual(
          isFieldValid("name", name),
          true,
          `Expected "${name}" to be valid`,
        );
      }
    });

    it("should reject name exceeding 80 characters", () => {
      const result = validateContact({
        ...validBase,
        name: "A".repeat(81),
      });
      assert.strictEqual(result.ok, false);
      assert.match(result.errors.name, /80 characters/);
    });

    it("should reject subject shorter than 3 characters", () => {
      const result = validateContact({
        ...validBase,
        subject: "Hi",
      });
      assert.strictEqual(result.ok, false);
      assert.match(result.errors.subject, /at least 3 characters/);
    });

    it("should reject subject containing only numbers", () => {
      const result = validateContact({
        ...validBase,
        subject: "12345",
      });
      assert.strictEqual(result.ok, false);
      assert.match(result.errors.subject, /cannot contain only numbers/);
    });

    it("should reject subject containing HTML tags", () => {
      const result = validateContact({
        ...validBase,
        subject: "<script>alert(1)</script>",
      });
      assert.strictEqual(result.ok, false);
      assert.match(result.errors.subject, /cannot contain HTML tags/);
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

    it("should reject message containing only numbers", () => {
      const result = validateContact({
        ...validBase,
        message: "123456789012345",
      });
      assert.strictEqual(result.ok, false);
      assert.match(result.errors.message, /cannot contain only numbers/);
    });

    it("should reject message containing script tags", () => {
      const result = validateContact({
        ...validBase,
        message: "Check this out <script>alert('xss')</script>",
      });
      assert.strictEqual(result.ok, false);
      assert.match(result.errors.message, /cannot contain script tags/);
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

  describe("Real-time isFieldValid (Green Tick Indicator) Precision", () => {
    it("should never show green tick for single characters in name or subject", () => {
      assert.strictEqual(isFieldValid("name", "N"), false);
      assert.strictEqual(isFieldValid("name", " "), false);
      assert.strictEqual(isFieldValid("name", "12"), false);
      assert.strictEqual(isFieldValid("name", "Ni"), true);

      assert.strictEqual(isFieldValid("subject", "H"), false);
      assert.strictEqual(isFieldValid("subject", "Hi"), false);
      assert.strictEqual(isFieldValid("subject", "Hey"), true);
    });

    it("should never show green tick for names with numbers or symbols", () => {
      assert.strictEqual(isFieldValid("name", "John123"), false);
      assert.strictEqual(isFieldValid("name", "Nirajan99"), false);
      assert.strictEqual(isFieldValid("name", "Alex@Smith"), false);
      assert.strictEqual(isFieldValid("name", "John Doe"), true);
      assert.strictEqual(isFieldValid("name", "Jean-Luc"), true);
      assert.strictEqual(isFieldValid("name", "O'Connor"), true);
    });

    it("should never show green tick for incomplete or malformed emails", () => {
      assert.strictEqual(isFieldValid("email", "n"), false);
      assert.strictEqual(isFieldValid("email", "nirajan@"), false);
      assert.strictEqual(isFieldValid("email", "nirajan@gmail"), false);
      assert.strictEqual(isFieldValid("email", "nirajan@gmail."), false);
      assert.strictEqual(isFieldValid("email", "nirajan @gmail.com"), false);
      assert.strictEqual(isFieldValid("email", "nirajan@gmail.com"), true);
    });

    it("should never show green tick for subjects with only numbers or symbols", () => {
      assert.strictEqual(isFieldValid("subject", "12345"), false);
      assert.strictEqual(isFieldValid("subject", "???!!!"), false);
      assert.strictEqual(isFieldValid("subject", "Project inquiry 2026"), true);
    });

    it("should accurately reflect message validity without allowing purely numeric messages", () => {
      assert.strictEqual(isFieldValid("message", "short"), false);
      assert.strictEqual(isFieldValid("message", "123456789012345"), false);
      assert.strictEqual(isFieldValid("message", "Hello Nirajan, let us collaborate on a project!"), true);
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
