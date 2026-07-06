"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ReactNode } from "react";
import { Square, Target, Wrench, DollarSign, CreditCard, Coins, ExternalLink, Copy, X } from "lucide-react";

const CYAN = "#38bdf8";
const YELLOW = "#fde047";

// Replace STUDENT_IMAGES with this:
const COLUMN_IMAGES = [
  [
    "/students/1.webp",
    "/students/2.webp",
    "/students/3.webp",
    "/students/4.webp",
    "/students/5.webp",
  ],
  [
    "/students/6.webp",
    "/students/7.webp",
    "/students/8.webp",
    "/students/9.webp",
    "/students/10.webp",
  ],
  [
    "/students/11.webp",
    "/students/12.webp",
    "/students/13.webp",
    "/students/14.webp",
    "/students/15.webp",
  ],
];


export default function BootcampPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState("");

  function openCheckout(url: string) {
    setCheckoutUrl(url);
    setCheckoutOpen(true);

    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {}
  }
  
  return (
    <main className="min-h-screen bg-black text-white">
      {/* TOP NAV / OFFER BAR */}
            {/* TOP NAV / OFFER BAR */}
            {/* TOP NAV / OFFER BAR */}
            {/* TOP NAV / OFFER BAR */}
            {/* TOP NAV / OFFER BAR */}
            {/* TOP NAV / OFFER BAR */}
            {/* TOP NAV / OFFER BAR */}
            {/* TOP NAV / OFFER BAR */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/20">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    
    {/* LEFT SIDE — LOGO + TEXT */}
    <div className="flex items-center gap-3">
      <img
        src="/mastermind.webp"
        alt="Mastermind Logo"
        className="w-10 h-10"
      />
      <span className="text-white font-bold text-l tracking-wide">
        MASTERMIND
      </span>
    </div>

    {/* CENTER — DATE */}
    <div className="hidden md:block">
      <span className="text-white font-semibold text-sm tracking-widest">
        1 FEB → 11 FEB
      </span>
    </div>

    {/* RIGHT SIDE — BUTTON */}
    <a
  href="#plans"
  className="px-6 py-2 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition"
>
  VIEW TICKETS
</a>


  </div>
</header>

      {/* HERO SECTION – Monetise premium style (no rounded, bigger video) */}
<section className="relative overflow-hidden bg-black">
  {/* PREMIUM BACKGROUND (Monetise-style) */}
  <div className="pointer-events-none absolute inset-0">
    {/* vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_65%)]" />

    {/* diagonal beams */}
    <div className="absolute -left-1/4 top-[-20%] h-[140%] w-[60%] rotate-12 bg-gradient-to-b from-indigo-500/20 via-transparent to-transparent blur-3xl" />
    <div className="absolute -right-1/4 top-[-20%] h-[140%] w-[60%] -rotate-12 bg-gradient-to-b from-yellow-400/15 via-transparent to-transparent blur-3xl" />

    {/* side glows */}
    <div className="absolute left-0 top-1/2 h-[520px] w-[520px] -translate-y-1/2 bg-purple-500/10 blur-3xl" />
    <div className="absolute right-0 top-1/2 h-[520px] w-[520px] -translate-y-1/2 bg-cyan-400/10 blur-3xl" />

    {/* subtle noise */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.4\"/></svg>')",
      }}
    />
  </div>

  {/* wider container so video can be BIG */}
  <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-20 pt-28 text-center md:pb-24 md:pt-32">
    <h1 className="mb-5 text-3xl font-semibold leading-tight sm:text-4xl md:text-[48px] md:leading-tight">
      Let Me Show You The{" "}
      <span className="text-yellow-300">Exact Day-Trading System</span>{" "}
      I Use To Trade Full-Time.
    </h1>

    <p className="mb-2 max-w-3xl text-base text-zinc-200 md:text-lg">
      10 live sessions to build{" "}
      <span className="font-semibold">one clear trading plan</span> you
      can actually follow in 2026 — and finally become a
      profitable trader.
    </p>

    {/* VIDEO STAGE (no rounded, bigger, more premium frame) */}
    <div className="relative mt-6 w-full max-w-5xl">
      {/* glow */}
      <div className="pointer-events-none absolute -inset-14 bg-gradient-to-b from-yellow-400/18 via-purple-500/14 to-transparent blur-3xl" />

      {/* outer frame */}
      <div className="relative border border-white/10 bg-gradient-to-b from-white/[0.06] via-transparent to-black/70 p-[2px] shadow-[0_0_120px_rgba(0,0,0,0.85)]">
        <div className="border border-white/10 bg-black/55 p-2 backdrop-blur">
          <BootcampAudioPlayer />
        </div>
      </div>
    </div>

    {/* CTA */}
    <div className="mt-10 flex justify-center">
      <a
        href="#plans"
        className="inline-flex items-center justify-center px-14 py-4 text-sm font-semibold uppercase tracking-wide text-black shadow-xl transition hover:brightness-110 md:text-base"
        style={{
          background: "linear-gradient(135deg, #fef9c3, #fde047, #fbbf24)",
        }}
      >
        See Bootcamp Tickets
      </a>
    </div>
  </div>
</section>




{/* RESULTS SECTION – matching background seamlessly */}
<Section className="bg-black -mt-6">
  <div className="mx-auto max-w-5xl text-center">
    <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-[40px] md:leading-tight">
      <span className="text-yellow-300">€1.8M in Tracked Payouts</span>{" "}
      From Traders Who Joined The Last Mastermind.
    </h2>
  </div>

    {/* WALL OF TESTIMONIALS */}
  <div className="mx-auto mt-10 max-w-5xl relative h-[460px] overflow-hidden">
    <div className="marquee-container grid h-full grid-cols-3 gap-3 sm:gap-5">
      <TestimonialColumn direction="up" images={COLUMN_IMAGES[0]} />
      <TestimonialColumn direction="down" images={COLUMN_IMAGES[1]} />
      <TestimonialColumn direction="up" images={COLUMN_IMAGES[2]} />
    </div>

    {/* TOP & BOTTOM GRADIENT FADES (like Monetise) */}
<div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black via-black/70 to-transparent" />
<div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black via-black/70 to-transparent" />

  </div>


  {/* COPY */}
  <div className="mx-auto mt-10 max-w-3xl text-center text-base text-zinc-200 md:text-lg">
    <p className="mb-5">
      These are regular traders who joined the mastermind and generated{" "}
      <span className="font-semibold text-yellow-300">
        over €1.8 million in payouts in less than 90 days.
      </span>
    </p>
    <p>
      Now, this validated day-trading system has been refined, simplified,
      and optimised into something that gives you{" "}
      <span className="font-semibold">an unfair advantage</span> in the markets.
    </p>
  </div>

  <div className="mt-8 flex justify-center">
    <a
    href="#plans"
    className="inline-flex items-center justify-center rounded-full px-14 py-4 text-sm font-semibold uppercase tracking-wide text-black shadow-xl transition hover:brightness-110 md:text-base"
    style={{
      background:
        "linear-gradient(135deg, #fef9c3, #fde047, #fbbf24)",
    }}
  >
    Get your tickets
  </a>
  </div>
</Section>


     {/* SECTION: STOP WATCHING FROM THE SIDELINES (Monetise-style, adapted for Bootcamp) */}
<Section className="bg-black -mt-12 py-0">
  {/* Heading */}
  <div className="mx-auto max-w-4xl text-center">
    <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
      Stop watching traders get funded from the sidelines
    </h2>

    <p className="mx-auto mt-6 max-w-3xl text-base text-zinc-400 md:text-lg">
      For years, profitable day trading felt reserved for people with big accounts,
      endless screen time, and the right mentor.
    </p>

    <p className="mx-auto mt-3 max-w-3xl text-base text-zinc-200 md:text-lg">
      This live bootcamp gives you a complete, proven system — and shows you exactly
      how to execute it to get funded and paid.
    </p>
  </div>

  {/* Main container (RECTANGLE, SHARP CORNERS) */}
  <div className="mx-auto mt-16 max-w-5xl overflow-hidden border border-white/10 bg-[#070A10] shadow-[0_0_120px_rgba(0,0,0,0.75)]">
    {/* Row 1 */}
    <div className="flex items-start gap-6 px-10 py-9">
      <IconBox>
        <span className="text-[#a855f7]">
          <IconBlueprint />
        </span>
      </IconBox>
      <div className="pt-0.5">
        <p className="text-[18px] font-semibold text-white">
          You don’t need to invent a strategy
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          You’ll learn one clear day-trading system built for prop firms — with exact
          rules for entries, risk, and exits. No guessing. No randomness.
        </p>
      </div>
    </div>

    <Divider />

    {/* Row 2 */}
    <div className="flex items-start gap-6 px-10 py-9">
      <IconBox>
        <span className="text-[#a855f7]">
          <IconTarget />
        </span>
      </IconBox>
      <div className="pt-0.5">
        <p className="text-[18px] font-semibold text-white">
          You don’t just learn — you apply it live
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          This is a live bootcamp. You’ll see the strategy in real market conditions,
          practice it, and get feedback so you execute it correctly.
        </p>
      </div>
    </div>

    <Divider />

    {/* Row 3 */}
    <div className="flex items-start gap-6 px-10 py-9">
      <IconBox>
        <span className="text-[#a855f7]">
          <IconWrench />
        </span>
      </IconBox>
      <div className="pt-0.5">
        <p className="text-[18px] font-semibold text-white">
          You get structure, rules, and support
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          You’re not left alone after the sessions. You get guidance, Q&A, and a clear
          roadmap so you know exactly what to do after the bootcamp ends.
        </p>
      </div>
    </div>

    <Divider />

    {/* Row 4 */}
    <div className="flex items-start gap-6 px-10 py-9">
      <IconBox>
        <span className="text-[#a855f7]">
          <IconDollar />
        </span>
      </IconBox>
      <div className="pt-0.5">
        <p className="text-[18px] font-semibold text-white">
          The goal is funding and payouts
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          The system is designed to help you pass prop firm challenges, manage risk
          properly, and work toward consistent payouts — not hype or theory.
        </p>
      </div>
    </div>
  </div>

  {/* CTA */}
    <div className="mt-10 flex justify-center">
      <a
        href="#plans"
        className="inline-flex items-center justify-center px-14 py-4 text-sm font-semibold uppercase tracking-wide text-black shadow-xl transition hover:brightness-110 md:text-base"
        style={{
          background: "linear-gradient(135deg, #fef9c3, #fde047, #fbbf24)",
        }}
      >
        View Tickets
      </a>
    </div>
</Section>




      {/* SECTION: WHAT HAPPENS AFTER YOU JOIN */}
<Section className="bg-black">
  <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
    <h2 className="mb-16 text-center text-4xl font-semibold tracking-tight text-white md:text-6xl">
      This is what happens after you join the Bootcamp
    </h2>

    {/* responsive layout:
        - mobile: stack vertically
        - md: 3 columns
        - wider container + smaller gap so cards look Monetise-sized */}
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
      <MonetiseCard
        img="/first.webp"
        title={<>Build your trading plan</>}
        body="We turn the Range System into one clear written plan you can follow with confidence — exact entries, risk rules, and management steps laid out so you stop improvising and start executing with intent."
      />

      <MonetiseCard
        img="/second.webp"
        title={<>Execute it live with guidance</>}
        body="You don’t just learn concepts and go back to guessing. You practice on real charts during live sessions, with real feedback, so execution becomes automatic and repeatable every single week."
      />

      <MonetiseCard
        img="/third.webp"
        title={
          <>
            Trade toward funding &<br />
            payouts
          </>
        }
        body="This bootcamp is built around prop rules and consistency — so you protect drawdown, stop gambling challenges, and start stacking clean payout months with a clear process."
      />
    </div>
  </div>
  {/* CTA */}
    <div className="mt-10 flex justify-center">
      <a
        href="#plans"
        className="inline-flex items-center justify-center px-14 py-4 text-sm font-semibold uppercase tracking-wide text-black shadow-xl transition hover:brightness-110 md:text-base"
        style={{
          background: "linear-gradient(135deg, #fef9c3, #fde047, #fbbf24)",
        }}
      >
        See Bootcamp Tickets
      </a>
</div>
</Section>


{/* SECTION: COMPETE FOR PRIZES */}
<Section className="bg-black">
  <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
    {/* OUTER PREMIUM CONTAINER */}
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#070A10] shadow-[0_60px_160px_rgba(0,0,0,0.85)] md:rounded-[44px]">
      {/* subtle top dotted strip */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 md:h-28">
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
            backgroundSize: "14px 14px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
      </div>

      {/* soft edge glow */}
      <div className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

      {/* CONTENT PADDING (THIS was the killer on mobile) */}
      <div className="relative px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12 md:px-14 md:pb-14 md:pt-14">
        {/* HEADER */}
        <h2 className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[64px]">
          Compete For €3,000 In Prizes
        </h2>

        <p className="mx-auto mt-4 max-w-4xl text-center text-[14px] leading-relaxed text-zinc-200/85 sm:text-[15px] md:text-[18px]">
          We’re going to choose <span className="text-white">3 people</span> from the Live Bootcamp.
          Each winner gets a <span className="text-white">200K FTMO Challenge</span> (or cash equivalent).
          Everyone starts from scratch — show up, execute, and let your consistency speak.
        </p>

        {/* INNER SHOWCASE BLOCK */}
        <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#050814] px-5 py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:px-8 sm:py-9 md:mt-10 md:rounded-[36px] md:px-14 md:py-12">
          {/* inner background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/70" />
            <div
              className="absolute inset-0 opacity-[0.9]"
              style={{
                backgroundImage:
                  "radial-gradient(1200px 420px at 50% 35%, rgba(59,130,246,0.22), transparent 60%), radial-gradient(900px 360px at 20% 60%, rgba(255,255,255,0.07), transparent 55%), radial-gradient(900px 360px at 80% 60%, rgba(37,99,235,0.16), transparent 55%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 25%, rgba(255,255,255,0.45) 1px, transparent 1px), radial-gradient(circle at 70% 35%, rgba(255,255,255,0.35) 1px, transparent 1px), radial-gradient(circle at 40% 70%, rgba(255,255,255,0.35) 1px, transparent 1px), radial-gradient(circle at 85% 75%, rgba(255,255,255,0.28) 1px, transparent 1px)",
                backgroundSize: "520px 280px",
              }}
            />
          </div>

          {/* title inside inner block (smaller on mobile) */}
          <div className="relative">
            <h3 className="text-center text-[30px] font-extrabold tracking-[0.06em] text-[#FBBF24] sm:text-[40px] md:text-[56px]">
              200K FTMO CHALLENGES
            </h3>
          </div>

          {/* CERTIFICATES — STACK ON MOBILE */}
          <div className="relative mt-7 grid grid-cols-1 gap-6 sm:mt-10 sm:gap-8 md:grid-cols-3 md:gap-10">
            {["ftmo1.webp", "ftmo2.webp", "ftmo3.webp"].map((img, i) => (
              <div key={i} className="relative mx-auto w-full max-w-[420px]">
                {/* gold glow behind certificate */}
                <div className="pointer-events-none absolute -inset-8 rounded-full bg-[#FBBF24]/20 blur-3xl" />
                <div className="pointer-events-none absolute -inset-2 rounded-[26px] bg-gradient-to-b from-white/10 via-transparent to-black/60" />

                <div className="relative w-full overflow-hidden rounded-[26px] border border-white/10 bg-black/40 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:p-5">
  <div className="relative w-full overflow-hidden rounded-[18px] border border-white/10 bg-black">
  <img
    src={`/${img}`}
    alt="FTMO 200K Challenge"
    className="w-full h-auto object-contain"
    draggable={false}
  />
</div>


</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    {/* CTA (keep it inside the same container on mobile) */}
        <div className="mt-8 flex justify-center md:mt-10">
          <a
            href="#plans"
            className="inline-flex w-full max-w-[520px] items-center justify-center rounded-[22px] px-10 py-5 font-semibold uppercase tracking-[0.2em] text-black bg-[#FDE047] shadow-[0_30px_80px_rgba(253,224,71,0.18)] hover:brightness-105 transition"
          >
            View Tickets
          </a>
        </div>
  </div>
</Section>



{/* SECTION: BOOTCAMP BONUSES */}
<section className="bg-black py-24 md:py-32">

  <div className="mx-auto max-w-7xl px-6 lg:px-10">
    {/* HEADER */}
    <div className="relative overflow-hidden rounded-[44px] border border-white/10 bg-[#070A10] px-8 py-14 text-center shadow-[0_70px_200px_rgba(0,0,0,0.85)] md:px-14 md:py-16">
      {/* dots */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24">
        <div className="absolute left-1/2 top-0 h-20 w-[680px] -translate-x-1/2 opacity-60 [background-image:radial-gradient(rgba(96,165,250,0.35)_1px,transparent_1px)] [background-size:10px_10px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative">

        <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
          The Bootcamp isn’t just lessons —
          <br className="hidden md:block" /> it’s a complete execution upgrade
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
          This isn’t theory, indicators, or random strategies. You’ll learn one proven system,
          execute it live, and build the habits required to become a consistently profitable trader.
        </p>
      </div>
    </div>

    {/* BLOCKS */}
    <div className="mt-16 space-y-16 md:space-y-20">
      <BonusBlock
        badge="Bonus #1"
        title={<>Range Trading System (Proven & Battle-Tested)</>}
        subtitle="You’ll learn the exact trading system that has been refined, traded, and proven over years — not something that changes every month."
        points={[
          "A simple, rule-based system that removes guesswork",
          "Designed specifically for consistency and risk control",
          "No indicators, no noise, no over-complication",
          "Built to work across different market conditions",
        ]}
        img="/bonus1.webp"
        reverse={false}
      />

      <BonusBlock
        badge="Bonus #2"
        title={<>Live Execution & Real-Time Decision Making</>}
        subtitle="You won’t just learn what the strategy is — you’ll see exactly how it’s executed in real market conditions."
        points={[
          "Live breakdowns of entries, stops, and targets",
          "Understand why trades are taken — and why some are skipped",
          "Learn how professionals manage emotions during execution",
          "Turn theory into instinct through repetition",
        ]}
        img="/bonus2.webp"
        reverse={true}
      />

      <BonusBlock
        badge="Bonus #3"
        title={<>Daily Application Inside the Master Room</>}
        subtitle="Watch the same system applied every single day in real market environments, not cherry-picked examples."
        points={[
          "See real trades, not hindsight screenshots",
          "Understand how setups evolve session by session",
          "Learn consistency through repetition, not luck",
        ]}
        img="/bonus3.webp"
        reverse={false}
      />

      <BonusBlock
        badge="Bonus #4"
        title={<>A Community Trading One System</>}
        subtitle="You’ll be surrounded by traders learning and executing the exact same strategy — no conflicting opinions, no confusion."
        points={[
          "No strategy hopping or mixed signals",
          "Clear feedback from traders on the same path",
          "Accountability, structure, and shared progress",
        ]}
        img="/bonus4.webp"
        reverse={true}
      />

      <BonusBlock
        badge="Bonus #5"
        title={<>A Path to Long-Term Profitability</>}
        subtitle="This bootcamp isn’t about quick wins — it’s about building a skillset you can rely on for years."
        points={[
          "A system designed for longevity, not hype",
          "Focus on risk management and consistency",
          "Build confidence through structure, not luck",
        ]}
        img="/bonus5.webp"
        reverse={false}
      />
    </div>

    {/* CTA */}
    <div className="mt-16 flex justify-center">
      <a
        href="#plans"
        className="inline-flex items-center justify-center min-w-[240px] px-12 py-5 font-semibold uppercase tracking-[0.2em] text-black rounded-[24px] bg-[#FDE047] shadow-[0_30px_80px_rgba(253,224,71,0.18)] hover:brightness-105 transition"
      >
        View Tickets
      </a>
    </div>
  </div>
</section>

{/* SECTION: WHO IS THIS FOR */}
<section className="bg-black pt-0 pb-24 md:pb-32 -mt-12">
  <div className="mx-auto max-w-7xl px-6 lg:px-10">
    {/* HEADER */}
    <div className="mb-16 text-center">
      <div className="mx-auto inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs font-semibold tracking-wide text-purple-300">
        WHO IS THIS FOR?
      </div>

      <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
        Built for ambitious people
        <br className="hidden md:block" /> who want real financial skills
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
        Whether trading is a side skill or your future career, this bootcamp is designed to help you
        build consistency, confidence, and long-term profitability — without quitting your life.
      </p>
    </div>

    {/* GRID */}
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      {/* LEFT */}
      <div className="space-y-12">
        {[
          {
            title: "Aspiring Traders",
            text:
              "If you’ve tried trading before but lacked structure, clarity, or confidence, this bootcamp gives you one proven system and shows you exactly how to execute it.",
          },
          {
            title: "9–5 Professionals",
            text:
              "Learn how to trade alongside your job, without stress or overtrading, and build a high-income skill that can eventually replace your salary.",
          },
          {
            title: "Entrepreneurs & Business Owners",
            text:
              "Trading gives you an additional income stream that’s independent from clients, markets, or businesses — a skill you fully control.",
          },
        ].map((item, i) => (
          <div key={i} className="flex items-stretch gap-6">
            {/* VERTICAL LINE (NO absolute = works on iOS) */}
            {/* VERTICAL LINE (iPhone XR safe) */}
<div className="w-[10px] flex justify-center">
  <div
    className="w-[3px] self-stretch min-h-[120px] rounded-full shadow-[0_0_18px_rgba(168,85,247,0.35)]"
    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(192,132,252,1), rgba(168,85,247,0.7), rgba(168,85,247,0))",
    }}
  />
</div>


            <div>
              <h3 className="text-xl font-semibold text-purple-400">{item.title}</h3>
              <p className="mt-3 text-white/70">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="space-y-12">
        {[
          {
            title: "Freelancers & Creators",
            text:
              "If your income fluctuates month to month, trading gives you a structured, repeatable system that rewards discipline and consistency.",
          },
          {
            title: "Long-Term Thinkers",
            text:
              "This is for people who want a skill that works for years — not hype, signals, or shortcuts, but a real trading framework.",
          },
          {
            title: "Anyone Serious About Mastery",
            text:
              "If you’re willing to follow rules, manage risk, and focus on process, this bootcamp gives you everything needed to become consistently profitable.",
          },
        ].map((item, i) => (
          <div key={i} className="flex items-stretch gap-6">
            {/* VERTICAL LINE */}
            <div className="relative">
              <div
  className="h-full w-[3px] rounded-full shadow-[0_0_18px_rgba(168,85,247,0.35)]"
  style={{
    backgroundImage:
      "linear-gradient(to bottom, rgba(192,132,252,1), rgba(168,85,247,0.7), rgba(168,85,247,0))",
  }}
/>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-400">{item.title}</h3>
              <p className="mt-3 text-white/70">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>



{/* SECTION: EVERYTHING INCLUDED (MASTERMIND STYLE) */}
<section className="bg-black pt-0 pb-24 md:pb-32 -mt-12">
  <div className="mx-auto max-w-7xl px-6 lg:px-10">
    {/* TITLE */}
    <div className="text-center">
      <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
        Here’s Everything You Get
        <br className="hidden md:block" />
        Access To:
      </h2>
    </div>

    {/* MAIN CARD */}
    <div className="relative mt-16">
      {/* soft background streak */}
      <div className="pointer-events-none absolute -inset-x-10 top-6 h-[520px] opacity-60 blur-3xl">
        <div className="h-full w-full bg-gradient-to-r from-white/0 via-white/8 to-white/0" />
      </div>

      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[44px] border border-white/10 bg-[#070A10] shadow-[0_80px_220px_rgba(0,0,0,0.9)]">
        {/* subtle top glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 via-transparent to-transparent" />

        <div className="px-8 py-10 md:px-14 md:py-12">
          {/* header row */}
          <div className="flex items-center justify-center gap-3">
            <img
              src="/mastermind.webp"
              alt="Mastermind"
              className="h-7 w-7 md:h-8 md:w-8"
            />
            <span className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              Mastermind
            </span>
          </div>

          {/* list */}
          <div className="mt-10 space-y-5">
            <IncludedRow label="10 Live Bootcamp Lessons (all recorded)" price="€1,997" />
            <IncludedRow label="Range Trading System – Full Trading Strategy" price="€1,499" />
            <IncludedRow label="Daily Market Execution Plan" price="Priceless" />
            <IncludedRow label="Prop-Firm Passing Blueprint (rules, scaling, payout plan)" price="€999" />
            <IncludedRow label="Live Trade Walkthroughs (entries, management, exits)" price="Priceless" />
            <IncludedRow label="1-to-1 Mentorship Support" price="€2,499" />
            <IncludedRow label="Private Community Access" price="Priceless" />
            <IncludedRow label="Master Room Access (Signals + Execution Commentary)" price="€999" />
            <IncludedRow label="Personal Risk Model + Position Sizing Template" price="€299" />
            <IncludedRow label="Homework, Checklists, and Full Trading Plan" price="Priceless" />
          </div>

          {/* total */}
          <div className="mt-12 flex items-center justify-center gap-3 text-white/70">
            <span className="text-lg">Total:</span>
            <span className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              <span className="line-through text-white/40">€9,290</span>
            </span>
          </div>

          {/* CTA */}
          <div className="mt-10 flex justify-center pb-2">
            <a
              href="#plans"
              className="inline-flex items-center justify-center min-w-[320px] px-14 py-5 font-semibold uppercase tracking-[0.2em] text-black rounded-[24px] bg-[#FDE047] shadow-[0_30px_80px_rgba(253,224,71,0.18)] hover:brightness-105 transition"
            >
              View Tickets
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* SECTION: PROFITABILITY GUARANTEE */}
<section className="bg-black pt-0 pb-24 md:pb-32 mt-0 md:-mt-12">
  <div className="mx-auto max-w-7xl px-6 lg:px-10">
    <GuaranteeSection />
  </div>
</section>



      {/* SECTION: PLANS / TICKETS */}
<section id="plans" className="relative bg-black -mt-12 py-0">
  {/* ambient background like Monetise (Range purple) */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(168,85,247,0.14),transparent_55%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(253,224,71,0.10),transparent_55%)]" />
  </div>

  <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
    {/* Header */}
    <div className="text-center">
      <div className="mx-auto inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/75">
        TICKETS
      </div>

      <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
        Choose your <span className="text-yellow-300">Bootcamp Ticket</span>
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
        Both tickets include full access to the live sessions, recordings, and private support during the cohort.
        VIP is for traders who want priority help and extra perks.
      </p>
    </div>

    {/* Cards */}
    <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2">
      <TicketCard
        variant="regular"
        badge="REGULAR"
        title="Regular Ticket"
        price="€349"
        payNote="One-time payment"
        subline="Everything you need to learn and implement the Range System during the cohort."
        features={[
          "Access to all 10 live bootcamp sessions",
          "Lifetime access to all session recordings",
          "Full Range System explained live on real charts",
          "Live Q&A — ask questions during sessions",
          "Support inside the private bootcamp chat",
        ]}
        finePrint="Perfect if you want the full Mastermind Class."
        cardCheckoutUrl="https://whop.com/checkout/plan_vQYmRU1zF9egN"
        cryptoHref="https://t.me/rangesupportfx"
        onOpenCheckout={openCheckout}
      />

      <TicketCard
        variant="vip"
        badge="VIP"
        title="VIP Ticket"
        price="€479"
        payNote="One-time payment"
        subline="Giveaway + extra perks for traders who want more attention during mastermind."
        features={[
          "Everything in the Regular Ticket",
          "Access to the exclusive bootcamp giveaway",
          "One free month inside the Range Signal Room",
          "Priority help & support from the team",
          "Priority responses during the cohort",
        ]}
        finePrint="Best if you want to join the Signal Room + Giveaway access."
        cardCheckoutUrl="https://whop.com/checkout/plan_tLCvEV4SkpLih"
        cryptoHref="https://t.me/rangesupportfx"
        onOpenCheckout={openCheckout}
      />
    </div>

    {/* Bottom note */}
    <div className="mt-10 text-center">
      <p className="text-sm text-white/60">
        Seats are limited to keep this bootcamp interactive.
        <span className="text-white/80"> Once we hit the cap, tickets close for this cohort.</span>
      </p>
      <p className="mt-2 text-[11px] text-white/40">
        Secure checkout • Instant access • Works on mobile & desktop
      </p>
    </div>
  </div>

  {/* Overlay */}
  <CheckoutOverlay
    open={checkoutOpen}
    url={checkoutUrl}
    onClose={() => setCheckoutOpen(false)}
  />
</section>




      {/* SECTION: FAQ */}
<section className="relative bg-black py-28">
  {/* subtle left glow like Monetise */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(59,130,246,0.14),transparent_60%)]" />

  <div className="relative mx-auto max-w-5xl px-6">
    <div className="mb-14 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
        FAQs
      </p>
      <h2 className="text-4xl font-semibold tracking-tight text-white">
        Frequently Asked Questions
      </h2>
      <p className="mt-4 text-base text-zinc-400">
        Quick answers before you join the Bootcamp.
      </p>
    </div>

    <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b0f1a] to-[#06080f]">
      <FaqItem
        q="Is this for complete beginners?"
        a="You don’t need to be advanced, but you should understand basic trading concepts such as candlesticks, lot sizes, and order execution. If you’ve followed my YouTube content, you’re ready."
      />
      <FaqItem
        q="What if I can’t attend some of the live sessions?"
        a="All sessions are recorded and uploaded privately. You can also submit questions beforehand and I’ll cover them live."
      />
      <FaqItem
        q="Will I get the full strategy or just concepts?"
        a="You’ll get the complete system I personally trade — structure, execution, risk management, and real examples."
      />
      <FaqItem
        q="What markets does the Bootcamp focus on?"
        a="The Bootcamp focuses on highly liquid Forex pairs ideal for consistency and prop firm challenges."
      />
      <FaqItem
        q="How is this different from the Master Room?"
        a="The Bootcamp is a live trading Mastermind, where you get to interact LIVE with your mentor. The Master Room is the trading room where you receive all our trades analysis daily."
      />
      <FaqItem
        q="Do I get access to a community?"
        a="Yes. You’ll be inside a private group with other Bootcamp members where you can ask questions and share charts."
      />
      <FaqItem
        q="Is this designed for prop firm challenges?"
        a="Yes. The system is built to respect drawdowns, risk limits, and consistency rules used by major prop firms."
      />
      <FaqItem
        q="What if I already trade another strategy?"
        a="That’s fine. You can integrate parts of this system or fully adopt it — the principles are universal."
      />
    </div>
  </div>
</section>

{/* FOOTER */}
<footer className="bg-black py-14">
  <div className="mx-auto max-w-5xl px-6 text-center text-sm text-zinc-500">
    <div className="mb-4 flex justify-center gap-4">
      <a href="/privacy" className="hover:text-white transition">
        Privacy Policy
      </a>
      <span>•</span>
      <a href="/terms" className="hover:text-white transition">
        Terms & Conditions
      </a>
    </div>
    <p className="text-xs text-zinc-600">
      © 2025 Range University. All rights reserved.
    </p>
  </div>
</footer>



            {/* GLOBAL STYLES FOR MARQUEE */}
      <style jsx global>{`
        .marquee-container {
          position: relative;
          height: 100%;
        }
        .marquee-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .marquee-up {
          animation: marquee-up 40s linear infinite;
        }
        .marquee-down {
          animation: marquee-down 40s linear infinite;
        }
        @keyframes marquee-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes marquee-down {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>

    </main>
  );
}

function TicketCard({
  variant,
  badge,
  title,
  price,
  payNote,
  subline,
  features,
  finePrint,
  ribbon,

  // NEW
  cardCheckoutUrl,
  cryptoHref,
  onOpenCheckout,
}: {
  variant: "regular" | "vip";
  badge: string;
  title: string;
  price: string;
  payNote: string;
  subline: string;
  features: string[];
  finePrint?: string;
  ribbon?: string;

  // NEW
  cardCheckoutUrl: string;
  cryptoHref: string;
  onOpenCheckout: (url: string) => void;
}) {
  const isVip = variant === "vip";

  return (
    <div
      className={[
        "relative overflow-hidden rounded-[34px] border bg-[#070A10] p-7 md:p-8",
        "shadow-[0_70px_200px_rgba(0,0,0,0.85)]",
        isVip ? "border-yellow-500/50" : "border-white/10",
      ].join(" ")}
    >
      {/* top glow */}
      <div className="pointer-events-none absolute inset-0">
        {isVip ? (
          <>
            <div className="absolute -top-24 left-1/2 h-56 w-[520px] -translate-x-1/2 rounded-full bg-yellow-300/10 blur-3xl" />
            <div className="absolute -bottom-40 right-[-120px] h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute -top-28 left-[-140px] h-72 w-72 rounded-full bg-purple-500/12 blur-3xl" />
            <div className="absolute -bottom-40 right-[-160px] h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          </>
        )}
      </div>

      {/* ribbon */}
      {ribbon ? (
        <div className="absolute right-5 top-5 rounded-full border border-yellow-300/20 bg-yellow-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-200">
          {ribbon}
        </div>
      ) : null}

      <div className="relative">
        {/* badge */}
        <div
          className={[
            "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em]",
            isVip
              ? "border-yellow-300/25 bg-yellow-300/10 text-yellow-200"
              : "border-white/10 bg-white/5 text-white/70",
          ].join(" ")}
        >
          {badge}
        </div>

        {/* title */}
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {title}
        </h3>

        {/* price row */}
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <div className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {price}
            </div>
            <div className="mt-1 text-sm text-white/50">{payNote}</div>
          </div>

          {/* small “value” pill */}
          <div
            className={[
              "hidden sm:inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold",
              isVip
                ? "border-yellow-300/20 bg-yellow-300/10 text-yellow-200"
                : "border-white/10 bg-white/5 text-white/65",
            ].join(" ")}
          >
            {isVip ? "Giveaway Access" : "Core Access"}
          </div>
        </div>

        {/* subline */}
        <p className="mt-5 text-base leading-relaxed text-white/70">{subline}</p>

        {/* features */}
        <ul className="mt-6 space-y-3 text-sm text-white/70">
          {features.map((f, idx) => (
            <li key={idx} className="flex gap-3">
              <span
                className={[
                  "mt-[6px] inline-block h-2 w-2 shrink-0 rounded-full",
                  isVip ? "bg-yellow-300" : "bg-purple-400",
                ].join(" ")}
              />
              <span className="leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA (2 buttons) */}
        <div className="mt-8">
          {/* JOIN WITH CARD */}
          <button
            type="button"
            onClick={() => onOpenCheckout(cardCheckoutUrl)}
            className={[
              "group inline-flex w-full items-center justify-center gap-2 rounded-[22px] px-8 py-4",
              "text-xs font-semibold uppercase tracking-[0.2em] text-black",
              "shadow-[0_30px_80px_rgba(253,224,71,0.18)] transition",
              "hover:brightness-105",
            ].join(" ")}
            style={{
              background: "linear-gradient(135deg, #fef9c3, #fde047, #fbbf24)",
            }}
          >
            <CreditCard className="h-4 w-4" />
            JOIN WITH CARD
          </button>

          {/* JOIN WITH CRYPTO (same secure checkout overlay) */}
<button
  type="button"
  onClick={() => onOpenCheckout(cryptoHref)}
  className={[
    "mt-3 group inline-flex w-full items-center justify-center gap-2 rounded-[22px] px-8 py-4",
    "text-xs font-semibold uppercase tracking-[0.2em] text-white",
    "border border-white/10 bg-white/5",
    "shadow-[0_24px_70px_rgba(0,0,0,0.25)] transition",
    "hover:bg-white/10 hover:brightness-105",
  ].join(" ")}
>
  <img
    src="/crypto-icon.webp"
    alt=""
    className="h-4 w-4"
    draggable={false}
  />
  JOIN WITH CRYPTO
</button>


          {finePrint ? (
            <p className="mt-3 text-[11px] leading-relaxed text-white/45">
              {finePrint}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CheckoutOverlay({
  open,
  url,
  onClose,
}: {
  open: boolean;
  url: string;
  onClose: () => void;
}) {
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // ignore
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-5">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[520px] overflow-hidden rounded-[26px] border border-white/10 bg-[#070A10] shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-56 w-[520px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 right-[-160px] h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="relative p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
             <div className="text-lg font-semibold text-white">
  {url.includes("t.me") ? "Opening Telegram…" : "Opening secure checkout…"}
</div>

<p className="mt-1 text-sm leading-relaxed text-white/60">
  {url.includes("t.me")
    ? "You’ll message our team to pay with crypto and get access."
    : "A new tab should open automatically. If nothing happens, use the buttons below."}
</p>

            </div>

            <button
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 space-y-3">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
            >
              <ExternalLink className="h-4 w-4" />
              Continue to checkout
            </a>

            <button
              type="button"
              onClick={copyLink}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/10"
            >
              <Copy className="h-4 w-4" />
              Copy link
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-[14px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/50 hover:bg-white/10"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



function FaqItem({
  q,
  a,
}: {
  q: string;
  a: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b border-white/10 transition-colors ${
        open ? "bg-white/5" : "hover:bg-white/[0.03]"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-8 py-7 text-left"
      >
        <span className="text-lg font-medium text-white">
          {q}
        </span>

        {/* Chevron (no external libs, no errors) */}
        <span
          className={`ml-4 inline-block transform text-zinc-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="px-8 pb-7">
          <p className="text-base leading-relaxed text-zinc-300">
            {a}
          </p>
        </div>
      )}
    </div>
  );
}



function IncludedRow({ label, price }: { label: string; price: string }) {
  return (
    <div className="flex items-center gap-4">
      {/* left check */}
      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M20 6L9 17l-5-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* label + dotted line */}
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <p className="min-w-0 truncate text-sm text-white/85 md:text-base">
          {label}
        </p>
        <div className="hidden flex-1 border-b border-dashed border-white/20 md:block" />
      </div>

      {/* price */}
      <div className="shrink-0 text-sm font-medium text-white/70 md:text-base">
        {price}
      </div>
    </div>
  );
}

function GuaranteeSection() {
  return (
    <div className="py-6 md:py-10">
      <div className="mx-auto max-w-5xl">
        {/* OUTER WRAPPER MUST NOT CLIP */}
        <div
  className="relative rounded-[46px] p-[2px] overflow-visible ring-1 ring-[#FDE68A]/25"
  style={{
    backgroundImage:
      "linear-gradient(to bottom, rgba(245,195,75,0.8), rgba(253,230,138,0.35), rgba(245,195,75,0.7))",
  }}
>

          {/* INNER CARD */}
          <div className="relative isolate overflow-hidden rounded-[45px] bg-[#070A10] px-6 pt-14 pb-12 text-center md:px-20 md:pt-20 md:pb-20">
            {/* gold glow overlays (XR-safe) */}
<div className="pointer-events-none absolute inset-0 opacity-[0.22] bg-[radial-gradient(800px_420px_at_50%_35%,rgba(253,224,71,0.35),transparent_60%)]" />
<div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[radial-gradient(900px_520px_at_50%_120%,rgba(245,195,75,0.28),transparent_55%)]" />

            <div className="relative mb-8 flex justify-center md:mb-10">
              <img
                src="/satisfied.webp"
                alt="Satisfaction Guarantee"
                className="w-[140px] md:w-[180px]"
              />
            </div>

            <h2 className="relative text-3xl font-semibold tracking-tight text-[#FDE047] md:text-5xl">
              Become Profitable —
              <br className="hidden md:block" />
              Or We Work With You Until You Do
            </h2>

            <p className="relative mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-white/80 md:text-base">
              If you don’t make a <span className="font-semibold text-white">10× return</span> on your investment with the
              <span className="font-semibold text-white"> Mastermind</span> within{" "}
              <span className="font-semibold text-white">6 months</span>, my team and I will personally continue working
              with you — <span className="font-semibold text-white">up to 3 years</span>.
            </p>

            <p className="relative mt-4 text-xs uppercase tracking-widest text-white/50">
              The risk is on us.
            </p>

            <div className="relative mt-10 flex justify-center md:mt-12">
              <a
                href="#plans"
                className="inline-flex w-full max-w-[520px] items-center justify-center px-10 py-5 font-semibold uppercase tracking-[0.2em] text-black rounded-[26px] bg-[#FDE047] shadow-[0_24px_60px_rgba(253,224,71,0.22)] hover:brightness-105 transition"
              >
                View Tickets
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function MonetiseCard({
  img,
  title,
  body,
}: {
  img: string;
  title: React.ReactNode;
  body: string;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-[40px] border border-white/10 bg-[#070A10] shadow-[0_50px_140px_rgba(0,0,0,0.85)]">
      {/* top glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-black/70" />
      </div>

      <div className="relative flex h-full flex-col">
        {/* IMAGE */}
        <div className="relative px-5 pt-5">
          <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-black">
            <div className="relative aspect-[4/3] w-full">
              <Image src={img} alt="Card image" fill className="object-cover" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
          </div>
        </div>

        {/* TEXT */}
        <div className="relative flex flex-1 flex-col px-8 pb-12 pt-8 text-center">
          <h3 className="text-[24px] font-semibold leading-tight text-[#60a5fa]">
            {title}
          </h3>

          <p className="mt-5 text-[15px] leading-relaxed text-zinc-300/90">
            {body}
          </p>
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/70 to-transparent" />
    </div>
  );
}

function BonusBlock({
  badge,
  title,
  subtitle,
  points,
  img,
  reverse = false,
}: {
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  points: string[];
  img: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={[
        "grid items-center gap-10 lg:gap-14",
        "grid-cols-1 md:grid-cols-2",
        reverse
          ? "md:[&_.bonus-media]:order-1 md:[&_.bonus-copy]:order-2"
          : "md:[&_.bonus-media]:order-2 md:[&_.bonus-copy]:order-1",
      ].join(" ")}
    >
      {/* COPY */}
      <div className="bonus-copy">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80">
          {badge}
        </div>

        <h3 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          {title}
        </h3>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          {subtitle}
        </p>

        <ul className="mt-7 space-y-3">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-3 text-white/85">
              <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-base leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* MEDIA */}
      <div className="bonus-media">
        <div className="relative rounded-[44px] border border-white/10 bg-[#070A10] p-5 shadow-[0_70px_200px_rgba(0,0,0,0.85)]">
          <div className="pointer-events-none absolute -inset-10 rounded-[56px] bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute inset-0 rounded-[44px] bg-gradient-to-b from-white/[0.06] via-transparent to-black/70" />

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black">
            <div className="relative aspect-square w-full">
              <Image src={img} alt="Bonus" fill className="object-cover" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}


function Divider() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function IconBox({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        flex h-16 w-16 shrink-0 items-center justify-center
        border border-white/10
        bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_rgba(255,255,255,0)_60%)]
        shadow-[0_0_0_1px_rgba(56,189,248,0.08),_0_18px_60px_rgba(0,0,0,0.6)]
      "
      style={{ borderRadius: 14 }}
    >
      <div className="text-cyan-300">{children}</div>
    </div>
  );
}

/** Icons (Monetise-like: cyan stroke, clean lines) **/
function IconBlueprint() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="opacity-95">
      <path d="M6 3h10a2 2 0 0 1 2 2v14H8a2 2 0 0 0-2 2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 7h8M8 11h8M8 15h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="opacity-95">
      <path d="M12 21a9 9 0 1 1 9-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 17a5 5 0 1 1 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
      <path d="M21 3l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 3h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconWrench() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="opacity-95">
      <path
        d="M21 7.5a5.5 5.5 0 0 1-7.6 5.1L7.2 18.8a2 2 0 0 1-2.8-2.8l6.2-6.2A5.5 5.5 0 0 1 16.5 3l-2.7 2.7 3.8 3.8L21 7.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDollar() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="opacity-95">
      <path d="M12 2v20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M16 6.5c0-1.7-1.8-3-4-3s-4 1.3-4 3 1.8 3 4 3 4 1.3 4 3-1.8 3-4 3-4-1.3-4-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}




/* ---------- VIDEO PLAYER ---------- */

function BootcampAudioPlayer() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Button should disappear forever after first interaction
  const [hasInteracted, setHasInteracted] = useState(false);

  // Track play/pause so we can toggle on click
  const [isPlaying, setIsPlaying] = useState(false);

  const post = (msg: string) => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.contentWindow?.postMessage(msg, "*");
  };

  const play = () => {
    post('{"event":"command","func":"playVideo","args":""}');
    setIsPlaying(true);
  };

  const pause = () => {
    post('{"event":"command","func":"pauseVideo","args":""}');
    setIsPlaying(false);
  };

  const unmute = () => {
    post('{"event":"command","func":"unMute","args":""}');
  };

  const handleToggle = () => {
    // First click: unmute + play + hide button forever
    if (!hasInteracted) {
      setHasInteracted(true);
      unmute();
      play();
      return;
    }

    // Next clicks: toggle play/pause
    if (isPlaying) pause();
    else play();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent double-trigger (button click + wrapper click)
    e.preventDefault();
    e.stopPropagation();
    handleToggle();
  };

  return (
    <div
      className="group relative aspect-video w-full overflow-hidden bg-black"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={isPlaying ? "Pause video" : "Play video"}
    >
      {/* YouTube iframe */}
      <iframe
        ref={iframeRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        src="https://www.youtube.com/embed/Uwba6689EWM?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&modestbranding=1&loop=1&playlist=Uwba6689EWM&enablejsapi=1"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />

      {/* cinematic overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/55" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10)]" />

      {/* Center button: only until first interaction */}
      {!hasInteracted && (
        <button
          type="button"
          onClick={handleButtonClick}
          className={[
            "pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "border border-white/15 bg-white/10 px-6 py-3",
            "text-[11px] font-semibold uppercase tracking-[0.28em] text-white",
            "shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur",
            "transition-opacity group-hover:opacity-100",
          ].join(" ")}
        >
          Play with sound
        </button>
      )}
    </div>
  );
}



/* ---------- REUSABLE COMPONENTS ---------- */

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-6xl px-4 py-16">{children}</div>
    </section>
  );
}

/* Sliding testimonial column */
function TestimonialColumn({
  direction,
  images,
}: {
  direction: "up" | "down";
  images: string[];
}) {
  // repeat only this column's images so it loops smoothly
  const loopImages = [...images, ...images];

  return (
    <div className="relative">
      <div
        className={`marquee-column ${
          direction === "up" ? "marquee-up" : "marquee-down"
        }`}
      >
        {loopImages.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="overflow-hidden rounded-[20px] border border-slate-800 bg-black/70"
          >
            <Image
              src={src}
              alt="Student result"
              width={400}
              height={260}
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}


function Badge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "success" | "danger" | "neutral";
}) {
  const base =
    "inline-flex min-w-[56px] items-center justify-center rounded-full px-3 py-1 text-[10px] font-semibold";
  const styles =
    variant === "success"
      ? "bg-emerald-900/60 text-emerald-300"
      : variant === "danger"
      ? "bg-red-900/60 text-red-300"
      : "bg-slate-900/80 text-slate-300";
  return <span className={`${base} ${styles}`}>{children}</span>;
}

function SmallCard({
  title,
  items,
  highlight,
}: {
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div className="rounded-[24px] border border-slate-800 bg-slate-950/70 p-4">
      <p
        className={`mb-2 text-xs font-semibold uppercase tracking-wide ${
          highlight ? "text-yellow-300" : "text-zinc-400"
        }`}
      >
        {title}
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-[11px] text-zinc-300">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PersonaCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-950/70 p-5 text-sm">
      <p className="mb-1 text-sm font-semibold text-cyan-300">{title}</p>
      <p className="text-xs text-zinc-300">{body}</p>
    </div>
  );
}

function GradientCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[40px] border border-slate-800 bg-[radial-gradient(circle_at_top,_#020617,_#020617_55%,_#020617)] px-8 py-10 shadow-[0_0_80px_rgba(15,23,42,0.9)]">
      {children}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-[24px] border border-slate-800 bg-slate-950/80 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
        {label}
      </p>
      <p className="text-lg font-semibold text-yellow-300">{value}</p>
      <p className="text-[11px] text-zinc-400">{sub}</p>
    </div>
  );
}

function BonusCard({
  tag,
  title,
  body,
}: {
  tag: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-950/70 p-5 text-sm">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
        {tag}
      </p>
      <p className="mb-1 text-sm font-semibold text-zinc-100">{title}</p>
      <p className="text-xs text-zinc-300">{body}</p>
    </div>
  );
}

function ValueRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 py-2 last:border-b-0">
      <span className="text-xs text-zinc-200 sm:text-sm">{label}</span>
      <span className="text-xs font-semibold text-zinc-100 sm:text-sm">
        {value}
      </span>
    </div>
  );
}

