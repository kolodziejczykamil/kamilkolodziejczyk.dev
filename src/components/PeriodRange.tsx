import type { Period } from "@/content/profile";

type PeriodRangeProps = {
  period: Period;
};

export function PeriodRange({ period }: PeriodRangeProps) {
  return (
    <>
      <time dateTime={String(period.from)}>{period.from}</time> to{" "}
      {period.to === "now" ? "now" : <time dateTime={String(period.to)}>{period.to}</time>}
    </>
  );
}
