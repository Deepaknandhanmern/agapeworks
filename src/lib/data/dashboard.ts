import "server-only";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";

/** All admin-only reads live here — every export re-verifies auth itself. */

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const PRIORITY_RANK: Record<string, number> = { high: 0, medium: 1, low: 2 };

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun ... 6 = Sat
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diffToMonday);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Monday-aligned start dates for the last `n` weeks, oldest first. */
function lastNWeekStarts(n: number): Date[] {
  const currentWeekStart = getWeekStart(new Date());
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() - (n - 1 - i) * 7);
    return d;
  });
}

/** Count of `dates` falling in each week bucket (last bucket has no upper bound). */
function bucketByWeek(dates: Date[], weekStarts: Date[]): number[] {
  const counts = new Array(weekStarts.length).fill(0);
  for (const date of dates) {
    for (let i = weekStarts.length - 1; i >= 0; i--) {
      if (date >= weekStarts[i]) {
        counts[i]++;
        break;
      }
    }
  }
  return counts;
}

export type StatTrend = {
  total: number;
  deltaThisWeek: number;
  trend: number[];
};

export async function getOverviewStats() {
  await requireAuth();
  const weekStarts = lastNWeekStarts(8);

  const [posts, projects, enquiries, newEnquiries] = await Promise.all([
    db.blogPost.findMany({ select: { createdAt: true } }),
    db.project.findMany({ select: { createdAt: true } }),
    db.enquiry.findMany({ select: { createdAt: true } }),
    db.enquiry.count({ where: { status: "new" } }),
  ]);

  const toStat = (rows: { createdAt: Date }[]): StatTrend => {
    const trend = bucketByWeek(
      rows.map((r) => r.createdAt),
      weekStarts,
    );
    return { total: rows.length, deltaThisWeek: trend[trend.length - 1], trend };
  };

  return {
    posts: toStat(posts),
    projects: toStat(projects),
    enquiries: toStat(enquiries),
    newEnquiries,
  };
}

export type EnquiryWeekBucket = {
  label: string;
  high: number;
  medium: number;
  low: number;
  untriaged: number;
};

/** Weekly enquiry volume, split by AI-triaged priority — powers the Overview chart. */
export async function getEnquiryVolumeByWeek(weeks = 8): Promise<EnquiryWeekBucket[]> {
  await requireAuth();
  const weekStarts = lastNWeekStarts(weeks);
  const enquiries = await db.enquiry.findMany({ select: { createdAt: true, priority: true } });

  return weekStarts.map((start, i) => {
    const end = i < weekStarts.length - 1 ? weekStarts[i + 1] : new Date(start.getTime() + WEEK_MS);
    const inWeek = enquiries.filter((e) => e.createdAt >= start && e.createdAt < end);

    return {
      label: start.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      high: inWeek.filter((e) => e.priority === "high").length,
      medium: inWeek.filter((e) => e.priority === "medium").length,
      low: inWeek.filter((e) => e.priority === "low").length,
      untriaged: inWeek.filter((e) => !e.priority).length,
    };
  });
}

export type TodayGlance = {
  topEnquiry: {
    id: string;
    name: string;
    service: string;
    priority: string | null;
    aiSummary: string | null;
  } | null;
  updatesThisWeekCount: number;
  recentUpdates: { projectName: string; projectId: string; title: string; createdAt: Date }[];
};

