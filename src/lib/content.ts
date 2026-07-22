// All homepage copy and data in one place.
//
// RULE FOR THIS FILE: no invented performance figures, win rates, returns,
// member counts, or testimonials. Anything not yet supplied is `null` and
// renders as a marked placeholder. See PLACEHOLDER_STATS and TESTIMONIALS.

export type Stat = {
  /** Real value. `null` renders as "——" and skips the count-up. */
  value: number | null;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separators?: boolean;
  label: string;
  /** Shown under the figure — what the number actually measures. */
  note: string;
};

/* ------------------------------------------------------------------ *
 * NEGATION — what The Compound is not, and what it is.
 * ------------------------------------------------------------------ */

export const IS_NOT: ReadonlyArray<{ head: string; body: string }> = [
  {
    head: 'Not a signals group',
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
    body: 'Outlook in the morning, execution during the session, an honest review at the end of the week.',
  },
  {
    head: 'A standard, held mutually',
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
    title: 'The methodology',
    body: 'The full framework, documented, so you are learning to execute it yourself rather than renting it.',
  },
];

/* ------------------------------------------------------------------ *
 * TRACK RECORD — placeholders only.
 *
 * TO ACTIVATE: replace `value: null` with the real number. The count-up
 * animation turns on automatically. Delete `RECORD_IS_PLACEHOLDER` once every
 * figure below is real, and the placeholder banner disappears with it.
 * ------------------------------------------------------------------ */

export const RECORD_IS_PLACEHOLDER = true;

export const PLACEHOLDER_STATS: ReadonlyArray<Stat> = [
  {
    value: null,
    suffix: '%',
    decimals: 1,
    label: 'Trailing 12-month return',
    note: 'Net, across the published account',
  },
  {
    value: null,
    label: 'Months documented',
    note: 'Every month shown, losses included',
  },
  {
    value: null,
    suffix: '%',
    label: 'Average win rate',
    note: 'Across all logged positions',
  },
  {
    value: null,
    separators: true,
    label: 'Positions logged',
    note: 'Entry, stop and exit recorded',
  },
];

/* ------------------------------------------------------------------ *
 * PROCESS
 * ------------------------------------------------------------------ */

export const STEPS: ReadonlyArray<{ n: string; title: string; body: string }> = [
  {
    n: '01',
    title: 'Request access',
    body: 'A short conversation through the Telegram desk. We are checking that the fit is real in both directions before anything else happens.',
  },
  {
    n: '02',
    title: 'Learn the standard',
    body: 'Before you place a single position you read the methodology and the risk rules. There is no version of this that starts with a trade.',
  },
  {
    n: '03',
    title: 'Execute alongside the desk',
    body: 'You follow the daily rhythm with everyone else — outlook, execution, review — until the process is yours rather than ours.',
  },
  {
    n: '04',
    title: 'Compound',
    body: 'Consistent size, consistent rules, reviewed weekly. The returns are a by-product of the discipline, not the other way round.',
  },
];

/* ------------------------------------------------------------------ *
 * PRICING — figures supplied by the client. The per-month equivalents are
 * plain arithmetic on those figures, not claims.
 * ------------------------------------------------------------------ */

export type Tier = {
  name: string;
  price: string;
  cadence: string;
  equiv: string | null;
  blurb: string;
  featured?: boolean;
};

export const TIERS: ReadonlyArray<Tier> = [
  {
    name: 'Monthly',
    price: '€69',
    cadence: 'per month',
    equiv: null,
    blurb: 'Full access, month to month. Leave whenever it stops being worth it.',
  },
  {
    name: 'Quarterly',
    price: '€179',
    cadence: 'every three months',
    equiv: 'about €60 per month',
    blurb: 'Long enough to judge the process across more than one kind of market.',
  },
  {
    name: 'Annual',
    price: '€599',
    cadence: 'per year',
    equiv: 'about €50 per month',
    blurb: 'The horizon the methodology is actually built for. Best value by a distance.',
    featured: true,
  },
];

/* ------------------------------------------------------------------ *
 * TESTIMONIALS — structure only.
 *
 * TO ACTIVATE: fill in `quote`, `attribution` and `meta`. Any entry left with
 * a null quote renders as an empty marked slot. No quotes are invented here.
 * ------------------------------------------------------------------ */

export type Testimonial = {
  quote: string | null;
  attribution: string | null;
  meta: string | null;
};

export const TESTIMONIALS: ReadonlyArray<Testimonial> = [
  { quote: null, attribution: null, meta: null },
  { quote: null, attribution: null, meta: null },
  { quote: null, attribution: null, meta: null },
];
