import Image from 'next/image';
import { BRAND, TELEGRAM_BOT } from '@/lib/brand';
import {
  FEATURED_QUOTE,
  FEATURES,
  HERO_POINTS,
  HERO_SUB,
  INSIDE,
  IS,
  IS_NOT,
  MEMBER_SHOTS,
  PRICE,
  STATS,
} from '@/lib/content';
import { RECORD } from '@/lib/record';
import { CountUp, Reveal } from '@/lib/motion';
import { Faq } from '@/components/Faq';
import { FeatureVideo } from '@/components/FeatureVideo';
import { HeroVideo } from '@/components/HeroVideo';
import { RecordHistory } from '@/components/RecordHistory';
import { SiteHeader } from '@/components/SiteHeader';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <WhatIsIt />
        <Inside />
        <Record />
        <Skeptic />
        <FeatureBlocks />
        <FeaturedQuote />
        <Pricing />
        <Voices />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * HERO
 * ------------------------------------------------------------------ */

// Derived from the master footage at public/homepage.mp4 — trimmed to the
// clean 15.5s before the burned-in title card appears, desaturated and warmed
// into the champagne palette, and cross-faded end-to-start so the loop has no
// visible seam. See the encode recipe in README.
//
// mp4 only: VP9 encoded larger than h264 on this material, and h264 is
// universally supported, so a second source would only cost bytes.
const HERO_SOURCES = [{ src: '/media/hero.mp4', type: 'video/mp4' }] as const;

