"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { MenuItemCard } from "@/components/MenuItemCard";
import type { MenuCategory } from "@/lib/menu";
import { categoryEmoji, getCategoryGradient } from "@/lib/menu-visuals";

export function MenuTabs({ categories }: { categories: MenuCategory[] }) {
  const searchParams = useSearchParams();
  const initial =
    categories.find((c) => c.slug === searchParams.get("cat"))?.slug ?? categories[0].slug;
  const [active, setActive] = useState(initial);
  // Honour later ?cat= changes (e.g. when navigating between menu links)
  useEffect(() => {
    const fromQuery = searchParams.get("cat");
    if (fromQuery && categories.some((c) => c.slug === fromQuery) && fromQuery !== active) {
      setActive(fromQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const [query, setQuery] = useState("");
  const cat = categories.find((c) => c.slug === active)!;

  const q = query.trim().toLowerCase();

  const isSearching = q.length > 0;

  // When searching, show matches across all categories grouped by category.
  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return categories
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            (i.description ?? "").toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [categories, q, isSearching]);

  const totalMatches = searchResults.reduce((n, c) => n + c.items.length, 0);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      {/* Search bar */}
      <div className="mx-auto -mt-4 mb-6 flex max-w-xl items-center gap-2 rounded-full border border-brand-gold/40 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
        <Search className="h-4 w-4 text-brand-ink/50" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dishes — paneer, paratha, lassi…"
          className="w-full bg-transparent text-sm text-brand-ink placeholder:text-brand-ink/40 outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="rounded-full p-1 text-brand-ink/50 hover:bg-brand-gold/10"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Tab strip — hidden while searching */}
      {!isSearching && (
        <div className="sticky top-[72px] z-20 -mx-4 mb-8 overflow-x-auto bg-brand-cream-soft/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex min-w-max gap-2">
            {categories.map((c) => {
              const isActive = c.slug === active;
              return (
                <button
                  key={c.slug}
                  onClick={() => setActive(c.slug)}
                  className="relative rounded-full px-4 py-2 text-sm font-medium transition"
                  style={{ color: isActive ? "#FBEFD0" : "#2A1810" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="menu-tab-pill"
                      className="absolute inset-0 rounded-full bg-brand-red shadow-md"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <span aria-hidden>{categoryEmoji[c.slug] ?? "🍛"}</span>
                    <span>{c.title}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                        isActive
                          ? "bg-brand-cream/20 text-brand-cream"
                          : "bg-brand-ink/10 text-brand-ink/70"
                      }`}
                    >
                      {c.items.length}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isSearching ? (
        <>
          <p className="mb-6 text-center text-sm text-brand-ink/70">
            {totalMatches === 0
              ? "No dishes match — try another word."
              : `${totalMatches} ${totalMatches === 1 ? "dish" : "dishes"} match “${query}”`}
          </p>
          <div className="space-y-10">
            {searchResults.map((c) => (
              <div key={c.slug}>
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-2xl" aria-hidden>{categoryEmoji[c.slug] ?? "🍛"}</span>
                  <h2 className="font-display text-2xl text-brand-red">{c.title}</h2>
                  <span className="rounded-full bg-brand-ink/10 px-2 py-0.5 text-xs text-brand-ink/70">
                    {c.items.length}
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {c.items.map((item, i) => (
                    <MenuItemCard key={item.id} item={item} index={i} categorySlug={c.slug} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Category header */}
          <div className="relative mb-8 overflow-hidden rounded-3xl border border-brand-gold/30 bg-gradient-to-r from-brand-cream to-white p-6 text-center sm:p-8">
            <div
              className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${getCategoryGradient(cat.slug)} opacity-40 blur-2xl`}
            />
            <div
              className={`pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-gradient-to-br ${getCategoryGradient(cat.slug)} opacity-30 blur-2xl`}
            />
            <div className="relative flex flex-col items-center">
              <div
                className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${getCategoryGradient(cat.slug)} text-4xl shadow-md ring-4 ring-white`}
              >
                <span aria-hidden>{categoryEmoji[cat.slug] ?? "🍛"}</span>
              </div>
              <h2 className="font-display text-3xl text-brand-red sm:text-4xl">{cat.title}</h2>
              {cat.subtitle && (
                <p className="mt-1 max-w-xl text-sm text-brand-ink/60">{cat.subtitle}</p>
              )}
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs text-brand-ink/70 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                {cat.items.length} dishes · 100% vegetarian
              </div>
            </div>
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
                <MenuItemCard key={item.id} item={item} index={i} categorySlug={cat.slug} />
              ))}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </section>
  );
}
