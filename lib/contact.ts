/** Shared by the form (client) and the API route (server). */

export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(raw: unknown): ContactValidation {
  const source =
    typeof raw === "object" && raw !== null
      ? (raw as Record<string, unknown>)
      : {};
  const read = (key: ContactField) =>
    typeof source[key] === "string" ? (source[key] as string).trim() : "";

  const data: ContactInput = {
    name: read("name"),
    email: read("email"),
    subject: read("subject"),
    message: read("message"),
  };
  const errors: ContactErrors = {};

  if (!data.name) errors.name = "Please enter your name.";
  else if (data.name.length > CONTACT_LIMITS.name)
    errors.name = `Name must be ${CONTACT_LIMITS.name} characters or fewer.`;

  if (!data.email) errors.email = "Please enter your email address.";
  else if (
    data.email.length > CONTACT_LIMITS.email ||
    !EMAIL_PATTERN.test(data.email)
  )
    errors.email = "Please enter a valid email address.";

  if (!data.subject) errors.subject = "Please enter a subject.";
  else if (data.subject.length > CONTACT_LIMITS.subject)
    errors.subject = `Subject must be ${CONTACT_LIMITS.subject} characters or fewer.`;

  if (!data.message) errors.message = "Please write a message.";
  else if (data.message.length < CONTACT_LIMITS.messageMin)
    errors.message = `Please write at least ${CONTACT_LIMITS.messageMin} characters.`;
  else if (data.message.length > CONTACT_LIMITS.message)
    errors.message = `Message must be ${CONTACT_LIMITS.message} characters or fewer.`;

  return Object.keys(errors).length > 0
    ? { ok: false, errors }
    : { ok: true, data };
}