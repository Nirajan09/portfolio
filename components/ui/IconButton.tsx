import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type IconButtonProps = {
  href: string;
  label: string;
  className?: string;
  children: ReactNode;
} & Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "className" | "children" | "aria-label" | "title"
>;

/** Square icon link (social/contact). `label` is the accessible name. */
export function IconButton({
  href,
  label,
  className,
  children,
  ...rest
}: IconButtonProps) {
  const opensNewTab = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...rest}
      {...(opensNewTab && { target: "_blank", rel: "noopener noreferrer" })}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-md border border-border bg-surface text-muted",
        "transition-[color,border-color,transform] duration-200 ease-standard",
        "hover:-translate-y-px hover:border-accent/50 hover:text-accent",
        className,
      )}
    >
      {children}
    </a>
  );
}