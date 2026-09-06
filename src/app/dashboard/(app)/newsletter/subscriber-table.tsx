"use client";

import { useMemo, useState, useTransition } from "react";
import { Search, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notify } from "@/components/ui/toast";
import { DeleteButton } from "../delete-button";
import {
  deleteNewsletterSubscriberAction,
  deleteNewsletterSubscribersAction,
} from "@/lib/actions/newsletter-actions";

type Subscriber = { id: string; email: string; createdAt: Date };

export function SubscriberTable({ subscribers }: { subscribers: Subscriber[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subscribers;
    return subscribers.filter((s) => s.email.toLowerCase().includes(q));
  }, [subscribers, query]);

  const allVisibleSelected = filtered.length > 0 && filtered.every((s) => selected.has(s.id));

  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        filtered.forEach((s) => next.delete(s.id));
      } else {
        filtered.forEach((s) => next.add(s.id));
      }
      return next;
    });
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const bulkDelete = () => {
    const ids = [...selected];
    if (
      !window.confirm(
        `Delete ${ids.length} subscriber${ids.length === 1 ? "" : "s"}? This can't be undone.`,
      )
    ) {
      return;
    }
    startTransition(async () => {
      const { deleted } = await deleteNewsletterSubscribersAction(ids);
      setSelected(new Set());
      notify.success(`Deleted ${deleted} subscriber${deleted === 1 ? "" : "s"}.`);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search email…"
            aria-label="Search subscribers"
            className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-9 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {selected.size > 0 && (
          <Button variant="destructive" size="sm" onClick={bulkDelete} disabled={pending}>
            <Trash2 className="size-4" />
            {pending ? "Deleting…" : `Delete ${selected.size} selected`}
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="w-10 p-4">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={toggleAll}
                  aria-label="Select all shown"
                  className="size-4 accent-foreground"
                />
              </th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Subscribed</th>
              <th className="p-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((subscriber) => (
              <tr key={subscriber.id} className="border-b last:border-0">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selected.has(subscriber.id)}
                    onChange={() => toggleOne(subscriber.id)}
                    aria-label={`Select ${subscriber.email}`}
                    className="size-4 accent-foreground"
                  />
                </td>
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
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  {subscribers.length === 0 ? "No subscribers yet." : "No matches."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
