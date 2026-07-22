'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Framed media for the feature blocks.
 *
 * Same degradation contract as the hero: the poster always paints, and the
 * video is only requested when the environment allows it. Unlike the hero it
 * also waits until the block is near the viewport, so two more clips are not
 * pulled down while someone is still reading the top of the page.
 */
export function FeatureVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') return;

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShow(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: '400px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="feature-media frame" ref={ref}>
      <span className="corner" aria-hidden />
      <span className="corner" aria-hidden />
      <span className="corner" aria-hidden />
      <span className="corner" aria-hidden />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" className="feature-media-layer" />

      {show && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          onCanPlay={() => setReady(true)}
          className="feature-media-layer"
          style={{
            opacity: ready ? 1 : 0,
            transition: 'opacity 1s cubic-bezier(0.2,0.7,0.2,1)',
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
