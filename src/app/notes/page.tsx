import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { NoteList } from "@/components/NoteList";
import { notes, notesPage } from "@/content/notes";

export const metadata: Metadata = {
  title: notesPage.title,
  description: notesPage.intro,
  alternates: {
    canonical: notesPage.path,
  },
};

export default function NotesPage() {
  return (
    <Container className="py-20 md:py-28">
      <div className="max-w-3xl">
        <h1 className="text-hero">{notesPage.title}</h1>
        <p className="mt-6 max-w-measure text-lg leading-relaxed text-muted">{notesPage.intro}</p>
        <div className="mt-12">
          <NoteList notes={notes} headingLevel="h2" />
        </div>
      </div>
    </Container>
  );
}
