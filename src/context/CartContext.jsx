import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

function useStoredState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

export function CartProvider({ children }) {
  const [items, setItems] = useStoredState("drip-cart", []);
  const [wishlist, setWishlist] = useStoredState("drip-wishlist", []);

  const addToCart = (product, size, qty = 1) => {
    const key = `${product.id}-${size}`;
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { key, id: product.id, name: product.name, price: product.price, image: product.image, size, qty }];
    });
  };

  const removeItem = (key) => setItems((prev) => prev.filter((i) => i.key !== key));

  const changeQty = (key, delta) =>
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
    );

  const clearCart = () => setItems([]);

  const toggleWishlist = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, wishlist, addToCart, removeItem, changeQty, clearCart, toggleWishlist, cartCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

// This hook shares the context API alongside the provider in this module.
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
