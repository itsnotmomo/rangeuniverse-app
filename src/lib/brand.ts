// Single source of truth for brand strings and links.
// The site sells nothing itself — every primary CTA hands off to the Telegram bot.

export const BRAND = {
  name: 'Range Compound',
  short: 'The Compound',
  tagline: 'Where discipline compounds.',
} as const;

// The domain the site is served from. Change this one constant and the legal
// pages, canonical metadata and Open Graph URLs all follow.
export const SITE_DOMAIN = 'rangecompound.com';
export const SITE_URL = `https://${SITE_DOMAIN}`;

export const TELEGRAM_BOT = 'https://t.me/rangefx_bot?start=website';

export const NAV: ReadonlyArray<readonly [label: string, href: string]> = [
  ['About', '#standard'],
  ['Included', '#inside'],
  ['Record', '#record'],
  ['Pricing', '#pricing'],
  ['Answers', '#answers'],
];
