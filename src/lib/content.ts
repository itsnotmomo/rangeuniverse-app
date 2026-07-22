// All homepage copy and data in one place.
//
// RULE FOR THIS FILE: no invented figures. Every number below is either
// supplied by the client as fact, or computed from the published monthly
// record in src/lib/record.ts. Anything unsourced is marked `null` and renders
// as a visible placeholder.

import { RECORD } from './record';

/* ------------------------------------------------------------------ *
 * HERO — client-supplied facts.
 * ------------------------------------------------------------------ */

export const HERO_POINTS: ReadonlyArray<string> = [
  '1,000+ members',
  '4 full-time analysts',
  'Access to The Vault',
];

/** Sits under the hero block as a quiet restatement of the old headline. */
export const HERO_SUB = 'Where discipline compounds.';

/* ------------------------------------------------------------------ *
 * WHAT IS THE COMPOUND — what it is not, and what it is.
 * ------------------------------------------------------------------ */

export const IS_NOT: ReadonlyArray<{ head: string; body: string }> = [
  {
    head: 'Not a signals room',
    body: 'We do not sell entries to be copied blindly. A position you cannot explain is a position you should not hold.',
  },
  {
    head: 'Not gambling',
    body: 'Size and invalidation are decided before a trade is opened, never renegotiated after it moves against us.',
  },
  {
    head: 'Not get-rich-quick',
    body: 'Nothing here compounds in a week. The whole premise is that it compounds over years, which requires you to still be here.',
  },
  {
    head: 'Not a guru room',
    body: 'No lifestyle content, no rented cars, no screenshots of a balance you cannot verify.',
  },
];

export const IS: ReadonlyArray<{ head: string; body: string }> = [
  {
    head: 'A private execution desk',
    body: 'One methodology, written down, applied the same way every session by everyone in the room.',
  },
  {
    head: 'Risk before return',
    body: 'Every position carries a defined loss before it carries a target. Capital preservation is the first job.',
  },
  {
    head: 'A daily rhythm',
    body: 'Outlook in the morning, execution during the sessions, an honest review at the end of the week.',
  },
  {
    head: 'A standard held mutually',
    body: 'Members are held to the process, and so are we. The record is published whichever way it goes.',
  },
];

/* ------------------------------------------------------------------ *
 * INSIDE — the room structure.
 * ------------------------------------------------------------------ */

export const INSIDE: ReadonlyArray<{ n: string; title: string; body: string }> = [
  {
    n: 'I',
    title: 'Daily market outlook',
    body: 'Where the levels are, what would invalidate the read, and what we are choosing to leave alone.',
  },
  {
    n: 'II',
    title: 'Live execution',
    body: 'Positions posted as they are taken, with the reasoning attached, not reconstructed afterwards.',
  },
  {
    n: 'III',
    title: 'Strict risk management',
    body: 'Fixed risk per position and a hard weekly drawdown limit. The rules do not bend on a good week.',
  },
  {
    n: 'IV',
    title: 'Weekly performance review',
    body: 'What worked, what did not, and what the process is going to change as a result. Losses included.',
  },
  {
    n: 'V',
    title: 'The Vault',
    body: 'The full archive of past analysis and the documented methodology. You are learning to execute it yourself rather than renting it.',
  },
];

/* ------------------------------------------------------------------ *
 * TRACK RECORD
 *
 * Every figure here is derived from RECORD — the month-by-month log kept
 * since October 2023. Nothing is hand-entered. See src/lib/record.ts.
 * ------------------------------------------------------------------ */

export type Stat = {
  value: number | null;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separators?: boolean;
  label: string;
  note: string;
};

export const STATS: ReadonlyArray<Stat> = [
  {
    value: RECORD.trailing12Pct,
    decimals: 1,
    prefix: '+',
    suffix: '%',
    label: 'Trailing 12-month return',
    note: 'Sum of the last twelve documented months',
  },
  {
    value: RECORD.months,
    label: 'Months documented',
    note: `Unbroken since ${RECORD.firstLabel}`,
  },
  {
    value: RECORD.avgWinRatePct,
    suffix: '%',
    label: 'Average win rate',
    note: 'Across every logged position',
  },
  {
    value: RECORD.totalTrades,
    separators: true,
    label: 'Positions logged',
    note: 'Entry, stop and exit recorded',
  },
  {
    value: RECORD.best.gainPct,
    prefix: '+',
    suffix: '%',
    label: 'Best month',
    note: `${RECORD.best.month} ${RECORD.best.year}`,
  },
  {
    value: RECORD.worst.gainPct,
    decimals: 1,
    suffix: '%',
    label: 'Worst month',
    note: `${RECORD.worst.month} ${RECORD.worst.year}`,
  },
];

/* ------------------------------------------------------------------ *
 * PRICING — single tier, client-supplied.
 * ------------------------------------------------------------------ */

