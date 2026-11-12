import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <LatestPosts />
      <Contact />
    </>
  );
}