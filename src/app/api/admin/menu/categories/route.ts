import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin";
import { createCategory, slugify } from "@/lib/menu-store";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    slug?: string;
    subtitle?: string;
  };
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const slug = (body.slug?.trim() || slugify(body.title)).toLowerCase();
  try {
    const created = await createCategory({
      slug,
      title: body.title.trim().slice(0, 80),
      subtitle: body.subtitle?.trim().slice(0, 160) || undefined,
    });
    return NextResponse.json(created);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create category" },
      { status: 400 }
    );
  }
}
