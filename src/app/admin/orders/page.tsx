import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin";
import { fetchRecentOrders } from "@/lib/square-orders";
import { formatAUD } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { orders, error } = await fetchRecentOrders(100);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-brand-red">Orders</h1>
          <p className="text-sm text-brand-ink/70">
            Most recent {orders.length} orders ({process.env.SQUARE_ENVIRONMENT ?? "sandbox"})
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-brand-red/40 bg-brand-red/10 p-3 text-sm text-brand-red">{error}</div>
      )}

      <div className="ornate-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-gold/10 text-left text-xs uppercase tracking-wider text-brand-ink/70">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">State</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && !error && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-brand-ink/60">No orders yet.</td>
                </tr>
              )}
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-brand-gold/20 align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-brand-ink/80">
                    {o.createdAt ? new Date(o.createdAt).toLocaleString("en-AU", { timeZone: "Australia/Melbourne" }) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-brand-ink">{o.customerName || "—"}</div>
                    {o.pickupTime && <div className="text-xs text-brand-ink/60">Pickup: {o.pickupTime}</div>}
                    {o.deliveryAddress && <div className="text-xs text-brand-ink/60">{o.deliveryAddress}</div>}
                    {o.notes && <div className="text-xs text-brand-ink/60 italic">“{o.notes}”</div>}
                  </td>
                  <td className="px-4 py-3 capitalize">{o.mode || "—"}</td>
                  <td className="px-4 py-3">
                    <ul className="space-y-0.5">
                      {o.items.map((it, i) => (
                        <li key={i} className="text-xs text-brand-ink/80">
                          {it.qty}× {it.name} <span className="text-brand-ink/50">{formatAUD(it.total)}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap">{formatAUD(o.total)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                        o.state === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : o.state === "OPEN"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-brand-ink/10 text-brand-ink/70"
                      }`}
                    >
                      {o.state ?? "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