export const PRICE = {
  eyebrow: 'Monthly access',
  amount: '€79',
  cadence: '/ month',
  sub: 'Instant access. Add your credentials and join The Compound in under 30 seconds.',
  cta: 'Join Now',
} as const;

/* ------------------------------------------------------------------ *
 * TESTIMONIALS
 *
 * The featured quote was supplied by the client and is pending final
 * confirmation. The screenshots are real member messages already published
 * on the previous site (public/students/).
 * ------------------------------------------------------------------ */

export const FEATURED_QUOTE = {
  eyebrow: 'Members, in their own words',
  quote: 'The analysis is worth every dollar. Nothing I’ve ever subscribed to comes close.',
  attribution: 'Member, Range Compound',
} as const;

/* ------------------------------------------------------------------ *
 * FEATURE BLOCKS — alternating text + framed media.
 *
 * NOTE: public/Strategy.mp4 and public/Vault.mp4 are currently byte-identical
 * copies of public/homepage.mp4. The encodes below are cut from different
 * segments so the page does not show the same loop three times, but both slots
 * need real footage. Re-run the recipe in the README after replacing them.
 * ------------------------------------------------------------------ */

export type Feature = {
  eyebrow: string;
  title: string;
  accent: string;
  body: ReadonlyArray<string>;
  video: string;
  poster: string;
};

export const FEATURES: ReadonlyArray<Feature> = [
  {
    eyebrow: 'The System',
    title: 'One methodology, taught in',
    accent: 'real time',
    body: [
      'Members do not receive conclusions. They watch the read being built — the levels that matter, the conditions that would invalidate it, and the reasoning behind every position as it is taken.',
      'It is the same framework every session, documented and unchanging, so the thing you are learning is transferable. The aim is that you eventually run it without us.',
    ],
    video: '/media/strategy.mp4',
    poster: '/media/strategy-poster.jpg',
  },
  {
    eyebrow: 'The Vault',
    title: 'Every piece of past analysis,',
    accent: 'unlocked on day one',
    body: [
      'The Vault is the complete archive: every outlook, every documented position, and the reasoning attached to each one, going back to the start of the record in October 2023.',
      'Nothing is drip-fed and nothing is held back for a later tier. You get all of it the moment you join, because studying how a read was reached is worth more than being handed the read.',
    ],
    video: '/media/vault.mp4',
    poster: '/media/vault-poster.jpg',
  },
];

// Three columns of member screenshots, drawn from the published archive.
export const MEMBER_SHOTS: ReadonlyArray<ReadonlyArray<string>> = [
  ['/students/1.webp', '/students/2.webp', '/students/3.webp', '/students/4.webp', '/students/5.webp', '/students/16.webp', '/students/17.webp'],
  ['/students/6.webp', '/students/7.webp', '/students/8.webp', '/students/9.webp', '/students/10.webp', '/students/18.webp', '/students/19.webp', '/students/22.webp'],
  ['/students/11.webp', '/students/12.webp', '/students/13.webp', '/students/14.webp', '/students/15.webp', '/students/20.webp', '/students/21.webp'],
];

/* ------------------------------------------------------------------ *
 * FAQ — honest answers. The guarantee question says no, plainly.
 * ------------------------------------------------------------------ */

export const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: 'What makes it worth it?',
    a: 'You get the same daily outlook, live execution and risk framework the desk runs on, plus The Vault — the full archive of past analysis. The point is not the individual call. It is that after a few months you can read a chart the way the desk reads it, and you stop needing anyone to tell you what to do.',
  },
  {
    q: 'Do you guarantee financial freedom?',
    a: 'No. We do not guarantee returns, income, or financial freedom, and anyone who does is lying to you. Trading carries a real risk of losing money. Our record is published in full, including the months that went against us, precisely so you can judge it yourself rather than take a promise on faith. What we commit to is the process and the transparency — never the outcome.',
  },
  {
    q: 'Do I need a lot of money to get started?',
    a: 'No. The methodology is built on fixed percentage risk, so it behaves the same on a small account as on a large one. Start with an amount you can genuinely afford to lose while you learn the process. Several members later add prop-firm funding once they have shown consistency — but that comes after the discipline, not before it.',
  },
  {
    q: 'What is The Vault?',
    a: 'The Vault is our full archive of past analysis — every outlook, every documented position and the reasoning behind it, going back to the beginning of the record. Members get access on day one. It is the difference between being handed a conclusion and being able to study how the conclusion was reached.',
  },
  {
    q: 'Why do members stay?',
    a: 'Mostly because the room is quiet. There is no upsell, no daily hype, and no pressure to trade when there is nothing worth trading. Members who stay tend to be the ones who wanted a standard to be held to rather than a stream of tips — and that is a slower, less exciting product that happens to be the one that lasts.',
  },
];
