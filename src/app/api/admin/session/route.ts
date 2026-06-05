import { NextRequest, NextResponse } from "next/server";
import { createAdminSession } from "@/lib/auth";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs"; // firebase-admin requires the Node.js runtime

export async function POST(req: NextRequest) {
  // Throttle sign-in attempts per IP.
  const { ok } = await checkRateLimit(`admin-session:${clientIp(req)}`, 5, 60);
  if (!ok) {
    return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  const body = (await req.json().catch(() => ({}))) as { idToken?: unknown };
  const result = await createAdminSession(body.idToken);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
