import { CommandPalette } from "@/components/CommandPalette";
import { Container } from "@/components/Container";
import { NavLinks } from "@/components/NavLinks";
import { mainNavLabel, navItems, person } from "@/content/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
      <Container className="flex h-header items-center justify-between gap-6">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          {person.name}
        </a>
        <div className="flex items-center gap-6">
          <nav aria-label={mainNavLabel}>
            <NavLinks items={navItems} />
          </nav>
          <CommandPalette />
        </div>
      </Container>
    </header>
  );
}
