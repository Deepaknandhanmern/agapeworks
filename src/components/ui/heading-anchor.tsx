"use client";

import * as React from "react";
import { Check, Link2 } from "lucide-react";

/**
 * The "#" affordance beside an MDX heading. Clicking it copies the full
 * deep link and updates the address bar, so a reader can cite a specific
 * section rather than the whole post.
 *
 * Still a real <a href="#slug">, so it works (and is keyboard-reachable)
 * even if the clipboard write is refused - Safari private mode and any
 * non-secure context will reject it.
 */
export function HeadingAnchor({ slug }: { slug: string }) {
  const [copied, setCopied] = React.useState(false);

  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    history.replaceState(null, "", `#${slug}`);
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable - the hash navigation above still happened.
    }
  };

  return (
    <a
      href={`#${slug}`}
      onClick={onClick}
      aria-label={copied ? "Link copied" : "Copy link to this section"}
      className="ml-2 inline-flex translate-y-[-1px] align-middle text-muted-foreground opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
    >
      {copied ? (
        <Check className="size-4 text-emerald-500" />
      ) : (
        <Link2 className="size-4" />
      )}
    </a>
  );
}
