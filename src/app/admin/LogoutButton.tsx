"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.replace("/admin/login");
        router.refresh();
      }}
      className="rounded-full border border-brand-gold/40 px-4 py-1.5 text-xs font-medium text-brand-ink hover:bg-brand-gold/10"
    >
      Sign out
    </button>
  );
}
