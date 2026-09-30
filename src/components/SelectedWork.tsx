import { CaseStudyArticle } from "@/components/CaseStudyArticle";
import { Section } from "@/components/Section";
import { work } from "@/content/profile";

export function SelectedWork() {
  return (
    <Section id={work.id} title={work.title}>
      <p className="mb-10 max-w-measure text-muted">{work.intro}</p>
      {work.caseStudies.map((caseStudy) => (
        <CaseStudyArticle key={caseStudy.title} caseStudy={caseStudy} />
      ))}
    </Section>
  );
}
