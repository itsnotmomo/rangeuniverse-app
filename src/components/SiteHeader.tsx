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
      <div className="header-bar header-inner">
        <div className="header-left">
          <a className="wordmark" href="#top">
            {/* Declared at 256 wide while CSS renders it at most 115 (the
                clamp tops out at 48px tall). Browsers do not reliably upgrade
                to the 2x srcset candidate, so the 1x candidate is itself made
                retina-sufficient — 256 against a 115px slot is 2.2x on desktop
                and 3.2x on mobile. The file is a few KB either way. */}
            <Image
              src="/logo.png"
              alt={BRAND.name}
              width={256}
              height={107}
              className="wordmark-img"
              priority
            />
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
