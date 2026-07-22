/* Privacy Policy — Range Compound FZ-LLC
   NOTE: This is general information, not legal advice. */
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Range Compound FZ-LLC collects, uses, and protects information on rangecompound.com.",
};

const UPDATED = "22 Jul 2026";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p
            className="num"
            style={{ marginTop: 18, fontSize: 12, color: "var(--muted)" }}
          >
            Last updated: {UPDATED}
          </p>
        </header>

        <LSection title="Who We Are">
          <P>
            Range Compound FZ-LLC (<B>Range Compound</B>, <B>we</B>, <B>us</B>)
            operates rangecompound.com (the <B>Site</B>). We are the controller
            for the limited personal information processed through the Site.
          </P>
          <UL>
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
        </LSection>

        <LSection title="What This Site Does">
          <P>
            The Site is a static informational website. It does not offer
            accounts, logins, or checkout. There is no database of members, no
            order system, and no payment processing on the Site. Membership of
            Range Compound is arranged and administered entirely off-site
            through Telegram.
          </P>
        </LSection>

        <LSection title="Information We Collect">
          <P>
            Data collection is limited to basic site analytics. In aggregate,
            this may include:
          </P>
          <UL>
            <LI>Pages viewed and the order in which they were viewed.</LI>
            <LI>Referring source, such as the link or search that led you here.</LI>
            <LI>
              Device and browser type, screen size, and approximate location
              derived from IP address.
            </LI>
            <LI>Date and time of the visit.</LI>
          </UL>
          <P>
            If you choose to contact us by email, we process whatever you put in
            that message so that we can respond to it.
          </P>
        </LSection>

        <LSection title="What We Do Not Collect">
          <UL>
            <LI>
              <B>No account data.</B> The Site has no registration, no
              usernames, and no profiles.
            </LI>
            <LI>
              <B>No credentials.</B> The Site does not handle passwords or
              logins of any kind.
            </LI>
            <LI>
              <B>No payment data.</B> No card numbers, bank details, or billing
              addresses are collected, stored, or processed by the Site.
            </LI>
            <LI>
              <B>No sale of data.</B> We do not sell personal information, and
              we do not share it with advertisers.
            </LI>
          </UL>
        </LSection>

        <LSection title="How We Use Information">
          <UL>
            <LI>Understand aggregate traffic and how the Site is used.</LI>
            <LI>Diagnose errors and improve performance and content.</LI>
            <LI>Protect the Site against abuse and misuse.</LI>
            <LI>Respond to enquiries you send us.</LI>
            <LI>Comply with legal obligations.</LI>
          </UL>
        </LSection>

        <LSection title="Cookies and Analytics">
          <P>
            The Site may use analytics cookies or similar technologies to
            measure aggregate usage. Because there are no accounts, we do not
            need authentication or session cookies. You can manage or block
            cookies through your browser settings; doing so does not prevent you
            from reading the Site.
          </P>
        </LSection>

        <LSection title="Legal Bases (EEA and UK)">
          <P>
            Where the GDPR or UK GDPR applies, we rely on our legitimate
            interests in operating, securing, and improving the Site; on your
            consent where consent is required for certain cookies; and on
            compliance with legal obligations.
          </P>
        </LSection>

        <LSection title="Service Providers">
          <P>
            We use a small number of providers to run the Site, principally a
            hosting provider and an analytics provider. They process data on our
            instructions and under contract. We may also disclose information
            where required by law, or to establish, exercise, or defend legal
            claims, and in connection with a merger, sale, or reorganisation of
            our business.
          </P>
        </LSection>

        <LSection title="Telegram and Other Third Parties">
          <P>
            Links from the Site may take you to Telegram or other third-party
            platforms. Those platforms are operated independently of us, and
            their own privacy policies and terms govern any information you
            provide there. This Policy covers the Site only.
          </P>
        </LSection>

        <LSection title="International Transfers">
          <P>
            The limited data described above may be processed outside your
            country. Where required, we rely on appropriate safeguards such as
            Standard Contractual Clauses.
          </P>
        </LSection>

        <LSection title="Data Retention">
          <P>
            Analytics data is retained in aggregate for as long as it remains
            useful for the purposes described above. Email correspondence is
            retained for as long as needed to handle the matter it relates to
            and to meet legal obligations.
          </P>
        </LSection>

        <LSection title="Your Rights">
          <P>
            Depending on where you live, you may have rights to access, correct,
            delete, restrict, or object to the processing of your personal
            information, and to data portability. To exercise those rights,
            email{" "}
            <A href="mailto:rangeuniversellc@gmail.com">
              rangeuniversellc@gmail.com
            </A>
            . We may ask you for information to verify your identity before we
            respond.
          </P>
        </LSection>

        <LSection title="Children">
          <P>
            The Site is not directed to children, and we do not knowingly
            collect personal information from anyone under the age of thirteen.
            If you believe a child has provided us with personal information,
            contact us and we will delete it.
          </P>
        </LSection>

        <LSection title="Security">
          <P>
            We apply reasonable technical and organisational measures to protect
            the limited information we process. No method of transmission or
            storage is completely secure, and we cannot guarantee absolute
            security.
          </P>
        </LSection>

        <LSection title="Changes to This Policy">
          <P>
            We may update this Privacy Policy from time to time. The revised
            version is posted here with a new date at the top of the page.
            Continued use of the Site after a change constitutes acceptance of
            the updated Policy.
          </P>
        </LSection>

        <LSection title="Contact">
          <P>
            Questions about privacy? Email{" "}
            <A href="mailto:rangeuniversellc@gmail.com">
              rangeuniversellc@gmail.com
            </A>
            .
          </P>
        </LSection>

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

/* ---------- typographic helpers (same look as Terms) ---------- */
function LSection({
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
