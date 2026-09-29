import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { Dish } from '../data/menu';

export type CartLine = {
  key: string;
  dish: Dish;
  qty: number;
  options: string[];   // chosen option names
  unit: number;        // unit price incl option deltas
};

type CartCtx = {
  lines: CartLine[];
  add: (dish: Dish, options?: { name: string; delta: number }[], qty?: number) => void;
  inc: (key: string) => void;
  dec: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = 'restro_cart_v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  }, [lines]);

  const add: CartCtx['add'] = (dish, options = [], qty = 1) => {
    const names = options.map((o) => o.name);
    const unit = dish.price + options.reduce((s, o) => s + o.delta, 0);
    const key = dish.id + '|' + names.sort().join(',');
    setLines((prev) => {
      const i = prev.findIndex((l) => l.key === key);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { key, dish, qty, options: names, unit }];
    });
  };

  const inc = (key: string) => setLines((p) => p.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)));
  const dec = (key: string) => setLines((p) => p.flatMap((l) => (l.key === key ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l])));
  const remove = (key: string) => setLines((p) => p.filter((l) => l.key !== key));
  const clear = () => setLines([]);

  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.qty * l.unit, 0), [lines]);

  return <Ctx.Provider value={{ lines, add, inc, dec, remove, clear, count, subtotal }}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart must be used within CartProvider');
  return c;
};
