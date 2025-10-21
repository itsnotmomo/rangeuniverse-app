'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function ToolsPath() {
  // Refs
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Ultra-wide behavior (left positioning)
  const LEFT_MODE_AT = 1720; // px viewport width to switch to left mode
  const LEFT_OFFSET = 28;    // px from inner container's left edge

  // Rows: left a bit taller than right
  const rows = useMemo(
    () => [
      {
        id: 'r1',
        leftMd: 320,
        leftLg: 360,
        feature: {
          label: 'Module 01',
          icon: '🎓',
          title: 'Vital Life Lessons',
          bullets: [
            'World-class custom built learning application',
            'Scale from Zero to $10k/month quickly',
            'Master key skills for wealth generation',
          ],
        },
      },
      {
        id: 'r2',
        leftMd: 300,
        leftLg: 340,
        feature: {
          label: 'Module 02',
          icon: '👥',
          title: 'Private Network',
          bullets: [
            'Celebrate your wins with people who understand',
            'Access knowledge updated by the hour',
            'Network with 155,000+ students',
          ],
        },
      },
      {
        id: 'r3',
        leftMd: 320,
        leftLg: 360,
        feature: {
          label: 'Module 03',
          icon: '💰',
          title: 'Access To Multi-Millionaires',
          bullets: [
            'Mentors are hyper-successful in their field',
            'Make ambitious friends on the way',
            'Live calls every single day',
          ],
        },
      },
    ],
    []
  );

  /* ---------- progress limited to the timeline area ---------- */
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const denom = Math.max(rect.height - vh, 1);
      const p = clamp((-rect.top) / denom, 0, 1);
      setProgress(p);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* ---------- arrow spring (snappy + smooth) ---------- */
  const [arrowY, setArrowY] = useState(0); // px along the line
  const velRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  // A hair faster than before, still smooth
  const K = 24.0; // stiffness
  const D = 14.0; // damping

  useEffect(() => {
    let raf = 0;
    const step = (ts: number) => {
      const lineH = lineRef.current?.clientHeight ?? 0;
      const pad = 16;
      const minY = pad;
      const maxY = Math.max(lineH - pad, pad);
      const targetY = minY + (maxY - minY) * progress;

      const last = lastTsRef.current ?? ts;
      const dt = Math.min((ts - last) / 1000, 0.033);
      lastTsRef.current = ts;

      setArrowY((xPrev) => {
        const vPrev = velRef.current;
        const a = K * (targetY - xPrev) - D * vPrev;
        const v = vPrev + a * dt;
        let x = xPrev + v * dt;

        if (x < minY) { x = minY; velRef.current = 0; }
        else if (x > maxY) { x = maxY; velRef.current = 0; }
        else { velRef.current = Math.abs(v) < 0.004 ? 0 : v; }

        return x;
      });

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  /* ---------- X position (center by default, left on ultra-wide) ---------- */
  const [tlx, setTlx] = useState(0);

  useEffect(() => {
    const computeX = () => {
      const tl = timelineRef.current;
      const gut = gutterRef.current;
      const cont = containerRef.current;
      if (!tl) return;

      const tlRect = tl.getBoundingClientRect();
      let x = 0;

      if (window.innerWidth >= LEFT_MODE_AT && cont) {
        const contRect = cont.getBoundingClientRect();
        x = (contRect.left - tlRect.left) + LEFT_OFFSET;
      } else if (gut) {
        const gutRect = gut.getBoundingClientRect();
        x = gutRect.left - tlRect.left + gutRect.width / 2;
      } else {
        x = tlRect.width / 2;
      }
      setTlx(x);
    };

    computeX();
    const ro = new ResizeObserver(computeX);
    if (timelineRef.current) ro.observe(timelineRef.current);
    if (gutterRef.current) ro.observe(gutterRef.current);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', computeX);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', computeX);
    };
  }, []);

  return (
    <section className="relative w-full bg-white text-neutral-900">
      {/* local helpers */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeSlideUp { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform: translateY(0); } }
          .reveal { animation: fadeSlideUp .5s cubic-bezier(.22,.61,.36,1) forwards; }
          .card-glow { box-shadow: 0 8px 30px rgba(0,0,0,.06), inset 0 0 0 1px rgba(109,40,217,.08); }
          .card-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 34px rgba(0,0,0,.08), inset 0 0 0 1px rgba(109,40,217,.10); }
          .headline-grad { background: linear-gradient(90deg,#111,#6d28d9 70%,#111); -webkit-background-clip:text; background-clip:text; color: transparent; }
          .chip-grad { background: linear-gradient(135deg, rgba(109,40,217,.18), rgba(109,40,217,.06)); }
          .inner-sep { background: linear-gradient(90deg, rgba(0,0,0,.06), rgba(0,0,0,.00) 30%, rgba(0,0,0,.00) 70%, rgba(0,0,0,.06)); height:1px; }
        `,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_600px_at_50%_-200px,rgba(109,40,217,.08),transparent_60%)]"
      />

      <div ref={containerRef} className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <p className="uppercase tracking-[.22em] text-xs text-neutral-500">A step-by-step path</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl headline-grad">
            Tools To Maximize Your Income
          </h2>
        </header>

        {/* Timeline area */}
        <div ref={timelineRef} className="relative">
          {/* line */}
          <div
            ref={lineRef}
            className="pointer-events-none absolute top-0 hidden h-full w-px md:block"
            style={{
              left: `${tlx}px`,
              background: `linear-gradient(180deg, rgba(0,0,0,.08) 0%, rgba(109,40,217,.45) 50%, rgba(0,0,0,.08) 100%)`,
              boxShadow: `0 0 22px rgba(109,40,217,.26)`,
            }}
          />
          {/* arrow icon (from /public/arrowdown.webp) */}
          <div
            className="pointer-events-none absolute hidden md:block will-change-transform z-10"
            style={{
              left: `${tlx}px`,
              top: 0,
              transform: `translate3d(-50%, ${arrowY}px, 0)`,
            }}
          >
            <ArrowIcon />
          </div>

          {/* STRICT 3-COLUMN GRID. Each row renders Left | Gutter | Right without extra wrappers */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] md:gap-12">
            {rows.map((r, idx) => (
              <>
                {/* LEFT */}
                <FadeIn key={`${r.id}-left`}>
                  <TallImage mdH={r.leftMd} lgH={r.leftLg} />
                </FadeIn>

                {/* GUTTER (center) */}
                <div key={`${r.id}-gut`} ref={idx === 0 ? gutterRef : undefined} />

                {/* RIGHT */}
                <FadeIn key={`${r.id}-right`} delay={0.06}>
                  <RightCell mdH={r.leftMd} lgH={r.leftLg}>
                    <FeatureCard
                      label={r.feature.label}
                      icon={r.feature.icon}
                      title={r.feature.title}
                      bullets={r.feature.bullets}
                    />
                  </RightCell>
                </FadeIn>
              </>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex items-center justify-center">
          <a
            href="#join-master-room"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-violet-500 px-7 py-3 text-white shadow-[0_12px_28px_rgba(109,40,217,.35)] transition hover:brightness-110 active:translate-y-[1px]"
          >
            Enroll Today
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================= subcomponents ================= */

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setShow(true);
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={show ? 'reveal' : 'opacity-0'}
      style={{ animationDelay: show ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  );
}

function RightCell({
  children,
  mdH,
  lgH,
}: {
  children: React.ReactNode;
  mdH: number;
  lgH: number;
}) {
  return (
    <div className="flex">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media (min-width:768px){ .row-md-${mdH}{height:${mdH}px} }
          @media (min-width:1024px){ .row-lg-${lgH}{height:${lgH}px} }
        `,
        }}
      />
      <div className={`row-md-${mdH} row-lg-${lgH} w-full flex items-center`}>{children}</div>
    </div>
  );
}

