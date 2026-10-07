import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useState } from "react";
import CartDrawer from "./components/CartDrawer";
import Catalog from "./components/Catalog";
import CheckoutModal from "./components/CheckoutModal";
import Cursor from "./components/Cursor";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import Toast from "./components/Toast";
import { scrollRef } from "./lib/scroll";
import { CartProvider, useCart } from "./store/cart";

function EscapeClose() {
  const { cartOpen, checkoutOpen, setCartOpen, setCheckoutOpen } = useCart();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (checkoutOpen) setCheckoutOpen(false);
      else if (cartOpen) setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, checkoutOpen, setCartOpen, setCheckoutOpen]);
  return null;
}

function ScrollLock({ extra }: { extra: boolean }) {
  const { cartOpen, checkoutOpen } = useCart();
  const locked = extra || cartOpen || checkoutOpen;

  useEffect(() => {
    const lenis = scrollRef.lenis;
    if (locked) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);

  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const ready = !loading;

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    scrollRef.lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      scrollRef.lenis = null;
    };
  }, []);

  return (
    <CartProvider>
      <div className="noise-overlay" aria-hidden />
      <Cursor />

      <AnimatePresence>{loading && <Preloader onDone={() => setLoading(false)} />}</AnimatePresence>

      <ScrollLock extra={loading} />
      <EscapeClose />
      <Navbar ready={ready} />

      <main>
        <Hero ready={ready} />
        <Marquee
          items={[
            "Новая коллекция FW26",
            "Бесплатная доставка от 10 000 ₽",
            "Оформление в Telegram",
            "Монохром навсегда",
          ]}
        />
        <Catalog />
        <Manifesto />
        <Marquee
          outline
          fast
          items={["OBLIK", "Одежда без лишнего шума", "Дроп 02 — скоро", "Сделано в тёмной комнате"]}
        />
      </main>

      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <Toast />
    </CartProvider>
  );
}
