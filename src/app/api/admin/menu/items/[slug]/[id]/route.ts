import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin";
import { deleteItem, reorderItem, updateItem } from "@/lib/menu-store";
import type { Tag } from "@/lib/menu";

export const runtime = "nodejs";

const ALLOWED_TAGS: Tag[] = ["spicy", "seasonal", "nog", "signature"];

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string; id: string }> }
) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug, id } = await ctx.params;
  const body = (await req.json().catch(() => ({}))) as {
    name?: string;
    description?: string;
    price?: number | string;
    variants?: { label: string; price: number | string }[];
    tags?: string[];
    image?: string;
    outOfStock?: boolean;
    move?: "up" | "down";
  };
  try {
    if (body.move === "up" || body.move === "down") {
      await reorderItem(slug, id, body.move);
    }
    const patch: Record<string, unknown> = {};
    if (body.name !== undefined) patch.name = body.name.trim();
    if (body.description !== undefined) patch.description = body.description.trim() || undefined;
    if (body.price !== undefined) {
      const p = Number(body.price);
      if (!Number.isFinite(p) || p < 0) return NextResponse.json({ error: "Bad price" }, { status: 400 });
      patch.price = p;
    }
    if (body.variants !== undefined) {
      const variants = body.variants
        ?.filter((v) => v?.label && v.price !== "" && v.price != null)
        .map((v) => ({ label: String(v.label).slice(0, 40), price: Number(v.price) }))
        .filter((v) => Number.isFinite(v.price) && v.price >= 0);
      patch.variants = variants && variants.length ? variants : undefined;
    }
    if (body.tags !== undefined) {
      const tags = (body.tags ?? []).filter((t): t is Tag => ALLOWED_TAGS.includes(t as Tag));
      patch.tags = tags.length ? tags : undefined;
    }
    if (body.image !== undefined) patch.image = body.image.trim() || undefined;
    if (body.outOfStock !== undefined) patch.outOfStock = !!body.outOfStock;
    if (Object.keys(patch).length) {
      await updateItem(slug, id, patch);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed" }, { status: 400 });
  }
}

export async function DELETE(
  _: NextRequest,
  ctx: { params: Promise<{ slug: string; id: string }> }
) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug, id } = await ctx.params;
  await deleteItem(slug, id);
  return NextResponse.json({ ok: true });
}