function TallImage({ mdH, lgH }: { mdH: number; lgH: number }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white card-glow transition-transform">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media (min-width:768px){ .ph-md-${mdH}{height:${mdH}px} }
          @media (min-width:1024px){ .ph-lg-${lgH}{height:${lgH}px} }
        `,
        }}
      />
      <div className={`ph-md-${mdH} ph-lg-${lgH} h-[260px] md:h-auto lg:h-auto relative`}>
        {/* Gradient background (kept visible) */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(1000px_600px_at_-10%_-20%,rgba(109,40,217,.12),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(109,40,217,.06),rgba(109,40,217,.02))]" />
        {/* subtle glass reflection */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:linear-gradient(to-bottom,rgba(255,255,255,.18),transparent_60%)] bg-white/40" />

        {/* PHONE IMAGE (contained so gradient stays visible) */}
        <div className="absolute inset-0 grid place-items-center">
          <Image
            src="/phone1.png"
            alt="Master Room phones"
            className="w-full h-full object-contain p-6 pointer-events-none select-none"
            fill
            sizes="(min-width: 1024px) 33vw, 90vw"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  label,
  icon,
  title,
  bullets,
}: {
  label: string;
  icon: string;
  title: string;
  bullets: string[];
}) {
  return (
    <div className="w-full rounded-2xl border border-neutral-200 bg-white p-6 md:p-7 card-glow card-hover transition-transform md:max-w-[640px]">
      <div className="mb-4 flex items-center justify-between">
        <span className="chip-grad inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium text-neutral-700">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-violet-400 text-white text-sm shadow-[0_6px_18px_rgba(109,40,217,.35)]">
            {icon}
          </span>
          {label}
        </span>
        <span className="text-[11px] text-neutral-400">Updated daily</span>
      </div>

      <h3 className="mb-2 text-xl font-semibold md:text-2xl headline-grad">{title}</h3>
      <div className="inner-sep mb-4 rounded" />

      <ul className="space-y-3 text-sm text-neutral-700 md:text-base">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <Image src="/tick.svg" alt="" width={18} height={18} className="mt-0.5 opacity-80" />
            <span className="leading-snug">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrowIcon() {
  // uses public/arrowdown.webp
  return (
    <div className="relative">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-white/90 backdrop-blur text-neutral-900 shadow-[0_10px_30px_rgba(0,0,0,.08),0_0_0_6px_rgba(109,40,217,.12)]">
        <Image src="/arrowdown.webp" alt="scroll arrow" width={20} height={20} draggable={false} />
      </div>
    </div>
  );
}

/* ================= utils ================= */
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
