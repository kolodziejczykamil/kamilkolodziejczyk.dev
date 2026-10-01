import { siGithub } from "simple-icons";
import { PointerTracker } from "@/components/PointerTracker";
import { projects } from "@/content/profile";
import type { SideProject } from "@/content/profile";
import { externalLinkProps } from "@/lib/external-link-props";

type SideProjectCardProps = {
  project: SideProject;
};

const linkClassName =
  "inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-sm text-paper transition-colors hover:border-signal/60 hover:text-signal";

export function SideProjectCard({ project }: SideProjectCardProps) {
  const { title, summary, stack, demoUrl, sourceUrl } = project;

  return (
    <PointerTracker className="reveal">
      <article className="spotlight group flex h-full flex-col rounded-xl border border-line p-6 transition-colors duration-300 hover:border-line-strong">
        <h3 className="text-xl leading-tight transition-colors duration-300 group-hover:text-signal">{title}</h3>
        <p className="mt-3 text-muted">{summary}</p>
        <ul aria-label="Stack" className="mt-5 flex flex-wrap gap-2">
          {stack.map((item) => (
            <li key={item} className="rounded-full bg-signal/10 px-3 py-1 text-sm text-signal">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <a href={demoUrl} className={linkClassName} {...externalLinkProps(demoUrl)}>
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M9 3h4v4M13 3 7 9M11 9.5V13H3V5h3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {projects.demoLabel}
            <span className="sr-only">: {title}</span>
          </a>
          <a href={sourceUrl} className={linkClassName} {...externalLinkProps(sourceUrl)}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
              <path d={siGithub.path} />
            </svg>
            {projects.sourceLabel}
            <span className="sr-only">: {title}</span>
          </a>
        </div>
      </article>
    </PointerTracker>
  );
}
