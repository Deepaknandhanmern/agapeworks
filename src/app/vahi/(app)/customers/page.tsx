import { getVahiCustomers } from "@/lib/vahi/data";
import { CustomerForm } from "./customer-form";

export default async function VahiCustomersPage() {
  const customers = await getVahiCustomers();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-foreground">Customers</h1>
      <CustomerForm />
      <div>
        {customers.length === 0 ? (
          <p className="rounded-xl border border-dashed bg-card/50 p-6 text-center text-sm text-muted-foreground">
            No customers yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {customers.map((customer) => (
              <li key={customer.id} className="rounded-xl border bg-card p-4">
                <p className="font-medium text-foreground">{customer.name}</p>
                <p className="text-sm text-muted-foreground">
                  {[customer.phone, customer.email].filter(Boolean).join(" · ") || "No contact info"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
