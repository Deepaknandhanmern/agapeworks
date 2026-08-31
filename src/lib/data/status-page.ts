import "server-only";
import { db } from "@/lib/db";
import { clientProjectDetailInclude } from "./client-project-detail-include";

/**
 * Public reads for the no-login client status page — deliberately no
 * requireAuth() here. Access is gated by knowing the unguessable
 * statusToken, not a session; never widen this to list/search by anything
 * else (name, email) or it stops being a capability URL. (The session-based
 * equivalent lives in src/lib/data/client-portal.ts, on purpose separate.)
 */
export async function getClientProjectByToken(statusToken: string) {
  return db.clientProject.findUnique({
    where: { statusToken },
    include: clientProjectDetailInclude,
  });
}

export async function addStatusPageComment(statusToken: string, authorName: string, message: string) {
  const project = await db.clientProject.findUnique({ where: { statusToken }, select: { id: true, projectName: true } });
  if (!project) return null;

  const comment = await db.projectComment.create({
    data: { clientProjectId: project.id, authorName, message },
  });
  return { comment, clientProjectId: project.id, projectName: project.projectName };
}
