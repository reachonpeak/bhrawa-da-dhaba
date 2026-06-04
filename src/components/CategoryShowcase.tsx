"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Card = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  tint: string; // tailwind gradient classes
};

const CARDS: Card[] = [
  {
    title: "Shuruaat",
    subtitle: "Tandoori starters",
    image: "/images/gallery/tandoori_paneer_tikka-removebg-preview.png",
    href: "/menu?cat=shuruaat",
    tint: "from-amber-200/70 via-rose-200/60 to-transparent",
  },
  {
    title: "Dhaba Special",
    subtitle: "Hearty Punjabi mains",
    image: "/images/gallery/dhaba_special_thali-removebg-preview(1).png",
    href: "/menu?cat=dhaba-special",
    tint: "from-orange-200/70 via-yellow-200/60 to-transparent",
  },
  {
    title: "South Indian",
    subtitle: "Crisp dosas & sambhar",
    image: "/images/gallery/masala_dosa-removebg-preview.png",
    href: "/menu?cat=south-indian",
    tint: "from-yellow-200/70 via-amber-100/60 to-transparent",
  },
  {
    title: "Dalon Ki Bahar",
    subtitle: "Slow-cooked dals & curries",
    image: "/images/gallery/dal_makhani_naan-removebg-preview.png",
    href: "/menu?cat=dalon-ki-bahar",
    tint: "from-lime-200/70 via-emerald-200/60 to-transparent",
  },
];

export function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Explore by category</p>
        <h2 className="mt-2 font-display text-4xl text-brand-ink sm:text-5xl">A taste of every region</h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-ink/70">
          From tandoor-fired starters to creamy dals, crisp dosas to homestyle thalis —
          pick where to start.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-brand-gold/30 bg-gradient-to-b from-brand-cream to-white shadow-sm transition hover:shadow-xl"
          >
            <Link href={c.href} className="block">
              {/* Image area with colored halo */}
              <div className="relative flex h-56 items-center justify-center overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${c.tint}`} />
                <div className="absolute -bottom-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/60 blur-2xl" />
                <motion.div
                  className="relative h-44 w-44"
                  whileHover={{ rotate: 6, scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                >
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 22vw"
                    className="object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.18)]"
                  />
                </motion.div>
              </div>

              {/* Label */}
              <div className="relative border-t border-brand-gold/20 bg-white/80 px-5 py-4 backdrop-blur">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl text-brand-red">{c.title}</h3>
                    <p className="text-xs text-brand-ink/60">{c.subtitle}</p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-brand-cream transition group-hover:rotate-[-12deg] group-hover:bg-brand-red-dark">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
