import { Section } from "@/components/Section";
import { about } from "@/content/profile";

export function About() {
  return (
    <Section id={about.id} title={about.title}>
      <div className="reveal max-w-measure space-y-5 text-lg leading-relaxed">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
