import type { Note } from "@/content/notes";
import { notesPage } from "@/content/notes";
import { formatDate } from "@/lib/format-date";

type NoteMetaProps = {
  note: Note;
};

export function NoteMeta({ note }: NoteMetaProps) {
  return (
    <p className="text-sm text-muted">
      <time dateTime={note.publishedAt}>{formatDate(note.publishedAt)}</time>
      <span aria-hidden="true"> · </span>
      {note.readingMinutes} {notesPage.readingTimeLabel}
    </p>
  );
}
