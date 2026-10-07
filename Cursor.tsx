import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHot(!!t?.closest("a, button, [role='button'], input, [data-hot]"));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[300]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/60"
          animate={{
            width: hot ? 52 : 34,
            height: hot ? 52 : 34,
            opacity: hot ? 0.9 : 0.5,
            scale: down ? 0.8 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          style={{ mixBlendMode: "difference" }}
        />
      </motion.div>
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[300]"
        style={{ x, y }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color] duration-200 ${
            hot ? "h-2 w-2 bg-acid" : "h-1.5 w-1.5 bg-ink"
          }`}
        />
      </motion.div>
    </>
  );
}
