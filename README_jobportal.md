# JobVista

JobVista is a full-stack job portal built with Next.js that helps candidates discover jobs, recruiters post openings, and applicants track status through a role-based workflow. The application combines Clerk authentication, MongoDB-backed profile data, Stripe membership upgrades, and Supabase resume storage in a single project.

## Overview

JobVista is designed for two user types: job seekers and recruiters. Candidates can create a profile, upload a resume, browse and filter job listings, and apply for opportunities. Recruiters can publish limited job listings, review candidates, and update application status from a dashboard. The project demonstrates a practical full-stack SaaS-style job portal implemented as a Next.js application with server actions and external service integrations.

## Features

- Role-based onboarding for candidates and recruiters
- Candidate profile creation and account editing
- Job listing dashboard with filter menus by company, title, type, and location
- Job posting workflows for recruiters with a posting limit based on membership status
- Job application creation and candidate status tracking
- Recruiter review of candidate profiles and resume access
- Candidate activity dashboard with application statuses
- Membership and premium plans using Stripe checkout
- Resume upload to Supabase storage
- Responsive UI for desktop and mobile navigation
- Clerk-based authentication and session handling
- Search-filter state stored via URL query parameters and session storage

## Tech Stack

### Frontend

- Next.js 16
- React 19
- JavaScript
- Tailwind CSS
- Radix UI primitives
- Lucide React icons
- `react-hook-form` with `zod` validation support
- `next-themes` for theme support

### Backend

- Next.js server actions
- Mongoose
- MongoDB

### Authentication and Payments

- Clerk for sign-in/sign-up and user session management
- Stripe for premium membership checkout

### File Storage and External Services

- Supabase Storage for resume uploads
- MongoDB Atlas connection through `MONGODB_URI`

## Architecture / Project Structure

```text
job-portal/
├── .env.local                # Local environment variables
├── .eslintrc.json            # ESLint configuration
├── components.json           # UI component configuration
├── jsconfig.json             # JS module aliases
├── next.config.mjs           # Next.js config
├── package.json              # Scripts and dependencies
├── postcss.config.mjs        # PostCSS config
├── tailwind.config.mjs       # Tailwind config
├── public/                   # Static assets
│   └── JobPortal_Logo.png
├── src/
│   ├── actions/              # Server actions for profiles, jobs, applications, payment
│   ├── app/                  # App Router pages and auth pages
│   │   ├── account/
│   │   ├── activity/
│   │   ├── jobs/
│   │   ├── membership/
│   │   ├── onboard/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/           # Reusable UI and page components
│   ├── database/             # MongoDB connection helper
│   ├── lib/                  # Shared utility helpers
│   ├── models/               # Mongoose models: Profile, Job, Application
│   ├── utils/                # Form definitions, filters, and shared constants
│   └── proxy.js              # Reserved proxy utility file
├── README.md
└── package-lock.json
```

The main application flow lives in the `src/app` routes, while business logic and database operations are centralized in `src/actions` and `src/models`. There is no dedicated `/api` route folder; requests are handled through server actions instead.

## How It Works

- Users sign up or sign in through Clerk.
- On first visit, the app checks whether a MongoDB profile exists for the authenticated user. If not, the user is redirected to the onboarding flow.
- The onboarding flow lets the user choose a role: candidate or recruiter.
- Candidate onboarding includes profile details and optional resume upload. The resume file is uploaded to a Supabase storage bucket and stored as a file path in the profile.
- Recruiters create job listings through a dialog form. Each posting is saved to the `Job` collection with recruiter metadata and an empty applicants list.
- Candidate users browse jobs from the `/jobs` page, filter by company, title, type, and location, and apply to open positions.
- When a candidate applies, a record is created in the `Application` collection with the job ID, candidate ID, recruiter ID, status, and application date.
- Recruiters review applicants on the jobs dashboard, inspect a candidate profile, download the resume, and update the application status to selected or rejected.
- Candidate users can review their application history in the activity section.
- Membership access is managed through Stripe checkout and stored on the profile as `isPremiumUser`, `memberShipType`, and date fields.

## Authentication & Authorization

Authentication is handled by Clerk using the `@clerk/nextjs` package. The project uses `currentUser()` from `@clerk/nextjs/server` to read the authenticated identity on server-rendered pages and redirect unauthenticated or unprofiled users accordingly.

