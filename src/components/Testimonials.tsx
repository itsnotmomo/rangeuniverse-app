"use client";

import { useEffect, useRef, useState } from "react";

/* 
  PREMIUM TESTIMONIALS — UNIFIED IPHONE MOCKUPS
  ------------------------------------------------
  - No raw screenshots needed. Every testimonial is reconstructed into consistent chat UI.
  - iPhone-17 style frame, dynamic island, metal edge sheen, side buttons accents.
  - Autoplay, arrows, dots, swipe, keyboard.
  - Side panel shows compact bio + key stat (payout / pass / progress).

  Usage:
    import { Testimonials } from "@/components/Testimonials";
    ...
    <Testimonials />
*/

type Bubble = { side: "left" | "right"; text: string; time?: string; accent?: boolean };

type Testimonial = {
  name: string;
  initials?: string;    // optional, auto-derived from name if omitted
  status?: string;      // "online", "last seen recently", etc.
  tag: string;          // small badge (e.g., "Payout • FTMO")
  meta: string;         // short line under name (e.g., "€3,924 payout • Italy")
  keyStat?: string;     // big number or claim (e.g., "€3,924")
  keyLabel?: string;    // what the number means (e.g., "Payout")
  bubbles: Bubble[];    // chat content
};

const ITEMS: Testimonial[] = [
  {
    name: "Fabio G.",
    status: "online",
    tag: "Payout • FTMO",
    meta: "€3,924 payout • Italy",
    keyStat: "€3,924",
    keyLabel: "Payout",
    bubbles: [
      { side: "left", text: "Hey bro, forgot to share last week’s payout from FTMO.", time: "15:18" },
      { side: "left", text: "Two and a half salaries of my job in a single payout 😳🙏", time: "15:19" },
      { side: "right", text: "Massive. Proud of you — keep risk tight & follow RR.", time: "15:21", accent: true },
    ],
  },
  {
    name: "Andrea FX",
    status: "last seen 6m ago",
    tag: "Verification • FTMO",
    meta: "Funded • Spain",
    keyStat: "PASSED",
    keyLabel: "Verification",
    bubbles: [
      { side: "left", text: "I'm officially a funded trader! The range system is insane 🔥📈", time: "20:00" },
      { side: "right", text: "Let’s gooo — stick to the plan and journal every trade. 💪", time: "20:01", accent: true },
    ],
  },
  {
    name: "Shamas Ahmed",
    status: "last seen recently",
    tag: "Phase 2 • Progress",
    meta: "Dashboard • UK",
    keyStat: "Phase 2",
    keyLabel: "Completed",
    bubbles: [
      { side: "left", text: "Phase 2 completed. Your system is goated bro — can’t thank you enough 🫶", time: "15:47" },
      { side: "right", text: "Clean work. Keep journaling — process > outcome.", time: "15:48", accent: true },
    ],
  },
  {
    name: "Davide",
    status: "last seen just now",
    tag: "Challenge + Verification • FTMO",
    meta: "3 passes since joining",
    keyStat: "3× PASS",
    keyLabel: "FTMO",
    bubbles: [
      { side: "left", text: "Step 2 SMASHED in 2 days 💥", time: "14:00" },
      { side: "left", text: "Joined in Nov 2024 — already passed 3 FTMO challenges. Crazy stuff! 🤯🚀", time: "14:01" },
      { side: "right", text: "Elite pace. Keep risk disciplined & follow the playbooks.", time: "14:03", accent: true },
    ],
  },
  {
    name: "Matias",
    status: "online",
    tag: "Live P/L • EU trade",
    meta: "$2,000 day",
    keyStat: "$2,000",
    keyLabel: "Profit",
    bubbles: [
      { side: "left", text: "2000$ with your signal on EU bro 😎", time: "18:03" },
      { side: "right", text: "Amazing bro! Keep compounding. 🔥", time: "18:04", accent: true },
    ],
  },
  {
    name: "Francesco",
    status: "last seen recently",
    tag: "Live P/L • EU trade",
    meta: "€400 trade",
    keyStat: "€438",
    keyLabel: "Profit",
    bubbles: [
      { side: "left", text: "400€ on EUR/USD FRA 🤯", time: "18:21" },
      { side: "left", text: "YOU ARE THE BEST, thank you 🙏", time: "18:22" },
      { side: "right", text: "Love it. Keep the standards high.", time: "18:23", accent: true },
    ],
  },
];

/* ====== Exported component ====== */
export function Testimonials() {
  return (
    <section id="reviews" className="relative bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs tracking-[0.35em] text-neutral-600">
            S T U D E N T &nbsp; R E S U L T S
          </p>
          <h2 className="mt-2 text-[32px] md:text-[40px] font-extrabold">
            Consistent wins, verified passes, real payouts
          </h2>
          <p className="mt-2 text-neutral-600">
            Private chats re-created inside a unified iPhone mockup. Clean, on-brand, and privacy-safe.
          </p>
        </div>

        <Carousel items={ITEMS} />
      </div>
    </section>
  );
}

/* ====================== Carousel ====================== */

function Carousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  // autoplay with pause on hover
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((p) => (p + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total, paused]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((p) => (p + 1) % total);
      if (e.key === "ArrowLeft") setIndex((p) => (p - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  // swipe
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) setIndex((p) => (p + (dx < 0 ? 1 : -1) + total) % total);
    startX.current = null;
  };

  const go = (k: number) => setIndex((k + total) % total);
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  const item = items[index];

  return (
    <div
      className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* iPhone mockup with chat */}
      <div className="relative mx-auto w-[320px] sm:w-[360px] md:w-[380px]">
        <IPhoneFrame>
          <PhoneHeader name={item.name} status={item.status ?? "online"} />
          <div className="px-3 pb-4">
            {/* optional stat pill (keeps devices aligned) */}
            {item.keyStat && (
              <div className="mx-auto mb-3 w-max rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 shadow">
                {item.keyStat} • {item.keyLabel}
              </div>
            )}
            {item.bubbles.map((b, idx) => (
              <ChatBubble key={idx} {...b} />
            ))}
          </div>
        </IPhoneFrame>

        {/* controls */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={prev}
            className="rounded-full border px-3 py-1.5 text-sm hover:bg-neutral-50"
            style={{ borderColor: "rgba(0,0,0,0.15)" }}
          >
            ‹ Prev
          </button>
          <Dots total={total} index={index} onDot={go} />
          <button
            onClick={next}
            className="rounded-full border px-3 py-1.5 text-sm hover:bg-neutral-50"
            style={{ borderColor: "rgba(0,0,0,0.15)" }}
          >
            Next ›
          </button>
        </div>
      </div>

      {/* side info panel */}
      <aside className="mx-auto w-full max-w-xl">
        <div
          className="rounded-2xl border bg-white p-6 shadow-sm"
          style={{ borderColor: "rgba(0,0,0,0.12)" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xl font-extrabold">{item.name}</div>
              <div className="text-sm text-neutral-600">{item.meta}</div>
            </div>
            <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
              {item.tag}
            </span>
          </div>

          <blockquote
            className="mt-5 rounded-xl p-4 text-neutral-900"
            style={{
              background:
                "linear-gradient(180deg, rgba(109,40,217,0.08), rgba(109,40,217,0.04))",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {/* build a single, short quote from the first user message */}
            <span className="text-[28px] leading-none align-top">“</span>
            {firstQuote(item)}
            <span className="text-[28px] leading-none align-bottom">”</span>
          </blockquote>

          <div className="mt-4 text-[12px] text-neutral-500">
            Recreated from private messages for privacy. Results vary; trading involves risk.
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="/join"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-white font-semibold border transition"
              style={{
                background:
                  "linear-gradient(90deg, #5b21b6, #6d28d9)",
                borderColor: "rgba(0,0,0,0.2)",
                boxShadow: "0 3px 0 rgb(58 28 113)",
              }}
            >
              Join Master Room
            </a>
            <button
              onClick={() => (window.location.href = "#stats")}
              className="rounded-md border px-4 py-2 text-sm hover:bg-neutral-50"
              style={{ borderColor: "rgba(0,0,0,0.15)" }}
            >
              See performance →
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ====================== UI primitives ====================== */

function firstQuote(t: Testimonial) {
  // pick the first left-side message to use as the side-panel quote
  const b = t.bubbles.find((x) => x.side === "left");
  return b ? b.text : t.meta;
}

function Dots({
  total,
  index,
  onDot,
}: {
  total: number;
  index: number;
  onDot: (k: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, k) => (
        <button
          key={k}
          onClick={() => onDot(k)}
          aria-label={`Go to slide ${k + 1}`}
          className={`h-2.5 w-2.5 rounded-full ${
            index === k
              ? "bg-neutral-900"
              : "bg-neutral-300 hover:bg-neutral-400"
          }`}
        />
      ))}
    </div>
  );
}

function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative rounded-[44px] border-2 bg-black p-2 shadow-2xl"
      style={{
        borderColor: "rgba(0,0,0,0.7)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
      }}
    >
      {/* metal edge gloss */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[44px]"
        style={{
          boxShadow:
            "inset 0 0 0 2px rgba(255,255,255,0.08), inset 0 0 0 6px rgba(255,255,255,0.02)",
        }}
      />
      {/* dynamic island */}
      <div className="absolute left-1/2 top-2 -translate-x-1/2 h-6 w-36 rounded-full bg-black/80" />
      {/* screen */}
      <div className="relative h-[620px] w-[300px] sm:h-[700px] sm:w-[340px] overflow-hidden rounded-[34px] bg-[#0b0f18]">
        {children}
      </div>
      {/* side buttons (decorative) */}
      <div className="absolute right-[-4px] top-24 h-16 w-1.5 rounded bg-neutral-300/40" />
      <div className="absolute left-[-4px] top-20 h-8 w-1.5 rounded bg-neutral-300/40" />
      <div className="absolute left-[-4px] top-36 h-10 w-1.5 rounded bg-neutral-300/40" />
    </div>
  );
}

function PhoneHeader({ name, status }: { name: string; status: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-white/10 bg-[#0b0f18]/90 px-3 py-2 backdrop-blur">
      <div className="h-7 w-7 rounded-full bg-white text-xs font-bold text-neutral-900 grid place-items-center">
        {initials}
      </div>
      <div>
        <div className="text-sm font-semibold text-white/90">{name}</div>
        <div className="text-[11px] text-white/60">{status}</div>
      </div>
    </div>
  );
}

function ChatBubble({ side, text, time, accent }: Bubble) {
  const isRight = side === "right";
  return (
    <div className={`mt-2 flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[85%]">
        <div
          className={`relative rounded-2xl px-4 py-3 text-[15px] leading-6 ${
            accent ? "text-white" : isRight ? "text-neutral-100" : "text-neutral-900"
          } ${isRight ? (accent ? "" : "bg-neutral-800 text-neutral-50") : "bg-white"} `}
          style={
            accent
              ? {
                  background:
                    "linear-gradient(90deg, #5b21b6, #6d28d9)",
                  boxShadow: "0 6px 14px rgba(139,92,246,0.25)",
                }
              : { boxShadow: "0 1px 0 rgba(0,0,0,0.05)" }
          }
        >
          {text}
          {time && (
            <span
              className={`absolute -bottom-4 text-[10px] ${
                isRight ? "right-1 text-white/60" : "left-1 text-neutral-400"
              }`}
            >
              {time}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
