import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type PageContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/** Shared width + horizontal padding for every section and route. */
export function PageContainer<T extends ElementType = "div">({
  as,
  className,
  ...props
}: PageContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12", className)}
      {...props}
    />
  );
}