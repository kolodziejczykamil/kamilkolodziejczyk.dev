"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
};

const DURATION_MS = 1400;
const VISIBILITY_THRESHOLD = 0.6;

function easeOutCubic(progress: number): number {
  return 1 - (1 - progress) ** 3;
}

export function CountUp({ value, prefix = "", suffix = "" }: CountUpProps) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = numberRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          element.textContent = String(Math.round(easeOutCubic(progress) * value));
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          }
        };
        element.textContent = "0";
        frame = requestAnimationFrame(tick);
      },
      { threshold: VISIBILITY_THRESHOLD },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span className="tabular-nums">
      {prefix}
      <span ref={numberRef}>{value}</span>
      {suffix}
    </span>
  );
}
