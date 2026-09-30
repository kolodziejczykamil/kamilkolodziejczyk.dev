import { Container } from "@/components/Container";
import { footer, person } from "@/content/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="py-10 text-sm text-muted">
        <p>
          {person.name}, {year}. {footer.builtWith}
        </p>
      </Container>
    </footer>
  );
}
