// Shared, non-visual data + helpers for the light-theme homepage variants
// (/v2a, /v2c). Pure data and pure functions — no JSX, no client hooks — so
// both variants render identical content and only differ in visual treatment.

export type MonthStat = {
  month: string; year: number; trades: number; wins: number; losses: number;
  rr: number; winRatePct: number; gainPct: number;
};

export const ALL_STATS: MonthStat[] = [
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

export const MONTH_ORDER = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const MONTH_ABBR: Record<string, string> = { January: 'Jan', February: 'Feb', March: 'Mar', April: 'Apr', May: 'May', June: 'Jun', July: 'Jul', August: 'Aug', September: 'Sep', October: 'Oct', November: 'Nov', December: 'Dec' };

export const COLUMN_IMAGES = [
  ['/students/1.webp', '/students/2.webp', '/students/3.webp', '/students/4.webp', '/students/5.webp', '/students/16.webp', '/students/17.webp'],
  ['/students/6.webp', '/students/7.webp', '/students/8.webp', '/students/9.webp', '/students/10.webp', '/students/18.webp', '/students/19.webp', '/students/22.webp'],
  ['/students/11.webp', '/students/12.webp', '/students/13.webp', '/students/14.webp', '/students/15.webp', '/students/20.webp', '/students/21.webp'],
];

export const PAIRS = ['EUR/USD', 'EUR/CHF', 'EUR/AUD', 'AUD/USD', 'EUR/JPY'];

export const TELEGRAM_FREE = 'https://t.me/+K8Nzz9B0aaQzN2Y0';
export const TELEGRAM_SUPPORT = 'https://t.me/rangesupportfx';

export const monthIndex = (m: string) => MONTH_ORDER.indexOf(m);
export const fmtPct = (n: number) => `${n >= 0 ? '+' : '−'}${Math.abs(n)}%`;
export const fmtInt = (n: number) => n.toLocaleString('en-US');

// Understated, skeptic-facing copy. No "profit within hours", no "start earning".
export const STEPS = [
  { n: '01', title: 'Join the room', body: 'Create an account and get access to the daily signals and the market outlook posted each morning.' },
  { n: '02', title: 'Copy the trade', body: 'Every signal lists the entry, stop-loss, and take-profit levels, formatted to paste into a trade copier.' },
  { n: '03', title: 'Manage the position', body: 'Follow the updates as the trade develops — partials, breakeven, and exits are posted as they happen.' },
];

export const FAQS = [
  { q: 'Do I need experience to follow the signals?', a: 'No. Each signal lists the exact entry, stop-loss, and targets to copy. If you can place a trade with your broker, you can follow along.' },
  { q: 'Do I need a large account to start?', a: 'No. You can start small and scale. Returns can be compounded, and some members later add prop-firm funding once they are consistent.' },
  { q: 'How much time does it take?', a: 'Signals can be copied manually in roughly 15 minutes a day, or automated end-to-end with a trade copier.' },
  { q: 'Which markets do you trade?', a: 'Global Forex pairs — currently EUR/USD, EUR/CHF, EUR/AUD, AUD/USD, and EUR/JPY, with more added over time. Location does not matter.' },
  { q: 'Are the past results guaranteed to continue?', a: 'No. The monthly record above is what has happened, including losing months. Past performance does not guarantee future results, and your outcome depends on your own execution.' },
  { q: 'Can I cancel anytime?', a: 'Yes. No lock-in. You can manage or cancel your subscription from your account page at any time.' },
];

// ── aggregates, computed once ────────────────────────────────────────────────
function build() {
  const ordered = [...ALL_STATS].sort((a, b) => a.year - b.year || monthIndex(a.month) - monthIndex(b.month));
  const byRecent = [...ALL_STATS].sort((a, b) => b.year - a.year || monthIndex(b.month) - monthIndex(a.month));
  const totalTrades = ALL_STATS.reduce((t, m) => t + m.trades, 0);
  const totalRR = ALL_STATS.reduce((t, m) => t + m.rr, 0);
  const avgWin = Math.round(ALL_STATS.reduce((t, m) => t + m.winRatePct, 0) / ALL_STATS.length);
  const gain12 = Math.round(byRecent.slice(0, 12).reduce((t, m) => t + m.gainPct, 0) * 10) / 10;
  const best = ordered.reduce((a, b) => (b.gainPct > a.gainPct ? b : a));
  const worst = ordered.reduce((a, b) => (b.gainPct < a.gainPct ? b : a));
  const negatives = ordered.filter((m) => m.gainPct < 0).length;
  const maxPos = Math.max(...ordered.map((m) => m.gainPct));
  const maxNeg = Math.max(...ordered.map((m) => Math.max(0, -m.gainPct)));
  return { ordered, byRecent, totalTrades, totalRR, avgWin, gain12, best, worst, negatives, months: ordered.length, first: ordered[0], last: ordered[ordered.length - 1], maxPos, maxNeg };
}
export const AGG = build();

// Bar geometry shared by both variants (visual style differs, math does not).
// negZonePct = share of chart height reserved below the zero baseline.
export function barGeom(m: MonthStat, negZonePct: number) {
  const neg = m.gainPct < 0;
  const posH = neg ? 0 : (m.gainPct / AGG.maxPos) * (100 - negZonePct);
  const negH = neg ? (Math.abs(m.gainPct) / AGG.maxNeg) * negZonePct : 0;
  return { neg, posH, negH };
}
