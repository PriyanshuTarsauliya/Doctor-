import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service — Dr. Gunja Gupta",
  description: "Terms and conditions for using Dr. Gunja Gupta's healthcare services and website.",
};

export default function TermsPage() {
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
        <div className="flex items-center gap-3 mb-2">
          <FileText size={24} style={{ color: "var(--color-sage-dark)" }} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
            Terms of Service
          </h1>
        </div>
        <p className="text-xs mb-12" style={{ color: "var(--color-text-muted)" }}>
          Last updated: March 28, 2026
        </p>

        <div className="space-y-10">
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using the website and services of Dr. Gunja Gupta, you agree to be
              bound by these Terms of Service. If you do not agree with any part of these terms,
              please do not use our services.
            </p>
          </Section>

          <Section title="2. Services Provided">
            <p>
              Dr. Gunja Gupta provides homeopathic consultations, psychological support, and
              holistic health services. Services are available through in-person appointments and
              telehealth (virtual) consultations. All services are subject to availability.
            </p>
          </Section>

          <Section title="3. Appointment Booking">
            <ul>
              <li>Appointments can be booked through our website or by phone.</li>
              <li>A consultation fee of ₹800 is charged per appointment and must be paid at the time of booking.</li>
              <li>Appointments are available Monday through Friday. Weekends and public holidays are excluded.</li>
              <li>You must provide accurate personal and contact information when booking.</li>
            </ul>
          </Section>

          <Section title="4. Payment Terms">
            <ul>
              <li>All payments are processed securely through our authorized payment partners (Razorpay, Cashfree, or Instamojo).</li>
              <li>Fees are in Indian Rupees (INR) and inclusive of all applicable taxes.</li>
              <li>We do not store credit card, debit card, or bank account details on our servers.</li>
              <li>Payment confirmation is sent via email and/or SMS upon successful transaction.</li>
            </ul>
          </Section>

          <Section title="5. Cancellation & Rescheduling">
            <ul>
              <li>Appointments may be cancelled or rescheduled up to <strong>24 hours</strong> before the scheduled time.</li>
              <li>Cancellations made less than 24 hours before the appointment may not be eligible for a refund.</li>
              <li>No-shows will be considered as completed appointments and are non-refundable.</li>
              <li>See our <Link href="/refund-policy" className="font-medium underline" style={{ color: "var(--color-sage-dark)" }}>Refund Policy</Link> for full details.</li>
            </ul>
          </Section>

          <Section title="6. Medical Disclaimer">
            <p>
              The information provided on this website is for general informational purposes only
              and does not constitute medical advice. Homeopathic treatments and psychological
              consultations are complementary approaches and should not replace conventional medical
              treatment where necessary. Always consult with a qualified healthcare professional
              for specific medical concerns.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              Dr. Gunja Gupta shall not be liable for any indirect, incidental, or consequential
              damages arising from the use of our website or services. Our total liability is limited
              to the amount paid for the specific service in question.
            </p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>
              All content on this website, including text, images, logos, and design elements,
              is the intellectual property of Dr. Gunja Gupta and may not be reproduced, distributed,
              or used without prior written consent.
            </p>
          </Section>

          <Section title="9. Governing Law">
            <p>
              These Terms of Service are governed by the laws of India. Any disputes shall be
              subject to the exclusive jurisdiction of the courts in the applicable district.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              For questions about these terms, please contact us at{" "}
              <a href="mailto:hello@drgunjagupta.com" className="font-medium underline" style={{ color: "var(--color-sage-dark)" }}>
                hello@drgunjagupta.com
              </a>.
            </p>
          </Section>
        </div>

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
