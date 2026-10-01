import Image from "next/image";
import type { ProjectScreenshot } from "@/content/profile";

type PhoneScreenshotsProps = {
  screenshots: readonly ProjectScreenshot[];
  caption: string;
};

export function PhoneScreenshots({ screenshots, caption }: PhoneScreenshotsProps) {
  return (
    <figure className="mt-6">
      <ul className="grid grid-cols-3 gap-3 sm:gap-4">
        {screenshots.map((screenshot, index) => (
          <li
            key={screenshot.src}
            className={`overflow-hidden rounded-2xl border border-line-strong bg-ink-raised transition-transform duration-500 ease-out group-hover:-translate-y-1 ${
              index === 1 ? "sm:translate-y-4 sm:group-hover:translate-y-2" : ""
            }`}
          >
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              width={screenshot.width}
              height={screenshot.height}
              sizes="(min-width: 1024px) 14rem, 30vw"
              className="h-auto w-full"
            />
          </li>
        ))}
      </ul>
      <figcaption className="mt-3 text-xs text-muted sm:mt-7">{caption}</figcaption>
    </figure>
  );
}
