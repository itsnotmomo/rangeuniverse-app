'use client';

import Image from 'next/image';
import React, { Fragment, useEffect, useMemo, useRef, useState, ReactNode } from 'react';

const SHOW_DISCOUNT_RIBBON = false;
const SHOW_BOOTCAMP_RIBBON = false;

function hexA(hex: string, a = 1) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}

const BRAND = {
  PURPLE: '#6d28d9',
  PURPLE_DARK: '#5b21b6',
  PURPLE_LIGHT: '#8b5cf6',
  CARD_BG: '#070A10',
};
const GOLD = 'linear-gradient(135deg, #fef9c3, #fde047, #fbbf24)';
const GOLD_SOLID = '#fde047';

type MonthStat = { month: string; year: number; trades: number; wins: number; losses: number; rr: number; winRatePct: number; gainPct: number; };
const ALL_STATS: MonthStat[] = [
  { month: 'October',   year: 2023, trades: 44, wins: 22, losses: 22, rr: 174, winRatePct: 50, gainPct: 12 },
  { month: 'November',  year: 2023, trades: 58, wins: 31, losses: 27, rr: 186, winRatePct: 53, gainPct: 16 },
  { month: 'December',  year: 2023, trades: 38, wins: 24, losses: 14, rr: 121, winRatePct: 63, gainPct: 11 },
  { month: 'January',   year: 2024, trades: 35, wins: 17, losses: 18, rr: 102, winRatePct: 48, gainPct: 9 },
  { month: 'February',  year: 2024, trades: 51, wins: 26, losses: 25, rr: 173, winRatePct: 51, gainPct: 15 },
  { month: 'March',     year: 2024, trades: 41, wins: 20, losses: 21, rr: 227, winRatePct: 49, gainPct: 13.4 },
  { month: 'April',     year: 2024, trades: 35, wins: 14, losses: 21, rr: 218, winRatePct: 40, gainPct: 12.1 },
  { month: 'May',       year: 2024, trades: 45, wins: 22, losses: 23, rr: 138, winRatePct: 49, gainPct: 12.7 },
  { month: 'June',      year: 2024, trades: 37, wins: 17, losses: 20, rr: 89,  winRatePct: 45, gainPct: 4.9 },
  { month: 'July',      year: 2024, trades: 41, wins: 17, losses: 24, rr: 99,  winRatePct: 40, gainPct: 3 },
  { month: 'August',    year: 2024, trades: 44, wins: 20, losses: 24, rr: 133, winRatePct: 45, gainPct: 7 },
  { month: 'September', year: 2024, trades: 39, wins: 17, losses: 22, rr: 125, winRatePct: 43, gainPct: 6 },
  { month: 'October',   year: 2024, trades: 44, wins: 22, losses: 22, rr: 174, winRatePct: 50, gainPct: 12 },
  { month: 'November',  year: 2024, trades: 40, wins: 22, losses: 18, rr: 157, winRatePct: 55, gainPct: 8 },
  { month: 'December',  year: 2024, trades: 21, wins: 5,  losses: 16, rr: 32,  winRatePct: 41, gainPct: 0.5 },
  { month: 'January',   year: 2025, trades: 12, wins: 5,  losses: 7,  rr: 27,  winRatePct: 41, gainPct: 1.2 },
  { month: 'February',  year: 2025, trades: 22, wins: 10, losses: 12, rr: 107, winRatePct: 45, gainPct: 8.9 },
  { month: 'March',     year: 2025, trades: 37, wins: 17, losses: 20, rr: 214, winRatePct: 46, gainPct: 12.1 },
  { month: 'April',     year: 2025, trades: 32, wins: 19, losses: 13, rr: 158, winRatePct: 59, gainPct: 8.8 },
  { month: 'May',       year: 2025, trades: 30, wins: 16, losses: 14, rr: 120, winRatePct: 53, gainPct: 4.4 },
  { month: 'June',      year: 2025, trades: 20, wins: 6,  losses: 14, rr: -14, winRatePct: 30, gainPct: -2.5 },
  { month: 'July',      year: 2025, trades: 34, wins: 19, losses: 15, rr: 126, winRatePct: 56, gainPct: 6.5 },
  { month: 'August',    year: 2025, trades: 24, wins: 13, losses: 11, rr: 106, winRatePct: 54, gainPct: 4.2 },
  { month: 'September', year: 2025, trades: 26, wins: 14, losses: 12, rr: 167, winRatePct: 55, gainPct: 10.2 },
  { month: 'October',   year: 2025, trades: 32, wins: 19, losses: 13, rr: 178, winRatePct: 59, gainPct: 12.1 },
  { month: 'November',  year: 2025, trades: 30, wins: 15, losses: 15, rr: 125, winRatePct: 50, gainPct: 6.2 },
  { month: 'December',  year: 2025, trades: 22, wins: 12, losses: 10, rr: 102, winRatePct: 54, gainPct: 3.4 },
  { month: 'January',   year: 2026, trades: 28, wins: 14, losses: 14, rr: 115, winRatePct: 50, gainPct: 4.6 },
  { month: 'February',  year: 2026, trades: 22, wins: 12, losses: 10, rr: 124, winRatePct: 54, gainPct: 5.1 },
  { month: 'March',     year: 2026, trades: 18, wins: 9, losses: 9, rr: 118, winRatePct: 50, gainPct: 7.6 },
  { month: 'April',     year: 2026, trades: 23, wins: 13, losses: 10, rr: 148, winRatePct: 57, gainPct: 7.1 },
  { month: 'May',     year: 2026, trades: 18, wins: 8, losses: 10, rr: 92, winRatePct: 44, gainPct: 2.2 },
  { month: 'June',     year: 2026, trades: 16, wins: 8, losses: 8, rr: 102, winRatePct: 50, gainPct: 3.1 },
  
];
const MONTH_ORDER = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const COLUMN_IMAGES = [
  ["/students/1.webp","/students/2.webp","/students/3.webp","/students/4.webp","/students/5.webp","/students/16.webp","/students/17.webp"],
  ["/students/6.webp","/students/7.webp","/students/8.webp","/students/9.webp","/students/10.webp","/students/18.webp","/students/19.webp","/students/22.webp"],
  ["/students/11.webp","/students/12.webp","/students/13.webp","/students/14.webp","/students/15.webp","/students/20.webp","/students/21.webp"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="relative">
        <Header />
        <Hero />
      </div>
      <ActionIntro />
      <ToolsPathSection />
      <StatsSection />
      <PairsSection />
      <ProgramSlices />
      <ChoosePathSection />
      <StudentWinsSection />
      <FaqSection />
      <FloatingActions />
    </main>
  );
}

/* =============================================================================
   HEADER — bulletproof mobile menu that never shifts page content
   ========================================================================== */
