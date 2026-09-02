import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { StatTrend } from "@/lib/data/dashboard";

// Stat-tile contract (label · value · delta · trend) - see the dataviz skill's
// marks-and-anatomy.md "Figures" section. The sparkline is a decorative
// summary, not an interactive chart, so it skips the hover layer that a real
// chart form requires.
function Sparkline({ trend }: { trend: number[] }) {
  const max = Math.max(...trend, 1);
  const width = 64;
  const height = 20;
  const step = width / (trend.length - 1 || 1);

  const points = trend.map((v, i) => {
    const x = i * step;
    const y = height - (v / max) * (height - 4) - 2;
    return [x, y] as const;
  });

  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [lastX, lastY] = points[points.length - 1];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" className="shrink-0">
      <path d={path} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40" />
      <circle cx={lastX} cy={lastY} r={2.5} className="fill-foreground" />
    </svg>
  );
}

export function StatTile({
  label,
  href,
  icon: Icon,
  stat,
  deltaLabel = "this week",
  badge,
}: {
  label: string;
  href: string;
  icon: LucideIcon;
  stat: StatTrend;
  deltaLabel?: string;
  badge?: string;
}) {
  const hasDelta = stat.deltaThisWeek > 0;

  return (
    <Link
      href={href}
      className="flex flex-col gap-3 rounded-xl border bg-card p-6 transition-colors hover:bg-accent"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-lg bg-accent">
            <Icon className="size-5 text-foreground" />
          </div>
          {badge && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-foreground">
              {badge}
            </span>
          )}
        </div>
        <Sparkline trend={stat.trend} />
      </div>
      <div>
        <p className="text-3xl font-semibold text-foreground">{stat.total}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">{label}</p>
          {hasDelta ? (
            <span className="text-xs font-medium text-[#006300]">
              +{stat.deltaThisWeek} {deltaLabel}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground/60">no change {deltaLabel}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
