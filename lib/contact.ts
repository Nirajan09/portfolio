/** Shared by the form (client) and the API route (server). */

export const CONTACT_LIMITS = {
  nameMin: 2,
  name: 80,
  email: 254,
  subjectMin: 3,
  subject: 120,
  messageMin: 10,
  message: 2000,
} as const;

export const CONTACT_FIELDS = ["name", "email", "subject", "message"] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];
export type ContactInput = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactValidation =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: ContactErrors };

/**
 * RFC 5322 standard email validation regex.
 * Disallows newlines, unescaped spaces, or invalid domain punctuation.
 */
const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/** Helper to sanitize single-line inputs against CRLF email header injection */
export const stripCRLF = (str: string): string =>
  str.replace(/[\r\n\t]+/g, " ").trim();

/**
 * Validates a single contact form field.
 * Returns a specific, user-friendly error message string if invalid, or undefined if valid.
 */
export function validateField(
  field: ContactField,
  value: string,
): string | undefined {
  const clean = field === "message" ? value.trim() : stripCRLF(value);

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

/**
 * Checks if a field has a valid, non-empty value meeting all validation criteria.
 * Guarantees zero discrepancy with validateField so green checkmarks are never false positives.
 */
export function isFieldValid(field: ContactField, value: string): boolean {
  if (!value || value.trim().length === 0) return false;
  return validateField(field, value) === undefined;
}

export function validateContact(raw: unknown): ContactValidation {
  const source =
    typeof raw === "object" && raw !== null
      ? (raw as Record<string, unknown>)
      : {};

  const read = (key: ContactField) =>
    typeof source[key] === "string" ? (source[key] as string).trim() : "";

  // Sanitize single-line headers to prevent CRLF injection
  const data: ContactInput = {
    name: stripCRLF(read("name")),
    email: stripCRLF(read("email")),
    subject: stripCRLF(read("subject")),
    message: read("message"), // Preserve valid multi-line message body
  };

  const errors: ContactErrors = {};

  for (const field of CONTACT_FIELDS) {
    const error = validateField(field, data[field]);
    if (error) {
      errors[field] = error;
    }
  }

  return Object.keys(errors).length > 0
    ? { ok: false, errors }
    : { ok: true, data };
}