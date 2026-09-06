"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Users,
  Wrench,
  FolderKanban,
  Newspaper,
  Package,
  Mail,
  Briefcase,
  FileText,
  Handshake,
  Calculator,
  ScrollText,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";

type Entry = { label: string; href: string; icon: React.ComponentType<{ className?: string }> };

// Mirrors the real site nav - every destination here is a page that exists.
const PAGES: Entry[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Wrench },
  { label: "Portfolio", href: "/portfolio", icon: FolderKanban },
  { label: "Case studies", href: "/case-studies", icon: Briefcase },
  { label: "Products - Vivira", href: "/products", icon: Package },
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "About", href: "/about", icon: Users },
  { label: "Careers", href: "/careers", icon: FileText },
  { label: "Partner program", href: "/partner-program", icon: Handshake },
  { label: "Contact", href: "/contact", icon: Mail },
];

const TOOLS: Entry[] = [
  { label: "Get an instant estimate", href: "/scope", icon: Calculator },
  { label: "Privacy policy", href: "/privacy", icon: ScrollText },
  { label: "Terms of service", href: "/terms", icon: ScrollText },
];

/**
 * Public-site ⌘K palette. Same cmdk primitives as the dashboard's palette
 * (src/components/dashboard/command-palette.tsx), but a separate component:
 * that one is auth-only and includes sign-out and admin routes.
 *
 * Code-split via ClientWidgets, so the cmdk bundle only loads after the
 * page is interactive rather than blocking first paint.
 */
export function SiteCommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // The authenticated apps mount their own ⌘K palettes; binding this one
  // there too would mean two listeners fighting over the same shortcut.
  const isAppRoute =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/vahi") ||
    pathname?.startsWith("/client");

  React.useEffect(() => {
    if (isAppRoute) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isAppRoute]);

  if (isAppRoute) return null;

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Pages">
          {PAGES.map((item) => (
            <CommandItem key={item.href} onSelect={() => go(item.href)}>
              <item.icon className="size-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="More">
          {TOOLS.map((item) => (
            <CommandItem key={item.href} onSelect={() => go(item.href)}>
              <item.icon className="size-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      <div className="flex items-center justify-end border-t px-3 py-2">
        <CommandShortcut>⌘K / Ctrl+K to toggle</CommandShortcut>
      </div>
    </CommandDialog>
  );
}
