import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin";
import { fetchRecentOrders } from "@/lib/square-orders";
import { getMenu } from "@/lib/menu-store";
import { formatAUD } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const [{ orders, error }, menu] = await Promise.all([fetchRecentOrders(100), getMenu()]);

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const todayOrders = orders.filter((o) => o.createdAt && new Date(o.createdAt).getTime() >= startOfToday);
  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0);
  const weekStart = startOfToday - 6 * 24 * 60 * 60 * 1000;
  const weekOrders = orders.filter((o) => o.createdAt && new Date(o.createdAt).getTime() >= weekStart);
  const weekRevenue = weekOrders.reduce((s, o) => s + o.total, 0);

  // Top dish in last 7 days
  const tally = new Map<string, { name: string; qty: number; revenue: number }>();
  for (const o of weekOrders) {
    for (const it of o.items) {
      const key = it.name;
      const prev = tally.get(key) ?? { name: it.name, qty: 0, revenue: 0 };
      prev.qty += Number(it.qty) || 1;
      prev.revenue += it.total;
      tally.set(key, prev);
    }
  }
  const top = [...tally.values()].sort((a, b) => b.qty - a.qty).slice(0, 5);

  const totalItems = menu.reduce((n, c) => n + c.items.length, 0);
  const outOfStock = menu.reduce((n, c) => n + c.items.filter((i) => i.outOfStock).length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-brand-red">Dashboard</h1>
        <p className="text-sm text-brand-ink/70">
          {process.env.SQUARE_ENVIRONMENT === "production" ? "Live mode" : "Sandbox mode"} ·{" "}
          {now.toLocaleString("en-AU", { timeZone: "Australia/Melbourne" })}
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-brand-red/40 bg-brand-red/10 p-3 text-sm text-brand-red">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Orders today" value={String(todayOrders.length)} sub={`${todayOrders.filter((o) => o.state === "COMPLETED").length} completed`} />
        <Stat label="Revenue today" value={formatAUD(todayRevenue)} sub="GST incl." />
        <Stat label="Last 7 days" value={formatAUD(weekRevenue)} sub={`${weekOrders.length} orders`} />
        <Stat label="Menu items" value={String(totalItems)} sub={outOfStock ? `${outOfStock} out of stock` : "All in stock"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="ornate-card p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-xl text-brand-ink">Top dishes · 7 days</h2>
            <Link href="/admin/menu" className="text-xs font-semibold uppercase tracking-wider text-brand-red hover:underline">
              Manage menu →
            </Link>
          </div>
          {top.length === 0 ? (
            <p className="text-sm text-brand-ink/60">No orders yet this week.</p>
          ) : (
            <ol className="space-y-2 text-sm">
              {top.map((t, i) => (
                <li key={t.name} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gold/20 text-xs font-bold text-brand-ink">
                      {i + 1}
                    </span>
                    <span className="text-brand-ink">{t.name}</span>
                  </span>
                  <span className="text-brand-ink/60">
                    {t.qty}× · {formatAUD(t.revenue)}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="ornate-card p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-xl text-brand-ink">Latest orders</h2>
            <Link href="/admin/orders" className="text-xs font-semibold uppercase tracking-wider text-brand-red hover:underline">
              View all →
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="text-sm text-brand-ink/60">No orders yet.</p>
          ) : (
            <ul className="divide-y divide-brand-gold/20 text-sm">
              {orders.slice(0, 6).map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate font-medium text-brand-ink">{o.customerName || "—"}</div>
                    <div className="text-xs text-brand-ink/60">
                      {o.createdAt ? new Date(o.createdAt).toLocaleTimeString("en-AU", { timeZone: "Australia/Melbourne" }) : ""} ·{" "}
                      {o.mode || "—"} · {o.items.length} item{o.items.length === 1 ? "" : "s"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatAUD(o.total)}</div>
                    <div className="text-[10px] uppercase tracking-wider text-brand-ink/50">{o.state ?? "—"}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="ornate-card p-5">
      <p className="text-xs uppercase tracking-wider text-brand-ink/60">{label}</p>
      <p className="mt-2 font-display text-3xl text-brand-red">{value}</p>
      {sub && <p className="mt-1 text-xs text-brand-ink/60">{sub}</p>}
    </div>
  );
}
