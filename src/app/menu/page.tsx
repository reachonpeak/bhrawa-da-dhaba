import type { Metadata } from "next";
import { getMenu } from "@/lib/menu-store";
import { MenuTabs } from "@/components/MenuTabs";
import { PhulkariDivider } from "@/components/PhulkariDivider";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore the full Bharawan Daa Dhaba menu — Punjabi dhaba specials, South Indian, Bombay street food, sabzi, dals, tandoori breads and thalis.",
};

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const menu = await getMenu();
  return (
    <div className="relative">
      <section className="bg-gradient-to-b from-brand-cream to-brand-cream-soft py-14 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-red">
            Bharawan Daa Dhaba
          </p>
          <h1 className="mt-3 font-display text-5xl text-brand-red sm:text-6xl">
            Our Menu
          </h1>
          <p className="mt-4 text-brand-ink/70">
            Pure vegetarian. Hand-rolled. Tandoor-fired. Served with the warmth
            of a Punjabi kitchen.
          </p>
          <PhulkariDivider />
        </div>
      </section>

      <MenuTabs categories={menu} />
    </div>
  );
}
