import { useEffect, useRef, useState } from "react";

/**
 * useReveal
 * ---------
 * Reveals an element with a subtle blur -> focus transition when it enters
 * the viewport, using an Intersection Observer (no scroll listeners).
 *
 * Visibility safeguards (critical):
 * - The element is visible by default. The hidden .reveal styles are only
 *   applied after the observer has been initialised (isReady === true).
 * - If JavaScript fails or the observer never fires, content stays readable.
 * - Respects prefers-reduced-motion: reduce — the element stays fully visible.
 * - Animates once by default.
 *
 * Usage:
 *   const { ref, isVisible, isReady } = useReveal();
 *   <section ref={ref} className={base + (isReady ? (isVisible ? "reveal is-visible" : "reveal") : "")}>
 */
export function useReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -12% 0px",
  once = true,
} = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const prefersReduced =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setIsReady(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setIsReady(true);
            if (once) {
              observer.disconnect();
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    setIsReady(true);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref: elementRef, isVisible, isReady };
}

export default useReveal;
