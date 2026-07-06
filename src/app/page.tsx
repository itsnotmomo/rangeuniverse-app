"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/range.fx", icon: <InstagramIcon /> },
  { label: "Telegram", href: "https://t.me/+MqSg18qmpEVjMTI0", icon: <TelegramIcon /> },
];

export default function Gateway() {
  return (
    <main className="relative min-h-screen w-full bg-[#060a0f] text-white overflow-hidden flex flex-col">
      <AmbientBg />

      {/* ── HEADER ── */}
      <header className="relative z-20 flex flex-col items-center pt-8 pb-4 gap-1.5">
        <Image src="/mr-logo.webp" alt="Range Universe" width={40} height={40} className="object-contain" priority />
        <span className="text-[9px] tracking-[0.38em] uppercase text-white/35 font-medium">RANGE UNIVERSE</span>
      </header>

      {/* ── TWO PANELS ── */}
      <div className="relative z-10 flex flex-col md:flex-row flex-1 gap-3 px-4 pb-4 md:gap-4 md:px-6">
        <Panel
          href="/signals"
          label="Copy Our Trades"
          tag="LIVE TRADING SIGNALS"
          description="Join the #1 trading room in the world. Copy trades from professional traders with years of experience and start profiting today."
          accent="#00d4ff"
          accentRgb="0,212,255"
          icon={<SignalIcon />}
        />
        <Panel
          href="/bootcamp"
          label="1-on-1 Mentorship"
          tag="PRIVATE COACHING"
          description="Get customised 1-on-1 mentorship from a professional trader with proven results that will turn you into a profitable trader."
          accent="#a78bfa"
          accentRgb="167,139,250"
          icon={<MentorIcon />}
        />
      </div>

      {/* ── SOCIAL FOOTER ── */}
      <footer className="relative z-20 flex flex-col items-center gap-3 pb-6 pt-2">
        <div className="h-px w-32" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.09), transparent)" }} />
        <div className="flex items-center gap-4">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[.04] text-white/35 transition-all duration-200 hover:border-white/25 hover:text-white active:scale-95">
              {s.icon}
            </a>
          ))}
        </div>
        <span className="text-[9px] tracking-[0.24em] uppercase text-white/20">© Range Universe</span>
      </footer>
    </main>
  );
}

/* ─────────────────────────────────────────────
   PANEL
───────────────────────────────────────────── */
function Panel({
  href, label, tag, description, accent, accentRgb, icon,
}: {
  href: string;
  label: string;
  tag: string;
  description: string;
  accent: string;
  accentRgb: string;
  icon: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-1 flex-col items-center justify-center rounded-2xl border overflow-hidden px-6 py-8 md:py-0 md:min-h-0 transition-all duration-300"
      style={{
        minHeight: "clamp(200px, 36vh, 320px)",
        textDecoration: "none",
        borderColor: hovered ? `rgba(${accentRgb},0.45)` : "rgba(255,255,255,0.07)",
        background: hovered ? `rgba(${accentRgb},0.07)` : "rgba(255,255,255,0.02)",
        boxShadow: hovered ? `0 0 40px rgba(${accentRgb},0.12), inset 0 1px 0 rgba(255,255,255,0.06)` : "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Glow blob */}
      <div aria-hidden className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0.4,
          background: `radial-gradient(60% 60% at 50% 60%, rgba(${accentRgb},0.10), transparent)`,
        }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-3">
        {/* Icon */}
        <div className="flex items-center justify-center rounded-xl border transition-all duration-400 mb-1"
          style={{
            width: 52, height: 52,
            borderColor: hovered ? `rgba(${accentRgb},0.5)` : "rgba(255,255,255,0.08)",
            background: hovered ? `rgba(${accentRgb},0.12)` : "rgba(255,255,255,0.04)",
            color: hovered ? accent : "rgba(255,255,255,0.4)",
            boxShadow: hovered ? `0 0 20px rgba(${accentRgb},0.3)` : "none",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}>
          {icon}
        </div>

        {/* Tag */}
        <span className="text-[9px] font-bold tracking-[0.28em] uppercase transition-colors duration-300"
          style={{ color: hovered ? accent : "rgba(255,255,255,0.28)" }}>
          {tag}
        </span>

        {/* Title */}
        <h2 className={`${bebas.className} leading-none tracking-[0.04em]`}
          style={{
            fontSize: "clamp(32px, 7vw, 56px)",
            color: hovered ? "#fff" : "rgba(255,255,255,0.88)",
            textShadow: hovered ? `0 0 40px rgba(${accentRgb},0.5)` : "none",
            transition: "color 0.3s, text-shadow 0.3s",
          }}>
          {label}
        </h2>

        {/* Divider */}
        <div className="h-px transition-all duration-400"
          style={{
            width: hovered ? 56 : 32,
            background: hovered
              ? `linear-gradient(to right, transparent, ${accent}, transparent)`
              : "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)",
          }} />

        {/* Description */}
        <p className="text-[12px] md:text-[13px] leading-relaxed max-w-[260px] transition-colors duration-300"
          style={{ color: hovered ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)" }}>
          {description}
        </p>

        {/* CTA */}
        <div className="mt-1 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300"
          style={{
            borderColor: hovered ? `rgba(${accentRgb},0.55)` : "rgba(255,255,255,0.10)",
            background: hovered ? `rgba(${accentRgb},0.10)` : "transparent",
            color: hovered ? accent : "rgba(255,255,255,0.35)",
            boxShadow: hovered ? `0 2px 16px rgba(${accentRgb},0.15)` : "none",
          }}>
          Enter
          <svg className="h-2.5 w-2.5 transition-transform duration-300"
            style={{ transform: hovered ? "translateX(2px)" : "translateX(0)" }}
            viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   AMBIENT BG
───────────────────────────────────────────── */
function AmbientBg() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(600px circle at 20% 50%, rgba(0,212,255,0.04), transparent 55%),
          radial-gradient(600px circle at 80% 50%, rgba(167,139,250,0.04), transparent 55%),
          #060a0f
        `
      }} />
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundRepeat: "repeat",
      }} />
      <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="g" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
function SignalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C9.5 2 7 3.5 7 6c0 1.5.8 2.8 2 3.5V11h6V9.5c1.2-.7 2-2 2-3.5 0-2.5-2.5-4-5-4z" />
      <path d="M9 11v8a1 1 0 001 1h4a1 1 0 001-1v-8" />
      <path d="M10 14h4" />
      <path d="M10 17h4" />
      <path d="M12 5v3" />
      <path d="M10.5 6.5h3" />
    </svg>
  );
}

function MentorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" />
      <path d="M17 10l1.5 1.5L21 9" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
    </svg>
  );
}