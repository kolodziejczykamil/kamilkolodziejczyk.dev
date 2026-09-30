import { Container } from "@/components/Container";
import { mainNavLabel, navItems, person } from "@/content/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
      <Container className="flex h-header items-center justify-between gap-6">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          {person.name}
        </a>
        <nav aria-label={mainNavLabel}>
          <ul className="flex items-center gap-7 text-[0.9375rem]">
            {navItems.map((item) => (
              <li key={item.href} className={item.showOnMobile ? "" : "hidden sm:block"}>
                <a href={item.href} className="text-muted transition-colors hover:text-paper">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
