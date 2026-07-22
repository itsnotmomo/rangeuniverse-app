'use client';

import { useEffect, useState } from 'react';

/**
 * Background video for the hero.
 *
 * The poster image is always painted first and is the only thing that ships on
 * a constrained visit. The <video> is mounted client-side and only when the
 * visitor's environment says it's welcome:
 *
 *   - prefers-reduced-motion: reduce  → poster only, no video request
 *   - Save-Data header enabled        → poster only
 *   - 2g / slow-2g effective type     → poster only
 *
 * So a slow or data-saving connection downloads the poster, not the loop.
 *
 * `sources` are tried in order; the browser falls through to the next one if a
 * file is missing or undecodable, which is what keeps the placeholder loop in
 * place until the real footage lands.
 */
export function HeroVideo({
  poster,
  sources,
}: {
  poster: string;
  sources: ReadonlyArray<{ src: string; type: string }>;
}) {
  const [playVideo, setPlayVideo] = useState(false);
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

    setPlayVideo(true);
  }, []);

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {playVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onCanPlay={() => setReady(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: ready ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.2,0.7,0.2,1)',
          }}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
    </div>
  );
}
