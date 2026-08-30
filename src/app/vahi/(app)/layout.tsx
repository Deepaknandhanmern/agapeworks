import Link from "next/link";
import { requireVahiAccount } from "@/lib/vahi/auth";
import { getVahiAccount } from "@/lib/vahi/data";
import { vahiLogoutAction } from "@/lib/vahi/actions";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Package, FileText } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/vahi", icon: LayoutDashboard },
  { label: "Invoices", href: "/vahi/invoices", icon: FileText },
  { label: "Customers", href: "/vahi/customers", icon: Users },
  { label: "Items", href: "/vahi/items", icon: Package },
];

export default async function VahiAppLayout({ children }: { children: React.ReactNode }) {
  // Defense in depth: proxy.ts already redirects unauthenticated requests,
  // but this layout re-checks so nothing here ever renders without it.
  await requireVahiAccount();
  const account = await getVahiAccount();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="flex w-60 shrink-0 flex-col border-r bg-card">
        <div className="border-b p-4">
          <p className="font-semibold text-foreground">Vahi</p>
          <p className="truncate text-xs text-muted-foreground">{account.businessName}</p>
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
        <form action={vahiLogoutAction} className="border-t p-3">
          <Button variant="outline" className="w-full" type="submit">
            Log out
          </Button>
        </form>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
