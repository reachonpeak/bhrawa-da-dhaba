import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin";
import { deleteCategoryBySlug, reorderCategory, updateCategory } from "@/lib/menu-store";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await ctx.params;
  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    subtitle?: string;
    move?: "up" | "down";
  };
  try {
    if (body.move === "up" || body.move === "down") {
      await reorderCategory(slug, body.move);
    }
    if (body.title !== undefined || body.subtitle !== undefined) {
      await updateCategory(slug, {
        title: body.title?.slice(0, 80),
        subtitle: body.subtitle?.slice(0, 160),
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed" }, { status: 400 });
  }
}

export async function DELETE(_: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await ctx.params;
  await deleteCategoryBySlug(slug);
  return NextResponse.json({ ok: true });
}
