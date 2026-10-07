import type Lenis from "lenis";

export const scrollRef: { lenis: Lenis | null } = { lenis: null };

export function scrollToId(selector: string) {
  const el = document.querySelector(selector) as HTMLElement | null;
  if (!el) return;
  if (scrollRef.lenis) {
    scrollRef.lenis.scrollTo(el, { offset: -64, duration: 1.5 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
