import { PeriodRange } from "@/components/PeriodRange";
import type { CaseStudy } from "@/content/profile";

type CaseStudyArticleProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyArticle({ caseStudy }: CaseStudyArticleProps) {
  const { title, client, period, summary, highlights, stack } = caseStudy;

  return (
    <article className="border-t border-line py-10 last:pb-0">
      <h3 className="text-2xl leading-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted">
        {client}, <PeriodRange period={period} />
      </p>
      <p className="mt-5 max-w-measure">{summary}</p>
      <ul className="mt-5 max-w-measure space-y-2">
        {highlights.map((highlight) => (
          <li key={highlight} className="bullet-dash">
            {highlight}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">
        <span className="sr-only">Stack: </span>
        {stack.join(", ")}
      </p>
    </article>
  );
}
