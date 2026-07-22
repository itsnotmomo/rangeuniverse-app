'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BRAND, NAV, TELEGRAM_BOT } from '@/lib/brand';

/*
 * TO SWAP IN THE REAL LOGO: replace the two children of <a className="wordmark">
 * with
 *
 *   <Image src="/logo.png" alt={BRAND.name} width={940} height={539}
 *          className="wordmark-img" priority />
 *
 * .wordmark-img is already defined (height-driven, width auto, sized for 2x).
 * Held back for now because public/logo.png reads "The COUMPOND" — the U and M
 * are transposed. Drop a corrected file at the same path and this is a
 * one-line change.
 */

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
      <div className="header-bar header-inner">
        <div className="header-left">
          <a className="wordmark" href="#top" aria-label={`${BRAND.name} — home`}>
            <Image src="/brand/r-mark-gold.svg" alt="" width={26} height={26} priority />
            <span className="wordmark-text">{BRAND.name}</span>
          </a>
        </div>

        <div className="header-mid">
          <nav className="desknav" aria-label="Primary">
            {NAV.map(([label, href]) => (
              <a key={href} className="navlink" href={href}>
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="header-right">
          <a
            className="btn btn-ghost hide-sm"
            href={TELEGRAM_BOT}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '11px 22px', fontSize: 14 }}
          >
            Join Now
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
          <div className="header-bar" style={{ paddingBottom: 20 }}>
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
              Join Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
