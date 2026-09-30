import { ImageResponse } from "next/og";
import { brandColors } from "@/content/brand";
import { hero, person, siteMeta, SITE_URL } from "@/content/profile";
import { loadOgFonts } from "@/lib/og-fonts";

export const alt = siteMeta.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const GRID_CELL_PX = 40;

export default async function OpengraphImage() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: brandColors.ink,
          backgroundImage: `linear-gradient(to right, ${brandColors.line} 1px, transparent 1px), linear-gradient(to bottom, ${brandColors.line} 1px, transparent 1px)`,
          backgroundSize: `${GRID_CELL_PX}px ${GRID_CELL_PX}px`,
          color: brandColors.paper,
          fontFamily: "IBM Plex Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: brandColors.signal }} />
          <div style={{ fontSize: 28, color: brandColors.muted }}>{person.role}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontFamily: "Bricolage Grotesque", fontSize: 92, lineHeight: 1, letterSpacing: -2 }}>
            {person.name}
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.3, color: brandColors.muted, maxWidth: 1000 }}>{hero.headline}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28 }}>
          <div style={{ width: 64, height: 3, backgroundColor: brandColors.signal }} />
          <div style={{ color: brandColors.signal }}>{new URL(SITE_URL).hostname}</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
