'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Figtree, JetBrains_Mono } from 'next/font/google';
import {
  AGG, COLUMN_IMAGES, FAQS, MONTH_ABBR, PAIRS, STEPS,
  TELEGRAM_SUPPORT, barGeom, fmtPct,
} from '@/lib/trackRecord';
import { CountUp, Reveal } from '@/lib/v2motion';

const display = Figtree({ subsets: ['latin'], weight: ['300', '400', '500'], display: 'swap', variable: '--c-display' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], display: 'swap', variable: '--c-mono' });

const NAV = [['Record', '#record'], ['Process', '#process'], ['Signal', '#signal'], ['Reviews', '#reviews'], ['Pricing', '#pricing']];
const NEG_ZONE = 22;

// Every CTA hands off straight to the Telegram bot — the site sells nothing itself.
const TELEGRAM_BOT = 'https://t.me/rangefx_bot?start=website';

export default function VariantC() {
  return (
    <main className={`vc ${display.variable} ${mono.variable}`}>
      <Tokens />
      <Header />
      <Hero />
      <ScaleSection />
      <ProcessSection />
      <SignalSection />
      <ReviewsSection />
      <PricingSection />
      <Footer />
    </main>
  );
}

function Tokens() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
.vc{
  --bg:#F5F5F2;
  --surface:#FCFCFB;
  --ink:#1B1D1C;
  --ink-2:#3E4441;
  --muted:#6E756F;
  --muted-dim:#9AA09A;
  --line:#E4E4DE;
  --line-soft:#ECECE6;
  --sage:#4B7A62;
  --clay:#B45C4E;
  --accent:#1B1D1C;

  --f-display:var(--c-display),system-ui,sans-serif;
  --f-mono:var(--c-mono),ui-monospace,monospace;

  --gut:clamp(22px,6vw,64px);
  --maxw:1080px;

  background:var(--bg);color:var(--ink);
  font-family:var(--f-display);font-weight:400;font-size:17px;line-height:1.7;
  -webkit-font-smoothing:antialiased;min-height:100vh;overflow-x:hidden;
}
.vc ::selection{background:var(--ink);color:var(--bg);}
.vc :focus-visible{outline:2px solid var(--ink);outline-offset:4px;border-radius:2px;}
.vc .wrap{max-width:var(--maxw);margin:0 auto;padding-inline:var(--gut);}

.vc .num{font-family:var(--f-mono);font-variant-numeric:tabular-nums;letter-spacing:-0.03em;}
.vc .eyebrow{font-family:var(--f-mono);font-size:11px;font-weight:400;letter-spacing:0.24em;text-transform:uppercase;color:var(--muted);}
.vc .lede{color:var(--muted);font-size:clamp(17px,1.9vw,21px);line-height:1.65;font-weight:300;}

.vc .sec{padding-block:clamp(84px,13vw,180px);border-top:1px solid var(--line);}
.vc .sec-title{font-family:var(--f-display);font-weight:300;font-size:clamp(30px,5vw,54px);line-height:1.08;letter-spacing:-0.02em;}

.vc .btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;font-family:var(--f-display);font-size:15px;font-weight:500;padding:15px 30px;border-radius:999px;border:1px solid transparent;text-decoration:none;cursor:pointer;transition:background .2s,color .2s,border-color .2s,transform .1s;white-space:nowrap;}
.vc .btn:active{transform:translateY(1px);}
.vc .btn-primary{background:var(--ink);color:var(--bg);}
.vc .btn-primary:hover{background:#000;}
.vc .btn-ghost{background:transparent;color:var(--ink);border-color:var(--line);}
.vc .btn-ghost:hover{border-color:var(--muted);}
.vc .cta-note{margin-top:14px;font-size:13px;color:var(--muted-dim);font-weight:300;}

.vc .kpi-label{font-family:var(--f-mono);font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted-dim);}
.vc .kpi-value{font-family:var(--f-mono);font-variant-numeric:tabular-nums;font-weight:400;letter-spacing:-0.04em;line-height:1;}
.vc a{color:inherit;}
.vc strong{font-weight:500;}

