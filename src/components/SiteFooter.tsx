import { Container } from "@/components/Container";
import { TextLink } from "@/components/TextLink";
import { footer, person, SOURCE_URL } from "@/content/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-10 text-sm text-muted">
        <p>
          {person.name}, {year}. {footer.builtWith}
        </p>
        <TextLink href={SOURCE_URL}>{footer.sourceLabel}</TextLink>
      </Container>
    </footer>
  );
}
