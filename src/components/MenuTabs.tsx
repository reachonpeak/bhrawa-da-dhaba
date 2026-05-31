"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItemCard } from "@/components/MenuItemCard";
import type { MenuCategory } from "@/lib/menu";

export function MenuTabs({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState(categories[0].slug);
  const cat = categories.find((c) => c.slug === active)!;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      {/* Tab strip */}
      <div className="sticky top-[72px] z-20 -mx-4 mb-8 overflow-x-auto bg-brand-cream-soft/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex min-w-max gap-2">
          {categories.map((c) => {
            const isActive = c.slug === active;
            return (
              <button
                key={c.slug}
                onClick={() => setActive(c.slug)}
                className="relative rounded-full px-4 py-2 text-sm font-medium transition"
                style={{
                  color: isActive ? "#FBEFD0" : "#2A1810",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="menu-tab-pill"
                    className="absolute inset-0 rounded-full bg-brand-red shadow-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{c.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category header */}
      <div className="mb-6 text-center">
        <h2 className="font-display text-3xl text-brand-red sm:text-4xl">
          {cat.title}
        </h2>
        {cat.subtitle && (
          <p className="mt-1 text-sm text-brand-ink/60">{cat.subtitle}</p>
        )}
      </div>

      {/* Items grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cat.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cat.items.map((item, i) => (
            <MenuItemCard key={item.id} item={item} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
