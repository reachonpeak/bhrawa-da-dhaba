import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin";
import { createItem, slugify } from "@/lib/menu-store";
import { isSafeImageUrl } from "@/lib/utils";
import type { MenuItem, Tag } from "@/lib/menu";

export const runtime = "nodejs";

const ALLOWED_TAGS: Tag[] = ["spicy", "seasonal", "nog", "signature"];

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as {
    categorySlug?: string;
    name?: string;
    id?: string;
    description?: string;
    price?: number | string;
    variants?: { label: string; price: number | string }[];
    tags?: string[];
    image?: string;
    outOfStock?: boolean;
  };
  if (!body.categorySlug) return NextResponse.json({ error: "categorySlug is required" }, { status: 400 });
  if (!body.name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  const price = Number(body.price);
  if (!Number.isFinite(price) || price < 0) {
    return NextResponse.json({ error: "Price must be a non-negative number" }, { status: 400 });
  }
  const image = body.image?.trim() || undefined;
  if (image && !isSafeImageUrl(image)) {
    return NextResponse.json({ error: "Image must be an http(s) URL or a site path" }, { status: 400 });
  }
  const variants = body.variants
    ?.filter((v) => v?.label && v.price !== "" && v.price != null)
    .map((v) => ({ label: String(v.label).slice(0, 40), price: Number(v.price) }))
    .filter((v) => Number.isFinite(v.price) && v.price >= 0);
  const tags = (body.tags ?? []).filter((t): t is Tag => ALLOWED_TAGS.includes(t as Tag));
  const id = (body.id?.trim() || slugify(body.name)).toLowerCase();
  const item: MenuItem = {
    id,
    name: body.name.trim().slice(0, 120),
    description: body.description?.trim().slice(0, 500) || undefined,
    price,
    variants: variants && variants.length ? variants : undefined,
    tags: tags.length ? tags : undefined,
    image,
    outOfStock: !!body.outOfStock,
  };
  try {
    const created = await createItem(body.categorySlug, item);
    return NextResponse.json(created);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed" }, { status: 400 });
  }
}
