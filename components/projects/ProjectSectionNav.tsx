"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LuCircleCheck, LuCpu, LuFileText, LuLayers, LuSparkles } from "react-icons/lu";

type SectionTab = {
  id: string;
  label: string;
  icon: typeof LuFileText;
};

const sections: SectionTab[] = [
  { id: "overview", label: "Overview", icon: LuFileText },
  { id: "architecture", label: "Architecture", icon: LuLayers },
  { id: "features", label: "Key Features", icon: LuSparkles },
  { id: "stack", label: "Tech Stack", icon: LuCpu },
  { id: "challenges", label: "Challenges & Results", icon: LuCircleCheck },
];

export function ProjectSectionNav() {
  const [activeId, setActiveId] = useState<string>("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <div className="sticky top-16 z-20 -mx-4 mb-12 border-y border-border/80 bg-background/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-xl sm:border sm:px-6 shadow-sm">
      <nav aria-label="Project section navigation" className="flex items-center justify-start gap-1 overflow-x-auto no-scrollbar sm:justify-center sm:gap-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className="relative inline-flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-hidden"
            >
              {/* Animated gliding background pill */}
              {isActive && (
                <motion.span
                  layoutId="activeSubnavPill"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  className="absolute inset-0 rounded-lg border border-accent/40 bg-accent/15 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                />
              )}
              {!isActive && (
                <span className="absolute inset-0 rounded-lg hover:bg-surface/60 transition-colors" />
              )}

              <Icon
                className={`relative z-10 size-3.5 transition-colors ${
                  isActive ? "text-accent" : "text-muted"
                }`}
                aria-hidden="true"
              />
              <span
                className={`relative z-10 transition-colors ${
                  isActive ? "text-accent font-semibold" : "text-muted hover:text-primary"
                }`}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
