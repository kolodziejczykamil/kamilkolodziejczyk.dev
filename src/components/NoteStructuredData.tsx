import { notePath } from "@/content/notes";
import type { Note } from "@/content/notes";
import { person, SITE_URL, siteMeta } from "@/content/profile";
import { toJsonLd } from "@/lib/json-ld";

type NoteStructuredDataProps = {
  note: Note;
};

export function NoteStructuredData({ note }: NoteStructuredDataProps) {
  const url = `${SITE_URL}${notePath(note)}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    description: note.description,
    datePublished: note.publishedAt,
    url,
    mainEntityOfPage: url,
    inLanguage: "en",
    image: `${SITE_URL}${siteMeta.ogImagePath}`,
    author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: person.name, url: SITE_URL },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(article) }} />;
}
