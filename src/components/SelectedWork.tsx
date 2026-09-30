import { CaseStudyArticle } from "@/components/CaseStudyArticle";
import { Section } from "@/components/Section";
import { work } from "@/content/profile";

export function SelectedWork() {
  return (
    <Section id={work.id} title={work.title}>
      <p className="reveal mb-8 max-w-measure text-muted">{work.intro}</p>
      <div className="space-y-5">
        {work.caseStudies.map((caseStudy) => (
          <CaseStudyArticle key={caseStudy.title} caseStudy={caseStudy} />
        ))}
      </div>
    </Section>
  );
}
