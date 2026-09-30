import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { brandColors } from "@/content/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function AppleIcon() {
  const iconSvg = await readFile(join(process.cwd(), "src/app/icon.svg"), "utf8");
  const iconSrc = `data:image/svg+xml;base64,${Buffer.from(iconSvg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: brandColors.ink,
          backgroundImage: `url(${iconSrc})`,
          backgroundSize: "100% 100%",
        }}
      />
    ),
    size,
  );
}
