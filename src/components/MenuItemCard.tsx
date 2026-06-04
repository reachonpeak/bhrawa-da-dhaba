"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Flame, Leaf, Sparkles, Award } from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "@/lib/menu";
import { useCart } from "@/lib/cart";
import { formatAUD } from "@/lib/utils";
import { getItemEmoji, getCategoryGradient } from "@/lib/menu-visuals";

export function MenuItemCard({
  item,
  index,
  categorySlug,
}: {
  item: MenuItem;
  index: number;
  categorySlug: string;
}) {
  const add = useCart((s) => s.add);
  const [variantIdx, setVariantIdx] = useState(0);

  const price = item.variants ? item.variants[variantIdx].price : item.price;
  const variantLabel = item.variants ? item.variants[variantIdx].label : undefined;
  const isSignature = item.tags?.includes("signature");
  const emoji = getItemEmoji(item.id, categorySlug);
  const gradient = getCategoryGradient(categorySlug);

  const handleAdd = () => {
    if (item.outOfStock) return;
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
      className="ornate-card group relative flex flex-col overflow-hidden p-5 shadow-sm transition hover:shadow-lg"
    >
      {/* Decorative top-right ornament */}
      <svg
        aria-hidden
        viewBox="0 0 60 60"
        className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 text-brand-gold/15 transition group-hover:text-brand-gold/30"
      >
        <path
          d="M30 0 L36 24 L60 30 L36 36 L30 60 L24 36 L0 30 L24 24 Z"
          fill="currentColor"
        />
      </svg>

      {/* Signature ribbon */}
      {isSignature && (
        <div className="absolute -left-8 top-3 z-10 rotate-[-32deg] bg-brand-gold px-8 py-0.5 text-[9px] font-bold uppercase tracking-widest text-brand-ink shadow-sm">
          ★ Chef&apos;s pick
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Dish visual */}
        <div className="relative shrink-0">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-3xl shadow-inner ring-2 ring-white/60`}
            aria-hidden
          >
            {item.image ? (
              <Image
                src={item.image}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <span className="drop-shadow-sm">{emoji}</span>
            )}
          </div>
          {item.outOfStock && (
            <span className="absolute -bottom-1 -right-1 rounded-full bg-brand-ink/80 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-brand-cream">
              Soon
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg leading-tight text-brand-ink">
              {item.name}
            </h3>
            <div className="font-display text-lg leading-tight text-brand-red whitespace-nowrap">
              {formatAUD(price)}
            </div>
          </div>
          {item.description && (
            <p className="mt-1.5 line-clamp-3 text-sm text-brand-ink/70">{item.description}</p>
          )}
        </div>
      </div>

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
              No Onion / Garlic
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full bg-green-700/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-green-800">
            <span className="inline-block h-2 w-2 rounded-sm border border-green-700"><span className="block h-full w-full scale-50 rounded-full bg-green-700" /></span>
            Veg
          </span>
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
          disabled={item.outOfStock}
          className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-ink py-2 text-sm font-medium text-brand-cream transition hover:bg-brand-red disabled:cursor-not-allowed disabled:bg-brand-ink/30 disabled:hover:bg-brand-ink/30"
        >
          {item.outOfStock ? (
            "Out of stock"
          ) : (
            <>
              <Plus className="h-4 w-4 transition group-hover/btn:rotate-90" />
              Add to thali
              {isSignature && <Award className="h-3.5 w-3.5 text-brand-gold" />}
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
