import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "../data/products";
import { formatPrice } from "../lib/telegram";
import { useCart } from "../store/cart";

function SizePicker({
  product,
  size,
  onSelect,
}: {
  product: Product;
  size: string;
  onSelect: (s: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Размер">
      {product.sizes.map((s) => (
        <button
          key={s}
          role="radio"
          aria-checked={s === size}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(s);
          }}
          className={`border px-2.5 py-1 font-mono text-[11px] uppercase transition-all duration-200 ${
            s === size
              ? "border-ink bg-ink text-bg"
              : "border-line text-muted hover:border-ink/50 hover:text-ink"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

function AddButton({ added, onClick, compact }: { added: boolean; onClick: () => void; compact?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
        compact ? "py-3" : "py-3.5"
      } ${added ? "bg-ink text-bg" : "bg-acid text-bg hover:bg-ink"}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="ok"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2"
          >
            <Check size={14} strokeWidth={3} /> Добавлено
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2"
          >
            <Plus size={14} strokeWidth={3} className="transition-transform duration-300 group-hover/btn:rotate-90" />
            В корзину
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();
  const defaultSize = product.sizes.includes("M")
    ? "M"
    : product.sizes[Math.floor(product.sizes.length / 2)];
  const [size, setSize] = useState(defaultSize);
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const handleAdd = () => {
    add(product.id, size);
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col" data-hot>
      {/* Фото */}
      <div className="relative aspect-[3/4] overflow-hidden border border-line bg-surface">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.2em] text-ink/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        {product.tag && (
          <span className="absolute right-3 top-3 bg-acid px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-bg">
            {product.tag}
          </span>
        )}

        {/* Панель выбора — десктоп, по ховеру */}
        <div className="absolute inset-x-0 bottom-0 hidden translate-y-full border-t border-line bg-bg/90 p-3 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 md:block">
          <div className="mb-2"><SizePicker product={product} size={size} onSelect={setSize} /></div>
          <AddButton added={added} onClick={handleAdd} />
        </div>
      </div>

      {/* Инфо */}
      <div className="flex items-start justify-between gap-3 pt-3">
        <div>
          <h3 className="font-display text-[13px] font-semibold uppercase leading-tight md:text-sm">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-1 font-mono text-[11px] text-muted">{product.category} · {product.desc}</p>
        </div>
        <span className="shrink-0 pt-0.5 font-mono text-sm tabular-nums text-acid">
          {formatPrice(product.price)}
        </span>
      </div>

      {/* Мобильная панель */}
      <div className="mt-3 md:hidden">
        <div className="mb-2"><SizePicker product={product} size={size} onSelect={setSize} /></div>
        <AddButton added={added} onClick={handleAdd} compact />
      </div>
    </article>
  );
}
