import type { Project } from "@/types";

export const projects: readonly Project[] = [
  {
    slug: "book-recommendation-system",
    title: "Book Recommendation System",
    summary:
      "A full-stack platform for discovering books and generating personalized recommendations from user preferences and interactions.",
    overview:
      "A full-stack book recommendation platform built with Django, Django REST Framework, React, and Next.js. The system provides book discovery, search, authentication, favorites, and personalized recommendations through a REST API and recommendation workflow.",
    stack: [
      "Django",
      "Django REST Framework",
      "React",
      "Next.js",
      "Python",
      "PostgreSQL",
    ],
    features: [
      "Personalized recommendations",
      "Book search and discovery",
      "JWT authentication",
      "Role-based access",
      "Favorites and reading lists",
      "REST API",
      "Recommendation workflow",
      "Pagination",
    ],
  },

  {
    slug: "image-sharing-platform",
    title: "Image Sharing Platform",
    summary:
      "A full-stack image sharing platform with authentication, media uploads, galleries, and cloud-based image delivery.",
    overview:
      "A full-stack image sharing application built with React, Node.js, Express, and MongoDB. Users can create accounts, upload and preview images, organize their content, browse public galleries, and manage uploaded images with protected access. Cloudinary is used for image storage and delivery.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Cloudinary",
      "Multer",
      "Tailwind CSS",
    ],
    features: [
      "User authentication",
      "JWT-based authorization",
      "Image upload and preview",
      "Image organization",
      "Public image gallery",
      "Image deletion",
      "Cloudinary media storage",
      "Protected user content",
    ],
  },

  {
    slug: "job-portal",
    title: "Job Portal",
    summary:
      "A responsive job portal frontend focused on clean UI, reusable components, and modern Next.js development.",
    overview:
      "A modern, responsive job portal frontend built with Next.js and Tailwind CSS. The project focuses on clean UI/UX, reusable component architecture, responsive layouts, and maintainable frontend structure, while providing a foundation for future backend and API integration.",
    stack: [
      "Next.js",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "ESLint",
      "Vercel",
    ],
    features: [
      "Responsive job listings interface",
      "Modern UI/UX",
      "Reusable components",
      "Responsive layouts",
      "Next.js routing",
      "Tailwind CSS styling",
      "Scalable frontend structure",
      "Vercel deployment",
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getRelatedProjects = (slug: string) =>
  projects.filter((project) => project.slug !== slug);