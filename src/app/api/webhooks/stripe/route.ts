import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { business } from "@/lib/business";
import { escapeHtml } from "@/lib/utils";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const resendKey = process.env.RESEND_API_KEY;

  if (!secret || !webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const stripe = new Stripe(secret);
  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig!, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 50 });

    const customerEmail = session.customer_details?.email ?? session.customer_email;
    const customerName = session.customer_details?.name ?? session.metadata?.customerName ?? "";
    const customerPhone = session.customer_details?.phone ?? "";
    const pickupTime = session.metadata?.pickupTime ?? "ASAP";
    const notes = session.metadata?.notes ?? "";
    const total = ((session.amount_total ?? 0) / 100).toFixed(2);

    const itemRows = lineItems.data
      .map((li) => `<tr><td>${escapeHtml(li.description ?? "")}</td><td style="text-align:center">${li.quantity}</td><td style="text-align:right">A$${((li.amount_total ?? 0) / 100).toFixed(2)}</td></tr>`)
      .join("");

    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#2A1810">
        <div style="background:#C8102E;color:#FBEFD0;padding:24px;text-align:center">
          <h1 style="margin:0;font-size:24px">${business.name}</h1>
          <p style="margin:4px 0 0;font-size:12px;letter-spacing:2px">PURE VEGETARIAN · PUNJABI DHABA</p>
        </div>
        <div style="background:#FFF8E7;padding:24px;border:1px solid #E0A82E33;border-top:none">
          <h2 style="color:#C8102E">Order confirmed — thank you!</h2>
          <p>Hi ${escapeHtml(customerName) || "there"}, your order is in. We'll have it ready for pickup at <strong>${escapeHtml(pickupTime)}</strong>.</p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <thead><tr style="border-bottom:1px solid #E0A82E"><th align="left">Item</th><th>Qty</th><th align="right">Total</th></tr></thead>
            <tbody>${itemRows}</tbody>
            <tfoot><tr><td colspan="2" align="right" style="padding-top:12px"><strong>Total</strong></td><td align="right" style="padding-top:12px"><strong>A$${total}</strong></td></tr></tfoot>
          </table>
          ${notes ? `<p style="margin-top:16px"><strong>Notes:</strong> ${escapeHtml(notes)}</p>` : ""}
          <hr style="border:none;border-top:1px dashed #E0A82E;margin:20px 0">
          <p style="font-size:14px"><strong>Pickup address</strong><br>${business.address.full}</p>
          <p style="font-size:14px"><strong>Phone</strong>: ${business.phone.display}</p>
          <p style="font-size:12px;color:#2A1810AA">Show this email at pickup. See you soon!</p>
        </div>
      </div>
    `;

    if (resendKey) {
      const resend = new Resend(resendKey);
      const from = `${business.name} <orders@${process.env.RESEND_DOMAIN ?? "resend.dev"}>`;
      const recipients: string[] = [business.email];
      if (customerEmail) recipients.push(customerEmail);

      try {
        await resend.emails.send({
          from,
          to: recipients,
          subject: `New order — A$${total} · ${customerName || "Guest"}`,
          html: html + `<div style="padding:16px 24px;background:#FBEFD0;font-size:12px"><strong>Customer:</strong> ${escapeHtml(customerName)} · ${escapeHtml(customerPhone)} · ${escapeHtml(customerEmail)}</div>`,
        });
      } catch (err) {
        console.error("Resend email failed", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
