import "server-only";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";

/** All admin-only reads live here — every export re-verifies auth itself. */

export async function getDashboardCounts() {
  await requireAuth();
  const [posts, projects, newEnquiries] = await Promise.all([
    db.blogPost.count(),
    db.project.count(),
    db.enquiry.count({ where: { status: "new" } }),
  ]);
  return { posts, projects, newEnquiries };
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

export async function getAllEnquiriesForDashboard() {
  await requireAuth();
  return db.enquiry.findMany({ orderBy: { createdAt: "desc" } });
}
