"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Anton } from "next/font/google";
const anton = Anton({ subsets: ["latin"], weight: "400" });

/* =====================  Pricing  ===================== */
const MONTHLY_PRICES = { essential: 79, pro: 99, elite: 159 } as const;
const YEARLY_TOTALS = { essential: 664, pro: 769, elite: 1145 } as const;

/* =====================  Whop checkout links (by cycle)  ===================== */
const CHECKOUT = {
  monthly: {
    essential: "https://whop.com/checkout/plan_zcxEJHzJofNBp?d2c=true",
    pro:       "https://whop.com/checkout/plan_xGxPizb8RkqPU?d2c=true",
    elite:     "https://whop.com/checkout/plan_YGzmu2JlV6KjK?d2c=true", // ← corrected ELITE monthly
  },
  yearly: {
    // YEARLY "Join with Card" → Whop CARD links (per your message)
    essential: "https://whop.com/checkout/2Vpw9zMRDB2rMbCLkJ-F5VW-Onyr-674P-Vd1d9Qxyz1MC/",
    pro:       "http://whop.com/checkout/3kil31fPS8KFaKlL4l-SAoC-yLy6-b374-7359RoNZA2un/",
    elite:     "https://whop.com/checkout/6uuy4gfESdTrJjWLlL-p6bM-j5MK-Wfyw-T2GOMsAON3Rw/",
  },
} as const;

type Cycle = keyof typeof CHECKOUT; // "monthly" | "yearly"
type PlanId = keyof typeof CHECKOUT["monthly"]; // "essential" | "pro" | "elite"

/* =====================  Yearly Telegram links (by plan)  ===================== */
const YEARLY_TG: Record<PlanId, string> = {
  // YEARLY "Join with Crypto" → Telegram links (per your message)
  essential: "https://t.me/m/p_hK7hQaMTQ0",
  pro:       "https://t.me/m/-GXb6ZYyMDc0",
  elite:     "https://t.me/m/EvLN-6jWNzRk",
};

/* =====================  Plans  ===================== */
type Plan = {
  id: PlanId;
  name: string;
  monthly: number;
  yearlyTotal: number;
  badge: string;
  devices: number;
  features: string[];
  /** Legacy field; not used for navigation anymore but kept for compatibility */
  whop: string;
};

const PLANS = [
  {
    id: "essential",
    name: "Essential",
    monthly: MONTHLY_PRICES.essential,
    yearlyTotal: YEARLY_TOTALS.essential,
    badge: "Starter",
    devices: 3,
    features: [
      "Daily signals: EURUSD, AUDUSD, EURAUD, EURJPY, GOLD (XAUUSD)",
      "5–10% gain per month",
      "≈150R/mo • 3+ yrs track record",
      "Range.FX system (step-by-step)",
      "Weekly live calls with the team",
      "Built to generate you profit",
    ],
    whop: CHECKOUT.monthly.essential,
  },
  {
    id: "pro",
    name: "Pro",
    monthly: MONTHLY_PRICES.pro,
    yearlyTotal: YEARLY_TOTALS.pro,
    badge: "Most popular",
    devices: 5,
    features: [
      "Everything in Essential",
      "Priority replies from the team",
      "2 workshops/month • trade breakdowns",
      "Pro-only recaps & playbooks",
      "Strategy vault + journal templates",
      "5 devices",
    ],
    whop: CHECKOUT.monthly.pro,
  },
  {
    id: "elite",
    name: "ELITE",
    monthly: MONTHLY_PRICES.elite,
    yearlyTotal: YEARLY_TOTALS.elite,
    badge: "For power users",
    devices: 7,
    features: [
      "Everything in Pro",
      "Range Mastermind course included (€799) ::HIGHLIGHT",
      "Quarterly 1:1 private review",
      "ELITE thread & early strategy access",
      "Personal risk plan setup + funding roadmap",
      "7 devices",
    ],
    whop: CHECKOUT.monthly.elite, // points to corrected ELITE monthly
  },
] as const satisfies ReadonlyArray<Plan>;

const getCheckout = (id: PlanId, cycle: Cycle) => CHECKOUT[cycle][id];

