"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { business } from "@/lib/business";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "Our Story" },
  { href: "/catering", label: "Catering" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.count());
  const openCart = useCart((s) => s.open);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-gold/30 bg-brand-cream-soft/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group" aria-label={business.name}>
          <motion.div
            whileHover={{ rotate: -3, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative h-14 w-16 sm:h-16 sm:w-20"
          >
            <Image
              src="/images/logo.png"
              alt={business.name}
              fill
              priority
              sizes="80px"
              className="object-contain drop-shadow-sm"
            />
          </motion.div>
          <div className="leading-tight sm:hidden">
            <div className="font-display text-base text-brand-red">
              Bharawan Daa Dhaba
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-brand-ink/80 transition hover:text-brand-red"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${business.phone.tel}`}
            className="hidden items-center gap-2 rounded-full border border-brand-gold/40 bg-white/60 px-3 py-1.5 text-xs font-medium text-brand-ink hover:bg-brand-gold/10 sm:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            {business.phone.display}
          </a>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-brand-red text-brand-cream shadow-sm transition hover:bg-brand-red-dark"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-brand-gold text-[10px] font-bold text-brand-ink ring-2 ring-brand-cream-soft"
              >
                {count}
              </motion.span>
            )}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-gold/40 bg-white/60 text-brand-ink md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        className={cn("overflow-hidden border-t border-brand-gold/20 md:hidden")}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-brand-ink hover:bg-brand-gold/10"
            >
              {n.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
