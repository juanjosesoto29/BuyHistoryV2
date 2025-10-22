// src/state/cart.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "bh_cart";

export const CartProvider = ({ children }) => {
  // Estado inicial desde localStorage
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persistencia
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* noop */
    }
  }, [items]);

  // Helpers internos
  const findIndexById = (arr, id) => arr.findIndex((p) => p.id === id);

  // API del carrito
  const add = (product) => {
    if (!product || product.id == null) return;

    setItems((prev) => {
      const idx = findIndexById(prev, product.id);
      if (idx >= 0) {
        // ya existe → qty + 1
        const next = [...prev];
        const curr = next[idx];
        next[idx] = { ...curr, qty: (curr.qty ?? 1) + 1 };
        return next;
      }
      // nuevo → qty inicial (por defecto 1)
      const price = Number(product.price ?? 0);
      const qty = Number(product.qty ?? 1);
      return [...prev, { ...product, price, qty }];
    });
  };

  const inc = (id) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: (p.qty ?? 1) + 1 } : p))
    );
  };

  const dec = (id) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max((p.qty ?? 1) - 1, 0) } : p))
        .filter((p) => (p.qty ?? 1) > 0)
    );
  };

  const remove = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clear = () => setItems([]);

  const count = useMemo(
    () => items.reduce((acc, p) => acc + Number(p.qty ?? 1), 0),
    [items]
  );

  const total = useMemo(
    () => items.reduce((acc, p) => acc + Number(p.price ?? 0) * Number(p.qty ?? 1), 0),
    [items]
  );

  // Alias NO invasivo para tests/compatibilidad
  const value = {
    items,
    add,
    addToCart: add, // <- alias opcional, no afecta tu app
    inc,
    dec,
    remove,
    clear,
    count,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
