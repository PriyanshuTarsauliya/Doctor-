import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

export const metadata = {
  title: "Refund Policy — Dr. Gunja Gupta",
  description: "Understand the refund and cancellation policy for appointments with Dr. Gunja Gupta.",
};

export default function RefundPolicyPage() {
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
          <RotateCcw size={24} style={{ color: "var(--color-sage-dark)" }} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
            Refund Policy
          </h1>
        </div>
        <p className="text-xs mb-12" style={{ color: "var(--color-text-muted)" }}>
          Last updated: March 28, 2026
        </p>

        <div className="space-y-10">
          <Section title="1. Overview">
            <p>
              We understand that plans can change. This Refund Policy outlines the terms under which
              refunds are issued for consultation fees paid to Dr. Gunja Gupta&apos;s clinic.
            </p>
          </Section>

          <Section title="2. Cancellation Window">
            <div className="rounded-xl p-4 sm:p-5 space-y-3"
              style={{ background: "var(--color-sage-muted)", border: "1px solid var(--color-sage)" }}>
              <div className="flex items-baseline gap-3">
                <span className="text-lg font-bold" style={{ color: "var(--color-forest)", fontFamily: "var(--font-heading)" }}>24+ hours</span>
                <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>before appointment → <strong className="text-green-700">Full refund</strong></span>
              </div>
              <div className="h-px" style={{ background: "var(--color-sage)" }} />
              <div className="flex items-baseline gap-3">
                <span className="text-lg font-bold" style={{ color: "var(--color-forest)", fontFamily: "var(--font-heading)" }}>12–24 hours</span>
                <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>before appointment → <strong style={{ color: "var(--color-gold-star)" }}>50% refund</strong></span>
              </div>
              <div className="h-px" style={{ background: "var(--color-sage)" }} />
              <div className="flex items-baseline gap-3">
                <span className="text-lg font-bold" style={{ color: "var(--color-forest)", fontFamily: "var(--font-heading)" }}>{"< 12 hours"}</span>
                <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>before appointment → <strong className="text-red-600">No refund</strong></span>
              </div>
            </div>
          </Section>

          <Section title="3. Eligible Refund Scenarios">
            <ul>
              <li><strong>Patient-initiated cancellation</strong> made within the eligible window (24+ hours prior).</li>
              <li><strong>Clinic-initiated cancellation</strong> due to doctor unavailability — full refund regardless of timing.</li>
              <li><strong>Technical failure</strong> during payment processing resulting in double charges.</li>
              <li><strong>Service not rendered</strong> due to unforeseen circumstances on our end.</li>
            </ul>
          </Section>

          <Section title="4. Non-Refundable Scenarios">
            <ul>
              <li>No-shows (failure to attend the appointment without prior cancellation).</li>
              <li>Cancellations made less than 12 hours before the appointment.</li>
              <li>Completed consultations where the service was fully delivered.</li>
              <li>Dissatisfaction with treatment outcomes (as results may vary by individual).</li>
            </ul>
          </Section>

          <Section title="5. How to Request a Refund">
            <p>To request a refund, please follow these steps:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Email us at <a href="mailto:hello@drgunjagupta.com" className="font-medium underline" style={{ color: "var(--color-sage-dark)" }}>hello@drgunjagupta.com</a> with your booking ID and reason for cancellation.</li>
              <li>Or call us at <strong>(555) 987-6543</strong> during clinic hours (Mon–Fri, 8am–5pm).</li>
              <li>Refund requests are reviewed within <strong>2 business days</strong>.</li>
            </ol>
          </Section>

          <Section title="6. Refund Processing Time">
            <ul>
              <li>Approved refunds are processed within <strong>5–7 business days</strong>.</li>
              <li>Refunds are credited back to the original payment method used during booking.</li>
              <li>Bank processing times may vary — please allow an additional 2–3 business days for the amount to reflect in your account.</li>
            </ul>
          </Section>

          <Section title="7. Rescheduling">
            <p>
              As an alternative to cancellation, you may reschedule your appointment at no extra
              charge, provided the request is made at least <strong>12 hours</strong> before the
              original appointment time. Rescheduling is subject to availability.
            </p>
          </Section>

          <Section title="8. Contact">
            <p>
              For any questions about our refund policy, please reach out to{" "}
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
      <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:leading-relaxed [&_ol]:space-y-2"
        style={{ color: "var(--color-text-secondary)" }}>
        {children}
      </div>
    </div>
  );
}
