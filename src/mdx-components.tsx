import type { MDXComponents } from "mdx/types";
import { TextLink } from "@/components/TextLink";

const components: MDXComponents = {
  h2: ({ children }) => <h2 className="mt-12 mb-4 text-2xl leading-tight">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl leading-tight">{children}</h3>,
  p: ({ children }) => <p className="mt-5 first:mt-0">{children}</p>,
  ul: ({ children }) => <ul className="mt-5 space-y-3">{children}</ul>,
  li: ({ children }) => <li className="bullet-dash">{children}</li>,
  strong: ({ children }) => <strong className="font-medium text-paper">{children}</strong>,
  a: ({ href, children }) => <TextLink href={href ?? "#"}>{children}</TextLink>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-signal pl-5 text-muted">{children}</blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-ink-raised px-1.5 py-0.5 text-[0.9em] text-signal">{children}</code>
  ),
  hr: () => <hr className="my-10 border-line" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
