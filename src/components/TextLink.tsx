import type { ReactNode } from "react";
import { externalLinkProps } from "@/lib/external-link-props";

type TextLinkProps = {
  href: string;
  children: ReactNode;
};

export function TextLink({ href, children }: TextLinkProps) {
  return (
    <a
      href={href}
      className="text-paper underline decoration-line underline-offset-4 transition-colors hover:decoration-signal"
      {...externalLinkProps(href)}
    >
      {children}
    </a>
  );
}
