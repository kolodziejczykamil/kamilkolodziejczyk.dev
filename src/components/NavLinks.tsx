"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/content/profile";

type NavLinksProps = {
  items: readonly NavItem[];
};

const ACTIVE_BAND_MARGIN = "-45% 0px -50% 0px";
const BOTTOM_TOLERANCE_PX = 4;

export function NavLinks({ items }: NavLinksProps) {
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section) => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: ACTIVE_BAND_MARGIN },
    );

    const lastSection = sections.at(-1);
    const onScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX;
      if (isAtBottom && lastSection) {
        setActiveHref(`#${lastSection.id}`);
      }
    };

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  return (
    <ul className="flex items-center gap-7 text-[0.9375rem]">
      {items.map((item) => {
        const isActive = item.href === activeHref;
        return (
          <li key={item.href} className={item.showOnMobile ? "" : "hidden sm:block"}>
            <a
              href={item.href}
              aria-current={isActive ? "location" : undefined}
              className={`relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-signal after:transition-transform after:duration-300 ${
                isActive ? "text-paper after:scale-x-100" : "text-muted after:scale-x-0 hover:text-paper"
              }`}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
