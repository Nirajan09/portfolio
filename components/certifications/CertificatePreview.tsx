"use client";

import { Expand, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

type CertificatePreviewProps = {
  src: string;
  alt: string;
  title: string;
};

/** Thumbnail button that opens the full certificate in a native modal dialog. */
export function CertificatePreview({ src, alt, title }: CertificatePreviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Never leave page scrolling locked if we unmount while open.
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const open = () => {
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`Preview certificate: ${title}`}
        className="group/preview relative block aspect-4/3 w-full overflow-hidden border-b border-border"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 ease-standard group-hover/preview:scale-105"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 transition-opacity duration-200 group-hover/preview:opacity-100 group-focus-visible/preview:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-primary">
            <Expand className="size-4" aria-hidden="true" />
            Preview
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={title}
        onClose={() => {
          document.documentElement.style.overflow = "";
        }}
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-lg border border-border bg-surface p-0 text-primary backdrop:bg-background/80 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
          <h3 className="font-display text-base font-semibold">{title}</h3>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close preview"
            className="inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:text-primary"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="p-4">
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1200}
            sizes="(min-width: 896px) 896px, 100vw"
            className="h-auto max-h-[75vh] w-full rounded-md object-contain"
          />
        </div>
      </dialog>
    </>
  );
}