"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";
import { business } from "@/lib/business";

export function Hero() {
  return (
    <section className="paper-grain relative overflow-hidden bg-gradient-to-b from-brand-cream via-brand-cream-soft to-brand-cream-soft">
      {/* Decorative background blobs */}
      <motion.div
        aria-hidden
        className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-red/15 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tandoor flame glow */}
      <div className="absolute right-8 top-1/3 hidden lg:block">
        <div className="relative h-24 w-16">
          <div className="flame absolute inset-x-0 bottom-0 mx-auto h-20 w-12 rounded-[50%_50%_30%_30%/60%_60%_40%_40%] bg-gradient-to-t from-brand-red via-brand-gold to-yellow-200 opacity-70 blur-sm" />
          <div className="flame absolute inset-x-0 bottom-1 mx-auto h-14 w-8 rounded-[50%_50%_30%_30%/60%_60%_40%_40%] bg-gradient-to-t from-brand-red via-brand-gold to-yellow-100 opacity-90" />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-gold/40 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-brand-red"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
            Now open in Seven Hills
          </motion.div>

          <h1 className="mt-5 font-display text-6xl leading-[1.05] text-brand-red sm:text-7xl">
            {business.name}
          </h1>
          <p className="mt-2 font-script text-2xl text-brand-gold-dark">
            {business.nameGurmukhi}
          </p>
          <p className="mt-5 max-w-lg text-lg text-brand-ink/75">
            A pure-vegetarian Punjabi dhaba in Western Sydney. Hand-rolled rotis,
            slow-simmered dals, and sweets made the way our grandmothers
            taught us.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="rounded-full bg-brand-red px-7 py-3 font-semibold text-brand-cream shadow-lg shadow-brand-red/30 transition hover:bg-brand-red-dark"
            >
              Order online
            </Link>
            <a
              href={business.maps}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-ink/10 bg-white/60 px-6 py-3 font-semibold text-brand-ink transition hover:border-brand-gold hover:bg-brand-gold/10"
            >
              <MapPin className="h-4 w-4" /> Get directions
            </a>
            <a
              href={`tel:${business.phone.tel}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-ink/10 bg-white/60 px-6 py-3 font-semibold text-brand-ink transition hover:border-brand-gold hover:bg-brand-gold/10"
            >
              <Phone className="h-4 w-4" /> {business.phone.display}
            </a>
          </div>

          <div className="mt-8 flex gap-6 text-sm text-brand-ink/60">
            <div>
              <div className="font-display text-2xl text-brand-red">100%</div>
              <div>Pure veg</div>
            </div>
            <div>
              <div className="font-display text-2xl text-brand-red">60+</div>
              <div>Dishes</div>
            </div>
            <div>
              <div className="font-display text-2xl text-brand-red">7 days</div>
              <div>A week</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <RotatingThali />
        </motion.div>
      </div>
    </section>
  );
}

function RotatingThali() {
  return (
    <div className="relative mx-auto aspect-square max-w-md">
      {/* Steam over the thali */}
      <div className="pointer-events-none absolute left-[40%] top-[12%] z-10 flex gap-2">
        <span className="steam h-12 w-1.5 rounded-full bg-white/70" style={{ animationDelay: "0s" }} />
        <span className="steam h-12 w-1.5 rounded-full bg-white/70" style={{ animationDelay: "0.6s" }} />
        <span className="steam h-12 w-1.5 rounded-full bg-white/70" style={{ animationDelay: "1.2s" }} />
      </div>

      {/* Glow halo behind the thali */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-gold/50 via-brand-red/25 to-transparent blur-3xl" />
      <div className="absolute inset-6 rounded-full bg-brand-gold/15 blur-2xl" />

      {/* Slowly rotating thali photo (transparent PNG) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        whileHover={{ scale: 1.04 }}
        className="relative h-full w-full drop-shadow-2xl"
      >
        <Image
          src="/images/hero-thali.png"
          alt="Authentic Punjabi thali — roti, dal, sabzi, raita, saag, rice and salad"
          fill
          priority
          sizes="(max-width: 768px) 90vw, 480px"
          className="object-contain"
        />
      </motion.div>

      {/* Decorative rotating outer ring of dots (opposite direction) */}
      <motion.svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute inset-0 h-full w-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i * 360) / 36;
          return (
            <circle
              key={i}
              cx={200 + Math.cos((angle * Math.PI) / 180) * 196}
              cy={200 + Math.sin((angle * Math.PI) / 180) * 196}
              r={i % 3 === 0 ? 3 : 1.5}
              fill="#C8102E"
              opacity={i % 3 === 0 ? 0.9 : 0.5}
            />
          );
        })}
      </motion.svg>
    </div>
  );
}

// (Kept available if you ever want to fall back to the illustrated version)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ThaliIllustration() {
  return (
    <div className="relative mx-auto aspect-square max-w-md">
      {/* Steam */}
      <div className="absolute left-[40%] top-[18%] flex gap-2">
        <span className="steam h-12 w-1.5 rounded-full bg-white/60" style={{ animationDelay: "0s" }} />
        <span className="steam h-12 w-1.5 rounded-full bg-white/60" style={{ animationDelay: "0.6s" }} />
        <span className="steam h-12 w-1.5 rounded-full bg-white/60" style={{ animationDelay: "1.2s" }} />
      </div>

      <svg viewBox="0 0 400 400" className="h-full w-full drop-shadow-2xl">
        <defs>
          <radialGradient id="thali-gold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5C74A" />
            <stop offset="100%" stopColor="#B8861C" />
          </radialGradient>
          <radialGradient id="rice" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFFAEB" />
            <stop offset="100%" stopColor="#E8D9A6" />
          </radialGradient>
        </defs>

        {/* Outer rim */}
        <circle cx="200" cy="200" r="190" fill="url(#thali-gold)" />
        <circle cx="200" cy="200" r="175" fill="#FBEFD0" />
        <circle cx="200" cy="200" r="172" fill="none" stroke="#C8102E" strokeWidth="1" strokeDasharray="2 6" />

        {/* Decorative outer pattern */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          return (
            <circle
              key={i}
              cx={200 + Math.cos((angle * Math.PI) / 180) * 182}
              cy={200 + Math.sin((angle * Math.PI) / 180) * 182}
              r="2"
              fill="#C8102E"
            />
          );
        })}

        {/* Center rice */}
        <circle cx="200" cy="200" r="60" fill="url(#rice)" />
        <circle cx="200" cy="200" r="60" fill="none" stroke="#B8861C" strokeWidth="1" />

        {/* Bowls around */}
        <Bowl x={120} y={130} color="#C8102E" /> {/* dal */}
        <Bowl x={280} y={130} color="#1F8A8A" /> {/* sabzi */}
        <Bowl x={120} y={270} color="#E0A82E" /> {/* kadhi */}
        <Bowl x={280} y={270} color="#7A2E0E" /> {/* rajma */}

        {/* Roti */}
        <g transform="translate(200,310)">
          <ellipse cx="0" cy="0" rx="32" ry="10" fill="#E8C887" />
          <ellipse cx="-4" cy="-2" rx="6" ry="2" fill="#9A6B2A" opacity="0.5" />
          <ellipse cx="8" cy="2" rx="5" ry="1.5" fill="#9A6B2A" opacity="0.4" />
        </g>

        {/* Lemon wedge */}
        <g transform="translate(200,95)">
          <path d="M -14 0 A 14 14 0 0 1 14 0 Z" fill="#F5D547" />
          <path d="M -14 0 A 14 14 0 0 1 14 0 Z" fill="none" stroke="#B8861C" strokeWidth="1" />
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#FFF8E7" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

function Bowl({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx="0" cy="0" r="32" fill="#F5C74A" />
      <circle cx="0" cy="0" r="28" fill={color} />
      <ellipse cx="-8" cy="-8" rx="6" ry="3" fill="white" opacity="0.25" />
    </g>
  );
}
