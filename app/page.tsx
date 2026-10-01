import { Reveal } from "@/components/animation/Reveal";
import { PageContainer } from "@/components/layout/PageContainer";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { navItems } from "@/data/navigation";

// Placeholders below Services are TEMPORARY; each is replaced in Phases 7-10.
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      {navItems
        .filter((item) => !["home", "about", "services"].includes(item.id))
        .map((item) => (
          <PageContainer
            as="section"
            key={item.id}
            id={item.id}
            className="flex min-h-[80vh] items-center py-24"
          >
            <Reveal>
              <SectionHeading eyebrow="Placeholder" title={item.label} />
            </Reveal>
          </PageContainer>
        ))}
    </>
  );
}