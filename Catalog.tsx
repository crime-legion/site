import { motion, type Variants } from "framer-motion";
import { Lock } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, type Category } from "../data/products";
import ProductCard from "./ProductCard";

type Filter = "Все" | Category;

const gridVar: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVar: Variants = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function SoonTile() {
  return (
    <div className="flex flex-col">
      <div className="relative flex aspect-[3/4] flex-col items-center justify-center gap-4 overflow-hidden border border-dashed border-line bg-surface/40">
        <div className="grid h-12 w-12 place-items-center rounded-full border border-line">
          <Lock size={18} className="text-muted" />
        </div>
        <div className="text-center">
          <p className="font-display text-sm font-semibold uppercase">Дроп 02</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">скоро</p>
        </div>
        <span className="absolute bottom-3 left-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
          </span>
          в работе
        </span>
      </div>
      <div className="flex items-start justify-between gap-3 pt-3 opacity-50">
        <h3 className="font-display text-[13px] font-semibold uppercase md:text-sm">Секрет</h3>
        <span className="font-mono text-sm text-muted">? ₽</span>
      </div>
    </div>
  );
}

export default function Catalog() {
  const [filter, setFilter] = useState<Filter>("Все");

  const list = useMemo(
    () => (filter === "Все" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="catalog" className="relative mx-auto max-w-[1600px] px-5 pb-28 pt-24 md:px-10 md:pt-32">
      {/* Шапка секции */}
      <div className="mb-10 flex flex-col gap-8 md:mb-14 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-acid" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Каталог</span>
          </div>
          <h2 className="font-display text-5xl font-extrabold uppercase leading-none tracking-tight md:text-7xl">
            Дроп<span className="text-outline"> 01</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-sm text-sm leading-relaxed text-muted md:text-right"
        >
          Восемь позиций сезона. Наведи на карточку, выбери размер и нажми «В корзину» —
          заказ оформим в Telegram за пару секунд.
        </motion.p>
      </div>

      {/* Фильтры */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 flex flex-wrap items-center gap-2"
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ${
              filter === c
                ? "border-acid bg-acid font-bold text-bg"
                : "border-line text-muted hover:border-ink/40 hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
        <span className="ml-auto hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:block">
          {list.length} {list.length === 1 ? "позиция" : list.length < 5 ? "позиции" : "позиций"}
        </span>
      </motion.div>

      {/* Сетка */}
      <motion.div
        key={filter}
        variants={gridVar}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {list.map((p, i) => (
          <motion.div key={p.id} variants={cardVar}>
            <ProductCard product={p} index={i} />
          </motion.div>
        ))}
        {filter === "Все" && (
          <motion.div variants={cardVar}>
            <SoonTile />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
