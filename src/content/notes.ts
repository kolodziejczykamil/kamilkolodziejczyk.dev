import type { MDXContent } from "mdx/types";

export type Note = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
  load: () => Promise<{ default: MDXContent }>;
};

export const notes: readonly Note[] = [
  {
    slug: "why-i-did-not-integrate-with-messenger",
    title: "Why I didn't integrate with Messenger",
    description:
      "A fitness coach ticked off attendance by hand from Messenger messages. Before writing code, I checked what Meta's APIs allow, and the answer shaped the whole app.",
    publishedAt: "2026-10-02",
    readingMinutes: 4,
    load: () => import("@/content/notes/why-i-did-not-integrate-with-messenger.mdx"),
  },
];

export const notesPage = {
  id: "notes",
  path: "/notes",
  title: "Notes",
  intro: "Short write-ups about decisions behind the things I build: what I tried, what I chose and why.",
  latestTitle: "Latest notes",
  allNotesLabel: "All notes",
  backLabel: "All notes",
  readingTimeLabel: "min read",
};

export function findNote(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}

export function notePath(note: Note): string {
  return `${notesPage.path}/${note.slug}`;
}
