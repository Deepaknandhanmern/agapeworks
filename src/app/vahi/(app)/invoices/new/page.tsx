import { getVahiCustomers, getVahiItems } from "@/lib/vahi/data";
import { InvoiceForm } from "./invoice-form";

export default async function NewVahiInvoicePage() {
  const [customers, items] = await Promise.all([getVahiCustomers(), getVahiItems()]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">New invoice</h1>
      <InvoiceForm customers={customers} items={items} />
    </div>
  );
}
