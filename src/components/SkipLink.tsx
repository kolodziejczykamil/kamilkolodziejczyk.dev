import { MAIN_CONTENT_ID, skipLinkLabel } from "@/content/profile";

export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only rounded-sm bg-signal px-4 py-2 font-medium text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
      {skipLinkLabel}
    </a>
  );
}
