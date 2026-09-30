import { PeriodRange } from "@/components/PeriodRange";
import { Section } from "@/components/Section";
import { career } from "@/content/profile";

export function Career() {
  return (
    <Section id={career.id} title={career.title}>
      <ol className="border-b border-line">
        {career.entries.map((entry) => (
          <li
            key={`${entry.period.from}-${entry.role}`}
            className="reveal group grid gap-1 border-t border-line py-5 transition-colors sm:grid-cols-[var(--spacing-period)_1fr] sm:gap-6"
          >
            <p className="text-muted tabular-nums">
              <PeriodRange period={entry.period} />
            </p>
            <div>
              <p className="font-medium transition-colors duration-300 group-hover:text-signal">{entry.role}</p>
              <p className="text-muted">{entry.focus}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
