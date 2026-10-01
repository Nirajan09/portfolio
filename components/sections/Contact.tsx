import { Mail, MapPin, Phone } from "lucide-react";
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
};

function InfoRow({ icon, label, value, href }: InfoRowProps) {
  const content = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-accent transition-colors duration-200 group-hover:border-accent/40">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-medium uppercase tracking-widest text-muted">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-base text-primary">{value}</span>
      </span>
    </>
  );

  const className = "group flex items-center gap-4";

  return (
    <li>
      {href ? (
        <a
          href={href}
          {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
          className={`${className} transition-colors duration-200 hover:text-accent`}
        >
          {content}
        </a>
      ) : (
        <div className={className}>{content}</div>
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
              eyebrow="Contact"
              title="Let's work together"
              description="Have a project in mind or want to collaborate? Send a message, or reach me directly through any of these."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-5">
              <InfoRow
                icon={<Mail className="size-5" aria-hidden="true" />}
                label="Email"
                value={personal.email}
                href={`mailto:${personal.email}`}
              />
              <InfoRow
                icon={<Phone className="size-5" aria-hidden="true" />}
                label="Phone"
                value={personal.phone}
                href={`tel:${personal.phone.replace(/-/g, "")}`}
              />
              <InfoRow
                icon={<MapPin className="size-5" aria-hidden="true" />}
                label="Location"
                value={personal.location}
              />
              {github && (
                <InfoRow
                  icon={<GithubIcon className="size-5" />}
                  label="GitHub"
                  value={stripProtocol(github)}
                  href={github}
                />
              )}
              {linkedin && (
                <InfoRow
                  icon={<LinkedinIcon className="size-5" />}
                  label="LinkedIn"
                  value={stripProtocol(linkedin)}
                  href={linkedin}
                />
              )}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <Card className="sm:p-8">
            <ContactForm fallbackEmail={personal.email} />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}