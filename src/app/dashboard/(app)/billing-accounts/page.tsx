import { getAllBillingAccountsForDashboard } from "@/lib/data/dashboard";
import { BillingAccountForm } from "./billing-account-form";

export default async function BillingAccountsPage() {
  const accounts = await getAllBillingAccountsForDashboard();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-foreground">Vahi billing accounts</h1>
      <BillingAccountForm />
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Accounts ({accounts.length})</h2>
        {accounts.length === 0 ? (
          <p className="rounded-xl border border-dashed bg-card/50 p-6 text-center text-sm text-muted-foreground">
            No Vahi accounts yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {accounts.map((account) => (
              <li key={account.id} className="flex items-center justify-between rounded-xl border bg-card p-4">
                <div>
                  <p className="font-medium text-foreground">{account.businessName}</p>
                  <p className="text-sm text-muted-foreground">{account.email}</p>
                </div>
                <span className="text-sm text-muted-foreground">{account._count.invoices} invoices</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
