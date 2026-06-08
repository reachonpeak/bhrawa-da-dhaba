import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { findItemAsync } from "@/lib/menu-store";
import { getSiteUrl } from "@/lib/url";

export const runtime = "nodejs";

type CartLineIn = { id: string; name: string; price: number; qty: number; variant?: string };

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY to your environment to enable checkout." },
      { status: 503 }
    );
  }

  const stripe = new Stripe(secret);

  const body = (await req.json()) as {
    lines: CartLineIn[];
    customer?: { name?: string; email?: string; phone?: string; pickupTime?: string; notes?: string };
  };

  if (!body.lines?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  // Validate prices against server-side menu to prevent tampering
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
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
    const qty = Math.max(1, Math.min(20, Math.floor(Number(l.qty)) || 1));
    line_items.push({
      quantity: qty,
      price_data: {
        currency: "aud",
        unit_amount: Math.round(unit * 100),
        product_data: {
          name: l.variant ? `${canonical.name} (${l.variant})` : canonical.name,
          description: canonical.description?.slice(0, 250),
        },
      },
    });
  }

  // Use a trusted, server-configured base URL — never the client-controlled
  // Origin header — to avoid open-redirect / phishing via the success page.
  const origin = getSiteUrl();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items,
    customer_email: body.customer?.email,
    phone_number_collection: { enabled: true },
    success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout?cancelled=1`,
    metadata: {
      pickupTime: body.customer?.pickupTime ?? "",
      notes: body.customer?.notes?.slice(0, 500) ?? "",
      customerName: body.customer?.name ?? "",
    },
    automatic_tax: { enabled: false },
  });

  return NextResponse.json({ url: session.url, id: session.id });
}
