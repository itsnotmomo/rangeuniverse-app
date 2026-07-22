'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BRAND, NAV, TELEGRAM_BOT } from '@/lib/brand';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled || open}>
      <div className="wrap header-inner">
        <a className="wordmark" href="#top" aria-label={`${BRAND.name} — home`}>
          {/* REPLACE: gold R-mark — drop the real file at public/brand/r-mark-gold.svg */}
          <Image src="/brand/r-mark-gold.svg" alt="" width={26} height={26} priority />
          <span className="wordmark-text">{BRAND.name}</span>
        </a>

        <nav className="desknav" aria-label="Primary">
          {NAV.map(([label, href]) => (
            <a key={href} className="navlink" href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            className="btn btn-ghost hide-sm"
            href={TELEGRAM_BOT}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '11px 22px', fontSize: 14 }}
          >
            Request access
          </a>
          <button
            type="button"
            className="burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 8h16M4 16h16'} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="mobnav">
          <div className="wrap" style={{ paddingBottom: 20 }}>
            {NAV.map(([label, href]) => (
              <a key={href} className="navlink" href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a
              className="btn btn-primary"
              href={TELEGRAM_BOT}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{ marginTop: 20, width: '100%' }}
            >
              Request access
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
