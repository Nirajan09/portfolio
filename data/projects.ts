import type { Project } from "@/types";

export const projects: readonly Project[] = [
  {
    slug: "book-recommendation-system",
    title: "Book Recommendation System",
    category: "E-Commerce & Machine Learning",
    role: "Full-Stack Developer",
    status: "Full-Stack System",
    summary:
      "A full-stack bookstore application combining personalized hybrid collaborative filtering, multi-gateway payments (Stripe, eSewa, COD), and an admin analytics dashboard.",
    overview:
      "A full-stack bookstore application combining authenticated catalog browsing, user cart and wishlist management, multi-gateway checkout, admin inventory analytics, and personalized recommendations. The system couples a Django REST API backend with a React 19 + Vite frontend, featuring separate user and admin workflows.",
    problem:
      "Book shoppers struggle to discover relevant titles without tailored guidance and need flexible payment methods (both local and international), while store administrators need real-time sales metrics, order tracking, and low-stock alerts to manage inventory effectively.",
    solution:
      "Architected a decoupled client-server platform combining a Django REST Framework API with a modern React + Vite frontend. Implemented a hybrid collaborative filtering recommendation engine using SciPy and scikit-learn (with fallback to popular books for cold-start users), integrated Stripe and Nepal-specific eSewa payment flows, and built role-protected admin controls.",
    targetAudience: [
      {
        role: "Book Readers & Shoppers",
        description:
          "Search catalog by title, author, or ISBN; submit ratings and reviews; maintain carts and wishlists; complete checkout via Stripe, eSewa, or Cash on Delivery; track or cancel pending orders.",
      },
      {
        role: "Bookstore Administrators",
        description:
          "Access protected dashboard with sales totals, revenue metrics, order status tracking, best-selling titles, and automated low-stock alerts.",
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
        "The Django backend handles authentication, persistence, order processing, and recommendation computations via authenticated REST endpoints. The React frontend manages client-side routing, role-based route guards, cart validation, and responsive book discovery.",
      layers: [
        {
          layer: "Presentation Layer",
          title: "React 19 + Vite Frontend",
          description:
            "Client-side routing with React Router DOM, form validation with React Hook Form & Yup, role-guarded routes (UserRoute, AdminRoute, GuestRoute), and toast notifications.",
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
            "RESTful routers and viewsets for accounts, books, cart, wishlist, reviews, orders, payment intent creation, and dashboard statistics.",
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
            "Combines user-based and item-based collaborative filtering matrix calculations, with automated fallback to popular book suggestions when rating data is sparse.",
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
      "Book browsing with search and paginated results by title, author, or ISBN",
      "Ratings and review submissions feeding collaborative filtering logic",
      "Per-user persistent cart and wishlist with stock quantity validation",
      "Checkout flow supporting Stripe, eSewa, and cash-on-delivery options",
      "Order creation, status tracking, and self-service cancellation for pending orders",
      "Admin dashboard with revenue totals, sales counts, best sellers, and low-stock alerts",
      "Stock inventory management for admin-added books",
      "Personalized recommendation engine combining user/item collaborative filtering with popular fallback",
      "Responsive frontend built with React 19, Vite, and Tailwind CSS",
    ],
    detailedFeatures: [
      {
        title: "Token-Based Authentication & Role Guards",
        description:
          "Django authentication returning API tokens saved in localStorage, with frontend route guards segregating user and admin views based on is_staff.",
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
          "Combines user-based and item-based collaborative filtering using SciPy/scikit-learn, falling back to top-rated popular books when ratings are sparse.",
        category: "Machine Learning",
      },
      {
        title: "Cart & Wishlist with Stock Validation",
        description:
          "Per-user persistent cart and wishlist items validated in real-time against current inventory quantities.",
        category: "Shopping",
      },
      {
        title: "Multi-Gateway Checkout",
        description:
          "Unified order creation supporting Stripe Payment Intents, eSewa payment verification, and Cash on Delivery.",
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
          "Admin dashboard computing total revenue, sales counts, best-selling titles, low-stock alerts, and stock adjustments.",
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
          "Pure collaborative filtering fails for new users or books with limited interaction history.",
        solution:
          "Engineered a hybrid recommendation pipeline that evaluates user-item interaction density and gracefully falls back to global popular book rankings.",
        impact:
          "Guarantees relevant recommendations even with sparse user rating history.",
      },
      {
        title: "Multi-Gateway Payment Integration",
        challenge:
          "Unifying synchronous Cash on Delivery, Stripe client-side PaymentIntents, and eSewa redirect-verification flows.",
        solution:
          "Standardized the order data structure on the Django backend while directing Stripe and eSewa through specialized client-side handlers before marking orders confirmed.",
        impact:
          "Seamless checkout across both international cards and local Nepali payment rails.",
      },
      {
        title: "Cart-to-Stock Synchronization",
        challenge:
          "Preventing checkout race conditions where item quantities in carts exceed available store stock.",
        solution:
          "Implemented server-side validation during cart item updates and checkout processing to verify stock availability before order finalization.",
        impact:
          "Eliminates overselling and prevents inconsistent order states.",
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
      "Hybrid collaborative filtering recommendation logic combining user and item algorithms with popular fallback",
      "Dual payment gateways: Stripe Payment Intents for international cards and eSewa for regional payments",
      "Role-based token authentication separating customer shopping from staff admin analytics",
      "Admin dashboard tracking revenue, order volume, best-selling books, and low-stock alerts",
    ],
    links: {
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
    category: "Recruitment SaaS & Job Platform",
    role: "Full-Stack Engineer",
    status: "Live Production",
    summary:
      "A role-based SaaS job platform built with Next.js App Router and Server Actions, featuring Clerk auth, candidate resume uploads to Supabase, recruiter applicant workflows, and Stripe premium memberships.",
    overview:
      "JobVista is a full-stack recruitment SaaS application built with Next.js App Router and direct Server Actions. It powers dual workflows for job seekers and recruiters: candidates create rich profiles, upload resumes to Supabase Storage, and track application statuses, while recruiters publish listings, manage posting limits via Stripe memberships, and screen candidates.",
    problem:
      "Traditional job hunting is fragmented, with convoluted application processes and poor status tracking for candidates, while recruiters face cumbersome dashboards, lack of integrated document storage, and inflexible posting limits.",
    solution:
      "Built a modern, unified Next.js App Router application leveraging direct Server Actions to eliminate API boilerplate. Integrated Clerk for seamless authentication, MongoDB Atlas for profile and job data, Supabase Storage for resume files, and Stripe for tiered recruiter memberships.",
    targetAudience: [
      {
        role: "Job Seekers (Candidates)",
        description:
          "Onboard with custom profiles, upload PDF resumes to Supabase Storage, filter jobs by company, role, type, and location, apply with one click, and track application status in the activity dashboard.",
      },
      {
        role: "Recruiters & Hiring Managers",
        description:
          "Post job openings with membership tier limits, review applicants, inspect candidate profiles, download resumes, and mark applicants as selected or rejected.",
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
      style: "Unified Full-Stack App Router with Server Actions",
      summary:
        "Replaces traditional REST APIs with Next.js Server Actions directly querying MongoDB via Mongoose. Integrates 4 external cloud services: Clerk for authentication, MongoDB Atlas for persistent storage, Supabase for resume file buckets, and Stripe for subscription billing.",
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
            "Type-safe server actions managing profile creation, job posting validation, applicant status transitions, and Stripe checkout sessions without REST overhead.",
          technologies: ["Server Actions", "Mongoose", "Zod", "React Hook Form"],
        },
        {
          layer: "Identity & Membership",
          title: "Clerk & Stripe",
          description:
            "Clerk handles authentication and session redirects. Stripe checkout manages recurring premium recruiter subscriptions and validates tier-based posting limits.",
          technologies: ["Clerk Auth", "Stripe Checkout", "Webhooks"],
        },
        {
          layer: "Data & Document Storage",
          title: "MongoDB Atlas & Supabase",
          description:
            "Mongoose models (Profile, Job, Application) stored in MongoDB Atlas; candidate resumes stored in Supabase Storage buckets with public retrieval URLs.",
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
          "Interactive search filtering jobs by company name, title, employment type, and location, with filter state synced to URL query parameters and session storage.",
        category: "Discovery",
      },
      {
        title: "One-Click Application & Resume Access",
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
          "Seamless authentication experience with strict role separation across routes.",
      },
      {
        title: "Secure Resume Upload & Cloud Retrieval",
        challenge:
          "Handling candidate PDF resume uploads without burdening MongoDB or writing temporary files to the web server.",
        solution:
          "Integrated Supabase Storage to manage file uploads directly, persisting the file path in MongoDB and generating public URLs during recruiter applicant reviews.",
        impact:
          "Scalable document storage with fast resume downloads for hiring managers.",
      },
      {
        title: "URL-Synchronized Filter State",
        challenge:
          "Preserving active job filter combinations across page reloads, browser navigation, and shared recruiter links.",
        solution:
          "Synchronized active filter states with URL search parameters and session storage, enabling bookmarkable search states and fluid browser history navigation.",
        impact:
          "Frictionless user experience for candidate job discovery.",
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
      "Modern Server Actions architecture eliminating REST API boilerplate and client-side fetching overhead",
      "Integrated multi-service stack: Clerk, MongoDB Atlas, Supabase Storage, and Stripe",
      "Role-based user journeys with tailored onboarding and dashboards for candidates and recruiters",
      "Live production deployment on Vercel with active user authentication",
    ],
    links: {
      live: "https://job-portal-liard-one.vercel.app",
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
    category: "Media Sharing & Cloud Pipeline",
    role: "Full-Stack Developer",
    status: "Full-Stack System",
    summary:
      "A modern full-stack media platform featuring stateless JWT authentication, zero-disk memory-buffered Cloudinary stream uploads, granular author-ownership enforcement, and an interactive Radix UI media gallery.",
    overview:
      "Pixify is a modern full-stack media management and image-sharing platform built with a decoupled architecture: a Next.js 16 App Router client and an Express 5 REST API backed by MongoDB and Cloudinary. Authenticated users can securely upload, browse, inspect, replace, and delete media items while enforcing strict user-ownership validation and zero-disk memory-buffered stream uploads.",
    problem:
      "Hosting and managing media assets on traditional servers often results in disk-bound I/O bottlenecks, complex CDN delivery pipelines, orphaned cloud files, and weak authorization that permits unauthorized asset overwrites or deletions.",
    solution:
      "Engineered a decoupled client-server architecture with Next.js 16 and Express 5. Implemented memory-buffered stream uploads using Multer and Cloudinary SDK (zero disk writes on the server), strict author-ownership authorization middleware, and automated Cloudinary asset destruction upon deletion or replacement.",
    targetAudience: [
      {
        role: "Registered Users",
        description:
          "Upload PNG/JPG images up to 5 MB, browse paginated community galleries with sorting, filter own media, inspect image metadata in modals, replace existing assets in-place, and delete owned media.",
      },
      {
        role: "Guest Visitors",
        description:
          "Explore the public welcome portal, review platform capabilities, and access registration or sign-in flows.",
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
      style: "Decoupled Client-Server with Zero-Disk Streaming",
      summary:
        "Stateless REST API with Express 5 and Next.js 16 client. File uploads are buffered in RAM with Multer and piped directly to Cloudinary via Node.js Readable streams, eliminating local server disk I/O entirely.",
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
      "Stateless JWT authentication (1-hour tokens) with bcrypt password hashing",
      "Direct memory-buffered stream uploads using Multer memoryStorage to Cloudinary",
      "Zero server disk writes with Node.js Readable streaming pipelines",
      "Strict author-ownership authorization middleware on media update and deletion",
      "In-place image replacement with automatic destruction of old Cloudinary assets",
      "Community gallery browsing with server-side pagination and sorting options",
      "Personal media filter endpoint retrieving assets by author ID",
      "Interactive Radix UI image inspector dialog with metadata and full preview",
      "Destructive action confirmation dialogs preventing accidental deletions",
      "Client AuthContext with automated expired session detection and token purge",
    ],
    detailedFeatures: [
      {
        title: "Stateless JWT Authentication",
        description:
          "Secure user registration and login with bcryptjs password hashing (cost factor 10) and signed 1-hour HMAC SHA-256 JWT access tokens.",
        category: "Security",
      },
      {
        title: "Zero-Disk Memory Stream Uploads",
        description:
          "Direct streaming of multipart image files from RAM buffer to Cloudinary using Node.js Readable streams, avoiding server filesystem writes.",
        category: "Media Pipeline",
      },
      {
        title: "Granular Ownership Authorization",
        description:
          "Backend authMiddleware and controller verification ensuring only the original uploader can modify, replace, or delete an asset.",
        category: "Authorization",
      },
      {
        title: "In-Place Media Replacement",
        description:
          "Allows asset authors to replace an existing image file, automatically destroying the old asset on Cloudinary before saving the new upload.",
        category: "Asset Management",
      },
      {
        title: "Community Gallery Browsing",
        description:
          "Paginated community feed with sorting parameters (sortBy, sortOrder) and populated uploader usernames.",
        category: "Gallery",
      },
      {
        title: "Personal Media Filtering",
        description:
          "Dedicated endpoint (/api/media/get-media/:id) retrieving only assets uploaded by the authenticated user.",
        category: "Filtering",
      },
      {
        title: "Interactive Image Inspector Dialog",
        description:
          "Accessible Radix UI modal displaying high-resolution image preview, Cloudinary publicId, author name, and timestamps.",
        category: "UI/UX",
      },
      {
        title: "Destructive Action Confirmations",
        description:
          "Radix UI AlertDialog modal preventing accidental image deletion, triggering Cloudinary asset destruction and database cleanup.",
        category: "Safety",
      },
    ],
    challenges: [
      {
        title: "Eliminating Disk-Bound I/O Bottlenecks",
        challenge:
          "Standard file upload libraries write temporary files to local server disk before uploading to cloud storage, risking server disk exhaustion and latency.",
        solution:
          "Configured Multer with memoryStorage() and bridged the memory buffer directly to Cloudinary using Node.js Readable.from(buffer).pipe(upload_stream).",
        impact:
          "Zero disk writes on the server with faster streaming upload performance.",
      },
      {
        title: "Preventing Orphaned Cloud Assets",
        challenge:
          "Replacing an image or deleting a record can leave obsolete media files consuming Cloudinary storage quotas.",
        solution:
          "Coupled database operations with synchronous Cloudinary asset destruction (cloudinary.uploader.destroy(publicId)) before updating or deleting documents.",
        impact:
          "Eliminates orphaned cloud storage files and maintains perfect data consistency.",
      },
      {
        title: "Client Session Expiry & Auto-Purge",
        challenge:
          "Expired JWT tokens in browser localStorage lead to unexpected 401 errors during user interactions.",
        solution:
          "Constructed an AuthContext using jwt-decode that parses token expiry claims on load and route changes, automatically clearing stale credentials and redirecting to sign-in.",
        impact:
          "Frictionless authentication recovery without broken user flows.",
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
      "Zero-disk streaming upload pipeline buffering directly in RAM to Cloudinary CDN",
      "Automated Cloudinary asset destruction on delete and replacement to prevent storage bloat",
      "Granular server-side ownership authorization protecting every media mutation",
      "Decoupled architecture: Express 5 REST API paired with Next.js 16 App Router frontend",
    ],
    links: {
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