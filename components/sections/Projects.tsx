"use client";

import { memo, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuFilter } from "react-icons/lu";
import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export const Projects = memo(function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filterOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      if (!project.category) continue;
      counts.set(project.category, (counts.get(project.category) ?? 0) + 1);
    }

    return [
      { id: "all", label: "All Projects", count: projects.length },
      ...Array.from(counts.entries()).map(([category, count]) => ({
        id: category,
        label: category,
        count,
      })),
    ];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <Section id="projects" className="relative">
      {/* Section Header */}
      <Reveal>
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Projects"
          description="Full-stack web applications I have built, with details on architecture, database design, API implementation, and practical challenges."
        />
      </Reveal>

      {/* Category Filter Pills with animated glide indicator */}
      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-border/70 pb-6">
          <span className="mr-2 hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted sm:inline-flex">
            <LuFilter className="size-3.5 text-accent" aria-hidden="true" />
            Filter by:
          </span>
          {filterOptions.map((filter) => {
            const isActive = selectedCategory === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedCategory(filter.id)}
                aria-pressed={isActive}
                data-track="project_filter"
                data-track-category={filter.id}
                className="group relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-hidden cursor-pointer"
              >
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
                    isActive ? "font-semibold text-background" : "text-secondary group-hover:text-primary"
                  }`}
                >
                  {filter.label}
                </span>

                <span
                  className={`relative z-10 rounded-full px-1.5 py-0.5 font-mono text-[10px] transition-colors ${
                    isActive
                      ? "bg-background/25 font-bold text-background"
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

      {/* Projects List */}
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
});
