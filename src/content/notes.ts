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
    slug: "what-static-analysis-cannot-tell-you-about-react-re-renders",
    title: "What static analysis can't tell you about React re-renders",
    description:
      "Building a tool that predicts React re-renders from source code shows exactly where reading code stops and the running app has to answer. Including the useCallback rule that needs the most nuance.",
    publishedAt: "2026-10-18",
    readingMinutes: 4,
    load: () => import("@/content/notes/what-static-analysis-cannot-tell-you-about-react-re-renders.mdx"),
  },
  {
    slug: "parallel-ai-agents-need-a-contract-first",
    title: "Parallel AI agents need a contract first",
    description:
      "I built the attendance app with an orchestrator and four AI agents working at the same time. What made it work was everything prepared before any agent wrote code.",
    publishedAt: "2026-10-11",
    readingMinutes: 3,
    load: () => import("@/content/notes/parallel-ai-agents-need-a-contract-first.mdx"),
  },
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
