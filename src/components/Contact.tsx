import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { contact, EMAIL, LINKEDIN_URL } from "@/content/profile";

export function Contact() {
  return (
    <Section id={contact.id} title={contact.title}>
      <div className="@container">
        <p className="max-w-measure">{contact.intro}</p>
        <p className="mt-8">
          <a
            href={`mailto:${EMAIL}`}
            className="font-display text-email font-semibold tracking-tight text-signal underline decoration-line decoration-2 underline-offset-[0.2em] transition-colors [overflow-wrap:anywhere] hover:decoration-signal"
          >
            {EMAIL}
          </a>
        </p>
        <p className="mt-8 max-w-measure text-muted">
          {contact.linkedInPrefix} <TextLink href={LINKEDIN_URL}>{contact.linkedInLabel}</TextLink>.{" "}
          {contact.cvNote}
        </p>
      </div>
    </Section>
  );
}
