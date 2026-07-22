// Single source of truth for brand strings and links.
// The site sells nothing itself — every primary CTA hands off to the Telegram bot.

export const BRAND = {
  name: 'Range Compound',
  short: 'The Compound',
  tagline: 'Where discipline compounds.',
} as const;

// The domain the site is actually served from today. The brand renamed to
// Range Compound but the domain has not moved yet — change this one constant
// when it does, and the legal pages and metadata follow.
export const SITE_DOMAIN = 'rangeuniverse.com';
export const SITE_URL = `https://${SITE_DOMAIN}`;

export const TELEGRAM_BOT = 'https://t.me/rangefx_bot?start=website';

export const NAV: ReadonlyArray<readonly [label: string, href: string]> = [
  ['Standard', '#standard'],
  ['Inside', '#inside'],
  ['Record', '#record'],
  ['Process', '#process'],
  ['Access', '#access'],
];
