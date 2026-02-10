import { useEffect, useRef } from "react";

/**
 * Minimal premium cursor:
 * - small dot + outlined ring
 * - smooth trailing using requestAnimationFrame
 * - click ripple
 * - hover state on interactive elements
 */
export default function CursorFX() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const rippleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const ripple = rippleRef.current;
    if (!dot || !ring || !ripple) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // ring trails behind
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const onDown = () => {
      ripple.classList.remove("cursor-ripple--play");
      // trigger reflow
      void ripple.offsetWidth;
      ripple.classList.add("cursor-ripple--play");
    };

    const setHover = (hover: boolean) => {
      ring.classList.toggle("cursor-ring--hover", hover);
      dot.classList.toggle("cursor-dot--hover", hover);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-magnet], .glass-card'
      );
      setHover(!!interactive);
    };

    const onOut = (e: MouseEvent) => {
      const related = (e.relatedTarget as HTMLElement | null) ?? null;
      if (!related) {
        setHover(false);
        return;
      }
      const stillInteractive = related.closest(
        'a, button, input, textarea, select, [role="button"], [data-magnet], .glass-card'
      );
      setHover(!!stillInteractive);
    };

    let raf = 0;
    const animate = () => {
      // lerp ring towards mouse
      const speed = 0.18;
      ringX += (mouseX - ringX) * speed;
      ringY += (mouseY - ringY) * speed;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      ripple.style.setProperty("--rx", `${mouseX}px`);
      ripple.style.setProperty("--ry", `${mouseY}px`);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={rippleRef} className="cursor-ripple" aria-hidden="true" />
    </>
  );
}
