"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CheckCircle2, X, AlertCircle, RotateCcw, Send } from "lucide-react";

import { Button } from "@/components/ui/Button";

type ModalShellProps = {
  children: ReactNode;
  onClose: () => void;
  labelledBy: string;
  descriptionId: string;
  tone: "success" | "error";
};

function ModalShell({
  children,
  onClose,
  labelledBy,
  descriptionId,
  tone,
}: ModalShellProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onClick={(event) => {
        // Close only when the backdrop itself is clicked.
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className={`relative w-full max-w-md overflow-hidden rounded-2xl border bg-background p-6 shadow-2xl outline-none sm:p-8 ${
          tone === "success" ? "border-success/30" : "border-error/30"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-background-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        {children}
      </div>
    </div>
  );
}

type MessageSentModalProps = {
  onClose: () => void;
  onSendAnother: () => void;
};

export function MessageSentModal({
  onClose,
  onSendAnother,
}: MessageSentModalProps) {
  return (
    <ModalShell
      onClose={onClose}
      labelledBy="message-sent-title"
      descriptionId="message-sent-description"
      tone="success"
    >
      <div className="flex flex-col items-center gap-5 pt-3 text-center">
        <div className="relative mx-auto flex size-16 items-center justify-center rounded-full border border-success/30 bg-success/10 text-success">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </div>

        <div>
          <h2
            id="message-sent-title"
            className="font-display text-2xl font-semibold text-primary sm:text-3xl"
          >
            Message sent!
          </h2>

          <p
            id="message-sent-description"
            className="mx-auto mt-3 max-w-sm text-sm leading-6 text-secondary sm:text-base"
          >
            Thanks for reaching out. I&apos;ll reply to the email address you
            provided.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 pt-1">
          <Button type="button" onClick={onSendAnother} className="w-full">
            <RotateCcw className="size-4" aria-hidden="true" />
            Send another message
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </div>
    </ModalShell>
  );
}

type MessageErrorModalProps = {
  message: string;
  fallbackEmail: string;
  onClose: () => void;
  onRetry: () => void;
};

export function MessageErrorModal({
  message,
  fallbackEmail,
  onClose,
  onRetry,
}: MessageErrorModalProps) {
  return (
    <ModalShell
      onClose={onClose}
      labelledBy="message-error-title"
      descriptionId="message-error-description"
      tone="error"
    >
      <div className="flex flex-col gap-5 pt-3">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-error/30 bg-error/10 text-error">
          <AlertCircle className="size-8" aria-hidden="true" />
        </div>

        <div>
          <h2
            id="message-error-title"
            className="font-display text-2xl font-semibold text-primary sm:text-3xl"
          >
            Message not sent
          </h2>

          <p
            id="message-error-description"
            className="mt-3 text-sm leading-6 text-secondary sm:text-base"
          >
            {message ||
              "Something went wrong while sending your message. Please try again."}
          </p>

          <p className="mt-3 text-sm leading-6 text-secondary">
            Your entered details are preserved. Try again or email me directly
            at{" "}
            <a
              href={`mailto:${fallbackEmail}`}
              className="font-medium text-accent underline underline-offset-2 hover:text-accent-hover"
            >
              {fallbackEmail}
            </a>
            .
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 pt-1">
          <Button type="button" onClick={onRetry} className="w-full">
            <RotateCcw className="size-4" aria-hidden="true" />
            Try again
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </div>
    </ModalShell>
  );
}
