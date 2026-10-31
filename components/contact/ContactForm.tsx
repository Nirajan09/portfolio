"use client";

import type { IconType } from "react-icons";
import {
  LuArrowUpRight,
  LuCheck,
  LuFileText,
  LuLoaderCircle,
  LuMail,
  LuMessageSquare,
  LuSend,
  LuTriangleAlert,
  LuUser,
} from "react-icons/lu";

import { memo, useCallback, useMemo, useRef, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import {
  CONTACT_FIELDS,
  CONTACT_LIMITS,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from "@/lib/contact";

// Lazy-load status modals to avoid bundling them on initial page load
const MessageSentModal = dynamic(
  () =>
    import("@/components/contact/ContactStatusModal").then(
      (m) => m.MessageSentModal,
    ),
  { ssr: false },
);

const MessageErrorModal = dynamic(
  () =>
    import("@/components/contact/ContactStatusModal").then(
      (m) => m.MessageErrorModal,
    ),
  { ssr: false },
);

type Status = "idle" | "submitting" | "success" | "error";

const emptyValues: ContactInput = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const controlClass = (invalid: boolean) =>
  cn(
    "w-full rounded-xl border bg-background-secondary/70 text-sm sm:text-base text-primary placeholder:text-sm placeholder:text-muted/60",
    "transition-[border-color,background-color,box-shadow] duration-200 ease-standard",
    "hover:bg-background-secondary focus:bg-background-secondary focus-visible:outline-none",
    invalid
      ? "border-error focus:border-error focus:shadow-[0_0_0_3px_rgb(239_68_68/0.15)]"
      : "border-border hover:border-muted/40 focus:border-accent focus:shadow-[0_0_0_3px_rgb(34_211_238/0.12)]",
  );

type FieldProps = {
  name: ContactField;
  label: string;
  icon: IconType;
  value: string;
  error?: string;
  valid: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
  type?: "text" | "email";
  autoComplete?: string;
  placeholder?: string;
  maxLength: number;
  multiline?: boolean;
};

const Field = memo(function Field({
  name,
  label,
  icon: Icon,
  value,
  error,
  valid,
  onChange,
  onBlur,
  type = "text",
  autoComplete,
  placeholder,
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
    placeholder,
    onBlur,
    "aria-required": true as const,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
  };

  const { ratio, counterClass, barClass } = useMemo(() => {
    const r = Math.min(value.length / maxLength, 1);
    const c =
      r >= 1 ? "text-error" : r >= 0.9 ? "text-warning" : "text-muted";
    const b =
      r >= 1
        ? "bg-error"
        : r >= 0.9
          ? "bg-warning"
          : "bg-linear-to-r from-accent via-blue to-violet";
    return { ratio: r, counterClass: c, barClass: b };
  }, [value.length, maxLength]);

  return (
    <div className="group">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="text-sm font-medium text-primary transition-colors duration-200 group-focus-within:text-accent"
        >
          {label}
        </label>

        {multiline && (
          <span
            aria-hidden="true"
            className={cn(
              "text-xs tabular-nums transition-colors duration-200",
              counterClass,
            )}
          >
            {value.length}/{maxLength}
          </span>
        )}
      </div>

      <div className="relative mt-2">
        <Icon
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-3 size-4 text-muted transition-colors duration-200",
            "group-focus-within:text-accent",
            multiline ? "top-3.5" : "top-1/2 -translate-y-1/2",
            error && "text-error group-focus-within:text-error",
          )}
        />

        {multiline ? (
          <textarea
            {...shared}
            rows={6}
            onChange={(event) => onChange(event.target.value)}
            className={cn(
              controlClass(Boolean(error)),
              "resize-y py-3 pl-9.5 pr-4",
            )}
          />
        ) : (
          <input
            {...shared}
            type={type}
            onChange={(event) => onChange(event.target.value)}
            className={cn(
              controlClass(Boolean(error)),
              "h-11 sm:h-12 pl-9.5 pr-8",
            )}
          />
        )}

        {!multiline && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute right-2.5 top-1/2 flex size-4.5 -translate-y-1/2 items-center justify-center rounded-full bg-success/15 text-success",
              "transition-[opacity,scale] duration-300 ease-standard",
              valid ? "scale-100 opacity-100" : "scale-50 opacity-0",
            )}
          >
            <LuCheck className="size-3" />
          </span>
        )}
      </div>

      {multiline && (
        <div
          aria-hidden="true"
          className="mt-2 h-0.5 overflow-hidden rounded-full bg-border"
        >
          <div
            className={cn(
              "h-full origin-left rounded-full transition-[scale,background-color] duration-300 ease-standard",
              barClass,
            )}
            style={{ transform: `scaleX(${ratio})` }}
          />
        </div>
      )}

      {error && (
        <p
          id={errorId}
          className="mt-2 flex animate-[fade-up_0.3s_var(--ease-standard)_both] items-center gap-1.5 text-sm text-error"
        >
          <LuTriangleAlert
            className="size-3.5 shrink-0"
            aria-hidden="true"
          />
          {error}
        </p>
      )}
    </div>
  );
});

