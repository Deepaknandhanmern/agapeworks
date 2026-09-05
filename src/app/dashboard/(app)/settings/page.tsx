import { getAvailabilityStatus } from "@/lib/data/site-settings";
import { AvailabilityToggle } from "./availability-toggle";

export default async function DashboardSettingsPage() {
  const availability = await getAvailabilityStatus();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-foreground">Settings</h1>

      <div className="max-w-xl rounded-xl border bg-card p-6">
        <h2 className="mb-1 text-lg font-semibold text-foreground">Availability status</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Controls the badge in the homepage hero - update it whenever your capacity actually
          changes instead of leaving a stale "Open" up.
        </p>
        <AvailabilityToggle current={availability} />
      </div>
    </div>
  );
}
