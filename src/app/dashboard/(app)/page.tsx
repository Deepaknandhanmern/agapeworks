import Link from "next/link";
import { getDashboardCounts } from "@/lib/data/dashboard";
import { Newspaper, FolderKanban, Inbox } from "lucide-react";

export default async function DashboardOverviewPage() {
  const counts = await getDashboardCounts();

  const cards = [
    { label: "Blog posts", value: counts.posts, href: "/dashboard/blog", icon: Newspaper },
    { label: "Projects", value: counts.projects, href: "/dashboard/projects", icon: FolderKanban },
    { label: "New enquiries", value: counts.newEnquiries, href: "/dashboard/enquiries", icon: Inbox },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-foreground">Overview</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col gap-3 rounded-xl border bg-card p-6 transition-colors hover:bg-accent"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-accent">
              <Icon className="size-5 text-foreground" />
            </div>
            <p className="text-3xl font-semibold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
