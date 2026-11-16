import type { Project } from "@/types";

export const projects: readonly Project[] = [
  {
    slug: "book-recommendation-system",
    title: "Book Recommendation System",
    category: "E-Commerce & Machine Learning",
    status: "Live Production",
    summary:
      "Full-stack bookstore with personalized recommendations, multi-gateway checkout (Stripe, eSewa, COD), and inventory controls.",
    overview:
      "A full-stack bookstore built with a Django REST Framework API and a React 19 frontend. The platform supports user registration, catalog search and filtering, persistent cart and wishlist storage, order management, and an admin view for sales metrics and stock alerts. It integrates a recommendation endpoint using SciPy and scikit-learn that suggests books based on user ratings.",
    problem:
      "Online book shoppers often struggle to discover relevant titles without tailored suggestions based on reader ratings, while checkout options in regional markets are frequently limited to single payment methods. Store administrators also need a direct way to monitor order fulfillment, track sales, and identify low-inventory items.",
    solution:
      "Developed a decoupled web application with a Django REST API backend and a React 19 frontend. Built a hybrid collaborative filtering engine with SciPy and scikit-learn that falls back to top-rated popular books when user rating history is limited. Integrated Stripe card payments, eSewa digital wallet verification, and Cash on Delivery, alongside role-based route protection for administrative operations.",
    targetAudience: [
      {
        role: "Book Readers & Shoppers",
        description:
          "Search the catalog by title, author, or ISBN, submit star ratings and reviews, maintain carts and wishlists, and complete orders using Stripe, eSewa, or Cash on Delivery.",
      },
      {
        role: "Bookstore Administrators",
        description:
          "Monitor sales revenue, order fulfillment statuses, best-selling titles, and low-stock inventory alerts from a protected dashboard.",
      },
    ],
    stack: [
      "Django",
      "Django REST Framework",
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Stripe",
      "Python",
      "scikit-learn",
    ],
    stackGroups: [
      {
        label: "Frontend",
        items: [
          "React 19",
          "Vite",
          "React Router DOM",
          "Axios",
          "Tailwind CSS",
          "React Hook Form",
          "Yup",
          "React Toastify",
          "Stripe.js / react-stripe-js",
        ],
      },
      {
        label: "Backend",
        items: [
          "Python",
          "Django 5.2.8",
          "Django REST Framework",
          "Django Filters",
          "Django Token Authentication",
        ],
      },
      {
        label: "Recommendation & Data",
        items: ["pandas", "NumPy", "SciPy", "scikit-learn"],
      },
      {
        label: "Database",
        items: [
          "SQLite (local development)",
          "PostgreSQL compatible via dj_database_url (production)",
        ],
      },
      {
        label: "Services & Payments",
        items: [
          "Stripe Payment Intents API",
          "eSewa Payment Verification",
          "Django ImageField Media Uploads",
        ],
      },
    ],
    architecture: {
      style: "Decoupled Client-Server REST Architecture",
      summary:
        "The Django backend provides authenticated REST endpoints for account management, book listings, orders, and recommendation calculations. The React frontend handles user authentication state, role-guarded routes, cart management, and catalog browsing.",
      layers: [
        {
          layer: "Presentation Layer",
          title: "React 19 + Vite Frontend",
          description:
            "Client routing with React Router DOM, form validation with React Hook Form and Yup, role-guarded routes for users and staff, and toast status notifications.",
          technologies: [
            "React 19",
            "Vite",
            "Tailwind CSS",
            "Axios",
            "React Hook Form",
            "Yup",
          ],
        },
        {
          layer: "Application & API Layer",
          title: "Django 5 REST API",
          description:
            "REST viewsets for user accounts, book catalog search, cart operations, review submissions, payment verification, and dashboard analytics.",
          technologies: [
            "Django 5.2.8",
            "Django REST Framework",
            "Django Filters",
            "TokenAuthentication",
          ],
        },
        {
          layer: "Intelligence Engine",
          title: "Hybrid Recommendation Pipeline",
          description:
            "Matrix calculations for user-based and item-based collaborative filtering, with an automated fallback to popular book suggestions when rating data is sparse.",
          technologies: ["scikit-learn", "SciPy", "NumPy", "pandas"],
        },
        {
          layer: "Persistence & Services",
          title: "Database & Payment Gateways",
          description:
            "Django ORM with SQLite for development and PostgreSQL support in production. Integrated with Stripe PaymentIntents and eSewa verification endpoints.",
          technologies: [
            "SQLite / PostgreSQL",
            "Stripe API",
            "eSewa Verification",
            "Django Media",
          ],
        },
      ],
    },
    features: [
      "Token-based authentication with Django default user model and DRF token auth",
      "Book catalog with paginated results and search by title, author, or ISBN",
      "User ratings and written review submissions feeding collaborative filtering calculations",
      "Per-user persistent cart and wishlist with stock quantity validation",
      "Checkout flow supporting Stripe card payments, eSewa wallet verification, and Cash on Delivery",
      "Order creation, status tracking, and self-service cancellation for pending orders",
      "Admin dashboard with revenue totals, order counts, best-selling titles, and low-stock alerts",
      "Stock inventory management for admin-added books",
      "Personalized recommendation endpoint combining user/item collaborative filtering with popular fallback",
      "Responsive frontend built with React 19, Vite, and Tailwind CSS",
    ],
    detailedFeatures: [
      {
        title: "Token-Based Authentication & Role Guards",
        description:
          "Django authentication returning API tokens stored in localStorage, with frontend route guards separating customer and admin views based on is_staff.",
        category: "Authentication",
      },
      {
        title: "Paginated Catalog & Search",
        description:
          "Search books by title, author, or ISBN with paginated REST endpoints and dataset imports from CSV.",
        category: "Catalog",
      },
      {
        title: "Hybrid Recommendation Engine",
        description:
          "Combines user-based and item-based collaborative filtering using SciPy and scikit-learn, falling back to top-rated books when ratings are sparse.",
        category: "Machine Learning",
      },
      {
        title: "Cart & Wishlist with Stock Validation",
        description:
          "Per-user persistent cart and wishlist items validated against current inventory quantities.",
        category: "Shopping",
      },
      {
        title: "Multi-Gateway Checkout",
        description:
          "Unified order placement supporting Stripe Payment Intents, eSewa payment verification, and Cash on Delivery.",
        category: "Payments",
      },
      {
        title: "Order Lifecycle & Cancellation",
        description:
          "End-to-end order placement, order status tracking, and self-service cancellation for pending orders.",
        category: "Orders",
      },
      {
        title: "Admin Analytics & Inventory Controls",
        description:
          "Admin dashboard computing total revenue, order counts, best-selling titles, low-stock alerts, and stock adjustments.",
        category: "Administration",
      },
      {
        title: "Ratings & Review Submissions",
        description:
          "Authenticated users submit star ratings and review feedback that feed directly into recommendation calculations.",
        category: "Social",
      },
    ],
    challenges: [
      {
        title: "Cold-Start & Rating Sparsity",
        challenge:
          "Collaborative filtering produces inaccurate or empty recommendations when a user has few or no rating interactions.",
        solution:
          "Implemented a fallback mechanism that checks rating matrix density. When user rating history is sparse, the system serves popular titles ranked by average community ratings.",
        impact:
          "Ensures users receive relevant book suggestions regardless of account history.",
      },
      {
        title: "Multi-Gateway Payment Integration",
        challenge:
          "Handling different verification lifecycles across client-side Stripe PaymentIntents, redirect-based eSewa verification, and immediate Cash on Delivery orders.",
        solution:
          "Standardized the order data structure on the Django backend while directing Stripe and eSewa through specialized client-side handlers before confirming orders.",
        impact:
          "Provides dependable checkout across international credit cards, regional digital wallets, and cash on delivery.",
      },
      {
        title: "Cart-to-Stock Synchronization",
        challenge:
          "Preventing checkout race conditions where item quantities in carts exceed available store stock.",
        solution:
          "Added server-side validation during cart updates and verified available inventory before creating order records in the checkout viewset.",
        impact:
          "Prevents orders for out-of-stock titles and ensures inventory counts remain accurate.",
      },
    ],
    howItWorks: [
      "Users sign up or log in through the frontend, storing the returned Django token in localStorage.",
      "The AuthContext reads the token and route guards restrict access to admin or user areas based on is_staff.",
      "Book catalog data is served in paginated, searchable REST lists from the Django backend.",
      "Users add titles to cart or wishlist; cart items are persisted per user and validated against current stock.",
      "Checkout creates orders immediately for cash on delivery or directs through Stripe / eSewa verification flows.",
      "The recommendation endpoint runs hybrid collaborative filtering, falling back to popular books when ratings are sparse.",
      "Admins access dashboard statistics and manage book inventory via protected endpoints.",
    ],
    workflow: [
      {
        step: 1,
        title: "Authentication & Role Assignment",
        description:
          "User logs in via /accounts/login/; frontend stores DRF token in localStorage and AuthContext configures UserRoute or AdminRoute access.",
      },
      {
        step: 2,
        title: "Catalog Discovery & Recommendations",
        description:
          "User browses paginated books or fetches /recommend/?user_id=<id> where hybrid collaborative filtering computes tailored book suggestions.",
      },
      {
        step: 3,
        title: "Cart & Stock Verification",
        description:
          "Selected books are added to per-user cart and validated against current inventory quantities before proceeding to checkout.",
      },
      {
        step: 4,
        title: "Checkout & Multi-Rail Payment",
        description:
          "User submits checkout form; system routes through Stripe PaymentIntent, eSewa verification, or immediately records Cash on Delivery.",
      },
      {
        step: 5,
        title: "Order Tracking & Admin Fulfillment",
        description:
          "Orders are assigned statuses; users can track or cancel pending orders while admins view sales analytics and low-stock alerts.",
      },
    ],
    highlights: [
      "Collaborative filtering engine with cold-start fallback",
      "Multi-gateway checkout with Stripe, eSewa, and COD",
      "Role-based access for shoppers and administrators",
      "Admin dashboard with revenue metrics and stock alerts",
    ],
    links: {
      live: "https://book-recommendation-system-umber.vercel.app/",
      repo: "https://github.com/Nirajan09/BookRecommendationSystem",
    },
    cover: {
      src: "/projects/book-recommendation-system.png",
      alt: "Book Recommendation System - Full-stack bookstore web application",
    },
  },

  {
    slug: "job-portal",
    title: "JobVista",
    category: "Job Portal & Recruitment",
    status: "Live Production",
    summary:
      "Recruitment platform built with Next.js Server Actions, Clerk authentication, Supabase resume storage, and Stripe tiers.",
    overview:
      "JobVista is a full-stack job platform connecting candidates and recruiters. Built with the Next.js App Router and Server Actions, it provides role-specific onboarding: candidates create profiles, upload PDF resumes to Supabase Storage, and track application statuses, while recruiters post openings, review candidate profiles, and manage posting limits through Stripe memberships.",
    problem:
      "Job seekers often lack clear visibility into their application statuses across open roles, while recruiters need a centralized dashboard to publish job listings, review applicant profiles, download resumes, and manage posting allowances without complicated toolchains.",
    solution:
      "Built a Next.js application using Server Actions for direct database queries with Mongoose and MongoDB Atlas. Integrated Clerk for authentication and user sessions, Supabase Storage for candidate resume uploads, and Stripe Checkout to handle recruiter membership tiers and job posting limits.",
    targetAudience: [
      {
        role: "Job Seekers (Candidates)",
        description:
          "Complete candidate onboarding, upload PDF resumes to Supabase Storage, filter job listings by company, role type, and location, submit applications, and monitor progress in an activity dashboard.",
      },
      {
        role: "Recruiters & Hiring Managers",
        description:
          "Post job openings within tier limits, review incoming applications, inspect candidate profiles, download stored resumes, and update applicant statuses.",
      },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "Server Actions",
      "MongoDB",
      "Clerk",
      "Stripe",
      "Supabase",
      "Tailwind CSS",
    ],
    stackGroups: [
      {
        label: "Frontend",
        items: [
          "Next.js 16 (App Router)",
          "React 19",
          "JavaScript",
          "Tailwind CSS",
          "Radix UI Primitives",
          "Lucide React Icons",
          "React Hook Form",
          "Zod Validation",
          "next-themes",
        ],
      },
      {
        label: "Backend",
        items: ["Next.js Server Actions", "Mongoose", "MongoDB Atlas"],
      },
      {
        label: "Authentication",
        items: ["Clerk (@clerk/nextjs)"],
      },
      {
        label: "Payments & Storage",
        items: [
          "Stripe Checkout (Membership Subscriptions)",
          "Supabase Storage (Resume File Management)",
        ],
      },
    ],
    architecture: {
      style: "Full-Stack App Router with Server Actions",
      summary:
        "Built around Next.js App Router server actions that communicate directly with MongoDB via Mongoose, bypassing the need for separate REST API routes. Integrates Clerk for user identity, MongoDB Atlas for data persistence, Supabase Storage for resume files, and Stripe for subscription billing.",
      layers: [
        {
          layer: "Presentation & Routing",
          title: "Next.js App Router",
          description:
            "Server and client components with Radix UI primitives, Lucide icons, responsive navigation, and URL query parameter state persistence for job filters.",
          technologies: [
            "Next.js 16",
            "React 19",
            "Tailwind CSS",
            "Radix UI",
            "Lucide React",
          ],
        },
        {
          layer: "Business Logic",
          title: "Next.js Server Actions",
          description:
            "Server actions handling profile onboarding, job posting validation, applicant status updates, and Stripe checkout session initialization without REST route boilerplate.",
          technologies: ["Server Actions", "Mongoose", "Zod", "React Hook Form"],
        },
        {
          layer: "Identity & Membership",
          title: "Clerk & Stripe",
          description:
            "Clerk handles authentication and session state. Stripe Checkout manages recruiter memberships and updates tier-based posting limits.",
          technologies: ["Clerk Auth", "Stripe Checkout", "Webhooks"],
        },
        {
          layer: "Data & Document Storage",
          title: "MongoDB Atlas & Supabase",
          description:
            "Mongoose models (Profile, Job, Application) stored in MongoDB Atlas, with candidate resume documents stored in Supabase Storage buckets.",
          technologies: [
            "MongoDB Atlas",
            "Mongoose",
            "Supabase Storage",
          ],
        },
      ],
    },
    features: [
      "Role-based onboarding for candidates and recruiters on first sign-in",
      "Candidate profile creation and account management",
      "Job listing dashboard with multi-criteria filtering by company, title, type, and location",
      "Recruiter job posting workflows with tier limits based on membership status",
      "Job application creation and status tracking (selected, rejected, pending)",
      "Recruiter candidate screening with direct profile and Supabase resume access",
      "Candidate activity dashboard with real-time application status tracking",
      "Premium membership tiers via Stripe checkout",
      "Resume uploads and secure file storage in Supabase Storage",
      "Search and filter state preserved across URL query parameters and session storage",
    ],
    detailedFeatures: [
      {
        title: "Role-Based Onboarding Flow",
        description:
          "New users authenticated via Clerk are directed to role selection (Candidate or Recruiter), creating dedicated Mongoose profile documents with role-specific metadata.",
        category: "Onboarding",
      },
      {
        title: "Recruiter Job Posting Workflows",
        description:
          "Recruiters publish job openings specifying company, experience, type, location, and required skills, governed by tier-based posting quotas.",
        category: "Recruitment",
      },
      {
        title: "Multi-Parametric Job Search & Filter",
        description:
          "Search filters jobs by company name, title, employment type, and location, with filter state synced to URL query parameters and session storage.",
        category: "Discovery",
      },
      {
        title: "Application Workflow & Resume Access",
        description:
          "Candidates submit applications referencing their stored Supabase resume; recruiters review candidate profiles and download resumes directly.",
        category: "Applications",
      },
      {
        title: "Recruiter Candidate Screening",
        description:
          "Recruiters evaluate applicants per job listing and transition application statuses to selected or rejected with immediate database updates.",
        category: "Screening",
      },
      {
        title: "Candidate Activity Dashboard",
        description:
          "Dedicated candidate dashboard tracking all applied jobs with real-time status badges (Pending, Selected, Rejected).",
        category: "Activity",
      },
      {
        title: "Stripe Premium Membership Checkout",
        description:
          "Recruiter subscription flow via Stripe lifting job posting limits and updating profile membership timestamps.",
        category: "Monetization",
      },
      {
        title: "Cloud Resume Storage via Supabase",
        description:
          "Direct resume PDF upload to Supabase Storage buckets, saving secure file paths in the candidate profile.",
        category: "Storage",
      },
    ],
    challenges: [
      {
        title: "Dual-Role Identity & Profile Synchronization",
        challenge:
          "Clerk manages authentication, but application authorization relies on MongoDB profile roles (Candidate vs Recruiter).",
        solution:
          "Implemented server-side middleware and route checks using currentUser() that detect unprofiled users and enforce the onboarding step before granting application access.",
        impact:
          "Clear authentication experience with strict role separation across routes.",
      },
      {
        title: "Secure Resume Upload & Cloud Retrieval",
        challenge:
          "Handling candidate PDF resume uploads without burdening MongoDB or writing temporary files to the web server.",
        solution:
          "Integrated Supabase Storage to manage file uploads directly, persisting the file path in MongoDB and generating public URLs during recruiter applicant reviews.",
        impact:
          "Document storage with fast resume downloads for hiring managers without local disk writes.",
      },
      {
        title: "URL-Synchronized Filter State",
        challenge:
          "Preserving active job filter combinations across page reloads, browser navigation, and shared recruiter links.",
        solution:
          "Synchronized active filter states with URL search parameters and session storage, enabling bookmarkable search states and fluid browser history navigation.",
        impact:
          "Maintains active search criteria across page refreshes and browser history navigation.",
      },
    ],
    howItWorks: [
      "Users sign up through Clerk and are routed to /onboard if no profile document exists.",
      "The onboarding flow sets the role to candidate (with optional resume) or recruiter.",
      "Candidates upload resume files to Supabase Storage and manage profile data in MongoDB.",
      "Recruiters publish jobs via dialog forms, saving to the Job collection with tier-based limits.",
      "Candidates browse and filter jobs from /jobs and apply, creating an Application document.",
      "Recruiters review applicants, inspect profiles, download resumes, and mark status as selected or rejected.",
      "Candidates monitor decisions in the activity dashboard, while recruiters can upgrade via Stripe.",
    ],
    workflow: [
      {
        step: 1,
        title: "Clerk Authentication & Onboarding",
        description:
          "User signs in with Clerk; if no MongoDB profile exists, app redirects to /onboard where user chooses Candidate or Recruiter.",
      },
      {
        step: 2,
        title: "Candidate Profile & Resume Setup",
        description:
          "Candidate inputs professional details and uploads resume PDF to Supabase Storage, persisting metadata in MongoDB.",
      },
      {
        step: 3,
        title: "Recruiter Job Creation",
        description:
          "Recruiter creates job listings; server actions validate limits against Stripe membership status and save to the Job collection.",
      },
      {
        step: 4,
        title: "Job Discovery & Application",
        description:
          "Candidates filter openings by location, title, and type, and submit applications creating Application records.",
      },
      {
        step: 5,
        title: "Applicant Screening & Status Decisions",
        description:
          "Recruiter inspects applicants and resumes on the dashboard, updating application status to selected or rejected.",
      },
    ],
    highlights: [
      "Server Actions architecture eliminating REST API boilerplate and client-side fetching overhead",
      "Integrated multi-service stack: Clerk, MongoDB Atlas, Supabase Storage, and Stripe",
      "Role-based user journeys with tailored onboarding and dashboards for candidates and recruiters",
      "URL-synchronized search filters across company, role, type, and location",
    ],
    links: {
      live: "https://job-portal-liard-one.vercel.app/",
      repo: "https://github.com/Nirajan09/job-portal",
    },
    cover: {
      src: "/projects/job-portal.png",
      alt: "JobVista - Full-stack recruitment and job search web platform",
    },
  },

  {
    slug: "image-sharing-platform",
    title: "Pixify",
    category: "Media Sharing & Cloud Storage",
    status: "Live Production",
    summary:
      "Media management platform featuring in-memory Cloudinary streaming uploads, JWT authentication, and owner-based controls.",
    overview:
      "Pixify is an image management and sharing application built with a Next.js 16 frontend and an Express 5 REST API backend. It handles image uploads using memory buffering piped directly to Cloudinary, avoiding disk writes on the server. The application implements user authentication with JWTs, author-based ownership checks for updating or deleting media, and a paginated gallery with image metadata inspection.",
    problem:
      "Uploading and storing media files directly on application servers often creates disk-space constraints and slow file I/O. Without automated cloud cleanup, replacing or deleting files also leaves orphaned assets in cloud storage, while missing ownership verification can allow unauthorized modifications.",
    solution:
      "Built a decoupled architecture separating the Next.js client from an Express 5 API. Used Multer in-memory storage to stream image buffers directly to Cloudinary without writing files to local disk. Implemented backend middleware verifying that only the original uploader can modify or delete an asset, and added automated Cloudinary asset deletion when images are replaced or removed.",
    targetAudience: [
      {
        role: "Registered Users",
        description:
          "Upload PNG or JPG images up to 5 MB, browse the community gallery with sorting, filter personal media, view image metadata, replace existing files, and delete their own uploads.",
      },
      {
        role: "Guest Visitors",
        description:
          "Browse public gallery previews, read platform details, and access account registration or sign-in forms.",
      },
    ],
    stack: [
      "Next.js 16",
      "Express 5",
      "MongoDB",
      "Cloudinary",
      "Tailwind CSS",
      "JWT",
      "Node.js",
      "Radix UI",
    ],
    stackGroups: [
      {
        label: "Frontend",
        items: [
          "Next.js 16 (App Router)",
          "React 19",
          "Tailwind CSS v4",
          "Radix UI Primitives",
          "Lucide React Icons",
          "React Hook Form",
          "Yup Validation",
          "Axios",
          "React Toastify",
          "jwt-decode",
        ],
      },
      {
        label: "Backend",
        items: [
          "Node.js 18+",
          "Express 5.1.0",
          "Mongoose 8.13",
          "Multer (memoryStorage)",
          "Cloudinary SDK v2",
          "bcryptjs",
          "jsonwebtoken",
          "cors",
        ],
      },
      {
        label: "Database",
        items: ["MongoDB", "Mongoose ODM (Users & Media collections)"],
      },
      {
        label: "Cloud Storage & CDN",
        items: [
          "Cloudinary Media Cloud (Streaming, CDN delivery, Asset destruction)",
        ],
      },
    ],
    architecture: {
      style: "Decoupled Client-Server with Cloud Streaming",
      summary:
        "Decoupled architecture pairing a Next.js 16 frontend with an Express 5 REST API. Uploaded files are held in memory with Multer and piped directly to Cloudinary via Node.js Readable streams, avoiding local disk writes. MongoDB stores user accounts and media metadata.",
      layers: [
        {
          layer: "Frontend Client",
          title: "Next.js 16 App Router",
          description:
            "Responsive presentation with Tailwind CSS v4, Radix UI dialogs, client AuthContext with automatic JWT expiration checks, and Axios HTTP client.",
          technologies: [
            "Next.js 16",
            "React 19",
            "Tailwind CSS v4",
            "Radix UI",
            "jwt-decode",
          ],
        },
        {
          layer: "Backend API",
          title: "Express 5 REST Server",
          description:
            "Middleware pipeline with CORS validation, JSON body parsers, JWT authentication middleware, and Multer in-memory multipart form processing.",
          technologies: [
            "Express 5.1.0",
            "Node.js",
            "jsonwebtoken",
            "bcryptjs",
          ],
        },
        {
          layer: "Cloud Media Pipeline",
          title: "Cloudinary Stream Uploads",
          description:
            "Direct memory-to-cloud streaming via Readable.from(buffer).pipe(upload_stream), in-place asset destruction on replacement, and CDN delivery.",
          technologies: [
            "Cloudinary SDK v2",
            "Multer memoryStorage",
            "Node.js Streams",
          ],
        },
        {
          layer: "Persistence Layer",
          title: "MongoDB & Mongoose",
          description:
            "User credentials with bcrypt salted hashing and Media metadata records linked to uploader user IDs with timestamps and publicId indexing.",
          technologies: ["MongoDB", "Mongoose 8.13"],
        },
      ],
    },
    features: [
      "User authentication with bcrypt password hashing and 1-hour JWT tokens",
      "In-memory stream uploads to Cloudinary using Multer memoryStorage without writing files to local disk",
      "Ownership verification middleware ensuring users can only edit or delete their own uploads",
      "Asset replacement workflow that deletes previous files from Cloudinary storage before saving new versions",
      "Paginated community image gallery with sorting options",
      "User-specific media view displaying assets uploaded by the current account",
      "Image inspector modal showing upload metadata and full-resolution view",
      "Confirmation dialogs before destructive operations to prevent accidental deletion",
      "Client-side session validation that detects expired tokens and resets authentication state",
    ],
    detailedFeatures: [
      {
        title: "JWT Authentication",
        description:
          "User registration and login using bcryptjs password hashing with 10 salt rounds and 1-hour HMAC SHA-256 JWT tokens for API requests.",
        category: "Authentication",
      },
      {
        title: "In-Memory Stream Uploads",
        description:
          "Multipart file processing using Multer memoryStorage, streaming buffers directly to Cloudinary using Node.js Readable streams to avoid local temporary files.",
        category: "Media Handling",
      },
      {
        title: "Ownership Authorization",
        description:
          "Express middleware and route handlers checking that the authenticated user ID matches the uploader ID before allowing asset updates or deletions.",
        category: "Authorization",
      },
      {
        title: "Asset Replacement Workflow",
        description:
          "Enables users to replace existing images while deleting the obsolete asset on Cloudinary to prevent unreferenced files from taking up storage.",
        category: "Asset Management",
      },
      {
        title: "Community Gallery",
        description:
          "Paginated image feed supporting sorting by upload date and linking images to uploader account names.",
        category: "Gallery",
      },
      {
        title: "User Media Filtering",
        description:
          "Dedicated endpoint returning only the assets uploaded by the authenticated user for convenient profile asset management.",
        category: "Filtering",
      },
      {
        title: "Image Inspection Modal",
        description:
          "Radix UI dialog displaying high-resolution image views, Cloudinary public identifiers, uploader names, and upload dates.",
        category: "User Interface",
      },
      {
        title: "Deletion Confirmation Dialog",
        description:
          "Confirmation step before file deletion, ensuring users confirm destructive actions before files are removed from Cloudinary and MongoDB.",
        category: "User Interface",
      },
    ],
    challenges: [
      {
        title: "Avoiding Disk-Bound Temporary Files During Uploads",
        challenge:
          "Default multipart upload configurations often write temporary files to the server's local disk before uploading to cloud storage, adding disk I/O overhead and consuming local disk space.",
        solution:
          "Configured Multer with memoryStorage and streamed the file buffer directly to Cloudinary using Node.js Readable streams, bypassing local disk storage entirely.",
        impact:
          "Eliminated local temporary file management and reduced upload processing overhead.",
      },
      {
        title: "Preventing Unreferenced Cloud Storage Files",
        challenge:
          "Updating or deleting media records in MongoDB without cleaning up corresponding Cloudinary assets would leave orphaned files in cloud storage.",
        solution:
          "Integrated Cloudinary's asset destruction API into the delete and update controllers, removing previous assets whenever a file is replaced or removed from the database.",
        impact:
          "Prevents orphaned files from accumulating in cloud storage.",
      },
      {
        title: "Handling Expired Client Tokens Gracefully",
        challenge:
          "Expired JWT tokens stored in browser localStorage caused unexpected 401 API responses during user sessions without clear feedback.",
        solution:
          "Added an AuthContext that inspects token expiration claims on page load and route changes, clearing expired credentials and redirecting users to the login screen.",
        impact:
          "Ensures predictable authentication states and prevents unexpected API errors.",
      },
    ],
    howItWorks: [
      "Users register or log in; passwords are encrypted with bcrypt and the server returns a 1-hour signed JWT.",
      "Frontend sends JWT in Authorization Bearer headers for protected endpoints.",
      "Client uploads image files via multipart form data; Multer buffers in memory without disk writing.",
      "Node.js Readable stream pipes the image directly into Cloudinary, returning the secure URL and publicId.",
      "The Express controller saves media metadata in MongoDB referencing the authenticated uploader ID.",
      "On update or delete, ownership middleware verifies that the user ID matches the asset author.",
      "Asset updates and deletions invoke Cloudinary destruction to purge the file from cloud storage.",
    ],
    workflow: [
      {
        step: 1,
        title: "JWT Login & Auth Context",
        description:
          "User logs in; server issues 1-hour JWT. Client stores token and AuthContext decodes claims and monitors expiration.",
      },
      {
        step: 2,
        title: "Memory-Buffered Upload",
        description:
          "User uploads image file; Multer buffers in RAM and pipes stream directly to Cloudinary without writing to server disk.",
      },
      {
        step: 3,
        title: "Metadata Persistence",
        description:
          "Cloudinary returns URL and public ID; Express saves Media document in MongoDB referencing the uploader's user ID.",
      },
      {
        step: 4,
        title: "Gallery Browsing & Inspection",
        description:
          "Users browse paginated community feed or filter own media, opening interactive Radix UI inspector dialogs.",
      },
      {
        step: 5,
        title: "Ownership-Protected Mutation",
        description:
          "On replacement or deletion, server validates uploader ownership, destroys Cloudinary asset, and updates MongoDB.",
      },
    ],
    highlights: [
      "Direct memory-to-cloud streaming upload pipeline using Node.js streams and Cloudinary",
      "Automated Cloudinary asset cleanup when deleting or replacing media files",
      "Server-side ownership verification protecting media updates and deletions",
      "Decoupled architecture combining an Express REST API with a Next.js App Router frontend",
    ],
    links: {
      live: "https://image-sharing-platform-two.vercel.app/",
      repo: "https://github.com/Nirajan09/image-sharing-platform",
    },
    cover: {
      src: "/projects/image-sharing-platform.png",
      alt: "Pixify - Cloudinary-backed media gallery and sharing web platform",
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getRelatedProjects = (slug: string) =>
  projects.filter((project) => project.slug !== slug);

export const getProjectNav = (slug: string) => {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? projects[index - 1] : projects[projects.length - 1];
  const next = index < projects.length - 1 ? projects[index + 1] : projects[0];
  return { prev, next };
};