function Hero() {
  return (
    <section className="hero">
      <HeroVideo poster="/media/hero-poster.jpg" sources={HERO_SOURCES} />
      <div className="hero-scrim" aria-hidden />

      <div className="hero-body">
        <div className="wrap">
          <Reveal>
            <h1 className="hero-title">
              A place for serious <em>long-term wealth builders</em>.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="hero-points">
              {HERO_POINTS.map((point) => (
                <li className="hero-point" key={point}>
                  <span className="hero-point-tick" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="hero-cta">
              <CtaButton>Join Now</CtaButton>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="hero-sub">{HERO_SUB}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * WHAT IS THE COMPOUND — #standard
 * ------------------------------------------------------------------ */

function WhatIsIt() {
  return (
    <section id="standard" className="sec">
      <div className="glow glow-left" aria-hidden />
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <p className="eyebrow">What is The Compound?</p>
            <h2 className="title">
              A desk, not a <em>signals room</em>.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="body-copy" style={{ marginTop: 28 }}>
            Most rooms in this industry are built to be joined, not to be stayed in. The Compound is
            built the other way round. It is worth being precise about the difference.
          </p>
        </Reveal>

        <div className="neg-grid">
          <Reveal className="neg-col" delay={0.14}>
            <div className="neg-col-head" style={{ color: 'var(--muted)' }}>
              <span>What it is not</span>
            </div>
            {IS_NOT.map((item) => (
              <div className="neg-item" key={item.head}>
                <h3>
                  <span className="neg-mark neg-mark-no" aria-hidden />
                  {item.head}
                </h3>
                <p>{item.body}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="neg-col" delay={0.22}>
            <div className="neg-col-head" style={{ color: 'var(--gold)' }}>
              <span>What it is</span>
            </div>
            {IS.map((item) => (
              <div className="neg-item" key={item.head}>
                <h3>
                  <span className="neg-mark neg-mark-yes" aria-hidden />
                  {item.head}
                </h3>
                <p>{item.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * INSIDE — #inside
 * ------------------------------------------------------------------ */

function Inside() {
  return (
    <section id="inside" className="sec">
      <div className="glow" aria-hidden />
      <div className="wrap">
        <Reveal>
          <div className="sec-head-center">
            <p className="eyebrow eyebrow-center">Inside the desk</p>
            <h2 className="title">
              What a membership actually <em>includes</em>.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p
            className="body-copy"
            style={{ marginTop: 24, marginInline: 'auto', textAlign: 'center', maxWidth: '54ch' }}
          >
            Five parts, run to the same rhythm every week. Nothing is drip-fed and nothing is held
            back for an upsell.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="ledger">
            <div className="ledger-rows">
              {INSIDE.map((item) => (
                <div className="ledger-cell" key={item.n}>
                  <span className="ledger-n">{item.n}.</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
            <div className="ledger-foot">
              One desk. One standard. <em>One</em> membership.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * TRACK RECORD — #record
 * Every figure is computed from src/lib/record.ts.
 * ------------------------------------------------------------------ */

function Record() {
  return (
    <section id="record" className="sec">
      <div className="glow" aria-hidden />
      <div className="wrap">
        <Reveal>
          <div className="sec-head-center">
            <p className="eyebrow eyebrow-center">Track record</p>
            <h2 className="title">
              Our track record, published in <em>full</em>.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p
            className="body-copy"
            style={{ marginTop: 24, marginInline: 'auto', textAlign: 'center', maxWidth: '56ch' }}
          >
            Range Compound has existed since October 2023, and we have kept a public record ever
            since.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="stat-grid stat-grid-6">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <div className={`stat-value${s.value === null ? ' stat-value-empty' : ''}`}>
                  <CountUp
                    to={s.value}
                    decimals={s.decimals}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    separators={s.separators}
                  />
                </div>
                <div className="stat-label">{s.label}</div>
                <p className="stat-note">{s.note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <p
            style={{
              marginTop: 30,
              marginInline: 'auto',
              maxWidth: '68ch',
              textAlign: 'center',
              fontSize: 15,
              lineHeight: 1.7,
              color: 'var(--ink-2)',
            }}
          >
            Of {RECORD.months} months,{' '}
            <span className="num gold">{RECORD.negatives}</span> closed negative — and stayed on the
            record.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div style={{ textAlign: 'center' }}>
            <RecordHistory />
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <p
            style={{
              marginTop: 22,
              marginInline: 'auto',
              maxWidth: '64ch',
              textAlign: 'center',
              fontSize: 13.5,
              lineHeight: 1.7,
              color: 'var(--muted)',
            }}
          >
            Past performance does not guarantee future results, and every outcome depends on the
            member&rsquo;s own execution and risk control.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * SCEPTICISM — #proof
 * ------------------------------------------------------------------ */

function Skeptic() {
  return (
    <section id="proof" className="sec">
      <div className="wrap">
        <div
          className="skeptic-grid"
          style={{
            display: 'grid',
            gap: 'clamp(36px, 5vw, 72px)',
            gridTemplateColumns: '1fr',
            alignItems: 'start',
          }}
        >
          <Reveal>
            <p className="eyebrow">On scepticism</p>
            <h2 className="title" style={{ marginTop: 24 }}>
              Everyone is selling something. <em>Most of it is noise.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="body-copy">
              You have almost certainly been pitched a room like this before, by someone with a
              screenshot and a countdown timer. Scepticism is the correct starting position, and we
              would rather you keep it than talk you out of it.
            </p>
            <p className="body-copy">
              So we are not going to argue. There is no urgency here, no fabricated scarcity, no
              claim about what a month is going to return. What we will do is show the methodology
              before you commit to it, publish the record whichever way it goes, and hold the losing
              weeks in the same place as the winning ones.
            </p>
            <p className="body-copy">
              If that reads as underwhelming next to the alternative, that is the point. Restraint is
              the product.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * FEATURE BLOCKS — #system
 * Alternating copy and framed media. See the note in src/lib/content.ts about
 * the placeholder footage.
 * ------------------------------------------------------------------ */

function FeatureBlocks() {
  return (
    <section id="system" className="sec">
      <div className="glow" aria-hidden />
      <div className="wrap">
        {FEATURES.map((f, i) => (
          <div className={`feature${i % 2 === 1 ? ' feature-alt' : ''}`} key={f.eyebrow}>
            <Reveal className="feature-copy" dir={i % 2 === 1 ? 'right' : 'left'}>
              <p className="eyebrow">{f.eyebrow}</p>
              <h2 className="title-sm">
                {f.title} <em>{f.accent}</em>.
              </h2>
              {f.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </Reveal>

            <Reveal delay={0.12} dir={i % 2 === 1 ? 'left' : 'right'}>
              <FeatureVideo src={f.video} poster={f.poster} />
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * FEATURED QUOTE — sits between the feature blocks and pricing.
 * ------------------------------------------------------------------ */

function FeaturedQuote() {
  return (
    <section className="sec sec-tight">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow eyebrow-center">{FEATURED_QUOTE.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <figure className="quote-feature">
            <span className="corner" aria-hidden />
            <span className="corner" aria-hidden />
            <span className="corner" aria-hidden />
            <span className="corner" aria-hidden />
            <blockquote>&ldquo;{FEATURED_QUOTE.quote}&rdquo;</blockquote>
            <figcaption>{FEATURED_QUOTE.attribution}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * PRICING — #pricing
 * ------------------------------------------------------------------ */

function Pricing() {
  return (
    <section id="pricing" className="sec">
      <div className="glow" aria-hidden />
      <div className="wrap">
        <Reveal>
          <div className="sec-head-center">
            <p className="eyebrow eyebrow-center">{PRICE.eyebrow}</p>
            <h2 className="title">
              Pay with <em>Card</em>.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="price-single">
            <div className="price-amount">{PRICE.amount}</div>
            <p className="price-cadence">{PRICE.cadence}</p>
            <p className="price-sub">{PRICE.sub}</p>
            <CtaButton variant="metal" size="lg">
              {PRICE.cta}
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * TESTIMONIALS — #voices
 * ------------------------------------------------------------------ */

function Voices() {
  return (
    <section id="voices" className="sec">
      <div className="wrap">
        <Reveal>
          <div className="sec-head-center">
            <h2 className="title">
              Members and their <em>experience</em>.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="shots">
            <div className="shots-grid">
              {MEMBER_SHOTS.map((col, i) => (
                <ShotColumn key={i} images={col} dir={i === 1 ? 'down' : 'up'} />
              ))}
            </div>
            <div className="shots-fade shots-fade-top" aria-hidden />
            <div className="shots-fade shots-fade-bottom" aria-hidden />
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <p
            style={{
              marginTop: 26,
              fontSize: 13.5,
              lineHeight: 1.7,
              color: 'var(--muted)',
              maxWidth: '70ch',
            }}
          >
            Messages shared by individual members. Results are not typical, not guaranteed, and
            depend on each person&rsquo;s own execution.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ShotColumn({ images, dir }: { images: ReadonlyArray<string>; dir: 'up' | 'down' }) {
  // Doubled so the translate(-50%) loop is seamless.
  const loop = [...images, ...images];
  return (
    <div style={{ overflow: 'hidden' }}>
      <div className={`shots-col ${dir === 'up' ? 'shots-up' : 'shots-down'}`}>
        {loop.map((src, i) => (
          <div className="shot" key={`${src}-${i}`}>
            <Image src={src} alt="Message from a member" width={420} height={280} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * FAQ — #answers
 * ------------------------------------------------------------------ */

function FaqSection() {
  return (
    <section id="answers" className="sec">
      <div className="glow" aria-hidden />
      <div className="wrap">
        <Reveal>
          <div className="sec-head-center">
            <p className="eyebrow eyebrow-center">Honest answers</p>
            <h2 className="title">
              The questions worth asking <em>before you join</em>.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Faq />
        </Reveal>

        <Reveal delay={0.16}>
          <div style={{ marginTop: 'clamp(44px, 5vw, 68px)', textAlign: 'center' }}>
            <CtaButton size="lg">Join Now</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * FOOTER
 * ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap" style={{ paddingBlock: 'clamp(56px, 8vw, 96px)' }}>
        <p className="footer-disclaimer">
          Everything published by {BRAND.name} is for educational purposes only and is not financial
          advice. Trading carries substantial risk of loss and is not suitable for everyone. Past
          performance does not guarantee future results, and outcomes depend on each member&rsquo;s
          own execution and risk control. Never risk capital you cannot afford to lose.
        </p>

        <div className="footer-bar">
          <span
            className="num"
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            {BRAND.name}
          </span>
          <nav className="footer-links" aria-label="Legal">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href={TELEGRAM_BOT} target="_blank" rel="noopener noreferrer">
              Contact
            </a>
          </nav>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>&copy; 2026</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ *
 * Shared CTA — every one of these goes to the Telegram bot.
 * ------------------------------------------------------------------ */

function CtaButton({
  children,
  variant = 'primary',
  size,
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'metal';
  size?: 'lg';
  className?: string;
}) {
  return (
    <a
      href={TELEGRAM_BOT}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-${variant}${size === 'lg' ? ' btn-lg' : ''} ${className}`.trim()}
    >
      {children}
      <span className="btn-arrow" aria-hidden>
        &rarr;
      </span>
    </a>
  );
}
