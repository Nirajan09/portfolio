"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuCircleCheck, LuFilter, LuSparkles } from "react-icons/lu";
import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

type CategoryFilter = "all" | "ecommerce" | "saas" | "media";

const filterOptions: { id: CategoryFilter; label: string; count: number }[] = [
  { id: "all", label: "All Projects", count: 3 },
  { id: "saas", label: "Recruitment SaaS", count: 1 },
  { id: "ecommerce", label: "E-Commerce & ML", count: 1 },
  { id: "media", label: "Media Pipeline", count: 1 },
];

export function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("all");

  const filteredProjects = useMemo(() => {
    if (selectedFilter === "all") return projects;
    if (selectedFilter === "ecommerce")
      return projects.filter((p) => p.slug === "book-recommendation-system");
    if (selectedFilter === "saas")
      return projects.filter((p) => p.slug === "job-portal");
    if (selectedFilter === "media")
      return projects.filter((p) => p.slug === "image-sharing-platform");
    return projects;
  }, [selectedFilter]);

  return (
    <Section id="projects" className="relative">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 -z-10 -translate-x-1/2 size-96 rounded-full bg-accent/5 blur-3xl"
      />

      {/* Section Header */}
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Engineered for real-world impact"
            description="Deep-dive case studies into full-stack web platforms, machine learning recommender engines, and cloud media pipelines built with modern architectures."
          />

          {/* Quick credibility stats pill */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/70 bg-surface/40 p-3 text-xs text-secondary sm:self-start md:self-auto">
            <span className="inline-flex items-center gap-1.5 font-medium text-primary">
              <LuSparkles className="size-3.5 text-accent" />
              <span>3 Full-Stack Architectures</span>
            </span>
            <span className="text-border" aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-1.5 text-muted">
              <LuCircleCheck className="size-3.5 text-emerald-400" />
              <span>Documented Case Studies</span>
            </span>
          </div>
        </div>
      </Reveal>

      {/* Category Filter Pills with animated glide indicator */}
      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-border/70 pb-6">
          <span className="mr-2 hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted sm:inline-flex">
            <LuFilter className="size-3.5 text-accent" />
            Filter by:
          </span>
          {filterOptions.map((filter) => {
            const isActive = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedFilter(filter.id)}
                aria-pressed={isActive}
                className="group relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-hidden"
              >
                {/* Gliding animated background pill */}
                {isActive && (
                  <motion.span
                    layoutId="projectActiveFilterPill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-full border border-accent bg-accent shadow-glow"
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 rounded-full border border-border/80 bg-surface/60 transition-colors duration-200 group-hover:border-accent/40 group-hover:bg-surface" />
                )}

                <span
                  className={`relative z-10 font-medium ${
                    isActive ? "text-background font-semibold" : "text-secondary group-hover:text-primary"
                  }`}
                >
                  {filter.label}
                </span>

                <span
                  className={`relative z-10 rounded-full px-1.5 py-0.2 text-[10px] transition-colors ${
                    isActive
                      ? "bg-background/25 text-background font-bold"
                      : "bg-surface-elevated text-muted group-hover:text-secondary"
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Projects List with fluid layout animations */}
      <motion.ul layout className="mt-10 space-y-12 sm:space-y-16 lg:space-y-20">
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProjects.map((project, index) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard
                project={project}
                index={projects.findIndex((p) => p.slug === project.slug)}
                reversed={index % 2 === 1}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}