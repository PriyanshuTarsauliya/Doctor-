"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { ShieldCheck, Lock, CreditCard, Smartphone, Building, Wallet, ArrowLeft } from "lucide-react";

// Add TypeScript declaration for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

const doctor = { name: "Dr. Gunja Gupta", specialty: "Homeopathy & Psychology", date: "March 28, 2026", time: "10:00 AM", fee: 800 };
const payMethods = [
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "card", label: "Card", icon: CreditCard },
  { id: "netbanking", label: "Net Banking", icon: Building },
  { id: "wallet", label: "Wallet", icon: Wallet },
];
const upiApps = [
  { name: "Google Pay", color: "#4285F4", initials: "GP" },
  { name: "PhonePe", color: "#6739b7", initials: "PP" },
  { name: "Paytm", color: "#002970", initials: "PT" },
  { name: "BHIM", color: "#16a34a", initials: "BH" },
];

export default function PaymentPage() {
  const [activeMethod, setActiveMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    
    // Check if Razorpay script is loaded
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    const options = {
      key: "rzp_test_dummykey12345", // Enter the Key ID generated from the Dashboard
      amount: doctor.fee * 100, // Amount is in currency subunits (paise)
      currency: "INR",
      name: "Dr. Gunja Gupta",
      description: "Consultation Fee",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response: any) {
        // Handle success
        console.log("Payment successful:", response.razorpay_payment_id);
        window.location.href = "/confirm";
      },
      prefill: {
        name: "Arjun Patel",
        email: "arjun@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#1a3a2a", // Match your forest green theme
      },
    };

    const rzp1 = new window.Razorpay(options);
    
    // Handle payment failure
    rzp1.on("payment.failed", function (response: any) {
      alert("Payment failed: " + response.error.description);
      setLoading(false);
    });

    rzp1.open();
    
    // Don't reset loading until it either fails or navigates away
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="min-h-screen py-8 sm:py-10 px-4 sm:px-6" style={{ background: "var(--color-cream)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8 animate-fadeInUp">
          <Link href="/doctors/1" className="p-2 rounded-lg hover:bg-white transition-colors border" style={{ borderColor: "var(--color-cream-dark)" }}>
            <ArrowLeft size={16} style={{ color: "var(--color-text-muted)" }} />
          </Link>
          <h1 className="text-lg sm:text-xl" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>Complete Payment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 animate-fadeInUp delay-100">
            <div className="card p-5 sm:p-6">
              <h2 className="text-[10px] font-bold tracking-widest uppercase mb-5" style={{ color: "var(--color-text-muted)" }}>Payment Method</h2>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {payMethods.map((m) => {
                  const Icon = m.icon; const active = activeMethod === m.id;
                  return (
                    <button key={m.id} onClick={() => setActiveMethod(m.id)}
                      className="flex flex-col items-center gap-2 py-3 rounded-xl border text-xs font-medium transition-all"
                      style={{
                        background: active ? "var(--color-cream)" : "white",
                        borderColor: active ? "var(--color-forest)" : "var(--color-cream-dark)",
                        color: active ? "var(--color-forest)" : "var(--color-text-muted)",
                      }}>
                      <Icon size={16} /><span className="hidden sm:inline">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {activeMethod === "upi" && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>UPI ID</label>
                    <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@bank"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-forest-light)]"
                      style={{ background: "var(--color-cream)", color: "var(--color-text-primary)" }} />
                  </div>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Or pay with</p>
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {upiApps.map((app) => (
                      <button key={app.name} className="flex flex-col items-center gap-2 py-3 rounded-xl border transition-all hover:border-[var(--color-forest)]"
                        style={{ borderColor: "var(--color-cream-dark)" }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white" style={{ background: app.color }}>{app.initials}</div>
                        <span className="text-[9px] hidden sm:block" style={{ color: "var(--color-text-muted)" }}>{app.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeMethod === "card" && (
                <div className="space-y-4">
                  {["Card Number", "Cardholder Name"].map((f) => (
                    <div key={f}>
                      <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>{f}</label>
                      <input type="text" placeholder={f === "Card Number" ? "•••• •••• •••• ••••" : "John Doe"}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-forest-light)]" style={{ background: "var(--color-cream)" }} />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-3">
                    {["Expiry (MM/YY)", "CVV"].map((f) => (
                      <div key={f}>
                        <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>{f}</label>
                        <input type="text" placeholder={f === "CVV" ? "•••" : "12/28"}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-forest-light)]" style={{ background: "var(--color-cream)" }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(activeMethod === "netbanking" || activeMethod === "wallet") && (
                <div className="text-center py-8"><p className="text-sm" style={{ color: "var(--color-text-muted)" }}>You will be redirected to complete payment.</p></div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4 animate-slideInRight">
            <div className="card p-5 sm:p-6">
              <h2 className="text-[10px] font-bold tracking-widest uppercase mb-5" style={{ color: "var(--color-text-muted)" }}>Booking Summary</h2>
              <div className="space-y-3">
                {[{ l: "Doctor", v: doctor.name }, { l: "Specialty", v: doctor.specialty }, { l: "Date", v: doctor.date }, { l: "Time", v: doctor.time }].map((i) => (
                  <div key={i.l} className="flex justify-between">
                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{i.l}</span>
                    <span className="text-xs font-medium" style={{ color: "var(--color-text-primary)" }}>{i.v}</span>
                  </div>
                ))}
                <div className="h-px" style={{ background: "var(--color-cream-dark)" }} />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>Total</span>
                  <span className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>₹{doctor.fee}</span>
                </div>
              </div>
              <button onClick={handlePay} disabled={loading} className="btn-forest w-full mt-6">
                {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Lock size={14} />}
                {loading ? "Processing..." : `Pay ₹${doctor.fee} Securely`}
              </button>
            </div>
            <div className="card p-4 space-y-2">
              {[{ icon: ShieldCheck, t: "256-bit SSL Encryption" }, { icon: Lock, t: "PCI DSS Compliant" }].map((b) => (
                <div key={b.t} className="flex items-center gap-3">
                  <b.icon size={14} style={{ color: "var(--color-success)" }} />
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{b.t}</span>
                </div>
              ))}
              <p className="text-[10px] text-center pt-1" style={{ color: "var(--color-text-muted)" }}>Powered by Razorpay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
