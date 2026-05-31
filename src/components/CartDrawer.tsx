"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatAUD } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, close, lines, inc, dec, remove, subtotal } = useCart();
  const gst = subtotal() / 11; // GST-inclusive in AU
  const total = subtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-brand-ink/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-brand-cream-soft shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-brand-gold/30 px-5 py-4">
              <div>
                <div className="font-display text-xl text-brand-red">
                  Your Thali
                </div>
                <div className="text-xs text-brand-ink/60">
                  {lines.length} {lines.length === 1 ? "item" : "items"}
                </div>
              </div>
              <button
                onClick={close}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-brand-gold/15"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <div className="text-5xl">🍛</div>
                    <p className="mt-3 text-brand-ink/70">
                      Your thali is empty. Pick a dish from the menu.
                    </p>
                    <Link
                      href="/menu"
                      onClick={close}
                      className="mt-4 inline-block rounded-full bg-brand-red px-5 py-2 text-sm font-medium text-brand-cream hover:bg-brand-red-dark"
                    >
                      Browse menu
                    </Link>
                  </div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {lines.map((l) => (
                    <motion.li
                      key={l.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="ornate-card flex items-center gap-3 p-3"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-brand-ink">
                          {l.name}
                        </div>
                        {l.variant && (
                          <div className="text-xs text-brand-ink/60">
                            {l.variant}
                          </div>
                        )}
                        <div className="mt-0.5 text-sm text-brand-red font-semibold">
                          {formatAUD(l.price)}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => dec(l.id)}
                          className="grid h-7 w-7 place-items-center rounded-full border border-brand-gold/40 hover:bg-brand-gold/10"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {l.qty}
                        </span>
                        <button
                          onClick={() => inc(l.id)}
                          className="grid h-7 w-7 place-items-center rounded-full border border-brand-gold/40 hover:bg-brand-gold/10"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => remove(l.id)}
                          className="ml-1 grid h-7 w-7 place-items-center rounded-full text-brand-red hover:bg-brand-red/10"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-brand-gold/30 bg-white/40 px-5 py-4">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-brand-ink/70">
                    <span>Subtotal</span>
                    <span>{formatAUD(total - gst)}</span>
                  </div>
                  <div className="flex justify-between text-brand-ink/70">
                    <span>GST (10%)</span>
                    <span>{formatAUD(gst)}</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-brand-gold/20 pt-2 text-base font-semibold text-brand-ink">
                    <span>Total</span>
                    <span>{formatAUD(total)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  onClick={close}
                  className="mt-4 block rounded-full bg-brand-red py-3 text-center font-medium text-brand-cream shadow-md transition hover:bg-brand-red-dark"
                >
                  Checkout · {formatAUD(total)}
                </Link>
                <p className="mt-2 text-center text-xs text-brand-ink/50">
                  Pickup from {`23 Boomerang Pl, Seven Hills`}
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
