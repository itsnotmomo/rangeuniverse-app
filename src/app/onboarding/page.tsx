"use client";

import React, { useState } from "react";
import { CreditCard, X, ExternalLink, Copy } from "lucide-react";

export default function JoinPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState("");

  function openCheckout(url: string) {
    setCheckoutUrl(url);
    setCheckoutOpen(true);
    try { window.open(url, "_blank", "noopener,noreferrer"); } catch {}
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* AMBIENT BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(168,85,247,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_80%,rgba(253,224,71,0.07),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(59,130,246,0.07),transparent)]" />
        {/* noise */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.4\"/></svg>')",
          }}
        />
      </div>

      {/* MINIMAL NAV */}
      <header className="relative z-10 flex items-center justify-center px-6 py-6">
        <div className="flex items-center gap-3">
          <img src="/mastermind.webp" alt="Mastermind" className="h-8 w-8" />
          <span className="text-sm font-bold tracking-[0.25em] uppercase text-white/90">Mastermind</span>
        </div>
      </header>

      {/* HERO COPY */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-10 pb-16 text-center">
        {/* pill */}
        <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-yellow-300/20 bg-yellow-300/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow-200">
          23 Mar → 23 Apr · Live Bootcamp
        </div>

        <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Choose your{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg,#fef9c3,#fde047,#fbbf24)" }}
          >
            Bootcamp Ticket
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
          All tickets include full live access, recordings, and private support.
          Pick the level that fits where you are.
        </p>
      </div>

      {/* CARDS */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-32">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* ── REGULAR ── */}
          <PlanCard
            badge="REGULAR"
            badgeColor="white"
            title="Regular"
            price="$299"
            valueNote="Core Access"
            subline="Everything you need to learn and execute the Range System during the live cohort."
            accent="purple"
            features={[
              "All 10 live bootcamp sessions",
              "Lifetime access to all recordings",
              "Full Range System on real charts",
              "Live Q&A during every session",
              "Private bootcamp community access",
              "1 free month in the Range Signal Room",
            ]}
            cardCheckoutUrl="https://whop.com/checkout/plan_znlsZ3ZYvRi38"
            cryptoHref="https://t.me/rangesupportfx"
            onOpen={openCheckout}
          />

          {/* ── VIP ── */}
          <PlanCard
            badge="VIP"
            badgeColor="yellow"
            title="VIP"
            price="$499"
            valueNote="Giveaway Access"
            subline="Extra perks, priority support, and entry into the €3,000 FTMO giveaway."
            accent="yellow"
            ribbon="MOST POPULAR"
            features={[
              "Everything in Regular",
              "Entry to the €3,000 FTMO giveaway",
              "3 free months in the Range Signal Room",
              "Priority support from the team",
              "Priority responses throughout cohort",
            ]}
            cardCheckoutUrl="https://whop.com/checkout/plan_KofVS1bvVTyju"
            cryptoHref="https://t.me/rangesupportfx"
            onOpen={openCheckout}
          />

          {/* ── ULTIMATE ── */}
          <PlanCard
            badge="ULTIMATE"
            badgeColor="cyan"
            title="Ultimate"
            price="$799"
            valueNote="Full Year Access"
            subline="The complete package — bootcamp + 12 months of daily signal room access."
            accent="cyan"
            features={[
              "Everything in VIP",
              "12 months Master Room access",
              "Daily signals + execution commentary",
              "Giveaway entry included",
              "Highest priority support & responses",
            ]}
            cardCheckoutUrl="https://whop.com/checkout/plan_Orn3QFU84DkV3"
            cryptoHref="https://t.me/rangesupportfx"
            onOpen={openCheckout}
          />

        </div>

        {/* BOTTOM NOTE */}
        <div className="mt-10 text-center">
          <p className="text-sm text-white/50">
            Seats are limited to keep the bootcamp interactive.{" "}
            <span className="text-white/70">Once we hit the cap, tickets close.</span>
          </p>
          <p className="mt-2 text-[11px] text-white/30">
            Secure checkout · Instant access · Works on mobile & desktop
          </p>
        </div>
      </div>

      {/* CHECKOUT OVERLAY */}
      <CheckoutOverlay
        open={checkoutOpen}
        url={checkoutUrl}
        onClose={() => setCheckoutOpen(false)}
      />

      {/* GLOBAL SUBTLE GRID */}
      <style jsx global>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.55s ease both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.15s; }
        .fade-up-3 { animation-delay: 0.25s; }
      `}</style>
    </main>
  );
}


/* ============================================================
   PLAN CARD
   ============================================================ */
type Accent = "purple" | "yellow" | "cyan";

const ACCENT_MAP: Record<Accent, {
  border: string;
  glow: string;
  badgeBorder: string;
  badgeBg: string;
  badgeText: string;
  dot: string;
  cta: string;
}> = {
  purple: {
    border: "border-purple-500/30",
    glow: "bg-purple-500/12",
    badgeBorder: "border-white/10",
    badgeBg: "bg-white/5",
    badgeText: "text-white/70",
    dot: "bg-purple-400",
    cta: "from-purple-200 via-purple-300 to-purple-400",
  },
  yellow: {
    border: "border-yellow-400/50",
    glow: "bg-yellow-300/10",
    badgeBorder: "border-yellow-300/25",
    badgeBg: "bg-yellow-300/10",
    badgeText: "text-yellow-200",
    dot: "bg-yellow-300",
    cta: "from-[#fef9c3] via-[#fde047] to-[#fbbf24]",
  },
  cyan: {
    border: "border-cyan-400/40",
    glow: "bg-cyan-400/10",
    badgeBorder: "border-cyan-300/25",
    badgeBg: "bg-cyan-300/10",
    badgeText: "text-cyan-200",
    dot: "bg-cyan-300",
    cta: "from-cyan-100 via-cyan-300 to-cyan-400",
  },
};

function PlanCard({
  badge,
  badgeColor,
  title,
  price,
  valueNote,
  subline,
  accent,
  ribbon,
  features,
  cardCheckoutUrl,
  cryptoHref,
  onOpen,
}: {
  badge: string;
  badgeColor: "white" | "yellow" | "cyan";
  title: string;
  price: string;
  valueNote: string;
  subline: string;
  accent: Accent;
  ribbon?: string;
  features: string[];
  cardCheckoutUrl: string;
  cryptoHref: string;
  onOpen: (url: string) => void;
}) {
  const a = ACCENT_MAP[accent];
  const isYellow = accent === "yellow";

  return (
    <div
      className={[
        "relative overflow-hidden rounded-[32px] border bg-[#070A10]",
        "p-7 shadow-[0_60px_180px_rgba(0,0,0,0.85)]",
        "flex flex-col",
        a.border,
        "fade-up",
        accent === "purple" ? "fade-up-1" : accent === "yellow" ? "fade-up-2" : "fade-up-3",
      ].join(" ")}
    >
      {/* glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute -top-24 left-1/2 h-52 w-[480px] -translate-x-1/2 rounded-full ${a.glow} blur-3xl`} />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/60" />
      </div>

      {/* ribbon */}
      {ribbon && (
        <div className="absolute right-5 top-5 rounded-full border border-yellow-300/20 bg-yellow-300/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-yellow-200">
          {ribbon}
        </div>
      )}

      <div className="relative flex flex-col flex-1">
        {/* badge */}
        <div
          className={[
            "inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em]",
            a.badgeBorder, a.badgeBg, a.badgeText,
          ].join(" ")}
        >
          {badge}
        </div>

        {/* title + price */}
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">{title}</h2>

        <div className="mt-4 flex items-end gap-3">
          <span className="text-[44px] font-semibold leading-none tracking-tight text-white">{price}</span>
          <span className={[
            "mb-1 rounded-full border px-3 py-1 text-[10px] font-semibold",
            a.badgeBorder, a.badgeBg, a.badgeText,
          ].join(" ")}>{valueNote}</span>
        </div>
        <p className="mt-1 text-[11px] text-white/40">One-time payment</p>

        {/* subline */}
        <p className="mt-5 text-sm leading-relaxed text-white/65">{subline}</p>

        {/* divider */}
        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* features */}
        <ul className="space-y-3 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-white/70">
              <span className={`mt-[6px] inline-block h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} />
              <span className="leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={() => onOpen(cardCheckoutUrl)}
            className={[
              "inline-flex w-full items-center justify-center gap-2 rounded-[18px] px-6 py-4",
              "text-xs font-semibold uppercase tracking-[0.2em] text-black",
              "bg-gradient-to-r transition hover:brightness-105",
              `${a.cta}`,
              "shadow-[0_20px_60px_rgba(0,0,0,0.3)]",
            ].join(" ")}
          >
            <CreditCard className="h-3.5 w-3.5" />
            Pay with Card
          </button>

          <button
            type="button"
            onClick={() => onOpen(cryptoHref)}
            className={[
              "inline-flex w-full items-center justify-center gap-2 rounded-[18px] px-6 py-4",
              "text-xs font-semibold uppercase tracking-[0.2em] text-white/80",
              "border border-white/10 bg-white/5 transition hover:bg-white/10",
            ].join(" ")}
          >
            <img src="/crypto-icon.webp" alt="" className="h-3.5 w-3.5" draggable={false} />
            Pay with Crypto
          </button>
        </div>
      </div>
    </div>
  );
}


/* ============================================================
   CHECKOUT OVERLAY
   ============================================================ */
function CheckoutOverlay({
  open,
  url,
  onClose,
}: {
  open: boolean;
  url: string;
  onClose: () => void;
}) {
  async function copyLink() {
    try { await navigator.clipboard.writeText(url); } catch {}
  }

  if (!open) return null;

  const isTelegram = url.includes("t.me");

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-[480px] overflow-hidden rounded-[26px] border border-white/10 bg-[#070A10] shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 h-48 w-[420px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-base font-semibold text-white">
                {isTelegram ? "Opening Telegram…" : "Opening secure checkout…"}
              </div>
              <p className="mt-1 text-sm text-white/55 leading-relaxed">
                {isTelegram
                  ? "Message our team on Telegram to pay with crypto and get instant access."
                  : "A new tab opened automatically. Use the link below if nothing happened."}
              </p>
            </div>
            <button
              onClick={onClose}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-5 space-y-2.5">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-[13px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              <ExternalLink className="h-4 w-4" />
              {isTelegram ? "Open Telegram" : "Continue to checkout"}
            </a>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[13px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/55 hover:bg-white/10 transition"
            >
              <Copy className="h-4 w-4" />
              Copy link
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-[13px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/35 hover:bg-white/8 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}