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
| `/join`    | Plan selection and checkout                 |
| `/privacy` | Privacy policy                              |
| `/terms`   | Terms of service                            |

`/signals` permanently redirects to `/`, which it used to be. `/mr*` redirects
to the homepage.

## Payments

Checkout is handled entirely by **Whop** via hosted links in `/join`. Plan IDs
are hardcoded there. There is no payment, auth, or database integration in this
codebase — the Stripe webhook at `src/app/api/webhooks/stripe/route.ts` is an
unused stub that verifies signatures and discards events. Access is granted
manually today.

## Environment

Copy `.env.example` to `.env.local`. The Stripe and Supabase variables are
scaffolding for planned work and are not read by any code that ships today.

## Deploying

Pushes to `main` deploy to production; other branches get preview deployments.
