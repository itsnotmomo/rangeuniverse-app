"use client";

import { useMemo, useState } from "react";

/* =============================================================================
   Types
   ========================================================================== */
export type MonthStat = {
  month: string;
  year: number;
  trades: number;
  wins: number;
  losses: number;
  rr: number;
  winRatePct: number;
  gainPct: number;
};

/* =============================================================================
   Local theme helpers (kept self-contained)
   ========================================================================== */
const BRAND = {
  PURPLE: "#6d28d9",
  PURPLE_DARK: "#5b21b6",
  PURPLE_LIGHT: "#8b5cf6",
  CARD_BORDER: "rgba(0,0,0,0.08)",
  RING: "rgba(0,0,0,0.10)",
};

const GRAD = {
  brand: (a = 1) =>
    `linear-gradient(135deg, rgba(91,33,182,${a}), rgba(109,40,217,${a}))`,
};

const CLS = {
  smallCaps: "text-[11px] uppercase tracking-[0.35em]",
};

function hexA(hex: string, a = 1) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}

const MONTH_ORDER = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* =============================================================================
   Component
   ========================================================================== */
export default function Stats({ data }: { data: MonthStat[] }) {
  // newest-first ordering
  const monthIndex = (m: string) => MONTH_ORDER.indexOf(m);
  const ordered = useMemo(() => {
    const byNewest = (a: MonthStat, b: MonthStat) =>
      b.year - a.year || monthIndex(b.month) - monthIndex(a.month);
    return [...data].sort(byNewest);
  }, [data]);

  const lastTwo = ordered.slice(0, 2);

  // All-time KPIs
  const totals = useMemo(() => {
    const totalTrades = data.reduce((t, m) => t + m.trades, 0);
    const totalRR = data.reduce((t, m) => t + m.rr, 0);
    const totalGain = Math.round(data.reduce((t, m) => t + m.gainPct, 0) * 10) / 10;
    const avgWin = Math.round(
      data.reduce((t, m) => t + m.winRatePct, 0) / Math.max(1, data.length)
    );
    return { totalTrades, totalRR, totalGain, avgWin };
  }, [data]);

  // Progressive yearly breakdown
  const years = useMemo(
    () => Array.from(new Set(ordered.map((s) => s.year))).sort((a, b) => b - a),
    [ordered]
  );
  const [open, setOpen] = useState(false);
  const [yearsShown, setYearsShown] = useState<number[]>([]);

  function toggleDetails() {
    if (open) {
      setOpen(false);
      setYearsShown([]);
    } else {
      setOpen(true);
      if (years.length) setYearsShown([years[0]]);
    }
  }

  return (
    <section id="stats" className="relative bg-white py-16">
      {/* soft ambiance */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="h-full w-full"
          style={{
            background: `radial-gradient(900px 420px at 50% -8%, ${hexA(
              BRAND.PURPLE_LIGHT,
              0.1
            )}, transparent 60%)`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <header className="text-center">
          <p className={`${CLS.smallCaps} text-neutral-600`}>
            V E R I F I E D &nbsp; R E S U L T S
          </p>
          <h2 className="mt-2 text-[32px] font-extrabold md:text-[42px]">
            Consistency You Can Trust
          </h2>
          <div
            className="mx-auto mt-3 h-[2px] w-28 rounded-full"
            style={{
              background: GRAD.brand(),
              boxShadow: `0 0 16px ${hexA(BRAND.PURPLE_LIGHT, 0.6)}`,
            }}
          />
          <p className="mx-auto mt-3 max-w-2xl text-[15.5px] leading-7 text-neutral-600">
            We show the latest months first. Open yearly breakdowns when you want
            detail — no clutter, just signal.
          </p>
        </header>

        {/* -------- LAST 2 MONTHS (spotlight) -------- */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {lastTwo.map((m, i) => (
            <SpotlightMonthCard key={`${m.year}-${m.month}`} m={m} newest={i === 0} />
          ))}
        </div>

        {/* -------- ALL-TIME KPIs -------- */}
        <div className="mt-12">
          <div
            className="mx-auto h-[1px] w-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,.12), rgba(0,0,0,0))",
            }}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <MetricTile label="Total Trades" value={totals.totalTrades.toLocaleString()} />
            <MetricTile label="Total RR" value={`${totals.totalRR} RR`} />
            <MetricTile label="Avg Win Rate" value={`${totals.avgWin}%`} />
            <MetricTile
              label="Cumulative Gain"
              value={`${totals.totalGain}%`}
              accent={totals.totalGain >= 0 ? "emerald" : "rose"}
            />
          </div>
        </div>

        {/* -------- TOGGLE -------- */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={toggleDetails}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(109,40,217,.35)] transition hover:brightness-110 active:translate-y-[1px]"
            style={{ background: GRAD.brand(), border: `1px solid ${BRAND.RING}` }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 5v14M5 12h14" />
            </svg>
            {open ? "Hide Detailed Stats" : "Show Detailed Stats"}
          </button>
        </div>

        {/* -------- PROGRESSIVE YEARLY DETAILS -------- */}
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            {yearsShown.map((yr) => {
              const list = ordered.filter((s) => s.year === yr);
              return (
                <div key={yr} className="mt-10">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-extrabold">{yr} Breakdown</h3>
                    <div className="ml-4 h-[1px] flex-1 rounded-full bg-neutral-200" />
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {list.map((m) => (
                      <MonthCompactCard key={`${m.year}-${m.month}`} m={m} />
                    ))}
                  </div>
                </div>
              );
            })}

            {open && (
              <div className="mt-8 flex justify-center">
                {(() => {
                  const next = years.find((y) => !yearsShown.includes(y));
                  return next ? (
                    <button
                      onClick={() =>
                        setYearsShown((ys) => [...ys, next].sort((a, b) => b - a))
                      }
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(109,40,217,.35)] transition hover:brightness-110 active:translate-y-[1px]"
                      style={{ background: GRAD.brand(), border: `1px solid ${BRAND.RING}` }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Show {next} Stats
                    </button>
                  ) : (
                    <p className="text-center text-xs text-neutral-500">
                      End of history. Educational stats. Not financial advice.
                    </p>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* micro-animations */}
      <style>{`
        @keyframes floatUp { from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .anim-float { animation: floatUp .45s cubic-bezier(.22,.61,.36,1) both; }
      `}</style>
    </section>
  );
}

/* =============================================================================
   Subcomponents
   ========================================================================== */

function SpotlightMonthCard({ m, newest }: { m: MonthStat; newest?: boolean }) {
  const positive = m.gainPct >= 0;
  return (
    <article className="anim-float relative transition-transform hover:-translate-y-[2px]">
      <div
        className="rounded-3xl p-[1.2px]"
        style={{
          background: `linear-gradient(135deg, ${hexA(BRAND.PURPLE_LIGHT, 0.5)}, ${hexA(
            BRAND.PURPLE_DARK,
            0.65
          )})`,
          boxShadow: "0 14px 40px rgba(109,40,217,.14)",
        }}
      >
        <div
          className="relative rounded-3xl border bg-white/90 p-6 backdrop-blur"
          style={{ border: `1px solid ${BRAND.CARD_BORDER}` }}
        >
          {/* glossy sweep */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,.75), rgba(255,255,255,0) 40%)",
              maskImage:
                "radial-gradient(120% 70% at -10% -10%, rgba(0,0,0,.6), transparent 70%)",
            }}
          />

          <div className="relative flex items-start justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-widest text-neutral-500">
                {m.month} {m.year}
              </div>
              <div className="mt-1 text-3xl font-black text-neutral-900">
                {positive ? `+${m.gainPct}%` : `${m.gainPct}%`}
              </div>
              <div className="mt-2 text-xs text-neutral-500">Monthly gain</div>
            </div>

            {newest && (
              <span className="rounded-full bg-black/5 px-2 py-1 text-[10px] font-semibold tracking-wide text-neutral-700 ring-1 ring-black/10">
                NEWEST
              </span>
            )}
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3 text-sm">
            <MiniMetric label="Trades" value={m.trades} />
            <MiniMetric label="Wins" value={m.wins} />
            <MiniMetric label="Win rate" value={`${m.winRatePct}%`} />
            <MiniMetric label="RR total" value={m.rr} />
          </div>

          {/* subtle win-rate bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span>Execution Consistency</span>
              <span>{m.winRatePct}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200/70">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.max(0, Math.min(100, m.winRatePct))}%`,
                  background: GRAD.brand(),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function MonthCompactCard({ m }: { m: MonthStat }) {
  const positive = m.gainPct >= 0;
  return (
    <article
      className="anim-float relative rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-[2px]"
      style={{ border: `1px solid ${BRAND.CARD_BORDER}` }}
    >
      <div className="flex items-start justify-between">
        <div className="text-xs font-medium uppercase tracking-widest text-neutral-500">
          {m.month} {m.year}
        </div>
        <div
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
            positive
              ? "text-emerald-700 bg-emerald-50 ring-1 ring-emerald-100"
              : "text-rose-700 bg-rose-50 ring-1 ring-rose-100"
          }`}
        >
          {positive ? `+${m.gainPct}%` : `${m.gainPct}%`}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <MiniMetric label="Trades" value={m.trades} />
        <MiniMetric label="Win rate" value={`${m.winRatePct}%`} />
        <MiniMetric label="Wins" value={m.wins} />
        <MiniMetric label="RR total" value={m.rr} />
      </div>
    </article>
  );
}

function MiniMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border p-2" style={{ border: `1px solid ${BRAND.CARD_BORDER}` }}>
      <div className="text-[11px] uppercase tracking-widest text-neutral-500">{label}</div>
      <div className="mt-0.5 text-base font-extrabold text-neutral-900">{value}</div>
    </div>
  );
}

function MetricTile({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "emerald" | "rose";
}) {
  const badge =
    accent === "emerald"
      ? "bg-emerald-600 text-white"
      : accent === "rose"
      ? "bg-rose-600 text-white"
      : "text-neutral-900";
  return (
    <div
      className="anim-float rounded-2xl border bg-white/85 p-4 shadow-sm backdrop-blur transition hover:-translate-y-[1px]"
      style={{ border: `1px solid ${BRAND.CARD_BORDER}` }}
    >
      <div className="text-[11px] uppercase tracking-widest text-neutral-500">{label}</div>
      <div className="mt-1 text-[24px] font-extrabold leading-none">
        <span className={`rounded-md px-1.5 ${badge}`}>{value}</span>
      </div>
    </div>
  );
}
