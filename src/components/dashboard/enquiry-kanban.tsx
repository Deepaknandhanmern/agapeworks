"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Enquiry } from "@/generated/prisma/client";
import { EnquiryRow } from "@/app/dashboard/(app)/enquiries/enquiry-row";

const COLUMNS: { key: "high" | "medium" | "low" | "untriaged"; label: string; dot: string }[] = [
  { key: "high", label: "High priority", dot: "bg-destructive" },
  { key: "medium", label: "Medium priority", dot: "bg-amber-500" },
  { key: "low", label: "Low priority", dot: "bg-muted-foreground/60" },
  { key: "untriaged", label: "Not yet triaged", dot: "bg-muted-foreground/20" },
];

export function EnquiryKanban({ enquiries }: { enquiries: Enquiry[] }) {
  const [query, setQuery] = useState("");

  // Filtered client-side: the whole set is already sent to this component,
  // and enquiry volume here is far too low to justify a round trip per
  // keystroke or a search index.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return enquiries;
    return enquiries.filter((e) =>
      [e.name, e.email, e.company, e.service, e.message, e.aiSummary]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q)),
    );
  }, [enquiries, query]);

  const grouped = {
    high: filtered.filter((e) => e.priority === "high"),
    medium: filtered.filter((e) => e.priority === "medium"),
    low: filtered.filter((e) => e.priority === "low"),
    untriaged: filtered.filter((e) => !e.priority),
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, company, message…"
          aria-label="Search enquiries"
          className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-9 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {query && (
        <p className="text-sm text-muted-foreground">
          {filtered.length} of {enquiries.length} enquiries match “{query}”.
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.key} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <span aria-hidden="true" className={`size-2 rounded-full ${col.dot}`} />
              <h2 className="text-sm font-semibold text-foreground">{col.label}</h2>
              <span className="text-xs text-muted-foreground">{grouped[col.key].length}</span>
            </div>
            <div className="flex flex-col gap-3">
              {grouped[col.key].length === 0 ? (
                <p className="rounded-xl border border-dashed bg-card/50 p-4 text-center text-xs text-muted-foreground">
                  Nothing here
                </p>
              ) : (
                grouped[col.key].map((enquiry) => <EnquiryRow key={enquiry.id} enquiry={enquiry} />)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
