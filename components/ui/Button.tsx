import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  (
    | ({ href: string } & Omit<
        ComponentPropsWithoutRef<"a">,
        keyof CommonProps | "href"
      >)
    | ({ href?: undefined } & Omit<
        ComponentPropsWithoutRef<"button">,
        keyof CommonProps
      >)
  );

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium " +
  "transition-[background-color,border-color,color,transform] duration-200 ease-(--ease-standard) " +
  "hover:-translate-y-px active:translate-y-0 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-background hover:bg-accent-hover",
  secondary:
    "border border-border bg-surface text-primary hover:border-accent/50 hover:bg-surface-elevated",
  ghost: "text-secondary hover:bg-surface hover:text-primary",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.href !== undefined) {
    const { href, ...anchor } = rest;
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      const opensNewTab = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          {...(opensNewTab && { target: "_blank", rel: "noopener noreferrer" })}
          {...anchor}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchor}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}