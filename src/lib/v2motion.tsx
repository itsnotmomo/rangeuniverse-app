'use client';

// Shared motion primitives for the light-theme homepage variants.
// Both respect prefers-reduced-motion. CountUp follows the perf pattern used
// across this branch: one rAF loop, mounted once, writing straight to the DOM
// node via ref — no per-frame React state.

import React, { useEffect, useRef, useState, CSSProperties, ReactNode } from 'react';

function prefersReduced() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Reveal children when scrolled into view: fade + rise. */
export function Reveal({
  children, delay = 0, y = 16, className, style,
}: { children: ReactNode; delay?: number; y?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) { setShown(true); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition: 'opacity .6s cubic-bezier(.2,.7,.2,1), transform .6s cubic-bezier(.2,.7,.2,1)',
        transitionDelay: `${delay}s`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Count from 0 → `to` when scrolled into view. Format via primitive props. */
export function CountUp({
  to, decimals = 0, prefix = '', suffix = '', separators = false, duration = 1500,
  className, style,
}: {
  to: number; decimals?: number; prefix?: string; suffix?: string; separators?: boolean;
  duration?: number; className?: string; style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const render = (v: number) => {
      const body = decimals > 0
        ? v.toFixed(decimals)
        : (separators ? Math.round(v).toLocaleString('en-US') : String(Math.round(v)));
      el.textContent = `${prefix}${body}${suffix}`;
    };

    if (prefersReduced()) { render(to); return; }

    render(0);
    let raf = 0;
    let start = 0;
    let ran = false;

    const step = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      render(to * eased);
      if (t < 1) raf = window.requestAnimationFrame(step);
      else render(to);
    };

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !ran) {
          ran = true;
          raf = window.requestAnimationFrame(step);
          io.disconnect();
        }
      }
    }, { threshold: 0.4 });
    io.observe(el);

    return () => { window.cancelAnimationFrame(raf); io.disconnect(); };
  }, [to, decimals, prefix, suffix, separators, duration]);

  // Non-breaking space keeps layout stable before the count starts.
  return <span ref={ref} className={className} style={style}>{' '}</span>;
}
