import "server-only";
import { db } from "@/lib/db";

/**
 * Public reads for the no-login client status page — deliberately no
 * requireAuth() here. Access is gated by knowing the unguessable
 * statusToken, not a session; never widen this to list/search by anything
 * else (name, email) or it stops being a capability URL.
 */
export async function getClientProjectByToken(statusToken: string) {
  return db.clientProject.findUnique({
    where: { statusToken },
    include: {
      updates: { orderBy: { createdAt: "desc" } },
      comments: { orderBy: { createdAt: "desc" } },
      files: { orderBy: { createdAt: "desc" } },
    },
  });
}

export async function addStatusPageComment(statusToken: string, authorName: string, message: string) {
  const project = await db.clientProject.findUnique({ where: { statusToken }, select: { id: true } });
  if (!project) return null;

  return db.projectComment.create({
    data: { clientProjectId: project.id, authorName, message },
  });
}
