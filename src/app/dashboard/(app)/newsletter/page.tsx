import { getAllNewsletterSubscribersForDashboard } from "@/lib/data/dashboard";
import { SubscriberTable } from "./subscriber-table";

export default async function NewsletterPage() {
  const subscribers = await getAllNewsletterSubscribersForDashboard();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Newsletter</h1>
        {subscribers.length > 0 && (
          <a
            href="/api/newsletter/export"
            className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
          >
            Export CSV
          </a>
        )}
      </div>

      <SubscriberTable subscribers={subscribers} />
    </div>
  );
}
