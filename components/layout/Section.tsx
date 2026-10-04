import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PageContainer } from "./PageContainer";

type SectionProps = {
  id: string;
  className?: string;
  children: ReactNode;
};

/** Standard homepage section: anchor id, vertical rhythm, shared container. */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-6 sm:py-12", className)}>
      <PageContainer>{children}</PageContainer>
    </section>
  );
}