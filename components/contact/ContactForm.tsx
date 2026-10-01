"use client";

import { CircleCheck, LoaderCircle, RotateCcw, Send, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  CONTACT_FIELDS,
  CONTACT_LIMITS,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from "@/lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

const emptyValues: ContactInput = { name: "", email: "", subject: "", message: "" };

const controlClass = (invalid: boolean) =>
  cn(
    "w-full rounded-md border bg-background-secondary px-3.5 text-base text-primary placeholder:text-muted/70",
    "transition-colors duration-200 focus:border-accent",
    invalid ? "border-error" : "border-border",
  );

type FieldProps = {
  name: ContactField;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  type?: "text" | "email";
  autoComplete?: string;
  maxLength: number;
  multiline?: boolean;
};

function Field({
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  autoComplete,
  maxLength,
  multiline = false,
}: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    maxLength,
    autoComplete,
    onBlur,
    "aria-required": true as const,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-primary">
          {label}
        </label>
        {multiline && (
          <span aria-hidden="true" className="text-xs text-muted">
            {value.length}/{maxLength}
          </span>
        )}
      </div>

      {multiline ? (
        <textarea
          {...shared}
          rows={6}
          onChange={(event) => onChange(event.target.value)}
          className={cn(controlClass(Boolean(error)), "mt-2 resize-y py-3")}
        />
      ) : (
        <input
          {...shared}
          type={type}
          onChange={(event) => onChange(event.target.value)}
          className={cn(controlClass(Boolean(error)), "mt-2 h-11")}
        />
      )}

      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [values, setValues] = useState<ContactInput>(emptyValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so screen reader users hear it.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const focusField = (field: ContactField) => {
    const element = formRef.current?.elements.namedItem(field);
    if (element instanceof HTMLElement) element.focus();
  };

  const setValue = (field: ContactField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear a field's error as soon as the visitor starts correcting it.
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validateOne = (field: ContactField) => {
    const result = validateContact(values);
    setErrors((current) => ({
      ...current,
      [field]: result.ok ? undefined : result.errors[field],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      const first = CONTACT_FIELDS.find((field) => result.errors[field]);
      if (first) focusField(first);
      return;
    }

    setErrors({});
    setServerMessage("");
    setStatus("submitting");

    const honeypot = formRef.current?.elements.namedItem("website");
    const website = honeypot instanceof HTMLInputElement ? honeypot.value : "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, website }),
      });
      const payload: { ok?: boolean; message?: string; errors?: ContactErrors } | null =
        await response.json().catch(() => null);

      if (response.ok && payload?.ok) {
        setValues(emptyValues);
        setStatus("success");
        return;
      }
      if (response.status === 400 && payload?.errors) {
        setErrors(payload.errors);
        setStatus("idle");
        return;
      }
      setServerMessage(payload?.message ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setServerMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start gap-4 py-4 outline-none"
      >
        <div className="flex size-12 items-center justify-center rounded-full border border-success/30 bg-success/10 text-success">
          <CircleCheck className="size-6" aria-hidden="true" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-primary">
          Message sent
        </h3>
        <p className="text-base leading-relaxed text-muted">
          Thanks for reaching out. I&apos;ll reply to the email address you provided.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      <p className="text-sm text-muted">All fields are required.</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="name"
          label="Name"
          value={values.name}
          error={errors.name}
          onChange={(value) => setValue("name", value)}
          onBlur={() => validateOne("name")}
          autoComplete="name"
          maxLength={CONTACT_LIMITS.name}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          value={values.email}
          error={errors.email}
          onChange={(value) => setValue("email", value)}
          onBlur={() => validateOne("email")}
          autoComplete="email"
          maxLength={CONTACT_LIMITS.email}
        />
      </div>

      <Field
        name="subject"
        label="Subject"
        value={values.subject}
        error={errors.subject}
        onChange={(value) => setValue("subject", value)}
        onBlur={() => validateOne("subject")}
        maxLength={CONTACT_LIMITS.subject}
      />

      <Field
        name="message"
        label="Message"
        multiline
        value={values.message}
        error={errors.message}
        onChange={(value) => setValue("message", value)}
        onBlur={() => validateOne("message")}
        maxLength={CONTACT_LIMITS.message}
      />

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-md border border-error/30 bg-error/10 px-4 py-3 text-sm text-primary"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-error" aria-hidden="true" />
          <p>
            {serverMessage} You can also email me directly at{" "}
            <a
              href={`mailto:${fallbackEmail}`}
              className="font-medium text-accent underline underline-offset-2"
            >
              {fallbackEmail}
            </a>
            .
          </p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}