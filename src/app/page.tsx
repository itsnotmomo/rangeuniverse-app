'use client';

import Image from 'next/image';
import React, { Fragment, useEffect, useMemo, useRef, useState , ReactNode} from 'react';

/* =============================================================================
   HELPERS (must be on top so they exist before use)
   ========================================================================== */
function hexA(hex: string, a = 1) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}

function shade(hex: string, amt = -20) {
  const h = hex.replace('#', '');
  const num = parseInt(h, 16);
  let r = (num >> 16) + amt, g = ((num >> 8) & 0xff) + amt, b = (num & 0xff) + amt;
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);
  return `rgb(${r}, ${g}, ${b})`;
}

/* =============================================================================
   THEME
   ========================================================================== */
const BRAND = {
  PURPLE: '#6d28d9',
  PURPLE_DARK: '#5b21b6',
  PURPLE_LIGHT: '#8b5cf6',
  TEXT: '#0a0a0a',
  MUTED: '#525252',
  RING: 'rgba(0,0,0,0.10)',
  CARD_BORDER: 'rgba(0,0,0,0.08)',
};

const GRAD = {
  brand: (a = 1) =>
    `linear-gradient(135deg, ${hexA(BRAND.PURPLE_DARK, a)}, ${hexA(BRAND.PURPLE, a)})`,
};

const CLS = {
  card: 'rounded-2xl bg-white shadow-sm',
    btn: 'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition active:translate-y-[1px] shadow-[0_10px_24px_rgba(91,33,182,0.18)] [background:linear-gradient(white,white),linear-gradient(135deg,#4b1ca5,#6d28d9)] bg-origin-border bg-clip-padding border border-transparent hover:brightness-[1.03]',
  btnGhost: 'inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition active:translate-y-[1px] bg-white/90 backdrop-blur border border-black/10 hover:bg-white',
  headline: 'font-extrabold tracking-tight',
  smallCaps: 'text-[11px] uppercase tracking-[0.35em]',
};

/* =============================================================================
   DATA
   ========================================================================== */
type MonthStat = {
  month: string;
  year: number;
  trades: number;
  wins: number;
  losses: number;
  rr: number;
  winRatePct: number;
  gainPct: number;
};

const ALL_STATS: MonthStat[] = [
  { month: 'October',  year: 2023, trades: 44, wins: 22, losses: 22, rr: 174, winRatePct: 50, gainPct: 12 },
  { month: 'November', year: 2023, trades: 58, wins: 31, losses: 27, rr: 186, winRatePct: 53, gainPct: 16 },
  { month: 'December', year: 2023, trades: 38, wins: 24, losses: 14, rr: 121, winRatePct: 63, gainPct: 11 },
  { month: 'January',  year: 2024, trades: 35, wins: 17, losses: 18, rr: 102, winRatePct: 48, gainPct: 9 },
  { month: 'February', year: 2024, trades: 51, wins: 26, losses: 25, rr: 173, winRatePct: 51, gainPct: 15 },
  { month: 'March',    year: 2024, trades: 37, wins: 17, losses: 20, rr: 214, winRatePct: 46, gainPct: 12.1 },
  { month: 'April',    year: 2024, trades: 35, wins: 14, losses: 21, rr: 214, winRatePct: 40, gainPct: 12.1 },
  { month: 'May',      year: 2024, trades: 45, wins: 22, losses: 23, rr: 138, winRatePct: 49, gainPct: 12.7 },
  { month: 'June',     year: 2024, trades: 37, wins: 17, losses: 20, rr: 89,  winRatePct: 45, gainPct: 4.9 },
  { month: 'July',     year: 2024, trades: 41, wins: 17, losses: 24, rr: 99,  winRatePct: 40, gainPct: 3 },
  { month: 'August',   year: 2024, trades: 44, wins: 20, losses: 24, rr: 133, winRatePct: 45, gainPct: 7 },
  { month: 'September',year: 2024, trades: 39, wins: 17, losses: 22, rr: 125, winRatePct: 43, gainPct: 6 },
  { month: 'October',  year: 2024, trades: 44, wins: 22, losses: 22, rr: 174, winRatePct: 50, gainPct: 12 },
  { month: 'November', year: 2024, trades: 40, wins: 22, losses: 18, rr: 157, winRatePct: 55, gainPct: 8 },
  { month: 'December', year: 2024, trades: 21, wins: 5,  losses: 16, rr: 32,  winRatePct: 41, gainPct: 0.5 },
  { month: 'January',  year: 2025, trades: 12, wins: 5,  losses: 7,  rr: 27,  winRatePct: 41, gainPct: 1.2 },
  { month: 'February', year: 2025, trades: 22, wins: 10, losses: 12, rr: 107, winRatePct: 45, gainPct: 8.9 },
  { month: 'March',    year: 2025, trades: 37, wins: 17, losses: 20, rr: 214, winRatePct: 46, gainPct: 12.1 },
  { month: 'April',    year: 2025, trades: 32, wins: 19, losses: 13, rr: 158, winRatePct: 59, gainPct: 8.8 },
  { month: 'May',      year: 2025, trades: 30, wins: 16, losses: 14, rr: 120, winRatePct: 53, gainPct: 4.4 },
  { month: 'June',     year: 2025, trades: 20, wins: 6,  losses: 14, rr: -14, winRatePct: 30, gainPct: -2.5 },
  { month: 'July',     year: 2025, trades: 34, wins: 19, losses: 15, rr: 126, winRatePct: 56, gainPct: 6.5 },
  { month: 'August',   year: 2025, trades: 24, wins: 13, losses: 11, rr: 106, winRatePct: 54, gainPct: 4.2 },
  { month: 'September',year: 2025, trades: 26, wins: 14, losses: 12, rr: 167, winRatePct: 55, gainPct: 10.2 },
];


const MONTH_ORDER = [
  'January','February','March','April','May','June','July','August','September','October','November','December'
];

/* =============================================================================
   SMALL UI
   ========================================================================== */
function Avatar({ src }: { src: string }) {
  return (
    <Image src={src} alt="student" width={32} height={32} className="rounded-full ring-2 ring-white" loading="lazy" />
  );
}

function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
      {/* Put the header above the hero, but NOT fixed */}
      <div className="relative">
        <Header />

        {/* Hero starts immediately; header is transparent over it */}
        <section id="home" className="relative p-0">
          <Hero />
        </section>
      </div>

      {/* Rest unchanged */}
      <ActionIntro />
      <ToolsPathSection />
      <StatsSection />
      <PairsSection />
      <ProgramSlices />
      <ChoosePathSection />
      <StudentWinsSection />
      <RoiSection />
      <FaqSection />
      <FloatingActions />
    </main>
  );
}

/* ======================== BRAND (size-only) ======================== */
function Brand({ size = 40 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 min-w-0">
      <Image src="/mr-logo.webp" alt="Master Room" width={size} height={size} priority />
      <span className="font-semibold tracking-wide leading-none text-[17px] text-white">
        MASTER ROOM
      </span>
    </span>
  );
}

