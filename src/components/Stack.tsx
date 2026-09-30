import { Section } from "@/components/Section";
import { stack } from "@/content/profile";

export function Stack() {
  return (
    <Section id={stack.id} title={stack.title}>
      <dl className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {stack.groups.map((group) => (
          <div key={group.name}>
            <dt className="font-display text-lg font-semibold tracking-tight">{group.name}</dt>
            <dd className="mt-1 text-muted">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
