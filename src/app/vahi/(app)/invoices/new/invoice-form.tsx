"use client";

import * as React from "react";
import { useActionState } from "react";
import { Trash2, Plus } from "lucide-react";
import { createInvoiceAction } from "@/lib/vahi/actions";
import { invoiceSubtotal, invoiceTax, invoiceGrandTotal, formatINR, type InvoiceLine } from "@/lib/vahi/invoice-math";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Customer = { id: string; name: string };
type CatalogItem = { id: string; name: string; rate: number; taxRate: number };

const emptyLine: InvoiceLine & { name: string } = { name: "", quantity: 1, rate: 0, taxRate: 18 };

export function InvoiceForm({ customers, items }: { customers: Customer[]; items: CatalogItem[] }) {
  const [state, formAction, pending] = useActionState(createInvoiceAction, undefined);
  const [customerId, setCustomerId] = React.useState("");
  const [lines, setLines] = React.useState<(InvoiceLine & { name: string })[]>([{ ...emptyLine }]);

  const updateLine = (i: number, patch: Partial<(typeof lines)[number]>) => {
    setLines((prev) => prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  };

  const applyCatalogItem = (i: number, itemId: string) => {
    const item = items.find((it) => it.id === itemId);
    if (!item) return;
    updateLine(i, { name: item.name, rate: item.rate, taxRate: item.taxRate });
  };

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="customerId" value={customerId} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>Customer</Label>
          <Select value={customerId} onValueChange={setCustomerId}>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Select a customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {customers.length === 0 && (
            <p className="text-xs text-muted-foreground">
              No customers yet — add one on the Customers page first.
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dueDate">Due date (optional)</Label>
          <Input id="dueDate" name="dueDate" type="date" />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label>Line items</Label>
          {items.length > 0 && (
            <p className="text-xs text-muted-foreground">Pick from your saved items or type a custom line</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {lines.map((line, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto] items-start gap-2 rounded-lg border bg-card p-3 sm:grid-cols-[2fr_1fr_1fr_1fr_auto]">
              <div className="flex flex-col gap-1.5">
                {items.length > 0 && (
                  <select
                    onChange={(e) => applyCatalogItem(i, e.target.value)}
                    defaultValue=""
                    className="h-8 rounded-md border bg-background px-2 text-xs text-muted-foreground"
                  >
                    <option value="" disabled>
                      Use saved item…
                    </option>
                    {items.map((it) => (
                      <option key={it.id} value={it.id}>
                        {it.name}
                      </option>
                    ))}
                  </select>
                )}
                <Input
                  placeholder="Description"
                  value={line.name}
                  onChange={(e) => updateLine(i, { name: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground sm:hidden">Qty</span>
                <Input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={line.quantity}
                  onChange={(e) => updateLine(i, { quantity: Number(e.target.value) })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground sm:hidden">Rate (₹)</span>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={line.rate}
                  onChange={(e) => updateLine(i, { rate: Number(e.target.value) })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground sm:hidden">GST %</span>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={line.taxRate}
                  onChange={(e) => updateLine(i, { taxRate: Number(e.target.value) })}
                />
              </div>
              <button
                type="button"
                onClick={() => setLines((prev) => prev.filter((_, idx) => idx !== i))}
                disabled={lines.length === 1}
                className="mt-1 text-muted-foreground hover:text-destructive disabled:opacity-30"
                aria-label="Remove line"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setLines((prev) => [...prev, { ...emptyLine }])}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
        >
          <Plus className="size-4" /> Add line
        </button>
      </div>

      <div className="ml-auto flex w-full max-w-xs flex-col gap-1.5 rounded-lg border bg-card p-4 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>{formatINR(invoiceSubtotal(lines))}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>GST</span>
          <span>{formatINR(invoiceTax(lines))}</span>
        </div>
        <div className="flex justify-between border-t pt-1.5 font-semibold text-foreground">
          <span>Total</span>
          <span>{formatINR(invoiceGrandTotal(lines))}</span>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea id="notes" name="notes" className="min-h-20 resize-none" />
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" disabled={pending || !customerId} className="w-fit">
        {pending ? "Creating..." : "Create invoice"}
      </Button>
    </form>
  );
}
