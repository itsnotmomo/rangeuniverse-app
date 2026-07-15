"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Anton } from "next/font/google";
const anton = Anton({ subsets: ["latin"], weight: "400" });

/* =====================  DISCOUNTED PRICING  ===================== */
const PRICE = {
  one_month_now: 49,
  one_month_was: 69,

  three_months_now: 129,
  three_months_was: 199,

  one_year_now: 399,
  one_year_was: 699,

  lifetime_now: 799,
  lifetime_was: 1999,
} as const;

/* =====================  Card checkout URLs  ===================== */
const CARD_CHECKOUT_ONE_MONTH =
  "https://whop.com/checkout/plan_04cUY6JeUZz2V";
const CARD_CHECKOUT_THREE_MONTHS =
  "https://whop.com/checkout/plan_VVCh7MaMDD7nE";
const CARD_CHECKOUT_ONE_YEAR =
  "https://whop.com/checkout/plan_uya7cwWG6EuxW";

type PlanId = "one_month" | "three_months" | "one_year";

type Plan = {
  id: PlanId;
  name: string;
  priceNow: number;
  priceWas: number;
  devices: number;
  subline: string;
  features: string[];
  checkoutUrl: string;
  discountLabel: string;
};

const PLANS: ReadonlyArray<Plan> = [
  {
    id: "one_month",
    name: "1 Month",
    priceNow: PRICE.one_month_now,
    priceWas: PRICE.one_month_was,
    devices: 3,
    subline: "Billed monthly • Cancel anytime",
    checkoutUrl: CARD_CHECKOUT_ONE_MONTH,
    discountLabel: "29% OFF",
    features: [
      "Daily signals: EURUSD, AUDUSD, EURAUD, EURJPY, EUR/CHF",
      "5–10% gain per month",
      "≈150R/mo • 3+ yrs track record",
      "Range.FX system (step-by-step)",
      "Weekly live calls with the team",
      "Built to generate you profit",
    ],
  },
  {
    id: "three_months",
    name: "3 Months",
    priceNow: PRICE.three_months_now,
    priceWas: PRICE.three_months_was,
    devices: 5,
    subline: "Billed every 3 months • Cancel anytime",
    checkoutUrl: CARD_CHECKOUT_THREE_MONTHS,
    discountLabel: "35% OFF",
    features: [
      "Everything in 1 Month",
      "Priority replies from the team",
      "2 workshops/month • trade breakdowns",
      "Pro-only recaps & playbooks",
      "Strategy vault + journal templates",
      "5 devices",
    ],
  },
  {
    id: "one_year",
    name: "1 Year",
    priceNow: PRICE.one_year_now,
    priceWas: PRICE.one_year_was,
    devices: 7,
    subline: "Billed yearly • Cancel anytime",
    checkoutUrl: CARD_CHECKOUT_ONE_YEAR,
    discountLabel: "43% OFF",
    features: [
      "Everything in 3 Months",
      "Range Mastermind course included (€799) ::HIGHLIGHT",
      "Quarterly 1:1 private review",
      "ELITE thread & early strategy access",
      "Personal risk plan setup + funding roadmap",
      "7 devices",
    ],
  },
];

function buildCryptoMessage(planId: PlanId) {
  const plan = PLANS.find((p) => p.id === planId);
  const planName = plan?.name ?? planId.replaceAll("_", " ").toUpperCase();
  return `Hi, I would like to pay with crypto for the Master Room ${planName} plan. Can you help me complete the payment?`;
}

