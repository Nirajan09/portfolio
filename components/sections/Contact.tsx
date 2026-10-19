import { LuArrowUpRight, LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import type { ReactNode } from "react";

import { Reveal } from "@/components/animation/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { personal } from "@/data/personal";

type InfoRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  /** Reports a social_click with this network name when clicked. */
  network?: string;
};

function InfoRow({ icon, label, value, href, network }: InfoRowProps) {
  const content = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background-secondary text-accent transition-[border-color,background-color,box-shadow,scale] duration-300 ease-standard group-hover:scale-105 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:shadow-glow">
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium uppercase tracking-widest text-muted">
          {label}
        </span>

        <span className="mt-0.5 block truncate text-base text-primary transition-colors duration-200 group-hover:text-accent">
          {value}
        </span>
      </span>

      {href && (
        <span
          aria-hidden="true"
          className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-[border-color,background-color,color] duration-300 ease-standard group-hover:border-accent/50 group-hover:bg-accent group-hover:text-background"
        >
          <LuArrowUpRight className="size-4 transition-transform duration-300 ease-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      )}
    </>
  );

  const baseClassName =
    "group relative flex items-center gap-4 overflow-hidden rounded-lg border border-border bg-surface/60 p-3 pr-4 backdrop-blur-sm";

  return (
    <li>
      {href ? (
        <a
          href={href}
          {...(href.startsWith("http") && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
          {...(network && {
            "data-track": "social_click",
            "data-track-network": network,
            "data-track-location": "contact",
          })}
          className={`${baseClassName} transform-gpu will-change-transform transition-[transform,translate,border-color,box-shadow] duration-300 ease-standard hover:-translate-y-0.5 hover:border-accent/40 focus-visible:-translate-y-0.5 focus-visible:border-accent/40`}
        >
          {/* Accent bar that grows down the left edge on hover */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-linear-to-b from-accent via-blue to-violet transition-[scale] duration-500 ease-standard group-hover:scale-y-100 group-focus-visible:scale-y-100"
          />
          {content}
        </a>
      ) : (
        <div className={baseClassName}>{content}</div>
      )}
    </li>
  );
}

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

export function Contact() {
  const { github, linkedin } = personal.socials;

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Get In Touch"
              title="Let's build something exceptional"
              description="Have a project in mind, a role to discuss, or an engineering challenge to solve? Drop a message or connect directly through any of the channels below."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-3">
              <InfoRow
                icon={<LuMail className="size-5" aria-hidden="true" />}
                label="Email"
                value={personal.email}
                href={`mailto:${personal.email}`}
              />

              <InfoRow
                icon={<LuPhone className="size-5" aria-hidden="true" />}
                label="Phone"
                value={personal.phone}
                href={`tel:${personal.phone.replace(/-/g, "")}`}
              />

              <InfoRow
                icon={<LuMapPin className="size-5" aria-hidden="true" />}
                label="Location"
                value={personal.location}
              />

              {github && (
                <InfoRow
                  icon={<GithubIcon className="size-5" />}
                  label="GitHub"
                  value={stripProtocol(github)}
                  href={github}
                  network="github"
                />
              )}

              {linkedin && (
                <InfoRow
                  icon={<LinkedinIcon className="size-5" />}
                  label="LinkedIn"
                  value={stripProtocol(linkedin)}
                  href={linkedin}
                  network="linkedin"
                />
              )}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <Card className="relative overflow-hidden sm:p-8">
            {/* Gradient hairline across the top of the form card */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-accent via-blue to-violet"
            />

            {/* Soft corner glow */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-accent/10 blur-3xl"
            />

            <div className="relative">
              <ContactForm fallbackEmail={personal.email} />
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}