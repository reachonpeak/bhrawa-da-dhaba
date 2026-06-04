import "server-only";
import { SquareClient, SquareEnvironment } from "square";

export type AdminOrder = {
  id: string;
  createdAt?: string;
  state?: string;
  total: number;
  currency: string;
  mode: string;
  customerName: string;
  pickupTime: string;
  notes: string;
  deliveryAddress: string;
  items: { name: string; qty: string; total: number }[];
};

export function getSquareClient(): SquareClient | null {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  if (!token) return null;
  const envName = (process.env.SQUARE_ENVIRONMENT ?? "sandbox").toLowerCase();
  return new SquareClient({
    token,
    environment: envName === "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
  });
}

export async function fetchRecentOrders(limit = 50): Promise<{ orders: AdminOrder[]; error?: string }> {
  const client = getSquareClient();
  if (!client) return { orders: [], error: "SQUARE_ACCESS_TOKEN is not set" };
  try {
    const locs = await client.locations.list();
    const locationIds = (locs.locations ?? []).map((l) => l.id).filter((id): id is string => !!id);
    if (!locationIds.length) return { orders: [], error: "No Square locations available." };
    const result = await client.orders.search({
      locationIds,
      limit,
      query: { sort: { sortField: "CREATED_AT", sortOrder: "DESC" } },
    });
    const orders: AdminOrder[] = (result.orders ?? []).map((o) => {
      const meta = (o.metadata ?? {}) as Record<string, string>;
      const total = moneyToNumber(o.totalMoney?.amount);
      const items = (o.lineItems ?? []).map((li) => ({
        name: li.name ?? "Item",
        qty: li.quantity ?? "1",
        total: moneyToNumber(li.totalMoney?.amount),
      }));
      return {
        id: o.id ?? "",
        createdAt: o.createdAt,
        state: o.state,
        total,
        currency: o.totalMoney?.currency ?? "AUD",
        mode: meta.mode ?? "",
        customerName: meta.customerName ?? "",
        pickupTime: meta.pickupTime ?? "",
        notes: meta.notes ?? "",
        deliveryAddress: meta.deliveryAddress ?? "",
        items,
      };
    });
    return { orders };
  } catch (err) {
    return { orders: [], error: err instanceof Error ? err.message : "Failed to load orders" };
  }
}

function moneyToNumber(amount: bigint | number | null | undefined): number {
  if (typeof amount === "bigint") return Number(amount) / 100;
  if (typeof amount === "number") return amount / 100;
  return 0;
}
