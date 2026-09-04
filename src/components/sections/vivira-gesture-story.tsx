import { Reveal } from "@/components/ui/reveal";

// Hand-drawn-style stick-figure illustrations of Vivira's actual, verified
// recovery flow (browse -> abandon -> WhatsApp recovery -> AI answers ->
// COD check -> checkout). Deliberately does NOT depict fulfillment/courier/
// GST steps - those aren't part of what Vivira does today (see the "6-step"
// journey copy above, which currently overclaims a couple of those - worth
// reconciling separately).

const INK = "#2a2a2a";
const ORANGE = "#f97316";
const PURPLE = "#9333ea";
const WHATSAPP_GREEN = "#25D366";
const SUCCESS_GREEN = "#16a34a";

function SketchDefs() {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <filter id="vivira-sketch" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

type Pose = "stand" | "walk" | "reach" | "cheer" | "point";

// Single-stroke stick figures, ~56x84, feet resting near y=84.
function FigureBody({ pose }: { pose: Pose }) {
  const common = { fill: "none", stroke: INK, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  const bodies: Record<Pose, string> = {
    // arm bent up holding something at chest height
    stand: "M28 30 L28 58 M28 38 Q20 34 15 26 M28 40 Q37 44 40 34 M28 58 L18 82 M28 58 L38 82",
    // mid-stride, arms swinging opposite legs
    walk: "M26 30 L30 56 M30 40 Q20 32 13 36 M26 42 Q36 50 40 44 M30 56 L14 80 M30 56 L42 78",
    // one arm reaching straight out to tap/point at something ahead
    reach: "M28 30 L30 58 M30 38 Q42 34 50 30 M28 40 Q20 46 17 36 M30 58 L20 82 M30 58 L40 82",
    // both feet planted, one fist raised high in celebration
    cheer: "M28 30 L28 58 M28 36 Q34 18 40 12 M28 40 Q20 44 15 40 M28 58 L18 82 M28 58 L38 82",
    // arm extended forward and down, like pointing at a phone in the other hand
    point: "M28 30 L28 58 M28 36 Q38 30 46 34 M28 40 Q19 40 14 32 M28 58 L18 82 M28 58 L38 82",
  };

  return (
    <g style={{ filter: "url(#vivira-sketch)" }}>
      <circle cx="28" cy="18" r="10" {...common} />
      <path d={bodies[pose]} {...common} />
    </g>
  );
}

function PhoneProp({ x, y, color = INK }: { x: number; y: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`} style={{ filter: "url(#vivira-sketch)" }}>
      <rect x="0" y="0" width="16" height="26" rx="3" fill="none" stroke={color} strokeWidth="2.5" />
      <line x1="4" y1="21" x2="12" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

function CartProp({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} style={{ filter: "url(#vivira-sketch)" }}>
      <path d="M0 0 H4 L9 16 H24 L28 4 H7" fill="none" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="21" r="2.4" fill={ORANGE} />
      <circle cx="23" cy="21" r="2.4" fill={ORANGE} />
    </g>
  );
}

function BubbleProp({ x, y, color, children }: { x: number; y: number; color: string; children: React.ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`} style={{ filter: "url(#vivira-sketch)" }}>
      <path d="M0 10 Q0 0 10 0 H30 Q40 0 40 10 V16 Q40 26 30 26 H12 L4 32 L6 25 Q0 22 0 16 Z" fill="#fff" stroke={color} strokeWidth="2.2" />
      {children}
    </g>
  );
}

function SparkleProp({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} style={{ filter: "url(#vivira-sketch)" }}>
      <path d="M9 0 L11 7 L18 9 L11 11 L9 18 L7 11 L0 9 L7 7 Z" fill={PURPLE} />
    </g>
  );
}

