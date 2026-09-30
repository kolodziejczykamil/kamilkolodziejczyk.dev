import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "./globals.css";
import { SITE_URL, siteMeta } from "@/content/profile";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteMeta.title,
  description: siteMeta.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "/",
    siteName: siteMeta.title,
    title: siteMeta.title,
    description: siteMeta.description,
  },
  twitter: {
    card: "summary",
    title: siteMeta.title,
    description: siteMeta.description,
  },
};

export const viewport: Viewport = {
  themeColor: siteMeta.themeColor,
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
