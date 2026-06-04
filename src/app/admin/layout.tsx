import Link from "next/link";
import { headers } from "next/headers";
import { isAdminAuthenticated } from "@/lib/admin";
import { LogoutButton } from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get("x-invoke-path") ?? h.get("next-url") ?? "";
  const onLogin = pathname.endsWith("/admin/login");
  const authed = await isAdminAuthenticated();

  if (onLogin || !authed) {
    return <div className="min-h-screen bg-brand-cream-soft">{children}</div>;
  }

  const links = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/orders", label: "Orders", icon: "📦" },
    { href: "/admin/menu", label: "Menu", icon: "🍽️" },
  ];

  return (
    <div className="min-h-screen bg-brand-cream-soft">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <aside className="lg:w-56 shrink-0">
          <div className="ornate-card p-4">
            <div className="mb-4 px-2">
              <p className="text-xs uppercase tracking-widest text-brand-ink/50">Admin</p>
              <p className="font-display text-xl text-brand-red">Bharawan Dhaba</p>
            </div>
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-ink hover:bg-brand-gold/15"
                >
                  <span>{l.icon}</span>
                  <span>{l.label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-4 border-t border-brand-gold/30 pt-3">
              <LogoutButton />
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
