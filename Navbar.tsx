import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { scrollToId } from "../lib/scroll";
import { formatPrice } from "../lib/telegram";
import { useCart } from "../store/cart";

const LINKS = [
  { label: "Каталог", target: "#catalog" },
  { label: "Манифест", target: "#manifesto" },
  { label: "Контакты", target: "#contacts" },
];

export default function Navbar({ ready }: { ready: boolean }) {
  const { count, total, setCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-[120] transition-colors duration-500 ${
        scrolled ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
        <button
          onClick={() => scrollToId("#top")}
          className="group flex items-baseline gap-1 font-display text-lg font-extrabold tracking-tight"
          aria-label="Наверх"
        >
          OBLIK
          <span className="h-2 w-2 rounded-full bg-acid transition-transform duration-300 group-hover:scale-150" />
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.target}
              onClick={() => scrollToId(l.target)}
              className="group relative font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors duration-300 hover:text-ink"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-acid transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <button
          onClick={() => setCartOpen(true)}
          className="group flex items-center gap-3 rounded-full border border-line px-4 py-2 transition-colors duration-300 hover:border-acid/70 hover:bg-elev"
          aria-label="Открыть корзину"
        >
          <ShoppingBag size={15} className="text-ink transition-transform duration-300 group-hover:-rotate-12" />
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:block">
            Корзина
          </span>
          <span className="hidden font-mono text-[11px] tabular-nums text-muted lg:block">
            {count > 0 ? formatPrice(total) : "—"}
          </span>
          <span className="relative grid h-5 min-w-5 place-items-center overflow-visible rounded-full bg-acid px-1 font-mono text-[11px] font-bold text-bg">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={count}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="tabular-nums"
              >
                {count}
              </motion.span>
            </AnimatePresence>
          </span>
        </button>
      </div>
    </motion.header>
  );
}
