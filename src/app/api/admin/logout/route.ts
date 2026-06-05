import { NextResponse } from "next/server";
import { destroyAdminSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  // Revokes the session's refresh tokens and clears the cookie with the same
  // httpOnly/secure/sameSite flags it was set with.
  await destroyAdminSession();
  return NextResponse.json({ ok: true });
}
