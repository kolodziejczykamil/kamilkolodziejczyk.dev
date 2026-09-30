import type { ReactNode } from "react";
import { externalLinkProps } from "@/lib/external-link-props";

type ButtonVariant = "primary" | "secondary";

type ButtonLinkProps = {
  href: string;
  variant: ButtonVariant;
  children: ReactNode;
};

const baseClassName =
  "inline-flex items-center justify-center rounded-sm border px-5 py-3 font-display text-base font-semibold leading-none transition-colors";

const variantClassName: Record<ButtonVariant, string> = {
  primary: "border-signal bg-signal text-ink hover:border-paper hover:bg-paper",
  secondary: "border-line text-paper hover:border-muted hover:bg-ink-raised",
};

export function ButtonLink({ href, variant, children }: ButtonLinkProps) {
  return (
    <a href={href} className={`${baseClassName} ${variantClassName[variant]}`} {...externalLinkProps(href)}>
      {children}
    </a>
  );
}
