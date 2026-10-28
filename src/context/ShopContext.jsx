import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ShopContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const [user, setUser] = useState(() => readStorage("good-store-user", null));
  const [cart, setCart] = useState(() => readStorage("good-store-cart", []));
  const [theme, setTheme] = useState(
    () => readStorage("good-store-theme", "light") || "light",
  );

  useEffect(() => {
    localStorage.setItem("good-store-user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("good-store-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("good-store-theme", JSON.stringify(theme));
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const logout = () => setUser(null);
  const toggleTheme = () =>
    setTheme((current) => (current === "light" ? "dark" : "light"));

  const value = useMemo(
    () => ({
      user,
      setUser,
      logout,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartCount: cart.reduce((total, item) => total + item.quantity, 0),
      cartTotal: cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
      theme,
      toggleTheme,
    }),
    [user, cart, theme],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }
  return context;
}
