import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toJsxRuntime, type Components, type Options } from "hast-util-to-jsx-runtime";
import { LuArrowUpRight, LuHash } from "react-icons/lu";
import type { compileMarkdown } from "@/lib/blog";
import { CodeBlock } from "./CodeBlock";

type HastTree = Awaited<ReturnType<typeof compileMarkdown>>["hast"];

function isSafeHref(href: string | undefined): href is string {
  if (!href) return false;
  return /^(https?:\/\/|\/|#)/i.test(href);
}

const markdownComponents: Partial<Components> = {
  h2: ({ id, children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      id={id}
      className="group/heading mt-12 mb-4 scroll-mt-24 flex items-center gap-2 font-display text-xl sm:text-2xl font-bold tracking-tight text-primary border-b border-border/60 pb-2.5"
      {...props}
    >
      <span>{children}</span>
      {id && (
        <a
          href={`#${id}`}
          aria-label={`Jump to section`}
          className="text-muted opacity-0 transition-opacity duration-200 group-hover/heading:opacity-100 hover:text-accent focus-visible:opacity-100"
        >
          <LuHash className="size-4" aria-hidden="true" />
        </a>
      )}
    </h2>
  ),

  h3: ({ id, children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      id={id}
      className="group/heading mt-8 mb-3 scroll-mt-24 flex items-center gap-2 font-display text-lg sm:text-xl font-semibold tracking-tight text-primary"
      {...props}
    >
      <span>{children}</span>
      {id && (
        <a
          href={`#${id}`}
          aria-label={`Jump to subsection`}
          className="text-muted opacity-0 transition-opacity duration-200 group-hover/heading:opacity-100 hover:text-accent focus-visible:opacity-100"
        >
          <LuHash className="size-3.5" aria-hidden="true" />
        </a>
      )}
    </h3>
  ),

  p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p
      className="my-4 text-[15px] sm:text-base leading-[1.75] text-secondary/95 text-pretty"
      {...props}
    >
      {children}
    </p>
  ),

  ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-4 list-disc space-y-2 pl-6 text-[15px] sm:text-base leading-relaxed text-secondary/95 marker:text-accent"
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-6 text-[15px] sm:text-base leading-relaxed text-secondary/95 marker:font-mono marker:text-sm marker:text-accent"
      {...props}
    >
      {children}
    </ol>
  ),

  li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1" {...props}>
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 rounded-r-xl border-l-2 border-accent bg-accent/5 px-5 py-3 text-secondary/95 [&>p]:my-1.5"
      {...props}
    >
      {children}
    </blockquote>
  ),

  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-10 border-border/70" {...props} />
  ),

  strong: ({ children, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-primary" {...props}>
      {children}
    </strong>
  ),

  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    if (!isSafeHref(href)) {
      return <span className="text-secondary">{children}</span>;
    }

    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link
          href={href}
          className="font-medium text-accent underline underline-offset-4 decoration-accent/40 transition-colors hover:text-accent-hover hover:decoration-accent"
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-0.5 font-medium text-accent underline underline-offset-4 decoration-accent/40 transition-colors hover:text-accent-hover hover:decoration-accent"
        {...props}
      >
        <span>{children}</span>
        <LuArrowUpRight className="inline size-3.5 shrink-0" aria-hidden="true" />
      </a>
    );
  },

  code: ({ className, children, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={
        className
          ? className
          : "rounded-md border border-border/80 bg-surface-elevated px-1.5 py-0.5 font-mono text-[0.85em] text-accent"
      }
      {...props}
    >
      {children}
    </code>
  ),

  pre: CodeBlock,

  table: ({ children, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border/80 bg-surface/50">
      <table className="w-full border-collapse text-left text-xs sm:text-sm" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }: ComponentPropsWithoutRef<"thead">) => (
    <thead className="border-b border-border/80 bg-surface text-xs uppercase tracking-wider text-muted" {...props}>
      {children}
    </thead>
  ),

  th: ({ children, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th className="px-4 py-3 font-semibold text-primary whitespace-nowrap" {...props}>
      {children}
    </th>
  ),

  tr: ({ children, ...props }: ComponentPropsWithoutRef<"tr">) => (
    <tr className="border-b border-border/50 last:border-b-0 transition-colors hover:bg-surface/40" {...props}>
      {children}
    </tr>
  ),

  td: ({ children, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td className="px-4 py-3 text-secondary/90" {...props}>
      {children}
    </td>
  ),

  img: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) => {
    if (typeof src !== "string" || !src) return null;
    return (
      <figure className="my-6 overflow-hidden rounded-xl border border-border/80 bg-surface/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? ""} className="w-full h-auto" loading="lazy" {...props} />
        {alt && (
          <figcaption className="border-t border-border/60 px-4 py-2 text-center font-mono text-xs text-muted">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
};

type JsxFn = NonNullable<Options["jsx"]>;

export function MarkdownContent({ hast }: { hast: HastTree }) {
  const rendered = toJsxRuntime(hast as Parameters<typeof toJsxRuntime>[0], {
    Fragment,
    development: false,
    jsx: jsx as JsxFn,
    jsxs: jsxs as JsxFn,
    components: markdownComponents,
  });

  return (
    <div className="min-w-0 [&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit">
      {rendered}
    </div>
  );
}
