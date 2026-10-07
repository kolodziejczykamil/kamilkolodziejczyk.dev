import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { NoteMeta } from "@/components/NoteMeta";
import { NoteStructuredData } from "@/components/NoteStructuredData";
import { TextLink } from "@/components/TextLink";
import { findNote, notePath, notes, notesPage } from "@/content/notes";
import { person, siteMeta } from "@/content/profile";

export const dynamicParams = false;

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = findNote(slug);
  if (!note) {
    return {};
  }

  return {
    title: note.title,
    description: note.description,
    alternates: {
      canonical: notePath(note),
    },
    openGraph: {
      type: "article",
      url: notePath(note),
      title: note.title,
      description: note.description,
      publishedTime: note.publishedAt,
      authors: [person.name],
      images: [{ url: siteMeta.ogImagePath, alt: siteMeta.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.description,
      images: [{ url: siteMeta.ogImagePath, alt: siteMeta.ogImageAlt }],
    },
  };
}

export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = findNote(slug);
  if (!note) {
    notFound();
  }
  const { default: Content } = await note.load();

  return (
    <Container className="py-20 md:py-28">
      <NoteStructuredData note={note} />
      <article className="mx-auto max-w-measure">
        <p>
          <TextLink href={notesPage.path}>{notesPage.backLabel}</TextLink>
        </p>
        <header className="mt-10">
          <NoteMeta note={note} />
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] leading-[1.08]">{note.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{note.description}</p>
        </header>
        <div className="mt-12 border-t border-line pt-10">
          <Content />
        </div>
      </article>
    </Container>
  );
}
