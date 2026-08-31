import Image from 'next/image';
import { BRAND, TELEGRAM_BOT } from '@/lib/brand';
import {
  FEATURED_QUOTE,
  FEATURES,
  HERO_POINTS,
  HERO_SUB,
  INSIDE,
  MEMBER_SHOTS,
  PRICE,
  STATS,
} from '@/lib/content';
import { RECORD } from '@/lib/record';
import { CountUp, Reveal } from '@/lib/motion';
import { Faq } from '@/components/Faq';
import { BackgroundVideo } from '@/components/BackgroundVideo';
import { FeatureVideo } from '@/components/FeatureVideo';
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
        <FeatureBlocks />
        <Skeptic />
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

// Placeholder footage while the real hero video is prepared. Only the file
// behind these two paths changes.
const HERO_MEDIA = { src: '/media/hero.mp4', poster: '/media/hero-poster.jpg' };

function Hero() {
  return (
    <section className="hero">
      <BackgroundVideo src={HERO_MEDIA.src} poster={HERO_MEDIA.poster} />
      <div className="hero-scrim" aria-hidden />

      <div className="wrap hero-stack">
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

        <Reveal delay={0.18}>
          <p className="hero-sub">{HERO_SUB}</p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="hero-cta">
            <CtaButton>Join Now</CtaButton>
          </div>
        </Reveal>
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
        <div className="split">
          <Reveal className="split-copy">
            {/* DRAFT COPY — pending Elias approval */}
            <p className="eyebrow eyebrow-lg">What is The Compound?</p>
            <h2 className="title-lg" style={{ marginTop: 22, maxWidth: '12ch' }}>
              A desk, not a <em>signals room</em>.
            </h2>
            <p className="body-copy body-lg" style={{ marginTop: 24 }}>
              One methodology, written down and applied the same way every session — risk decided
              before return, the record published whichever way it goes. Nothing drip-fed, nothing
              held back for an upsell.
            </p>
          </Reveal>

          <Reveal delay={0.12} dir="right" className="split-media">
            {/* Square 1:1 asset. */}
            <Image
              src="/graphics/section-02.png"
              alt=""
              width={1254}
              height={1254}
              className="split-graphic"
            />
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
            <p className="eyebrow eyebrow-center eyebrow-lg">Inside the desk</p>
            <h2 className="title-lg" style={{ marginTop: 24, maxWidth: '17ch', marginInline: 'auto' }}>
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
    <section id="proof" className="sec sec-banner">
      {/* Full-bleed graphic — sits directly on the section so it spans the
          viewport, above the copy. The 3:2 source is centre-cropped by the
          banner's 3:1 (16:9 on mobile) frame via object-fit: cover. */}
      <div className="banner-media">
        <Image
          src="/graphics/section-01.jpg"
          alt=""
          width={1600}
          height={1065}
          className="banner-graphic"
        />
      </div>

      <div className="wrap">
        <Reveal>
          <div className="banner-copy">
            {/* COPY — approved by Mohamed */}
            <h2 className="title" style={{ marginTop: 22 }}>
              Why waste years learning it <em>alone</em>?
            </h2>
            <p className="banner-line">
              The best trades don&rsquo;t come from a screen. They come from someone who&rsquo;s
              already sat through the years you&rsquo;re about to spend.
            </p>
            <p className="banner-line">
              Experience is rare, and most people either guard it or were never worth listening to
              in the first place.
            </p>
            <p className="banner-line">
              The Compound exists because of that. Direct calls in real time, from people
              who&rsquo;ve done this long enough to know what actually repeats and what actually
              works — and the methodology and system behind every trade, as it happens.
            </p>
            {/* One paragraph, two lines: the break is kept but the paragraph
                gap is not, so these close as a single block. Do not split into
                two <p> — that reintroduces the spacing. */}
            <p className="banner-line">
              The opportunities matter.
              <br />
              The people helping you find them matter even more.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * FEATURE BLOCKS — #system
 *
 * The System reads as a single centred column of copy; The Vault keeps the
 * two-column copy + framed media grid. Which one a block gets is decided by
 * whether it carries media at all, not by its position — see the Feature type
 * in src/lib/content.ts. The alternation index is still `i`, so The Vault
 * stays `feature-alt` (media left, copy right) exactly as before.
 * ------------------------------------------------------------------ */

function FeatureBlocks() {
  return (
    <section id="system" className="sec">
      <div className="glow" aria-hidden />
      <div className="wrap">
        {FEATURES.map((f, i) =>
          f.video && f.poster ? (
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
          ) : (
            <div className="feature-solo" key={f.eyebrow}>
              <Reveal>
                <div className="sec-head-center">
                  <p className="eyebrow eyebrow-center">{f.eyebrow}</p>
                  <h2 className="title-sm">
                    {f.title} <em>{f.accent}</em>.
                  </h2>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="feature-solo-body">
                  {f.body.map((para) => (
                    <p className="body-copy" key={para.slice(0, 24)}>
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          ),
        )}
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
