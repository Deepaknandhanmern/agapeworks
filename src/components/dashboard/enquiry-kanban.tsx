import type { Enquiry } from "@/generated/prisma/client";
import { EnquiryRow } from "@/app/dashboard/(app)/enquiries/enquiry-row";

const COLUMNS: { key: "high" | "medium" | "low" | "untriaged"; label: string; dot: string }[] = [
  { key: "high", label: "High priority", dot: "bg-destructive" },
  { key: "medium", label: "Medium priority", dot: "bg-amber-500" },
  { key: "low", label: "Low priority", dot: "bg-muted-foreground/60" },
  { key: "untriaged", label: "Not yet triaged", dot: "bg-muted-foreground/20" },
];

export function EnquiryKanban({ enquiries }: { enquiries: Enquiry[] }) {
  const grouped = {
    high: enquiries.filter((e) => e.priority === "high"),
    medium: enquiries.filter((e) => e.priority === "medium"),
    low: enquiries.filter((e) => e.priority === "low"),
    untriaged: enquiries.filter((e) => !e.priority),
  };

  return (
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
  );
}
