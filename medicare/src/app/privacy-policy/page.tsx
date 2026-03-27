import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Dr. Gunja Gupta",
  description: "Learn how Dr. Gunja Gupta's clinic collects, uses, and protects your personal and health information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-cream)" }}>
      {/* Header */}
      <nav className="sticky top-0 z-40 backdrop-blur-md border-b"
        style={{ background: "rgba(247,243,237,0.92)", borderColor: "var(--color-border)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg hover:bg-white/60 transition-colors">
            <ArrowLeft size={18} style={{ color: "var(--color-forest)" }} />
          </Link>
          <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
            Dr. Gunja Gupta
          </span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck size={24} style={{ color: "var(--color-sage-dark)" }} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
            Privacy Policy
          </h1>
        </div>
        <p className="text-xs mb-12" style={{ color: "var(--color-text-muted)" }}>
          Last updated: March 28, 2026
        </p>

        <div className="space-y-10">
          <Section title="1. Introduction">
            <p>
              Dr. Gunja Gupta (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy of
              our patients and website visitors. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your personal and health information when you visit our website,
              book an appointment, or use our services.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, date of birth, and address provided during booking or registration.</li>
              <li><strong>Health Information:</strong> Medical history, symptoms, treatment records, and consultation notes shared during appointments.</li>
              <li><strong>Payment Information:</strong> Payment method details processed securely through our third-party payment gateways (Razorpay, Cashfree, or Instamojo). We do not store card or bank details on our servers.</li>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited, and timestamps collected automatically for website analytics.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul>
              <li>Schedule and manage your appointments.</li>
              <li>Provide medical consultations and follow-up care.</li>
              <li>Process payments for services rendered.</li>
              <li>Send appointment reminders and health-related communications.</li>
              <li>Improve our website and services.</li>
              <li>Comply with legal and regulatory obligations.</li>
            </ul>
          </Section>

          <Section title="4. Data Sharing & Third Parties">
            <p>
              We do not sell or rent your personal information. We may share your data only with:
            </p>
            <ul>
              <li><strong>Payment Processors:</strong> Razorpay, Cashfree, or Instamojo for secure payment processing.</li>
              <li><strong>Communication Services:</strong> SMS and email service providers for appointment notifications.</li>
              <li><strong>Legal Authorities:</strong> When required by applicable law or regulation.</li>
            </ul>
          </Section>

          <Section title="5. Data Security">
            <p>
              We implement industry-standard security measures including 256-bit SSL encryption,
              secure server infrastructure, and restricted access controls to protect your data.
              However, no method of electronic transmission is 100% secure.
            </p>
          </Section>

          <Section title="6. Your Rights">
            <ul>
              <li>Access, correct, or delete your personal data by contacting us.</li>
              <li>Opt out of non-essential communications at any time.</li>
              <li>Request a copy of the information we hold about you.</li>
            </ul>
          </Section>

          <Section title="7. Contact Us">
            <p>
              For any questions or concerns regarding this Privacy Policy, please contact us at{" "}
              <a href="mailto:hello@drgunjagupta.com" className="font-medium underline" style={{ color: "var(--color-sage-dark)" }}>
                hello@drgunjagupta.com
              </a>{" "}
              or call <strong>(555) 987-6543</strong>.
            </p>
          </Section>
        </div>

        {/* Back to Home */}
        <div className="mt-16 pt-8 border-t text-center" style={{ borderColor: "var(--color-border)" }}>
          <Link href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-full transition-all hover:-translate-y-0.5"
            style={{ background: "var(--color-sage-dark)" }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg sm:text-xl font-semibold mb-3"
        style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
        {title}
      </h2>
      <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:leading-relaxed"
        style={{ color: "var(--color-text-secondary)" }}>
        {children}
      </div>
    </div>
  );
}
