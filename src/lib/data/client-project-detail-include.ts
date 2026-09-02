import "server-only";

// Shared between the token-based status page (src/lib/data/status-page.ts)
// and the session-based client portal (src/lib/data/client-portal.ts) so the
// two access paths can't quietly drift on which fields they return - only
// the *authorization* differs between them (token match vs. session-email
// ownership check), never the shape of what's shown.
export const clientProjectDetailInclude = {
  updates: { orderBy: { createdAt: "desc" as const } },
  comments: { orderBy: { createdAt: "desc" as const } },
  files: { orderBy: { createdAt: "desc" as const } },
};
