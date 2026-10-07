"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "@/content/profile";

type NavLinksProps = {
  items: readonly NavItem[];
};

const ACTIVE_BAND_MARGIN = "-45% 0px -50% 0px";
const BOTTOM_TOLERANCE_PX = 4;
const HOME_PATH = "/";

function sectionId(href: string): string | null {
  const [path, hash] = href.split("#");
  return path === HOME_PATH && hash ? hash : null;
}

export function NavLinks({ items }: NavLinksProps) {
  const pathname = usePathname();
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== HOME_PATH) {
      return;
    }

    const sections = items
      .map((item) => sectionId(item.href))
      .map((id) => (id ? document.getElementById(id) : null))
      .filter((section) => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSectionId(visible.target.id);
        }
      },
      { rootMargin: ACTIVE_BAND_MARGIN },
    );

    const lastSection = sections.at(-1);
    const onScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX;
      if (isAtBottom && lastSection) {
        setActiveSectionId(lastSection.id);
      }
    };

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items, pathname]);

  const isActive = (item: NavItem) => {
    const id = sectionId(item.href);
    if (id) {
      return pathname === HOME_PATH && id === activeSectionId;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <ul className="flex items-center gap-6 text-[0.9375rem]">
      {items.map((item) => {
        const active = isActive(item);
        return (
          <li key={item.href} className={item.showOnMobile ? "" : "hidden md:block"}>
            <a
              href={item.href}
              aria-current={active ? "location" : undefined}
              className={`relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-signal after:transition-transform after:duration-300 ${
                active ? "text-paper after:scale-x-100" : "text-muted after:scale-x-0 hover:text-paper"
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
