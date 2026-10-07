import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { scrollToId } from "../lib/scroll";

const LINES = [
  { text: "Без логотипов.", style: "text-ink" },
  { text: "Без шума.", style: "text-outline" },
  { text: "Только форма.", style: "text-ink" },
];

const rise: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const FACTS = [
  ["480", "г/м² — плотность футера"],
  ["100%", "хлопок и шерсть"],
  ["7 дней", "на обмен и возврат"],
];

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="manifesto" ref={ref} className="relative overflow-hidden border-t border-line">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        {/* Текст */}
        <div className="flex flex-col justify-center md:col-span-7">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-acid" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Манифест</span>
          </div>

          <h2 className="font-display font-extrabold uppercase leading-[1.02] tracking-tight">
            {LINES.map((l, i) => (
              <span key={l.text} className="block overflow-hidden pb-1">
                <motion.span
                  custom={i}
                  variants={rise}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.6 }}
                  className={`block text-[9.5vw] md:text-[4.6vw] ${l.style}`}
                >
                  {l.text}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-lg text-base leading-relaxed text-muted"
          >
            OBLIK — это маленькие дропы вещей, которые не кричат. Мы убираем всё лишнее,
            оставляя плотную ткань, точный крой и спокойные цвета. Монохром — не скучно.
            Монохром — это когда работает форма.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => scrollToId("#catalog")}
            className="group mt-10 flex w-max items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-ink"
          >
            <span className="border-b border-acid pb-1 transition-colors duration-300 group-hover:text-acid">
              К вещам
            </span>
            <ArrowUpRight size={16} className="text-acid transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.button>
        </div>

        {/* Фото ткани + факты */}
        <div className="flex flex-col gap-6 md:col-span-5">
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="relative aspect-[4/3] overflow-hidden border border-line"
          >
            <motion.img
              src="/images/fabric.jpg"
              alt="Текстура плотного чёрного хлопка"
              style={{ y: imgY }}
              className="absolute inset-0 h-[116%] w-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-bg/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/80 backdrop-blur">
              футер трёхнитка · начёс
            </div>
          </motion.div>

          <div className="grid grid-cols-3 divide-x divide-line border border-line">
            {FACTS.map(([v, l], i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-1.5 px-3 py-4 md:px-4"
              >
                <span className="font-display text-base font-bold text-acid md:text-lg">{v}</span>
                <span className="font-mono text-[9px] uppercase leading-snug tracking-[0.12em] text-muted md:text-[10px]">
                  {l}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
