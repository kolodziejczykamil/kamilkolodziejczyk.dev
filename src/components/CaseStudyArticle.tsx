import { PeriodRange } from "@/components/PeriodRange";
import { PhoneScreenshots } from "@/components/PhoneScreenshots";
import { PointerTracker } from "@/components/PointerTracker";
import { work } from "@/content/profile";
import type { CaseStudy } from "@/content/profile";

type CaseStudyArticleProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyArticle({ caseStudy }: CaseStudyArticleProps) {
  const { title, client, period, summary, highlights, stack, screenshots } = caseStudy;

  return (
    <PointerTracker className="reveal">
      <article className="spotlight group rounded-xl border border-line p-6 transition-colors duration-300 hover:border-line-strong sm:p-8">
        <p className="text-sm text-muted">
          {client}, <PeriodRange period={period} />
        </p>
        <h3 className="mt-2 text-2xl leading-tight transition-colors duration-300 group-hover:text-signal">
          {title}
        </h3>
        <p className="mt-4 max-w-measure">{summary}</p>
        {screenshots && <PhoneScreenshots screenshots={screenshots} caption={work.screenshotsLabel} />}
        <ul className="mt-5 max-w-measure space-y-2">
          {highlights.map((highlight) => (
            <li key={highlight} className="bullet-dash">
              {highlight}
            </li>
          ))}
        </ul>
        <ul aria-label="Stack" className="mt-6 flex flex-wrap gap-2">
          {stack.map((item) => (
            <li key={item} className="rounded-full bg-signal/10 px-3 py-1 text-sm text-signal">
              {item}
            </li>
          ))}
        </ul>
      </article>
    </PointerTracker>
  );
}