function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Lock body scroll when menu open
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close on Escape
  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <>
      {/* Static header bar — height never changes, nothing inside moves */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/20">
        <div className="mx-auto flex h-[80px] w-full max-w-6xl items-center justify-between px-6">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <Image src="/mr-logo.webp" alt="Master Room" width={40} height={40} priority />
            <span className="font-bold text-base tracking-wide text-white">MASTER ROOM</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {[['Info','#info'],['Stats','#stats'],['Pairs','#pairs'],['Pricing','#pricing'],['Reviews','#reviews'],['FAQ','#faq']].map(([label,href]) => (
              <a key={href} href={href} className="text-white/70 hover:text-white transition-colors">{label}</a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <a href="/join" className="px-6 py-2.5 rounded-full text-black font-semibold text-sm hover:brightness-110 transition" style={{ background: GOLD }}>
              Join Now
            </a>
            <a href="https://t.me/+K8Nzz9B0aaQzN2Y0" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full text-sm font-semibold text-white/80 hover:text-white border border-white/20 transition">
              Free Telegram
            </a>
          </div>

          {/* Mobile: Join pill + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <a href="/join" className="rounded-full px-4 py-2 text-sm font-semibold text-black" style={{ background: GOLD }}>
              Join
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-white/5 text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay — rendered outside header, z-[200], never affects layout */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] md:hidden" role="dialog" aria-modal>
          {/* Dimmed backdrop — tap to close */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} aria-hidden />

          {/* Drawer slides in from the top, sits above everything */}
          <div className="absolute inset-x-0 top-0 bg-black border-b border-white/10 shadow-2xl">
            <div className="mx-auto max-w-6xl px-6 py-5">

              {/* Header row inside drawer */}
              <div className="flex h-12 items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image src="/mr-logo.webp" alt="Master Room" width={40} height={40} />
                  <span className="font-bold text-base tracking-wide text-white">MASTER ROOM</span>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5 text-white"
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M6 6l12 12M18 6l-12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="mt-5 grid gap-2 text-sm">
                {[['Info','#info'],['Pairs','#pairs'],['Stats','#stats'],['Pricing','#pricing'],['Reviews','#reviews'],['FAQ','#faq']].map(([label,href]) => (
                  <a key={href} href={href} onClick={close}
                    className="rounded-md px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white transition-colors">
                    {label}
                  </a>
                ))}
              </nav>

              {/* CTA row */}
              <div className="mt-5 pb-2 flex items-center gap-3">
                <a href="/join" className="flex-1 rounded-full px-4 py-2.5 text-center text-sm font-semibold text-black" style={{ background: GOLD }}>
                  Enroll Today
                </a>
                <a href="https://t.me/rangesupportfx" target="_blank" rel="noopener noreferrer"
                  aria-label="Telegram support"
                  className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5 text-white">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_65%)]" />
        <div className="absolute -left-1/4 top-[-20%] h-[140%] w-[60%] rotate-12 bg-gradient-to-b from-purple-500/20 via-transparent to-transparent blur-3xl" />
        <div className="absolute -right-1/4 top-[-20%] h-[140%] w-[60%] -rotate-12 bg-gradient-to-b from-yellow-400/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute left-0 top-1/2 h-[520px] w-[520px] -translate-y-1/2 bg-purple-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-[520px] w-[520px] -translate-y-1/2 bg-yellow-400/8 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.4'/></svg>\")" }} />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 pt-36 pb-16 md:px-6 md:pt-44 md:pb-20 text-center">
        <p className="mb-4 text-xs font-semibold tracking-[0.35em] uppercase text-white/40">master room</p>
        <h1 className="mb-5 text-5xl font-extrabold leading-tight sm:text-6xl md:text-[68px] md:leading-[1.04]">
          Copy.{' '}<span className="text-yellow-300">Paste.</span>{' '}Profit.
        </h1>
        <p className="mb-2 max-w-2xl mx-auto text-base text-zinc-300 md:text-lg leading-7">
          Join the <span className="font-semibold text-white">Master Room</span> — copy signals from professional traders, follow the exact entries, and{' '}
          <span className="font-semibold text-white">start profiting today.</span>
        </p>
        <div className="mx-auto mt-12 max-w-6xl">
          <div className="hidden md:flex md:items-stretch md:gap-0">
            <div className="flex-1 min-w-0"><HeroStepCard iconSrc="/cards/last1_icon.webp" title={`Join The\nMaster Room`} bullets={['Create your account in seconds and unlock daily signals to profitable trades.','You will receive winning signals EVERY SINGLE DAY.']} /></div>
            <div className="flex items-center justify-center px-4 shrink-0"><ProcessArrowRight /></div>
            <div className="flex-1 min-w-0"><HeroStepCard iconSrc="/cards/last2_icon.webp" title={`Copy Our\nTrades`} bullets={['Each signal comes with exact entries, SL & multiple TPs, formatted for trade copiers.','When confirmations align, we execute. You just copy.']} /></div>
            <div className="flex items-center justify-center px-4 shrink-0"><ProcessArrowRight /></div>
            <div className="flex-1 min-w-0"><HeroStepCard iconSrc="/cards/last3_icon.webp" title={`Generate\nProfit`} bullets={['Use the Risk Manager to size by balance & risk %, partials & targets done for you.','Secure profits by simply following our calls.']} /></div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:hidden">
            <HeroStepCard iconSrc="/cards/last1_icon.webp" title={`Join The\nMaster Room`} bullets={['Create your account in seconds and unlock daily signals to profitable trades.','You will receive winning signals EVERY SINGLE DAY.']} />
            <ProcessArrowDown />
            <HeroStepCard iconSrc="/cards/last2_icon.webp" title={`Copy Our\nTrades`} bullets={['Each signal comes with exact entries, SL & multiple TPs, formatted for trade copiers.','When confirmations align, we execute. You just copy.']} />
            <ProcessArrowDown />
            <HeroStepCard iconSrc="/cards/last3_icon.webp" title={`Generate\nProfit`} bullets={['Use the Risk Manager to size by balance & risk %, partials & targets done for you.','Secure profits by simply following our calls.']} />
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <Image src="/arrow_left.webp" alt="" width={46} height={46} loading="lazy" />
            <a href="/join" className="inline-flex items-center justify-center px-14 py-4 text-sm font-semibold text-black shadow-xl transition hover:brightness-110 md:text-base" style={{ background: GOLD }}>Enroll Today</a>
            <Image src="/arrow_left.webp" alt="" width={46} height={46} loading="lazy" className="-scale-x-100" />
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => <Image key={i} src={`/avatars/user${i}.webp`} alt="student" width={32} height={32} className="rounded-full ring-2 ring-white/20" loading="lazy" />)}
            </div>
            <span className="text-xs sm:text-sm text-white/85"><b className="text-white">10,000</b>+ Students Enrolled</span>
          </div>
          <ValueRibbon />
        </div>
      </div>
    </section>
  );
}

function HeroStepCard({ iconSrc, title, bullets }: { iconSrc: string; title: string; bullets: string[] }) {
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#070A10] p-6 h-full shadow-[0_70px_200px_rgba(0,0,0,0.85)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-56 w-[400px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/70" />
      </div>
      <div className="relative flex flex-col items-center text-center">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_6px_18px_rgba(0,0,0,.4)]">
          <Image src={iconSrc} alt="" width={48} height={48} className="opacity-95" />
        </div>
        <h3 className="mt-4 whitespace-pre-line font-semibold leading-tight text-white text-[20px] sm:text-[22px]">{title}</h3>
        <div className="mx-auto my-4 h-px w-9/12 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <ul className="space-y-2 text-[13px] sm:text-[13.5px] leading-7 text-zinc-400">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
    </div>
  );
}

