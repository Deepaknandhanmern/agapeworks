"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  FolderKanban,
  Inbox,
  Users,
  FilePlus,
  FolderPlus,
  UserPlus,
  LogOut,
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
import { logoutAction } from "@/lib/actions/auth-actions";

type CommandEntry = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: (router: ReturnType<typeof useRouter>) => void;
};

const NAV_ITEMS: CommandEntry[] = [
  { label: "Overview", icon: LayoutDashboard, action: (r) => r.push("/dashboard") },
  { label: "Blog", icon: Newspaper, action: (r) => r.push("/dashboard/blog") },
  { label: "Projects", icon: FolderKanban, action: (r) => r.push("/dashboard/projects") },
  { label: "Client projects", icon: Users, action: (r) => r.push("/dashboard/client-projects") },
  { label: "Enquiries", icon: Inbox, action: (r) => r.push("/dashboard/enquiries") },
];

const ACTION_ITEMS: CommandEntry[] = [
  { label: "New blog post", icon: FilePlus, action: (r) => r.push("/dashboard/blog/new") },
  { label: "New project", icon: FolderPlus, action: (r) => r.push("/dashboard/projects/new") },
  {
    label: "New client project",
    icon: UserPlus,
    action: (r) => r.push("/dashboard/client-projects/new"),
  },
];

// Mounted once in the dashboard app layout - listens globally for ⌘K/Ctrl+K
// so it's reachable from every /dashboard/* page without per-page wiring.
export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = (entry: CommandEntry) => {
    setOpen(false);
    entry.action(router);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Jump to a page or run an action…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {NAV_ITEMS.map((item) => (
            <CommandItem key={item.label} onSelect={() => run(item)}>
              <item.icon className="size-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Actions">
          {ACTION_ITEMS.map((item) => (
            <CommandItem key={item.label} onSelect={() => run(item)}>
              <item.icon className="size-4" />
              {item.label}
            </CommandItem>
          ))}
          <CommandItem
            onSelect={() => {
              setOpen(false);
              logoutAction();
            }}
          >
            <LogOut className="size-4" />
            Sign out
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <div className="flex items-center justify-end border-t px-3 py-2">
        <CommandShortcut>⌘K / Ctrl+K to toggle</CommandShortcut>
      </div>
    </CommandDialog>
  );
}
