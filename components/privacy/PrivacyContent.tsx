"use client";

import { memo, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  LuArrowLeft,
  LuArrowUpRight,
  LuCalendar,
  LuCheck,
  LuClock,
  LuCopy,
  LuExternalLink,
  LuEyeOff,
  LuFingerprint,
  LuGlobe,
  LuHash,
  LuHistory,
  LuLock,
  LuMail,
  LuPrinter,
  LuSearch,
  LuServer,
  LuShieldCheck,
  LuTrash2,
  LuUserCheck,
  LuX,
} from "react-icons/lu";
import { PageContainer } from "@/components/layout/PageContainer";
import { personal } from "@/data/personal";

type FilterCategory = "all" | "form" | "cookies" | "logs" | "rights";

const filterPills: { id: FilterCategory; label: string; icon: typeof LuShieldCheck }[] = [
  { id: "all", label: "All Topics", icon: LuShieldCheck },
  { id: "form", label: "Contact Form", icon: LuMail },
  { id: "cookies", label: "Cookies & Analytics", icon: LuEyeOff },
  { id: "logs", label: "Hosting & Logs", icon: LuServer },
  { id: "rights", label: "Your Rights", icon: LuUserCheck },
];

const trustPillars = [
  {
    icon: LuEyeOff,
    title: "0 Advertising Cookies",
    stat: "No Ad Trackers",
    description: "No third-party advertising cookies, marketing pixels, or profiling scripts.",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  },
  {
    icon: LuLock,
    title: "Encrypted in Transit",
    stat: "HTTPS Security",
    description: "All browser communications use secure HTTPS transport encryption.",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
  },
  {
    icon: LuShieldCheck,
    title: "No Data Sold or Shared",
    stat: "Personal Inquiries",
    description: "Messages are used solely to reply to your inquiry, never sold for marketing.",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/25",
  },
  {
    icon: LuUserCheck,
    title: "Data Rights Respected",
    stat: "GDPR / CCPA",
    description: "Right to access, correct, restrict, or request deletion of your messages.",
    badgeColor: "text-violet-400 bg-violet-500/10 border-violet-500/25",
  },
];

type PolicySection = {
  id: string;
  category: FilterCategory | "general";
  title: string;
  icon: typeof LuShieldCheck;
  badge: string;
  summary: string;
  details: string[];
  link?: { text: string; href: string };
};

