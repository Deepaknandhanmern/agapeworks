"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { setAvailabilityStatusAction } from "@/lib/actions/site-settings-actions";
import { AVAILABILITY_COPY, type AvailabilityStatus } from "@/lib/availability";

const OPTIONS: AvailabilityStatus[] = ["open", "limited", "booked"];

export function AvailabilityToggle({ current }: { current: AvailabilityStatus }) {
  const [selected, setSelected] = useState(current);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((status) => (
          <button
            key={status}
            type="button"
            disabled={pending}
            onClick={() => {
              setSelected(status);
              startTransition(() => {
                setAvailabilityStatusAction(status);
              });
            }}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              selected === status
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-background text-foreground hover:bg-accent"
            )}
          >
            {AVAILABILITY_COPY[status].badge}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Homepage hero currently shows: <span className="font-medium text-foreground">&ldquo;{AVAILABILITY_COPY[selected].text}&rdquo;</span>
      </p>
    </div>
  );
}
