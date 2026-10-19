"use client";

import { LuExpand, LuX } from "react-icons/lu";
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
      <div className="relative aspect-4/3 w-full overflow-hidden border-b border-border bg-background-secondary">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top"
        />

        {/* Hover veil & clickable button to open preview modal */}
        <button
          type="button"
          onClick={open}
          aria-label={`Preview certificate: ${title}`}
          className="group/preview absolute inset-0 flex cursor-pointer items-center justify-center bg-background/70 opacity-0 transition-opacity duration-200 ease-standard hover:opacity-100 focus-visible:opacity-100"
        >
          <span className="inline-flex translate-y-1 items-center gap-2 rounded-lg border border-accent/40 bg-surface/90 px-3.5 py-2 text-sm font-medium text-primary shadow-glow transition-transform duration-200 ease-standard group-hover/preview:translate-y-0 group-focus-visible/preview:translate-y-0">
            <LuExpand className="size-4 text-accent" aria-hidden="true" />
            Preview
          </span>
        </button>
      </div>

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
        className="m-auto w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-xl border border-border bg-surface p-0 text-primary shadow-glow transition-[opacity,scale] duration-300 ease-standard backdrop:bg-background/80 backdrop:backdrop-blur-sm open:starting:scale-95 open:starting:opacity-0"
      >
        {/* Gradient hairline across the top of the dialog */}
        <span
          aria-hidden="true"
          className="block h-px bg-linear-to-r from-accent via-blue to-violet"
        />

        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
          <h3 className="font-display text-base font-semibold">{title}</h3>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close preview"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted transition-[border-color,background-color,color] duration-200 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
          >
            <LuX className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="bg-background-secondary/60 p-4">
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1200}
            sizes="(min-width: 896px) 896px, 100vw"
            className="h-auto max-h-[75vh] w-full rounded-lg border border-border object-contain"
          />
        </div>
      </dialog>
    </>
  );
}