const policySections: PolicySection[] = [
  {
    id: "overview",
    category: "general",
    title: "1. Overview & Scope",
    icon: LuShieldCheck,
    badge: "Personal Portfolio",
    summary:
      "This is the personal portfolio website of Nirajan Tiwari (hosted at www.nirajantiwari.com.np). Its purpose is to showcase software engineering projects and provide a way for potential employers, collaborators, and clients to get in touch.",
    details: [
      "I collect only the minimum personal data necessary to operate this website and reply to inquiries.",
      "You can browse all case studies and project pages without creating an account or providing personal details.",
      "This website is not directed at children under the age of 16, and I do not knowingly collect personal data from children.",
    ],
  },
  {
    id: "contact-form",
    category: "form",
    title: "2. Contact Form & Third-Party Processing",
    icon: LuMail,
    badge: "Inquiries",
    summary:
      "When you send a message through the contact form, I collect your name, email address, subject, and message text.",
    details: [
      "Purpose & Legal Basis: I process this information on the basis of legitimate interest (responding to your inquiry) and your consent when you submit the form.",
      "Spam Protection: The contact form uses spam protection such as input validation, a hidden honeypot field, and rate limiting.",
      "Third-Party Processor (Web3Forms): Submissions are transmitted to Web3Forms for email delivery and forwarded to my personal inbox. Messages may be stored by Web3Forms according to their privacy policy.",
      "I do not sell, rent, or trade your contact information with any marketing agencies or data brokers.",
    ],
    link: {
      text: "Read the Web3Forms Privacy Policy",
      href: "https://web3forms.com/privacy",
    },
  },
  {
    id: "hosting-logs",
    category: "logs",
    title: "3. Hosting Infrastructure & Server Logs",
    icon: LuServer,
    badge: "Vercel",
    summary:
      "This website is hosted on Vercel's global edge network. Vercel acts as a data processor for site delivery and infrastructure security.",
    details: [
      "Standard Server Logs: Vercel edge servers temporarily process technical connection data, including visitor IP addresses, user agents, requested URLs, and timestamps.",
      "Security & Availability: These logs are processed for security monitoring, DDoS mitigation, network routing, and contact form rate limiting.",
      "Server access logs follow Vercel's standard operational retention schedules.",
    ],
    link: {
      text: "Read the Vercel Privacy Policy",
      href: "https://vercel.com/legal/privacy-policy",
    },
  },
  {
    id: "cookies-analytics",
    category: "cookies",
    title: "4. Cookies & Analytics",
    icon: LuEyeOff,
    badge: "No Ad Cookies",
    summary:
      "I do not set any first-party cookies, and I do not use browser localStorage or sessionStorage.",
    details: [
      "No Advertising Cookies: This site contains no advertising trackers, tracking pixels, or cross-site commercial profiling scripts.",
      "Vercel Analytics: May be enabled to measure aggregated, privacy-friendly page view counts without setting cookies or tracking individual visitors.",
      "Google Analytics: If enabled in production, Google Analytics 4 uses cookies (such as _ga) to distinguish unique visits. No advertising or remarketing features are enabled.",
      "Opt-Out: You can block analytics at any time using your browser settings, content blockers, or by enabling Do Not Track (DNT) / Global Privacy Control (GPC).",
    ],
  },
  {
    id: "retention",
    category: "form",
    title: "5. How Long I Keep Data",
    icon: LuClock,
    badge: "Data Retention",
    summary:
      "I keep personal data only for as long as necessary to fulfill the purpose for which it was collected.",
    details: [
      "Contact Emails: Messages sent through the contact form are retained in my email inbox for as long as needed to handle your inquiry and any follow-up discussions, then deleted unless I am legally required to keep them.",
      "Server Logs: Edge server logs are maintained by Vercel according to their infrastructure retention and rotation practices.",
      "Third-Party Copies: Copies processed by Web3Forms follow their retention schedule.",
    ],
  },
  {
    id: "transfers",
    category: "logs",
    title: "6. International Data Transfers",
    icon: LuGlobe,
    badge: "Global Services",
    summary:
      "Because my hosting provider (Vercel) and email delivery service (Web3Forms) operate global infrastructure, your data may be processed outside Nepal and the EU/EEA.",
    details: [
      "Servers and edge nodes may be located in the United States and other regions worldwide.",
      "Both Vercel and Web3Forms maintain industry-standard security and contractual safeguards for cross-border data processing.",
    ],
  },
  {
    id: "rights",
    category: "rights",
    title: "7. Your Privacy Rights",
    icon: LuUserCheck,
    badge: "Your Control",
    summary:
      "Depending on your location (including under GDPR principles), you have several rights regarding your personal data.",
    details: [
      "Access & Portability: You may request a copy of the personal information or messages I hold about you.",
      "Correction: You may request correction of any inaccurate or outdated information.",
      "Deletion: You may ask me to delete your messages and contact details from my inbox.",
      "Objection & Restriction: You may object to or ask me to restrict how I process your message.",
      "Response Timing: I aim to respond as soon as possible and within 30 days at most; deletion from my inbox is usually much faster. Copies held by third-party services or backups may take longer to be removed.",
      "Complaints: You also have the right to lodge a complaint with your local data protection authority.",
    ],
  },
  {
    id: "external-links",
    category: "general",
    title: "8. External Third-Party Links",
    icon: LuExternalLink,
    badge: "Outbound Links",
    summary:
      "This portfolio contains outbound links to external services such as GitHub, LinkedIn, and third-party hosting platforms.",
    details: [
      "GitHub (https://github.com/Nirajan09) operates under GitHub's Privacy Statement.",
      "LinkedIn (https://www.linkedin.com/in/nirajan-tiwari) operates under LinkedIn's Privacy Policy.",
      "Live project demos may be hosted on third-party services (such as Render or Railway) that maintain their own privacy practices.",
      "I am not responsible for the privacy practices or content of external websites.",
    ],
  },
  {
    id: "policy-changes",
    category: "general",
    title: "9. Changes to This Policy",
    icon: LuHistory,
    badge: "Updates",
    summary:
      "I may update this Privacy Policy from time to time to reflect changes in site functionality, service providers, or legal requirements.",
    details: [
      "Any revisions will be posted directly on this page with an updated 'Last updated' date at the top.",
      "I encourage you to review this page periodically when contacting me.",
    ],
  },
  {
    id: "contact-controller",
    category: "general",
    title: "10. Data Controller & Inquiries",
    icon: LuFingerprint,
    badge: "Direct Contact",
    summary:
      "If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact me directly:",
    details: [
      `Data Controller: ${personal.name}`,
      `Email Address: ${personal.email}`,
      `Location: ${personal.location}`,
      `Website: ${personal.siteUrl}`,
    ],
  },
];

