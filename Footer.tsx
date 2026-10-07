import { Send } from "lucide-react";
import { scrollToId } from "../lib/scroll";
import { TELEGRAM_BOT } from "../lib/telegram";

const BRAND = ["O", "B", "L", "I", "K"];

export default function Footer() {
  return (
    <footer id="contacts" className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[1600px] px-5 pt-20 md:px-10">
        {/* Верх футера */}
        <div className="grid grid-cols-2 gap-10 pb-16 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="flex items-baseline gap-1 font-display text-xl font-extrabold">
              OBLIK<span className="h-2 w-2 rounded-full bg-acid" />
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Монохромная одежда маленькими дропами. Заказ и поддержка — в Telegram-боте.
            </p>
          </div>

          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Магазин</p>
            <ul className="space-y-2.5">
              {[
                ["Каталог", "#catalog"],
                ["Манифест", "#manifesto"],
                ["Наверх", "#top"],
              ].map(([label, target]) => (
                <li key={label}>
                  <button
                    onClick={() => scrollToId(target)}
                    className="text-sm text-ink/80 transition-colors duration-300 hover:text-acid"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Покупателям</p>
            <ul className="space-y-2.5 text-sm text-ink/80">
              <li>Доставка 24–72 ч по РФ</li>
              <li>Бесплатно от 10 000 ₽</li>
              <li>Обмен и возврат — 7 дней</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Связь</p>
            <a
              href={`https://t.me/${TELEGRAM_BOT}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-line px-5 py-3 text-sm transition-colors duration-300 hover:border-acid/70 hover:bg-elev"
            >
              <Send size={15} className="text-acid transition-transform duration-300 group-hover:rotate-12" />
              @{TELEGRAM_BOT}
            </a>
            <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-muted">
              бот отвечает мгновенно,
              <br />
              люди — в течение часа
            </p>
          </div>
        </div>
      </div>

      {/* Гигантский логотип */}
      <div className="select-none border-t border-line" aria-hidden>
        <div className="flex items-end justify-center overflow-hidden px-2">
          {BRAND.map((l, i) => (
            <span
              key={i}
              className="font-display text-[24vw] font-extrabold leading-[0.85] tracking-tight text-outline transition-colors duration-300 hover:text-acid"
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Низ */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-2 px-5 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:flex-row md:px-10">
          <span>© 2026 OBLIK. Все права защищены</span>
          <span>Монохром как образ жизни</span>
        </div>
      </div>
    </footer>
  );
}
