import type { CSSProperties } from "react";
import { hero } from "@/content/profile";

const STEP_MS = 70;
const REVEAL_STEP = 20;

function stagger(step: number): CSSProperties {
  return { "--diagram-delay": `${step * STEP_MS}ms` };
}

const frame = "diagram-stroke stroke-muted";
const detail = "diagram-stroke stroke-line";
const accent = "diagram-stroke stroke-signal";
const block = "diagram-reveal fill-line";
const dot = "diagram-reveal fill-signal";

export function HeroDiagram() {
  const { title, description, label, caption } = hero.diagram;

  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 420 300"
        role="img"
        aria-labelledby="hero-diagram-title"
        aria-describedby="hero-diagram-desc"
        className="h-auto w-full overflow-visible"
      >
        <title id="hero-diagram-title">{title}</title>
        <desc id="hero-diagram-desc">{description}</desc>

        <g fill="none" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
          <rect x={8} y={8} width={272} height={180} rx={6} pathLength={1} className={frame} style={stagger(0)} />
          <line x1={8} y1={26} x2={280} y2={26} pathLength={1} className={frame} style={stagger(1)} />
          <line x1={66} y1={26} x2={66} y2={188} pathLength={1} className={frame} style={stagger(2)} />

          <rect x={318} y={56} width={94} height={188} rx={12} pathLength={1} className={frame} style={stagger(3)} />
          <line x1={352} y1={68} x2={378} y2={68} pathLength={1} className={frame} style={stagger(4)} />

          <line x1={78} y1={138} x2={268} y2={138} pathLength={1} className={detail} style={stagger(5)} />
          <line x1={78} y1={154} x2={268} y2={154} pathLength={1} className={detail} style={stagger(6)} />
          <line x1={78} y1={170} x2={268} y2={170} pathLength={1} className={detail} style={stagger(7)} />
          <line x1={330} y1={176} x2={400} y2={176} pathLength={1} className={detail} style={stagger(8)} />
          <line x1={330} y1={192} x2={400} y2={192} pathLength={1} className={detail} style={stagger(9)} />
          <line x1={330} y1={208} x2={400} y2={208} pathLength={1} className={detail} style={stagger(10)} />

          <rect x={78} y={58} width={188} height={62} rx={3} pathLength={1} className={accent} style={stagger(11)} />
          <line x1={90} y1={78} x2={196} y2={78} pathLength={1} className={accent} style={stagger(12)} />
          <line x1={90} y1={100} x2={234} y2={100} pathLength={1} className={accent} style={stagger(13)} />

          <rect x={330} y={98} width={70} height={62} rx={3} pathLength={1} className={accent} style={stagger(14)} />
          <line x1={340} y1={118} x2={376} y2={118} pathLength={1} className={accent} style={stagger(15)} />
          <line x1={340} y1={140} x2={390} y2={140} pathLength={1} className={accent} style={stagger(16)} />

          <path d="M266 89 C 298 89, 298 129, 330 129" pathLength={1} className={accent} style={stagger(17)} />

          <line x1={8} y1={266} x2={412} y2={266} pathLength={1} className={frame} style={stagger(18)} />
          <line x1={8} y1={259} x2={8} y2={273} pathLength={1} className={frame} style={stagger(18)} />
          <line x1={412} y1={259} x2={412} y2={273} pathLength={1} className={frame} style={stagger(18)} />
        </g>

        <g>
          <rect x={20} y={40} width={34} height={5} rx={1} className={block} style={stagger(REVEAL_STEP)} />
          <rect x={20} y={54} width={26} height={5} rx={1} className={block} style={stagger(REVEAL_STEP)} />
          <rect x={20} y={68} width={30} height={5} rx={1} className={block} style={stagger(REVEAL_STEP)} />
          <rect x={78} y={38} width={110} height={8} rx={1} className={block} style={stagger(REVEAL_STEP)} />
          <rect x={330} y={80} width={52} height={7} rx={1} className={block} style={stagger(REVEAL_STEP)} />
          <circle cx={266} cy={89} r={3} className={dot} style={stagger(REVEAL_STEP)} />
          <circle cx={330} cy={129} r={3} className={dot} style={stagger(REVEAL_STEP)} />
          <text
            x={210}
            y={290}
            textAnchor="middle"
            className="diagram-reveal fill-signal font-sans text-[11px]"
            style={stagger(REVEAL_STEP + 1)}
          >
            {label}
          </text>
        </g>
      </svg>
      <figcaption className="mt-6 max-w-measure text-sm leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  );
}
