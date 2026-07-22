'use client';

// Motion primitives for the Range Compound homepage.
//
// Timing is deliberately slow — 900ms with a long-tail ease. Fast reveals read
// as "web app"; slow ones read as considered. Everything here no-ops under
// prefers-reduced-motion: content renders in its final state, immediately.

import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

const DURATION = 900;
const EASE = 'cubic-bezier(0.2, 0.7, 0.2, 1)';

function prefersReduced() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Fire a callback the first time `el` enters the viewport, then stop watching. */
function useInViewOnce<T extends HTMLElement>(
  onEnter: () => void,
  threshold = 0.15,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      onEnter();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            onEnter();
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
    // onEnter is stable in every call site here (a plain setState).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

type Dir = 'up' | 'left' | 'right' | 'none';

const OFFSET: Record<Dir, string> = {
  up: 'translate3d(0, 22px, 0)',
  left: 'translate3d(-24px, 0, 0)',
  right: 'translate3d(24px, 0, 0)',
  none: 'none',
};

/** Fade + drift children into place when they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  dir = 'up',
  className,
  style,
}: {
  children: ReactNode;
  /** Seconds. Stagger siblings by ~0.08–0.12. */
  delay?: number;
  dir?: Dir;
  className?: string;
  style?: CSSProperties;
}) {
  const [shown, setShown] = useState(false);
  const ref = useInViewOnce<HTMLDivElement>(() => setShown(true));

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : OFFSET[dir],
        transition: `opacity ${DURATION}ms ${EASE} ${delay}s, transform ${DURATION}ms ${EASE} ${delay}s`,
        willChange: shown ? 'auto' : 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Count from 0 → `to` on first scroll into view.
 *
 * `to` may be null, which is the placeholder state: it renders an em-dash pair
 * instead of a number and never animates. That is deliberate — the real figures
 * have not been supplied yet, and inventing them was off the table. Drop a real
 * number into src/lib/content.ts and the count-up starts working with no other
 * change.
 *
 * Runs one rAF loop writing straight to the DOM node — no per-frame React state.
 */
export function CountUp({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  separators = false,
  duration = 1900,
  className,
  style,
}: {
  to: number | null;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separators?: boolean;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const nodeRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef(0);

  const ref = useInViewOnce<HTMLSpanElement>(() => {
    const el = nodeRef.current;
    if (el) start(el);
  }, 0.4);

  // Keep both refs pointed at the same node.
  const setRef = (el: HTMLSpanElement | null) => {
    nodeRef.current = el;
    (ref as React.MutableRefObject<HTMLSpanElement | null>).current = el;
  };

  const render = (el: HTMLSpanElement, v: number) => {
    const body =
      decimals > 0
        ? v.toFixed(decimals)
        : separators
          ? Math.round(v).toLocaleString('en-US')
          : String(Math.round(v));
    el.textContent = `${prefix}${body}${suffix}`;
  };

  const start = (el: HTMLSpanElement) => {
    if (to === null) return;
    if (prefersReduced()) {
      render(el, to);
      return;
    }
    let t0 = 0;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const t = Math.min(1, (ts - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      render(el, to * eased);
      if (t < 1) rafRef.current = window.requestAnimationFrame(step);
      else render(el, to);
    };
    rafRef.current = window.requestAnimationFrame(step);
  };

  useEffect(() => () => window.cancelAnimationFrame(rafRef.current), []);

  if (to === null) {
    return (
      <span className={className} style={style} aria-label="Figure pending">
        &mdash;&mdash;
      </span>
    );
  }

  // Start at zero so the layout does not jump when the count begins.
  return (
    <span ref={setRef} className={className} style={style}>
      {`${prefix}${(0).toFixed(decimals)}${suffix}`}
    </span>
  );
}
