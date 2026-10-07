import { NoteList } from "@/components/NoteList";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { notes, notesPage } from "@/content/notes";

const LATEST_NOTES_COUNT = 3;

export function LatestNotes() {
  return (
    <Section id={notesPage.id} title={notesPage.title}>
      <p className="reveal mb-8 max-w-measure text-muted">{notesPage.intro}</p>
      <NoteList notes={notes.slice(0, LATEST_NOTES_COUNT)} headingLevel="h3" />
      <p className="mt-8">
        <TextLink href={notesPage.path}>{notesPage.allNotesLabel}</TextLink>
      </p>
    </Section>
  );
}
