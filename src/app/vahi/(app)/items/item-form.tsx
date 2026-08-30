"use client";

import { useActionState, useEffect, useRef } from "react";
import { createItemAction } from "@/lib/vahi/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ItemForm() {
  const [state, formAction, pending] = useActionState(createItemAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending && !state?.error) formRef.current?.reset();
    wasPending.current = pending;
  }, [pending, state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4 rounded-xl border bg-card p-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="name">Item / service name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="rate">Rate (₹)</Label>
          <Input id="rate" name="rate" type="number" step="0.01" min="0" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="taxRate">GST rate (%)</Label>
          <Input id="taxRate" name="taxRate" type="number" step="0.01" min="0" max="100" defaultValue={18} />
        </div>
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={pending} className="w-fit">
        {pending ? "Adding..." : "Add item"}
      </Button>
    </form>
  );
}
