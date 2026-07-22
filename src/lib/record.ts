// The published monthly record, carried over unchanged from the previous site.
//
// This is the source of truth for every performance figure on the homepage.
// Nothing in the UI hand-enters a number — the aggregates below are computed
// from these rows, so the copy can never drift from the log.
//
// Kept in full, including the one negative month. That is the point of it.

export type MonthStat = {
  month: string;
  year: number;
  trades: number;
  wins: number;
  losses: number;
  /** Cumulative R multiple for the month, in whole R x100. */
  rr: number;
  winRatePct: number;
  gainPct: number;
};

export const MONTHS: MonthStat[] = [
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
  { month: 'March',     year: 2026, trades: 18, wins: 9,  losses: 9,  rr: 118, winRatePct: 50, gainPct: 7.6 },
  { month: 'April',     year: 2026, trades: 23, wins: 13, losses: 10, rr: 148, winRatePct: 57, gainPct: 7.1 },
  { month: 'May',       year: 2026, trades: 18, wins: 8,  losses: 10, rr: 92,  winRatePct: 44, gainPct: 2.2 },
  { month: 'June',      year: 2026, trades: 16, wins: 8,  losses: 8,  rr: 102, winRatePct: 50, gainPct: 3.1 },
];

const MONTH_ORDER = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_ABBR: Record<string, string> = {
  January: 'Jan', February: 'Feb', March: 'Mar', April: 'Apr',
  May: 'May', June: 'Jun', July: 'Jul', August: 'Aug',
  September: 'Sep', October: 'Oct', November: 'Nov', December: 'Dec',
};

const idx = (m: string) => MONTH_ORDER.indexOf(m);
const round1 = (n: number) => Math.round(n * 10) / 10;

function build() {
  const ordered = [...MONTHS].sort((a, b) => a.year - b.year || idx(a.month) - idx(b.month));
  const recent = [...ordered].reverse();

  const first = ordered[0];
  const last = ordered[ordered.length - 1];
  const totalTrades = MONTHS.reduce((t, m) => t + m.trades, 0);
  const negatives = ordered.filter((m) => m.gainPct < 0);
  const best = ordered.reduce((a, b) => (b.gainPct > a.gainPct ? b : a));
  const worst = ordered.reduce((a, b) => (b.gainPct < a.gainPct ? b : a));

  return {
    months: ordered.length,
    totalTrades,
    avgWinRatePct: Math.round(
      MONTHS.reduce((t, m) => t + m.winRatePct, 0) / MONTHS.length,
    ),
    trailing12Pct: round1(recent.slice(0, 12).reduce((t, m) => t + m.gainPct, 0)),
    best,
    worst,
    negatives: negatives.length,
    firstLabel: `${MONTH_ABBR[first.month]} ${first.year}`,
    lastLabel: `${MONTH_ABBR[last.month]} ${last.year}`,
  };
}

export const RECORD = build();

export const fmtPct = (n: number) => `${n >= 0 ? '+' : '−'}${Math.abs(n)}%`;
