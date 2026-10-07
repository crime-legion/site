import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Send, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  TELEGRAM_BOT,
  buildOrderMessage,
  encodeOrder,
  formatPrice,
  telegramOrderLink,
} from "../lib/telegram";
import { useCart } from "../store/cart";

export default function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen, detailed, total } = useCart();
  const [copied, setCopied] = useState(false);

  const lines = useMemo(
    () =>
      detailed.map((d) => ({
        id: d.productId,
        name: d.product.name,
        size: d.size,
        qty: d.qty,
        price: d.product.price,
      })),
    [detailed]
  );

  const code = useMemo(() => encodeOrder(lines), [lines]);
  const link = useMemo(() => telegramOrderLink(code), [code]);

  const copyAll = async () => {
    const text = buildOrderMessage(lines, total, code);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const openBot = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {checkoutOpen && detailed.length > 0 && (
        <motion.div
          key="checkout-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={() => setCheckoutOpen(false)}
          className="fixed inset-0 z-[160] grid place-items-center overflow-y-auto bg-bg/80 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg border border-line bg-surface"
            role="dialog"
            aria-label="Оформление заказа"
          >
            {/* Шапка */}
            <div className="flex items-start justify-between border-b border-line p-6 md:p-7">
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-acid">
                  Оформление · шаг 1 из 1
                </p>
                <h3 className="font-display text-xl font-extrabold uppercase leading-tight md:text-2xl">
                  Заказ собран.
                  <br />
                  Осталось отправить.
                </h3>
              </div>
              <button
                onClick={() => setCheckoutOpen(false)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 hover:border-ink/50"
                aria-label="Закрыть"
              >
                <X size={16} />
              </button>
            </div>

            {/* Состав */}
            <div className="max-h-44 overflow-y-auto px-6 py-4 md:px-7">
              {lines.map((l, i) => (
                <div
                  key={`${l.id}-${l.size}`}
                  className="flex items-baseline justify-between gap-3 py-2 text-sm"
                >
                  <span className="min-w-0 truncate text-ink/90">
                    <span className="mr-2 font-mono text-[11px] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.name}
                    <span className="ml-2 font-mono text-[11px] uppercase text-muted">
                      {l.size} × {l.qty}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[13px] tabular-nums">
                    {formatPrice(l.price * l.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-baseline justify-between border-t border-line px-6 py-4 md:px-7">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Итого</span>
              <span className="font-display text-2xl font-extrabold tabular-nums text-acid">
                {formatPrice(total)}
              </span>
            </div>

            {/* Код заказа */}
            <div className="px-6 pb-5 md:px-7">
              <div className="flex items-center justify-between gap-3 border border-line bg-bg px-4 py-3">
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
                    код заказа для бота
                  </p>
                  <p className="truncate font-mono text-sm text-acid">{code}</p>
                </div>
                <button
                  onClick={copyAll}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 hover:border-acid/70"
                  aria-label="Скопировать заказ"
                >
                  {copied ? <Check size={14} className="text-acid" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Действия */}
            <div className="flex flex-col gap-3 border-t border-line p-6 md:p-7">
              <button
                onClick={openBot}
                className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-acid py-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-bg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send size={15} className="transition-transform duration-300 group-hover:rotate-12" />
                Открыть Telegram-бота
              </button>
              <button
                onClick={copyAll}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-line py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-ink/50"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-acid" /> Скопировано
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Скопировать состав заказа
                  </>
                )}
              </button>
              <p className="text-center font-mono text-[10px] leading-relaxed tracking-[0.1em] text-muted">
                Бот @{TELEGRAM_BOT} получит код автоматически и предложит оплату и доставку.
                <br />
                Не открылся? Вставьте скопированный текст в чат бота.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
