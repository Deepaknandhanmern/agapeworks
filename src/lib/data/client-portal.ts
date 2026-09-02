import "server-only";
import { db } from "@/lib/db";
import { clientProjectDetailInclude } from "./client-project-detail-include";

// Session-based (email-owned) reads/writes for the client portal - kept
// separate from status-page.ts on purpose. That file is deliberately a pure
// capability URL (token-only, no search-by-anything-else); this one is the
// opposite shape (session-identity-only, no token), so they never merge.

/** Ownership check shared by every write below - null if the id doesn't exist or belongs to a different email. */
async function findOwnedProjectId(id: string, email: string): Promise<string | null> {
  const project = await db.clientProject.findFirst({
    where: { id, clientEmail: { equals: email, mode: "insensitive" } },
    select: { id: true },
  });
  return project?.id ?? null;
}

/**
 * List view for /client - includes just enough of each project's latest
 * activity (most recent update/file createdAt) to compute an unread
 * indicator against `clientLastViewedAt`, without pulling full detail.
 */
export function getClientProjectsByEmail(email: string) {
  return db.clientProject.findMany({
    where: { clientEmail: { equals: email, mode: "insensitive" } },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      projectName: true,
      clientName: true,
      phase: true,
      createdAt: true,
      clientLastViewedAt: true,
      updates: { orderBy: { createdAt: "desc" }, take: 1, select: { createdAt: true } },
      files: { orderBy: { createdAt: "desc" }, take: 1, select: { createdAt: true } },
    },
  });
}

/**
 * Ownership-checked in the query itself: returns null for both "doesn't
 * exist" and "belongs to a different email," so the caller can 404 either
 * way without leaking which one it was.
 */
export function getClientProjectForEmail(id: string, email: string) {
  return db.clientProject.findFirst({
    where: { id, clientEmail: { equals: email, mode: "insensitive" } },
    include: clientProjectDetailInclude,
  });
}

/** Called when a client opens /client/[id] - powers the unread indicator on /client. */
export async function markProjectViewed(id: string, email: string): Promise<void> {
  await db.clientProject.updateMany({
    where: { id, clientEmail: { equals: email, mode: "insensitive" } },
    data: { clientLastViewedAt: new Date() },
  });
}

export async function addCommentForClientOwnedProject(
  id: string,
  email: string,
  authorName: string,
  message: string,
) {
  const projectId = await findOwnedProjectId(id, email);
  if (!projectId) return null;

  const [comment, project] = await Promise.all([
    db.projectComment.create({ data: { clientProjectId: projectId, authorName, message } }),
    db.clientProject.findUnique({ where: { id: projectId }, select: { projectName: true } }),
  ]);

  return { comment, clientProjectId: projectId, projectName: project?.projectName ?? "" };
}

export async function addFileForClientOwnedProject(
  id: string,
  email: string,
  file: { fileName: string; storagePath: string; sizeBytes: number; contentType: string },
) {
  const projectId = await findOwnedProjectId(id, email);
  if (!projectId) return null;

  return db.projectFile.create({ data: { clientProjectId: projectId, ...file } });
}

/** Used by the login-link request action - existence check only, no data returned. */
export async function hasClientProjectForEmail(email: string): Promise<boolean> {
  const project = await db.clientProject.findFirst({
    where: { clientEmail: { equals: email, mode: "insensitive" } },
    select: { id: true },
  });
  return project !== null;
}