export const PrivacyContent = memo(function PrivacyContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  // Filtered policy sections based on search query and category pill
  const filteredSections = useMemo(() => {
    return policySections.filter((section) => {
      // Category pill check
      if (selectedFilter !== "all" && section.category !== selectedFilter) {
        return false;
      }

      // Search query check
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitle = section.title.toLowerCase().includes(q);
      const inSummary = section.summary.toLowerCase().includes(q);
      const inDetails = section.details.some((d) => d.toLowerCase().includes(q));
      const inBadge = section.badge.toLowerCase().includes(q);

      return inTitle || inSummary || inDetails || inBadge;
    });
  }, [searchQuery, selectedFilter]);

  // Copy section anchor link to clipboard
  const handleCopySectionLink = useCallback((id: string) => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/privacy#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  // Copy email to clipboard
  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(personal.email).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  }, []);

  // Native Print Dialog
  const handlePrint = useCallback(() => {
    if (typeof window !== "undefined") {
      window.print();
    }
  }, []);

  return (
    <article className="min-h-screen overflow-x-clip pt-28 pb-20 select-text sm:pt-36 sm:pb-24">
      <PageContainer className="max-w-4xl">
        {/* Top Header Breadcrumbs & Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3.5 border-b border-border/70 pb-5">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-secondary transition-all duration-200 hover:-translate-x-0.5 hover:border-accent/40 hover:bg-surface hover:text-primary active:scale-95"
          >
            <LuArrowLeft className="size-4 text-muted transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-accent" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handlePrint}
              title="Print or Save Policy as PDF"
              aria-label="Print or save privacy policy as PDF"
              className="group inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface/70 px-3 py-1.5 text-xs font-medium text-secondary transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-primary cursor-pointer active:scale-95"
            >
              <LuPrinter className="size-3.5 text-muted transition-colors group-hover:text-accent" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface/60 px-3 py-1 font-mono text-[11px] text-muted">
              <LuClock className="size-3 text-accent" />
              <span>3 min read</span>
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <header className="mt-8 sm:mt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-3 py-1 text-xs font-medium text-secondary">
            <LuCalendar className="size-3.5 text-accent" />
            <span>Last updated: November 7, 2026</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-secondary max-w-2xl">
            I value your privacy and believe in plain, transparent communication.
            This policy outlines what data is processed when you visit this
            portfolio, how contact form messages are handled, and your rights.
          </p>

          <p className="mt-2 font-mono text-xs text-muted">
            Host: www.nirajantiwari.com.np
          </p>
        </header>

        {/* 4 Trust Pillars */}
        <section
          aria-label="Privacy Principles"
          className="mt-8 sm:mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-surface/60 p-4 backdrop-blur-xs transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow sm:p-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-surface text-accent shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:border-accent/40">
                      <Icon className="size-4.5" />
                    </div>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-full border font-semibold ${pillar.badgeColor}`}
                    >
                      {pillar.stat}
                    </span>
                  </div>

                  <h2 className="mt-3.5 font-display text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-accent">
                    {pillar.title}
                  </h2>
                </div>

                <p className="mt-1.5 text-xs text-secondary/85 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* Search & Topic Filters Bar */}
        <section
          aria-label="Filter policy topics"
          className="mt-10 sm:mt-12 rounded-2xl border border-border/80 bg-surface/50 p-4 sm:p-5 backdrop-blur-md"
        >
          <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <LuSearch
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g. cookies, web3forms, retention, rights)..."
                className="w-full h-10 pl-9.5 pr-8 rounded-xl border border-border/80 bg-background/80 text-xs sm:text-sm text-primary placeholder:text-muted focus:border-accent focus:bg-background focus:outline-hidden focus:ring-1 focus:ring-accent transition-all duration-200"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center rounded-md text-muted hover:text-primary transition-colors cursor-pointer"
                >
                  <LuX className="size-3.5" />
                </button>
              )}
            </div>

            {/* Match Counter */}
            <span className="font-mono text-xs text-secondary shrink-0">
              Showing{" "}
              <strong className="text-accent font-semibold">
                {filteredSections.length}
              </strong>{" "}
              of {policySections.length} sections
            </span>
          </div>

          {/* Quick Filter Category Pills */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-border/60 pt-3">
            <span className="text-[11px] font-mono text-muted mr-1 hidden sm:inline">
              Filter by:
            </span>
            {filterPills.map((pill) => {
              const Icon = pill.icon;
              const isActive = selectedFilter === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedFilter(pill.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border border-accent/40 bg-accent/15 text-accent shadow-[0_0_12px_-3px_rgba(34,211,238,0.3)]"
                      : "border border-border/70 bg-surface/60 text-secondary hover:border-accent/40 hover:text-primary"
                  }`}
                >
                  <Icon className="size-3" />
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Policy Sections List */}
        <section aria-label="Privacy Policy Details" className="mt-8 space-y-5">
          <AnimatePresence mode="popLayout">
            {filteredSections.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-dashed border-border p-8 text-center"
              >
                <LuSearch className="mx-auto size-8 text-muted" />
                <p className="mt-3 font-display text-base font-semibold text-primary">
                  No matching policy sections found
                </p>
                <p className="mt-1 text-xs text-secondary">
                  Try adjusting your search terms or clearing the topic filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFilter("all");
                  }}
                  className="mt-4 rounded-xl border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent hover:bg-accent/20 transition-colors cursor-pointer"
                >
                  Reset Search
                </button>
              </motion.div>
            ) : (
              filteredSections.map((section, index) => {
                const Icon = section.icon;
                const isCopied = copiedId === section.id;

                return (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.2) }}
                    className="group scroll-mt-24 rounded-2xl border border-border/80 bg-surface/60 p-5 backdrop-blur-xs transition-all duration-200 hover:border-accent/40 hover:shadow-glow sm:p-7"
                  >
                    {/* Section Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8.5 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105">
                          <Icon className="size-4.5" />
                        </div>
                        <h2 className="font-display text-base sm:text-lg font-bold text-primary group-hover:text-accent transition-colors duration-200">
                          {section.title}
                        </h2>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full shrink-0">
                          {section.badge}
                        </span>

                        {/* One-click copy anchor button */}
                        <button
                          type="button"
                          onClick={() => handleCopySectionLink(section.id)}
                          title="Copy direct link to this section"
                          aria-label={`Copy direct link to ${section.title}`}
                          className="flex size-7.5 items-center justify-center rounded-lg border border-border/80 bg-surface/70 text-muted transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-accent cursor-pointer active:scale-95"
                        >
                          {isCopied ? (
                            <LuCheck className="size-3.5 text-emerald-400 stroke-3" />
                          ) : (
                            <LuHash className="size-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Section Body */}
                    <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-secondary/90">
                      <p className="font-medium text-primary/95 text-pretty">
                        {section.summary}
                      </p>

                      <ul className="space-y-2 pt-1 border-t border-border/40">
                        {section.details.map((point, pIndex) => (
                          <li
                            key={pIndex}
                            className="flex items-start gap-2.5 text-secondary/85 text-xs sm:text-[13px] leading-relaxed transition-colors hover:text-primary"
                          >
                            <LuCheck className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {section.link && (
                        <div className="pt-2">
                          <a
                            href={section.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline hover:text-accent-hover transition-colors"
                          >
                            <span>{section.link.text}</span>
                            <LuExternalLink className="size-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </section>

        {/* Action Callout Card */}
        <section
          aria-label="Privacy inquiry and data requests"
          className="mt-12 sm:mt-14 rounded-2xl border border-accent/40 bg-linear-to-br from-surface via-surface/95 to-accent/8 p-6 sm:p-8 shadow-[0_0_40px_-8px_rgba(34,211,238,0.15)] relative overflow-hidden"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-primary">
                Questions or Data Requests?
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-secondary/90 leading-relaxed">
                If you have questions about this policy or wish to request access,
                correction, or deletion of past email correspondence, please contact
                me directly. I aim to respond as soon as possible and within 30
                days at most.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2.5">
              <a
                href={`mailto:${personal.email}?subject=Privacy%20Inquiry%20/%20Data%20Request`}
                className="inline-flex items-center gap-2 rounded-xl border border-accent bg-accent px-4 py-2.5 text-xs sm:text-sm font-semibold text-background transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_20px_-3px_rgba(34,211,238,0.4)] cursor-pointer active:scale-95"
              >
                <LuMail className="size-4" />
                <span>Email Inquiry</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-secondary transition-all duration-200 hover:border-accent/40 hover:bg-surface-elevated hover:text-primary cursor-pointer active:scale-95"
              >
                {emailCopied ? (
                  <>
                    <LuCheck className="size-4 text-emerald-400 stroke-3" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <LuCopy className="size-4 text-muted" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface/60 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-secondary transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-primary cursor-pointer active:scale-95"
              >
                <span>Contact Form</span>
                <LuArrowUpRight className="size-4 text-muted" />
              </Link>
            </div>
          </div>
        </section>
      </PageContainer>
    </article>
  );
});
