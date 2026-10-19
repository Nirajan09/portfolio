# Nirajan Tiwari — Portfolio

A personal portfolio site built with Next.js (App Router), React, TypeScript, and Tailwind CSS. Dark, modern design with a content-rich landing page, detailed project pages, experience timeline, certifications, and a server-side contact form.

**Live site:** [https://www.nirajantiwari.com.np](https://www.nirajantiwari.com.np)

## Features

- Single-page landing layout with eight sections: Hero, About, Skills, Services, Projects, Experience, Certifications, Contact
- Dynamic project detail pages at `/projects/[slug]` with grouped stack, features, how-it-works flow, and highlights
- Server-side contact form (`POST /api/contact`) with validation, rate limiting, and Resend email delivery
- Full SEO setup: metadata, Open Graph, Twitter cards, JSON-LD (Person + WebSite), sitemap, robots.txt, and per-project OG images
- Security headers: CSP (production), `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS, and more
- Optional analytics: Google Analytics 4 and Vercel Analytics, with a `data-track-*` attribute convention
- Motion and reveal animations (via `motion`), interactive mesh background, and a typed role animation in the hero
- Inter for body copy, Space Grotesk for display typography

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19 + TypeScript 5
- [Tailwind CSS](https://tailwindcss.com) 4 with CSS-variable design tokens (`app/globals.css`)
- [motion](https://motion.dev) for animation, [react-icons](https://react-icons.github.io) for icons
- [Resend](https://resend.com) for contact email delivery
- [@vercel/analytics](https://vercel.com/docs/analytics) (optional)

## Project structure

```
portfolio-nextjs/
├── app/                       # Next.js App Router
│   ├── api/contact/route.ts   # POST /api/contact — server-side form handler
│   ├── projects/[slug]/       # Dynamic project detail pages + OG images
│   ├── globals.css            # Design tokens and Tailwind theme
│   ├── layout.tsx             # Root layout, fonts, metadata, JSON-LD
│   ├── page.tsx               # Landing page (composes all sections)
│   ├── manifest.ts            # Web app manifest
│   ├── robots.ts              # robots.txt (disallows /api/, links sitemap)
│   ├── sitemap.ts             # sitemap.xml (home + all projects)
│   ├── icon.tsx               # Favicon
│   ├── apple-icon.tsx         # Apple touch icon
│   └── opengraph-image.tsx    # Default OG image
├── components/
│   ├── analytics/             # GA4, Vercel Analytics, click tracker
│   ├── animation/             # MotionConfig, Reveal, Stagger, TypingRole
│   ├── background/            # InteractiveMesh backdrop
│   ├── certifications/        # CertificationCard, CertificatePreview
│   ├── contact/               # ContactForm, ContactStatusModal
│   ├── experience/            # CareerTimeline
│   ├── layout/                # Navbar, Footer, PageContainer, Section
│   ├── projects/              # ProjectCard, ProjectDetail, ProjectTabs, ...
│   ├── sections/              # Hero, About, Skills, Services, Projects, Experience, Certifications, Contact
│   ├── seo/                   # JsonLd injector
│   └── ui/                    # Button, Card, Badge, TechChip, SectionHeading, ...
├── data/                      # All site content (see below)
├── lib/                       # Shared + server-only logic
│   ├── contact.ts             # Validation schema and limits (client + server)
│   ├── send-contact-email.ts  # Resend delivery ("server-only" import)
│   ├── rate-limit.ts          # Fixed-window, in-memory limiter
│   ├── seo.ts                 # siteConfig, metadata helpers, JSON-LD builders
│   ├── analytics.ts           # trackEvent + data-track-* param reader
│   ├── readTime.ts, utils.ts, brand.tsx
├── public/                    # Static assets (generated project covers live here)
├── types/index.ts             # Project, Experience, Certification, StackGroup
├── next.config.ts             # Security headers, CSP, redirects, no-store on /api/*
├── .env.example               # Environment variable template
└── PORTFOLIO_DOCUMENTATION.md # Full audit, security review, and roadmap
```

## Getting started

Prerequisites: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

Other scripts:

```bash
npm run lint          # ESLint
npx tsc --noEmit      # TypeScript check
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the server-side values for the contact form:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | For email delivery | API key from [Resend](https://resend.com). |
| `CONTACT_TO_EMAIL` | For email delivery | Inbox that receives portfolio messages. |
| `CONTACT_FROM_EMAIL` | For email delivery | Verified sender, e.g. `Portfolio <contact@yourdomain.com>`. For testing, `onboarding@resend.dev` only delivers to your own Resend account email. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 measurement ID (`G-XXXXXXXXXX`). Also unlocks GA origins in the CSP. |
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | Optional | Set to `true` to enable Vercel Analytics. |

All `RESEND_*` / `CONTACT_*` variables are server-only and never reach the client bundle. Without them the form reports "not available" (HTTP 503) and points visitors to your email address instead — no broken submissions.

## How the contact form works

The form posts to `/api/contact`, the single entry point for messages. The route:

1. Accepts same-origin requests only (`Sec-Fetch-Site`, with an `Origin`/host fallback)
2. Rate limits per client IP (5 messages per 10 minutes, in-memory fixed window)
3. Caps the body at 10 KB and parses JSON
4. Silently accepts anything that fills the hidden honeypot field
5. Re-validates every field server-side (`lib/contact.ts`, shared with the client but never trusted)
6. Delivers via Resend with a 10-second timeout; returns `503` when unconfigured and `502` on provider failure

API routes are sent with `Cache-Control: no-store`. On serverless hosts the rate limiter is per-instance — use a shared store (Upstash/Redis) if you need strict global limits.

## Managing content

All visible content lives in `data/` — edit these files, not the components:

| File | Contents |
| --- | --- |
| `personal.ts` | Name, role, location, contact info, socials, `resumeUrl`, `photo` |
| `about.ts` | About section copy |
| `skills.ts` | Skill groups for the Skills section |
| `services.ts` | Services offered |
| `projects.ts` | Project entries (slug, summary, stack, features, links, ...) |
| `experience.ts` | Career timeline entries |
| `certifications.ts` | Certifications (the nav link only appears when this list is non-empty) |
| `education.ts` | Education entries |
| `navigation.ts` | Nav items and `/#section` hrefs |

Links left empty are simply not rendered — e.g. `resumeUrl: null` means no resume CTA, so there are no dead links or 404s.

## SEO & indexing

- `app/layout.tsx` declares global metadata; `lib/seo.ts` builds per-page metadata plus Person and WebSite JSON-LD
- `sitemap.ts` and `robots.ts` are generated from the projects data
- Indexing is allowed only on the production deployment (`VERCEL_ENV=production`); previews are `noindex`
- `next.config.ts` redirects the bare domain `nirajantiwari.com.np` to `https://www.nirajantiwari.com.np`

## Security baseline

- Content Security Policy in production (GA endpoints only added when a measurement ID is set)
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, HSTS
- `poweredByHeader: false` — the framework is not advertised
- Contact credentials stay server-side; the form fails gracefully when email is misconfigured

See [PORTFOLIO_DOCUMENTATION.md](PORTFOLIO_DOCUMENTATION.md) for the full audit, security review, visual assessment, and improvement roadmap.

## Deployment

Deploy to Vercel (or any Node host). Set the environment variables from `.env.example` in the deployment dashboard, then verify the contact form sends a real email before launch.
