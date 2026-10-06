"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navHref, navItems } from "@/data/navigation";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";
import { PageContainer } from "./PageContainer";

/**
 * Hover underline for inactive desktop links. It wipes in from the left on
 * hover/focus and retracts out to the right on leave (the origin flips with
 * the state). Uses transform only, so there is no layout work.
 */
function Underline() {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute -bottom-1.5 left-0 h-px w-full bg-accent",
        "origin-right scale-x-0 transition-[scale] duration-300 ease-standard",
        "group-hover:origin-left group-hover:scale-x-100",
        "group-focus-visible:origin-left group-focus-visible:scale-x-100",
      )}
    />
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");

  // Page scroll progress, drawn as a thin gradient line on the header's edge.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  // Transparent at the top, translucent surface after scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section on homepage.
  useEffect(() => {
    if (!isHome) return;

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-40% 0px -55% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHome]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const currentId = isHome
    ? activeId
    : pathname.startsWith("/projects")
      ? "projects"
      : null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b",
        "transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300",
        scrolled || open
          ? "border-border bg-background/70 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.6)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      {/* Scroll progress line: only visible once the page has scrolled */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress, transformOrigin: "left" }}
        className={cn(
          "pointer-events-none absolute inset-x-0 -bottom-px h-0.5",
          "bg-linear-to-r from-accent via-blue to-violet",
          "shadow-[0_0_10px_rgb(34_211_238/0.6)]",
          "transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <PageContainer className="flex h-16 items-center justify-between">
        {/* Logo: the dot swells and glows. Nothing moves under the cursor. */}
        <Link
          href={navHref("home")}
          aria-label={`${personal.name}, back to top`}
          className="group font-display text-xl font-bold tracking-tight text-primary"
          onClick={() => setOpen(false)}
          data-track="nav_click"
          data-track-target="home"
          data-track-location="logo"
        >
          {personal.firstName}
          <span
            className={cn(
              "ml-2 inline-block origin-bottom text-accent",
              "transition-[scale,filter] duration-300 ease-standard",
              "group-hover:scale-125 group-hover:drop-shadow-[0_0_6px_rgb(34_211_238/0.8)]",
              "group-focus-visible:scale-125 group-focus-visible:drop-shadow-[0_0_6px_rgb(34_211_238/0.8)]",
            )}
          >
            .
          </span>
        </Link>

        {/* Desktop */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentId === item.id;

              return (
                <li key={item.id}>
                  <Link
                    href={navHref(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative block rounded-lg px-3.5 py-2 text-sm font-medium",
                      "transition-colors duration-200",
                      isActive
                        ? "text-primary"
                        : "text-muted hover:text-primary focus-visible:text-primary",
                    )}
                    data-track="nav_click"
                    data-track-target={item.id}
                    data-track-location="navbar"
                  >
                    {/* Active pill glides between links as the section changes */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-lg border border-accent/30 bg-accent/10 shadow-[0_0_16px_-4px_rgb(34_211_238/0.5)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}

                    <span className="relative">
                      {item.label}
                      {!isActive && <Underline />}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-surface/60 px-3",
            "text-sm font-medium text-secondary",
            "transition-[background-color,border-color,color,scale] duration-200",
            "hover:border-accent/40 hover:text-primary",
            "active:scale-95",
            "md:hidden",
          )}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}

          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </PageContainer>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="relative border-t border-border bg-background/80 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            {/* Gradient hairline across the top of the panel */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
            />

            <PageContainer as="nav" aria-label="Mobile">
              <ul className="flex flex-col gap-1 py-3">
                {navItems.map((item) => {
                  const isActive = currentId === item.id;

                  return (
                    <li key={item.id}>
                      <Link
                        href={navHref(item.id)}
                        aria-current={isActive ? "true" : undefined}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group relative flex h-12 items-center rounded-lg border px-4",
                          "text-base font-medium",
                          "transition-[color,background-color,border-color] duration-200",
                          isActive
                            ? "border-accent/30 bg-accent/10 text-accent"
                            : "border-transparent text-secondary hover:border-border hover:bg-surface/70 hover:text-primary focus-visible:text-primary",
                        )}
                        data-track="nav_click"
                        data-track-target={item.id}
                        data-track-location="mobile_menu"
                      >
                        {/* Only the label slides, so the tap target stays put */}
                        <span className="transition-transform duration-200 ease-standard group-hover:translate-x-1">
                          {item.label}
                        </span>

                        {isActive && (
                          <motion.span
                            layoutId="mobile-nav-indicator"
                            aria-hidden="true"
                            className="absolute right-4 size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </PageContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}