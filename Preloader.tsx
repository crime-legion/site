import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const LETTERS = ["О", "Б", "Л", "И", "К"];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const t0 = performance.now();
    const DURATION = 1700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(() => doneRef.current(), 300);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-bg px-6 py-6 md:px-10 md:py-8"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
        <span>Магазин монохромной одежды</span>
        <span className="hidden sm:block">FW26</span>
      </div>

      <div className="flex items-center justify-center">
        <h1 className="flex overflow-hidden font-display text-[18vw] font-extrabold leading-none tracking-tight md:text-[13vw]">
          {LETTERS.map((l, i) => (
            <motion.span
              key={i}
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className={i === LETTERS.length - 1 ? "text-acid" : "text-ink"}
            >
              {l}
            </motion.span>
          ))}
        </h1>
      </div>

      <div className="flex items-end justify-between">
        <motion.div
          className="h-px w-full origin-left bg-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        <span className="ml-6 font-mono text-4xl tabular-nums text-ink md:text-6xl">
          {String(n).padStart(3, "0")}
        </span>
      </div>
    </motion.div>
  );
}
