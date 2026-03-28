"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone, Mail, MapPin, ChevronLeft, ChevronRight,
  ArrowRight, Star, Menu, X, Award, Shield, Globe, BarChart3
} from "lucide-react";

/* ─── Data ─── */
const conditionTags = [
  "Homeopathy", "Psychology", "Holistic Healing", "Anxiety Relief",
  "Gut Health", "Mental Wellness",
];
const benefitTags = [
  "Depression Therapy", "Chronic Care", "Stress Management",
  "Immune Boost", "CBT Therapy", "Family Counseling",
];

const services = [
  { num: "01", title: "Constitutional Homeopathy", desc: "Personalized remedies that stimulate your body's natural healing responses for long-term chronic relief.", icon: "💧" },
  { num: "02", title: "Clinical Psychology", desc: "Evidence-based talk therapy focusing on anxiety, depression, and trauma-informed behavioral shifts.", icon: "🧠" },
  { num: "03", title: "Integrative Wellness", desc: "A hybrid approach combining both disciplines for complex psychosomatic conditions and burnout.", icon: "🌿" },
  { num: "04", title: "Pediatric Homeopathy", desc: "Gentle, side-effect-free treatments for children's immunity, allergies, and behavioral development.", icon: "🌱" },
  { num: "05", title: "Relationship Counseling", desc: "Guided sessions to restore communication and emotional intimacy within couples and families.", icon: "👥" },
];

const bookingSteps = [
  { num: "1", label: "Select Date" },
  { num: "2", label: "Pick Time" },
  { num: "3", label: "Your Details" },
];

const days = ["S", "M", "T", "W", "T", "F", "S"];

