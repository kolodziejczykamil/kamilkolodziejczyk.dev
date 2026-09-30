import { Section } from "@/components/Section";
import { SkillTile } from "@/components/SkillTile";
import { stack } from "@/content/profile";

export function Stack() {
  return (
    <Section id={stack.id} title={stack.title}>
      <div className="space-y-10">
        {stack.groups.map((group) => (
          <div key={group.name} className="reveal">
            <h3 className="text-lg">{group.name}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {group.items.map((skill) => (
                <SkillTile key={skill.label} skill={skill} />
              ))}
            </ul>
          </div>
        ))}
        <div className="reveal">
          <h3 className="text-lg">{stack.domainsTitle}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {stack.domains.map((domain) => (
              <li
                key={domain}
                className="rounded-full border border-line px-3.5 py-1.5 text-sm text-muted transition-colors duration-300 hover:border-signal/50 hover:text-signal"
              >
                {domain}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
