import { getVahiItems } from "@/lib/vahi/data";
import { formatINR } from "@/lib/vahi/invoice-math";
import { ItemForm } from "./item-form";

export default async function VahiItemsPage() {
  const items = await getVahiItems();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-foreground">Items</h1>
      <ItemForm />
      <div>
        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed bg-card/50 p-6 text-center text-sm text-muted-foreground">
            No items yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between rounded-xl border bg-card p-4">
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatINR(item.rate)} · {item.taxRate}% GST
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
