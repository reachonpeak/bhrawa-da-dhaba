import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin";
import { getMenu } from "@/lib/menu-store";
import { MenuAdmin } from "./MenuAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const menu = await getMenu();
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl text-brand-red">Menu</h1>
        <p className="text-sm text-brand-ink/70">
          Add, edit, reorder or remove categories and dishes. Changes appear instantly on the public menu.
        </p>
      </div>
      <MenuAdmin initialMenu={menu} />
    </div>
  );
}