/* ================== HEADER (transparent, size-only tweaks) ================= */
function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Esc closes mobile
  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const grad = `linear-gradient(135deg, #5b21b6, #6d28d9)`;

  return (
    // Absolute so it sits on top of the hero only; transparent background
    <header className="absolute inset-x-0 top-0 z-50 bg-transparent">
      <div className="relative mx-auto flex h-[72px] md:h-16 w-full max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#home" aria-label="Go to top" className="relative z-10 flex items-center">
          <Brand size={40} />
        </a>

        {/* Desktop nav (white on dark hero) */}
        <nav className="relative z-10 hidden items-center gap-6 text-sm md:flex">
          {[
            ["Home", "#home"],
            ["Info", "#info"],
            ["How", "#how"],
            ["Pairs", "#pairs"],
            ["Stats", "#stats"],
            ["Pricing", "#pricing"],
            ["Reviews", "#reviews"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="relative z-10 hidden items-center gap-3 md:flex">
          <a
            href="/join"
            aria-label="Join Master Room"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white border border-white/20 shadow-[0_8px_24px_rgba(91,33,182,0.28)] active:translate-y-[1px]"
            style={{ background: grad }}
          >
            Join Now
          </a>
          <a
            href="https://t.me/+K8Nzz9B0aaQzN2Y0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Free Community"
            className="rounded-xl px-3.5 py-2 text-sm font-semibold text-white/90 hover:text-white border border-white/25"
          >
            Free Telegram
          </a>
        </div>

        {/* Mobile right actions — larger like the reference */}
        <div className="relative z-10 flex items-center gap-3 md:hidden">
          <a
            href="/join"
            aria-label="Join"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm border border-white/20"
            style={{ background: grad }}
          >
            Join
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
            className="grid h-11 w-11 place-items-center rounded-xl border shadow-sm bg-transparent text-white border-white/40"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu (fixed sheet so it covers content when opened) */}
      {mobileOpen && (
        <>
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          />
          <div className="fixed inset-x-0 top-0 z-50 origin-top rounded-b-2xl border-b bg-white shadow-lg md:hidden">
            <div className="mx-auto max-w-6xl px-6 py-5">
              <div className="flex h-12 items-center justify-between">
                <div className="flex items-center">
                  <Image src="/mr-logo.webp" alt="Master Room" width={40} height={40} />
                  <span className="ml-2 font-semibold tracking-wide leading-none text-[17px]">
                    MASTER ROOM
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close"
                  className="grid h-11 w-11 place-items-center rounded-lg border bg-white text-neutral-800"
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M6 6l12 12M18 6l-12 12" />
                  </svg>
                </button>
              </div>

              <nav className="mt-5 grid gap-2 text-sm">
                {[
                  ["Home", "#home"],
                  ["Info", "#info"],
                  ["How", "#how"],
                  ["Pairs", "#pairs"],
                  ["Stats", "#stats"],
                  ["Pricing", "#pricing"],
                  ["Reviews", "#reviews"],
                  ["FAQ", "#faq"],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 hover:bg-neutral-50"
                  >
                    {label}
                  </a>
                ))}
              </nav>

              <div className="mt-5 flex items-center gap-3">
                <a
                  href="/join"
                  className="flex-1 rounded-xl px-4 py-2.5 text-center text-sm font-semibold text-white"
                  style={{ background: grad, boxShadow: "0 6px 16px rgba(0,0,0,.08)" }}
                >
                  Enroll Today
                </a>
                <a
                  href="https://t.me/rangesupportfx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Support"
                  className="grid h-11 w-11 place-items-center rounded-lg border bg-white"
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22l-4-9-9-4 20-7z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

function Hero() {
  // Sora assets (swap when ready)
  const VIDEO_SRC = "/video/masterroom_hero.mp4";
  const VIDEO_POSTER = "/video/masterroom_poster.webp";

  const [open, setOpen] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // ESC to close + autoplay on open, pause on close
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  React.useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else if (!open && videoRef.current) {
      videoRef.current?.pause();
    }
  }, [open]);

  return (
    <section id="home" className="relative w-full overflow-hidden" style={{ background: "#0b0d11" }}>
      {/* Ambient field — deeper, more cinematic */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(1200px 600px at 0% -10%, rgba(109,40,217,.22), rgba(109,40,217,0) 60%)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(900px 500px at 100% 20%, rgba(167,139,250,.18), rgba(167,139,250,0) 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(800px 320px at 50% 110%, rgba(245,193,71,.10), rgba(245,193,71,0) 60%)" }} />

      <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-16 md:px-6 md:pt-28 md:pb-20">
        {/* Eyebrow */}
        <p className={`${CLS.smallCaps} text-white/60 text-center`}>M A S T E R &nbsp; R O O M</p>

        {/* Headline with subtle glow + gradient word */}
        <h1 className="mt-2 text-center font-extrabold leading-[1.04] text-white text-4xl sm:text-5xl md:text-6xl">
          COPY — PASTE —{" "}
          <span
            className="inline-block"
            style={{
              background: GRAD.brand(),
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: `0 0 24px ${hexA(BRAND.PURPLE_LIGHT, 0.28)}`
            }}
          >
            PROFIT
          </span>
        </h1>

        {/* Subhead */}
        <p className="mt-3 text-center text-[15px] sm:text-base md:text-[17px] text-white/80">
          Join the Master Room, copy professional trades, and start making profits today.
        </p>

        {/* Video frame */}
        <div className="mt-6 md:mt-8">
          <div
            className="relative mx-auto w-full max-w-4xl rounded-[28px] overflow-hidden"
            style={{
              // conic border glow + inner ring (unique frame)
              background: `conic-gradient(from 160deg at 50% 50%, ${hexA(BRAND.PURPLE_LIGHT, .45)}, ${hexA('#f5c147', .45)}, ${hexA(BRAND.PURPLE_LIGHT, .45)})`,
              padding: "1px",
              boxShadow: `0 40px 80px ${hexA("#000", 0.35)}`
            }}
          >
            <div className="relative rounded-[27px] overflow-hidden ring-1 ring-white/10 bg-[#0d0f14]">
              {/* Poster */}
              <Image
                src={VIDEO_POSTER}
                alt="Master Room video preview"
                width={1600}
                height={900}
                className="block w-full h-auto"
                priority
              />

              {/* Soft vignettes */}
              <div aria-hidden className="pointer-events-none absolute inset-0"
                   style={{ background: "radial-gradient(100% 140% at 50% 120%, rgba(0,0,0,.5), rgba(0,0,0,0) 40%)" }} />
              <div aria-hidden className="pointer-events-none absolute inset-0"
                   style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,.35))" }} />

              {/* Play button + halo */}
              <button
                onClick={() => setOpen(true)}
                className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full flex items-center justify-center focus:outline-none"
                aria-label="Play video"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: `0 12px 30px ${hexA(BRAND.PURPLE_LIGHT, 0.35)}`,
                }}
              >
                {/* halo ping */}
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: `0 0 60px 10px ${hexA(BRAND.PURPLE_LIGHT, .35)}`,
                    filter: "blur(2px)"
                  }}
                />
                <svg width="26" height="26" viewBox="0 0 24 24" className="relative translate-x-[1px]">
                  <path d="M8 5v14l11-7z" fill="#0b0d11" />
                </svg>
              </button>

              {/* Floating pill */}
              <div
                className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/15"
                style={{ background: "rgba(11,13,17,.55)", backdropFilter: "blur(6px)" }}
              >
                Real Trades • Real Results
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: arrows + CTA + avatars + compact ribbon */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* Arrows + CTA */}
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <Image src="/arrow_left.webp" alt="Arrow left" width={46} height={46} loading="lazy" />
            <a
              href="/join"
              className={CLS.btn + " text-white font-semibold border"}
              style={{
                background: GRAD.brand(),
                borderColor: "rgba(255,255,255,.25)",
                boxShadow: `0 6px 0 ${shade(BRAND.PURPLE_DARK, -20)}, 0 18px 40px ${hexA(BRAND.PURPLE_LIGHT,.28)}`,
              }}
            >
              Enroll Today
            </a>
            <Image
              src="/arrow_left.webp"
              alt="Arrow right"
              width={46}
              height={46}
              loading="lazy"
              className="-scale-x-100"
            />
          </div>

          {/* Enrolled pill */}
          <div
            className="mx-auto flex max-w-max items-center gap-3 rounded-full px-3.5 py-2 shadow-sm ring-1 ring-white/15"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex -space-x-2">
              <Avatar src="/avatars/user1.webp" />
              <Avatar src="/avatars/user2.webp" />
              <Avatar src="/avatars/user3.webp" />
              <Avatar src="/avatars/user4.webp" />
            </div>
            <span className="text-xs sm:text-sm text-white/90">
              <b>10,000</b>+ Students Enrolled
            </span>
          </div>

          {/* Compact ribbon to match video width */}
          <ValueRibbon />
        </div>
      </div>

      {/* Modal player */}
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={VIDEO_POSTER}
              controls
              playsInline
              preload="none"
              className="w-full h-auto"
            />
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 h-9 w-9 rounded-full grid place-items-center bg-white/90"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" stroke="#0b0d11" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ==================== VALUE RIBBON — compact to match video ==================== */
function ValueRibbon() {
  const items: Array<{ value: string; label: string; icon: "trophy" | "pair" | "users" }> = [
    { value: "10K+", label: "Success Stories", icon: "trophy" },
    { value: "5+",   label: "Pairs Traded",    icon: "pair"   },
    { value: "5K+",  label: "Active Members",  icon: "users"  },
  ];

  return (
    <div className="w-full">
      <div
        className="mx-auto w-full max-w-4xl rounded-2xl p-[1px]"  /* ← matches video width */
        style={{
          background: `linear-gradient(135deg, ${hexA('#6d28d9', .9)}, ${hexA('#a78bfa', .9)} 45%, ${hexA('#f5c147', .9)})`,
          boxShadow: `0 10px 28px ${hexA(BRAND.PURPLE_LIGHT,.20)}`
        }}
      >
        <div
          className="rounded-2xl ring-1 ring-white/10 overflow-hidden"
          style={{ background: "linear-gradient(180deg, rgba(20,18,28,.86), rgba(14,13,18,.86))" }}
        >
          <div className="grid grid-cols-3">
            {items.map((it, i) => (
              <RibbonCell key={i} value={it.value} label={it.label} icon={it.icon} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RibbonCell({
  value,
  label,
  icon,
  index,
}: {
  value: string;
  label: string;
  icon: "trophy" | "pair" | "users";
  index: number;
}) {
  const hairline =
    "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.16) 50%, rgba(255,255,255,0))";

  return (
    <div
      className="relative px-4 py-5 text-center" /* ← tighter padding */
      style={{
        background: "radial-gradient(500px 180px at 50% 8%, rgba(167,139,250,.08), rgba(167,139,250,0))",
      }}
    >
      {index > 0 && (
        <div className="absolute left-0 top-4 bottom-4 w-px hidden md:block" style={{ background: hairline }} />
      )}

      {/* smaller badge */}
      <div
        className="mx-auto grid h-9 w-9 place-items-center rounded-xl"
        style={{
          background: `conic-gradient(from 210deg, ${hexA('#f5c147', .7)}, ${hexA('#6d28d9', .7)}, ${hexA('#a78bfa', .7)})`,
          boxShadow: `0 8px 18px ${hexA(BRAND.PURPLE_LIGHT,.24)}`,
        }}
      >
        <div className="h-8 w-8 grid place-items-center rounded-lg bg-black/75 ring-1 ring-white/10">
          {icon === "trophy" && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 5h12v3a6 6 0 0 1-12 0V5Z" stroke="white" strokeWidth="1.4"/>
              <path d="M18 5h3v1a4 4 0 0 1-4 4" stroke="white" strokeWidth="1.4"/>
              <path d="M6 5H3v1a4 4 0 0 0 4 4" stroke="white" strokeWidth="1.4"/>
              <path d="M12 14v3M9 20h6" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          )}
          {icon === "pair" && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 16l5-5 4 4 7-7" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="2" stroke="white" strokeWidth="1.4"/>
              <circle cx="18" cy="10" r="2" stroke="white" strokeWidth="1.4"/>
            </svg>
          )}
          {icon === "users" && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M16 11a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z" stroke="white" strokeWidth="1.4"/>
              <path d="M4 20a6 6 0 0 1 16 0" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          )}
        </div>
      </div>

      {/* smaller type */}
      <div className="mt-2 text-xl md:text-2xl font-extrabold leading-none text-white">{value}</div>
      <div className="mt-1 text-[12.5px] md:text-sm text-white/85">{label}</div>
    </div>
  );
}



/* =============================================================================
   ACTION INTRO
   ========================================================================== */
function ActionIntro() {
  return (
    <section id="info" className="relative bg-white pt-12 pb-12 md:pt-16 md:pb-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <p className={`${CLS.smallCaps} text-purple-800/90`}>T A K E &nbsp; A C T I O N</p>
          <h2 className="mt-3 text-[40px] md:text-[52px] font-extrabold leading-tight">Get Paid And Learn</h2>

          <div className="mt-5 space-y-4 text-[15.5px] leading-7 text-neutral-800">
            <p>We share the market outlooks every morning at 9 a.m. — bias, zones, timing.</p>
            <p>Once a trade presents itself, we share it with you.</p>
            <p>All you have to do is Copy the signal, Place the trade, Follow the updates.<b>That’s it.</b></p>
            <p>You will receive new reports whenever the market shifts — so you can stay up to date.</p>
            <p>With this structure, you start to <b>generate money and learn the strategy at the same time.</b></p>
            <p>Win-Win scenario.</p>
            <p>Most of our students profit <b>within hours.</b></p>
          </div>

          <a href="/join" className="mt-6 inline-block rounded-md px-6 py-3 text-white font-semibold shadow-lg" style={{ background: GRAD.brand() }}>
            Enroll Today — Start Earning
          </a>
        </div>

        <div className="relative">
          <div className="absolute -left-8 -top-10 h-64 w-64 rounded-full opacity-30 blur-3xl" style={{ background: `radial-gradient(circle, ${hexA(BRAND.PURPLE_LIGHT,.33)}, transparent 60%)` }} />
          <Image src="/phone1.webp" alt="Master Room app preview" width={520} height={980} className="relative mx-auto select-none drop-shadow-2xl" priority />
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   TOOLS PATH (timeline with arrow) — with per-row images
   ========================================================================== */
function ToolsPathSection() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // constants
  const LEFT_ON_SMALL_UNTIL = 1024;
  const LEFT_OFFSET = 28; // mobile arrow gutter (lane)
  const ctaBg = 'linear-gradient(135deg, #6d28d9, #8b5cf6)';

  // ORDER: phone.webp (top) → mac.webp (middle) → help.webp (bottom)
  const rows = useMemo(
    () => [
      {
        id: "r1",
        leftMd: 320,
        leftLg: 360,
        imgSrc: "/phone.webp",
        imgAlt: "Phone UI preview",
        padClass: "p-3 md:p-4 lg:p-6", // ✅ unchanged (was already right)
        feature: {
          iconSrc: "/profits.svg",
          title: "Profitable Trade Setups",
          bullets: [
            "Precise entries with SL/TP and RR targets",
            "Live session alerts so you don’t miss moves",
            "Transparent tracking: win rate, RR, payouts",
          ],
        },
      },
      {
        id: "r2",
        leftMd: 340,                   // ✅ taller to boost presence
        leftLg: 380,
        imgSrc: "/mac.webp",
        imgAlt: "Mac dashboard preview",
        padClass: "p-1.5 md:p-2 lg:p-3", // ✅ tighter padding → bigger image
        feature: {
          iconSrc: "/strategy.svg",
          title: "Proven Strategy, Not Luck",
          bullets: [
            "One strategy refined over years (repeatable)",
            "Checklist: structure → confirmation → execution",
            "Strict risk model that protects capital",
          ],
        },
      },
      {
        id: "r3",
        leftMd: 300,                   // ✅ slightly shorter
        leftLg: 330,
        imgSrc: "/help.webp",
        imgAlt: "Help and support preview",
        padClass: "p-4 md:p-6 lg:p-8", // ✅ more padding → smaller image
        feature: {
          iconSrc: "/support.svg",
          title: "Direct Support From Range",
          bullets: [
            "1:1 chart reviews and corrections",
            "Fast answers on entries, management, psychology",
            "Weekly action steps & accountability",
          ],
        },
      },
    ],
    []
  );

  /* progress along the section (0..1) */
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const el = timelineRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const denom = Math.max(rect.height - vh, 1);
      const p = Math.min(1, Math.max(0, -rect.top / denom));
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* arrow spring */
  const [arrowY, setArrowY] = useState(0);
  const [arrowTilt, setArrowTilt] = useState(0);
  const velRef = useRef<number>(0);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const K = 16;
    const D = 2 * Math.sqrt(K);

    let raf = 0;
    const step = (ts: number) => {
      const lineH =
        lineRef.current?.clientHeight ?? timelineRef.current?.clientHeight ?? 0;
      const pad = 18;
      const minY = pad;
      const maxY = Math.max(lineH - pad, pad);
      const targetY = minY + (maxY - minY) * progress;

      const last = lastTsRef.current ?? ts;
      const dt = Math.min((ts - last) / 1000, 0.033);
      lastTsRef.current = ts;

      setArrowY((x) => {
        const vPrev = velRef.current;
        const a = K * (targetY - x) - D * vPrev;
        const v = vPrev + a * dt;
        velRef.current = Math.abs(v) < 0.002 ? 0 : v;

        let next = x + v * dt;
        if (next < minY) {
          next = minY;
          velRef.current = 0;
        } else if (next > maxY) {
          next = maxY;
          velRef.current = 0;
        }
        setArrowTilt(Math.max(-8, Math.min(8, v * 120)));
        return next;
      });

      raf = window.requestAnimationFrame(step);
    };

    raf = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(raf);
  }, [progress]);

  /* compute X for the vertical line & arrow */
  const [tlx, setTlx] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const computeX = () => {
      const tl = timelineRef.current;
      const gut = gutterRef.current;
      const cont = containerRef.current;
      if (!tl) return;

      const tlRect = tl.getBoundingClientRect();
      let x: number;

      if (window.innerWidth < LEFT_ON_SMALL_UNTIL && cont) {
        const contRect = cont.getBoundingClientRect();
        x = contRect.left - tlRect.left + LEFT_OFFSET;
      } else if (gut) {
        const gutRect = gut.getBoundingClientRect();
        x = gutRect.left - tlRect.left + gutRect.width / 2;
      } else {
        x = tlRect.width / 2;
      }
      setTlx(x);
    };

    computeX();

    const ro = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(computeX)
      : null;

    if (ro) {
      if (timelineRef.current) ro.observe(timelineRef.current);
      if (gutterRef.current) ro.observe(gutterRef.current);
      if (containerRef.current) ro.observe(containerRef.current);
    }

    window.addEventListener("resize", computeX, { passive: true });
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", computeX);
    };
  }, [LEFT_ON_SMALL_UNTIL, LEFT_OFFSET]);

  return (
    <section className="relative w-full bg-white text-neutral-900">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeSlideUp { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform: translateY(0); } }
            .card-glow { box-shadow: 0 8px 30px rgba(0,0,0,.06), inset 0 0 0 1px rgba(109,40,217,.08); }
            .card-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 34px rgba(0,0,0,.08), inset 0 0 0 1px rgba(109,40,217,.10); }
            .headline-grad { background: linear-gradient(90deg,#111,#6d28d9 70%,#111); -webkit-background-clip:text; background-clip:text; color: transparent; }
            .inner-sep { background: linear-gradient(90deg, rgba(0,0,0,.06), rgba(0,0,0,.00) 30%, rgba(0,0,0,.00) 70%, rgba(0,0,0,.06)); height:1px; }

            /* Premium pill button (gradient ring, soft lift) */
            .pill {
              border: 1px solid transparent;
              background:
                linear-gradient(#ffffff,#ffffff) padding-box,
                linear-gradient(135deg, rgba(109,40,217,.45), rgba(167,139,250,.38), rgba(245,193,71,.35)) border-box;
              border-radius: 9999px;
              transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
              box-shadow: 0 6px 18px rgba(0,0,0,.06);
            }
            .pill:hover { transform: translateY(-1px); box-shadow: 0 10px 22px rgba(0,0,0,.08); }
            .pill-bullet { display:flex; align-items:center; gap:.75rem; padding:1rem 1.2rem; }
            .pill-row { display:flex; flex-direction:column; gap:.9rem; }
            @media (min-width: 768px){
              .pill-row { gap: 1rem; }
            }
          `,
        }}
      />

      <div
        ref={containerRef}
        className="mx-auto max-w-7xl px-4 pt-12 pb-12 md:pt-16 md:pb-16 md:px-6 lg:px-8"
      >
        <header className="mb-12 text-center">
          <p className="uppercase tracking-[.22em] text-xs text-neutral-500">
            A step-by-step path
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl headline-grad">
            Tools To Maximize Your Income
          </h2>
        </header>

        {/* Timeline area */}
        <div ref={timelineRef} className="relative">
          {/* faint rail glow */}
          <div
            className="pointer-events-none absolute top-0 h-full w-[26px]"
            style={{
              left: `${tlx - 13}px`,
              background:
                "radial-gradient(12px 240px at 50% 50%, rgba(109,40,217,0.10), rgba(109,40,217,0) 70%)",
            }}
            aria-hidden={true}
          />

          {/* vertical line */}
          <div
            ref={lineRef}
            className="pointer-events-none absolute top-0 h-full w-px"
            style={{
              left: `${tlx}px`,
              background:
                "linear-gradient(180deg, rgba(0,0,0,.08) 0%, rgba(109,40,217,.45) 50%, rgba(0,0,0,.08) 100%)",
              boxShadow: "0 0 22px rgba(109,40,217,.26)",
            }}
            aria-hidden={true}
          />

          {/* arrow */}
          <div
            className="pointer-events-none absolute z-10 will-change-transform"
            style={{
              left: `${tlx}px`,
              top: 0,
              transform: `translate3d(-50%, ${arrowY}px, 0) rotate(${arrowTilt}deg)`,
            }}
            aria-hidden={true}
          >
            <PathArrowIcon />
          </div>

          {/* MOBILE SPACING: arrow lane + even vertical rhythm */}
          <div className="pl-[56px] pr-3 py-10 md:pl-0 md:pr-0 md:py-0">
            {/* 3-column layout: LEFT | GUTTER | RIGHT */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] md:gap-12">
              {rows.map((r, idx) => (
                <Fragment key={r.id}>
                  {/* LEFT IMAGE */}
                  <PathFadeIn>
                    <PathTallImage
                      mdH={r.leftMd}
                      lgH={r.leftLg}
                      imgSrc={r.imgSrc}
                      imgAlt={r.imgAlt}
                      padClass={r.padClass}
                      priority={idx === 0}
                    />
                  </PathFadeIn>

                  {/* GUTTER (center) */}
                  <div ref={idx === 0 ? gutterRef : undefined} />

                  {/* RIGHT TEXT — header + 3 pill bubbles */}
                  <PathFadeIn delay={0.06}>
                    <PathRightCell mdH={r.leftMd} lgH={r.leftLg}>
                      <PathFeatureGroup
                        iconSrc={r.feature.iconSrc}
                        title={r.feature.title}
                        bullets={r.feature.bullets}
                      />
                    </PathRightCell>
                  </PathFadeIn>
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* CTA stays full-width on mobile, centered on desktop */}
        <div className="mt-8 flex justify-center">
          <a
            href="/join"
            className="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-[15.5px] font-semibold md:w-auto md:rounded-[14px] md:px-6 md:py-3 md:text-[16px]"
            style={{
              color: '#ffffff',
              background: ctaBg,
              boxShadow: '0 10px 26px rgba(109,40,217,.28)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            Enroll Today
          </a>
        </div>

        {/* subtle buffer under CTA only on mobile */}
        <div className="h-6 md:hidden" />
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */
function PathFadeIn({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setShow(true);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={show ? "animate-[fadeSlideUp_.5s_ease_forwards]" : "opacity-0"}
      style={{ animationDelay: show ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  );
}

function PathRightCell({
  children,
  mdH,
  lgH,
}: {
  children: ReactNode;
  mdH: number;
  lgH: number;
}) {
  return (
    <div className="flex">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width:768px){ .row-md-${mdH}{height:${mdH}px} }
            @media (min-width:1024px){ .row-lg-${lgH}{height:${lgH}px} }
          `,
        }}
      />
      <div className={`row-md-${mdH} row-lg-${lgH} w-full flex items-center`}>
        {children}
      </div>
    </div>
  );
}

