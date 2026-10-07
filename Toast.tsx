import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useCart } from "../store/cart";

export default function Toast() {
  const { toast, setCartOpen } = useCart();

  return (
    <div className="pointer-events-none fixed bottom-6 left-5 z-[170] md:left-10">
      <AnimatePresence>
        {toast && (
          <motion.button
            key={toast.key}
            initial={{ y: 72, opacity: 0, scale: 0.94 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            onClick={() => setCartOpen(true)}
            className="pointer-events-auto flex items-center gap-3 rounded-full border border-line bg-ink py-2 pl-2 pr-6 text-left text-bg shadow-2xl shadow-black/50"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-acid">
              <Check size={16} strokeWidth={3} />
            </span>
            <span>
              <span className="block font-display text-[12px] font-bold uppercase leading-tight">
                {toast.title}
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.15em] opacity-70">
                {toast.sub} · открыть →
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
