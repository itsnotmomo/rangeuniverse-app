/* Privacy Policy — Range Universe FZ-LLC
   NOTE: This is general information, not legal advice. */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Range Universe",
  description:
    "How Range Universe FZ-LLC collects, uses, shares, and protects your information.",
};

const UPDATED = "04 Oct 2025";

export default function PrivacyPage() {
  return (
    <main className="bg-white text-neutral-900">
      <div className="mx-auto w-full max-w-3xl px-6 py-14 md:py-16">
        {/* Title */}
        <header className="mb-10">
          <p className="text-[12px] tracking-[0.35em] text-neutral-400">LEGAL</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-neutral-500">Last updated: {UPDATED}</p>
        </header>

        <LSection title="Who We Are">
          <P>
            Range Universe FZ-LLC (“<b>Range Universe</b>”, “<b>we</b>”, “<b>us</b>”)
            operates rangeuniverse.com and provides a subscription-based online
            Service. We are the data controller for personal information
            collected via the Site and Service.
          </P>
          <UL>
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
        </LSection>

        <LSection title="Information We Collect">
          <UL>
            <LI>
              <b>Account &amp; Contact</b>: name, email, username, membership
              status, and settings.
            </LI>
            <LI>
              <b>Billing</b>: transactions processed by our commerce partner{" "}
              <b>Whop</b> (and, as selected, PayPal or card gateways). We do not
              store full payment details on our servers.
            </LI>
            <LI>
              <b>Usage</b>: pages viewed, actions taken, device information, IP,
              general location, and similar analytics.
            </LI>
            <LI>
              <b>Communications</b>: support requests, feedback, and
              correspondence.
            </LI>
          </UL>
        </LSection>

        <LSection title="How We Use Information">
          <UL>
            <LI>Provide and maintain the Service and your membership.</LI>
            <LI>Process payments, invoices, and applicable taxes (e.g., VAT).</LI>
            <LI>Operate community/features; prevent fraud and abuse.</LI>
            <LI>
              Improve Site performance and content (analytics and diagnostics).
            </LI>
            <LI>Send transactional emails and updates about your account.</LI>
            <LI>Comply with legal obligations.</LI>
          </UL>
        </LSection>

        <LSection title="Cookies & Analytics">
          <P>
            We use essential cookies for authentication and session management,
            and analytics cookies/tools (e.g., Google Analytics) to understand
            aggregate usage. You can manage cookies through your browser
            settings. Blocking certain cookies may affect functionality.
          </P>
        </LSection>

        <LSection title="Legal Bases (EEA/UK)">
          <P>
            Where GDPR/UK GDPR applies, we rely on: performance of contract;
            legitimate interests (security, analytics, improvement); consent
            (for certain cookies/marketing where required); and legal
            obligations.
          </P>
        </LSection>

        <LSection title="Sharing & Processors">
          <P>We share personal data with:</P>
          <UL>
            <LI>
              <b>Service providers</b> (hosting, analytics, communications,
              payments, fraud prevention) under contracts limiting use to our
              instructions.
            </LI>
            <LI>
              <b>Legal/compliance</b> where required, or to protect rights,
              safety and integrity.
            </LI>
            <LI>
              <b>Business transfers</b> in connection with mergers, sales or
              reorganizations.
            </LI>
          </UL>
          <P className="mt-2">
            Examples include Vercel (hosting), Google (analytics) and payment
            platforms (e.g., Whop and PayPal). Their terms and privacy notices
            apply to their services.
          </P>
        </LSection>

        <LSection title="International Transfers">
          <P>
            We may transfer personal data internationally. Where required, we
            use appropriate safeguards such as Standard Contractual Clauses.
          </P>
        </LSection>

        <LSection title="Data Retention">
          <P>
            We retain personal data for as long as necessary to provide the
            Service, comply with legal obligations, resolve disputes, and
            enforce agreements. Retention periods vary by data type.
          </P>
        </LSection>

        <LSection title="Your Rights">
          <P>
            Depending on your region, you may have rights to access, correct,
            delete, restrict or object to processing, and data portability. To
            exercise rights, contact{" "}
            <a
              className="underline underline-offset-2"
              href="mailto:rangeuniversellc@gmail.com"
            >
              rangeuniversellc@gmail.com
            </a>
            . We may verify your identity before responding.
          </P>
        </LSection>

        <LSection title="Children Under Thirteen">
          <P>
            We do not knowingly collect, either online or offline, personal
            information from persons under the age of thirteen. If you are
            under 13, you may use the Service only with permission of a parent
            or guardian.
          </P>
        </LSection>

        <LSection title="Security">
          <P>
            We implement reasonable technical and organizational measures to
            protect personal data. No method of transmission or storage is 100%
            secure; we cannot guarantee absolute security.
          </P>
        </LSection>

        <LSection title="Changes to This Policy">
          <P>
            We may update this Privacy Policy from time to time. We will post
            the new date at the top of this page. Material changes may be
            communicated by email or in-product notice.
          </P>
        </LSection>

        <LSection title="Contact">
          <P>
            Questions about privacy? Email{" "}
            <a
              className="underline underline-offset-2"
              href="mailto:rangeuniversellc@gmail.com"
            >
              rangeuniversellc@gmail.com
            </a>
            .
          </P>
        </LSection>
      </div>
    </main>
  );
}

/* ---------- tiny typographic helpers (same look as Terms) ---------- */
function LSection({ title, children }: { title: string; children: React.ReactNode }) {
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
