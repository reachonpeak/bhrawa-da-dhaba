import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { business } from "@/lib/business";
import { escapeHtml, isValidEmail } from "@/lib/utils";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { saveEnquiry } from "@/lib/enquiry-store";

export const runtime = "nodejs";

const cap = (s: string | undefined, n: number) => (s ?? "").toString().slice(0, n);

export async function POST(req: NextRequest) {
  const { ok } = await checkRateLimit(`catering:${clientIp(req)}`, 5, 60);
  if (!ok) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const data = (await req.json().catch(() => ({}))) as Record<string, string>;
  const name = cap(data.name, 120).trim();
  const email = cap(data.email, 254).trim();
  const phone = cap(data.phone, 40).trim();
  const eventDate = cap(data.eventDate, 60).trim();
  const guests = cap(data.guests, 20).trim();
  const eventType = cap(data.eventType, 80).trim();
  const message = cap(data.message, 2000).trim();

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  // Save to database first so it is never lost
  try {
    await saveEnquiry({
      name,
      email,
      phone,
      eventDate,
      guests,
      eventType,
      message,
    });
  } catch (dbErr) {
    console.error("Failed to save catering enquiry to database:", dbErr);
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.log("Catering enquiry received (Resend not configured).");
    return NextResponse.json({ ok: true, queued: false });
  }

  const resend = new Resend(resendKey);
  const from = `${business.name} <catering@${process.env.RESEND_DOMAIN ?? "resend.dev"}>`;

  await resend.emails.send({
    from,
    to: [business.email],
    replyTo: email, // validated above (CRLF-rejected) — safe as a header value
    subject: `Catering enquiry — ${name} (${guests || "?"} guests)`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px">
        <h2 style="color:#C8102E">New catering enquiry</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Event date</strong></td><td>${escapeHtml(eventDate || "—")}</td></tr>
          <tr><td><strong>Guests</strong></td><td>${escapeHtml(guests || "—")}</td></tr>
          <tr><td><strong>Event type</strong></td><td>${escapeHtml(eventType || "—")}</td></tr>
        </table>
        <h3 style="margin-top:16px">Message</h3>
        <p style="white-space:pre-wrap">${escapeHtml(message || "(none)")}</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
