"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/business";

const DAY_KEYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function parseHM(s: string): number {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
}

function compute(now: Date) {
  // Compute "now" in Melbourne time for correctness regardless of viewer TZ
  const fmt = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Melbourne",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const todayMin = hour * 60 + minute;
  const todayHours = business.hours.find((h) => h.day === weekday);
  if (!todayHours) return { open: false, label: "Closed today" };
  const openMin = parseHM(todayHours.open);
  const closeMin = parseHM(todayHours.close);
  if (todayMin >= openMin && todayMin <= closeMin - 30) {
    return { open: true, label: `Open now — closes ${todayHours.close}` };
  }
  if (todayMin < openMin) {
    return { open: false, label: `Opens today at ${todayHours.open}` };
  }
  return { open: false, label: "Closed — opens tomorrow" };
}

export function OpenStatus({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<{ open: boolean; label: string } | null>(null);
  useEffect(() => {
    const update = () => setState(compute(new Date()));
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, []);
  if (!state) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        state.open ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
      } ${compact ? "" : "shadow-sm"}`}
    >
      <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${state.open ? "bg-green-500" : "bg-amber-500"}`} />
      {state.label}
    </span>
  );
}

void DAY_KEYS;