export default function Join() {
  const [selected, setSelected] = useState<PlanId | null>(null);
  const [supportUrl, setSupportUrl] = useState<string | null>(null);

  const plansWithPrices = useMemo(() => {
    return PLANS.map((p) => ({
      ...p,
      displayNow: p.priceNow,
      displayWas: p.priceWas,
    }));
  }, []);

  // Must stay in the click handler: window.open() outside a user gesture is
  // popup-blocked. t.me links already hand off to the Telegram app when it is
  // installed, so a tg:// attempt alongside this would only ever double-open --
  // window.open() returns null whenever noopener is set, which makes a failed
  // deep link indistinguishable from a successful one.
  function openSupport(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
    setSupportUrl(url);
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a1016] text-white">
      <TRWBackdrop />
      <RangeAccents />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28 pt-16 md:pt-20">
        <header className="text-center">
          <div className="mx-auto mb-4 h-14 w-14">
            <Image
              src="/mr-logo.webp"
              alt="Master Room"
              width={60}
              height={60}
              className="h-full w-full object-contain"
              priority
            />
          </div>

          <HeroTitle />

          <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] text-white/75 md:text-[16px]">
            Choose your access duration and lock in your plan.
          </p>
        </header>

        {/* Plans */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {plansWithPrices.map((plan) => {
            const isSelected = selected === plan.id;

            return (
              <div
                key={plan.id}
                onMouseEnter={() => setSelected(plan.id)}
                onFocus={() => setSelected(plan.id)}
                className={
                  "relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 shadow-2xl transition-all duration-300 " +
                  (plan.id === "three_months"
                    ? "border-cyan-400/40 bg-white/[.045] ring-1 ring-cyan-300/20"
                    : "border-white/10 bg-white/[.03]") +
                  (isSelected
                    ? " scale-[1.01] ring-2 ring-cyan-400/50"
                    : " hover:scale-[1.005] hover:ring-1 hover:ring-white/20")
                }
              >
                <PlanSaleAuras />
                <CornerRibbon label={plan.discountLabel} tone="standard" />

                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {plan.name}
                  </h3>
                  <span className="text-xs text-white/60">
                    {plan.devices} devices
                  </span>
                </div>

                {/* ================= PRICE BLOCK ================= */}
                <div className="mt-4">
                  <div className="relative flex flex-wrap items-end gap-x-4 gap-y-2">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -left-2 -top-3 hidden h-16 w-28 rotate-[-12deg] rounded-2xl border border-yellow-300/15 bg-yellow-300/5 blur-[0px] md:block"
                    />
                    <div className="text-4xl font-extrabold tracking-tight md:text-5xl">
                      €{format(plan.displayNow)}
                    </div>

                    <div className="pb-1 text-xl font-extrabold text-white/65 line-through md:text-2xl">
                      €{format(plan.displayWas)}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-white/60">{plan.subline}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="mt-6 flex-1 space-y-2 text-sm text-white/85">
                  {plan.features.map((f) => {
                    const highlight = f.endsWith("::HIGHLIGHT");
                    const txt = highlight
                      ? f
                          .replace(" ::HIGHLIGHT", "")
                          .replace("::HIGHLIGHT", "")
                      : f;
                    return (
                      <li key={f} className="flex items-start gap-2">
                        <Tick className="mt-0.5 h-4 w-4 flex-none" />
                        {highlight ? (
                          <span className="rounded-md border border-amber-300/35 bg-amber-400/15 px-2 py-0.5 font-semibold text-amber-200">
                            {txt}
                          </span>
                        ) : (
                          <span>{txt}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* Actions */}
                <div className="mt-4 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      const message = buildCryptoMessage(plan.id);
                      const url = `https://t.me/rangesupportfx?text=${encodeURIComponent(
                        message
                      )}`;
                      openSupport(url);
                    }}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-emerald-400/70 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-100 backdrop-blur transition hover:border-emerald-300 hover:bg-emerald-400/20"
                  >
                    <img
                      src="/crypto-icon.webp"
                      className="h-4 w-4 opacity-90"
                      alt=""
                    />
                    Pay with Crypto
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* LIFETIME */}
        <LifetimePlanCard
          onCrypto={() => {
            const message =
              "Hi, I would like to pay with crypto for the Master Room Lifetime plan. Can you help me complete the payment?";
            openSupport(
              `https://t.me/rangesupportfx?text=${encodeURIComponent(message)}`
            );
          }}
          priceNow={PRICE.lifetime_now}
          priceWas={PRICE.lifetime_was}
          discountLabel="60% OFF"
        />

        <UnderPlansStrip />

        {/* Interstitial */}
        {supportUrl && (
          <OpenNewTabModal
            title="Opening support in Telegram…"
            ctaLabel="Open Telegram"
            url={supportUrl}
            onClose={() => setSupportUrl(null)}
          />
        )}
      </section>

      {/* Help dock */}
      <button
        onClick={() => openSupport("https://t.me/rangesupportfx")}
        className="fixed bottom-5 right-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
      >
        <img src="/crypto-icon.webp" className="h-4 w-4" alt="" />
        Need help? Open support
      </button>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-55%); }
          60% { transform: translateX(55%); }
          100% { transform: translateX(55%); }
        }
        @keyframes sheen {
          0% { transform: translateX(-220px) rotate(20deg); opacity: 0; }
          25% { opacity: 0.6; }
          55% { transform: translateX(520px) rotate(20deg); opacity: 0; }
          100% { transform: translateX(520px) rotate(20deg); opacity: 0; }
        }
      `}</style>
    </main>
  );
}

/* =====================  SALE AURAS (cards)  ===================== */
function PlanSaleAuras() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 left-1/2 h-28 w-[120%] -translate-x-1/2 blur-[40px] opacity-80"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(250,204,21,.20), rgba(34,211,238,.10), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,.10), inset 0 0 0 1px rgba(255,255,255,.04)",
        }}
      />
    </>
  );
}

/* =====================  CORNER RIBBON  ===================== */
function CornerRibbon({
  label,
  tone,
}: {
  label: string;
  tone: "standard" | "lifetime";
}) {
  const isLifetime = tone === "lifetime";
  return (
    <div className="pointer-events-none absolute right-[-46px] top-[22px] z-[2] rotate-[35deg]">
      <div
        className={[
          "relative inline-flex items-center justify-center",
          "w-[180px] px-3 py-2",
          "text-[11px] font-extrabold tracking-[.22em] uppercase",
          "shadow-[0_18px_40px_rgba(0,0,0,.45)]",
          "border",
          isLifetime
            ? "border-yellow-300/45 text-yellow-100"
            : "border-yellow-300/35 text-yellow-100",
        ].join(" ")}
        style={{
          background: isLifetime
            ? "linear-gradient(90deg, rgba(11,15,24,.88), rgba(11,15,24,.88)), linear-gradient(90deg, rgba(250,204,21,.22), rgba(236,72,153,.16), rgba(56,189,248,.12))"
            : "linear-gradient(90deg, rgba(11,15,24,.88), rgba(11,15,24,.88)), linear-gradient(90deg, rgba(250,204,21,.20), rgba(56,189,248,.14), rgba(168,85,247,.12))",
          backdropFilter: "blur(10px)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* =====================  HERO TITLE  ===================== */
function HeroTitle() {
  const strokeGlow = [
    "0 1px 0 rgba(0,0,0,.9)",
    "0 8px 22px rgba(0,0,0,.45)",
    "0 0 22px rgba(56,189,248,.28)",
  ].join(", ");

  return (
    <h1
      className={`${anton.className} mx-auto max-w-5xl text-center uppercase font-extrabold leading-[1.06] tracking-[.13em]`}
      style={{
        fontSize: "clamp(34px, 6.2vw, 64px)",
        color: "#fff",
        textShadow: strokeGlow,
      }}
    >
      <span className="block">CHOOSE YOUR PATH</span>
      <span className="block">TO PROFITABILITY</span>
    </h1>
  );
}

/* =====================  FULL-PAGE BACKDROP  ===================== */
function TRWBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#0a1016",
          backgroundImage: `
            radial-gradient(660px 340px at 50% 140px, rgba(148,163,184,.34), transparent 70%),
            radial-gradient(1700px 1000px at 50% -12%, rgba(15,23,42,.58), transparent 64%),
            radial-gradient(1500px 1200px at 50% 120%, rgba(0,0,0,.60), rgba(0,0,0,.96))
          `,
        }}
      />

      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gridStrokeA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bde3ff" stopOpacity=".42" />
            <stop offset="100%" stopColor="#8aa3b7" stopOpacity=".22" />
          </linearGradient>
          <linearGradient id="fadeDownA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopOpacity="1" />
            <stop offset="55%" stopOpacity=".75" />
            <stop offset="100%" stopOpacity=".32" />
          </linearGradient>
          <mask id="fadeMaskA" maskUnits="objectBoundingBox">
            <rect width="100%" height="100%" fill="url(#fadeDownA)" />
          </mask>
        </defs>

        <g mask="url(#fadeMaskA)" opacity=".85">
          {Array.from({ length: 24 }).map((_, i) => (
            <path
              key={`h-${i}`}
              d={`M -220 ${i * 46} C 240 ${i * 30}, 980 ${i * 60}, 1620 ${i * 46}`}
              fill="none"
              stroke="url(#gridStrokeA)"
              strokeWidth="0.9"
            />
          ))}
          {Array.from({ length: 18 }).map((_, i) => (
            <path
              key={`v-${i}`}
              d={`M ${i * 86} -220 C ${i * 66} 300, ${i * 110} 980, ${i * 86} 1620`}
              fill="none"
              stroke="url(#gridStrokeA)"
              strokeWidth="0.9"
            />
          ))}
        </g>
      </svg>

      <svg className="absolute inset-0 h-full w-full opacity-[.12]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="pA" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeOpacity="0.9" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#pA)" />
      </svg>

      <div
        className="absolute inset-0 opacity-[.10]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0.35'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}

/* =====================  RANGE ACCENTS  ===================== */
function RangeAccents() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
      <div
        className="absolute left-1/2 top-[140px] h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(56,189,248,.18), rgba(168,85,247,.12), transparent 70%)",
        }}
      />
      <div
        className="absolute left-1/2 top-[520px] h-[520px] w-[760px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(55% 55% at 50% 50%, rgba(34,211,238,.20), rgba(99,102,241,.18), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-[-20vh] h-[60vh] blur-[120px]"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 30%, rgba(0,212,255,.10), rgba(168,85,247,.08), transparent 70%)",
        }}
      />
    </div>
  );
}

/* =====================  UI helpers & icons  ===================== */
function format(n: number) {
  return n.toLocaleString("it-IT", { maximumFractionDigits: 0 });
}

function Sparkles({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M5 3l1.5 3L10 7.5 6.5 9 5 12 3.5 9 0 7.5 3.5 6 5 3zM19 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zm-5 6.5l1.5 3L20 15l-4.5 1.5L14 20l-1.5-3.5L8 15l4.5-1.5L14 10.5z" />
    </svg>
  );
}

function Tick({ className = "" }: { className?: string }) {
  return <img src="/tick.svg" alt="" className={className} />;
}

/* =====================  Interstitial  ===================== */
function OpenNewTabModal({
  url,
  onClose,
  title,
  ctaLabel,
}: {
  url: string;
  onClose: () => void;
  title: string;
  ctaLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0f18] p-6 text-center shadow-2xl">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-white/70">
          A new tab should open automatically. If nothing happens, use the buttons below.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/25 px-4 py-2 text-sm font-semibold hover:bg-white/10"
          >
            {ctaLabel}
          </a>
          <button
            onClick={copyLink}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            {copied ? "Link copied ✔" : "Copy link"}
          </button>
          <button onClick={onClose} className="text-sm text-white/60 hover:text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* =====================  Under plans strip  ===================== */
function UnderPlansStrip() {
  return (
    <div className="mt-12 flex justify-center px-4">
      <div
        className={[
          "inline-flex items-center gap-3 md:gap-4",
          "rounded-[999px] border border-white/12 bg-[#17202b] shadow-[inset_0_1px_0_rgba(255,255,255,.10)]",
          "px-4 py-2 md:px-9 md:py-5",
        ].join(" ")}
      >
        <div className="flex -space-x-2 flex-shrink-0">
          <img src="/avatars/user1.webp" alt="" className="h-7 w-7 rounded-full ring-2 ring-white/10 md:h-9 md:w-9" />
          <img src="/avatars/user2.webp" alt="" className="h-7 w-7 rounded-full ring-2 ring-white/10 md:h-9 md:w-9" />
          <img src="/avatars/user3.webp" alt="" className="h-7 w-7 rounded-full ring-2 ring-white/10 md:h-9 md:w-9" />
          <img src="/avatars/user4.webp" alt="" className="h-7 w-7 rounded-full ring-2 ring-white/10 md:h-9 md:w-9" />
        </div>
        <span className="text-[13px] leading-tight text-white/95 sm:text-sm md:text-[18px]">
          Join <b>10,000+</b> students already making profits <b>everyday</b>.
        </span>
      </div>
    </div>
  );
}

/* =============================================================================
   LIFETIME PLAN CARD (crypto only)
   ========================================================================== */
function LifetimePlanCard({
  onCrypto,
  priceNow,
  priceWas,
  discountLabel,
}: {
  onCrypto: () => void;
  priceNow: number;
  priceWas: number;
  discountLabel: string;
}) {
  return (
    <div className="mt-12">
      <div
        className="
          relative mx-auto flex max-w-4xl flex-col overflow-hidden rounded-3xl
          border border-violet-400/70
          bg-[radial-gradient(circle_at_top,#818cf8,#ec4899,#7c3aed,#020617)]
          p-[1px]
          shadow-[0_0_60px_rgba(129,140,248,.55)]
        "
      >
        <div className="relative overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_top,#111827,#020617)] px-6 py-6 md:px-10 md:py-8">
          <PlanSaleAuras />
          <CornerRibbon label={discountLabel} tone="lifetime" />

          <div className="mb-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/70 bg-yellow-300/15 px-3 py-1 text-xs font-semibold text-yellow-100">
              <Sparkles className="h-4 w-4" />
              <span>LIFETIME ACCESS • ONE-TIME PAYMENT</span>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-2">
              <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                Lifetime Master Room Access
              </h2>

              <p className="mt-2 text-sm text-white/80">
                Pay once and join the RangeFX ecosystem for life. No renewals, no monthly payments.
              </p>

              <ul className="mt-4 space-y-1.5 text-sm text-white/90">
                {[
                  "Everything included in the ELITE plan",
                  "Daily signals: EURUSD, AUDUSD, EURAUD, EURJPY, EUR/CHF",
                  "Range Mastermind course included (€799)",
                  "Access to the Range Bootcamp & advanced workshops",
                  "Direct 1-1 support and mentorship from Mohamed Range",
                  "Quarterly 1:1 private review",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-white/20">
                      <Tick className="h-3 w-3 filter invert" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-col items-start gap-4 md:mt-0 md:items-end md:text-right">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[.2em] text-white/70">
                  One-time payment
                </div>
                <div className="mt-2 flex items-end gap-4 md:justify-end">
                  <div className="text-4xl font-extrabold tracking-tight text-[#ffe96a] md:text-5xl">
                    €{format(priceNow)}
                  </div>
                  <div className="pb-1 text-2xl font-extrabold text-white/70 line-through md:text-3xl">
                    €{format(priceWas)}
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 md:w-auto">
                <button
                  onClick={onCrypto}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-emerald-400/70 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-100 backdrop-blur transition hover:border-emerald-300 hover:bg-emerald-400/20"
                >
                  <img src="/crypto-icon.webp" className="h-4 w-4 opacity-90" alt="" />
                  Pay with Crypto
                </button>
              </div>

              <p className="max-w-[260px] text-[10px] text-white/60 md:text-right">
                Ideal if you know you want to stay with the team long term and don&apos;t want to think about renewals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}