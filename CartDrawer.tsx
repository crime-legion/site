import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { FREE_DELIVERY_FROM } from "../data/products";
import { scrollToId } from "../lib/scroll";
import { formatPrice } from "../lib/telegram";
import { useCart } from "../store/cart";

export default function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    detailed,
    total,
    count,
    setQty,
    remove,
    setCheckoutOpen,
  } = useCart();

  const left = Math.max(0, FREE_DELIVERY_FROM - total);
  const progress = Math.min(1, total / FREE_DELIVERY_FROM);

  const goCatalog = () => {
    setCartOpen(false);
    window.setTimeout(() => scrollToId("#catalog"), 250);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[140] bg-bg/70 backdrop-blur-sm"
          />
          <motion.aside
            key="panel"
            initial={{ x: "104%" }}
            animate={{ x: 0 }}
            exit={{ x: "104%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className="fixed right-0 top-0 z-[150] flex h-full w-full max-w-[480px] flex-col border-l border-line bg-surface"
            role="dialog"
            aria-label="Корзина"
          >
            {/* Шапка */}
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <div className="flex items-baseline gap-3">
                <h2 className="font-display text-xl font-extrabold uppercase">Корзина</h2>
                <span className="font-mono text-xs text-muted">
                  {count} {count === 1 ? "вещь" : count < 5 && count > 0 ? "вещи" : "вещей"}
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors duration-300 hover:border-ink/50"
                aria-label="Закрыть корзину"
              >
                <X size={16} />
              </button>
            </div>

            {/* Состав */}
            {detailed.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-line">
                  <ShoppingBag size={26} className="text-muted" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display text-base font-semibold uppercase">Пока пусто</p>
                  <p className="mt-2 text-sm text-muted">
                    Монохром сам себя не купит. Загляните в дроп.
                  </p>
                </div>
                <button
                  onClick={goCatalog}
                  className="rounded-full bg-acid px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-bg transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  К каталогу
                </button>
              </div>
            ) : (
              <>
                <div className="mask-fade-y flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {detailed.map((item) => (
                      <motion.div
                        key={`${item.productId}-${item.size}`}
                        layout
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 48, transition: { duration: 0.25 } }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-4 border-b border-line py-4 last:border-b-0"
                      >
                        <div className="h-24 w-20 shrink-0 overflow-hidden border border-line bg-bg">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate font-display text-[12px] font-semibold uppercase">
                                {item.product.name}
                              </p>
                              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                                размер {item.size}
                              </p>
                            </div>
                            <button
                              onClick={() => remove(item.productId, item.size)}
                              className="grid h-8 w-8 shrink-0 place-items-center text-muted transition-colors duration-200 hover:text-acid"
                              aria-label="Удалить"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center rounded-full border border-line">
                              <button
                                onClick={() => setQty(item.productId, item.size, item.qty - 1)}
                                className="grid h-8 w-8 place-items-center text-muted transition-colors hover:text-ink"
                                aria-label="Меньше"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-7 text-center font-mono text-sm tabular-nums">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => setQty(item.productId, item.size, item.qty + 1)}
                                className="grid h-8 w-8 place-items-center text-muted transition-colors hover:text-ink"
                                aria-label="Больше"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <span className="font-mono text-sm tabular-nums text-ink">
                              {formatPrice(item.lineTotal)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Подвал */}
                <div className="border-t border-line px-6 pb-6 pt-5">
                  <div className="mb-5">
                    <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                      <span className="flex items-center gap-1.5">
                        <Truck size={13} className={left === 0 ? "text-acid" : ""} />
                        {left === 0 ? "Бесплатная доставка разблокирована" : "До бесплатной доставки"}
                      </span>
                      {left > 0 && <span className="tabular-nums text-ink">{formatPrice(left)}</span>}
                    </div>
                    <div className="h-[3px] w-full overflow-hidden rounded-full bg-line">
                      <motion.div
                        className="h-full rounded-full bg-acid"
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>

                  <div className="mb-5 flex items-baseline justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Итого</span>
                    <span className="font-display text-2xl font-extrabold tabular-nums">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutOpen(true);
                    }}
                    className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-acid py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-bg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Оформить в Telegram
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                    оплата и доставка — в боте
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
