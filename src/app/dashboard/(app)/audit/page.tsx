import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";

const actionStyles: Record<string, string> = {
  create: "bg-emerald-500/10 text-emerald-600",
  update: "bg-amber-500/10 text-amber-600",
  delete: "bg-destructive/10 text-destructive",
};

export default async function AuditPage() {
  await requireAuth();

  // Capped rather than paginated: this is a low-volume trail on a
  // single-admin dashboard, and 200 entries covers a long way back.
  const entries = await db.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Audit log</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Destructive and state-changing dashboard actions, newest first. Showing the last{" "}
          {entries.length} entries.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="p-4 font-medium">When</th>
              <th className="p-4 font-medium">Action</th>
              <th className="p-4 font-medium">Entity</th>
              <th className="p-4 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-b last:border-0">
                <td className="whitespace-nowrap p-4 text-muted-foreground">
                  {entry.createdAt.toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      actionStyles[entry.action] ?? "bg-muted text-muted-foreground"
                    }`}
                  >
                    {entry.action}
                  </span>
                </td>
                <td className="p-4 text-foreground">{entry.entity}</td>
                <td className="p-4 text-muted-foreground">
                  {entry.summary ?? entry.entityId ?? "-"}
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  Nothing logged yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
