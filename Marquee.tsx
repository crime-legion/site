import { Asterisk } from "lucide-react";

interface Props {
  items: string[];
  outline?: boolean;
  fast?: boolean;
  className?: string;
}

export default function Marquee({ items, outline, fast, className = "" }: Props) {
  const Row = () => (
    <div className="flex w-max shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.22em] md:text-base ${
              outline ? "text-outline" : "text-ink"
            }`}
          >
            {t}
          </span>
          <Asterisk size={20} className="mx-6 shrink-0 text-acid md:mx-10" strokeWidth={1.5} />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden border-y border-line py-4 md:py-5 ${className}`}
      aria-hidden
    >
      <div className={`flex w-max ${fast ? "animate-marquee-fast" : "animate-marquee"}`}>
        <Row />
        <Row />
      </div>
    </div>
  );
}
