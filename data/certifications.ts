import type { Certification } from "@/types";

// If this list is emptied, the section and its nav links hide automatically.
export const certifications: readonly Certification[] = [
  {
    id: "broadway-python-django",
    title: "Python and Django",
    issuer: "Broadway Infosys & Orchid International College",
    date: "Jul 2023",
    description:
      "40 hours of professional training on Python and Django web development, certified ISO 9001:2015 (Regd no: 64498-066-067, Certificate No: B16431).",
    credentialUrl: "https://verify.broadwayinfosys.com",
    image: {
      src: "/certificates/broadway-python-django.jpg",
      alt: "Python and Django Achievement Certificate from Broadway Infosys and Orchid International College",
    },
  },
  {
    id: "udemy-django-masterclass",
    title: "Django Masterclass: Get Started With Django Web Development",
    issuer: "Udemy (Knowledge Nest)",
    date: "Jan 2026",
    description:
      "Comprehensive course and certification on Django web development, building scalable backend architectures and web applications.",
    credentialUrl: "https://ude.my/UC-2fe1abed-53a6-4fa9-863d-2ae97892b5cb",
    image: {
      src: "/certificates/udemy-django-masterclass.jpg",
      alt: "Udemy Certificate of Completion for Django Masterclass",
    },
  },
];