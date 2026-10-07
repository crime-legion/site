export interface OrderLine {
  id: number;
  name: string;
  size: string;
  qty: number;
  price: number;
}

/**
 * ⚙️ НАСТРОЙКА: замените на username вашего Telegram-бота (без @).
 * Бот получит команду /start с кодом заказа, например: /start o1x2M_4x1L
 * (id товара × количество + размер, позиции через "_")
 */
export const TELEGRAM_BOT = "oblik_drop_bot";

const RUB = new Intl.NumberFormat("ru-RU");

export function formatPrice(n: number): string {
  return `${RUB.format(n)} ₽`;
}

/** Компактный код заказа для deep-link (?start=...) — лимит Telegram 64 символа */
export function encodeOrder(lines: OrderLine[]): string {
  return "o" + lines.map((l) => `${l.id}x${l.qty}${l.size}`).join("_");
}

export function telegramOrderLink(code: string): string {
  return `https://t.me/${TELEGRAM_BOT}?start=${encodeURIComponent(code)}`;
}

/** Читаемый состав заказа — можно скопировать и отправить боту вручную */
export function buildOrderMessage(lines: OrderLine[], total: number, code: string): string {
  const body = lines
    .map(
      (l, i) =>
        `${i + 1}. ${l.name} — размер ${l.size} × ${l.qty} — ${formatPrice(l.price * l.qty)}`
    )
    .join("\n");
  return `Заказ — OBLIK\n${body}\n—\nИтого: ${formatPrice(total)}\nКод заказа: ${code}`;
}
