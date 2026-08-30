import Link from "next/link";
import { Newspaper, FolderKanban, Inbox } from "lucide-react";
import type { ActivityItem } from "@/lib/data/dashboard";

const TYPE_META = {
  post: { icon: Newspaper, label: "Blog post" },
  project: { icon: FolderKanban, label: "Project" },
  enquiry: { icon: Inbox, label: "Enquiry" },
} as const;

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const units: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.345, "week"],
    [12, "month"],
  ];

  let value = seconds;
  let unit = "second";
  for (const [size, name] of units) {
    if (value < size) break;
    value = Math.floor(value / size);
    unit = name;
  }
  if (value <= 1 && unit === "second") return "just now";
  return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
}

export function RecentActivity({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
        No activity yet.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-2">
      <ul className="flex flex-col">
        {items.map((item, i) => {
          const { icon: Icon, label } = TYPE_META[item.type];
          return (
            <li key={`${item.type}-${item.href}-${i}`}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent">
                  <Icon className="size-4 text-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
                <p className="shrink-0 text-xs text-muted-foreground">{timeAgo(item.date)}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
