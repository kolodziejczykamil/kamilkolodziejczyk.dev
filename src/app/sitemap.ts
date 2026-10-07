import type { MetadataRoute } from "next";
import { notePath, notes, notesPage } from "@/content/notes";
import { SITE_URL } from "@/content/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestNoteDate = notes.map((note) => note.publishedAt).sort().at(-1);
  const noteEntries: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${SITE_URL}${notePath(note)}`,
    lastModified: new Date(note.publishedAt),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${notesPage.path}`,
      lastModified: latestNoteDate ? new Date(latestNoteDate) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...noteEntries,
  ];
}
