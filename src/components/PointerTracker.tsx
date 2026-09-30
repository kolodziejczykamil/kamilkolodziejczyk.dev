"use client";

import type { PointerEvent, ReactNode } from "react";

type PointerTrackerProps = {
  children: ReactNode;
  className?: string;
};

function trackPointer(event: PointerEvent<HTMLDivElement>) {
  const target = event.currentTarget;
  const bounds = target.getBoundingClientRect();
  target.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
  target.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
}

export function PointerTracker({ children, className = "" }: PointerTrackerProps) {
  return (
    <div className={className} onPointerMove={trackPointer}>
      {children}
    </div>
  );
}
