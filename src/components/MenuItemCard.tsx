"use client";

import { motion } from "framer-motion";
import { Plus, Flame, Leaf, Sparkles } from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "@/lib/menu";
import { useCart } from "@/lib/cart";
import { formatAUD } from "@/lib/utils";

export function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  const add = useCart((s) => s.add);
  const [variantIdx, setVariantIdx] = useState(0);

  const price = item.variants ? item.variants[variantIdx].price : item.price;
  const variantLabel = item.variants ? item.variants[variantIdx].label : undefined;

  const handleAdd = () => {
    const id = item.variants ? `${item.id}-${item.variants[variantIdx].label}` : item.id;
    add({
      id,
      name: item.name,
      price,
      variant: variantLabel,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
      whileHover={{ y: -3 }}
      className="ornate-card group relative flex flex-col p-5 shadow-sm transition hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg leading-tight text-brand-ink">
          {item.name}
        </h3>
        <div className="text-right">
          <div className="font-display text-lg text-brand-red">
            {formatAUD(price)}
          </div>
        </div>
      </div>

      {item.description && (
        <p className="mt-2 text-sm text-brand-ink/70">{item.description}</p>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.includes("spicy") && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-red/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-brand-red">
              <Flame className="h-3 w-3" /> Spicy
            </span>
          )}
          {item.tags.includes("seasonal") && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-teal/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-brand-teal">
              <Leaf className="h-3 w-3" /> Seasonal
            </span>
          )}
          {item.tags.includes("signature") && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-gold/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-brand-gold-dark">
              <Sparkles className="h-3 w-3" /> Signature
            </span>
          )}
          {item.tags.includes("nog") && (
            <span className="rounded-full bg-brand-ink/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-brand-ink/70">
              No Onion/Garlic
            </span>
          )}
        </div>
      )}

      {/* Variant selector */}
      {item.variants && (
        <div className="mt-3 flex gap-1.5">
          {item.variants.map((v, i) => (
            <button
              key={v.label}
              onClick={() => setVariantIdx(i)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                i === variantIdx
                  ? "border-brand-red bg-brand-red text-brand-cream"
                  : "border-brand-gold/40 bg-white/60 text-brand-ink hover:bg-brand-gold/10"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-auto pt-4">
        <button
          onClick={handleAdd}
          className="group/btn flex w-full items-center justify-center gap-2 rounded-full bg-brand-ink py-2 text-sm font-medium text-brand-cream transition hover:bg-brand-red"
        >
          <Plus className="h-4 w-4 transition group-hover/btn:rotate-90" />
          Add to thali
        </button>
      </div>
    </motion.article>
  );
}
