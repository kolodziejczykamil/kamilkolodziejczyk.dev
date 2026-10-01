import { Section } from "@/components/Section";
import { SideProjectCard } from "@/components/SideProjectCard";
import { projects } from "@/content/profile";

export function SideProjects() {
  return (
    <Section id={projects.id} title={projects.title}>
      <p className="reveal mb-8 max-w-measure text-muted">{projects.intro}</p>
      <div className="grid gap-5 sm:grid-cols-2 sm:[&>*:first-child]:col-span-2">
        {projects.items.map((project) => (
          <SideProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
