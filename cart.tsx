import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "../data/products";

export interface CartItem {
  productId: number;
  size: string;
  qty: number;
}

export interface DetailedItem extends CartItem {
  product: Product;
  lineTotal: number;
}

interface ToastData {
  key: number;
  title: string;
  sub: string;
}

interface CartContextValue {
  items: CartItem[];
  detailed: DetailedItem[];
  count: number;
  total: number;
  add: (productId: number, size: string) => void;
  remove: (productId: number, size: string) => void;
  setQty: (productId: number, size: string, qty: number) => void;
  clear: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (v: boolean) => void;
  toast: ToastData | null;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "oblik-cart-v1";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return parsed.filter((i) => PRODUCTS.some((p) => p.id === i.productId) && i.qty > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((productId: number, size: string) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === productId && i.size === size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { productId, size, qty: 1 }];
    });
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
      setToast({ key: Date.now(), title: product.name, sub: `размер ${size} · в корзине` });
      toastTimer.current = window.setTimeout(() => setToast(null), 2400);
    }
  }, []);

  const remove = useCallback((productId: number, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));
  }, []);

  const setQty = useCallback((productId: number, size: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.productId === productId && i.size === size))
        : prev.map((i) => (i.productId === productId && i.size === size ? { ...i, qty } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const detailed = useMemo<DetailedItem[]>(
    () =>
      items
        .map((i) => {
          const product = PRODUCTS.find((p) => p.id === i.productId);
          if (!product) return null;
          return { ...i, product, lineTotal: product.price * i.qty };
        })
        .filter(Boolean) as DetailedItem[],
    [items]
  );

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const total = useMemo(() => detailed.reduce((s, i) => s + i.lineTotal, 0), [detailed]);

  const value: CartContextValue = {
    items,
    detailed,
    count,
    total,
    add,
    remove,
    setQty,
    clear,
    cartOpen,
    setCartOpen,
    checkoutOpen,
    setCheckoutOpen,
    toast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
