import type { Project } from "@/types";

export const projects: readonly Project[] = [
  {
    slug: "book-recommendation-system",
    title: "Book Recommendation System",
    summary:
      "A full-stack bookstore with personalized recommendations, multi-gateway checkout, and an admin dashboard.",
    overview:
      "A full-stack bookstore built with a Django REST API and a React + Vite frontend. Users can browse and search a catalog, rate books, manage a cart and wishlist, and place orders through Stripe, eSewa, or cash on delivery. A hybrid collaborative-filtering recommender generates personalized suggestions, falling back to popular books when there isn't enough rating data. Admins get a dashboard with sales metrics, low-stock alerts, and inventory controls.",
    stack: [
      "Django",
      "Django REST Framework",
      "React",
      "Vite",
      "Tailwind CSS",
      "Stripe",
    ],
    stackGroups: [
      {
        label: "Frontend",
        items: [
          "React 19",
          "Vite",
          "React Router",
          "Axios",
          "Tailwind CSS",
          "React Hook Form",
          "Yup",
        ],
      },
      {
        label: "Backend",
        items: [
          "Python",
          "Django",
          "Django REST Framework",
          "Django Filters",
          "Token Authentication",
        ],
      },
      {
        label: "Recommendation",
        items: ["pandas", "NumPy", "SciPy", "scikit-learn"],
      },
      {
        label: "Database",
        items: ["SQLite (development)", "PostgreSQL (production)"],
      },
      {
        label: "Payments & media",
        items: ["Stripe Payment Intents", "eSewa", "Django ImageField uploads"],
      },
    ],
    features: [
      "Book search and paginated browsing",
      "Ratings and reviews",
      "Hybrid personalized recommendations",
      "Popular-book fallback for new users",
      "Per-user cart with stock validation",
      "Wishlist",
      "Checkout with Stripe, eSewa, or cash on delivery",
      "Order tracking and cancellation of pending orders",
      "Admin dashboard with revenue and best sellers",
      "Low-stock alerts and inventory management",
      "Role-based route guards for users and admins",
    ],
    howItWorks: [
      "Users register or log in and receive a token stored on the client.",
      "Route guards send regular users and admins to their own areas.",
      "Books are served from a paginated, searchable API.",
      "Cart items are saved per user and checked against current stock.",
      "Checkout creates an order directly for cash on delivery, or goes through Stripe or eSewa first.",
      "The recommender combines user-based and item-based collaborative filtering, using popular books when ratings are sparse.",
    ],
    highlights: [
      "Hybrid user-based and item-based collaborative filtering",
      "Three payment options, including the Nepal-specific eSewa gateway",
      "Token auth with separate user and admin route protection",
      "Admin analytics: revenue, order counts, best sellers, low stock",
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
    slug: "image-sharing-platform",
    title: "Image Sharing Platform",
    summary:
      "An image sharing app with JWT auth, Cloudinary-backed uploads, and a paginated gallery with ownership-protected edits.",
    overview:
      "Image Sharing Platform is a full-stack image sharing application with a Next.js frontend and an Express + MongoDB backend. Authenticated users can upload, preview, replace, and delete images, which are stored and delivered through Cloudinary. The server validates file type and size, and enforces ownership checks so users can only modify their own media.",
    stack: [
      "Next.js",
      "Express",
      "MongoDB",
      "Cloudinary",
      "Tailwind CSS",
      "JWT",
    ],
    stackGroups: [
      {
        label: "Frontend",
        items: [
          "Next.js 16",
          "React 19",
          "Tailwind CSS",
          "React Hook Form",
          "Yup",
          "Axios",
          "Radix UI",
        ],
      },
      {
        label: "Backend",
        items: ["Node.js", "Express 5", "JWT", "Multer", "bcryptjs"],
      },
      { label: "Database", items: ["MongoDB", "Mongoose"] },
      { label: "Storage", items: ["Cloudinary"] },
    ],
    features: [
      "Registration and login with JWT",
      "Protected image uploads (type and 5 MB size validation)",
      "Paginated gallery",
      "Per-user media view",
      "Image preview in a modal",
      "Replace an image with a new upload",
      "Delete with ownership validation",
      "Responsive layout for desktop and mobile",
    ],
    howItWorks: [
      "Users register or sign in; passwords are hashed and a JWT is issued.",
      "The frontend sends the token as a Bearer header on protected requests.",
      "Uploads are sent as multipart form data and validated by the server.",
      "The image is streamed to Cloudinary, and the URL and public ID are saved in MongoDB.",
      "Update and delete requests check that the authenticated user is the uploader.",
    ],
    highlights: [
      "End-to-end media pipeline: client, Express, Cloudinary, MongoDB",
      "Server-side ownership checks on every update and delete",
      "Removes the asset from Cloudinary and the database on delete",
    ],
    links: {
      repo: "https://github.com/Nirajan09/image-sharing-platform",
    },
    cover: {
      src: "/projects/image-sharing-platform.png",
      alt: "Image Sharing Platform - Cloudinary-backed media gallery and sharing app",
    },
  },

  {
    slug: "job-portal",
    title: "Job Portal",
    summary:
      "A role-based job portal where candidates apply and recruiters post jobs, with Stripe memberships and resume uploads.",
    overview:
      "Job Portal is a full-stack job portal built with Next.js server actions. Candidates create profiles, upload resumes, filter jobs, and track application status, while recruiters post listings and review applicants. Authentication runs through Clerk, data is stored in MongoDB, resumes live in Supabase Storage, and premium plans that raise recruiter posting limits are sold through Stripe.",
    stack: [
      "Next.js",
      "Clerk",
      "MongoDB",
      "Stripe",
      "Supabase",
      "Tailwind CSS",
    ],
    stackGroups: [
      {
        label: "Frontend",
        items: [
          "Next.js 16",
          "React 19",
          "Tailwind CSS",
          "Radix UI",
          "react-hook-form",
          "zod",
          "next-themes",
        ],
      },
      {
        label: "Backend",
        items: ["Next.js server actions", "Mongoose", "MongoDB Atlas"],
      },
      { label: "Authentication", items: ["Clerk"] },
      {
        label: "Services",
        items: ["Stripe (memberships)", "Supabase Storage (resumes)"],
      },
    ],
    features: [
      "Role-based onboarding for candidates and recruiters",
      "Candidate profiles and account editing",
      "Job filters by company, title, type, and location",
      "Recruiter job posting with membership-based limits",
      "One-click applications with status tracking",
      "Recruiter review of applicants and resume downloads",
      "Selected or rejected decisions on applications",
      "Candidate activity dashboard",
      "Premium memberships via Stripe checkout",
      "Resume upload to Supabase Storage",
      "Filter state kept in URL params and session storage",
    ],
    howItWorks: [
      "Users sign up through Clerk and are sent to onboarding if no profile exists.",
      "They choose a role: candidate (with optional resume) or recruiter.",
      "Recruiters publish jobs; candidates browse, filter, and apply.",
      "Each application records the job, candidate, recruiter, and status.",
      "Recruiters review profiles and resumes and mark applicants selected or rejected.",
      "Stripe checkout upgrades a profile to premium, which lifts posting limits.",
    ],
    highlights: [
      "Backend logic in server actions with no separate API layer",
      "Four integrated services: Clerk, MongoDB, Stripe, Supabase",
      "Separate candidate and recruiter experiences from one codebase",
    ],
    links: {
      live: "https://job-portal-liard-one.vercel.app",
      repo: "https://github.com/Nirajan09/job-portal",
    },
    cover: {
      src: "/projects/job-portal.png",
      alt: "Job Portal - Role-based recruitment and job search web platform",
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getRelatedProjects = (slug: string) =>
  projects.filter((project) => project.slug !== slug);