@keyframes vc-bar{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@media (prefers-reduced-motion: reduce){ .vc .bar-fill{transform:none !important;animation:none !important;} }
` }} />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(245,245,242,0.8)', backdropFilter: 'blur(12px)' }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 74, gap: 18 }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
          <Image src="/mr-logo.webp" alt="" width={24} height={24} priority />
          <span className="num" style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Range Universe</span>
        </a>
        <nav className="vc-desknav" style={{ display: 'none', gap: 30 }}>
          {NAV.map(([l, h]) => <a key={h} href={h} className="vc-nav" style={{ fontSize: 14, color: 'var(--muted)', textDecoration: 'none', fontWeight: 300 }}>{l}</a>)}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href={TELEGRAM_BOT} target="_blank" rel="noopener noreferrer" className="btn btn-primary vc-hide-sm" style={{ padding: '11px 22px', fontSize: 14 }}>Join the room</a>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open} className="vc-burger"
            style={{ display: 'grid', placeItems: 'center', height: 40, width: 40, borderRadius: 999, border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 8h16M4 16h16'} /></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="vc-mobnav" style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
          <div className="wrap" style={{ paddingBlock: 8, display: 'grid' }}>
            {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} style={{ padding: '15px 0', fontSize: 17, fontWeight: 300, textDecoration: 'none', borderTop: '1px solid var(--line-soft)' }}>{l}</a>)}
            <a href={TELEGRAM_BOT} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn btn-primary" style={{ marginTop: 14, marginBottom: 6 }}>Join the room</a>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        .vc .vc-nav:hover{color:var(--ink);}
        @media(min-width:900px){ .vc .vc-desknav{display:flex !important;} .vc .vc-burger,.vc .vc-mobnav{display:none !important;} }
        @media(max-width:560px){ .vc .vc-hide-sm{display:none !important;} }
      ` }} />
    </header>
  );
}

