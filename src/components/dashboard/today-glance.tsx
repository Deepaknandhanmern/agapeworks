import Link from "next/link";
import { Inbox, FilePlus, FolderPlus, UserPlus, PartyPopper } from "lucide-react";
import type { TodayGlance as TodayGlanceData } from "@/lib/data/dashboard";

const priorityStyles: Record<string, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-amber-500/10 text-amber-600",
  low: "bg-muted text-muted-foreground",
};

const quickActions = [
  { label: "New client project", href: "/dashboard/client-projects/new", icon: UserPlus },
  { label: "New blog post", href: "/dashboard/blog/new", icon: FilePlus },
  { label: "New project", href: "/dashboard/projects/new", icon: FolderPlus },
];

export function TodayGlance({ data }: { data: TodayGlanceData }) {
  const { topEnquiry, updatesThisWeekCount, recentUpdates } = data;

  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Today at a glance
      </h2>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        {/* Top priority lead */}
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Top priority lead</p>
          {topEnquiry ? (
            <Link
              href="/dashboard/enquiries"
              className="flex flex-col gap-2 rounded-xl border p-4 transition-colors hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <Inbox className="size-4 text-foreground" />
                <p className="font-medium text-foreground">{topEnquiry.name}</p>
                {topEnquiry.priority && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase ${priorityStyles[topEnquiry.priority] ?? priorityStyles.low}`}
                  >
                    {topEnquiry.priority}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{topEnquiry.service}</p>
              {topEnquiry.aiSummary && (
                <p className="text-sm italic text-muted-foreground">&ldquo;{topEnquiry.aiSummary}&rdquo;</p>
              )}
            </Link>
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
              <PartyPopper className="size-4" />
              You&apos;re all caught up - no new enquiries.
            </div>
          )}
        </div>

        {/* This week's shipped updates */}
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Shipped this week ({updatesThisWeekCount})
          </p>
          {recentUpdates.length === 0 ? (
            <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
              No client updates posted this week yet.
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {recentUpdates.map((update, i) => (
                <li key={i}>
                  <Link
                    href={`/dashboard/client-projects/${update.projectId}`}
                    className="flex flex-col gap-0.5 rounded-lg border p-3 text-sm transition-colors hover:bg-accent"
                  >
                    <span className="font-medium text-foreground">{update.title}</span>
                    <span className="text-xs text-muted-foreground">{update.projectName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* One-click actions */}
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Quick actions</p>
          <div className="flex flex-col gap-2">
            {quickActions.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 rounded-lg border p-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
