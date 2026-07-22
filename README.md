# Range Compound

Marketing site for [rangeuniverse.com](https://rangeuniverse.com) — a private
execution desk. The site is a pure funnel into Telegram.

## Stack

- Next.js 15 (App Router) + React 18, TypeScript
- Tailwind CSS v4 (preflight only — component styles are hand-authored in
  `src/app/globals.css`)
- Deployed on Vercel (project: `masterroom`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> Do not run `npm run build` while `npm run dev` is running — they share
> `.next/` and the build clobbers the dev server's output, which shows up as a
> page rendering with no stylesheet.

## Routes

| Route      | What it is                                    |
| ---------- | --------------------------------------------- |
| `/`        | Homepage                                      |
| `/privacy` | Privacy policy                                |
| `/terms`   | Terms & conditions                            |

`/signals`, `/v2c` and `/mr*` permanently redirect to `/`.

## Sign-ups

Every CTA links straight to the Telegram bot
(`https://t.me/rangefx_bot?start=website`). No payments, accounts, or database
run in this codebase; anything transactional happens inside the bot.

## Content and data

| File | Holds |
| --- | --- |
| `src/lib/brand.ts` | Name, domain, Telegram link, nav |
| `src/lib/content.ts` | All homepage copy |
| `src/lib/record.ts` | The published monthly performance log |

`record.ts` is the single source of truth for every performance figure. The
headline stats (trailing 12-month return, months documented, average win rate,
positions logged, best/worst month) are **computed** from those rows — nothing
is hand-typed into the page, so the copy cannot drift from the log. To extend
the record, append a month; the homepage follows automatically.

No performance figure, win rate or testimonial may be written directly into a
component.

## Hero video

`public/homepage.mp4` is the master footage and is **not** served. The hero
plays `public/media/hero.mp4`, derived from it:

- trimmed to the clean first 15.5s, before the burned-in title card
- desaturated and warmed into the champagne palette so it stops reading cyan
- blurred, which both suits a background and renders the stock footage's
  burned-in word labels ("ARTIFICIAL INTELLIGENCE", "CYBERSPACE", …) illegible
- cross-faded end-to-start so the loop has no visible seam

```bash
GRADE="eq=saturation=0.12:contrast=1.02:brightness=-0.10,\
colorbalance=rm=0.08:rs=0.05:gm=0.02:bm=-0.06:bs=-0.05,gblur=sigma=7"

ffmpeg -y -i public/homepage.mp4 -filter_complex "
[0:v]trim=0:15.5,setpts=PTS-STARTPTS,${GRADE},split[s0][s1];
[s0]trim=0:14.3,setpts=PTS-STARTPTS[main];
[s1]trim=14.3:15.5,setpts=PTS-STARTPTS[tail];
[tail][main]xfade=transition=fade:duration=1.2:offset=0,format=yuv420p[v]" \
  -map "[v]" -an -c:v libx264 -preset veryslow -crf 32 \
  -movflags +faststart public/media/hero.mp4

ffmpeg -y -ss 8 -i public/media/hero.mp4 -frames:v 1 -q:v 5 \
  public/media/hero-poster.jpg
```

5.8 MB in, 653 KB out. mp4 only — VP9 encoded *larger* than h264 on this
material, so a second source would only cost bytes.

### Feature-block videos

`public/media/strategy.mp4` and `public/media/vault.mp4` are produced the same
way from `public/Strategy.mp4` and `public/Vault.mp4`, at `gblur=sigma=5` and
`-crf 33`, cut from different segments (0–8s and 7.5–15.5s).

> **These three source files are currently byte-identical** — `Strategy.mp4`
> and `Vault.mp4` are copies of `homepage.mp4`. The different segments stop the
> page showing one loop three times, but both slots want real footage. Replace
> the sources and re-run the encode.

`src/components/HeroVideo.tsx` paints the poster first and only requests the
video when the visitor's environment allows it: no request at all under
`prefers-reduced-motion`, `Save-Data`, or a 2g connection.

## Environment

Copy `.env.example` to `.env.local`. The only variable is `NEXT_PUBLIC_SITE_URL`.

## Deploying

Pushes to `main` deploy to production; other branches get preview deployments.