/* HERO — the record as a large, calm centerpiece */
function Hero() {
  const { first, months, gain12, totalTrades, avgWin } = AGG;
  return (
    <section id="top" style={{ paddingTop: 'clamp(48px,8vw,104px)', paddingBottom: 'clamp(48px,8vw,96px)' }}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Range Universe — signals &amp; education</p>
          <h1 className="sec-title" style={{ marginTop: 26, fontSize: 'clamp(36px,6.4vw,74px)', maxWidth: '15ch' }}>
            {months} months of signals, every month on the record.
          </h1>
          <p className="lede" style={{ marginTop: 28, maxWidth: '52ch' }}>
            Copy the exact entries, stops, and targets we trade. Every month since {MONTH_ABBR[first.month]} {first.year} is shown below — the losing ones included.
          </p>
        </Reveal>

        {/* the calm centerpiece */}
        <Reveal delay={0.1} style={{ marginTop: 'clamp(48px,7vw,88px)' }}>
          <div className="vc-hero-figure">
            <div>
              <div className="kpi-label">Trailing 12-month return</div>
              <div className="num" style={{ marginTop: 14, fontSize: 'clamp(64px,13vw,150px)', fontWeight: 400, color: 'var(--sage)', lineHeight: 0.9 }}>
                <CountUp to={gain12} decimals={1} prefix="+" suffix="%" duration={1800} />
              </div>
              <p style={{ marginTop: 20, maxWidth: '34ch', fontSize: 15, color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6 }}>
                Across {months} documented months — {AGG.negatives} of them negative, kept on the record in full.
              </p>
            </div>
            <RecordStrip />
          </div>
        </Reveal>

        <Reveal delay={0.16} style={{ marginTop: 'clamp(40px,6vw,72px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px 40px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <a href={TELEGRAM_BOT} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Join the room — €79/mo</a>
              <div className="cta-note">Cancel anytime · about 15 minutes a day</div>
            </div>
            <div style={{ display: 'flex', gap: 'clamp(24px,4vw,48px)' }}>
              {[
                { v: <CountUp to={avgWin} suffix="%" />, l: 'Avg win rate' },
                { v: <CountUp to={totalTrades} separators />, l: 'Trades logged' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="kpi-value" style={{ fontSize: 'clamp(26px,3.6vw,38px)', color: 'var(--ink)' }}>{s.v}</div>
                  <div className="kpi-label" style={{ marginTop: 10 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .vc .vc-hero-figure{display:grid;gap:44px;align-items:end;}
        @media(min-width:860px){ .vc .vc-hero-figure{grid-template-columns:.85fr 1.15fr;gap:64px;} }
      ` }} />
    </section>
  );
}

// thin, airy bar strip — no chrome, just the shape of the record
function RecordStrip() {
  const { ordered, first, last, best, worst } = AGG;
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ position: 'relative', height: 128 }}>
        <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, bottom: `${NEG_ZONE}%`, height: 1, background: 'var(--line)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'stretch', gap: 3 }}>
          {ordered.map((m, i) => {
            const { neg, posH, negH } = barGeom(m, NEG_ZONE);
            return (
              <div key={`${m.year}-${m.month}`} style={{ position: 'relative', flex: 1, minWidth: 0 }} title={`${m.month} ${m.year}: ${fmtPct(m.gainPct)}`}>
                {!neg && <div className="bar-fill" style={{ position: 'absolute', left: 0, right: 0, bottom: `${NEG_ZONE}%`, height: `${posH}%`, background: 'var(--sage)', opacity: 0.9, borderRadius: '3px 3px 0 0', transformOrigin: 'bottom', animation: 'vc-bar .6s cubic-bezier(.2,.7,.2,1) both', animationDelay: `${0.25 + i * 0.022}s` }} />}
                {neg && <div className="bar-fill" style={{ position: 'absolute', left: 0, right: 0, top: `${100 - NEG_ZONE}%`, height: `${negH}%`, background: 'var(--clay)', borderRadius: '0 0 3px 3px', transformOrigin: 'top', animation: 'vc-bar .6s cubic-bezier(.2,.7,.2,1) both', animationDelay: `${0.25 + i * 0.022}s` }} />}
              </div>
            );
          })}
        </div>
      </div>
      <div className="num" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontSize: 11, color: 'var(--muted-dim)' }}>
        <span>{MONTH_ABBR[first.month]} {first.year}</span>
        <span>{MONTH_ABBR[last.month]} {last.year}</span>
      </div>
      <p style={{ marginTop: 18, fontSize: 13.5, color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6 }}>
        Best <span className="num" style={{ color: 'var(--sage)' }}>{fmtPct(best.gainPct)}</span>, worst <span className="num" style={{ color: 'var(--clay)' }}>{fmtPct(worst.gainPct)}</span>. One month in the record is a loss — shown, not removed.
      </p>
    </figure>
  );
}

/* SCALE / SOCIAL PROOF */
function ScaleSection() {
  return (
    <section className="sec">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <Reveal>
          <p className="eyebrow">The people behind the number</p>
          <h2 className="sec-title" style={{ marginTop: 22, maxWidth: '18ch', marginInline: 'auto' }}>
            Members have tracked over <span style={{ color: 'var(--sage)' }}>€<CountUp to={3.2} decimals={1} />M</span> in profit.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
            {[1, 2, 3, 4].map((i) => <Image key={i} src={`/avatars/user${i}.webp`} alt="" width={44} height={44} loading="lazy" style={{ borderRadius: '50%', border: '3px solid var(--bg)', marginLeft: i === 1 ? 0 : -12 }} />)}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(32px,6vw,80px)', marginTop: 44 }}>
            {[
              { v: <CountUp to={10000} suffix="+" separators />, l: 'Students enrolled' },
              { v: <CountUp to={5000} suffix="+" separators />, l: 'Active members' },
              { v: <CountUp to={AGG.months} />, l: 'Months documented' },
            ].map((s, i) => (
              <div key={i}>
                <div className="kpi-value" style={{ fontSize: 'clamp(30px,4.4vw,46px)', color: 'var(--ink)' }}>{s.v}</div>
                <div className="kpi-label" style={{ marginTop: 12 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 40, marginInline: 'auto', maxWidth: '46ch', fontSize: 14, color: 'var(--muted-dim)', fontWeight: 300 }}>
            Screenshots shared by members. Individual results vary and are not typical or guaranteed.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* PROCESS */
function ProcessSection() {
  return (
    <section id="process" className="sec">
      <div className="wrap">
        <Reveal><p className="eyebrow">How it works</p><h2 className="sec-title" style={{ marginTop: 20, maxWidth: '16ch' }}>Three steps. Nothing to interpret.</h2></Reveal>
        <div style={{ marginTop: 'clamp(44px,6vw,72px)', display: 'grid', gap: 0 }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="vc-step" style={{ display: 'grid', gap: 'clamp(8px,3vw,40px)', padding: 'clamp(28px,4vw,44px) 0', borderTop: i === 0 ? '1px solid var(--line)' : '1px solid var(--line-soft)', alignItems: 'baseline' }}>
                <span className="num" style={{ fontSize: 15, color: 'var(--muted-dim)' }}>{s.n}</span>
                <h3 style={{ fontSize: 'clamp(24px,3.4vw,34px)', fontWeight: 300, letterSpacing: '-0.02em' }}>{s.title}</h3>
                <p style={{ fontSize: 16, color: 'var(--muted)', fontWeight: 300, lineHeight: 1.65, maxWidth: '44ch' }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media(min-width:820px){ .vc .vc-step{grid-template-columns:60px 1fr 1.1fr;} }
      ` }} />
    </section>
  );
}

/* SIGNAL FORMAT */
function SignalSection() {
  const rows: [string, string, string][] = [
    ['Entry', '1.08420', 'var(--ink)'],
    ['Stop-loss', '1.08080', 'var(--clay)'],
    ['Take-profit 1', '1.08790', 'var(--sage)'],
    ['Take-profit 2', '1.09150', 'var(--sage)'],
    ['Take-profit 3', '1.09640', 'var(--sage)'],
  ];
  return (
    <section id="signal" className="sec">
      <div className="wrap">
        <div className="vc-signal-grid">
          <Reveal>
            <p className="eyebrow">The product</p>
            <h2 className="sec-title" style={{ marginTop: 20, maxWidth: '14ch' }}>This is exactly what you copy.</h2>
            <p className="lede" style={{ marginTop: 26, maxWidth: '42ch' }}>
              One plain format — a pair, a direction, and the exact levels. No commentary to interpret, nothing to guess.
            </p>
            <p className="num" style={{ marginTop: 28, fontSize: 13, color: 'var(--muted)' }}>Pairs traded: {PAIRS.join('  ·  ')}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <figure style={{ margin: 0, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden' }}>
              <figcaption style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--line-soft)' }}>
                <span className="num" style={{ fontSize: 11.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>Signal format</span>
                <span className="num" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted-dim)', border: '1px solid var(--line)', borderRadius: 999, padding: '4px 10px' }}>Example</span>
              </figcaption>
              <div style={{ padding: 'clamp(20px,3vw,28px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="num" style={{ fontSize: 22 }}>EUR/USD</span>
                  <span className="num" style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--sage)', border: '1px solid var(--sage)', borderRadius: 999, padding: '4px 11px' }}>BUY · LONG</span>
                </div>
                <div style={{ marginTop: 22, display: 'grid', gap: 1, background: 'var(--line-soft)', border: '1px solid var(--line-soft)', borderRadius: 10, overflow: 'hidden' }}>
                  {rows.map(([label, value, color]) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--surface)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--muted)', fontWeight: 300 }}><span style={{ height: 6, width: 6, borderRadius: '50%', background: color }} />{label}</span>
                      <span className="num" style={{ fontSize: 16, color }}>{value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="num" style={{ fontSize: 13, color: 'var(--muted)' }}>Risk-reward up to <span style={{ color: 'var(--ink)' }}>3.6R</span></span>
                </div>
                <p className="num" style={{ margin: '20px 0 0', fontSize: 11, color: 'var(--muted-dim)', lineHeight: 1.5, fontWeight: 400 }}>Illustrative example of the signal format. Not a live or past trade.</p>
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .vc .vc-signal-grid{display:grid;gap:48px;align-items:center;}
        @media(min-width:900px){ .vc .vc-signal-grid{grid-template-columns:1fr 1fr;gap:72px;} }
      ` }} />
    </section>
  );
}

/* TESTIMONIALS */
function ReviewsSection() {
  return (
    <section id="reviews" className="sec">
      <div className="wrap">
        <Reveal><p className="eyebrow">Member results</p><h2 className="sec-title" style={{ marginTop: 20, maxWidth: '20ch' }}>Screenshots from traders following the same signals.</h2></Reveal>
        <Reveal delay={0.08}>
          <div style={{ position: 'relative', height: 460, overflow: 'hidden', marginTop: 'clamp(36px,5vw,56px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, height: '100%' }}>
              <MarqueeCol dir="up" images={COLUMN_IMAGES[0]} />
              <MarqueeCol dir="down" images={COLUMN_IMAGES[1]} />
              <MarqueeCol dir="up" images={COLUMN_IMAGES[2]} />
            </div>
            <div aria-hidden style={{ pointerEvents: 'none', position: 'absolute', insetInline: 0, top: 0, height: 90, background: 'linear-gradient(var(--bg),transparent)' }} />
            <div aria-hidden style={{ pointerEvents: 'none', position: 'absolute', insetInline: 0, bottom: 0, height: 90, background: 'linear-gradient(0deg,var(--bg),transparent)' }} />
          </div>
          <p style={{ marginTop: 24, fontSize: 13.5, color: 'var(--muted-dim)', fontWeight: 300 }}>Results shared by individual members. Not typical, not guaranteed, and dependent on each person&apos;s execution.</p>
        </Reveal>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .vc .vc-col{display:flex;flex-direction:column;gap:14px;}
        .vc .vc-up{animation:vc-mq-up 46s linear infinite;} .vc .vc-down{animation:vc-mq-down 46s linear infinite;}
        @keyframes vc-mq-up{0%{transform:translateY(0)}100%{transform:translateY(-50%)}}
        @keyframes vc-mq-down{0%{transform:translateY(-50%)}100%{transform:translateY(0)}}
        @media (prefers-reduced-motion: reduce){ .vc .vc-up,.vc .vc-down{animation:none;} }
      ` }} />
    </section>
  );
}

function MarqueeCol({ dir, images }: { dir: 'up' | 'down'; images: string[] }) {
  const loop = [...images, ...images];
  return (
    <div style={{ overflow: 'hidden' }}>
      <div className={`vc-col ${dir === 'up' ? 'vc-up' : 'vc-down'}`}>
        {loop.map((src, i) => (
          <div key={`${src}-${i}`} style={{ overflow: 'hidden', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--line)' }}>
            <Image src={src} alt="Member result" width={400} height={260} loading="lazy" style={{ height: 'auto', width: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* PRICING + FAQ */
function PricingSection() {
  return (
    <section id="pricing" className="sec">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <Reveal>
          <p className="eyebrow">Membership</p>
          <div className="num" style={{ marginTop: 24, fontSize: 'clamp(56px,11vw,120px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.9 }}>€79</div>
          <p className="lede" style={{ marginTop: 20 }}>per month · cancel anytime</p>
          <div style={{ marginTop: 34 }}>
            <a href={TELEGRAM_BOT} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '17px 40px', fontSize: 16 }}>Join the room</a>
            <div className="cta-note">Daily signals, live management, weekly Q&amp;A, and the full trade archive.</div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div style={{ marginTop: 'clamp(60px,9vw,110px)', textAlign: 'left', maxWidth: 760, marginInline: 'auto' }}>
            <h3 className="num" style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>Common questions</h3>
            <div style={{ marginTop: 8 }}>
              {FAQS.map((f, i) => <Faq key={f.q} q={f.q} a={f.a} first={i === 0} />)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq({ q, a, first }: { q: string; a: string; first: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: first ? 'none' : '1px solid var(--line-soft)' }}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
        style={{ display: 'flex', width: '100%', alignItems: 'center', gap: 16, padding: '22px 0', background: 'transparent', border: 0, textAlign: 'left', color: 'var(--ink)', cursor: 'pointer' }}>
        <span style={{ flex: 1, fontSize: 'clamp(17px,2vw,20px)', fontWeight: 300 }}>{q}</span>
        <span aria-hidden style={{ color: 'var(--muted)', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .2s' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 5v14M5 12h14" /></svg></span>
      </button>
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows .28s ease' }}>
        <div style={{ overflow: 'hidden' }}><p style={{ margin: 0, padding: '0 0 24px', fontSize: 16, lineHeight: 1.7, color: 'var(--muted)', fontWeight: 300, maxWidth: '58ch' }}>{a}</p></div>
      </div>
    </div>
  );
}

/* FOOTER + DISCLAIMER */
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)' }}>
      <div className="wrap" style={{ paddingBlock: 'clamp(48px,7vw,80px)' }}>
        <p style={{ margin: '0 auto', maxWidth: '64ch', textAlign: 'center', fontSize: 14, lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300 }}>
          Everything shared by Range Universe is for educational purposes only. The monthly record above is a log of past results, including losses; past performance does not guarantee future results, and outcomes depend on each member&apos;s own execution and risk control. Never risk funds you cannot afford to lose.
        </p>
        <div style={{ marginTop: 44, paddingTop: 28, borderTop: '1px solid var(--line-soft)', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="num" style={{ fontSize: 11, color: 'var(--muted-dim)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Range Universe</span>
          <div style={{ display: 'flex', gap: 18, fontSize: 14, color: 'var(--muted)', fontWeight: 300 }}>
            <a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href={TELEGRAM_SUPPORT} target="_blank" rel="noopener noreferrer">Support</a>
          </div>
          <span style={{ fontSize: 13, color: 'var(--muted-dim)', fontWeight: 300 }}>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
