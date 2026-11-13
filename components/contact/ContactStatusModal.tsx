"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { LuCircleAlert, LuCircleCheck, LuRotateCcw, LuX } from "react-icons/lu";

import { Button } from "@/components/ui/Button";
import { useIsMounted } from "@/hooks/useIsMounted";

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
  const mounted = useIsMounted();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mounted, onClose]);

  return createPortal(
    <div
      role="presentation"
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/75 p-3.5 sm:p-4 backdrop-blur-md animate-in fade-in duration-200"
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
        className={`relative my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-md flex-col overflow-y-auto rounded-2xl border bg-background p-5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)] outline-none sm:p-7 animate-in zoom-in-95 duration-200 ${
          tone === "success"
            ? "border-success/30 shadow-[0_0_30px_-5px_rgba(34,197,94,0.18)]"
            : "border-error/30 shadow-[0_0_30px_-5px_rgba(239,68,68,0.18)]"
        }`}
      >
        {/* Top hairline indicator */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-0.5 ${
            tone === "success"
              ? "bg-linear-to-r from-emerald-500 via-teal-400 to-emerald-500"
              : "bg-linear-to-r from-red-500 via-rose-500 to-red-500"
          }`}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 z-10 flex size-8 sm:size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-background-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer active:scale-95"
        >
          <LuX className="size-5" aria-hidden="true" />
        </button>

        {children}
      </div>
    </div>,
    document.body,
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
          <LuCircleCheck className="size-8" aria-hidden="true" />
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
            <LuRotateCcw className="size-4" aria-hidden="true" />
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
          <LuCircleAlert className="size-8" aria-hidden="true" />
        </div>

        <div>
          <h2
            id="message-error-title"
            className="font-display text-2xl font-semibold text-primary sm:text-3xl"
          >
            Message not sent
          </h2>

          <div
            id="message-error-description"
            className="mt-3 rounded-xl border border-error/25 bg-error/10 p-3.5 text-sm leading-relaxed text-secondary"
          >
            <span className="font-semibold text-error">Notice: </span>
            {message ||
              "Something went wrong while sending your message. Please try again."}
          </div>

          <p className="mt-4 text-sm leading-6 text-secondary">
            Your entered details are preserved. Try again or email me directly
            at{" "}
            <a
              href={`mailto:${fallbackEmail}`}
              className="break-all font-medium text-accent underline underline-offset-2 hover:text-accent-hover"
            >
              {fallbackEmail}
            </a>
            .
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 pt-1">
          <Button type="button" onClick={onRetry} className="w-full">
            <LuRotateCcw className="size-4" aria-hidden="true" />
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
