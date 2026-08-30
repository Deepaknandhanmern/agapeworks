"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  action,
  label,
}: {
  action: () => Promise<void>;
  label: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete "${label}"? This can't be undone.`)) {
          startTransition(() => {
            action();
          });
        }
      }}
    >
      {pending ? "Deleting..." : "Delete"}
    </Button>
  );
}