/* accepts per-row image — perfectly centered */
function PathTallImage({
  mdH,
  lgH,
  imgSrc,
  imgAlt,
  padClass = "p-3 md:p-4 lg:p-6",
  priority = false,
}: {
  mdH: number;
  lgH: number;
  imgSrc: string;
  imgAlt?: string;
  padClass?: string;   // ✅ NEW: control visual size without changing layout
  priority?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white card-glow transition-transform">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width:768px){ .ph-md-${mdH}{height:${mdH}px} }
            @media (min-width:1024px){ .ph-lg-${lgH}{height:${lgH}px} }
          `,
        }}
      />
      <div className={`ph-md-${mdH} ph-lg-${lgH} min-h-[260px] md:min-h-0 relative`}>
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(1000px_600px_at_-10%_-20%,rgba(109,40,217,.12),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(109,40,217,.06),rgba(109,40,217,.02))]" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:linear-gradient(to-bottom,rgba(255,255,255,.18),transparent_60%)] bg-white/40" />

        {/* Next/Image fill + object-contain so it auto-fits the card */}
        <div className={`absolute inset-0 flex items-center justify-center ${padClass}`}>
          <Image
            src={imgSrc}
            alt={imgAlt ?? "feature preview"}
            fill
            className="object-contain pointer-events-none select-none"
            sizes="(min-width: 1024px) 33vw, 90vw"
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}

/* ===== Right column: big icon (kept) + toned-down headline + pill bubbles ===== */
function PathFeatureGroup({
  iconSrc,
  title,
  bullets,
}: {
  iconSrc: string; // e.g. "/profits.svg"
  title: string;
  bullets: string[];
}) {
  return (
    <div className="w-full md:max-w-[640px]">
      {/* Top row: icon + headline */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={iconSrc}
            alt=""
            width={64}
            height={64}
            className="shrink-0 w-9 h-9 md:w-12 md:h-12 lg:w-14 lg:h-14"
          />
          <h3 className="font-extrabold leading-tight headline-grad text-[20px] md:text-[30px] lg:text-[36px] tracking-[-0.01em]">
            {title}
          </h3>
        </div>
      </div>

      <div className="pill-row">
        {bullets.map((b, i) => (
          <div key={i} className="pill">
            <div className="pill-bullet">
              <Image
                src="/tick.svg"
                alt=""
                width={20}
                height={20}
                className="mt-0.5 opacity-80 shrink-0"
              />
              <span className="text-[14px] md:text-[15.5px] text-neutral-800 leading-snug">
                {b}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PathArrowIcon() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-md"
        style={{ boxShadow: "0 0 36px rgba(109,40,217,0.28)" }}
        aria-hidden={true}
      />
      <div className="grid h-10 w-10 place-items-center rounded-full bg-white/90 backdrop-blur text-neutral-900 shadow-[0_10px_30px_rgba(0,0,0,.08),0_0_0_6px_rgba(109,40,217,.12)]">
        <Image
          src="/arrowdown.webp"
          alt="scroll arrow"
          width={20}
          height={20}
          draggable={false}
        />
      </div>
    </div>
  );
}

/* =============================================================================
   STATS — Results Billboard (dark glass, conversion-first)
   ========================================================================== */
function StatsSection() {
  const hasStats = Array.isArray(ALL_STATS) && ALL_STATS.length > 0;

  // order newest -> oldest
  const monthIndex = (m: string) => MONTH_ORDER.indexOf(m);
  const ordered = hasStats
    ? [...ALL_STATS].sort(
        (a, b) => b.year - a.year || monthIndex(b.month) - monthIndex(a.month)
      )
    : [];

  const lastTwo = ordered.slice(0, 2);

  // quick aggregates
  const totalTrades = hasStats ? ALL_STATS.reduce((t, m) => t + (m.trades || 0), 0) : 0;
  const totalRR     = hasStats ? ALL_STATS.reduce((t, m) => t + (m.rr || 0), 0)     : 0;
  const avgWin      = hasStats ? Math.round(ALL_STATS.reduce((t, m) => t + (m.winRatePct || 0), 0) / Math.max(1, ALL_STATS.length)) : 0;

  // trailing 12 months “headline” gain (simple sum keeps it optimistic & consistent with your current data model)
  const trailing12 = ordered.slice(0, 12);
  const gain12     = trailing12.length ? Math.round(trailing12.reduce((t, m) => t + (m.gainPct || 0), 0) * 10) / 10 : 0;

  // details reveal by year
  const years = Array.from(new Set(ordered.map((s) => s.year))).sort((a, b) => b - a);
  const [open, setOpen] = React.useState(false);
  const [yearsShown, setYearsShown] = React.useState<number[]>(years.length ? [years[0]] : []);
  const showNextYear = () => {
    const next = years.find((y) => !yearsShown.includes(y));
    if (typeof next === "number") setYearsShown((ys) => [...ys, next].sort((a, b) => b - a));
  };

  if (!hasStats) return null;

  return (
    <section id="stats" className="relative isolate -mt-8 overflow-hidden py-18">
      {/* Dark glass band (distinct from page) */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(1200px 500px at 20% -10%, ${hexA(BRAND.PURPLE, .25)}, transparent 60%),
            radial-gradient(1200px 500px at 80% 0%, ${hexA(BRAND.PURPLE_DARK, .3)}, transparent 60%),
            linear-gradient(180deg, #0b0d11, #0b0d11)
          `,
        }}
      />
      {/* soft top/bottom fades so it blends with neighbors */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/0 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/0 via-black/10 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 text-white">
        {/* Headline row — one jaw-drop number + micro proof chips */}
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className={`${CLS.smallCaps} text-white/60`}>V E R I F I E D &nbsp; R E S U L T S</p>
            <h2
              className="mt-2 text-4xl font-extrabold leading-tight md:text-[44px]"
              style={{
                background: `linear-gradient(90deg,#fff, ${BRAND.PURPLE_LIGHT} 65%, #b3a6ff)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                backgroundClip: "text",
              }}
            >
              Consistency You Can Trust
            </h2>
            <p className="mt-3 max-w-2xl text-[15.5px] leading-7 text-white/70">
               Track the performance of the Master Room over the years.
            </p>
          </div>

          {/* Headline KPI */}
          <div
            className="rounded-2xl border p-5 backdrop-blur"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))",
              borderColor: hexA("#fff", 0.12),
              boxShadow: "0 10px 40px rgba(0,0,0,.35)",
            }}
          >
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/60">
              Trailing 12-Month Gain
            </div>
            <div className="mt-2 text-[42px] font-black leading-none">
              <span
                className="rounded-lg px-2"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.PURPLE_DARK}, ${BRAND.PURPLE})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  backgroundClip: "text",
                }}
              >
                {gain12 >= 0 ? `+${gain12}%` : `${gain12}%`}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-white/80">
              <MiniProof label="Avg Win Rate" value={`${avgWin}%`} />
              <MiniProof label="Total Trades" value={totalTrades.toLocaleString()} />
            </div>
          </div>
        </div>

        {/* Latest 2 months — compact spotlight cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {lastTwo.map((m, i) => (
            <SpotlightCard key={`${m.year}-${m.month}`} m={m} newest={i === 0} />
          ))}
        </div>

        {/* Secondary KPIs row (quiet) */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <QuietKPI label="Total RR" value={`${totalRR} RR`} />
          <QuietKPI label="Average Win Rate" value={`${avgWin}%`} />
          <QuietKPI label="Trades Logged" value={totalTrades.toLocaleString()} />
        </div>

        {/* CTA + details toggle */}
        <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <a
            href="/join"
            className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-black transition hover:brightness-110"
            style={{
              background: "#ffffff",
              boxShadow: "0 10px 30px rgba(0,0,0,.35)",
              border: `1px solid ${hexA("#fff", 0.18)}`,
            }}
          >
            Copy Our Trades — Start Today
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:brightness-[1.05] active:translate-y-[1px]"
            style={{
              background: GRAD.brand(0.95),
              border: `1px solid ${hexA("#fff", 0.16)}`,
              boxShadow: "0 8px 26px rgba(66,54,154,.45)",
            }}
          >
            {open ? "Hide Detailed Stats" : "Show Detailed Stats"}
          </button>
        </div>

        {/* Year-by-year details (glass list) */}
        {open && (
          <div className="mt-10">
            {yearsShown.map((yr) => {
              const list = ordered.filter((s) => s.year === yr);
              return (
                <div key={yr} className="mt-8">
                  <div className="mb-4 flex items-center gap-4">
                    <h3 className="text-lg font-extrabold text-white">{yr} Breakdown</h3>
                    <div className="h-px flex-1 rounded-full bg-white/10" />
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {list.map((m) => (
                      <MonthGlass key={`${m.year}-${m.month}`} m={m} />
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="mt-8 flex justify-center">
              {years.some((y) => !yearsShown.includes(y)) ? (
                <button
                  onClick={showNextYear}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:brightness-[1.05] active:translate-y-[1px]"
                  style={{
                    background: GRAD.brand(0.95),
                    border: `1px solid ${hexA("#fff", 0.16)}`,
                    boxShadow: "0 8px 26px rgba(66,54,154,.45)",
                  }}
                >
                  Show Next Year
                </button>
              ) : (
                <p className="text-center text-xs text-white/50">
                  End of history.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* --------------------------------- Bits ---------------------------------- */

function MiniProof({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border px-3 py-2"
      style={{
        borderColor: hexA("#fff", 0.12),
        background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))",
      }}
    >
      <div className="text-[10px] uppercase tracking-[0.22em] text-white/60">{label}</div>
      <div className="mt-1 text-lg font-extrabold text-white">{value}</div>
    </div>
  );
}

/* Spotlight card — newest month pop, trimmed metrics */
function SpotlightCard({ m, newest }: { m: MonthStat; newest?: boolean }) {
  const sign = m.gainPct >= 0 ? "+" : "";

  return (
    <article className="transition will-change-transform hover:-translate-y-[1px]">
      <div
        className="rounded-3xl p-[1px]"
        style={{
          background: `linear-gradient(135deg, ${hexA(BRAND.PURPLE_LIGHT, .30)}, ${hexA(BRAND.PURPLE_DARK, .40)})`,
          boxShadow: "0 10px 40px rgba(0,0,0,.45)",
        }}
      >
        <div
          className="rounded-3xl border p-6"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.03))",
            borderColor: hexA("#fff", 0.14),
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-widest text-white/60">
                {m.month} {m.year}
              </div>
              <div className="mt-1 text-3xl font-black leading-tight text-white">
                {sign}{m.gainPct}%
              </div>
              <div className="mt-2 text-xs text-white/60">Monthly gain</div>
            </div>

            <span
              className="rounded-full px-2 py-1 text-[10px] font-semibold tracking-wide ring-1"
              style={{
                color: newest ? "#0b0d11" : "#fff",
                background: newest ? "#fff" : "rgba(255,255,255,.04)",
                borderColor: hexA("#fff", 0.16),
                boxShadow: newest ? "0 8px 22px rgba(0,0,0,.25)" : "none",
              }}
            >
              {newest ? "NEWEST" : "RECENT"}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
            <MiniGlass label="Trades" value={m.trades} />
            <MiniGlass label="Win rate" value={`${m.winRatePct}%`} accent />
            <MiniGlass label="RR total" value={m.rr} />
          </div>
        </div>
      </div>
    </article>
  );
}

/* Month card inside the details area */
function MonthGlass({ m }: { m: MonthStat }) {
  const sign = m.gainPct >= 0 ? "+" : "";

  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))",
        borderColor: hexA("#fff", 0.12),
      }}
    >
      <div className="flex items-start justify-between">
        <div className="text-xs font-medium uppercase tracking-widest text-white/65">
          {m.month} {m.year}
        </div>
        <div
          className="rounded-full px-2 py-[2px] text-xs font-semibold text-white ring-1"
          style={{ borderColor: hexA("#fff", 0.16), background: "rgba(255,255,255,.04)" }}
        >
          {sign}{m.gainPct}%
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <MiniGlass label="Trades" value={m.trades} />
        <MiniGlass label="Win rate" value={`${m.winRatePct}%`} accent />
        <MiniGlass label="RR total" value={m.rr} />
      </div>
    </div>
  );
}

/* tiny metric tile used in spotlights & months (dark glass) */
function MiniGlass({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-lg border p-3"
      style={{
        borderColor: hexA("#fff", 0.12),
        background: accent
          ? `linear-gradient(180deg, ${hexA(BRAND.PURPLE_LIGHT, .22)}, ${hexA(BRAND.PURPLE_DARK, .18)})`
          : "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))",
      }}
    >
      <div className="text-[10px] uppercase tracking-[0.22em] text-white/65">{label}</div>
      <div className="mt-1 text-lg font-extrabold text-white">{value}</div>
    </div>
  );
}

/* quiet KPI for the secondary row */
function QuietKPI({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-2xl border p-4 backdrop-blur"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))",
        borderColor: hexA("#fff", 0.12),
      }}
    >
      <div className="text-[11px] uppercase tracking-widest text-white/60">{label}</div>
      <div className="mt-2 text-[24px] font-extrabold leading-none text-white">{value}</div>
    </div>
  );
}


/* =============================================================================
   PAIRS
   ========================================================================== */
type FeatureCard = {
  key: string;
  title: string;
  blurb: string;
  img?: string;
  tone?: 'blue' | 'gold' | 'purple' | 'teal' | 'slate' | 'red';
};

function PairsSection() {
  const items: FeatureCard[] = [
    { key: 'eurusd', title: 'EUR/USD', blurb: 'Deep liquidity, tight spreads — clean structure through London and New York.', img: '/pairs/eurusd.webp', tone: 'blue' },
    { key: 'gold',   title: 'GOLD (XAU/USD)', blurb: 'High volatility with sharp session moves — respect levels, expect speed.', img: '/pairs/gold.webp', tone: 'gold' },
    // swapped order starts here:
    { key: 'euraud', title: 'EUR/AUD', blurb: 'Range-prone cross — confluence and mean reversion show up day after day.', img: '/pairs/euraud.webp', tone: 'red' },
    { key: 'audusd', title: 'AUD/USD', blurb: 'Commodity-tied flows — clean trends in Asia, risk sentiment drives momentum.', img: '/pairs/audusd.webp', tone: 'slate' },
    // end swap
    { key: 'eurjpy', title: 'EUR/JPY', blurb: 'Momentum-heavy — breaks and runs around session opens; manage speed and pullbacks.', img: '/pairs/eurjpy.webp', tone: 'purple' },
    // NEW: Coming Soon
    { key: 'comingsoon', title: 'Coming Soon', blurb: 'New pairs are coming soon to the Master Room — stay tuned.', img: '/pairs/coming-soon.webp', tone: 'teal' },
  ];

  return (
    <section id="pairs" className="relative bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className={`text-center ${CLS.smallCaps} text-neutral-500`}>P A I R S &nbsp; W E &nbsp; T R A D E</p>
        <h2 className="mt-2 text-center text-3xl font-extrabold md:text-5xl">Pairs We Trade Daily</h2>
        <CardsScroller items={items} tall />
      </div>
    </section>
  );
}

function CardsScroller({ items, tall = false }: { items: FeatureCard[]; tall?: boolean }) {
  const PER_PAGE = 3;
  const totalPages = Math.ceil(items.length / PER_PAGE);
  const [page, setPage] = useState(0);
  const start = page * PER_PAGE;
  const view = items.slice(start, start + PER_PAGE);

  const goLeft  = () => setPage((p) => Math.max(0, p - 1));
  const goRight = () => setPage((p) => Math.min(totalPages - 1, p + 1));
  const goTo    = (k: number) => setPage(Math.min(Math.max(0, k), totalPages - 1));

  return (
    <div className="relative mt-8">
      <button
        type="button"
        aria-label="Previous"
        onClick={goLeft}
        disabled={page === 0}
        className={`pointer-events-auto absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border bg-white/90 p-2 shadow-sm md:flex ${
          page === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white'
        }`}
        style={{ borderColor: BRAND.RING }}
      >
        ‹
      </button>

      <button
        type="button"
        aria-label="Next"
        onClick={goRight}
        disabled={page === totalPages - 1}
        className={`pointer-events-auto absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border bg-white/90 p-2 shadow-sm md:flex ${
          page === totalPages - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white'
        }`}
        style={{ borderColor: BRAND.RING }}
      >
        ›
      </button>

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        {view.map((it) => (<FeatureTile key={it.key} item={it} tall={tall} />))}
      </div>

      <div className="mt-6 flex justify-center">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => goTo(k)}
              aria-label={`Go to section ${k + 1}`}
              className={`h-[10px] w-8 rounded-full transition ${
                page === k ? 'bg-neutral-900' : 'bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureTile({ item, tall }: { item: FeatureCard; tall?: boolean }) {
  return (
    <article
      className={`${CLS.card} group border transition hover:-translate-y-0.5 hover:shadow-lg`}
      style={{ border: `1px solid ${BRAND.CARD_BORDER}` }}
    >
      <div className={`relative w-full overflow-hidden rounded-t-2xl ${tall ? 'h-56 md:h-64' : 'h-40 md:h-48'}`}>
        {item.img ? (
          <Image
            src={item.img}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 320px, 420px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            priority={item.key === 'eurusd'}
          />
        ) : (
          <span className="select-none text-2xl font-extrabold tracking-wide text-black/60">
            {item.title.split(' ')[0]}
          </span>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_30%,transparent_70%,rgba(0,0,0,0.15))]" />
      </div>
      <div className="space-y-2 p-5">
        <h3 className="text-xl font-extrabold">{item.title}</h3>
        <p className="text-sm leading-6 text-neutral-600">{item.blurb}</p>
      </div>
    </article>
  );
}

/* ============================================================================
   ProgramSlices — desktop pinned; mobile extra top/bottom space
   ========================================================================== */

function ProgramSlices() {
  return (
    <section id="program-slices" className="relative w-full">
      <SliceBand
        variant="dark"
        imageSide="right"
        imageSrc="/SEC1.webp"
        imgRatio={0.64}
        title="Start Making Money Trading"
        wrapMode="twoLinesMd"
        bullets={[
          'Copy signals with entry, stop, and targets.',
          'Clear management: partials, breakeven, risk management.',
          'No experience required — follow the plan and execute.',
        ]}
      />
      <SliceBand
        variant="light"
        imageSide="left"
        imageSrc="/SEC2.webp"
        imgRatio={0.82}
        stage={false}
        imgGap="md:mr-20"
        title="Earn While You Learn"
        wrapMode="twoLinesMd"
        bullets={[
          'Daily updates so you always know the plan.',
          'Adjustments posted as price develops — no second-guessing.',
          'Learn the strategy as you execute it, step by step.',
        ]}
      />
      <SliceBand
        variant="dark"
        imageSide="right"
        imageSrc="/SEC3.webp"
        imgRatio={0.64}
        stage={false}
        title="Access To Multi-Millionaires"
        wrapMode="twoLinesMd"
        bullets={[
          'Mentors are hyper-successful experts in the trading field.',
          'Get mentored every step of your journey.',
          '24/7 live support from the team.',
        ]}
      />
    </section>
  );
}

/* ----------------------------------------------------------------------------
   Full-bleed band with cut corners
   - MOBILE: Image (1) → Copy (2); bigger gaps & more top/bottom padding
   - DESKTOP: Pinned columns + same spacing as before
---------------------------------------------------------------------------- */

type BandProps = {
  variant: 'dark' | 'light';
  imageSide: 'left' | 'right';
  imageSrc: string;
  title: string;
  bullets: string[];
  imgRatio?: number;
  stage?: boolean;
  imgGap?: string;
  wrapMode?: 'twoLinesMd' | 'oneLineMd' | 'normal';
};

function SliceBand({
  variant,
  imageSide,
  imageSrc,
  title,
  bullets,
  imgRatio = 0.7,
  stage = true,
  imgGap,
  wrapMode = 'normal',
}: BandProps) {
  const isDark = variant === 'dark';
  const cut =
    'polygon(54px 0, 100% 0, 100% calc(100% - 54px), calc(100% - 54px) 100%, 0 100%, 0 54px)';

  const gapClass = imgGap ?? (imageSide === 'left' ? 'md:mr-16' : 'md:ml-16');

  const imgCol = imageSide === 'left' ? 'md:col-start-1' : 'md:col-start-2';
  const copyCol = imageSide === 'left' ? 'md:col-start-2' : 'md:col-start-1';
  const pinRow = 'md:row-start-1';

  return (
    <div className="my-8 md:my-8">
      <div
        className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] overflow-hidden"
        style={{
          clipPath: cut,
          background: isDark ? '#0b0d11' : '#ffffff',
          boxShadow: isDark ? '0 26px 70px rgba(0,0,0,0.42)' : 'none',
          border: isDark ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div
          className="
            relative mx-auto grid max-w-6xl grid-cols-1 items-center
            gap-10 px-6 pt-14 pb-16                   /* ⬅ extra top/bottom on mobile */
            sm:px-6
            md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12 md:px-8 md:pt-12 md:pb-12
          "
        >
          <div className={`order-1 self-center ${imgCol} ${pinRow} md:order-none`}>
            <SliceImage
              isDark={isDark}
              side={imageSide}
              src={imageSrc}
              imgRatio={imgRatio}
              stage={stage}
              gapClass={gapClass}
            />
          </div>

          <div className={`order-2 self-center ${copyCol} ${pinRow} md:order-none`}>
            <SliceCopy
              isDark={isDark}
              title={title}
              bullets={bullets}
              wrapMode={wrapMode}
              padClass={imageSide === 'left' ? 'md:pl-12 lg:pl-16' : 'md:pr-12 lg:pr-16'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
   Copy — mobile now left-aligned with ticks; desktop unchanged
---------------------------------------------------------------------------- */
function SliceCopy({
  isDark,
  title,
  bullets,
  padClass = '',
  wrapMode = 'normal',
}: {
  isDark: boolean;
  title: string;
  bullets: string[];
  padClass?: string;
  wrapMode?: 'twoLinesMd' | 'oneLineMd' | 'normal';
}) {
  const ctaBg = 'linear-gradient(135deg, #6d28d9, #8b5cf6)';

  const hWrap =
    wrapMode === 'twoLinesMd'
      ? 'md:max-w-[24ch]'
      : wrapMode === 'oneLineMd'
      ? 'md:whitespace-nowrap md:max-w-none'
      : '';

  const containerWidth = wrapMode === 'oneLineMd' ? 'md:max-w-none' : 'md:max-w-[640px]';

  return (
    <div className={`${padClass} relative z-10 min-w-0`}>
      {/* 👇 force left-align on mobile, keep text-left on desktop */}
      <div className={`mx-auto text-left ${containerWidth}`}>
        <h3
          className={`font-extrabold tracking-tight ${hWrap}`}
          style={{
            fontSize: 'clamp(28px, 6.2vw, 64px)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: isDark ? '#fff' : '#0a0a0a',
            wordBreak: 'break-word',
          }}
        >
          {title}
        </h3>

        <ul className="mt-6 space-y-4 text-[15.5px] leading-[1.75] md:text-[17px]">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex max-w-[64ch] items-start gap-2.5 md:max-w-[640px] md:gap-3"
              style={{ color: isDark ? 'rgba(255,255,255,0.92)' : '#111827' }}
            >
              <svg
                aria-hidden
                className="mt-[6px] h-4 w-4 flex-none"
                viewBox="0 0 20 20"
                fill="currentColor"
                style={{ color: isDark ? '#9ca3af' : '#111827' }}
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
                />
              </svg>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* CTA stays full-width on mobile, auto on desktop */}
        <a
          href="/join"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-[15.5px] font-semibold md:w-auto md:rounded-[14px] md:px-6 md:py-3 md:text-[16px]"
          style={{
            color: '#ffffff',
            background: ctaBg,
            boxShadow: '0 10px 26px rgba(109,40,217,.28)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          Enroll Today
        </a>

        {/* subtle buffer under CTA only on mobile */}
        <div className="h-6 md:hidden" />
      </div>
    </div>
  );
}


/* ----------------------------------------------------------------------------
   Image — unchanged except slightly larger mobile width
---------------------------------------------------------------------------- */

function SliceImage({
  isDark,
  side,
  src,
  imgRatio = 0.7,
  stage = true,
  gapClass,
}: {
  isDark: boolean;
  side: 'left' | 'right';
  src: string;
  imgRatio?: number;
  stage?: boolean;
  gapClass?: string;
}) {
  const W = 560;
  const H = Math.round(W * imgRatio);
  const justify = side === 'left' ? 'md:justify-self-start' : 'md:justify-self-end';

  const mobileBase = 'block h-auto w-[min(560px,92vw)] object-contain';
  const mobileShadow = isDark ? 'drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]' : 'drop-shadow-none';
  const desktopShadow = isDark ? 'md:drop-shadow-[0_28px_56px_rgba(0,0,0,0.45)]' : 'md:drop-shadow-none';

  const ImgEl = (
    <Image
      src={src}
      alt=""
      width={W}
      height={H}
      sizes="(min-width: 1024px) 44vw, (min-width: 768px) 50vw, 92vw"
      className={`${mobileBase} ${mobileShadow} md:w-[min(560px,44vw)] ${desktopShadow}`}
      priority={false}
    />
  );

  return (
    <div className={`mb-2 flex justify-center md:mb-0 ${justify} ${gapClass ?? ''} relative z-0`}>
      <div className="hidden w-full md:block">
        {stage ? (
          <div
            className="relative rounded-[18px]"
            style={{
              width: 'min(560px, 44vw)',
              background: isDark
                ? 'radial-gradient(110% 110% at 50% 12%, rgba(88,80,236,0.22), rgba(17,24,39,0) 60%)'
                : 'transparent',
            }}
          >
            {ImgEl}
          </div>
        ) : (
          ImgEl
        )}
      </div>
      <div className="md:hidden">{ImgEl}</div>
    </div>
  );
}

/* =============================================================================
   PRICING / CHOOSE PATH (beneath testimonials)
   ========================================================================== */
function ChoosePathSection() {
  return (
    <section id="pricing" className="relative bg-white pt-12 pb-12 md:pt-16 md:pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className={`text-center ${CLS.smallCaps} text-neutral-500`}>C H O O S E &nbsp; Y O U R &nbsp; P A T H</p>
        <h2 className="mt-1 text-center text-3xl font-extrabold md:text-5xl">Two Paths Lie Before You</h2>

        <div className="mx-auto mt-5 flex max-w-3xl items-center">
          <div className="h-[2px] flex-1 rounded-full bg-neutral-200" />
          <div className="mx-3 h-3 w-3 rounded-full" style={{ background: GRAD.brand(), boxShadow: `0 0 18px ${hexA(BRAND.PURPLE_LIGHT, .9)}` }} aria-hidden />
          <div className="h-[2px] flex-1 rounded-full" style={{ background: `linear-gradient(90deg,#e5e7eb, ${BRAND.PURPLE})` }} />
        </div>

        <div className="relative mt-10 grid grid-cols-1 items-stretch gap-8 md:grid-cols-[1fr_auto_1fr]">
          <div className="relative">
            <article className="group rounded-2xl border bg-neutral-100 p-8 shadow-sm md:p-10" style={{ border: `1px solid ${BRAND.CARD_BORDER}`, clipPath: 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)' }}>
              <div className="text-[11px] font-semibold tracking-[0.25em] text-neutral-500">PAY</div>
              <div className="mt-1 text-4xl font-extrabold md:text-[44px]">$10,000+</div>
              <p className="mt-4 text-[15.5px] leading-7 text-neutral-700">
  Waste years on BS courses, fake “gurus,” and losing signal rooms. All theory. No results. Keep guessing while your account bleeds.
</p>
              {/* Updated link to YouTube + opens in new tab */}
              <a
                href="https://youtu.be/yPP5bD8xVhg?si=yikOvbBGLPGCXAEA&t=7"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-md border bg-black px-5 py-3 text-sm font-semibold text-white"
                style={{ border: '1px solid rgba(0,0,0,0.8)' }}
              >
                Keep Losing
              </a>
            </article>
          </div>

          <div className="hidden items-center justify-center md:flex">
            <div className="flex h-16 w-16 items-center justify-center rounded-full text-sm font-bold"
                 style={{ background: 'white', border: '2px solid transparent', boxShadow: '0 6px 18px rgba(0,0,0,0.10)', backgroundImage: `linear-gradient(white, white), ${GRAD.brand()}`, backgroundOrigin: 'border-box', backgroundClip: 'content-box, border-box' }}>
              VS
            </div>
          </div>

          <div className="relative">
            <article className="group rounded-2xl border p-8 text-white shadow-[0_20px_40px_rgba(109,40,217,0.25)] md:p-10"
              style={{ border: `1px solid ${BRAND.CARD_BORDER}`, background: GRAD.brand(), clipPath: 'polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px)' }}>
              <div className="text-[11px] font-semibold tracking-[0.25em] text-white/85">PAY</div>
              <div className="mt-1 text-4xl font-extrabold md:text-[44px]">€79 / month</div>
              <p className="mt-4 text-[15.5px] leading-7 text-white/90">
                Copy signals with entry, stop, and targets. Learn a system with years of proof. Weekly live calls for clarity. <b>Your only job: execute.</b>
              </p>
              <a href="/join" className="mt-6 inline-block rounded-md bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100">
                Start Earning
              </a>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px]" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <span className="h-2 w-2 rounded-full bg-white/80" /><span className="font-medium">Cancel anytime</span>
              </div>
            </article>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-3xl text-center text-[13px] text-neutral-500">
          Access all pairs, weekly Q&amp;A, and the Master Room archive.
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   STUDENT WINS — strong top/bottom fades to white (TS-safe)
   ============================================================================ */
type TWin = {
  id: string;
  user: string;
  handle?: string;
  avatar?: string;        // kept in type for compatibility, unused now
  timestamp: string;
  text: string;           // kept in type for compatibility, unused now
  image?: string;
  memberSince?: string;
};

function StudentWinsSection() {
  const wins: TWin[] = [
    { id: "w1", user: "Banbbao", handle: "@ChampagnePapi", avatar: "/avatars/user1.webp", timestamp: "Yesterday 4:58 PM", text: "Followed the playbook to the letter. First real payout this week.", image: "/testimonials/1.webp", memberSince: "04/24" },
    { id: "w2", user: "EdizAbin", handle: "@Michal Esterka", avatar: "/avatars/user2.webp", timestamp: "Today 1:01 PM", text: "Started 20 days ago at 17 Made 3,750€ already.", image: "/testimonials/2.webp", memberSince: "07/24" },
    { id: "w3", user: "NinetyThree", handle: "@Joel Zamora", avatar: "/avatars/user3.webp", timestamp: "Yesterday 5:19 AM", text: "Upgraded to a 60ft yacht. The process works.", image: "/testimonials/3.webp", memberSince: "06/23" },
    { id: "w4", user: "AlexTheMarshal", handle: "@AlexFX", avatar: "/avatars/user4.webp", timestamp: "Today 1:42 PM", text: "Copywriting path → £120k total. Clear steps, real skills.", image: "/testimonials/4.webp", memberSince: "08/25" },
    { id: "w5", user: "ddanthemanjuice", handle: "@Ella", avatar: "/avatars/user5.webp", timestamp: "Last Thu 7:20 AM", text: "Payout received → $20,014.12.", image: "/testimonials/5.webp", memberSince: "02/25" },
    { id: "w6", user: "ChampagnePapi", handle: "@Mirko Coda", avatar: "/avatars/user6.webp", timestamp: "02/16/2024 12:15 AM", text: "AUDUSD runner printed. Clean execution.", image: "/testimonials/6.webp", memberSince: "01/24" },
    { id: "w7", user: "MartaG", handle: "@Alias", avatar: "/avatars/user7.webp", timestamp: "Today 9:03 AM", text: "Passed Phase 1 & 2 in 12 days. Risk table = game changer.", image: "/testimonials/7.webp", memberSince: "04/23" },
    { id: "w8", user: "Jamal", handle: "@Josh Mexey", avatar: "/avatars/user8.webp", timestamp: "Mon 6:44 PM", text: "First 10RR day sticking to the checklist. No emotions.", image: "/testimonials/8.webp", memberSince: "07/24" },
    { id: "w9", user: "Lucia", handle: "@Champagne Papi", avatar: "/avatars/user1.webp", timestamp: "Sun 11:02 AM", text: "€4,200 payout on prop split. Copied the entries exactly.", image: "/testimonials/9.webp", memberSince: "04/24" },
  ];

  const [mobileShowAll, setMobileShowAll] = React.useState(false);

  return (
    <section id="reviews" className="relative isolate overflow-hidden bg-white pt-12 pb-12 md:pt-16 md:pb-16">
      {/* brand glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(900px 420px at 50% -10%, ${hexA(BRAND.PURPLE_LIGHT, 0.10)}, transparent 60%)`,
        }}
      />
      {/* strong fades on top & bottom */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent z-10" />

      <div className="relative mx-auto max-w-6xl px-6 z-20">
        <p className={`text-center ${CLS.smallCaps} text-neutral-600`}>S T U D E N T &nbsp; W I N S</p>
        <h2 className="mt-1 text-center text-[32px] font-extrabold md:text-[42px]">Wins Inside the Master Room</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-neutral-600">
          This is what’s possible when you copy the trades and follow the plan.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wins.map((w, idx) => (
            <div key={w.id} className={idx >= 3 && !mobileShowAll ? "hidden md:block" : ""}>
              <StudentWinCard win={w} />
            </div>
          ))}
        </div>

        {/* Mobile-only "Show more" button */}
        <div className="mt-6 flex justify-center md:hidden">
          {!mobileShowAll && (
            <button onClick={() => setMobileShowAll(true)} className={CLS.btn} aria-label="Show more testimonials">
              Show more
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function StudentWinCard({ win }: { win: TWin }) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition will-change-transform hover:-translate-y-0.5"
      style={{ border: `1px solid ${BRAND.CARD_BORDER}` }}
    >
      {/* Proof image */}
      <div className="relative">
        {win.image && (
          <Image
            src={win.image}
            alt="proof"
            width={1200}
            height={900}
            className="h-auto w-full object-cover"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_35%,transparent_70%,rgba(0,0,0,0.18))]" />
      </div>

      {/* Meta row: handle, timestamp, member since */}
      <div className="border-t p-4" style={{ borderColor: BRAND.CARD_BORDER }}>
        <div className="flex items-center gap-3">
          {/* handle + timestamp */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate font-semibold">
                {win.handle ?? `@${win.user.replace(/\s+/g, '')}`}
              </span>
            </div>
            <div className="text-[11px] text-neutral-500">{win.timestamp}</div>
          </div>

          {/* member since badge */}
          {win.memberSince && (
            <span className="ml-auto rounded-md bg-neutral-900 px-2 py-1 text-[11px] font-semibold text-white">
              Member since {win.memberSince}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/* ============================================================================
   ROI helpers (unchanged)
   ========================================================================== */
function roiCompound(start: number, monthlyPct: number, n: number) {
  let bal = start;
  for (let i = 0; i < n; i++) bal *= 1 + monthlyPct;
  return bal;
}
function roiClamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}
function roiFmtMoney(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}k`;
  return `$${Math.round(n).toLocaleString()}`;
}

/* ============================================================================
   ROI — Snapshot (same layout, plain white section)
   ========================================================================== */
function RoiSection() {
  const monthlyRate = 0.089; // 8.9% baseline (compounded)
  const months = 12;

  const PRESETS = [500, 5000, 10000, 50000, 100000] as const;
  const [capital, setCapital] = useState<number>(5000);
  const [customOpen, setCustomOpen] = useState(false);
  const [typed, setTyped] = useState('5,000');

  const min = 500, max = 100000;

  const monthlyProfit = capital * monthlyRate;
  const balanceAfter12 = roiCompound(capital, monthlyRate, months);
  const gain12 = Math.max(0, balanceAfter12 - capital);

  function pick(v: number) {
    const vv = roiClamp(v, min, max);
    setCapital(vv);
    setTyped(new Intl.NumberFormat().format(vv));
    setCustomOpen(false);
  }
  function onType(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/[^\d]/g, '');
    setTyped(e.target.value);
    if (!digits) return;
    const n = roiClamp(parseInt(digits, 10) || 0, min, max);
    setCapital(n);
  }
  function onTypeBlur() {
    setTyped(new Intl.NumberFormat().format(capital));
  }

  return (
    // plain white section to match site background
    <section id="roi" className="relative pt-10 md:pt-12 pb-10 md:pb-12 bg-white">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* header */}
        <div className="mb-8 text-center">
          <p
            className="text-[12px] font-semibold tracking-[0.35em]"
            style={{ color: BRAND.PURPLE }}
          >
            R O I &nbsp; E S T I M A T O R
          </p>
          <h2
            className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl"
            style={{
              background: `linear-gradient(90deg, ${BRAND.PURPLE_DARK}, ${BRAND.PURPLE} 65%, ${BRAND.PURPLE_LIGHT})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              backgroundClip: 'text',
            }}
          >
            See Your Potential — Instantly
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15.5px] leading-7 text-neutral-700">
            Choose a starting capital. We project with an <b>8.9% monthly</b> baseline (compounded).
          </p>
        </div>

        {/* card */}
        <div
          className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-xl"
          style={{ border: `1px solid ${BRAND.CARD_BORDER}` }}
        >
          {/* presets + optional custom */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRESETS.map((v) => {
              const active = capital === v && !customOpen;
              return (
                <button
                  key={v}
                  onClick={() => pick(v)}
                  className="rounded-lg px-3.5 py-2 text-sm font-semibold transition"
                  style={{
                    background: active
                      ? GRAD.brand()
                      : `linear-gradient(135deg, ${hexA(BRAND.PURPLE_LIGHT, 0.06)}, ${hexA(
                          BRAND.PURPLE,
                          0.05
                        )})`,
                    color: active ? '#fff' : '#111827',
                    border: `1px solid ${active ? hexA('#000', 0.0) : hexA(BRAND.PURPLE, 0.16)}`,
                    boxShadow: active ? '0 8px 22px rgba(109,40,217,.25)' : 'none',
                  }}
                >
                  ${new Intl.NumberFormat().format(v)}
                </button>
              );
            })}

            <button
              onClick={() => setCustomOpen((x) => !x)}
              className="rounded-lg px-3.5 py-2 text-sm font-semibold"
              style={{
                background: `linear-gradient(135deg, ${hexA(BRAND.PURPLE_LIGHT, 0.06)}, ${hexA(
                  BRAND.PURPLE,
                  0.05
                )})`,
                border: `1px solid ${hexA(BRAND.PURPLE, 0.16)}`,
              }}
            >
              Custom
            </button>

            {customOpen && (
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                  $
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={typed}
                  onChange={onType}
                  onBlur={onTypeBlur}
                  placeholder="5,000"
                  className="w-36 rounded-lg border bg-white px-7 py-2 text-sm font-medium text-neutral-900 shadow-sm outline-none ring-2 ring-transparent focus:ring-violet-400"
                  style={{ borderColor: BRAND.CARD_BORDER }}
                />
              </div>
            )}
          </div>

          {/* big number + KPIs */}
          <div className="mt-8 grid grid-cols-1 items-center gap-6 md:grid-cols-3">
            <div className="md:col-span-2 text-center md:text-left">
              <div className="text-xs font-semibold tracking-[0.28em] uppercase" style={{ color: BRAND.PURPLE }}>
                Balance in 12 Months (est.)
              </div>
              <div className="mt-2 text-5xl font-extrabold leading-none text-neutral-900 md:text-6xl">
                {roiFmtMoney(balanceAfter12)}
              </div>
              <div className="mt-2 text-sm text-neutral-600">
                +{roiFmtMoney(gain12)} total gain from <span className="font-semibold">{roiFmtMoney(capital)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <RoiKpiMini title="Monthly Profit" value={roiFmtMoney(monthlyProfit)} />
              <RoiKpiMini title="Baseline" value="8.9% / mo (compounded)" />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex items-center justify-center">
            <a
              href="/join"
              className="rounded-xl px-7 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
              style={{ background: GRAD.brand() }}
            >
              Copy Our Trades — Start Today
            </a>
          </div>

          <p className="mt-3 text-center text-xs text-neutral-500">Educational estimate. Results may vary.</p>
        </div>
      </div>
    </section>
  );
}

/* compact KPI chip */
function RoiKpiMini({ title, value }: { title: string; value: string }) {
  return (
    <div
      className="rounded-lg bg-white p-3 ring-1 ring-black/5 shadow-sm"
      style={{ border: `1px solid ${BRAND.CARD_BORDER}` }}
    >
      <div
        className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em]"
        style={{ color: BRAND.PURPLE }}
      >
        <span
          className="h-[2px] w-4 rounded-full"
          style={{ background: `linear-gradient(90deg, ${BRAND.PURPLE_DARK}, ${BRAND.PURPLE_LIGHT})` }}
        />
        {title}
      </div>
      <div className="text-[18px] font-extrabold leading-none text-neutral-900">{value}</div>
    </div>
  );
}

/* =============================================================================
   FAQ + FOOTER — white background (no wash), tighter footer spacing
   ========================================================================== */
function FaqSection() {
  const faqs: { q: string; a: string }[] = [
    {
      q: 'Is the Master Room suitable for beginners?',
      a: 'Yes. Even with zero experience. We give exact instructions—entries, stop-loss, targets and management—to copy inside the room. Follow the step-by-step guide and start making money.',
    },
    {
      q: 'Do I need a big account to start?',
      a: 'No. You can start small and scale. Returns can be compounded, and many members grow further with prop-firm funding once consistent.',
    },
    {
      q: 'How fast can I see results?',
      a: 'Most members start to profit within hours. Follow the instructions and you’ll do the same.',
    },
    {
      q: 'Does my age matter?',
      a: 'No. If you can use a phone or computer, you can execute the trades. If you are under 18, please consult a parent or guardian before signing up.',
    },
    {
      q: 'I don’t have much time. Can I still join?',
      a: 'Yes. You can copy signals manually in about 15 minutes a day, or use a trade copier to automate execution end-to-end.',
    },
    {
      q: 'I live in X country. Is that a problem?',
      a: 'Not at all. We trade global Forex pairs online, so location doesn’t matter. Your location only changes the display currency of your earnings.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes—absolutely. No lock-in. You can manage or cancel your subscription from your account page.',
    },
    {
      q: 'Still have questions?',
      a: 'Reach out to the Range support team and ask anything—we’ll get back to you ASAP.',
    },
  ];

  return (
    // Pure white section; removed the smooth transition/gradient background
    <section id="faq" className="relative bg-white pt-8 md:pt-10 pb-0">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* PURPLE RIBBON CTA (unchanged) */}
        <div
          className="mb-14 overflow-hidden rounded-[28px] border shadow-[0_20px_60px_rgba(109,40,217,0.18)]"
          style={{
            border: `1px solid ${BRAND.CARD_BORDER}`,
            background: GRAD.brand(),
            clipPath:
              'polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px)',
          }}
        >
          <div className="flex flex-col items-center gap-4 px-6 py-10 text-center md:flex-row md:justify-between md:px-10">
            <h3 className="text-2xl font-extrabold text-white md:text-4xl">This Is Your Moment — Act On It</h3>
            <div className="flex items-center gap-3">
              <a
                href="/join"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-100"
              >
                Enroll Today
              </a>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/95 ring-1 ring-white/25 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-white/90" />
                Limited Spaces Left
              </span>
            </div>
          </div>
        </div>

        {/* Headings */}
        <div className="mb-10">
          <p className={CLS.smallCaps + ' text-neutral-500'}>
            F R E Q U E N T L Y &nbsp; A S K E D &nbsp; Q U E S T I O N S
          </p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-5xl">Frequently Asked Questions</h2>
        </div>

        {/* GRID — mobile order: Questions (1) → Support (2) → Disclaimer (3)
           Desktop: left column = Disclaimer (top) + Support (bottom), right = Questions */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.25fr]">
          {/* QUESTIONS */}
          <div className="order-1 space-y-4 md:order-none md:col-start-2 md:row-span-2">
            {faqs.map((item, idx) => (
              <FaqItem key={idx} index={idx + 1} q={item.q} a={item.a} />
            ))}
          </div>

          {/* SUPPORT CARD */}
          <div
            className="order-2 rounded-[18px] border p-6 text-white shadow-md md:order-none md:col-start-1 md:row-start-2"
            style={{ border: `1px solid ${BRAND.CARD_BORDER}`, background: GRAD.brand() }}
          >
            <div className="text-lg font-extrabold">Questions not covered?</div>
            <p className="mt-1 text-sm text-white/90">
              Tap the support bot in the bottom-right corner and we’ll help you out.
            </p>
            <a
              href="https://t.me/rangesupportfx"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-md bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
            >
              Open Telegram Support
            </a>
          </div>

          {/* DISCLAIMER */}
          <div
            className="order-3 relative overflow-hidden rounded-[22px] border bg-white p-6 shadow-sm md:order-none md:col-start-1 md:row-start-1"
            style={{ border: `1px solid ${BRAND.CARD_BORDER}` }}
          >
            <div className="pointer-events-none absolute -right-6 -top-6 opacity-[0.07]">
              <Image src="/mr-logo.webp" alt="" width={120} height={120} />
            </div>
            <p className="text-[15.5px] leading-7 text-neutral-700">
              Everything taught inside <b>MASTER ROOM</b> is for educational purposes only. Implementation and results
              depend on each member’s execution and risk control.
            </p>
            <p className="mt-4 text-[15.5px] leading-7 text-neutral-700">
              We do not guarantee profits or financial success. Trade responsibly and never risk funds you cannot afford
              to lose.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <a href="/terms" className="underline underline-offset-2 hover:text-neutral-900">
                Terms &amp; Conditions
              </a>
              <span>•</span>
              <a href="/privacy" className="underline underline-offset-2 hover:text-neutral-900">
                Privacy Policy
              </a>
            </div>
            <div className="mt-3 text-sm text-neutral-600">
              Support:{' '}
              <a
                href="https://t.me/rangesupportfx"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                Range Support Team
              </a>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </section>
  );
}

/* ========================================================================== */
function FaqItem({ index, q, a }: { index: number; q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <article
      className="relative transition-transform will-change-transform hover:-translate-y-[1px]"
      style={{ filter: 'drop-shadow(0 8px 24px rgba(109,40,217,0.08))' }}
    >
      <div
        className="rounded-[20px] p-[1.2px]"
        style={{
          background: `linear-gradient(135deg, ${hexA(BRAND.PURPLE_LIGHT, 0.4)}, ${hexA(BRAND.PURPLE_DARK, 0.6)})`,
          clipPath:
            'polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)',
        }}
      >
        <div
          className="relative overflow-hidden rounded-[18px] border bg-white"
          style={{ border: `1px solid ${BRAND.CARD_BORDER}` }}
        >
          <div
            className="pointer-events-none absolute -inset-20 opacity-[0.04]"
            style={{ background: 'repeating-linear-gradient(135deg, #000, #000 1px, transparent 1px, transparent 12px)' }}
          />
          <div
            className="absolute left-0 top-0 hidden h-full w-14 items-center justify-center border-r md:flex"
            style={{ background: GRAD.brand(), borderColor: 'rgba(255,255,255,0.15)' }}
          >
            <span
              className="select-none font-extrabold text-white/90"
              style={{ fontSize: '20px', textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}
            >
              {index}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center gap-4 px-5 py-5 text-left md:pl-20"
          >
            <span className="flex-1 text-[15.5px] font-semibold text-neutral-900">{q}</span>
            <span className="grid h-8 w-8 place-items-center rounded-full ring-1 ring-black/10 transition">
              <svg
                className="h-4 w-4 text-neutral-800 transition-transform"
                style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
          </button>

          <div
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <div
                className="border-t px-5 py-4 text-[15px] leading-7 text-neutral-700 md:pl-20"
                style={{ border: `1px solid ${BRAND.CARD_BORDER}` }}
              >
                {a}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================================
   SiteFooter — University-style closer (true bottom, tidy spacing)
   ========================================================================== */

function SiteFooter() {
  return <ClosingStripOnly />;
}

function ClosingStripOnly() {
  return (
    <div
      className={[
        "mt-24 md:mt-32", // gap above so badge never touches the FAQ
        "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen", // full-bleed
        "m-0 p-0 block",
      ].join(" ")}
    >
      <div
        className="relative overflow-visible m-0"
        // EXACT same purple system used across the page
        style={{
          background: `linear-gradient(135deg, ${BRAND.PURPLE} 0%, ${BRAND.PURPLE_DARK} 100%)`,
        }}
      >
        {/* Strip size */}
        <div className="mx-auto max-w-none px-0 py-14 md:py-20" />

        {/* Center badge — lifted but clear of the FAQ */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute left-1/2 top-0 -translate-x-1/2
            -translate-y-[52%]
          "
        >
          <div className="rounded-xl border border-white/80 bg-white shadow-[0_10px_34px_rgba(0,0,0,0.28)] p-2">
            <Image
              src="/mr-footer.webp"
              alt="Master Room"
              width={88}
              height={88}
              className="block rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* True bottom: no space below */}
      <div className="h-0 m-0 p-0" />
    </div>
  );
}

/* =============================================================================
   FLOATING ACTIONS (unchanged visuals; doesn’t add footer whitespace)
   ========================================================================== */
function FloatingActions() {
  const ring = BRAND.RING;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3">
      {/* Enroll — hidden on mobile, visible on ≥ sm */}
      <a
        href="/join"
        className="hidden sm:inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:shadow-[0_14px_30px_rgba(91,33,182,0.34)] active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          background: GRAD.brand(),
          border: `1px solid ${ring}`,
          boxShadow: `0 6px 0 ${hexA('#3a1c71', 0.9)}, 0 10px 24px ${hexA(BRAND.PURPLE, 0.28)}`,
        }}
      >
        Enroll Today
      </a>

      {/* Support bubble */}
      <a
        href="https://t.me/rangesupportfx"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Support Chat"
        title="Support"
        className="relative grid h-12 w-12 place-items-center rounded-full transition duration-200 hover:scale-[1.05] active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          background: `linear-gradient(135deg, ${BRAND.PURPLE} 0%, ${BRAND.PURPLE_DARK} 100%)`,
          border: `1px solid ${hexA('#ffffff', 0.14)}`,
          boxShadow: `0 14px 28px ${hexA(BRAND.PURPLE, 0.35)}, inset 0 1px 0 rgba(255,255,255,0.12)`,
        }}
      >
        <span
          className="pointer-events-none absolute -inset-1 rounded-full opacity-70 blur-[14px]"
          style={{ background: hexA(BRAND.PURPLE, 0.25) }}
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-[2px] rounded-full"
          style={{
            background:
              'radial-gradient(120% 90% at 30% 15%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 38%, rgba(255,255,255,0) 60%)',
          }}
          aria-hidden
        />
        <svg viewBox="0 0 48 48" width="24" height="24" aria-hidden="true" className="relative">
          <path
            d="M24 6C13.5 6 5 13.6 5 23c0 3.3 1 6.5 3 9.2.4.6.5 1.4.4 2.1l-1.2 4.9c-.3 1.2.8 2.3 2 2l5-1.5c.7-.2 1.5-.3 2.2-.1 2.3.7 4.9 1.1 7.6 1.1 10.5 0 19-7.6 19-17S34.5 6 24 6Z"
            fill={hexA('#000', 0.12)}
          />
          <path
            d="M24 8C14.6 8 7 15 7 23.8c0 3 .9 5.9 2.7 8.3.5.7.7 1.6.5 2.5l-.9 3.9 4-1.2c.9-.3 1.8-.3 2.7 0 2.2.7 4.6 1 7 1 9.4 0 17-6.9 17-15.5S33.4 8 24 8Z"
            fill={`url(#mrBubbleGrad)`}
          />
          <defs>
            <linearGradient id="mrBubbleGrad" x1="10" y1="6" x2="40" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={BRAND.PURPLE_LIGHT} />
              <stop offset="1" stopColor={BRAND.PURPLE_DARK} />
            </linearGradient>
          </defs>
          <path
            d="M24 29v-1.2c0-2.2 1.4-3.4 3-4.3 1.6-.9 3-1.9 3-3.8 0-2.7-2.4-4.6-5.6-4.6-3 0-5 1.3-5.9 3.6"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="24" cy="34" r="2.2" fill="#ffffff" />
        </svg>
      </a>
    </div>
  );
}

export default Home;