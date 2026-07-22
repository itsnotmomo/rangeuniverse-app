import { BRAND, TELEGRAM_BOT } from '@/lib/brand';
import {
  INSIDE,
  IS,
  IS_NOT,
  PLACEHOLDER_STATS,
  RECORD_IS_PLACEHOLDER,
  STEPS,
  TESTIMONIALS,
  TIERS,
} from '@/lib/content';
import { CountUp, Reveal } from '@/lib/motion';
import { HeroVideo } from '@/components/HeroVideo';
import { SiteHeader } from '@/components/SiteHeader';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <Negation />
        <Inside />
        <Skeptic />
        <Record />
        <Process />
        <Voices />
        <Access />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * HERO
 * ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="hero">
      {/* REPLACE: hero video — public/media/hero.mp4 + hero.webm + hero-poster.jpg */}
      <HeroVideo poster="/media/hero-poster.jpg" />
      <div className="hero-scrim" aria-hidden />

      <div className="hero-body">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Private &middot; By invitation</p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="hero-title">
              Where discipline <em>compounds</em>.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="hero-lede">
              {BRAND.name} is a private execution desk. One methodology, risk managed on every
              position, and performance compounded week over week — for people who treat this as a
              business, not a lottery ticket.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="hero-cta">
              <CtaButton>Request access</CtaButton>
              <p className="hero-cta-note">
                Membership is intentionally limited. Access opens in small groups.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="hero-rail">
        <div className="wrap hero-rail-inner">
          <div className="hero-rail-list">
            <span className="hero-rail-item">Daily market outlook</span>
            <span className="hero-rail-item">Live execution</span>
            <span className="hero-rail-item">Risk before return</span>
          </div>
          <a className="scroll-cue" href="#standard">
            Scroll
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * NEGATION — #standard
 * ------------------------------------------------------------------ */

