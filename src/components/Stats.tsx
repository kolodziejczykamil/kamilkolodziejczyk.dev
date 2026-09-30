import { Container } from "@/components/Container";
import { CountUp } from "@/components/CountUp";
import { stats } from "@/content/profile";

export function Stats() {
  return (
    <section aria-label={stats.label} className="border-t border-line bg-ink-raised/40">
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.items.map((stat) => (
            <div
              key={stat.label}
              className="reveal flex flex-col gap-2 border-line py-8 odd:border-r odd:pr-5 even:pl-5 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
            >
              <dt className="order-2 text-sm leading-snug text-muted">{stat.label}</dt>
              <dd className="order-1 font-display text-stat font-semibold tracking-tight text-signal">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