/* ─── Component ─── */
export default function LandingPage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(20);
  const [activeStep, setActiveStep] = useState(0);
  const [mobileNav, setMobileNav] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const handleDateContinue = async () => {
    if (!selectedDate) return;
    setActiveStep(1);
    setLoadingSlots(true);
    try {
      const dateStr = `2026-03-${selectedDate.toString().padStart(2, "0")}`;
      const res = await fetch(`http://localhost:8080/api/public/slots?date=${dateStr}`);
      if (res.ok) {
        setAvailableSlots(await res.json());
      } else {
        throw new Error("Failed to fetch");
      }
    } catch {
      console.warn("Backend not reachable, using fallback time slots.");
      setAvailableSlots(["09:00 AM", "10:30 AM", "02:00 PM", "04:30 PM"]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setActiveStep(2);
  };

  const submitBooking = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!name || !email || !selectedDate || !selectedTime) return;
    setIsBooking(true);
    try {
      const dateStr = `2026-03-${selectedDate.toString().padStart(2, "0")}`;
      const payload = { name, email, phone, doctorId: 1, dateTime: `${dateStr}T10:00:00` };
      const res = await fetch("http://localhost:8080/api/public/book-guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const appointment = await res.json();
        window.location.href = `/payment?appointmentId=${appointment.id}&amount=800`;
      } else {
        throw new Error("Booking failed");
      }
    } catch {
      console.warn("Backend not reachable, redirecting to payment page directly.");
      window.location.href = `/payment?amount=800`;
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--color-cream)" }}>

      {/* ━━━ TOP BANNER ━━━ */}
      <div
        className="text-center py-2.5 text-xs sm:text-sm font-medium tracking-wide"
        style={{ background: "var(--color-sage-muted)", color: "var(--color-forest)" }}>
        Now accepting new patients —{" "}
        <a href="#booking" className="underline font-semibold hover:opacity-80 transition-opacity">
          Book your visit today
        </a>
      </div>

      {/* ━━━ STICKY NAV (Frosted Glass) ━━━ */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-xl shadow-sm"
        style={{ background: "rgba(247,243,237,0.80)", boxShadow: "0 1px 3px rgba(91,126,95,0.05)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-2xl italic"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
            Dr. Gunja Gupta
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {["About", "Services", "Contact"].map((link, i) => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-sm transition-opacity duration-300 hover:opacity-70"
                style={{
                  color: i === 0 ? "var(--color-forest)" : "var(--color-text-secondary)",
                  fontWeight: i === 0 ? 600 : 400,
                  borderBottom: i === 0 ? "2px solid var(--color-forest)" : "none",
                  paddingBottom: "2px",
                }}>
                {link}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a href="#booking"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white rounded-full transition-opacity duration-300 hover:opacity-80"
              style={{ background: "var(--color-sage-dark)" }}>
              Book appointment
            </a>
            <button className="md:hidden p-2 rounded-lg" onClick={() => setMobileNav(!mobileNav)}>
              {mobileNav
                ? <X size={22} style={{ color: "var(--color-forest)" }} />
                : <Menu size={22} style={{ color: "var(--color-forest)" }} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileNav && (
          <div className="md:hidden border-t px-6 py-4 space-y-3 anim-fadeIn"
            style={{ borderColor: "var(--color-border)" }}>
            {["About", "Services", "Booking", "Contact"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}
                onClick={() => setMobileNav(false)}
                className="block text-sm font-medium py-1"
                style={{ color: "var(--color-text-secondary)" }}>
                {link}
              </a>
            ))}
            <a href="#booking" onClick={() => setMobileNav(false)}
              className="block text-center py-2.5 text-sm font-semibold text-white rounded-full mt-2"
              style={{ background: "var(--color-sage-dark)" }}>
              Book appointment
            </a>
          </div>
        )}
      </nav>

      {/* ━━━ HERO (Stitch: large serif headline with blurred blobs) ━━━ */}
      <section className="relative overflow-hidden py-24 md:py-32 flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto relative z-10 anim-fadeInUp">
          <h1
            className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.08] mb-8"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-sage-dark)" }}>
            Healing that treats the{" "}
            <em className="not-italic" style={{ fontStyle: "italic", fontWeight: 400 }}>whole</em>{" "}
            person
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}>
            Experience a boutique approach to wellness where ancient homeopathic wisdom
            meets modern clinical psychology to restore your natural balance.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 anim-fadeInUp delay-2">
            <a href="#booking"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white rounded-full transition-transform hover:scale-[1.02]"
              style={{ background: "var(--color-sage-dark)" }}>
              Book an appointment <ArrowRight size={18} />
            </a>
            <a href="#services"
              className="w-full sm:w-auto px-8 py-4 text-lg font-medium rounded-full border-2 transition-all hover:bg-white/60"
              style={{ color: "var(--color-sage-dark)", borderColor: "var(--color-sage-dark)" }}>
              Learn more
            </a>
          </div>

          {/* Trust Metrics — with separator line */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 anim-fadeInUp delay-3"
            style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-1"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-sage-dark)" }}>
                15+ Years
              </span>
              <span className="text-sm font-medium uppercase tracking-widest"
                style={{ color: "var(--color-text-muted)" }}>
                Expert Practice
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-1"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-sage-dark)" }}>
                2000+ Patients
              </span>
              <span className="text-sm font-medium uppercase tracking-widest"
                style={{ color: "var(--color-text-muted)" }}>
                Healed Lives
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-1 text-3xl mb-1"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-sage-dark)" }}>
                4.9 <Star size={20} fill="var(--color-gold-star)" stroke="none" />
              </span>
              <span className="text-sm font-medium uppercase tracking-widest"
                style={{ color: "var(--color-text-muted)" }}>
                Patient Rating
              </span>
            </div>
          </div>
        </div>

        {/* Background Blurred Blobs */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full"
            style={{ background: "var(--color-sage-muted)", filter: "blur(100px)" }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full"
            style={{ background: "var(--color-sage-light)", filter: "blur(120px)" }} />
        </div>
      </section>

      {/* ━━━ MARQUEE TICKER ━━━ */}
      <section className="py-12 overflow-hidden anim-fadeIn delay-4"
        style={{ background: "var(--color-cream-light)" }}>
        <div className="flex flex-col gap-6">
          {/* Row 1 */}
          <div className="overflow-hidden">
            <div className="marquee-track">
              {[...conditionTags, ...conditionTags, ...conditionTags].map((t, i) => (
                <span key={`c-${i}`}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-full whitespace-nowrap flex-shrink-0"
                  style={{ background: "var(--color-sage-muted)", color: "var(--color-sage-dark)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          {/* Row 2 */}
          <div className="overflow-hidden">
            <div className="marquee-track-reverse">
              {[...benefitTags, ...benefitTags, ...benefitTags].map((t, i) => (
                <span key={`b-${i}`}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-full whitespace-nowrap flex-shrink-0 border"
                  style={{ background: "white", color: "var(--color-text-primary)", borderColor: "var(--color-border)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ ABOUT (Stitch: large image + text with credentials) ━━━ */}
      <section id="about" className="py-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative group anim-fadeInUp delay-1">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative"
              style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}>
              <div className="w-full h-full"
                style={{ background: "linear-gradient(135deg, var(--color-sage-muted) 0%, var(--color-cream-dark) 100%)" }}>
                {/* Doctor Initials as placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-36 h-44 rounded-xl flex items-center justify-center text-5xl font-bold mb-4"
                    style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(10px)", color: "var(--color-forest)", fontFamily: "var(--font-heading)" }}>
                    GG
                  </div>
                  <span className="text-sm font-semibold"
                    style={{ color: "var(--color-forest)", fontFamily: "var(--font-heading)" }}>
                    Dr. Gunja Gupta
                  </span>
                  <span className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                    Homeopathy &amp; Psychology
                  </span>
                </div>
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(91,126,95,0.4), transparent)" }} />
              {/* Credentials Badge (overlay) */}
              <div className="absolute bottom-8 left-8">
                <div className="backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-4"
                  style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                  <Award size={28} style={{ color: "var(--color-gold-star)" }} />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: "var(--color-text-muted)" }}>Credentials</p>
                    <p className="text-lg"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--color-sage-dark)" }}>
                      Awarded Wellness Expert 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="space-y-8 anim-fadeInUp delay-2">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em]"
              style={{ background: "var(--color-sage-muted)", color: "var(--color-sage-dark)" }}>
              About Dr. Gupta
            </div>
            <h2 className="text-4xl md:text-5xl leading-tight"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
              Dedicated to your recovery through{" "}
              <span className="italic" style={{ color: "var(--color-sage-dark)" }}>empathetic care</span>.
            </h2>
            <div className="space-y-6 text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              <p>
                With a dual foundation in Homeopathy and Clinical Psychology, Dr. Gunja Gupta offers
                a unique therapeutic bridge that addresses both biological symptoms and emotional well-being.
              </p>
              <p>
                Her philosophy centers on the belief that health is not merely the absence of disease,
                but a state of vibrant harmony between mind and body. Every treatment plan is
                meticulously curated to the individual&apos;s unique constitution and life journey.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-5 py-3 rounded-full"
                style={{ background: "var(--color-cream-dark)" }}>
                <Award size={18} style={{ color: "var(--color-sage-dark)" }} />
                <span className="text-sm font-medium">B.H.M.S, M.Sc Psychology</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-full"
                style={{ background: "var(--color-cream-dark)" }}>
                <Shield size={18} style={{ color: "var(--color-sage-dark)" }} />
                <span className="text-sm font-medium">Certified Holistic Practitioner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ SERVICES (Stitch: icon badges + numbered watermarks + CTA card) ━━━ */}
      <section id="services" className="py-24" style={{ background: "var(--color-cream-light)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto anim-fadeInUp">
            <h2 className="text-4xl md:text-5xl mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
              Boutique Wellness Services
            </h2>
            <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
              Comprehensive care modules designed to heal at every level of your existence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={s.num}
                className="relative overflow-hidden p-10 rounded-2xl transition-all duration-500 hover:-translate-y-2 group anim-fadeInUp"
                style={{
                  background: "var(--color-cream-card)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                  animationDelay: `${i * 0.1}s`,
                }}>
                {/* Watermark Number */}
                <span className="absolute top-4 right-8 text-7xl leading-none select-none pointer-events-none transition-colors"
                  style={{ fontFamily: "var(--font-heading)", color: "rgba(91,126,95,0.05)" }}>
                  {s.num}
                </span>
                {/* Icon Badge */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-3xl"
                  style={{ background: "var(--color-sage-muted)" }}>
                  {s.icon}
                </div>
                <h3 className="text-2xl mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
                  {s.title}
                </h3>
                <p className="leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {s.desc}
                </p>
              </div>
            ))}

            {/* CTA Card */}
            <div className="p-10 rounded-2xl flex flex-col justify-center items-center text-center"
              style={{ background: "var(--color-sage-dark)" }}>
              <h3 className="text-2xl mb-4 text-white"
                style={{ fontFamily: "var(--font-heading)" }}>
                Custom Path
              </h3>
              <p className="opacity-90 mb-8 text-white">
                Not sure which service is right for you? Book a 15-minute discovery call.
              </p>
              <a href="#booking"
                className="px-8 py-3 rounded-full font-medium transition-colors hover:opacity-90"
                style={{ background: "var(--color-cream)", color: "var(--color-sage-dark)" }}>
                Contact Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ BOOKING (Stitch: Split layout — sidebar + calendar) ━━━ */}
      <section id="booking" className="py-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden anim-scaleIn delay-2"
            style={{ background: "var(--color-cream-card)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)", border: "1px solid rgba(194,200,191,0.2)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
              {/* ── Sidebar Steps ── */}
              <div className="lg:col-span-4 p-8 lg:p-12" style={{ background: "var(--color-sage-dark)" }}>
                <h3 className="text-3xl mb-12 text-white"
                  style={{ fontFamily: "var(--font-heading)" }}>
                  Book Your Visit
                </h3>
                <div className="space-y-8 relative">
                  {bookingSteps.map((step, i) => (
                    <button key={step.num}
                      onClick={() => setActiveStep(i)}
                      className="flex items-center gap-4 relative z-10 w-full text-left transition-opacity"
                      style={{ opacity: activeStep >= i ? 1 : 0.5 }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                        style={{
                          background: activeStep >= i ? "var(--color-cream)" : "transparent",
                          color: activeStep >= i ? "var(--color-sage-dark)" : "white",
                          border: activeStep >= i ? "none" : "2px solid rgba(255,255,255,0.4)",
                        }}>
                        {step.num}
                      </div>
                      <span className="font-medium text-white">{step.label}</span>
                    </button>
                  ))}
                  {/* Vertical Line */}
                  <div className="absolute left-5 top-5 w-0.5 h-full -z-0"
                    style={{ background: "rgba(255,255,255,0.2)" }} />
                </div>
              </div>

              {/* ── Main Content Area ── */}
              <div className="lg:col-span-8 p-6 sm:p-10 lg:p-16 overflow-hidden flex flex-col justify-center">
                <div className="max-w-2xl w-full mx-auto">
                  {/* STEP 1: DATE SELECTION */}
                  {activeStep === 0 && (
                    <div className="anim-fadeIn">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
                        March 2026
                      </h4>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-full transition-colors"
                          style={{ background: "transparent" }}
                          onMouseEnter={e => e.currentTarget.style.background = "var(--color-cream-dark)"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <ChevronLeft size={18} style={{ color: "var(--color-forest)" }} />
                        </button>
                        <button className="p-2 rounded-full transition-colors"
                          style={{ background: "transparent" }}
                          onMouseEnter={e => e.currentTarget.style.background = "var(--color-cream-dark)"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <ChevronRight size={18} style={{ color: "var(--color-forest)" }} />
                        </button>
                      </div>
                    </div>
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium mb-4"
                      style={{ color: "var(--color-text-muted)" }}>
                      {days.map((d, i) => <span key={i}>{d}</span>)}
                    </div>
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-6">
                      {[...Array(31)].map((_, i) => {
                        const day = i + 1;
                        const isSelected = day === selectedDate;
                        const isWeekend = i % 7 === 0 || i % 7 === 6;
                        return (
                          <button key={day}
                            onClick={() => !isWeekend && setSelectedDate(day)}
                            disabled={isWeekend}
                            className="aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200"
                            style={{
                              background: isSelected ? "var(--color-sage-dark)" : "transparent",
                              color: isSelected ? "#fff" : isWeekend ? "var(--color-cream-dark)" : "var(--color-text-primary)",
                              fontWeight: isSelected ? 700 : 500,
                              opacity: isWeekend ? 0.3 : 1,
                              cursor: isWeekend ? "default" : "pointer",
                              boxShadow: isSelected ? "0 4px 12px rgba(91,126,95,0.3)" : "none",
                              border: isSelected ? "none" : "1px solid transparent",
                            }}
                            onMouseEnter={e => { if (!isWeekend && !isSelected) e.currentTarget.style.background = "var(--color-cream-dark)"; }}
                            onMouseLeave={e => { if (!isWeekend && !isSelected) e.currentTarget.style.background = "transparent"; }}>
                            {day}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-10 pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
                      <button
                        onClick={handleDateContinue}
                        disabled={!selectedDate || loadingSlots}
                        className="w-full py-4 rounded-full text-white font-bold text-lg transition-all duration-300 hover:opacity-90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                        style={{ background: "var(--color-sage-dark)", boxShadow: "0 4px 12px rgba(91,126,95,0.3)" }}>
                        {loadingSlots ? <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Continue Booking"}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: TIME SELECTION */}
                {activeStep === 1 && (
                  <div className="flex-1 flex flex-col anim-fadeIn">
                    <div className="mb-8">
                      <h4 className="text-2xl mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
                        Pick a Time
                      </h4>
                      <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                        Select your preferred slot on March {selectedDate}, 2026
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {loadingSlots ? (
                        <div className="col-span-2 text-center py-12 text-sm" style={{ color: "var(--color-text-muted)" }}>
                          <span className="inline-block w-5 h-5 border-2 border-[var(--color-sage-dark)] border-t-transparent rounded-full animate-spin mb-3" />
                          <p>Loading available slots...</p>
                        </div>
                      ) : availableSlots.length === 0 ? (
                        <div className="col-span-2 text-center py-12 text-sm" style={{ color: "var(--color-text-muted)" }}>
                          No slots available for this date.
                        </div>
                      ) : (
                        availableSlots.map((time) => (
                          <button key={time}
                            className="py-5 rounded-2xl border-2 text-lg font-semibold transition-all duration-200"
                            style={{
                              borderColor: selectedTime === time ? "var(--color-sage-dark)" : "var(--color-border)",
                              background: selectedTime === time ? "var(--color-sage-dark)" : "var(--color-cream-light)",
                              color: selectedTime === time ? "#fff" : "var(--color-text-primary)",
                              boxShadow: selectedTime === time ? "0 4px 16px rgba(91,126,95,0.3)" : "none",
                            }}
                            onClick={() => handleTimeSelect(time)}>
                            {time}
                          </button>
                        ))
                      )}
                    </div>
                    <div className="mt-auto pt-4">
                      <button onClick={() => setActiveStep(0)}
                        className="w-full py-4 rounded-full text-sm font-semibold border-2 transition-all hover:bg-[var(--color-cream)]"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                        ← Back to Calendar
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: DETAILS & PAYMENT */}
                {activeStep === 2 && (
                  <div className="flex-1 flex flex-col anim-fadeIn">
                    <h4 className="text-xl mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
                      Your Information
                    </h4>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-xs font-semibold mb-2 tracking-wide uppercase"
                          style={{ color: "var(--color-text-muted)" }}>Full Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Doe"
                          className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:border-[var(--color-sage-dark)] focus:shadow-[0_0_0_3px_rgba(91,126,95,0.1)]"
                          style={{ borderColor: "var(--color-border)", background: "transparent" }} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-2 tracking-wide uppercase"
                          style={{ color: "var(--color-text-muted)" }}>Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@example.com"
                          className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:border-[var(--color-sage-dark)] focus:shadow-[0_0_0_3px_rgba(91,126,95,0.1)]"
                          style={{ borderColor: "var(--color-border)", background: "transparent" }} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-2 tracking-wide uppercase"
                          style={{ color: "var(--color-text-muted)" }}>Phone Number</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                          placeholder="(555) 000-0000"
                          className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:border-[var(--color-sage-dark)] focus:shadow-[0_0_0_3px_rgba(91,126,95,0.1)]"
                          style={{ borderColor: "var(--color-border)", background: "transparent" }} />
                      </div>
                    </div>
                    <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
                      <button onClick={() => setActiveStep(1)}
                        className="py-3.5 rounded-full text-sm font-semibold border transition-all"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                        Back
                      </button>
                      <button onClick={submitBooking}
                        disabled={isBooking || !name || !email}
                        className="flex items-center justify-center py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: "var(--color-sage-dark)" }}>
                        {isBooking ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Go to Payment"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* ━━━ CONTACT (Stitch: horizontal cards with circle icons) ━━━ */}
      <section id="contact" className="py-24" style={{ background: "var(--color-cream-light)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Phone, label: "Call Us", title: "+91 98765 43210" },
              { icon: Mail, label: "Email Us", title: "hello@drgunjagupta.com" },
              { icon: MapPin, label: "Office", title: "The Sanctuary, Suite 402" },
            ].map((c) => (
              <div key={c.label}
                className="flex items-center gap-6 p-8 rounded-2xl transition-shadow group hover:shadow-md"
                style={{ background: "var(--color-cream-card)" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "var(--color-sage-muted)" }}>
                  <c.icon size={22} style={{ color: "var(--color-sage-dark)" }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: "var(--color-text-muted)" }}>{c.label}</p>
                  <p className="text-xl" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
                    {c.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER (Stitch: 3 columns with social + practice + legal) ━━━ */}
      <footer className="py-12 px-6 sm:px-8" style={{ background: "var(--color-cream-dark)" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="text-lg italic" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
              Dr. Gunja Gupta
            </div>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Dedicated to holistic mental and physical health since 2008. Combining the best
              of clinical psychology and traditional homeopathy.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
                style={{ borderColor: "var(--color-border)" }}>
                <BarChart3 size={14} style={{ color: "var(--color-sage-dark)" }} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
                style={{ borderColor: "var(--color-border)" }}>
                <Globe size={14} style={{ color: "var(--color-sage-dark)" }} />
              </a>
            </div>
          </div>

          {/* Col 2: Practice Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm tracking-wide uppercase font-bold mb-2"
              style={{ color: "var(--color-forest)" }}>Practice</h4>
            {["About", "Services", "Book Visit"].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(" ", "")}`}
                className="text-sm flex items-center gap-2 group transition-colors duration-300"
                style={{ color: "var(--color-text-muted)" }}>
                <span className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "var(--color-sage-dark)" }} />
                {link}
              </a>
            ))}
          </div>

          {/* Col 3: Legal Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm tracking-wide uppercase font-bold mb-2"
              style={{ color: "var(--color-forest)" }}>Legal</h4>
            {[
              { label: "Privacy Policy", href: "/privacy-policy", icon: Shield },
              { label: "Terms of Service", href: "/terms", icon: Shield },
              { label: "Accessibility", href: "#", icon: Globe },
            ].map((policy) => (
              <Link key={policy.label} href={policy.href}
                className="text-sm flex items-center gap-2 transition-colors duration-300"
                style={{ color: "var(--color-text-muted)" }}>
                <policy.icon size={12} style={{ opacity: 0.6 }} />
                {policy.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto"
          style={{ borderTop: "1px solid var(--color-border)" }}>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            © 2026 Dr. Gunja Gupta. All rights reserved.
          </p>
          <div className="flex items-center gap-2" style={{ color: "var(--color-text-muted)" }}>
            <Shield size={14} />
            <span className="text-[10px] uppercase tracking-widest font-bold">Licensed Holistic Clinic</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
