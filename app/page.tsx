import { PageContainer } from "@/components/layout/PageContainer";
import { Reveal } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { navItems } from "@/data/navigation";

export default function Home() {
  return (
    <>
      {navItems.map((item) => (
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