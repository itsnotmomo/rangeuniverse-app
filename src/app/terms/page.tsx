/* Terms & Conditions — Range Universe FZ-LLC
   NOTE: This is general information, not legal advice. */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Range Universe",
  description:
    "Terms & Conditions for Range Universe FZ-LLC — membership, use rules, IP, and legal.",
};

const UPDATED = "04 Oct 2025";

export default function TermsPage() {
  return (
    <main className="bg-white text-neutral-900">
      <div className="mx-auto w-full max-w-3xl px-6 py-14 md:py-16">
        {/* Title */}
        <header className="mb-10">
          <p className="text-[12px] tracking-[0.35em] text-neutral-400">LEGAL</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-neutral-500">Last updated: {UPDATED}</p>
        </header>

        <Section title="Agreement Between User and Range Universe">
          <P>
            Range Universe FZ-LLC (“<b>Range Universe</b>”, “<b>we</b>”, “<b>us</b>”, or “<b>our</b>”)
            provides a subscription-based online service that includes educational
            content, tools, and a private community (the “<b>Service</b>”). By
            accessing or using rangeuniverse.com and any related applications
            (collectively, the “<b>Site</b>”), you agree to these Terms &amp;
            Conditions (the “<b>Terms</b>”).
          </P>
          <P>
            If you do not agree, do not use the Site or Service. We may update
            these Terms from time to time; continued use constitutes acceptance.
          </P>
        </Section>

        <Section title="Company & Contact">
          <UL>
            <LI>
              <b>Company:</b> Range Universe FZ-LLC — Licensed Investment
              Consultancy Firm
            </LI>
            <LI>
              <b>Address:</b> FDCW0749, Compass Building, Al Shohada Road, Al
              Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates
            </LI>
            <LI>
              <b>Email:</b>{" "}
              <a
                className="underline underline-offset-2"
                href="mailto:rangeuniversellc@gmail.com"
              >
                rangeuniversellc@gmail.com
              </a>
            </LI>
          </UL>
        </Section>

        <Section title="Service Overview">
          <P>
            Membership gives you access to educational materials, market
            analysis, routines, and a private community. Signals, trade ideas,
            examples, and tools are educational in nature. We do not provide
            personal investment advice or portfolio management. Results are not
            guaranteed.
          </P>
        </Section>

        <Section title="Accounts & Eligibility">
          <UL>
            <LI>
              You must be able to form a binding contract. If you are under 18,
              use the Service only with a parent/guardian’s consent.
            </LI>
            <LI>
              You are responsible for maintaining the confidentiality of your
              account and for all activity under it.
            </LI>
          </UL>
        </Section>

        <Section title="Membership & Payments">
          <P>
            This Site is informational only. It does not take payments or manage
            paid accounts. To become a member you are directed to our Telegram
            bot, where any subscription is arranged.
          </P>
          <P>
            Pricing, billing, renewals, cancellation, and refunds are governed
            by the terms presented to you at the point of sign-up in the
            Telegram bot and apply to that transaction. Applicable <b>VAT</b> or
            other taxes are added where required by law. Questions? Email{" "}
            <a
              className="underline underline-offset-2"
              href="mailto:rangeuniversellc@gmail.com"
            >
              rangeuniversellc@gmail.com
            </a>
            .
          </P>
        </Section>

        <Section title="Acceptable Use & Prohibited Conduct">
          <UL>
            <LI>
              The Service is for your personal, non-transferable use only. You
              may not share, resell, or sublicense your access.
            </LI>
            <LI>
              <b>Strictly prohibited:</b> publishing, reposting, forwarding,
              leaking, scraping, or distributing any signals, analysis, content,
              or tools outside your personal account. Detected leaks may result
              in immediate termination of your membership.
            </LI>
            <LI>
              No unlawful, harmful, or abusive activity; no attempts to bypass
              security, rate limits, or access controls.
            </LI>
          </UL>
        </Section>

        <Section title="Educational Disclaimer">
          <P>
            All content is for educational purposes only and should not be
            considered financial advice, investment advice, or a solicitation to
            buy or sell any instrument. Trading involves risk. You are solely
            responsible for your decisions and outcomes.
          </P>
        </Section>

        <Section title="Intellectual Property">
          <P>
            The Site and its content are owned or licensed by Range Universe and
            protected by law. We grant you a limited, revocable, non-exclusive,
            non-transferable license to access the Service for your personal,
            educational use. Any copying, distribution, or derivative use
            outside this license is prohibited.
          </P>
        </Section>

        <Section title="Availability & Modifications">
          <P>
            We may change, suspend, or discontinue any part of the Service at
            any time. We are not liable for downtime, delays, or data loss.
          </P>
        </Section>

        <Section title="Disclaimers & Limitation of Liability">
          <P>
            The Service is provided “as is” and “as available” without warranties
            of any kind. To the fullest extent permitted by law, Range Universe
            disclaims all warranties and will not be liable for indirect,
            incidental, consequential, special, or punitive damages, or lost
            profits or revenues.
          </P>
        </Section>

        <Section title="Indemnification">
          <P>
            You agree to indemnify and hold harmless Range Universe, its
            officers, directors, employees, and agents from any claims, damages,
            liabilities, and expenses arising out of your use of the Service or
            violation of these Terms.
          </P>
        </Section>

        <Section title="Governing Law & Jurisdiction">
          <P>
            These Terms are governed by the laws of the United Arab Emirates.
            You agree to the exclusive jurisdiction of the <b>Courts of Dubai</b> for any dispute, and
            waive any objection to venue or forum non conveniens.
          </P>
        </Section>

        <Section title="Miscellaneous">
          <UL>
            <LI>These Terms constitute the entire agreement regarding the Service.</LI>
            <LI>
              If any provision is held invalid, the remaining provisions remain
              in full force.
            </LI>
            <LI>
              We may assign our rights/obligations; you may not assign without
              written consent.
            </LI>
          </UL>
        </Section>

        <Section title="Contact">
          <P>
            Questions about these Terms? Email{" "}
            <a
              className="underline underline-offset-2"
              href="mailto:rangeuniversellc@gmail.com"
            >
              rangeuniversellc@gmail.com
            </a>
            .
          </P>
        </Section>
      </div>
    </main>
  );
}

/* ---------- tiny typographic helpers (keep the style minimal & clean) ---------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>
      <div className="mt-3 space-y-4 leading-7 text-[15.5px] md:text-base">{children}</div>
    </section>
  );
}
function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={className}>{children}</p>;
}
function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-5">{children}</ul>;
}
function LI({ children }: { children: React.ReactNode }) {
  return <li className="mb-2">{children}</li>;
}