function ProcessArrowRight() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden className="drop-shadow-[0_0_14px_rgba(253,224,71,0.55)]">
      <defs><linearGradient id="ga" x1="0" y1="0" x2="32" y2="0"><stop offset="0%" stopColor="#f7d87a" /><stop offset="50%" stopColor="#fde047" /><stop offset="100%" stopColor="#fbbf24" /></linearGradient></defs>
      <path d="M11 8l10 8-10 8" stroke="url(#ga)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ProcessArrowDown() {
  return (
    <div className="flex items-center justify-center my-1">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden className="drop-shadow-[0_0_14px_rgba(253,224,71,0.55)]">
        <defs><linearGradient id="gb" x1="0" y1="0" x2="0" y2="32"><stop offset="0%" stopColor="#f7d87a" /><stop offset="100%" stopColor="#fbbf24" /></linearGradient></defs>
        <path d="M8 12l8 10 8-10" stroke="url(#gb)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function ValueRibbon() {
  const items = [
    { value: "10K+", label: "Success Stories", icon: "trophy" as const },
    { value: "5+",   label: "Pairs Traded",    icon: "pair"   as const },
    { value: "5K+",  label: "Active Members",  icon: "users"  as const },
  ];
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-4xl rounded-2xl p-[1px]" style={{ background: `linear-gradient(135deg, ${hexA('#6d28d9',.9)}, ${hexA('#a78bfa',.9)} 45%, ${hexA('#fde047',.9)})` }}>
        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(20,18,28,.92), rgba(7,10,16,.96))" }}>
          <div className="grid grid-cols-3">
            {items.map((it, i) => (
              <div key={i} className="relative px-4 py-5 text-center">
                {i > 0 && <div className="absolute left-0 top-4 bottom-4 w-px hidden md:block bg-gradient-to-b from-transparent via-white/15 to-transparent" />}
                <div className="mx-auto grid h-9 w-9 place-items-center rounded-xl" style={{ background: `conic-gradient(from 210deg, ${hexA('#fde047',.7)}, ${hexA('#6d28d9',.7)}, ${hexA('#a78bfa',.7)})` }}>
                  <div className="h-8 w-8 grid place-items-center rounded-lg bg-black/75">
                    {it.icon === "trophy" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 5h12v3a6 6 0 0 1-12 0V5Z" stroke="white" strokeWidth="1.4"/><path d="M18 5h3v1a4 4 0 0 1-4 4" stroke="white" strokeWidth="1.4"/><path d="M6 5H3v1a4 4 0 0 0 4 4" stroke="white" strokeWidth="1.4"/><path d="M12 14v3M9 20h6" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg>}
                    {it.icon === "pair"  && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 16l5-5 4 4 7-7" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="2" stroke="white" strokeWidth="1.4"/><circle cx="18" cy="10" r="2" stroke="white" strokeWidth="1.4"/></svg>}
                    {it.icon === "users" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 11a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z" stroke="white" strokeWidth="1.4"/><path d="M4 20a6 6 0 0 1 16 0" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg>}
                  </div>
                </div>
                <div className="mt-2 text-xl md:text-2xl font-extrabold leading-none text-white">{it.value}</div>
                <div className="mt-1 text-[12.5px] md:text-sm text-white/70">{it.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionIntro() {
  return (
    <section id="info" className="relative bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(109,40,217,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(253,224,71,0.08),transparent_55%)]" />
      </div>
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-white/60 mb-6">TAKE ACTION</div>
          <h2 className="text-4xl font-semibold leading-tight md:text-5xl text-white">Get Paid And Learn</h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-zinc-400">
            <p>We share the market outlooks every morning at 9 a.m. — bias, zones, timing.</p>
            <p>Once a trade presents itself, we share it with you.</p>
            <p>All you have to do is Copy the signal, Place the trade, Follow the updates. <span className="text-white font-semibold">That&apos;s it.</span></p>
            <p>You will receive new reports whenever the market shifts — so you can stay up to date.</p>
            <p>With this structure, you start to <span className="text-white font-semibold">generate money and learn the strategy at the same time.</span></p>
            <p>Win-Win scenario. Most of our students profit <span className="text-white font-semibold">within hours.</span></p>
          </div>
          <a href="/join" className="mt-8 inline-flex items-center justify-center px-10 py-4 text-sm font-semibold text-black shadow-xl transition hover:brightness-110 md:text-base" style={{ background: GOLD }}>Enroll Today — Start Earning</a>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute -left-8 -top-10 h-64 w-64 rounded-full bg-purple-500/15 blur-3xl" />
          <Image src="/phone1.webp" alt="Master Room app preview" width={520} height={980} className="relative mx-auto select-none drop-shadow-2xl" priority />
        </div>
      </div>
    </section>
  );
}

function ToolsPathSection() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const LEFT_ON_SMALL_UNTIL = 1024, LEFT_OFFSET = 28;
  const rows = useMemo(() => [
    { id:"r1", leftMd:320, leftLg:360, imgSrc:"/phone.webp", imgAlt:"Phone UI preview", padClass:"p-3 md:p-4 lg:p-6", feature:{ iconSrc:"/profits.svg", title:"Profitable Trade Setups", bullets:["Precise entries with SL/TP and RR targets","Live session alerts so you don't miss moves","Transparent tracking: win rate, RR, payouts"] } },
    { id:"r2", leftMd:340, leftLg:380, imgSrc:"/mac.webp", imgAlt:"Mac dashboard preview", padClass:"p-1.5 md:p-2 lg:p-3", feature:{ iconSrc:"/strategy.svg", title:"Proven Strategy, Not Luck", bullets:["One strategy refined over years (repeatable)","Checklist: structure → confirmation → execution","Strict risk model that protects capital"] } },
    { id:"r3", leftMd:300, leftLg:330, imgSrc:"/help.webp", imgAlt:"Help and support preview", padClass:"p-4 md:p-6 lg:p-8", feature:{ iconSrc:"/support.svg", title:"Direct Support From Range", bullets:["1:1 chart reviews and corrections","Fast answers on entries, management, psychology","Weekly action steps & accountability"] } },
  ], []);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = timelineRef.current; if (!el) return;
    const onScroll = () => { const rect = el.getBoundingClientRect(); const vh = window.innerHeight; setProgress(Math.min(1,Math.max(0,-rect.top/Math.max(rect.height-vh,1)))); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  const [arrowY, setArrowY] = useState(0);
  const [arrowTilt, setArrowTilt] = useState(0);
  const velRef = useRef<number>(0); const lastTsRef = useRef<number | null>(null);
  useEffect(() => {
    const K=16, D=2*Math.sqrt(K); let raf=0;
    const step = (ts: number) => {
      const lineH = lineRef.current?.clientHeight ?? timelineRef.current?.clientHeight ?? 0;
      const pad=18, minY=pad, maxY=Math.max(lineH-pad,pad), targetY=minY+(maxY-minY)*progress;
      const last=lastTsRef.current??ts; const dt=Math.min((ts-last)/1000,0.033); lastTsRef.current=ts;
      setArrowY(x => { const vPrev=velRef.current; const a=K*(targetY-x)-D*vPrev; const v=vPrev+a*dt; velRef.current=Math.abs(v)<0.002?0:v; let next=x+v*dt; if(next<minY){next=minY;velRef.current=0;}else if(next>maxY){next=maxY;velRef.current=0;} setArrowTilt(Math.max(-8,Math.min(8,v*120))); return next; });
      raf=window.requestAnimationFrame(step);
    };
    raf=window.requestAnimationFrame(step); return ()=>window.cancelAnimationFrame(raf);
  }, [progress]);
  const [tlx, setTlx] = useState(0);
  useEffect(() => {
    const computeX = () => {
      const tl=timelineRef.current,gut=gutterRef.current,cont=containerRef.current; if(!tl) return;
      const tlRect=tl.getBoundingClientRect(); let x:number;
      if(window.innerWidth<LEFT_ON_SMALL_UNTIL&&cont){const contRect=cont.getBoundingClientRect();x=contRect.left-tlRect.left+LEFT_OFFSET;}
      else if(gut){const gutRect=gut.getBoundingClientRect();x=gutRect.left-tlRect.left+gutRect.width/2;}
      else x=tlRect.width/2; setTlx(x);
    };
    computeX();
    const ro=typeof ResizeObserver!=="undefined"?new ResizeObserver(computeX):null;
    if(ro){if(timelineRef.current)ro.observe(timelineRef.current);if(gutterRef.current)ro.observe(gutterRef.current);if(containerRef.current)ro.observe(containerRef.current);}
    window.addEventListener("resize",computeX,{passive:true});
    return ()=>{if(ro)ro.disconnect();window.removeEventListener("resize",computeX);};
  }, [LEFT_ON_SMALL_UNTIL,LEFT_OFFSET]);

  return (
    <section className="relative w-full bg-black text-white">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .dark-pill{border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.04);border-radius:9999px;transition:transform .18s ease,box-shadow .18s ease;}
        .dark-pill:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(0,0,0,.4);}
        .pill-bullet{display:flex;align-items:center;gap:.75rem;padding:1rem 1.2rem;}
        .pill-row{display:flex;flex-direction:column;gap:.9rem;}
        .headline-grad-dark{background:linear-gradient(90deg,#fff,#a78bfa 70%,#fff);-webkit-background-clip:text;background-clip:text;color:transparent;}
      ` }} />
      <div ref={containerRef} className="mx-auto max-w-7xl px-4 pt-0 pb-16 md:pt-0 md:pb-20 md:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <p className="uppercase tracking-[.22em] text-xs text-white/40">A step-by-step path</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl headline-grad-dark">Tools To Maximize Your Income</h2>
        </header>
        <div ref={timelineRef} className="relative">
          <div className="pointer-events-none absolute top-0 h-full w-[26px]" style={{ left:`${tlx-13}px`, background:"radial-gradient(12px 240px at 50% 50%,rgba(109,40,217,0.15),rgba(109,40,217,0) 70%)" }} aria-hidden />
          <div ref={lineRef} className="pointer-events-none absolute top-0 h-full w-px" style={{ left:`${tlx}px`, background:"linear-gradient(180deg,rgba(255,255,255,.05) 0%,rgba(109,40,217,.5) 50%,rgba(255,255,255,.05) 100%)", boxShadow:"0 0 22px rgba(109,40,217,.3)" }} aria-hidden />
          <div className="pointer-events-none absolute z-10 will-change-transform" style={{ left:`${tlx}px`, top:0, transform:`translate3d(-50%,${arrowY}px,0) rotate(${arrowTilt}deg)` }} aria-hidden>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0b0f18] border border-white/15 text-white shadow-[0_10px_30px_rgba(0,0,0,.6),0_0_0_6px_rgba(109,40,217,.15)]">
              <Image src="/arrowdown.webp" alt="scroll arrow" width={20} height={20} draggable={false} />
            </div>
          </div>
          <div className="pl-[56px] pr-3 py-10 md:pl-0 md:pr-0 md:py-0">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] md:gap-12">
              {rows.map((r, idx) => (
                <Fragment key={r.id}>
                  <PathFadeIn>
                    <PathTallImage mdH={r.leftMd} lgH={r.leftLg} imgSrc={r.imgSrc} imgAlt={r.imgAlt} padClass={r.padClass} priority={idx===0} />
                  </PathFadeIn>
                  <div ref={idx===0?gutterRef:undefined} />
                  <PathFadeIn delay={0.06}>
                    <PathRightCell mdH={r.leftMd} lgH={r.leftLg}>
                      <PathFeatureGroup iconSrc={r.feature.iconSrc} title={r.feature.title} bullets={r.feature.bullets} />
                    </PathRightCell>
                  </PathFadeIn>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <a href="/join" className="inline-flex w-full items-center justify-center px-8 py-4 text-sm font-semibold text-black shadow-xl transition hover:brightness-110 md:w-auto md:text-base" style={{ background: GOLD }}>Enroll Today</a>
        </div>
      </div>
    </section>
  );
}

function PathFadeIn({ children, delay=0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement|null>(null); const [show, setShow] = useState(false);
  useEffect(() => { const el=ref.current; if(!el) return; const io=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting)setShow(true);},{threshold:0.2}); io.observe(el); return()=>io.disconnect(); }, []);
  return <div ref={ref} className={show?"animate-[fadeSlideUp_.5s_ease_forwards]":"opacity-0"} style={{animationDelay:show?`${delay}s`:undefined}}>{children}</div>;
}
function PathRightCell({ children, mdH, lgH }: { children: ReactNode; mdH: number; lgH: number }) {
  return (
    <div className="flex">
      <style dangerouslySetInnerHTML={{ __html:`@media(min-width:768px){.row-md-${mdH}{height:${mdH}px}}@media(min-width:1024px){.row-lg-${lgH}{height:${lgH}px}}` }} />
      <div className={`row-md-${mdH} row-lg-${lgH} w-full flex items-center`}>{children}</div>
    </div>
  );
}
function PathTallImage({ mdH, lgH, imgSrc, imgAlt, padClass="p-3 md:p-4 lg:p-6", priority=false }: { mdH:number;lgH:number;imgSrc:string;imgAlt?:string;padClass?:string;priority?:boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#070A10]" style={{ boxShadow:"0 20px 60px rgba(0,0,0,.6)" }}>
      <style dangerouslySetInnerHTML={{ __html:`@media(min-width:768px){.ph-md-${mdH}{height:${mdH}px}}@media(min-width:1024px){.ph-lg-${lgH}{height:${lgH}px}}` }} />
      <div className={`ph-md-${mdH} ph-lg-${lgH} min-h-[260px] md:min-h-0 relative`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_-10%_-20%,rgba(109,40,217,.10),transparent_60%)]" />
        <div className={`absolute inset-0 flex items-center justify-center ${padClass}`}>
          <Image src={imgSrc} alt={imgAlt??"feature"} fill className="object-contain pointer-events-none select-none" sizes="(min-width:1024px) 33vw, 90vw" priority={priority} />
        </div>
      </div>
    </div>
  );
}
function PathFeatureGroup({ iconSrc, title, bullets }: { iconSrc:string; title:string; bullets:string[] }) {
  return (
    <div className="w-full md:max-w-[640px]">
      <div className="mb-4 flex items-center gap-4">
        <Image src={iconSrc} alt="" width={64} height={64} className="shrink-0 w-9 h-9 md:w-12 md:h-12 lg:w-14 lg:h-14" />
        <h3 className="font-extrabold leading-tight headline-grad-dark text-[20px] md:text-[30px] lg:text-[36px] tracking-[-0.01em]">{title}</h3>
      </div>
      <div className="pill-row">
        {bullets.map((b,i) => (
          <div key={i} className="dark-pill">
            <div className="pill-bullet">
              <Image src="/tick.svg" alt="" width={20} height={20} className="mt-0.5 opacity-80 shrink-0" />
              <span className="text-[14px] md:text-[15.5px] text-white/75 leading-snug">{b}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsSection() {
  const hasStats = Array.isArray(ALL_STATS) && ALL_STATS.length > 0;
  const monthIndex = (m: string) => MONTH_ORDER.indexOf(m);
  const ordered = hasStats ? [...ALL_STATS].sort((a,b)=>b.year-a.year||monthIndex(b.month)-monthIndex(a.month)) : [];
  const lastTwo = ordered.slice(0,2);
  const totalTrades = hasStats ? ALL_STATS.reduce((t,m)=>t+m.trades,0) : 0;
  const totalRR = hasStats ? ALL_STATS.reduce((t,m)=>t+m.rr,0) : 0;
  const avgWin = hasStats ? Math.round(ALL_STATS.reduce((t,m)=>t+m.winRatePct,0)/Math.max(1,ALL_STATS.length)) : 0;
  const trailing12 = ordered.slice(0,12);
  const gain12 = trailing12.length ? Math.round(trailing12.reduce((t,m)=>t+m.gainPct,0)*10)/10 : 0;
  const years = Array.from(new Set(ordered.map(s=>s.year))).sort((a,b)=>b-a);
  const [open, setOpen] = React.useState(false);
  const [yearsShown, setYearsShown] = React.useState<number[]>(years.length?[years[0]]:[]);
  const showNextYear = () => { const next=years.find(y=>!yearsShown.includes(y)); if(typeof next==="number") setYearsShown(ys=>[...ys,next].sort((a,b)=>b-a)); };
  if (!hasStats) return null;

  return (
    <section id="stats" className="relative bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(109,40,217,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-white/60 mb-4">VERIFIED RESULTS</div>
            <h2 className="text-4xl font-semibold leading-tight md:text-[44px] text-white">Consistency You Can Trust</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">Track the performance of the Master Room over the years.</p>
          </div>
          <div className="rounded-[24px] border border-white/10 p-5" style={{ background:"linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))", boxShadow:"0 10px 40px rgba(0,0,0,.4)" }}>
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/50">Trailing 12-Month Gain</div>
            <div className="mt-2 text-[42px] font-black leading-none text-yellow-300">{gain12>=0?`+${gain12}%`:`${gain12}%`}</div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/10 px-3 py-2" style={{ background:"rgba(255,255,255,.04)" }}><div className="text-[10px] uppercase tracking-[0.22em] text-white/50">Avg Win Rate</div><div className="mt-1 text-lg font-extrabold text-white">{avgWin}%</div></div>
              <div className="rounded-lg border border-white/10 px-3 py-2" style={{ background:"rgba(255,255,255,.04)" }}><div className="text-[10px] uppercase tracking-[0.22em] text-white/50">Total Trades</div><div className="mt-1 text-lg font-extrabold text-white">{totalTrades.toLocaleString("en-US")}</div></div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {lastTwo.map((m,i) => (
            <article key={`${m.year}-${m.month}`} className="rounded-3xl p-[1px]" style={{ background:`linear-gradient(135deg,${hexA('#8b5cf6',.30)},${hexA('#5b21b6',.40)})`, boxShadow:"0 10px 40px rgba(0,0,0,.5)" }}>
              <div className="rounded-3xl border border-white/10 p-6" style={{ background:"linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))" }}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-widest text-white/50">{m.month} {m.year}</div>
                    <div className="mt-1 text-3xl font-black leading-tight text-white">{m.gainPct>=0?"+":""}{m.gainPct}%</div>
                    <div className="mt-2 text-xs text-white/50">Monthly gain</div>
                  </div>
                  <span className="rounded-full px-2 py-1 text-[10px] font-semibold tracking-wide" style={{ color:i===0?"#0b0d11":"#fff", background:i===0?GOLD_SOLID:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.16)" }}>{i===0?"NEWEST":"RECENT"}</span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[["Trades",m.trades,false],["Win rate",`${m.winRatePct}%`,true],["RR total",m.rr,false]].map(([label,value,accent])=>(
                    <div key={String(label)} className="rounded-lg border border-white/10 p-3" style={{ background:accent?`linear-gradient(180deg,${hexA('#8b5cf6',.22)},${hexA('#5b21b6',.18)})`:"rgba(255,255,255,.04)" }}>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-white/55">{String(label)}</div>
                      <div className="mt-1 text-lg font-extrabold text-white">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[["Total RR",`${totalRR} RR`],["Average Win Rate",`${avgWin}%`],["Trades Logged",totalTrades.toLocaleString("en-US")]].map(([label,value])=>(
            <div key={String(label)} className="rounded-2xl border border-white/10 p-4" style={{ background:"rgba(255,255,255,.04)" }}>
              <div className="text-[11px] uppercase tracking-widest text-white/50">{String(label)}</div>
              <div className="mt-2 text-[24px] font-extrabold leading-none text-white">{String(value)}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <a href="/join" className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-black transition hover:brightness-110" style={{ background: GOLD }}>Copy Our Trades — Start Today</a>
          <button onClick={() => setOpen(v=>!v)} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition border border-white/10 bg-white/5 hover:bg-white/10">{open?"Hide Detailed Stats":"Show Detailed Stats"}</button>
        </div>
        {open && (
          <div className="mt-10">
            {yearsShown.map(yr => {
              const list = ordered.filter(s=>s.year===yr);
              return (
                <div key={yr} className="mt-8">
                  <div className="mb-4 flex items-center gap-4"><h3 className="text-lg font-extrabold text-white">{yr} Breakdown</h3><div className="h-px flex-1 rounded-full bg-white/10" /></div>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {list.map(m => (
                      <div key={`${m.year}-${m.month}`} className="rounded-2xl border border-white/10 p-5" style={{ background:"rgba(255,255,255,.04)" }}>
                        <div className="flex items-start justify-between">
                          <div className="text-xs font-medium uppercase tracking-widest text-white/55">{m.month} {m.year}</div>
                          <div className="rounded-full px-2 py-[2px] text-xs font-semibold text-white ring-1 ring-white/10 bg-white/5">{m.gainPct>=0?"+":""}{m.gainPct}%</div>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          {[["Trades",m.trades,false],["Win%",`${m.winRatePct}%`,true],["RR",m.rr,false]].map(([label,value,accent])=>(
                            <div key={String(label)} className="rounded-lg border border-white/10 p-2" style={{ background:accent?`linear-gradient(180deg,${hexA('#8b5cf6',.20)},${hexA('#5b21b6',.16)})`:"rgba(255,255,255,.04)" }}>
                              <div className="text-[9px] uppercase tracking-[0.22em] text-white/55">{String(label)}</div>
                              <div className="mt-1 text-sm font-extrabold text-white">{String(value)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="mt-8 flex justify-center">
              {years.some(y=>!yearsShown.includes(y)) ? (
                <button onClick={showNextYear} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white border border-white/10 bg-white/5 hover:bg-white/10 transition">Show Next Year</button>
              ) : <p className="text-center text-xs text-white/40">End of history.</p>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PairsSection() {
  const items = [
    { key:'eurusd', title:'EUR/USD', blurb:'Deep liquidity, tight spreads — clean structure through London and New York.', img:'/pairs/eurusd.webp' },
    { key:'eurchf', title:'EUR/CHF', blurb:'High volatility with sharp session moves — respect levels, expect speed.', img:'/pairs/eurchf.webp' },
    { key:'euraud', title:'EUR/AUD', blurb:'Range-prone cross — confluence and mean reversion show up day after day.', img:'/pairs/euraud.webp' },
    { key:'audusd', title:'AUD/USD', blurb:'Commodity-tied flows — clean trends in Asia, risk sentiment drives momentum.', img:'/pairs/audusd.webp' },
    { key:'eurjpy', title:'EUR/JPY', blurb:'Momentum-heavy — breaks and runs around session opens; manage speed and pullbacks.', img:'/pairs/eurjpy.webp' },
    { key:'comingsoon', title:'Coming Soon', blurb:'New pairs are coming soon to the Master Room — stay tuned.', img:'/pairs/coming-soon.webp' },
  ];
  const PER_PAGE=3, [page, setPage] = useState(0);
  const totalPages = Math.ceil(items.length/PER_PAGE);
  const view = items.slice(page*PER_PAGE, page*PER_PAGE+PER_PAGE);
  return (
    <section id="pairs" className="relative bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(109,40,217,0.10),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center mb-2"><div className="mx-auto inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-white/50">PAIRS WE TRADE</div></div>
        <h2 className="mt-3 text-center text-3xl font-semibold text-white md:text-5xl">Pairs We Trade Daily</h2>
        <div className="relative mt-8">
          <button type="button" aria-label="Previous" onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={page===0} className={`absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white md:flex ${page===0?'opacity-30 cursor-not-allowed':'hover:bg-white/10'}`}>‹</button>
          <button type="button" aria-label="Next" onClick={()=>setPage(p=>Math.min(totalPages-1,p+1))} disabled={page===totalPages-1} className={`absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white md:flex ${page===totalPages-1?'opacity-30 cursor-not-allowed':'hover:bg-white/10'}`}>›</button>
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
            {view.map(it => (
              <article key={it.key} className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#070A10] transition hover:-translate-y-0.5" style={{ boxShadow:"0 20px 60px rgba(0,0,0,.5)" }}>
                <div className="relative w-full overflow-hidden rounded-t-[28px] h-56 md:h-64">
                  {it.img && <Image src={it.img} alt={it.title} fill sizes="(max-width:768px) 320px,420px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" priority={it.key==='eurusd'} />}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),transparent_30%,transparent_70%,rgba(0,0,0,0.4))]" />
                </div>
                <div className="space-y-2 p-5"><h3 className="text-xl font-extrabold text-white">{it.title}</h3><p className="text-sm leading-6 text-zinc-400">{it.blurb}</p></div>
              </article>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({length:totalPages}).map((_,k) => (
              <button key={k} type="button" onClick={()=>setPage(k)} aria-label={`Page ${k+1}`} className={`h-[8px] w-8 rounded-full transition ${page===k?'bg-yellow-300':'bg-white/20 hover:bg-white/35'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramSlices() {
  return (
    <section id="program-slices" className="relative w-full bg-black">
      <DarkBand imageSide="right" imageSrc="/SEC1.webp" imgRatio={0.64} title="Start Making Money Trading" bullets={['Copy signals with entry, stop, and targets.','Clear management: partials, breakeven, risk management.','No experience required — follow the plan and execute.']} />
      <DarkBand imageSide="left" imageSrc="/SEC2.webp" imgRatio={0.82} imgGap="md:mr-20" title="Earn While You Learn" bullets={['Daily updates so you always know the plan.','Adjustments posted as price develops — no second-guessing.','Learn the strategy as you execute it, step by step.']} />
      <DarkBand imageSide="right" imageSrc="/SEC3.webp" imgRatio={0.64} title="Access To Multi-Millionaires" bullets={['Mentors are hyper-successful experts in the trading field.','Get mentored every step of your journey.','24/7 live support from the team.']} />
    </section>
  );
}

function DarkBand({ imageSide, imageSrc, imgRatio=0.7, title, bullets, imgGap }: { imageSide:'left'|'right'; imageSrc:string; imgRatio?:number; title:string; bullets:string[]; imgGap?:string }) {
  const gapClass = imgGap ?? (imageSide==='left'?'md:mr-16':'md:ml-16');
  const imgCol = imageSide==='left'?'md:col-start-1':'md:col-start-2';
  const copyCol = imageSide==='left'?'md:col-start-2':'md:col-start-1';
  const W=560, H=Math.round(W*imgRatio);
  return (
    <div className="my-6 md:my-8">
      <div className="relative overflow-hidden border-y border-white/[0.05]" style={{ background:"#070A10" }}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_50%,rgba(109,40,217,.07),transparent_65%)]" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pt-14 pb-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12 md:px-8 md:pt-12 md:pb-12">
          <div className={`order-1 self-center ${imgCol} md:row-start-1 md:order-none`}>
            <div className={`mb-2 flex justify-center md:mb-0 ${imageSide==='left'?'md:justify-self-start':'md:justify-self-end'} ${gapClass}`}>
              <Image src={imageSrc} alt="" width={W} height={H} sizes="(min-width:1024px) 44vw,(min-width:768px) 50vw,92vw" className="block h-auto w-[min(560px,92vw)] object-contain md:w-[min(560px,44vw)] drop-shadow-[0_28px_56px_rgba(0,0,0,.7)]" />
            </div>
          </div>
          <div className={`order-2 self-center ${copyCol} md:row-start-1 md:order-none`}>
            <div className="relative z-10 min-w-0">
              <h3 className="font-semibold tracking-tight text-white" style={{ fontSize:"clamp(28px,6.2vw,60px)", lineHeight:1.08, letterSpacing:"-0.02em" }}>{title}</h3>
              <ul className="mt-6 space-y-4 text-[15.5px] leading-[1.75] md:text-[17px]">
                {bullets.map((b,i) => (
                  <li key={i} className="flex max-w-[64ch] items-start gap-2.5 text-zinc-400">
                    <svg aria-hidden className="mt-[6px] h-4 w-4 flex-none text-zinc-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z" /></svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a href="/join" className="mt-8 inline-flex w-full items-center justify-center px-6 py-4 text-sm font-semibold text-black transition hover:brightness-105 md:w-auto md:text-base" style={{ background: GOLD }}>Enroll Today</a>
              <div className="h-6 md:hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChoosePathSection() {
  return (
    <section id="pricing" className="relative bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(168,85,247,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(253,224,71,0.10),transparent_55%)]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center mb-2"><div className="mx-auto inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-white/50">CHOOSE YOUR PATH</div></div>
        <h2 className="mt-3 text-center text-3xl font-semibold text-white md:text-5xl">Two Paths Lie Before You</h2>
        <div className="mx-auto mt-5 flex max-w-3xl items-center">
          <div className="h-px flex-1 rounded-full bg-white/10" /><div className="mx-3 h-3 w-3 rounded-full bg-yellow-300 shadow-[0_0_18px_rgba(253,224,71,0.9)]" aria-hidden /><div className="h-px flex-1 rounded-full bg-white/10" />
        </div>
        <div className="relative mt-12 grid grid-cols-1 items-stretch gap-8 md:grid-cols-[1fr_auto_1fr]">
          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#070A10] p-8 md:p-10" style={{ clipPath:'polygon(0 0,calc(100% - 28px) 0,100% 28px,100% 100%,0 100%)' }}>
            <div className="pointer-events-none absolute -top-24 left-[-140px] h-72 w-72 rounded-full bg-purple-500/8 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-[0.25em] uppercase text-white/50">PAY</div>
              <div className="mt-2 text-4xl font-semibold text-white md:text-[44px]">$10,000+</div>
              <p className="mt-4 text-base leading-7 text-zinc-400">Waste years on BS courses, fake gurus, and losing signal rooms. All theory. No results. Keep guessing while your account bleeds.</p>
              <a href="https://youtu.be/yPP5bD8xVhg?si=yikOvbBGLPGCXAEA&t=7" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-[16px] border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/10">Keep Losing</a>
            </div>
          </div>
          <div className="hidden items-center justify-center md:flex"><div className="flex h-16 w-16 items-center justify-center rounded-full text-sm font-bold text-white border border-white/10 bg-white/5">VS</div></div>
          <div className="relative overflow-hidden rounded-[34px] p-[1.5px] shadow-[0_20px_60px_rgba(253,224,71,0.12)]" style={{ background:"linear-gradient(135deg,rgba(109,40,217,.9),rgba(167,139,250,.9) 40%,rgba(253,224,71,.8))", clipPath:'polygon(28px 0,100% 0,100% calc(100% - 28px),calc(100% - 28px) 100%,0 100%,0 28px)' }}>
            <div className="rounded-[33px] bg-[#0d1020] p-8 md:p-10 h-full">
              <div className="inline-flex items-center rounded-full border border-yellow-300/25 bg-yellow-300/10 px-3 py-1 text-[11px] font-semibold tracking-[0.25em] uppercase text-yellow-200">PAY</div>
              <div className="mt-2 text-4xl font-semibold text-white md:text-[44px]">€79 / month</div>
              <p className="mt-4 text-base leading-7 text-white/80">Copy signals with entry, stop, and targets. Learn a system with years of proof. Weekly live calls for clarity. <span className="text-white font-bold">Your only job: execute.</span></p>
              <a href="/join" className="mt-6 inline-flex items-center justify-center rounded-[16px] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-105" style={{ background: GOLD }}>Start Earning</a>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px]">
                <span className="h-2 w-2 rounded-full bg-green-400" /><span className="font-medium text-white/80">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-3xl text-center text-[13px] text-white/35">Access all pairs, weekly Q&amp;A, and the Master Room archive.</div>
      </div>
    </section>
  );
}

function StudentWinsSection() {
  return (
    <section id="reviews" className="bg-black py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 py-0">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-[40px] md:leading-tight">
            Over{" "}<span className="text-yellow-300">€3.2M in Tracked Profits</span>{" "}From Traders Who Joined The Master Room.
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-5xl relative h-[460px] overflow-hidden">
          <div className="marquee-container grid h-full grid-cols-3 gap-3 sm:gap-5">
            <TestimonialColumn direction="up" images={COLUMN_IMAGES[0]} />
            <TestimonialColumn direction="down" images={COLUMN_IMAGES[1]} />
            <TestimonialColumn direction="up" images={COLUMN_IMAGES[2]} />
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black via-black/70 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>
        <div className="mx-auto mt-10 max-w-3xl text-center text-base text-zinc-200 md:text-lg">
          <p className="mb-5">These are regular traders who joined the master room and generated{" "}<span className="font-semibold text-yellow-300">over €3.2 million in profits.</span></p>
        </div>
        <div className="mt-8 flex justify-center">
          <a href="/join" className="inline-flex items-center justify-center rounded-full px-14 py-4 text-sm font-semibold uppercase tracking-wide text-black shadow-xl transition hover:brightness-110 md:text-base" style={{ background: "linear-gradient(135deg, #fef9c3, #fde047, #fbbf24)" }}>Enroll Today</a>
        </div>
      </div>
      <style jsx global>{`
        .marquee-container { position: relative; height: 100%; }
        .marquee-column { display: flex; flex-direction: column; gap: 1rem; }
        .marquee-up   { animation: marquee-up   40s linear infinite; }
        .marquee-down { animation: marquee-down 40s linear infinite; }
        @keyframes marquee-up   { 0% { transform: translateY(0); }    100% { transform: translateY(-50%); } }
        @keyframes marquee-down { 0% { transform: translateY(-50%); } 100% { transform: translateY(0); }    }
      `}</style>
    </section>
  );
}

function TestimonialColumn({ direction, images }: { direction: "up" | "down"; images: string[] }) {
  const loopImages = [...images, ...images];
  return (
    <div className="relative">
      <div className={`marquee-column ${direction === "up" ? "marquee-up" : "marquee-down"}`}>
        {loopImages.map((src, idx) => (
          <div key={`${src}-${idx}`} className="overflow-hidden rounded-[20px] border border-slate-800 bg-black/70">
            <Image src={src} alt="Student result" width={400} height={260} className="h-auto w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqSection() {
  const faqs = [
    { q:'Is the Master Room suitable for beginners?', a:'Yes. Even with zero experience. We give exact instructions—entries, stop-loss, targets and management—to copy inside the room. Follow the step-by-step guide and start making money.' },
    { q:'Do I need a big account to start?', a:'No. You can start small and scale. Returns can be compounded, and many members grow further with prop-firm funding once consistent.' },
    { q:'How fast can I see results?', a:'Most members start to profit within hours. Follow the instructions and you\'ll do the same.' },
    { q:'Does my age matter?', a:'No. If you can use a phone or computer, you can execute the trades. If you are under 18, please consult a parent or guardian before signing up.' },
    { q:'I don\'t have much time. Can I still join?', a:'Yes. You can copy signals manually in about 15 minutes a day, or use a trade copier to automate execution end-to-end.' },
    { q:'I live in X country. Is that a problem?', a:'Not at all. We trade global Forex pairs online, so location doesn\'t matter.' },
    { q:'Can I cancel anytime?', a:'Yes—absolutely. No lock-in. You can manage or cancel your subscription from your account page.' },
    { q:'Still have questions?', a:'Reach out to the Range support team and ask anything—we\'ll get back to you ASAP.' },
  ];
  return (
    <section id="faq" className="relative bg-black pt-24 pb-0 md:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(59,130,246,.07),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-16 overflow-hidden rounded-[34px] border border-purple-900/40" style={{ background:"linear-gradient(135deg, #130b24 0%, #0d0818 50%, #0b0a14 100%)", boxShadow:"inset 0 1px 0 rgba(139,92,246,.15), inset 0 0 60px rgba(109,40,217,.10), 0 20px 60px rgba(0,0,0,.5)" }}>
          <div className="flex flex-col items-center gap-4 px-6 py-10 text-center md:flex-row md:justify-between md:px-10">
            <h3 className="text-2xl font-semibold text-white md:text-4xl">This Is Your Moment — Act On It</h3>
            <div className="flex items-center gap-3 shrink-0">
              <a href="/join" className="px-6 py-3 text-sm font-semibold text-black transition hover:brightness-105" style={{ background: GOLD }}>Enroll Today</a>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80"><span className="h-2 w-2 rounded-full bg-green-400" />Limited Spaces Left</span>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">FREQUENTLY ASKED QUESTIONS</p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-5xl">Frequently Asked Questions</h2>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.25fr]">
          <div className="order-1 space-y-4 md:order-none md:col-start-2 md:row-span-2">
            {faqs.map((item,idx) => <FaqAccordion key={idx} index={idx+1} q={item.q} a={item.a} />)}
          </div>
          <div className="order-2 overflow-hidden rounded-[24px] border border-purple-900/40 p-6 text-white md:order-none md:col-start-1 md:row-start-2" style={{ background:"linear-gradient(160deg, #1a0f2e 0%, #100a1f 60%, #0d0818 100%)", boxShadow:"inset 0 0 40px rgba(109,40,217,.10)" }}>
            <div className="text-lg font-semibold text-white">Questions not covered?</div>
            <p className="mt-1 text-sm text-white/55">Tap the support bot in the bottom-right corner and we&apos;ll help you out.</p>
            <a href="https://t.me/rangesupportfx" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block px-4 py-2 text-sm font-semibold text-black transition hover:brightness-105" style={{ background: GOLD }}>Open Telegram Support</a>
          </div>
          <div className="order-3 relative overflow-hidden rounded-[24px] border border-white/10 bg-[#070A10] p-6 md:order-none md:col-start-1 md:row-start-1">
            <div className="pointer-events-none absolute -right-6 -top-6 opacity-[0.04]"><Image src="/mr-logo.webp" alt="" width={120} height={120} /></div>
            <p className="text-base leading-7 text-zinc-400">Everything taught inside <span className="text-white font-semibold">MASTER ROOM</span> is for educational purposes only. Implementation and results depend on each member&apos;s execution and risk control.</p>
            <p className="mt-4 text-base leading-7 text-zinc-400">We do not guarantee profits or financial success. Trade responsibly and never risk funds you cannot afford to lose.</p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
              <a href="/terms" className="underline underline-offset-2 hover:text-white">Terms &amp; Conditions</a><span>•</span><a href="/privacy" className="underline underline-offset-2 hover:text-white">Privacy Policy</a>
            </div>
            <div className="mt-3 text-sm text-zinc-500">Support: <a href="https://t.me/rangesupportfx" target="_blank" rel="noopener noreferrer" className="font-semibold text-zinc-300 underline">Range Support Team</a></div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </section>
  );
}

function FaqAccordion({ index, q, a }: { index:number; q:string; a:string }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="overflow-hidden rounded-[20px] border border-white/10 bg-[#070A10] transition hover:bg-[#0b0f18]">
      <div className="flex">
        <div className="hidden w-14 items-center justify-center border-r border-white/10 md:flex" style={{ background:"linear-gradient(180deg,rgba(109,40,217,.85),rgba(91,33,182,.9))" }}>
          <span className="select-none font-extrabold text-white/90 text-[20px]">{index}</span>
        </div>
        <button type="button" onClick={() => setOpen(v=>!v)} className="flex w-full items-center gap-4 px-5 py-5 text-left md:pl-6">
          <span className="flex-1 text-[15.5px] font-semibold text-white">{q}</span>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5">
            <svg className="h-4 w-4 text-white/60" style={{ transform:open?'rotate(45deg)':'rotate(0deg)', transition:'transform .2s' }} viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" /></svg>
          </span>
        </button>
      </div>
      <div className="grid" style={{ gridTemplateRows:open?'1fr':'0fr', transition:'grid-template-rows .3s ease' }}>
        <div className="overflow-hidden"><div className="border-t border-white/[0.08] px-5 py-4 text-[15px] leading-7 text-zinc-400 md:pl-20">{a}</div></div>
      </div>
    </article>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 md:mt-32 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-black py-14">
      <div className="mx-auto max-w-5xl px-6 text-center text-sm text-zinc-500">
        <div className="mb-6 flex justify-center">
          <div className="rounded-xl border border-white/10 bg-[#070A10] shadow-[0_10px_34px_rgba(0,0,0,.5)] p-2">
            <Image src="/mr-footer.webp" alt="Master Room" width={70} height={70} className="block rounded-lg" />
          </div>
        </div>
        <div className="mb-4 flex justify-center gap-4">
          <a href="/privacy" className="hover:text-white transition">Privacy Policy</a><span>•</span><a href="/terms" className="hover:text-white transition">Terms &amp; Conditions</a>
        </div>
        <p className="text-xs text-zinc-600">© 2026 Range Universe. All rights reserved.</p>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3">
      <a href="/join" className="hidden sm:inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold text-black transition hover:brightness-105 active:translate-y-[1px]" style={{ background: GOLD, boxShadow:"0 8px 24px rgba(253,224,71,.25)" }}>Enroll Today</a>
      <a href="https://t.me/rangesupportfx" target="_blank" rel="noopener noreferrer" aria-label="Open Support Chat" className="relative grid h-12 w-12 place-items-center rounded-full transition hover:scale-[1.05]" style={{ background:`linear-gradient(135deg,${BRAND.PURPLE} 0%,${BRAND.PURPLE_DARK} 100%)`, border:"1px solid rgba(255,255,255,.14)", boxShadow:`0 14px 28px ${hexA(BRAND.PURPLE,.35)},inset 0 1px 0 rgba(255,255,255,0.12)` }}>
        <svg viewBox="0 0 48 48" width="24" height="24" aria-hidden className="relative">
          <path d="M24 6C13.5 6 5 13.6 5 23c0 3.3 1 6.5 3 9.2.4.6.5 1.4.4 2.1l-1.2 4.9c-.3 1.2.8 2.3 2 2l5-1.5c.7-.2 1.5-.3 2.2-.1 2.3.7 4.9 1.1 7.6 1.1 10.5 0 19-7.6 19-17S34.5 6 24 6Z" fill={hexA('#000',.12)} />
          <path d="M24 8C14.6 8 7 15 7 23.8c0 3 .9 5.9 2.7 8.3.5.7.7 1.6.5 2.5l-.9 3.9 4-1.2c.9-.3 1.8-.3 2.7 0 2.2.7 4.6 1 7 1 9.4 0 17-6.9 17-15.5S33.4 8 24 8Z" fill="url(#mrBg)" />
          <defs><linearGradient id="mrBg" x1="10" y1="6" x2="40" y2="44" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor={BRAND.PURPLE_LIGHT} /><stop offset="1" stopColor={BRAND.PURPLE_DARK} /></linearGradient></defs>
          <path d="M24 29v-1.2c0-2.2 1.4-3.4 3-4.3 1.6-.9 3-1.9 3-3.8 0-2.7-2.4-4.6-5.6-4.6-3 0-5 1.3-5.9 3.6" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="34" r="2.2" fill="#ffffff" />
        </svg>
      </a>
    </div>
  );
}