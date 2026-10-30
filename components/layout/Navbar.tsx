"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { LuArrowUpRight, LuMenu, LuX } from "react-icons/lu";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navHref, navItems } from "@/data/navigation";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";
import { PageContainer } from "./PageContainer";

export const Navbar = memo(function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const [mounted, setMounted] = useState(false);

  const menuRef = useRef<HTMLElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Page scroll progress, drawn as a thin gradient line on the header's edge.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section on homepage.
  useEffect(() => {
    if (!isHome) return;

    // If page is loaded with a hash, scroll smoothly to section and clean hash from URL bar
    if (window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", window.location.pathname);
        }, 100);
      } else {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }

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
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      setOpen(false);

      if (!isHome) return;

      e.preventDefault();

      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }

      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveId("home");
        return;
      }

      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setActiveId(id);
      }
    },
    [isHome],
  );

  // Escape closes the mobile menu, and body scroll is locked while open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Close mobile menu when clicking or tapping anywhere outside
  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      // Don't close if click is within the mobile menu or on the toggle button
      if (
        menuRef.current?.contains(target) ||
        toggleButtonRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [open]);

  // Auto-close mobile menu on desktop viewport resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentId = isHome
    ? activeId
    : pathname.startsWith("/projects")
      ? "projects"
      : null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b",
        "transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-border/60 bg-background/60 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      {/* Scroll progress line: only visible once the page has scrolled */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress, transformOrigin: "left" }}
        className={cn(
          "pointer-events-none absolute inset-x-0 -bottom-px h-px",
          "bg-linear-to-r from-accent via-blue to-violet",
          "transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <PageContainer
        className={cn(
          "flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]",
          "transition-[height] duration-300 ease-standard",
          scrolled ? "h-16" : "h-20",
        )}
      >
        {/* ---------- Logo: monogram badge + name ---------- */}
        <Link
          href={navHref("home")}
          aria-label={`${personal.name}, back to top`}
          className="group font-display text-xl font-bold tracking-tight text-primary"
          onClick={(e) => handleNavClick(e, "home")}
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

        {/* ---------- Desktop: centered floating pill ---------- */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul
            className={cn(
              "flex items-center gap-0.5 rounded-full border border-border p-1",
              "bg-surface/60 backdrop-blur-md",
              "shadow-[0_8px_30px_-12px_rgb(0_0_0/0.6)]",
            )}
          >
            {navItems.map((item) => {
              const isActive = currentId === item.id;

              return (
                <li key={item.id}>
                  <Link
                    href={navHref(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={cn(
                      "relative block rounded-full px-4 py-1.5 text-sm font-medium",
                      "transition-colors duration-200",
                      isActive
                        ? "text-primary"
                        : "text-muted hover:bg-primary/5 hover:text-primary focus-visible:text-primary",
                    )}
                    data-track="nav_click"
                    data-track-target={item.id}
                    data-track-location="navbar"
                  >
                    {/* Soft cyan capsule that glides between links */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-capsule"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border border-accent/30 bg-accent/10 shadow-[0_0_16px_-4px_rgb(34_211_238/0.5)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ---------- Right: CTA + mobile toggle ---------- */}
        <div className="flex items-center gap-3 justify-self-end">
          <Link
            href="/#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className={cn(
              "group/cta hidden h-10 items-center gap-1.5 rounded-full px-5 lg:inline-flex",
              "bg-accent text-sm font-semibold text-background",
              "transition-[background-color,box-shadow,translate] duration-300 ease-standard",
              "hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow",
            )}
            data-track="nav_click"
            data-track-target="contact"
            data-track-location="navbar_cta"
          >
            Let&apos;s talk
            <LuArrowUpRight
              className="size-4 transition-transform duration-300 ease-standard group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>

          <button
            ref={toggleButtonRef}
            type="button"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface/60",
              "text-secondary backdrop-blur-md cursor-pointer",
              "transition-[background-color,border-color,color,scale,box-shadow] duration-200",
              "hover:border-accent/40 hover:text-primary",
              "active:scale-95",
              "lg:hidden",
              open && "border-accent/50 bg-accent/15 text-accent shadow-[0_0_15px_-3px_rgba(34,211,238,0.35)]",
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <LuX className="size-5 transition-transform duration-200 rotate-90" aria-hidden="true" />
            ) : (
              <LuMenu className="size-5 transition-transform duration-200" aria-hidden="true" />
            )}
          </button>
        </div>
      </PageContainer>

      {/* Backdrop overlay portal: mounted to body so it truly covers the full viewport without being trapped in header containing block */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
                aria-hidden="true"
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden cursor-pointer"
              />
            )}
          </AnimatePresence>,
          document.body,
        )}

      {/* ---------- Mobile & Tablet: floating menu card ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-50 px-4 pt-2 lg:hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOpen(false);
              }
            }}
          >
            <nav
              ref={menuRef}
              aria-label="Mobile Navigation"
              aria-modal="true"
              role="dialog"
              className="relative mx-auto max-w-lg sm:max-w-md sm:ml-auto sm:mr-0 max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-2xl border border-border bg-background/95 p-2.5 sm:p-3 shadow-[0_24px_60px_-12px_rgb(0_0_0/0.85),0_0_30px_rgba(34,211,238,0.1)] backdrop-blur-xl"
            >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
                />

                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive = currentId === item.id;

                    return (
                      <li key={item.id}>
                        <Link
                          href={navHref(item.id)}
                          aria-current={isActive ? "true" : undefined}
                          onClick={(e) => handleNavClick(e, item.id)}
                          className={cn(
                            "group flex h-11 sm:h-12 items-center justify-between rounded-xl px-4",
                            "text-sm sm:text-base font-medium",
                            "transition-[color,background-color] duration-200",
                            isActive
                              ? "bg-accent/10 text-accent font-semibold"
                              : "text-secondary hover:bg-primary/5 hover:text-primary focus-visible:text-primary",
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
                            <span
                              aria-hidden="true"
                              className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]"
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <Link
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, "contact")}
                  className="mt-2.5 flex h-11 sm:h-12 items-center justify-center gap-1.5 rounded-xl bg-accent text-sm font-semibold text-background transition-all duration-200 hover:bg-accent-hover hover:shadow-glow active:scale-[0.98]"
                  data-track="nav_click"
                  data-track-target="contact"
                  data-track-location="mobile_menu_cta"
                >
                  Let&apos;s talk
                  <LuArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </nav>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});