/* =====================  Page  ===================== */
export default function Join() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const [selected, setSelected] = useState<PlanId | null>(null);
  const [interstitialUrl, setInterstitialUrl] = useState<string | null>(null);
  const [supportUrl, setSupportUrl] = useState<string | null>(null);

  const plansWithPrices = useMemo(() => {
    return PLANS.map((p) => {
      const fullYear = p.monthly * 12;
      const discountPct = 1 - p.yearlyTotal / fullYear;
      const saved = Math.round(fullYear - p.yearlyTotal);
      return cycle === "monthly"
        ? ({ ...p, displayPrice: `€${format(p.monthly)}`, suffix: "/month", subline: "Billed monthly", discountPct, saved } as const)
        : ({ ...p, displayPrice: `€${format(p.yearlyTotal)}`, suffix: "/year", subline: `Save ${Math.round(discountPct * 100)}% • €${format(saved)} off`, discountPct, saved } as const);
    });
  }, [cycle]);

  const bestYearlyPct = useMemo(() => {
    const percents = PLANS.map((p) => 1 - p.yearlyTotal / (p.monthly * 12));
    return Math.max(...percents);
  }, []);

  useEffect(() => {
    if (!interstitialUrl) return;
    const win = window.open(interstitialUrl, "_blank", "noopener,noreferrer");
    if (win) win.opener = null;
  }, [interstitialUrl]);

  useEffect(() => {
    if (!supportUrl) return;
    const tgDeep = "tg://resolve?domain=rangesupportfx";
    const deep = window.open(tgDeep, "_blank", "noopener,noreferrer");
    if (!deep) {
      const web = window.open(supportUrl, "_blank", "noopener,noreferrer");
      if (web) web.opener = null;
    }
  }, [supportUrl]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a1016] text-white">
      {/* FULL-PAGE BACKDROP & ACCENTS */}
      <TRWBackdrop />
      <RangeAccents />

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28 pt-16 md:pt-20">
        <header className="text-center">
          <div className="mx-auto mb-4 h-14 w-14">
            <Image src="/mr-logo.webp" alt="Master Room" width={60} height={60} className="h-full w-full object-contain" priority />
          </div>

          <HeroTitle />

          <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] text-white/75 md:text-[16px]">
            Join thousands improving their trading. Pick your plan, switch anytime, save more with yearly.
          </p>
        </header>

        {/* Toggle + Save banner */}
        <div className="mt-8 flex flex-col items-center gap-5">
          <LightSwitch value={cycle} onChange={setCycle} />
          <SaveBanner
            cycle={cycle}
            onClick={() => setCycle("yearly")}
            textMonthly={`SAVE UP TO ${Math.round(bestYearlyPct * 100)}% WITH YEARLY`}
            textYearly={`SAVE UP TO ${Math.round(bestYearlyPct * 100)}% WITH YEARLY`}
          />
        </div>

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
                  "relative flex h-full flex-col rounded-2xl border p-6 shadow-2xl transition-all duration-300 " +
                  (plan.id === "pro" ? "border-cyan-400/40 bg-white/[.045] ring-1 ring-cyan-300/20" : "border-white/10 bg-white/[.03]") +
                  (isSelected ? " scale-[1.01] ring-2 ring-cyan-400/50" : " hover:scale-[1.005] hover:ring-1 hover:ring-white/20")
                }
              >
                <div className="absolute -top-3 left-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {plan.badge}
                </div>

                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold tracking-tight">{plan.name}</h3>
                  <span className="text-xs text-white/60">{plan.devices} devices</span>
                </div>

                <div className="mt-3 text-4xl font-extrabold tracking-tight">
                  {plan.displayPrice}
                  <span className="text-lg font-medium text-white/60">{plan.suffix}</span>
                </div>
                <p className="mt-1 text-xs text-white/60">{plan.subline}</p>

                {/* Features */}
                <ul className="mt-6 flex-1 space-y-2 text-sm text-white/85">
                  {plan.features.map((f) => {
                    const highlight = f.endsWith("::HIGHLIGHT");
                    const txt = highlight ? f.replace(" ::HIGHLIGHT", "").replace("::HIGHLIGHT", "") : f;
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
                      const url =
                        cycle === "yearly"
                          ? getCheckout(plan.id, "yearly") // Yearly → CARD (Whop) links
                          : getCheckout(plan.id, "monthly"); // Monthly → Whop monthly (unchanged)
                      setInterstitialUrl(url);
                    }}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-white/30 bg-transparent px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/50 hover:bg-cyan-400/15 active:bg-cyan-400/20"
                  >
                    <CardIcon className="h-5 w-5 opacity-90" />
                    Join with Card
                  </button>

                  {cycle === "yearly" && (
                    <button
                      onClick={() => setInterstitialUrl(YEARLY_TG[plan.id])} // Yearly → CRYPTO (Telegram) links
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-emerald-400/40 bg-transparent px-5 py-3 text-sm font-semibold text-emerald-200 backdrop-blur transition hover:border-emerald-400/70 hover:bg-emerald-500/15"
                    >
                      <img src="/crypto-icon.webp" alt="crypto" className="h-6 w-6" />
                      Join with Crypto
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <UnderPlansStrip />

        {/* Interstitials */}
        {interstitialUrl && (
          <OpenNewTabModal
            title="Opening secure checkout…"
            ctaLabel="Continue to checkout"
            url={interstitialUrl}
            onClose={() => setInterstitialUrl(null)}
          />
        )}
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
        onClick={() => setSupportUrl("https://t.me/rangesupportfx")}
        className="fixed bottom-5 right-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
      >
        <img src="/crypto-icon.webp" className="h-4 w-4" alt="" />
        Need help? Open support
      </button>
    </main>
  );
}

/* =====================  HERO TITLE (TRW scale @100%)  ===================== */
function HeroTitle() {
  const strokeGlow = [
    "0 1px 0 rgba(0,0,0,.9)",
    "0 8px 22px rgba(0,0,0,.45)",
    "0 0 22px rgba(56,189,248,.28)",
  ].join(", ");

  return (
    <h1
      className={`${anton.className} mx-auto max-w-5xl text-center uppercase font-extrabold leading-[1.06] tracking-[.13em]`}
      style={{ fontSize: "clamp(34px, 6.2vw, 64px)", color: "#fff", textShadow: strokeGlow }}
    >
      <span className="block">CHOOSE YOUR PATH</span>
      <span className="block">TO PROFITABILITY</span>
    </h1>
  );
}

/* =====================  FULL-PAGE BACKDROP (visible grid + fade)  ===================== */
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
            <path key={`h-${i}`} d={`M -220 ${i * 46} C 240 ${i * 30}, 980 ${i * 60}, 1620 ${i * 46}`} fill="none" stroke="url(#gridStrokeA)" strokeWidth="0.9" />
          ))}
          {Array.from({ length: 18 }).map((_, i) => (
            <path key={`v-${i}`} d={`M ${i * 86} -220 C ${i * 66} 300, ${i * 110} 980, ${i * 86} 1620`} fill="none" stroke="url(#gridStrokeA)" strokeWidth="0.9" />
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

/* =====================  RANGE ACCENTS ===================== */
function RangeAccents() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
      <div
        className="absolute left-1/2 top-[140px] h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-[80px]"
        style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(56,189,248,.18), rgba(168,85,247,.12), transparent 70%)" }}
      />
      <div
        className="absolute left-1/2 top-[520px] h-[520px] w-[760px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(55% 55% at 50% 50%, rgba(34,211,238,.20), rgba(99,102,241,.18), transparent 70%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-[-20vh] h-[60vh] blur-[120px]"
        style={{ background: "radial-gradient(70% 60% at 50% 30%, rgba(0,212,255,.10), rgba(168,85,247,.08), transparent 70%)" }}
      />
    </div>
  );
}

