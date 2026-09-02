"use client";

import { trackEvent } from "@/lib/analytics";

export function ViviraDownloadButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      download
      onClick={() => trackEvent("vivira_download", { platform: "wordpress" })}
      className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      Download for WordPress
    </a>
  );
}
