import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowDown, ArrowDownRight } from "lucide-react";
import { useRef } from "react";
import { scrollToId } from "../lib/scroll";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const STATS = [
  ["08", "позиций в дропе"],
  ["24–72ч", "доставка по РФ"],
  ["TG", "оформление в боте"],
];

function RotatingBadge() {
  return (
    <div className="relative grid h-28 w-28 place-items-center md:h-36 md:w-36">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite] text-muted"
      >
        <defs>
          <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current font-mono text-[8px] uppercase" letterSpacing="2.6">
          <textPath href="#badge-circle">новый дроп • oblik • fw26 • монохром •</textPath>
        </text>
      </svg>
      <div className="grid h-12 w-12 place-items-center rounded-full border border-line bg-bg">
        <ArrowDownRight size={18} className="text-acid" />
      </div>
    </div>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const giantY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const state = ready ? "show" : "hidden";

  return (
    <section id="top" ref={ref} className="relative min-h-screen overflow-hidden pt-16">
      {/* Гигантский фон-текст */}
      <motion.div
        style={{ y: giantY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden"
        aria-hidden
      >
        <motion.span
          initial={{ y: "40%", opacity: 0 }}
          animate={ready ? { y: "12%", opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="block text-center font-display text-[26vw] font-extrabold leading-[0.8] tracking-tight text-outline-dim"
        >
          OBLIK
        </motion.span>
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 pb-24 pt-10 md:grid-cols-12 md:px-10 md:pt-16 lg:gap-6">
        {/* Левая колонка */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={state}
          className="flex flex-col justify-center md:col-span-7"
          style={{ y: undefined }}
        >
          <motion.div variants={fade} className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-acid" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              FW26 · Дроп 01 · Монохром
            </span>
          </motion.div>

          <h1 className="font-display font-extrabold uppercase leading-[0.95] tracking-tight">
            <span className="block overflow-hidden">
              <motion.span variants={rise} className="block text-[13vw] md:text-[7.2vw]">
                Одежда
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={rise} className="block text-[13vw] text-outline md:text-[7.2vw]">
                без лишнего
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={rise} className="block text-[13vw] md:text-[7.2vw]">
                шума<span className="text-acid">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p variants={fade} className="mt-8 max-w-md text-base leading-relaxed text-muted md:text-lg">
            Чёрный, графит, крем. Честные ткани и крой, который работает на тебя.
            Выбери вещи — заказ улетит прямо в наш Telegram-бот.
          </motion.p>

          <motion.div variants={fade} className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToId("#catalog")}
              className="group relative overflow-hidden rounded-full bg-acid px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-bg transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Смотреть дроп
                <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
            </button>
            <button
              onClick={() => scrollToId("#manifesto")}
              className="rounded-full border border-line px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:border-ink/50"
            >
              Манифест
            </button>
          </motion.div>
        </motion.div>

        {/* Правая колонка — фото */}
        <div className="relative md:col-span-5">
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={ready ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="relative aspect-[3/4] w-full overflow-hidden border border-line bg-surface md:ml-auto md:max-w-[430px]"
          >
            <motion.img
              src="/images/hero.jpg"
              alt="Модель в монохромном образе OBLIK"
              style={{ y: imgY }}
              className="absolute inset-0 h-[120%] w-full scale-105 object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/70">
              look 01 — худи «тень»
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-4 bottom-10 hidden md:block lg:-left-10"
          >
            <RotatingBadge />
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="absolute -right-2 top-1/2 hidden origin-right -rotate-90 font-mono text-[10px] uppercase tracking-[0.4em] text-muted lg:block"
          >
            est. 2026 — dark room
          </motion.span>
        </div>
      </div>

      {/* Нижние статы */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto max-w-[1600px] px-5 pb-10 md:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-3 divide-x divide-line border border-line"
        >
          {STATS.map(([v, l]) => (
            <div key={l} className="flex flex-col gap-1 px-4 py-4 md:flex-row md:items-baseline md:gap-3 md:px-6">
              <span className="font-display text-lg font-bold text-acid md:text-xl">{v}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{l}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