/* =====================  UI Pieces  ===================== */

function LightSwitch({ value, onChange }: { value: Cycle; onChange: (v: Cycle) => void }) {
  const isYearly = value === "yearly";
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange("monthly")}
        className={"text-[16px] font-extrabold transition-colors " + (!isYearly ? "text-white" : "text-white/70 hover:text-white")}
      >
        Monthly
      </button>

      <button
        onClick={() => onChange(isYearly ? "monthly" : "yearly")}
        aria-pressed={isYearly}
        aria-label="Toggle billing cycle"
        className={
          "relative h-10 w-24 rounded-full p-1 transition-all duration-300 " +
          (isYearly
            ? "bg-[linear-gradient(180deg,#f7e4a8,#e3c469)] shadow-[inset_0_2px_5px_rgba(255,255,255,.35),0_3px_10px_rgba(0,0,0,.35)]"
            : "bg-[#17202b] shadow-[inset_0_2px_6px_rgba(255,255,255,.05),0_3px_10px_rgba(0,0,0,.35)]")
        }
      >
        <span
          className={
            "absolute top-1 h-8 w-8 rounded-full transition-all duration-300 " +
            (isYearly
              ? "right-1 bg-[#1a2330] shadow-[0_5px_12px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.2)]"
              : "left-1 bg-[radial-gradient(circle_at_35%_30%,#f7e4a8,#e3c469)] shadow-[0_6px_14px_rgba(0,0,0,.5),inset_0_1px_0_rgba(255,255,255,.35)]")
          }
        />
      </button>

      <button
        onClick={() => onChange("yearly")}
        className={"text-[16px] font-extrabold transition-colors " + (isYearly ? "text-white" : "text-white/70 hover:text-white")}
      >
        Yearly
      </button>
    </div>
  );
}

