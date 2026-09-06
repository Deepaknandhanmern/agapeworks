"use client";

import * as React from "react";
import Link from "next/link";

/**
 * Small footer line naming the most recently updated portfolio project.
 * Renders nothing at all until the fetch resolves (and stays nothing if it
 * fails or there are no projects) - a decorative line is never worth a
 * layout shift or an error state in the footer.
 */
export function CurrentlyBuilding() {
  const [name, setName] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    fetch("/api/currently-building")
      .then((res) => (res.ok ? res.json() : null))
      .then((json: { name?: string | null } | null) => {
        if (!cancelled && json?.name) setName(json.name);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  if (!name) return null;

  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      Currently shipping:{" "}
      <Link href="/portfolio" className="font-medium text-foreground transition-colors hover:text-primary">
        {name}
      </Link>
    </p>
  );
}
