"use client";

import * as React from "react";
import type { EnquiryWeekBucket } from "@/lib/data/dashboard";

// Stacked bar: weekly enquiry volume split by AI-triaged priority. Built to
// the dataviz skill's spec — <=24px bars, 4px rounded data-end, 2px surface
// gap between stacked segments, a legend (status colors are never
// color-alone), and a per-segment hover tooltip with a table-view fallback
// so every value stays reachable without hovering.
const SERIES = [
  { key: "high", label: "High priority", color: "var(--destructive)" },
  { key: "medium", label: "Medium priority", color: "#f59e0b" },
  { key: "low", label: "Low priority", color: "var(--muted-foreground)" },
] as const;

type SeriesKey = (typeof SERIES)[number]["key"];

const CHART_HEIGHT = 160;
// Fraction of each week's band the bar fills — the rest is the "air" the
// mark spec calls for (never fill the slot). Viewbox units, not px: this SVG
// scales fluidly with its container.
const BAR_FILL_RATIO = 0.6;
const GAP = 2;

export function EnquiryVolumeChart({ data }: { data: EnquiryWeekBucket[] }) {
  const [tooltip, setTooltip] = React.useState<{
    x: number;
    y: number;
    week: string;
    series: string;
    value: number;
    color: string;
  } | null>(null);
  const [showTable, setShowTable] = React.useState(false);

  const untriagedTotal = data.reduce((sum, week) => sum + week.untriaged, 0);
  const maxTotal = Math.max(...data.map((w) => w.high + w.medium + w.low), 1);

  const bandWidth = 100 / data.length;
  const barWidth = bandWidth * BAR_FILL_RATIO;

  return (
    <figure className="rounded-xl border bg-card p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <figcaption className="text-sm font-medium text-foreground">
            Enquiry volume by priority
          </figcaption>
          <p className="text-xs text-muted-foreground">Last {data.length} weeks</p>
        </div>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-3">
            {SERIES.map((s) => (
              <li key={s.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-[2px]"
                  style={{ backgroundColor: s.color }}
                />
                {s.label}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setShowTable((v) => !v)}
            className="text-xs font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            {showTable ? "View chart" : "View as table"}
          </button>
        </div>
      </div>

      {showTable ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Week</th>
                {SERIES.map((s) => (
                  <th key={s.key} className="py-2 pr-4 font-medium tabular-nums">
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((week) => (
                <tr key={week.label} className="border-b last:border-0">
                  <td className="py-2 pr-4 text-foreground">{week.label}</td>
                  {SERIES.map((s) => (
                    <td key={s.key} className="py-2 pr-4 tabular-nums text-foreground">
                      {week[s.key as SeriesKey]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="relative">
          <svg
            viewBox={`0 0 100 ${CHART_HEIGHT}`}
            preserveAspectRatio="none"
            className="h-40 w-full overflow-visible"
            role="img"
            aria-label={`Weekly enquiry volume by priority, last ${data.length} weeks`}
          >
            {/* Baseline */}
            <line x1={0} y1={CHART_HEIGHT} x2={100} y2={CHART_HEIGHT} stroke="var(--border)" strokeWidth={0.5} />

            {data.map((week, wi) => {
              const cx = bandWidth * wi + bandWidth / 2;
              const x = cx - barWidth / 2;
              const total = week.high + week.medium + week.low;
              let cursorY = CHART_HEIGHT;

              const segments = SERIES.map((s) => {
                const value = week[s.key as SeriesKey];
                const rawHeight = (value / maxTotal) * (CHART_HEIGHT - 16);
                const segHeight = value > 0 ? Math.max(rawHeight - GAP, 1) : 0;
                const y = cursorY - rawHeight;
                cursorY = y;
                return { ...s, value, y, height: segHeight };
              });

              return (
                <g key={week.label}>
                  {segments.map((seg, si) => {
                    if (seg.value === 0) return null;
                    const isTopSegment = segments.slice(si + 1).every((s) => s.value === 0);

                    return (
                      <rect
                        key={seg.key}
                        x={x}
                        y={seg.y}
                        width={barWidth}
                        height={seg.height}
                        fill={seg.color}
                        rx={isTopSegment ? 2 : 0}
                        className="cursor-pointer opacity-90 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none"
                        tabIndex={0}
                        onMouseEnter={(e) =>
                          setTooltip({
                            x: e.clientX,
                            y: e.clientY,
                            week: week.label,
                            series: seg.label,
                            value: seg.value,
                            color: seg.color,
                          })
                        }
                        onMouseMove={(e) =>
                          setTooltip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : t))
                        }
                        onMouseLeave={() => setTooltip(null)}
                        onFocus={() =>
                          setTooltip({
                            x: 0,
                            y: 0,
                            week: week.label,
                            series: seg.label,
                            value: seg.value,
                            color: seg.color,
                          })
                        }
                        onBlur={() => setTooltip(null)}
                      >
                        <title>{`${week.label} — ${seg.label}: ${seg.value}`}</title>
                      </rect>
                    );
                  })}

                  {/* Direct label: total at the tip of the bar */}
                  {total > 0 && (
                    <text
                      x={cx}
                      y={cursorY - 4}
                      textAnchor="middle"
                      className="fill-muted-foreground"
                      style={{ fontSize: 6 }}
                    >
                      {total}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          <div className="mt-1 flex" style={{ paddingInline: "1px" }}>
            {data.map((week) => (
              <span
                key={week.label}
                className="text-center text-[10px] text-muted-foreground"
                style={{ width: `${bandWidth}%` }}
              >
                {week.label}
              </span>
            ))}
          </div>

          {tooltip && (
            <div
              role="status"
              className="pointer-events-none fixed z-50 rounded-md border bg-popover px-2.5 py-1.5 text-xs shadow-md"
              style={{ left: tooltip.x + 12, top: tooltip.y + 12 }}
            >
              <p className="font-semibold text-foreground">{tooltip.value} enquiries</p>
              <p className="flex items-center gap-1.5 text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="inline-block h-0.5 w-3 rounded-full"
                  style={{ backgroundColor: tooltip.color }}
                />
                {tooltip.series} · {tooltip.week}
              </p>
            </div>
          )}
        </div>
      )}

      {untriagedTotal > 0 && (
        <p className="mt-3 text-xs text-muted-foreground">
          {untriagedTotal} enquiries in this range aren&apos;t triaged yet and are excluded above.
        </p>
      )}
    </figure>
  );
}
