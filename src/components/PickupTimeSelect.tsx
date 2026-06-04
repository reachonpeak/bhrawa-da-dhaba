"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/business";

const SLOT_MINUTES = 15;
const LEAD_MINUTES = 25; // earliest pickup after order placed
const TZ = "Australia/Sydney";

function nowParts() {
  const fmt = new Intl.DateTimeFormat("en-AU", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  return {
    weekday: parts.find((p) => p.type === "weekday")?.value ?? "Mon",
    hour: Number(parts.find((p) => p.type === "hour")?.value ?? 0),
    minute: Number(parts.find((p) => p.type === "minute")?.value ?? 0),
  };
}

function parseHM(s: string): number {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
}

function formatSlot(mins: number): string {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h24 < 12 || h24 === 24 ? "am" : "pm";
  const h12 = ((h24 + 11) % 12) + 1;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function nextWeekday(day: string): string {
  const order = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const i = order.indexOf(day);
  return order[(i + 1) % 7];
}

function buildSlots(): { label: string; value: string }[] {
  const { weekday, hour, minute } = nowParts();
  const nowMin = hour * 60 + minute;
  const today = business.hours.find((h) => h.day === weekday);

  const slots: { label: string; value: string }[] = [];

  if (today) {
    const open = parseHM(today.open);
    const close = parseHM(today.close);
    // Earliest pickup is max(open, now + lead), rounded up to slot
    const earliest = Math.max(open, nowMin + LEAD_MINUTES);
    const start = Math.ceil(earliest / SLOT_MINUTES) * SLOT_MINUTES;
    const last = close - SLOT_MINUTES;
    for (let m = start; m <= last; m += SLOT_MINUTES) {
      slots.push({ label: `Today ${formatSlot(m)}`, value: `Today ${formatSlot(m)}` });
    }
  }

  // If no slots today (after closing or closed day), offer tomorrow's slots
  if (slots.length === 0) {
    const tomorrowName = nextWeekday(weekday);
    const tomorrow = business.hours.find((h) => h.day === tomorrowName);
    if (tomorrow) {
      const open = parseHM(tomorrow.open);
      const close = parseHM(tomorrow.close);
      for (let m = open; m <= close - SLOT_MINUTES; m += SLOT_MINUTES) {
        slots.push({
          label: `${tomorrowName} ${formatSlot(m)}`,
          value: `${tomorrowName} ${formatSlot(m)}`,
        });
      }
    }
  }

  return slots;
}

export function PickupTimeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [slots, setSlots] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const update = () => setSlots(buildSlots());
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input"
    >
      <option value="ASAP">ASAP (ready in ~25–30 min)</option>
      {slots.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
      {slots.length === 0 && (
        <option value="" disabled>
          We're closed — please call to arrange pickup
        </option>
      )}
    </select>
  );
}
