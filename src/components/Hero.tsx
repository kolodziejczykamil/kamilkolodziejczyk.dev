import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { HeroDiagram } from "@/components/HeroDiagram";
import { PointerTracker } from "@/components/PointerTracker";
import { hero } from "@/content/profile";

const WORD_STEP_MS = 55;
const HEADLINE_START_MS = 120;
const RISE_START_MS = 520;
const RISE_STEP_MS = 120;

function riseDelay(step: number): CSSProperties {
  return { "--rise-delay": `${RISE_START_MS + step * RISE_STEP_MS}ms` };
}

export function Hero() {
  const words = hero.headline.split(" ");

  return (
    <section aria-labelledby="hero-title">
      <PointerTracker className="group relative isolate overflow-hidden">
        <div aria-hidden="true" className="blueprint-grid absolute inset-0 -z-10" />
        <div
          aria-hidden="true"
          className="blueprint-glow absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <Container className="grid items-center gap-16 py-20 md:py-28 lg:grid-cols-12 lg:gap-10 lg:py-32">
          <div className="lg:col-span-7">
            <p className="hero-rise text-muted" style={riseDelay(0)}>
              {hero.eyebrow}
            </p>
            <h1 id="hero-title" className="mt-5 text-hero">
              {words.map((word, index) => (
                <span key={`${word}-${index}`}>
                  <span
                    className="hero-word"
                    style={{ "--word-delay": `${HEADLINE_START_MS + index * WORD_STEP_MS}ms` }}
                  >
                    {word}
                  </span>{" "}
                </span>
              ))}
            </h1>
            <p className="hero-rise mt-8 max-w-measure text-lg leading-relaxed text-muted" style={riseDelay(1)}>
              {hero.intro}
            </p>
            <div className="hero-rise mt-10 flex flex-wrap gap-3" style={riseDelay(2)}>
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
      </PointerTracker>
    </section>
  );
}
