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
 * Returns an error message string if invalid, or undefined if valid.
 */
export function validateField(
  field: ContactField,
  value: string,
): string | undefined {
  const clean = field === "message" ? value.trim() : stripCRLF(value);

  switch (field) {
    case "name":
      if (!clean) return "Please enter your name.";
      if (clean.length < CONTACT_LIMITS.nameMin) {
        return `Name must be at least ${CONTACT_LIMITS.nameMin} characters.`;
      }
      if (!/\p{L}/u.test(clean)) {
        return "Name must contain valid alphabetical characters.";
      }
      if (clean.length > CONTACT_LIMITS.name) {
        return `Name must be ${CONTACT_LIMITS.name} characters or fewer.`;
      }
      return undefined;

    case "email":
      if (!clean) return "Please enter your email address.";
      if (clean.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(clean)) {
        return "Please enter a valid email address.";
      }
      return undefined;

    case "subject":
      if (!clean) return "Please enter a subject.";
      if (clean.length < CONTACT_LIMITS.subjectMin) {
        return `Subject must be at least ${CONTACT_LIMITS.subjectMin} characters.`;
      }
      if (clean.length > CONTACT_LIMITS.subject) {
        return `Subject must be ${CONTACT_LIMITS.subject} characters or fewer.`;
      }
      return undefined;

    case "message":
      if (!clean) return "Please write a message.";
      if (clean.length < CONTACT_LIMITS.messageMin) {
        return `Please write at least ${CONTACT_LIMITS.messageMin} characters.`;
      }
      if (clean.length > CONTACT_LIMITS.message) {
        return `Message must be ${CONTACT_LIMITS.message} characters or fewer.`;
      }
      return undefined;
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