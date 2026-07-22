'use client';

import { useEffect, useState } from 'react';

/**
 * Full-bleed background video for the hero.
 *
 * The poster is always painted and is the only thing that ships on a
 * constrained visit. The <video> mounts client-side and only when the
 * visitor's environment allows it:
 *
 *   - prefers-reduced-motion: reduce  → poster only, no video request
 *   - Save-Data enabled               → poster only
 *   - 2g / slow-2g effective type     → poster only
 *
 * Unlike the feature blocks this does not wait for an intersection — the hero
 * is above the fold, so deferring would just show a static poster on arrival.
 */
export function BackgroundVideo({ src, poster }: { src: string; poster: string }) {
  const [play, setPlay] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // navigator.connection is Chromium-only; absence just means "assume fine".
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') return;

    setPlay(true);
  }, []);

  return (
    <div className="hero-bg" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" />

      {play && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onCanPlay={() => setReady(true)}
          // Fade is driven from CSS via this attribute — an inline opacity
          // would override the stylesheet and defeat the low target opacity.
          data-ready={ready}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