Implemented authorization logic includes:

- Sign-in and sign-up pages at `/sign-in` and `/sign-up`
- Redirect to `/onboard` when a signed-in user has no corresponding profile
- Redirect to `/` or onboarding screens based on profile existence and role
- Candidate-only access to the activity page
- Recruiter and candidate-specific dashboard behavior on the jobs page
- Role-based profile fields in the `Profile` document (`role: candidate | recruiter`)

This project does not implement a custom JWT system or fine-grained permission middleware beyond the `role` field and route checks present in the app logic.

## Database

The project uses MongoDB with Mongoose models.

### Main models

- `Profile`
  - `userId`
  - `role`
  - `email`
  - `isPremiumUser`
  - `memberShipType`
  - `memeberShipStartDate`
  - `memberShipEndDate`
  - `recruiterInfo`
  - `candidateInfo`
- `Job`
  - `companyName`
  - `title`
  - `location`
  - `type`
  - `experience`
  - `description`
  - `skills`
  - `recruiterId`
  - `applicants`
- `Application`
  - `recruiterUserID`
  - `name`
  - `email`
  - `candidateUserID`
  - `status`
  - `jobID`
  - `jobAppliedDate`

There is also a legacy `User` model in `src/models/User.js` with username/email/password fields, but the current application flow is built around the `Profile`, `Job`, and `Application` models.

## External Services

- Clerk: authentication and signed-in user management
- MongoDB Atlas: persistent application data
- Stripe: premium plan creation and checkout flow
- Supabase Storage: resume upload and public URL retrieval

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
MONGODB_URI=
NEXT_PUBLIC_STRIPE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
FRONTEND_URL=
```

Variable purpose:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk frontend public key
- `CLERK_SECRET_KEY`: Clerk server-side secret key
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: Clerk sign-in route
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: Clerk sign-up route
- `MONGODB_URI`: MongoDB connection string
- `NEXT_PUBLIC_STRIPE_KEY`: Stripe public key for client-side checkout
- `STRIPE_SECRET_KEY`: Stripe secret key used by server actions
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key used by the client
- `FRONTEND_URL`: Frontend URL used by Stripe success/cancel redirects

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Nirajan09/job-portal.git
cd job-portal
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create `.env.local` with the values described above.

4. Ensure MongoDB is reachable from the configured `MONGODB_URI`.

5. Start the development server:

```bash
npm run dev
```

6. Open the app in a browser at:

```text
http://localhost:3000
```

## Running the Project

The repository is configured as a single Next.js application.

```bash
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

Linting:

```bash
npm run lint
```

## Deployment

The repo does not include deployment manifests such as Docker, Vercel configuration files, or infrastructure-as-code definitions. The app includes a `FRONTEND_URL` value pointing to a Vercel deployment at `https://job-portal-liard-one.vercel.app`, but deployment configuration itself is not committed in this repository.

## Screenshots / Demo

A live demo URL is referenced in the project environment configuration:

- https://job-portal-liard-one.vercel.app

No screenshot assets are committed in the repository.

## Testing

No automated test suite or testing framework configuration was found in this repository. At the time of inspection, there were no test files matching a standard JavaScript test pattern under the project directory.

## Future Improvements

The following items are reasonable future enhancements, but they are not currently implemented in the codebase:

- Real-time applicant notifications and messaging
- Advanced job recommendation logic based on candidate skill matching
- Full admin dashboard for moderation and analytics
- Email-based verification and password reset workflows
- Resume parsing and structured skill extraction
- Search pagination and server-side filtering at scale
- Deployment automation and CI/CD configuration

## License

No license file was found in the repository. The project does not currently include a declared license in the root directory.

## Author

Nirajan Tiwari

- GitHub: https://github.com/Nirajan09
- Repository: https://github.com/Nirajan09/job-portal

## Project Highlights

- Full-stack job portal built with Next.js, MongoDB, and role-based UI flows
- Candidate and recruiter workflows with onboarding, job posting, and applicant review
- Clerk authentication integrated directly into the app routing and UI
- Stripe subscription checkout for premium membership plans
- Resume storage and retrieval using Supabase Storage
- Responsive, component-driven frontend built with Tailwind CSS and reusable UI primitives