function ShieldProp({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} style={{ filter: "url(#vivira-sketch)" }}>
      <path d="M11 0 L22 4 V13 Q22 22 11 27 Q0 22 0 13 V4 Z" fill="none" stroke={ORANGE} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M5 13 L9 17 L17 8" fill="none" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function CheckBurstProp({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} style={{ filter: "url(#vivira-sketch)" }}>
      <circle cx="12" cy="12" r="12" fill="none" stroke={SUCCESS_GREEN} strokeWidth="2.5" />
      <path d="M6 12 L10 16 L18 7" fill="none" stroke={SUCCESS_GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function RupeeUpProp({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} style={{ filter: "url(#vivira-sketch)" }}>
      <text x="0" y="18" fontSize="20" fontWeight={700} fill={PURPLE}>
        ₹
      </text>
      <path d="M26 18 L34 4 M34 4 L28 5 M34 4 L33 10" fill="none" stroke={SUCCESS_GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function DashedGhost({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} style={{ filter: "url(#vivira-sketch)" }} opacity={0.35}>
      <path d="M0 0 H4 L9 16 H24 L28 4 H7" fill="none" stroke={INK} strokeWidth="2.5" strokeDasharray="3 3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Scene({ pose, viewBox = "0 0 90 96", children }: { pose: Pose; viewBox?: string; children?: React.ReactNode }) {
  return (
    <svg viewBox={viewBox} className="h-24 w-auto sm:h-28">
      <g transform="translate(6 4)">
        <FigureBody pose={pose} />
      </g>
      {children}
    </svg>
  );
}

const categories: {
  label: string;
  items: { caption: string; render: () => React.ReactNode }[];
}[] = [
  {
    label: "The Abandon",
    items: [
      { caption: "Browses the store", render: () => <Scene pose="stand"><PhoneProp x={44} y={26} /></Scene> },
      { caption: "Adds to cart", render: () => <Scene pose="reach"><CartProp x={56} y={40} /></Scene> },
      { caption: "Leaves without paying", render: () => <Scene pose="walk"><DashedGhost x={2} y={50} /></Scene> },
    ],
  },
  {
    label: "The Recovery",
    items: [
      {
        caption: "WhatsApp reminder sent",
        render: () => (
          <Scene pose="stand">
            <BubbleProp x={40} y={6} color={WHATSAPP_GREEN}>
              <path d="M8 13 Q8 6 15 6 Q22 6 22 13 Q22 19 15 19 Q12 19 10 18 L6 20 L7 16 Q8 15 8 13" fill="none" stroke={WHATSAPP_GREEN} strokeWidth="2" />
            </BubbleProp>
          </Scene>
        ),
      },
      { caption: "Reads the message", render: () => <Scene pose="point"><PhoneProp x={44} y={30} color={WHATSAPP_GREEN} /></Scene> },
      { caption: "Taps back to checkout", render: () => <Scene pose="reach"><CartProp x={56} y={38} /></Scene> },
    ],
  },
  {
    label: "The Conversation",
    items: [
      {
        caption: "Asks a question",
        render: () => (
          <Scene pose="stand">
            <BubbleProp x={40} y={4} color={INK}>
              <text x="16" y="19" fontSize="16" fontWeight={700} textAnchor="middle" fill={INK}>?</text>
            </BubbleProp>
          </Scene>
        ),
      },
      {
        caption: "AI answers instantly",
        render: () => (
          <Scene pose="stand">
            <BubbleProp x={38} y={2} color={PURPLE}>
              <SparkleProp x={12} y={5} />
            </BubbleProp>
          </Scene>
        ),
      },
      {
        caption: "Human steps in if needed",
        render: () => (
          <svg viewBox="0 0 130 96" className="h-24 w-auto sm:h-28">
            <g transform="translate(4 4)"><FigureBody pose="stand" /></g>
            <path d="M62 40 H84" stroke={INK} strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" style={{ filter: "url(#vivira-sketch)" }} />
            <g transform="translate(70 4)"><FigureBody pose="stand" /></g>
          </svg>
        ),
      },
    ],
  },
  {
    label: "The Outcome",
    items: [
      { caption: "COD verified over WhatsApp", render: () => <Scene pose="stand"><ShieldProp x={46} y={20} /></Scene> },
      { caption: "Order completes", render: () => <Scene pose="point"><CheckBurstProp x={48} y={16} /></Scene> },
      { caption: "Revenue recovered", render: () => <Scene pose="cheer"><RupeeUpProp x={44} y={30} /></Scene> },
    ],
  },
];

export function ViviraGestureStory() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-24">
      <SketchDefs />
      <Reveal className="mb-12 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          The recovery, sketched out
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          What actually happens between a shopper closing the tab and an order landing in WooCommerce.
        </p>
      </Reveal>

      <div className="flex flex-col gap-10">
        {categories.map((category, ci) => (
          <Reveal key={category.label} delay={ci * 0.08}>
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {category.label}
            </p>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {category.items.map((item) => (
                <div key={item.caption} className="liquid-glass flex flex-col items-center gap-2 rounded-2xl px-3 py-5 text-center">
                  {item.render()}
                  <p className="text-xs font-medium text-foreground sm:text-sm">{item.caption}</p>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
