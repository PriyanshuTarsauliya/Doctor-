"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { ShieldCheck, Lock, CreditCard, Smartphone, Building, Wallet, ArrowLeft } from "lucide-react";

// TypeScript declarations for payment SDKs
declare global {
  interface Window {
    Razorpay: any;
    Cashfree: any;
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

type Gateway = "razorpay" | "cashfree" | "instamojo";

const gateways: { id: Gateway; label: string; color: string; tagline: string }[] = [
  { id: "razorpay", label: "Razorpay", color: "#2D70E2", tagline: "India's most popular" },
  { id: "cashfree", label: "Cashfree", color: "#6C3CE9", tagline: "Fast approval" },
  { id: "instamojo", label: "Instamojo", color: "#D64E34", tagline: "Quick setup" },
];

export default function PaymentPage() {
  const [activeMethod, setActiveMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeGateway, setActiveGateway] = useState<Gateway>("razorpay");

  /* ─── Razorpay Handler ─── */
  const handleRazorpay = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    const options = {
      key: "rzp_test_SWQOpTUEIOTIat",
      amount: doctor.fee * 100, // Amount in paise
      currency: "INR",
      name: "Dr. Gunja Gupta Clinic",
      description: `Consultation Fee - ${doctor.specialty}`,
      handler: function (response: any) {
        alert("✅ Payment Successful!\n\nPayment ID: " + response.razorpay_payment_id);
        setLoading(false);
      },
      prefill: {
        name: "Patient",
        email: "patient@example.com",
        contact: "9999999999",
      },
      notes: {
        doctor: doctor.name,
        date: doctor.date,
        time: doctor.time,
      },
      theme: { color: "#2D70E2" },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response: any) {
      alert("❌ Payment Failed\n\n" + (response.error?.description || "Something went wrong"));
      setLoading(false);
    });
    rzp.open();
  };

  /* ─── Cashfree Handler ─── */
  const handleCashfree = async () => {
    try {
      // Step 1: Create order via your backend
      // TODO: Replace with your actual backend endpoint
      const orderRes = await fetch("http://localhost:8080/api/public/cashfree/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: doctor.fee, currency: "INR" }),
      });

      if (!orderRes.ok) throw new Error("Failed to create Cashfree order");

      const orderData = await orderRes.json();

      // Step 2: Open Cashfree checkout
      const cashfree = window.Cashfree({
        mode: "sandbox", // TODO: Change to "production" when going live
      });

      cashfree.checkout({
        paymentSessionId: orderData.paymentSessionId, // From backend
        redirectTarget: "_self",
      });
    } catch (error) {
      console.error("Cashfree payment error:", error);
      alert("Unable to initiate Cashfree payment. Please try another payment method or try again later.");
      setLoading(false);
    }
  };

  /* ─── Instamojo Handler ─── */
  const handleInstamojo = async () => {
    try {
      // Step 1: Create a payment request via your backend
      // TODO: Replace with your actual backend endpoint
      const paymentRes = await fetch("http://localhost:8080/api/public/instamojo/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: doctor.fee,
          purpose: "Consultation Fee - Dr. Gunja Gupta",
          buyer_name: "Patient",
          email: "patient@example.com",
          phone: "9999999999",
        }),
      });

      if (!paymentRes.ok) throw new Error("Failed to create Instamojo payment");

      const paymentData = await paymentRes.json();

      // Step 2: Redirect to Instamojo payment page
      if (paymentData.paymentUrl) {
        window.location.href = paymentData.paymentUrl;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (error) {
      console.error("Instamojo payment error:", error);
      alert("Unable to initiate Instamojo payment. Please try another payment method or try again later.");
      setLoading(false);
    }
  };

  const handlePay = () => {
    setLoading(true);
    switch (activeGateway) {
      case "razorpay":
        handleRazorpay();
        break;
      case "cashfree":
        handleCashfree();
        break;
      case "instamojo":
        handleInstamojo();
        break;
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" strategy="lazyOnload" />

      <div className="min-h-screen py-8 sm:py-10 px-4 sm:px-6" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8 animate-fadeInUp">
            <Link href="/" className="p-2 rounded-lg hover:bg-white transition-colors border" style={{ borderColor: "var(--color-cream-dark)" }}>
              <ArrowLeft size={16} style={{ color: "var(--color-text-muted)" }} />
            </Link>
            <h1 className="text-lg sm:text-xl" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>Complete Payment</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3 space-y-5 animate-fadeInUp delay-100">

              {/* ─── Payment Gateway Selector ─── */}
              <div className="rounded-2xl p-5 sm:p-6"
                style={{ background: "var(--color-cream-card)", border: "1px solid var(--color-border)", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
                <h2 className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "var(--color-text-muted)" }}>Payment Gateway</h2>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {gateways.map((gw) => {
                    const active = activeGateway === gw.id;
                    return (
                      <button key={gw.id} onClick={() => setActiveGateway(gw.id)}
                        className="relative flex flex-col items-center gap-1.5 py-3.5 sm:py-4 rounded-xl border-2 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5"
                        style={{
                          background: active ? `${gw.color}0D` : "white",
                          borderColor: active ? gw.color : "var(--color-cream-dark)",
                          color: active ? gw.color : "var(--color-text-muted)",
                        }}>
                        {active && (
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                            style={{ background: gw.color }}>✓</span>
                        )}
                        <span className="text-sm font-bold">{gw.label}</span>
                        <span className="text-[9px] sm:text-[10px] font-normal opacity-70">{gw.tagline}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ─── Payment Method Card ─── */}
              <div className="rounded-2xl p-5 sm:p-6"
                style={{ background: "var(--color-cream-card)", border: "1px solid var(--color-border)", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
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
              <div className="rounded-2xl p-5 sm:p-6" style={{ background: "var(--color-cream-card)", border: "1px solid var(--color-border)", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
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
                <button onClick={handlePay} disabled={loading}
                  className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: gateways.find(g => g.id === activeGateway)?.color || "var(--color-forest)" }}>
                  {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Lock size={14} />}
                  {loading ? "Processing..." : `Pay ₹${doctor.fee} Securely`}
                </button>
              </div>

              <div className="rounded-2xl p-4 space-y-2" style={{ background: "var(--color-cream-card)", border: "1px solid var(--color-border)" }}>
                {[{ icon: ShieldCheck, t: "256-bit SSL Encryption" }, { icon: Lock, t: "PCI DSS Compliant" }].map((b) => (
                  <div key={b.t} className="flex items-center gap-3">
                    <b.icon size={14} style={{ color: "var(--color-sage-dark)" }} />
                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{b.t}</span>
                  </div>
                ))}
                <p className="text-[10px] text-center pt-1" style={{ color: "var(--color-text-muted)" }}>
                  Powered by {gateways.find(g => g.id === activeGateway)?.label}
                </p>
              </div>

              {/* Refund policy link */}
              <div className="text-center pt-1">
                <Link href="/refund-policy" className="text-[11px] font-medium underline transition-colors hover:opacity-70"
                  style={{ color: "var(--color-sage-dark)" }}>
                  View Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
