import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import { randomUUID } from "crypto";
import { findItemAsync } from "@/lib/menu-store";
import { getSiteUrl } from "@/lib/url";

export const runtime = "nodejs";

type CartLineIn = { id: string; name: string; price: number; qty: number; variant?: string };

type AddressIn = {
  line1?: string;
  line2?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  country?: string;
};

type CustomerIn = {
  name?: string;
  email?: string;
  phone?: string;
  pickupTime?: string;
  notes?: string;
  mode?: "pickup" | "delivery";
  address?: AddressIn;
};

let cachedLocationId: string | null = null;

async function resolveLocationId(client: SquareClient): Promise<string> {
  if (process.env.SQUARE_LOCATION_ID) return process.env.SQUARE_LOCATION_ID;
  if (cachedLocationId) return cachedLocationId;
  const res = await client.locations.list();
  const loc = res.locations?.find((l) => l.status === "ACTIVE") ?? res.locations?.[0];
  if (!loc?.id) throw new Error("No Square location available for this account");
  cachedLocationId = loc.id;
  return loc.id;
}

export async function POST(req: NextRequest) {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Square is not configured. Add SQUARE_ACCESS_TOKEN to your environment." },
      { status: 503 }
    );
  }

  const envName = (process.env.SQUARE_ENVIRONMENT ?? "sandbox").toLowerCase();
  const client = new SquareClient({
    token,
    environment: envName === "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
  });

  const body = (await req.json()) as { lines: CartLineIn[]; customer?: CustomerIn };
  if (!body.lines?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const cust = body.customer ?? {};
  const isDelivery = cust.mode === "delivery";

  if (isDelivery) {
    const a = cust.address;
    if (!a?.line1 || !a.suburb || !a.state || !a.postcode || !/^\d{4}$/.test(a.postcode)) {
      return NextResponse.json({ error: "Complete Australian delivery address is required." }, { status: 400 });
    }
  }

  const currency = (process.env.SQUARE_CURRENCY ?? "AUD") as "AUD" | "USD" | "CAD" | "GBP" | "EUR";

  const lineItems = [];
  for (const l of body.lines) {
    const baseId = l.id.includes("-1 pc") || l.id.includes("-2 pc")
      ? l.id.replace(/-(1|2) pc$/, "")
      : l.id;
    const canonical = await findItemAsync(baseId);
    if (!canonical) {
      return NextResponse.json({ error: `Unknown item: ${l.id}` }, { status: 400 });
    }
    if (canonical.outOfStock) {
      return NextResponse.json({ error: `${canonical.name} is out of stock` }, { status: 400 });
    }
    let unit = canonical.price;
    if (canonical.variants && l.variant) {
      const v = canonical.variants.find((x) => x.label === l.variant);
      if (v) unit = v.price;
    }
    const qty = Math.max(1, Math.min(20, l.qty));
    lineItems.push({
      name: l.variant ? `${canonical.name} (${l.variant})` : canonical.name,
      quantity: String(qty),
      basePriceMoney: {
        amount: BigInt(Math.round(unit * 100)),
        currency,
      },
    });
  }

  // Trusted, server-configured base URL (not the client Origin header).
  const origin = getSiteUrl();

  const metadata: Record<string, string> = {
    mode: isDelivery ? "delivery" : "pickup",
    customerName: (cust.name ?? "").slice(0, 255),
    pickupTime: (cust.pickupTime ?? "").slice(0, 255),
    notes: (cust.notes ?? "").slice(0, 255),
  };
  if (isDelivery && cust.address) {
    metadata.deliveryAddress = [
      cust.address.line1,
      cust.address.line2,
      `${cust.address.suburb} ${cust.address.state} ${cust.address.postcode}`,
      "Australia",
    ]
      .filter(Boolean)
      .join(", ")
      .slice(0, 255);
  }

  try {
    const locationId = await resolveLocationId(client);

    const fulfillments = isDelivery && cust.address
      ? [
          {
            type: "SHIPMENT" as const,
            shipmentDetails: {
              recipient: {
                displayName: cust.name,
                emailAddress: cust.email,
                phoneNumber: cust.phone,
                address: {
                  addressLine1: cust.address.line1,
                  addressLine2: cust.address.line2 || undefined,
                  locality: cust.address.suburb,
                  administrativeDistrictLevel1: cust.address.state,
                  postalCode: cust.address.postcode,
                  country: "AU" as const,
                },
              },
            },
          },
        ]
      : [
          {
            type: "PICKUP" as const,
            pickupDetails: {
              recipient: {
                displayName: cust.name,
                emailAddress: cust.email,
                phoneNumber: cust.phone,
              },
              note: cust.pickupTime ? `Requested pickup: ${cust.pickupTime}` : undefined,
            },
          },
        ];

    const result = await client.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      order: {
        locationId,
        lineItems,
        metadata,
        fulfillments,
      },
      checkoutOptions: {
        redirectUrl: `${origin}/order/success?provider=square`,
        askForShippingAddress: false,
        acceptedPaymentMethods: {
          applePay: true,
          googlePay: true,
          cashAppPay: false,
          afterpayClearpay: false,
        },
      },
      // NOTE: Square forbids setting prePopulatedData.buyerEmail together with
      // order.fulfillments — the fulfilment recipient already carries email,
      // phone and (for delivery) the address, so we leave prePopulatedData off.
    });

    const url = result.paymentLink?.url;
    const id = result.paymentLink?.id;
    if (!url) {
      return NextResponse.json({ error: "Square did not return a payment URL" }, { status: 502 });
    }
    return NextResponse.json({ url, id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Square checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
