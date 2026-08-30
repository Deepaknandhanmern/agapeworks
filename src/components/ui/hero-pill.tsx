import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroPillProps {
  href: string;
  label: string;
  announcement?: string;
  isExternal?: boolean;
  className?: string;
}

// A pill-shaped announcement badge: a small "announcement" tag + label +
// chevron, all wrapped in a single link. Animation/positioning is left to
// whatever renders this (see AnnouncementToast) so this stays a simple,
// reusable presentational primitive.
export function HeroPill({
  href,
  label,
  announcement = "📣 Announcement",
  isExternal = false,
  className,
}: HeroPillProps) {
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={`${announcement}: ${label}`}
      className={cn(
        "group flex items-center gap-2 rounded-full border bg-background/95 px-3 py-1.5 text-sm shadow-lg backdrop-blur-sm transition-colors hover:bg-accent",
        className
      )}
    >
      <span className="rounded-full bg-foreground px-2 py-0.5 text-xs font-medium text-background">
        {announcement}
      </span>
      <span className="text-foreground">{label}</span>
      <ChevronRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