export const ContactForm = memo(function ContactForm({
  fallbackEmail,
}: {
  fallbackEmail: string;
}) {
  const [values, setValues] = useState<ContactInput>(emptyValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<ContactField, boolean>>
  >({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef(false);
  const formLoadTime = useRef<number>(Date.now());

  const handleFocus = useCallback(() => {
    if (startedRef.current) return;

    startedRef.current = true;
    trackEvent("contact_form_start");
  }, []);

  const focusField = useCallback((field: ContactField) => {
    const element = formRef.current?.elements.namedItem(field);

    if (element instanceof HTMLElement) {
      element.focus();
    }
  }, []);

  const setValue = useCallback((field: ContactField, value: string) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }, []);

  const validateOne = useCallback((field: ContactField) => {
    setTouched((current) => ({
      ...current,
      [field]: true,
    }));

    setValues((latestValues) => {
      const result = validateContact(latestValues);
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: result.ok ? undefined : result.errors[field],
      }));
      return latestValues;
    });
  }, []);

  const isValid = useCallback(
    (field: ContactField) =>
      Boolean(touched[field]) &&
      !errors[field] &&
      values[field].trim().length > 0,
    [touched, errors, values],
  );

  const resetForm = useCallback(() => {
    setValues({ ...emptyValues });
    setErrors({});
    setTouched({});
  }, []);

  const closeModal = useCallback(() => {
    setStatus("idle");
    setServerMessage("");
  }, []);

  const sendAnotherMessage = useCallback(() => {
    resetForm();
    setServerMessage("");
    setStatus("idle");
  }, [resetForm]);

  const retrySubmission = useCallback(() => {
    setServerMessage("");
    setStatus("idle");
  }, []);

  // Stable callbacks for individual fields to maximize memoization of Field components
  const onNameChange = useCallback((val: string) => setValue("name", val), [setValue]);
  const onEmailChange = useCallback((val: string) => setValue("email", val), [setValue]);
  const onSubjectChange = useCallback((val: string) => setValue("subject", val), [setValue]);
  const onMessageChange = useCallback((val: string) => setValue("message", val), [setValue]);

  const onNameBlur = useCallback(() => validateOne("name"), [validateOne]);
  const onEmailBlur = useCallback(() => validateOne("email"), [validateOne]);
  const onSubjectBlur = useCallback(() => validateOne("subject"), [validateOne]);
  const onMessageBlur = useCallback(() => validateOne("message"), [validateOne]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (status === "submitting") return;

    const result = validateContact(values);

    if (!result.ok) {
      setErrors(result.errors);

      const first = CONTACT_FIELDS.find(
        (field) => result.errors[field],
      );

      if (first) {
        focusField(first);
      }

      return;
    }

    setErrors({});
    setServerMessage("");

    const honeypot =
      formRef.current?.elements.namedItem("website");

    const website =
      honeypot instanceof HTMLInputElement
        ? honeypot.value
        : "";

    // Treat a filled honeypot as a successful submission without sending.
    if (website) {
      resetForm();
      setStatus("success");
      return;
    }

    const timeTakenMs = Date.now() - formLoadTime.current;

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.data.name,
          email: result.data.email,
          subject: result.data.subject,
          message: result.data.message,
          website: website,
          timeTakenMs: timeTakenMs,
        }),
      });

      type ContactApiResponse = {
        ok?: boolean;
        message?: string;
        provider?: "web3forms";
        accessKey?: string;
        sanitizedData?: {
          name: string;
          email: string;
          subject: string;
          message: string;
        };
      };

      const payload: ContactApiResponse | null = await response
        .json()
        .catch(() => null);

      if (response.ok && payload?.ok) {
        // If provider is web3forms, dispatch directly from browser to satisfy Web3Forms client-side requirement
        if (payload.provider === "web3forms" && payload.accessKey) {
          const sendData = payload.sanitizedData ?? result.data;
          try {
            const web3Res = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                access_key: payload.accessKey,
                name: sendData.name,
                email: sendData.email,
                subject: `[Portfolio Contact] ${sendData.subject}`,
                message: sendData.message,
                from_name: sendData.name,
              }),
            });

            const web3Data = (await web3Res.json().catch(() => null)) as {
              success?: boolean;
              message?: string;
            } | null;

            if (web3Res.ok && web3Data?.success) {
              trackEvent("contact_form_submit", {
                result: "success",
              });
              resetForm();
              setStatus("success");
              return;
            }

            trackEvent("contact_form_submit", {
              result: "error",
            });

            setServerMessage(
              web3Data?.message ||
                `Web3Forms returned status ${web3Res.status}. Please check your access key.`,
            );
            setStatus("error");
            return;
          } catch {
            trackEvent("contact_form_submit", {
              result: "error",
            });
            setServerMessage(
              "Network error connecting to email service. Please try again or email directly.",
            );
            setStatus("error");
            return;
          }
        }

        // Honeypot silent absorption
        trackEvent("contact_form_submit", {
          result: "success",
        });

        resetForm();
        setStatus("success");
        return;
      }

      trackEvent("contact_form_submit", {
        result: "error",
      });

      setServerMessage(
        payload?.message ??
          (response.status === 429
            ? "Too many messages. Please try again later."
            : response.status === 503
              ? "The contact form isn't available right now."
              : "Something went wrong. Please try again."),
      );

      setStatus("error");
    } catch {
      trackEvent("contact_form_submit", {
        result: "error",
      });

      setServerMessage(
        "Network error. Please check your connection and try again.",
      );

      setStatus("error");
    }
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onFocus={handleFocus}
        noValidate
        className="space-y-6"
      >
        <div className="flex items-center gap-2 text-sm text-muted">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_rgb(34_211_238/0.8)]"
          />
          All fields are required.
        </div>

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
          <Field
            name="name"
            label="Name"
            icon={LuUser}
            placeholder="Your full name"
            value={values.name}
            error={errors.name}
            valid={isValid("name")}
            onChange={onNameChange}
            onBlur={onNameBlur}
            autoComplete="name"
            maxLength={CONTACT_LIMITS.name}
          />

          <Field
            name="email"
            label="Email"
            type="email"
            icon={LuMail}
            placeholder="you@example.com"
            value={values.email}
            error={errors.email}
            valid={isValid("email")}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            autoComplete="email"
            maxLength={CONTACT_LIMITS.email}
          />
        </div>

        <Field
          name="subject"
          label="Subject"
          icon={LuFileText}
          placeholder="What's this about?"
          value={values.subject}
          error={errors.subject}
          valid={isValid("subject")}
          onChange={onSubjectChange}
          onBlur={onSubjectBlur}
          maxLength={CONTACT_LIMITS.subject}
        />

        <Field
          name="message"
          label="Message"
          icon={LuMessageSquare}
          placeholder="Tell me a bit about your project or idea..."
          multiline
          value={values.message}
          error={errors.message}
          valid={isValid("message")}
          onChange={onMessageChange}
          onBlur={onMessageBlur}
          maxLength={CONTACT_LIMITS.message}
        />

        {/* Honeypot field for basic bot protection. */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="contact-website">
            Leave this field empty
          </label>

          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="group w-full sm:w-auto"
          >
            {status === "submitting" ? (
              <>
                <LuLoaderCircle
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
                Sending…
              </>
            ) : (
              <>
                Send message
                <LuSend
                  className="size-4 transition-transform duration-300 ease-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </>
            )}
          </Button>

          <a
            href={`mailto:${fallbackEmail}`}
            className="group/mail inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted transition-colors duration-200 hover:text-accent max-w-full"
          >
            <span className="shrink-0">Prefer email?</span>
            <span className="truncate max-w-[200px] sm:max-w-none">{fallbackEmail}</span>
            <LuArrowUpRight
              className="size-3.5 shrink-0 transition-transform duration-300 ease-standard group-hover/mail:-translate-y-0.5 group-hover/mail:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </form>

      {/* The form remains mounted underneath either modal. */}
      {status === "success" && (
        <MessageSentModal
          onClose={closeModal}
          onSendAnother={sendAnotherMessage}
        />
      )}

      {status === "error" && (
        <MessageErrorModal
          message={serverMessage}
          fallbackEmail={fallbackEmail}
          onClose={closeModal}
          onRetry={retrySubmission}
        />
      )}
    </>
  );
});