/* Terms & Conditions — Range Compound FZ-LLC
   NOTE: This is general information, not legal advice. */
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms & Conditions for Range Compound FZ-LLC — use of the site, membership, risk disclosure, and legal.",
};

const UPDATED = "22 Jul 2026";

export default function TermsPage() {
  return (
    <main
      style={{
        background: "var(--bg)",
        color: "var(--ink-2)",
        minHeight: "100vh",
        paddingTop: "clamp(96px, 12vw, 160px)",
        paddingBottom: "clamp(88px, 11vw, 144px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          marginInline: "auto",
          paddingInline: "var(--gut)",
        }}
      >
        {/* Header */}
        <header>
          <p className="eyebrow" style={{ marginTop: 22 }}>
            Legal
          </p>
          <h1 className="title" style={{ marginTop: 14 }}>
            Terms &amp; Conditions
          </h1>
          <p
            className="num"
            style={{ marginTop: 18, fontSize: 12, color: "var(--muted)" }}
          >
            Last updated: {UPDATED}
          </p>
        </header>

        <Section title="Agreement Between User and Range Compound">
          <P>
            Range Compound FZ-LLC (<B>Range Compound</B>, <B>we</B>, <B>us</B>,
            or <B>our</B>) publishes rangecompound.com (the <B>Site</B>) and
            operates a private, invitation-based educational membership (the{" "}
            <B>Membership</B>). By accessing or using the Site, you agree to
            these Terms &amp; Conditions (the <B>Terms</B>).
          </P>
          <P>
            If you do not agree, do not use the Site. We may update these Terms
            from time to time; continued use constitutes acceptance of the
            version published here.
          </P>
        </Section>

        <Section title="Company and Contact">
          <UL>
            <LI>
              <B>Company:</B> Range Compound FZ-LLC
            </LI>
            <LI>
              <B>Address:</B> FDCW0749, Compass Building, Al Shohada Road, Al
              Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates
            </LI>
            <LI>
              <B>Email:</B>{" "}
              <A href="mailto:rangeuniversellc@gmail.com">
                rangeuniversellc@gmail.com
              </A>
            </LI>
          </UL>
        </Section>

        <Section title="What This Site Is">
          <P>
            The Site is informational only. It does not host accounts, logins,
            or checkout, and it does not take payments. Nothing on the Site is
            an offer to buy or sell any financial instrument, and nothing on it
            constitutes personal investment advice or portfolio management.
          </P>
        </Section>

        <Section title="Eligibility">
          <UL>
            <LI>
              You must be able to form a binding contract in your jurisdiction.
              If you are under 18, use the Site only with the consent of a
              parent or guardian.
            </LI>
            <LI>
              You are responsible for ensuring that your use of the Site and of
              the Membership is lawful where you live.
            </LI>
          </UL>
        </Section>

        <Section title="Membership">
          <P>
            The Membership is arranged and administered entirely off-site
            through Telegram. Admission is at our discretion and may be limited
            or closed at any time.
          </P>
          <P>
            Pricing, term, renewal, cancellation, and refunds are governed by
            the terms presented to you during that Telegram-based process and
            apply to that arrangement. None of it is transacted on the Site.
            Applicable <B>VAT</B> or other taxes are added where required by
            law. Questions about an existing Membership should be raised through
            the same Telegram channel, or by email to{" "}
            <A href="mailto:rangeuniversellc@gmail.com">
              rangeuniversellc@gmail.com
            </A>
            .
          </P>
        </Section>

        <Section title="Acceptable Use">
          <UL>
            <LI>
              Access to the Membership is personal and non-transferable. You may
              not share, resell, or sublicense it.
            </LI>
            <LI>
              <B>Strictly prohibited:</B> publishing, reposting, forwarding,
              leaking, scraping, or otherwise distributing any analysis,
              material, or tooling made available to members. Detected leaks may
              result in immediate and permanent removal from the Membership.
            </LI>
            <LI>
              No unlawful, harmful, or abusive activity, and no attempts to
              bypass security measures, rate limits, or access controls on the
              Site.
            </LI>
          </UL>
        </Section>

        <Section title="No Financial Advice and Risk Disclosure">
          <P>
            All content published on the Site and shared within the Membership
            is for <B>educational and informational purposes only</B>. It is not
            financial, investment, legal, or tax advice, and it is not a
            recommendation or solicitation to buy or sell any instrument.
          </P>
          <P>
            <B>
              Trading involves substantial risk of loss and is not suitable for
              every person.
            </B>{" "}
            You can lose some or all of your capital. Leverage increases both
            gains and losses. Never risk money you cannot afford to lose.
          </P>
          <P>
            <B>Past performance does not guarantee future results.</B> Any
            figure, example, or historical result presented is illustrative and
            should not be read as a projection of what you will achieve.
          </P>
          <P>
            You are solely responsible for your own decisions, your own risk
            management, and the outcomes that follow. If you need advice suited
            to your circumstances, consult a licensed professional in your
            jurisdiction.
          </P>
        </Section>

        <Section title="Intellectual Property">
          <P>
            The Site and its content are owned by or licensed to Range Compound
            and protected by law. We grant you a limited, revocable,
            non-exclusive, non-transferable licence to access it for your
            personal, educational use. Any copying, distribution, or derivative
            use outside that licence is prohibited.
          </P>
        </Section>

        <Section title="Availability and Modifications">
          <P>
            We may change, suspend, or discontinue any part of the Site or the
            Membership at any time. We are not liable for downtime, delays, or
            loss of access.
          </P>
        </Section>

        <Section title="Third-Party Platforms">
          <P>
            The Site links to Telegram and may link to other third-party
            platforms. Those services are operated independently of us and are
            governed by their own terms and policies. We are not responsible for
            their availability, conduct, or content.
          </P>
        </Section>

        <Section title="Disclaimers and Limitation of Liability">
          <P>
            The Site and the Membership are provided on an <B>as is</B> and{" "}
            <B>as available</B> basis, without warranties of any kind. To the
            fullest extent permitted by law, Range Compound disclaims all
            warranties and will not be liable for any trading loss, or for any
            indirect, incidental, consequential, special, or punitive damages,
            or for lost profits or revenues.
          </P>
        </Section>

        <Section title="Indemnification">
          <P>
            You agree to indemnify and hold harmless Range Compound and its
            officers, directors, employees, and agents from any claims, damages,
            liabilities, and expenses arising out of your use of the Site or the
            Membership, or your breach of these Terms.
          </P>
        </Section>

        <Section title="Governing Law and Jurisdiction">
          <P>
            These Terms are governed by the laws of the United Arab Emirates.
            You agree to the exclusive jurisdiction of the{" "}
            <B>Courts of Dubai</B> for any dispute, and waive any objection to
            venue or forum non conveniens.
          </P>
        </Section>

        <Section title="Miscellaneous">
          <UL>
            <LI>
              These Terms constitute the entire agreement regarding your use of
              the Site.
            </LI>
            <LI>
              If any provision is held invalid, the remaining provisions remain
              in full force.
            </LI>
            <LI>
              We may assign our rights and obligations; you may not assign
              without our written consent.
            </LI>
          </UL>
        </Section>

        <Section title="Contact">
          <P>
            Questions about these Terms? Email{" "}
            <A href="mailto:rangeuniversellc@gmail.com">
              rangeuniversellc@gmail.com
            </A>
            .
          </P>
        </Section>

        <div
          style={{
            marginTop: 72,
            paddingTop: 32,
            borderTop: "1px solid var(--line)",
          }}
        >
          <Link className="btn btn-ghost" href="/">
            Return to Range Compound
          </Link>
        </div>
      </div>
    </main>
  );
}

/* ---------- typographic helpers (same look as Privacy) ---------- */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        marginTop: 56,
        paddingTop: 32,
        borderTop: "1px solid var(--line)",
      }}
    >
      <h2 className="title-sm">{title}</h2>
      <div style={{ marginTop: 20 }}>{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        color: "var(--ink-2)",
        fontSize: 16,
        lineHeight: 1.75,
        maxWidth: "68ch",
        marginTop: 0,
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul
      style={{
        listStyle: "none",
        margin: "0 0 16px",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        maxWidth: "68ch",
      }}
    >
      {children}
    </ul>
  );
}

function LI({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        display: "flex",
        gap: 12,
        color: "var(--ink-2)",
        fontSize: 16,
        lineHeight: 1.75,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flex: "0 0 auto",
          width: 4,
          height: 4,
          marginTop: 12,
          background: "var(--gold)",
        }}
      />
      <span>{children}</span>
    </li>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return (
    <b style={{ color: "var(--ink)", fontWeight: 500 }}>{children}</b>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        color: "var(--gold)",
        textDecoration: "underline",
        textUnderlineOffset: 3,
      }}
    >
      {children}
    </a>
  );
}
