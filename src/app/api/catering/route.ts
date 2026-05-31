import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { business } from "@/lib/business";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const data = (await req.json()) as Record<string, string>;
  const { name, email, phone, eventDate, guests, eventType, message } = data;

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.log("Catering enquiry (no Resend configured):", data);
    return NextResponse.json({ ok: true, queued: false });
  }

  const resend = new Resend(resendKey);
  const from = `${business.name} <catering@${process.env.RESEND_DOMAIN ?? "resend.dev"}>`;

  await resend.emails.send({
    from,
    to: [business.email],
    replyTo: email,
    subject: `Catering enquiry — ${name} (${guests || "?"} guests)`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px">
        <h2 style="color:#C8102E">New catering enquiry</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Event date</strong></td><td>${eventDate || "—"}</td></tr>
          <tr><td><strong>Guests</strong></td><td>${guests || "—"}</td></tr>
          <tr><td><strong>Event type</strong></td><td>${eventType || "—"}</td></tr>
        </table>
        <h3 style="margin-top:16px">Message</h3>
        <p style="white-space:pre-wrap">${message || "(none)"}</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
