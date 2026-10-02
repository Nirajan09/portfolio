import Link from "next/link";
import { FileText, Mail } from "lucide-react";
import { navHref, navItems } from "@/data/navigation";
import { personal } from "@/data/personal";
import { IconButton } from "@/components/ui/IconButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { PageContainer } from "./PageContainer";

export function Footer() {
  const { github, linkedin } = personal.socials;

  return (
    <footer className="border-t border-border bg-background-secondary">
      <PageContainer className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link
              href={navHref("home")}
              className="font-display text-xl font-bold tracking-tight text-primary"
            >
              {personal.initials}
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {personal.blurb}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-sm font-semibold text-primary">
              Navigate
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={navHref(item.id)}
                    className="text-sm text-muted transition-colors duration-200 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold text-primary">
              Connect
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {github && (
                <IconButton
                  href={github}
                  label="GitHub"
                  data-track="social_click"
                  data-track-network="github"
                  data-track-location="footer"
                >
                  <GithubIcon className="size-5" />
                </IconButton>
              )}
              {linkedin && (
                <IconButton
                  href={linkedin}
                  label="LinkedIn"
                  data-track="social_click"
                  data-track-network="linkedin" // or "linkedin" / "email"
                  data-track-location="footer"
                >
                  <LinkedinIcon className="size-5" />
                </IconButton>
              )}
              <IconButton
                href={`mailto:${personal.email}`}
                label="Email"
                data-track="social_click"
                data-track-network="email"
                data-track-location="footer"
              >
                <Mail className="size-5" aria-hidden="true" />
              </IconButton>
              {personal.resumeUrl && (
                <IconButton href={personal.resumeUrl} label="Resume">
                  <FileText className="size-5" aria-hidden="true" />
                </IconButton>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted">
          &copy; {new Date().getFullYear()} {personal.name}. All rights
          reserved.
        </div>
      </PageContainer>
    </footer>
  );
}
