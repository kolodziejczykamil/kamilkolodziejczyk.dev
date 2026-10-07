import { NoteMeta } from "@/components/NoteMeta";
import { PointerTracker } from "@/components/PointerTracker";
import { notePath } from "@/content/notes";
import type { Note } from "@/content/notes";

type NoteListProps = {
  notes: readonly Note[];
  headingLevel: "h2" | "h3";
};

export function NoteList({ notes, headingLevel: Heading }: NoteListProps) {
  return (
    <ul className="space-y-5">
      {notes.map((note) => (
        <li key={note.slug}>
          <PointerTracker className="reveal">
            <a
              href={notePath(note)}
              className="spotlight group block rounded-xl border border-line p-6 transition-colors duration-300 hover:border-line-strong sm:p-8"
            >
              <NoteMeta note={note} />
              <Heading className="mt-2 text-2xl leading-tight transition-colors duration-300 group-hover:text-signal">
                {note.title}
              </Heading>
              <p className="mt-3 max-w-measure text-muted">{note.description}</p>
            </a>
          </PointerTracker>
        </li>
      ))}
    </ul>
  );
}
