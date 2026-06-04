"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { formatAUD } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

export function StickyOrderCTA() {
  const pathname = usePathname();
  const { lines, subtotal } = useCart();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/checkout") || pathname?.startsWith("/order")) {
    return null;
  }
  const count = lines.reduce((n, l) => n + l.qty, 0);
  if (count === 0) {
    return (
      <Link
        href="/menu"
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-brand-cream shadow-xl ring-1 ring-black/10 hover:bg-brand-red-dark sm:hidden"
      >
        <ShoppingBag className="h-4 w-4" />
        Order online
      </Link>
    );
  }
  return (
    <Link
      href="/checkout"
      className="fixed bottom-4 left-4 right-4 z-40 inline-flex items-center justify-between gap-2 rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-brand-cream shadow-xl ring-1 ring-black/10 hover:bg-brand-red-dark sm:left-auto sm:right-4"
    >
      <span className="inline-flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-cream/20 text-xs">{count}</span>
        Checkout
      </span>
      <span>{formatAUD(subtotal())}</span>
    </Link>
  );
}