function SaveBanner({
  cycle,
  onClick,
  textMonthly,
  textYearly,
}: {
  cycle: Cycle;
  onClick: () => void;
  textMonthly: string;
  textYearly: string;
}) {
  const text = cycle === "monthly" ? textMonthly : textYearly;

  return (
    <button
      onClick={cycle === "monthly" ? onClick : undefined}
      title={cycle === "monthly" ? "Switch to yearly" : undefined}
      className={[
        "inline-flex items-center justify-center gap-3 rounded-full",
        "px-5 py-2.5 sm:px-7 sm:py-3 md:px-9 md:py-4",
        "text-[12px] sm:text-[14px] md:text-[18px] font-extrabold uppercase tracking-[.12em]",
        "border border-white/12 bg-[#17202b]",
        "text-white shadow-[inset_0_1px_0_rgba(255,255,255,.12)]",
        "hover:border-white/25 hover:bg-[#1d2836] transition",
        "max-w-[92vw]"
      ].join(" ")}
    >
      <Image
        src="/sparke.svg"
        alt=""
        width={22}
        height={22}
        className="opacity-90 sm:w-[24px] sm:h-[24px] md:w-[26px] md:h-[26px]"
      />
      <span>{text}</span>
    </button>
  );
}

/* helpers & icons */
function format(n: number) {
  return n.toLocaleString("it-IT", { maximumFractionDigits: 0 });
}
function CardIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <rect x="1" y="3" width="46" height="26" rx="6" ry="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="4" y="11" width="40" height="3.5" rx="1.5" fill="currentColor" />
    </svg>
  );
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
        <p className="mt-2 text-sm text-white/70">A new tab should open automatically. If nothing happens, use the buttons below.</p>
        <div className="mt-6 flex flex-col gap-3">
          <a href={url} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/25 px-4 py-2 text-sm font-semibold hover:bg:white/10 hover:bg-white/10">
            {ctaLabel}
          </a>
          <button onClick={copyLink} className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
            {copied ? "Link copied ✔" : "Copy link"}
          </button>
          <button onClick={onClose} className="text-sm text-white/60 hover:text-white">Close</button>
        </div>
      </div>
    </div>
  );
}

/* =====================  Under plans (enrolled pill, desktop-sized) ===================== */
function UnderPlansStrip() {
  return (
    <div className="mt-12 flex justify-center px-4">
      <div
        className={[
          "inline-flex items-center gap-3 md:gap-4",
          "rounded-[999px] border border-white/12 bg-[#17202b] shadow:[inset_0_1px_0_rgba(255,255,255,.10)] shadow-[inset_0_1px_0_rgba(255,255,255,.10)]",
          "px-4 py-2 md:px-9 md:py-5",
        ].join(" ")}
      >
        {/* Avatars */}
        <div className="flex -space-x-2 flex-shrink-0">
          <img src="/avatars/user1.webp" alt="" className="h-7 w-7 md:h-9 md:w-9 rounded-full ring-2 ring-white/10" />
          <img src="/avatars/user2.webp" alt="" className="h-7 w-7 md:h-9 md:w-9 rounded-full ring-2 ring-white/10" />
          <img src="/avatars/user3.webp" alt="" className="h-7 w-7 md:h-9 md:w-9 rounded-full ring-2 ring-white/10" />
          <img src="/avatars/user4.webp" alt="" className="h-7 w-7 md:h-9 md:w-9 rounded-full ring-2 ring-white/10" />
        </div>

        {/* Text */}
        <span className="text-[13px] sm:text-sm md:text-[18px] leading-tight text-white/95">
          Join <b>10,000+</b> students already making profits <b>everyday</b>.
        </span>
      </div>
    </div>
  );
}
