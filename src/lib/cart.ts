"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  qty: number;
  variant?: string;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (line: Omit<CartLine, "qty"> & { qty?: number }) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      add: (line) =>
        set((s) => {
          const existing = s.lines.find((l) => l.id === line.id);
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.id === line.id ? { ...l, qty: l.qty + (line.qty ?? 1) } : l
              ),
              isOpen: true,
            };
          }
          return {
            lines: [...s.lines, { ...line, qty: line.qty ?? 1 }],
            isOpen: true,
          };
        }),
      inc: (id) =>
        set((s) => ({
          lines: s.lines.map((l) =>
            l.id === id ? { ...l, qty: l.qty + 1 } : l
          ),
        })),
      dec: (id) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.id === id ? { ...l, qty: l.qty - 1 } : l))
            .filter((l) => l.qty > 0),
        })),
      remove: (id) =>
        set((s) => ({ lines: s.lines.filter((l) => l.id !== id) })),
      clear: () => set({ lines: [] }),
      subtotal: () =>
        get().lines.reduce((sum, l) => sum + l.price * l.qty, 0),
      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
    }),
    { name: "bharawan-cart" }
  )
);
