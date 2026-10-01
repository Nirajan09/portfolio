import type { Project } from "@/types";

export const projects: readonly Project[] = [
  {
    slug: "book-recommendation-system",
    title: "Book Recommendation System",
    summary: "Personalized book recommendations using item-based KNN.",
    overview:
      "A recommendation system using item-based KNN to generate personalized book recommendations from a large user-book interaction dataset.",
    stack: ["Django", "Django REST Framework", "React", "PostgreSQL", "Python"],
    features: [
      "REST API",
      "JWT authentication",
      "Role-based access",
      "Pagination",
      "Search",
      "Recommendation workflow",
    ],
  },
  {
    slug: "image-sharing-platform",
    title: "Image Sharing Platform",
    summary:
      "An image sharing platform with authentication, uploads and optimized media delivery.",
    stack: ["Next.js", "Node.js / Express", "MongoDB", "Cloudinary", "Tailwind CSS"],
    features: [
      "Authentication",
      "Authorization",
      "Image upload",
      "Update and delete",
      "Optimized media delivery",
    ],
  },
  {
    slug: "job-portal",
    title: "Job Portal",
    summary:
      "A job portal with recruiter and candidate roles, applications and Stripe-powered premium features.",
    stack: ["Next.js", "Supabase", "MongoDB", "Stripe", "Clerk"],
    features: [
      "Recruiter and candidate roles",
      "Job posting",
      "Applications",
      "Protected routes",
      "Premium features",
      "Stripe payment and webhook workflow",
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getRelatedProjects = (slug: string) =>
  projects.filter((project) => project.slug !== slug);