"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { MenuCategory, MenuItem, Tag } from "@/lib/menu";
import { formatAUD } from "@/lib/utils";

const ALL_TAGS: { value: Tag; label: string }[] = [
  { value: "signature", label: "Signature" },
  { value: "spicy", label: "Spicy" },
  { value: "seasonal", label: "Seasonal" },
  { value: "nog", label: "No Onion/Garlic" },
];

export function MenuAdmin({ initialMenu }: { initialMenu: MenuCategory[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [activeSlug, setActiveSlug] = useState(initialMenu[0]?.slug);
  const [editingItem, setEditingItem] = useState<{ slug: string; item?: MenuItem } | null>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null);
  const [error, setError] = useState<string | null>(null);

  const active = useMemo(() => initialMenu.find((c) => c.slug === activeSlug) ?? initialMenu[0], [initialMenu, activeSlug]);

  const refresh = () => start(() => router.refresh());

  async function call(url: string, init?: RequestInit) {
    setError(null);
    const res = await fetch(url, init);
    if (!res.ok) {
      let msg = "Request failed";
      try {
        const d = await res.json();
        msg = d.error ?? msg;
      } catch {}
      setError(msg);
      throw new Error(msg);
    }
    refresh();
    return res.json().catch(() => ({}));
  }

  const moveCategory = (slug: string, move: "up" | "down") =>
    call(`/api/admin/menu/categories/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ move }),
    }).catch(() => {});

  const deleteCategory = async (c: MenuCategory) => {
    if (!confirm(`Delete category “${c.title}” and all ${c.items.length} items?`)) return;
    await call(`/api/admin/menu/categories/${c.slug}`, { method: "DELETE" }).catch(() => {});
  };

  const moveItem = (slug: string, id: string, move: "up" | "down") =>
    call(`/api/admin/menu/items/${slug}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ move }),
    }).catch(() => {});

  const deleteItem = async (slug: string, item: MenuItem) => {
    if (!confirm(`Delete item “${item.name}”?`)) return;
    await call(`/api/admin/menu/items/${slug}/${item.id}`, { method: "DELETE" }).catch(() => {});
  };

  const toggleOutOfStock = (slug: string, item: MenuItem) =>
    call(`/api/admin/menu/items/${slug}/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ outOfStock: !item.outOfStock }),
    }).catch(() => {});

  if (!active) {
    return (
      <div className="ornate-card p-8 text-center">
        <p className="text-brand-ink/70">No categories yet.</p>
        <button
          onClick={() => setShowAddCategory(true)}
          className="mt-3 rounded-full bg-brand-red px-4 py-2 text-sm font-medium text-brand-cream hover:bg-brand-red-dark"
        >
          + Add your first category
        </button>
        {showAddCategory && <CategoryDialog onClose={() => setShowAddCategory(false)} call={call} />}
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[260px,1fr]">
      {error && (
        <div className="lg:col-span-2 rounded-md border border-brand-red/40 bg-brand-red/10 p-3 text-sm text-brand-red">
          {error}
        </div>
      )}

      {/* Category sidebar */}
      <aside className="ornate-card h-fit p-3">
        <div className="mb-2 flex items-center justify-between px-1">
          <h2 className="text-sm font-semibold text-brand-ink">Categories</h2>
          <button
            onClick={() => setShowAddCategory(true)}
            className="rounded-full bg-brand-red px-2 py-0.5 text-xs font-medium text-brand-cream hover:bg-brand-red-dark"
            title="Add category"
          >
            + Add
          </button>
        </div>
        <ul className="flex flex-col gap-1">
          {initialMenu.map((c, idx) => {
            const isActive = c.slug === active.slug;
            return (
              <li key={c.slug}>
                <div
                  className={`group flex items-center justify-between gap-1 rounded-lg px-2 py-1.5 ${
                    isActive ? "bg-brand-red text-brand-cream" : "text-brand-ink hover:bg-brand-gold/15"
                  }`}
                >
                  <button onClick={() => setActiveSlug(c.slug)} className="flex-1 truncate text-left text-sm">
                    {c.title}
                    <span className={`ml-1 text-xs ${isActive ? "text-brand-cream/70" : "text-brand-ink/50"}`}>
                      {c.items.length}
                    </span>
                  </button>
                  <div className="flex items-center gap-0.5 opacity-0 transition group-hover:opacity-100">
                    <IconButton title="Move up" disabled={idx === 0} onClick={() => moveCategory(c.slug, "up")}>↑</IconButton>
                    <IconButton title="Move down" disabled={idx === initialMenu.length - 1} onClick={() => moveCategory(c.slug, "down")}>↓</IconButton>
                    <IconButton title="Edit" onClick={() => setEditingCategory(c)}>✎</IconButton>
                    <IconButton title="Delete" onClick={() => deleteCategory(c)}>🗑</IconButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Items */}
      <section className="ornate-card p-4">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl text-brand-red">{active.title}</h2>
            {active.subtitle && <p className="text-xs text-brand-ink/60">{active.subtitle}</p>}
          </div>
          <button
            onClick={() => setEditingItem({ slug: active.slug })}
            className="rounded-full bg-brand-red px-3 py-1.5 text-sm font-medium text-brand-cream hover:bg-brand-red-dark"
          >
            + Add item
          </button>
        </div>

        {active.items.length === 0 ? (
          <p className="py-8 text-center text-sm text-brand-ink/60">No items in this category yet.</p>
        ) : (
          <ul className="divide-y divide-brand-gold/20">
            {active.items.map((it, idx) => (
              <li key={it.id} className="flex flex-wrap items-center gap-3 py-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-brand-ink">{it.name}</span>
                    {it.outOfStock && (
                      <span className="rounded-full bg-brand-ink/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-brand-ink/70">
                        Out of stock
                      </span>
                    )}
                    {it.tags?.includes("signature") && (
                      <span className="rounded-full bg-brand-gold/20 px-2 py-0.5 text-[10px] uppercase tracking-wider text-brand-gold-dark">
                        ★ Signature
                      </span>
                    )}
                  </div>
                  {it.description && <div className="line-clamp-1 text-xs text-brand-ink/60">{it.description}</div>}
                </div>
                <div className="text-sm text-brand-ink">
                  {it.variants?.length
                    ? `${formatAUD(it.variants[0].price)} – ${formatAUD(it.variants[it.variants.length - 1].price)}`
                    : formatAUD(it.price)}
                </div>
                <div className="flex items-center gap-1">
                  <IconButton title="Move up" disabled={idx === 0} onClick={() => moveItem(active.slug, it.id, "up")}>↑</IconButton>
                  <IconButton title="Move down" disabled={idx === active.items.length - 1} onClick={() => moveItem(active.slug, it.id, "down")}>↓</IconButton>
                  <IconButton title={it.outOfStock ? "Mark in stock" : "Mark out of stock"} onClick={() => toggleOutOfStock(active.slug, it)}>
                    {it.outOfStock ? "✅" : "🚫"}
                  </IconButton>
                  <IconButton title="Edit" onClick={() => setEditingItem({ slug: active.slug, item: it })}>✎</IconButton>
                  <IconButton title="Delete" onClick={() => deleteItem(active.slug, it)}>🗑</IconButton>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {showAddCategory && <CategoryDialog onClose={() => setShowAddCategory(false)} call={call} />}
      {editingCategory && (
        <CategoryDialog category={editingCategory} onClose={() => setEditingCategory(null)} call={call} />
      )}
      {editingItem && (
        <ItemDialog
          categorySlug={editingItem.slug}
          item={editingItem.item}
          onClose={() => setEditingItem(null)}
          call={call}
        />
      )}

      {pending && <div className="lg:col-span-2 text-center text-xs text-brand-ink/50">Saving…</div>}
    </div>
  );
}

function IconButton({
  children,
  onClick,
  title,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="rounded-md px-1.5 py-0.5 text-xs text-current/80 hover:bg-black/10 disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}

function CategoryDialog({
  category,
  onClose,
  call,
}: {
  category?: MenuCategory;
  onClose: () => void;
  call: (url: string, init?: RequestInit) => Promise<unknown>;
}) {
  const [title, setTitle] = useState(category?.title ?? "");
  const [subtitle, setSubtitle] = useState(category?.subtitle ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");

  const save = async () => {
    try {
      if (category) {
        await call(`/api/admin/menu/categories/${category.slug}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, subtitle }),
        });
      } else {
        await call(`/api/admin/menu/categories`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, subtitle, slug: slug || undefined }),
        });
      }
      onClose();
    } catch {}
  };

  return (
    <Modal onClose={onClose} title={category ? "Edit category" : "New category"}>
      <Field label="Title">
        <input className="ai-input" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
      </Field>
      <Field label="Subtitle">
        <input className="ai-input" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
      </Field>
      {!category && (
        <Field label="Slug (optional)">
          <input
            className="ai-input"
            value={slug}
            onChange={(e) => setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())}
            placeholder="auto-from-title"
          />
        </Field>
      )}
      <div className="mt-3 flex justify-end gap-2">
        <button onClick={onClose} className="rounded-full px-4 py-1.5 text-sm text-brand-ink hover:bg-brand-gold/10">
          Cancel
        </button>
        <button onClick={save} className="rounded-full bg-brand-red px-4 py-1.5 text-sm font-medium text-brand-cream hover:bg-brand-red-dark">
          Save
        </button>
      </div>
    </Modal>
  );
}

