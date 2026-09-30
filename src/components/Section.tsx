import type { ReactNode } from "react";
import { Container } from "@/components/Container";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-line">
      <Container className="grid gap-8 py-20 md:grid-cols-12 md:gap-10 md:py-28">
        <h2 id={headingId} className="text-3xl leading-tight md:col-span-4">
          {title}
        </h2>
        <div className="md:col-span-8">{children}</div>
      </Container>
    </section>
  );
}
