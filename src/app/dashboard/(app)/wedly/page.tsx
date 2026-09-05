import { getAllWedlyWaitlistSignupsForDashboard } from "@/lib/data/dashboard";
import { deleteWedlyWaitlistSignupAction } from "@/lib/actions/wedly-dashboard-actions";
import { DeleteButton } from "../delete-button";

export default async function WedlyWaitlistPage() {
  const signups = await getAllWedlyWaitlistSignupsForDashboard();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Wedly waitlist</h1>
        {signups.length > 0 && (
          <a
            href="/api/wedly-waitlist/export"
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
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Signed up</th>
              <th className="p-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {signups.map((signup) => (
              <tr key={signup.id} className="border-b last:border-0">
                <td className="p-4 font-medium text-foreground">{signup.email}</td>
                <td className="p-4 text-muted-foreground">{signup.name || "-"}</td>
                <td className="p-4 text-muted-foreground">
                  {signup.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="p-4 text-right">
                  <DeleteButton
                    action={deleteWedlyWaitlistSignupAction.bind(null, signup.id)}
                    label={signup.email}
                  />
                </td>
              </tr>
            ))}
            {signups.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  No signups yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