function ItemDialog({
  categorySlug,
  item,
  onClose,
  call,
}: {
  categorySlug: string;
  item?: MenuItem;
  onClose: () => void;
  call: (url: string, init?: RequestInit) => Promise<unknown>;
}) {
  const [name, setName] = useState(item?.name ?? "");
  const [id, setId] = useState(item?.id ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [price, setPrice] = useState<string>(item?.price != null ? String(item.price) : "");
  const [image, setImage] = useState(item?.image ?? "");
  const [tags, setTags] = useState<Tag[]>(item?.tags ?? []);
  const [outOfStock, setOutOfStock] = useState(!!item?.outOfStock);
  const [variants, setVariants] = useState(
    item?.variants?.map((v) => ({ label: v.label, price: String(v.price) })) ?? []
  );

  const save = async () => {
    const payload = {
      name,
      id: id || undefined,
      description,
      price: Number(price),
      tags,
      image,
      outOfStock,
      variants: variants
        .filter((v) => v.label.trim() && v.price.trim())
        .map((v) => ({ label: v.label.trim(), price: Number(v.price) })),
    };
    try {
      if (item) {
        await call(`/api/admin/menu/items/${categorySlug}/${item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await call(`/api/admin/menu/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, categorySlug }),
        });
      }
      onClose();
    } catch {}
  };

  return (
    <Modal onClose={onClose} title={item ? `Edit item: ${item.name}` : "New item"} wide>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name" className="sm:col-span-2">
          <input className="ai-input" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
        </Field>
        {!item && (
          <Field label="ID (optional — auto from name)" className="sm:col-span-2">
            <input
              className="ai-input"
              value={id}
              onChange={(e) => setId(e.target.value.replace(/\s+/g, "-").toLowerCase())}
              placeholder="auto-from-name"
            />
          </Field>
        )}
        <Field label="Description" className="sm:col-span-2">
          <textarea className="ai-input" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Field>
        <Field label="Price (AUD, GST inclusive)">
          <input
            className="ai-input"
            type="number"
            min="0"
            step="0.1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Field>
        <Field label="Image path (optional)">
          <input
            className="ai-input"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="/images/menu/your-dish.jpg"
          />
        </Field>
        <Field label="Tags" className="sm:col-span-2">
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((t) => {
              const on = tags.includes(t.value);
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTags(on ? tags.filter((x) => x !== t.value) : [...tags, t.value])}
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    on ? "border-brand-red bg-brand-red text-brand-cream" : "border-brand-gold/40 bg-white text-brand-ink hover:bg-brand-gold/10"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </Field>
        <Field label="Variants (e.g. 1 pc / 2 pc)" className="sm:col-span-2">
          <div className="space-y-2">
            {variants.map((v, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  className="ai-input flex-1"
                  placeholder="Label"
                  value={v.label}
                  onChange={(e) => {
                    const next = [...variants];
                    next[i] = { ...next[i], label: e.target.value };
                    setVariants(next);
                  }}
                />
                <input
                  className="ai-input w-28"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Price"
                  value={v.price}
                  onChange={(e) => {
                    const next = [...variants];
                    next[i] = { ...next[i], price: e.target.value };
                    setVariants(next);
                  }}
                />
                <button
                  type="button"
                  onClick={() => setVariants(variants.filter((_, j) => j !== i))}
                  className="rounded-full px-2 py-1 text-xs text-brand-red hover:bg-brand-red/10"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setVariants([...variants, { label: "", price: "" }])}
              className="text-xs font-semibold uppercase tracking-wider text-brand-red hover:underline"
            >
              + Add variant
            </button>
            <p className="text-xs text-brand-ink/50">
              Leave empty for single-price items. Otherwise add 2+ rows like “1 pc / 2 pc”.
            </p>
          </div>
        </Field>
        <label className="sm:col-span-2 inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={outOfStock} onChange={(e) => setOutOfStock(e.target.checked)} />
          Mark out of stock
        </label>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onClose} className="rounded-full px-4 py-1.5 text-sm text-brand-ink hover:bg-brand-gold/10">
          Cancel
        </button>
        <button
          onClick={save}
          className="rounded-full bg-brand-red px-4 py-1.5 text-sm font-medium text-brand-cream hover:bg-brand-red-dark"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-brand-ink/60">{label}</span>
      {children}
    </label>
  );
}

function Modal({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className={`w-full ${wide ? "max-w-2xl" : "max-w-md"} rounded-2xl bg-brand-cream-soft p-5 shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-3 font-display text-xl text-brand-red">{title}</h3>
        {children}
      </div>
      <style jsx global>{`
        .ai-input {
          width: 100%;
          border-radius: 8px;
          border: 1px solid rgba(224, 168, 46, 0.4);
          background: white;
          padding: 8px 10px;
          font-size: 14px;
          outline: none;
        }
        .ai-input:focus {
          border-color: var(--brand-red);
        }
      `}</style>
    </div>
  );
}
