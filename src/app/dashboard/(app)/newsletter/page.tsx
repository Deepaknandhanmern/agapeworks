import { getAllNewsletterSubscribersForDashboard } from "@/lib/data/dashboard";
import { deleteNewsletterSubscriberAction } from "@/lib/actions/newsletter-actions";
import { DeleteButton } from "../delete-button";

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

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Subscribed</th>
              <th className="p-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="border-b last:border-0">
                <td className="p-4 font-medium text-foreground">{subscriber.email}</td>
                <td className="p-4 text-muted-foreground">
                  {subscriber.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="p-4 text-right">
                  <DeleteButton
                    action={deleteNewsletterSubscriberAction.bind(null, subscriber.id)}
                    label={subscriber.email}
                  />
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-muted-foreground">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