function Negation() {
  return (
    <section id="standard" className="sec">
      <div className="glow glow-left" aria-hidden />
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <p className="eyebrow">The standard</p>
            <h2 className="title">
              What this is, and what it <em>is not</em>.
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
 * SKEPTIC — #proof
 * ------------------------------------------------------------------ */

function Skeptic() {
  return (
    <section id="proof" className="sec">
      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gap: 'clamp(36px, 5vw, 72px)',
            gridTemplateColumns: '1fr',
            alignItems: 'start',
          }}
          className="skeptic-grid"
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
 * TRACK RECORD — #record
 * Figures are placeholders. See src/lib/content.ts.
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
              The record, published in <em>full</em>.
            </h2>
          </div>
        </Reveal>

        {RECORD_IS_PLACEHOLDER && (
          <Reveal delay={0.08}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
              <span className="placeholder-tag">Placeholder &middot; awaiting real data</span>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.12}>
          <div className="stat-grid">
            {PLACEHOLDER_STATS.map((s) => (
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
              marginTop: 28,
              marginInline: 'auto',
              maxWidth: '62ch',
              textAlign: 'center',
              fontSize: 13.5,
              lineHeight: 1.7,
              color: 'var(--muted)',
            }}
          >
            Figures are withheld until the verified record is published here in full — including the
            months that went against us. Past performance would not guarantee future results in any
            case, and every outcome depends on the member&rsquo;s own execution and risk control.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * PROCESS — #process
 * ------------------------------------------------------------------ */

function Process() {
  return (
    <section id="process" className="sec">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <p className="eyebrow">The process</p>
            <h2 className="title">
              Four steps, in <em>order</em>.
            </h2>
          </div>
        </Reveal>

        <div className="steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="step">
                <span className="step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * TESTIMONIALS — empty marked slots, no fabricated quotes.
 * ------------------------------------------------------------------ */

function Voices() {
  return (
    <section id="voices" className="sec">
      <div className="wrap">
        <Reveal>
          <div className="sec-head-center">
            <p className="eyebrow eyebrow-center">Members</p>
            <h2 className="title">
              In their <em>own words</em>.
            </h2>
          </div>
        </Reveal>

        <div className="quote-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.09}>
              {t.quote ? (
                <figure className="quote-card" style={{ margin: 0 }}>
                  <div>
                    <span className="quote-mark" aria-hidden>
                      &ldquo;
                    </span>
                    <blockquote className="quote-text" style={{ margin: 0 }}>
                      {t.quote}
                    </blockquote>
                  </div>
                  <figcaption className="quote-attr">
                    {t.attribution}
                    {t.meta ? ` · ${t.meta}` : ''}
                  </figcaption>
                </figure>
              ) : (
                <div className="quote-card quote-card-empty">
                  <span className="placeholder-tag">Testimonial slot {i + 1}</span>
                  <p style={{ fontSize: 13.5, color: 'var(--muted)', maxWidth: '30ch', margin: 0 }}>
                    Add a real member quote in{' '}
                    <span className="num" style={{ fontSize: 12.5, color: 'var(--ink-2)' }}>
                      src/lib/content.ts
                    </span>
                    . Nothing is written here on your behalf.
                  </p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * ACCESS — #access
 * ------------------------------------------------------------------ */

function Access() {
  return (
    <section id="access" className="sec">
      <div className="glow glow-left" aria-hidden />
      <div className="wrap">
        <div
          className="access-grid"
          style={{ display: 'grid', gap: 'clamp(40px, 5vw, 72px)', gridTemplateColumns: '1fr' }}
        >
          <Reveal>
            <p className="eyebrow">Access</p>
            <h2 className="title" style={{ marginTop: 24 }}>
              Deliberately <em>small</em>.
            </h2>
            <p className="body-copy" style={{ marginTop: 26 }}>
              A desk only works if the people in it are actually executing. Past a certain size the
              room stops being a room and becomes a feed, so intake is kept to small groups and
              closed between them.
            </p>
            <p className="body-copy">
              There is no waitlist theatre and no countdown. When a group is open, it is open; when
              it is not, the honest answer is to wait for the next one.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="frame" style={{ padding: 'clamp(30px, 4vw, 48px)' }}>
              <p className="eyebrow eyebrow-bare" style={{ color: 'var(--gold)' }}>
                Before you request
              </p>
              <ul style={{ margin: '26px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 18 }}>
                {[
                  'You are trading capital you can genuinely afford to risk.',
                  'You are willing to follow a defined risk limit, including on a good week.',
                  'You want a methodology you can eventually run without us.',
                  'You are here for years rather than for a fast month.',
                ].map((line) => (
                  <li key={line} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span
                      aria-hidden
                      style={{
                        flex: 'none',
                        marginTop: 9,
                        width: 5,
                        height: 5,
                        background: 'var(--gold)',
                      }}
                    />
                    <span style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--ink-2)' }}>
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
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
            <p className="eyebrow eyebrow-center">Membership</p>
            <h2 className="title">
              One room, three <em>horizons</em>.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p
            className="body-copy"
            style={{ marginTop: 24, marginInline: 'auto', textAlign: 'center', maxWidth: '50ch' }}
          >
            Every tier is the same access. The only difference is how long a horizon you are willing
            to commit to — which is, not coincidentally, the whole thesis.
          </p>
        </Reveal>

        <div className="price-grid">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={0.12 + i * 0.08}>
              <div className={`price-card${t.featured ? ' price-card-featured' : ''}`} style={{ height: '100%' }}>
                {t.featured && <span className="price-badge">Best value</span>}
                <span className="price-name">{t.name}</span>
                <div className="price-amount">{t.price}</div>
                <p className="price-cadence">{t.cadence}</p>
                {/* Always rendered so the blurb and CTA line up across tiers,
                    even on the one with no per-month equivalent. */}
                <p className="price-equiv">{t.equiv ?? ' '}</p>
                <p className="price-blurb">{t.blurb}</p>
                <CtaButton
                  variant={t.featured ? 'primary' : 'ghost'}
                  className="price-cta"
                >
                  Request access
                </CtaButton>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p
            style={{
              marginTop: 32,
              textAlign: 'center',
              fontSize: 13,
              color: 'var(--muted)',
            }}
          >
            Membership is arranged through the Telegram desk. Nothing is charged on this site.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * FINAL CTA
 * ------------------------------------------------------------------ */

function FinalCta() {
  return (
    <section className="sec">
      <div className="glow" aria-hidden />
      <div className="wrap" style={{ textAlign: 'center' }}>
        <Reveal>
          <p className="eyebrow eyebrow-center">The Compound</p>
          <h2
            className="title"
            style={{
              marginTop: 26,
              fontSize: 'clamp(36px, 6.4vw, 76px)',
              maxWidth: '16ch',
              marginInline: 'auto',
            }}
          >
            Discipline is the only edge that <em>keeps paying</em>.
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
            <CtaButton size="lg">Request access</CtaButton>
          </div>
          <p className="cta-note">Small groups. Opened deliberately.</p>
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
  variant?: 'primary' | 'ghost';
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