/** Powers the "Today at a glance" panel at the top of the Overview page. */
export async function getTodayAtAGlance(): Promise<TodayGlance> {
  await requireAuth();
  const weekAgo = new Date(Date.now() - WEEK_MS);

  const [newEnquiries, recentUpdates] = await Promise.all([
    db.enquiry.findMany({
      where: { status: "new" },
      select: { id: true, name: true, service: true, priority: true, aiSummary: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    }),
    db.projectUpdate.findMany({
      where: { createdAt: { gte: weekAgo } },
      include: { clientProject: { select: { projectName: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const topEnquiry = [...newEnquiries].sort((a, b) => {
    const rankA = a.priority ? (PRIORITY_RANK[a.priority] ?? 3) : 3;
    const rankB = b.priority ? (PRIORITY_RANK[b.priority] ?? 3) : 3;
    return rankA - rankB;
  })[0];

  return {
    topEnquiry: topEnquiry
      ? {
          id: topEnquiry.id,
          name: topEnquiry.name,
          service: topEnquiry.service,
          priority: topEnquiry.priority,
          aiSummary: topEnquiry.aiSummary,
        }
      : null,
    updatesThisWeekCount: recentUpdates.length,
    recentUpdates: recentUpdates.slice(0, 3).map((u) => ({
      projectName: u.clientProject.projectName,
      projectId: u.clientProjectId,
      title: u.title,
      createdAt: u.createdAt,
    })),
  };
}

export type ActivityItem = {
  type: "post" | "project" | "enquiry";
  title: string;
  date: Date;
  href: string;
};

/** Latest posts, projects, and enquiries merged into one feed for the Overview page. */
export async function getRecentActivity(limit = 8): Promise<ActivityItem[]> {
  await requireAuth();
  const perSource = limit;

  const [posts, projects, enquiries] = await Promise.all([
    db.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      take: perSource,
      select: { id: true, title: true, createdAt: true },
    }),
    db.project.findMany({
      orderBy: { createdAt: "desc" },
      take: perSource,
      select: { id: true, name: true, createdAt: true },
    }),
    db.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: perSource,
      select: { id: true, name: true, service: true, createdAt: true },
    }),
  ]);

  const items: ActivityItem[] = [
    ...posts.map((p) => ({
      type: "post" as const,
      title: p.title,
      date: p.createdAt,
      href: `/dashboard/blog/${p.id}`,
    })),
    ...projects.map((p) => ({
      type: "project" as const,
      title: p.name,
      date: p.createdAt,
      href: `/dashboard/projects/${p.id}`,
    })),
    ...enquiries.map((e) => ({
      type: "enquiry" as const,
      title: `${e.name} — ${e.service}`,
      date: e.createdAt,
      href: `/dashboard/enquiries`,
    })),
  ];

  return items.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, limit);
}

export async function getAllBlogPostsForDashboard() {
  await requireAuth();
  return db.blogPost.findMany({ orderBy: { date: "desc" } });
}

export async function getBlogPostByIdForDashboard(id: string) {
  await requireAuth();
  return db.blogPost.findUnique({ where: { id } });
}

export async function getAllProjectsForDashboard() {
  await requireAuth();
  return db.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
}

export async function getProjectByIdForDashboard(id: string) {
  await requireAuth();
  return db.project.findUnique({ where: { id } });
}

export async function getAllClientProjectsForDashboard() {
  await requireAuth();
  return db.clientProject.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getClientProjectByIdForDashboard(id: string) {
  await requireAuth();
  return db.clientProject.findUnique({
    where: { id },
    include: {
      updates: { orderBy: { createdAt: "desc" } },
      comments: { orderBy: { createdAt: "desc" } },
      files: { orderBy: { createdAt: "desc" } },
    },
  });
}

export async function getAllBillingAccountsForDashboard() {
  await requireAuth();
  return db.billingAccount.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { invoices: true } } },
  });
}

export async function getAllEnquiriesForDashboard() {
  await requireAuth();
  const enquiries = await db.enquiry.findMany({ orderBy: { createdAt: "desc" } });

  // Highest-priority (AI-triaged) leads first; untriaged enquiries (priority
  // still null — triage failed or hasn't run) sort after everything, newest
  // first within each group via the createdAt desc above.
  return [...enquiries].sort((a, b) => {
    const rankA = a.priority ? PRIORITY_RANK[a.priority] ?? 3 : 3;
    const rankB = b.priority ? PRIORITY_RANK[b.priority] ?? 3 : 3;
    return rankA - rankB;
  });
}
