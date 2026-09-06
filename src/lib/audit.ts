import "server-only";
import { db } from "@/lib/db";

/**
 * Appends an entry to the admin audit trail.
 *
 * Best-effort by design: an audit write must never be the reason a real
 * dashboard action fails. A dropped log line is bad; a delete that errors
 * out halfway because logging broke is worse.
 *
 * `actor` is hardcoded until there's more than one admin account - the
 * column exists so that change doesn't need a migration later.
 */
export async function recordAudit(input: {
  action: "create" | "update" | "delete";
  entity: string;
  entityId?: string | null;
  summary?: string | null;
}): Promise<void> {
  try {
    await db.auditLog.create({
      data: {
        action: input.action,
        entity: input.entity,
        entityId: input.entityId ?? null,
        summary: input.summary ?? null,
      },
    });
  } catch {
    // Swallowed deliberately - see the note above.
  }
}
