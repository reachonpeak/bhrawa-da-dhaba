import { NextRequest, NextResponse } from "next/server";
import { business } from "@/lib/business";
import { escapeHtml, isValidEmail } from "@/lib/utils";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { saveEnquiry } from "@/lib/enquiry-store";
import { getAdminFirestore } from "@/lib/firebase-admin";

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

  // Enqueue email in Firestore for Trigger Email extension (free, no Resend costs)
  const db = getAdminFirestore();
  const htmlPayload = `
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
  `;

  if (db) {
    try {
      await db.collection("mail").add({
        to: [business.email],
        replyTo: email,
        message: {
          subject: `Catering enquiry — ${name} (${guests || "?"} guests)`,
          html: htmlPayload,
        },
      });
    } catch (mailErr) {
      console.error("Failed to enqueue email in Firestore:", mailErr);
    }
  } else {
    console.log("Catering email enqueued (Firebase not configured):", {
      to: [business.email],
      replyTo: email,
      subject: `Catering enquiry — ${name} (${guests || "?"} guests)`,
    });
  }

  return NextResponse.json({ ok: true });
}
