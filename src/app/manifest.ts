import type { MetadataRoute } from "next";
import { brandColors } from "@/content/brand";
import { person, siteMeta } from "@/content/profile";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMeta.title,
    short_name: person.name,
    description: siteMeta.description,
    start_url: "/",
    display: "browser",
    background_color: brandColors.ink,
    theme_color: brandColors.ink,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
