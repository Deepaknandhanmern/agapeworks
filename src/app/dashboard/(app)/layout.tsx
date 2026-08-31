import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isAuthenticated } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/dashboard/command-palette";
import { NotificationsToaster } from "@/components/ui/toast";
import { LayoutDashboard, Newspaper, FolderKanban, Inbox, Users, Receipt, Mail } from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Blog", href: "/dashboard/blog", icon: Newspaper },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Client projects", href: "/dashboard/client-projects", icon: Users },
  { label: "Enquiries", href: "/dashboard/enquiries", icon: Inbox },
  { label: "Newsletter", href: "/dashboard/newsletter", icon: Mail },
  { label: "Vahi accounts", href: "/dashboard/billing-accounts", icon: Receipt },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Defense in depth: proxy.ts already redirects unauthenticated requests,
  // but this layout re-checks so nothing here ever renders without it.
  if (!(await isAuthenticated())) {
    redirect("/dashboard/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <CommandPalette />
      <NotificationsToaster />
      <aside className="flex w-60 shrink-0 flex-col border-r bg-card">
        <div className="border-b p-4">
          <Link href="/">
            <Image src="/logo-black.png" alt="Agape Works" width={181} height={32} className="h-7 w-auto" />
          </Link>
        </div>
        <div className="px-4 pt-3">
          <p className="rounded-md border border-dashed px-2 py-1.5 text-center text-xs text-muted-foreground">
            Press <kbd className="rounded border bg-muted px-1 font-mono">⌘K</kbd> to jump anywhere
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="border-t p-3">
          <Button variant="outline" className="w-full" type="submit">
            Log out
          </Button>
        </form>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
