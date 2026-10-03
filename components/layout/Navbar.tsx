

"use client"; 
 
import Link from "next/link"; 
import { usePathname } from "next/navigation"; 
import { AnimatePresence, motion } from "motion/react"; 
import { Menu, X } from "lucide-react"; 
import { useEffect, useState } from "react"; 
import { navHref, navItems } from "@/data/navigation"; 
import { personal } from "@/data/personal"; 
import { cn } from "@/lib/utils"; 
import { PageContainer } from "./PageContainer"; 
 
export function Navbar() { 
  const pathname = usePathname(); 
  const isHome = pathname === "/"; 
 
  const [scrolled, setScrolled] = useState(false); 
  const [open, setOpen] = useState(false); 
  const [activeId, setActiveId] = useState<string>("home"); 
 
  // Transparent at the top, translucent surface after scrolling. 
  useEffect(() => { 
    const onScroll = () => setScrolled(window.scrollY > 12); 
    window.addEventListener("scroll", onScroll, { passive: true }); 
    return () => window.removeEventListener("scroll", onScroll); 
  }, []); 
 
  // Active section (homepage only): the section crossing the viewport's middle band. 
  useEffect(() => { 
    if (!isHome) return; 
    const sections = navItems 
      .map((item) => document.getElementById(item.id)) 
      .filter((el): el is HTMLElement => el !== null); 
    if (sections.length === 0) return; 
 
    const observer = new IntersectionObserver( 
      (entries) => { 
        for (const entry of entries) { 
          if (entry.isIntersecting) setActiveId(entry.target.id); 
        } 
      }, 
      { rootMargin: "-40% 0px -55% 0px" }, 
    ); 
    sections.forEach((section) => observer.observe(section)); 
    return () => observer.disconnect(); 
  }, [isHome]); 
 
  // Escape closes the mobile menu. 
  useEffect(() => { 
    if (!open) return; 
    const onKeyDown = (event: KeyboardEvent) => { 
      if (event.key === "Escape") setOpen(false); 
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
        "transition-[background-color,border-color,backdrop-filter] duration-300", 
        scrolled || open 
          ? "border-border bg-background/70 backdrop-blur-xl" 
          : "border-transparent bg-transparent", 
      )} 
    > 
      <PageContainer className="flex h-16 items-center justify-between"> 
        <Link 
          href={navHref("home")} 
          aria-label={`${personal.name}, back to top`} 
          className="font-display text-xl font-bold tracking-tight text-primary" 
          onClick={() => setOpen(false)} 
          data-track="nav_click" 
          data-track-target="home" 
          data-track-location="logo" 
        > 
          {personal.initials} 
          <span className="text-accent">.</span> 
        </Link> 
 
        {/* Desktop */} 
        <nav aria-label="Primary" className="hidden md:block"> 
          <ul className="flex items-center gap-1"> 
            {navItems.map((item) => { 
              const isActive = currentId === item.id; 
              return ( 
                <li key={item.id} className="relative"> 
                  <Link 
                    href={navHref(item.id)} 
                    aria-current={isActive ? "true" : undefined} 
                    className={cn( 
                      "block px-3 py-2 text-sm font-medium transition-colors duration-200", 
                      isActive 
                        ? "text-primary" 
                        : "text-muted hover:text-primary", 
                    )} 
                    data-track="nav_click" 
                    data-track-target={item.id} 
                    data-track-location="navbar" 
                  > 
                    {item.label} 
                  </Link> 
                  {isActive && ( 
                    <motion.span 
                      layoutId="nav-indicator" 
                      aria-hidden="true" 
                      className="absolute inset-x-3 -bottom-px h-px bg-accent" 
                    /> 
                  )} 
                </li> 
              ); 
            })} 
          </ul> 
        </nav> 
 
        {/* Mobile toggle */} 
        <button 
          type="button" 
          className="-mr-2 inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-secondary transition-colors hover:text-primary md:hidden" 
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
            className="border-t border-border md:hidden" 
            initial={{ opacity: 0, y: -8 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -8 }} 
          > 
            <PageContainer as="nav" aria-label="Mobile"> 
              <ul className="flex flex-col py-2"> 
                {navItems.map((item) => { 
                  const isActive = currentId === item.id; 
                  return ( 
                    <li key={item.id}> 
                      <Link 
                        href={navHref(item.id)} 
                        aria-current={isActive ? "true" : undefined} 
                        onClick={() => setOpen(false)} 
                        className={cn( 
                          "flex h-12 items-center justify-between text-base font-medium transition-colors", 
                          isActive 
                            ? "text-accent" 
                            : "text-secondary hover:text-primary", 
                        )} 
                        data-track="nav_click" 
                        data-track-target={item.id} 
                        data-track-location="mobile_menu" 
                      > 
                        {item.label} 
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