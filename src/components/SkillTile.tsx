import type { Skill } from "@/content/profile";

type SkillTileProps = {
  skill: Skill;
};

export function SkillTile({ skill }: SkillTileProps) {
  return (
    <li className="group flex items-center gap-3 rounded-lg border border-line bg-ink-raised/40 px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/50 hover:bg-ink-raised">
      <span
        aria-hidden="true"
        className="grid size-7 shrink-0 place-items-center rounded-md bg-line/60 text-muted transition-colors duration-300 group-hover:bg-signal/15 group-hover:text-signal"
      >
        {skill.icon ? (
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
            <path d={skill.icon.path} />
          </svg>
        ) : (
          <span className="font-display text-[0.6875rem] font-semibold">{skill.label.slice(0, 2)}</span>
        )}
      </span>
      <span className="text-[0.9375rem] leading-tight transition-colors duration-300 group-hover:text-paper">
        {skill.label}
      </span>
    </li>
  );
}
