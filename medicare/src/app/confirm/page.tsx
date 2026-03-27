"use client";

import Link from "next/link";
import { CheckCircle, Calendar, Download, ArrowRight, Mail, MessageSquare } from "lucide-react";

export default function ConfirmPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10" style={{ background: "var(--color-cream)" }}>
      <div className="w-full max-w-md text-center animate-scaleIn">
        <Link href="/" className="text-xl font-bold mb-8 inline-block" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
          MediCare
        </Link>

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center animate-pulseGlow"
            style={{ background: "rgba(34,168,103,0.1)", border: "2px solid var(--color-success)" }}>
            <CheckCircle size={40} style={{ color: "var(--color-success)" }} strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
          Appointment Confirmed!
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--color-text-muted)" }}>
          Your appointment has been booked. We&apos;ve sent confirmation to your email and phone.
        </p>

        <div className="card p-5 sm:p-6 mb-5 text-left">
          <h2 className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "var(--color-text-muted)" }}>Booking Details</h2>
          <div className="space-y-3">
            {[
              { l: "Doctor", v: "Dr. Gunja Gupta" }, { l: "Specialization", v: "Homeopathy & Psychology" },
              { l: "Date", v: "March 28, 2026" }, { l: "Time", v: "10:00 AM" },
              { l: "Amount Paid", v: "₹800" }, { l: "Payment via", v: "UPI (Google Pay)" },
            ].map((i) => (
              <div key={i.l} className="flex justify-between">
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{i.l}</span>
                <span className="text-xs font-medium" style={{ color: i.l === "Amount Paid" ? "var(--color-forest)" : "var(--color-text-primary)" }}>{i.v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4 mb-5 flex items-center gap-3">
          <div className="flex gap-2 flex-shrink-0">
            <Mail size={14} style={{ color: "var(--color-forest)" }} />
            <MessageSquare size={14} style={{ color: "var(--color-forest)" }} />
          </div>
          <p className="text-[10px] text-left" style={{ color: "var(--color-text-muted)" }}>
            Confirmation SMS & email have been sent to your registered contact.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <button className="btn-outline text-xs py-2.5"><Calendar size={14} /> Calendar</button>
          <button className="btn-outline text-xs py-2.5"><Download size={14} /> Receipt</button>
        </div>

        <Link href="/dashboard" className="btn-forest w-full">
          Go to My Appointments <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
