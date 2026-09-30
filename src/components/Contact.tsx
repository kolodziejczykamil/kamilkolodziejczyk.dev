import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { contact, EMAIL, LINKEDIN_URL } from "@/content/profile";

export function Contact() {
  return (
    <Section id={contact.id} title={contact.title}>
      <div className="reveal">
        <p className="max-w-measure text-lg leading-relaxed">{contact.intro}</p>
        <div className="mt-8">
          <ContactForm />
        </div>
        <p className="mt-10 max-w-measure text-muted">
          {contact.directPrefix} <TextLink href={`mailto:${EMAIL}`}>{EMAIL}</TextLink>.{" "}
          {contact.linkedInPrefix} <TextLink href={LINKEDIN_URL}>{contact.linkedInLabel}</TextLink>.{" "}
          {contact.cvNote}
        </p>
      </div>
    </Section>
  );
}
