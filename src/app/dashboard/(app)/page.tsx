import { getOverviewStats, getEnquiryVolumeByWeek, getRecentActivity } from "@/lib/data/dashboard";
import { StatTile } from "@/components/dashboard/stat-tile";
import { EnquiryVolumeChart } from "@/components/dashboard/enquiry-volume-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Newspaper, FolderKanban, Inbox } from "lucide-react";

export default async function DashboardOverviewPage() {
  const [stats, enquiryVolume, activity] = await Promise.all([
    getOverviewStats(),
    getEnquiryVolumeByWeek(),
    getRecentActivity(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="mb-6 text-2xl font-semibold text-foreground">Overview</h1>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatTile label="Blog posts" href="/dashboard/blog" icon={Newspaper} stat={stats.posts} />
          <StatTile label="Projects" href="/dashboard/projects" icon={FolderKanban} stat={stats.projects} />
          <StatTile
            label="Enquiries"
            href="/dashboard/enquiries"
            icon={Inbox}
            stat={stats.enquiries}
            badge={stats.newEnquiries > 0 ? `${stats.newEnquiries} new` : undefined}
          />
        </div>
      </div>

      <EnquiryVolumeChart data={enquiryVolume} />

      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Recent activity</h2>
        <RecentActivity items={activity} />
      </div>
    </div>
  );
}
