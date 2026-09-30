import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ImageResponse } from "next/og";

type OgFont = NonNullable<NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"]>[number];

const FONT_DIRECTORY = join(process.cwd(), "node_modules/@fontsource");

async function loadFont(relativePath: string) {
  return readFile(join(FONT_DIRECTORY, relativePath));
}

export async function loadOgFonts(): Promise<OgFont[]> {
  const [displayLatin, displayLatinExt, bodyLatin, bodyLatinExt] = await Promise.all([
    loadFont("bricolage-grotesque/files/bricolage-grotesque-latin-600-normal.woff"),
    loadFont("bricolage-grotesque/files/bricolage-grotesque-latin-ext-600-normal.woff"),
    loadFont("ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff"),
    loadFont("ibm-plex-sans/files/ibm-plex-sans-latin-ext-400-normal.woff"),
  ]);

  return [
    { name: "Bricolage Grotesque", data: displayLatin, weight: 600, style: "normal" },
    { name: "Bricolage Grotesque", data: displayLatinExt, weight: 600, style: "normal" },
    { name: "IBM Plex Sans", data: bodyLatin, weight: 400, style: "normal" },
    { name: "IBM Plex Sans", data: bodyLatinExt, weight: 400, style: "normal" },
  ];
}
