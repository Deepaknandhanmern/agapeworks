import { db } from "@/lib/db";

export type Project = {
  id: string;
  name: string;
  url: string | null;
  description: string;
  /**
   * Set when the live site blocks iframe embedding (X-Frame-Options/CSP).
   * A static screenshot is shown instead of a live iframe preview.
   */
  screenshot?: string | null;
};

export async function getProjects(): Promise<Project[]> {
  return db.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: { id: true, name: true, url: true, description: true, screenshot: true },
  });
}
