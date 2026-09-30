import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { HeroDiagram } from "@/components/HeroDiagram";
import { hero } from "@/content/profile";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="blueprint-grid absolute inset-0 -z-10" />
      <Container className="grid items-center gap-16 py-20 md:py-28 lg:grid-cols-12 lg:gap-10 lg:py-32">
        <div className="lg:col-span-7">
          <p className="text-muted">{hero.eyebrow}</p>
          <h1 id="hero-title" className="mt-5 text-hero">
            {hero.headline}
          </h1>
          <p className="mt-8 max-w-measure text-lg leading-relaxed text-muted">{hero.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={hero.primaryAction.href} variant="primary">
              {hero.primaryAction.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryAction.href} variant="secondary">
              {hero.secondaryAction.label}
            </ButtonLink>
          </div>
        </div>
        <div className="max-w-lg lg:col-span-5 lg:max-w-none">
          <HeroDiagram />
        </div>
      </Container>
    </section>
  );
}
