"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { signatureDishes } from "@/lib/menu";
import { formatAUD } from "@/lib/utils";
import { getItemEmoji, getCategoryGradient } from "@/lib/menu-visuals";

export function SignatureDishes() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Crowd favourites</p>
        <h2 className="mt-2 font-display text-4xl text-brand-ink sm:text-5xl">
          Signature dishes
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-ink/70">
          The plates our regulars order on repeat — and the dishes our chef would
          serve a guest at home.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {signatureDishes.map((d, i) => {
          const emoji = getItemEmoji(d.id, d.categorySlug);
          const gradient = getCategoryGradient(d.categorySlug);
          return (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="ornate-card group relative overflow-hidden p-6"
            >
              {/* Soft category-tinted glow */}
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${gradient} opacity-40 blur-2xl transition group-hover:opacity-60`}
                aria-hidden
              />
              <div className="relative flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-3xl shadow-inner ring-2 ring-white/60`}
                  aria-hidden
                >
                  {emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-brand-gold-dark">
                    <Sparkles className="h-3 w-3" />
                    {d.category}
                  </div>
                  <h3 className="mt-1 font-display text-xl text-brand-red">{d.name}</h3>
                </div>
              </div>
              {d.description && (
                <p className="mt-3 text-sm text-brand-ink/70">{d.description}</p>
              )}
              <div className="mt-4 flex items-center justify-between border-t border-brand-gold/20 pt-3">
                <span className="font-display text-lg text-brand-ink">{formatAUD(d.price)}</span>
                <Link
                  href="/menu"
                  className="text-xs font-semibold uppercase tracking-wider text-brand-red hover:underline"
                >
                  Order →
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
