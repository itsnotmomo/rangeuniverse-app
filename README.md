# Range Universe

Marketing site for [rangeuniverse.com](https://rangeuniverse.com) — live trading
signals, education, and mentorship.

## Stack

- Next.js 15 (App Router) + React 18, TypeScript
- Tailwind CSS v4
- Deployed on Vercel (project: `masterroom`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route      | What it is                                  |
| ---------- | ------------------------------------------- |
| `/`        | Homepage — signals, stats, pricing, FAQ     |
| `/privacy` | Privacy policy                              |
| `/terms`   | Terms of service                            |

`/signals` permanently redirects to `/`, which it used to be. `/v2c` redirects
to `/` (it was promoted to the homepage). `/mr*` redirects to the homepage.

## Sign-ups

Every "Join the room" CTA links straight to the Telegram bot
(`https://t.me/rangefx_bot?start=website`). The site is a static informational
funnel — no payments, accounts, or database run in this codebase; anything
transactional happens inside the bot.

## Environment

Copy `.env.example` to `.env.local`. The only variable is `NEXT_PUBLIC_SITE_URL`.

## Deploying

Pushes to `main` deploy to production; other branches get preview deployments.
