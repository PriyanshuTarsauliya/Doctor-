"use client";

import { useState } from "react";
import {
  Phone, Mail, MapPin, ChevronLeft, ChevronRight,
  ArrowRight, Star, Menu, X
} from "lucide-react";

/* ─── Data ─── */
const conditionTags = [
  "Homeopathy", "Psychology", "Mind-Body Medicine", "Natural Remedies",
  "Anxiety & Stress", "Chronic Pain", "Skin Conditions", "Digestive Health",
  "Allergies", "Migraines", "Sleep Issues", "Emotional Wellness",
];

const benefitTags = [
  "Gentle natural healing", "Treat the root cause", "Whole-person approach",
  "Same-week appointments", "Individualized remedies", "Personalized treatment plans",
  "MA in Psychology", "Trusted by 2,000+ patients", "Virtual visits available",
  "Certified homeopath",
];

const services = [
  { num: "01", title: "Homeopathic Consult", desc: "In-depth constitutional assessment and individualized remedy selection based on your unique symptom profile." },
  { num: "02", title: "Psychological Support", desc: "Evidence-based counseling and therapeutic conversations addressing anxiety, stress, and emotional well-being." },
  { num: "03", title: "Chronic Conditions", desc: "Long-term management of persistent health issues through a combination of natural medicine and lifestyle guidance." },
  { num: "04", title: "Mind-Body Therapy", desc: "Integrated sessions bridging physical symptoms with emotional and psychological roots for lasting relief." },
  { num: "05", title: "Telehealth", desc: "Convenient virtual consultations from the comfort of your home — same quality of care, no commute required." },
];

const bookingSteps = [
  { num: "1", label: "Select Date" },
  { num: "2", label: "Pick Time" },
  { num: "3", label: "Your Details" },
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const aboutTags = ["Homeopathy", "MA Psychology", "Mind-Body Medicine", "Natural Healing"];

/* ─── Component ─── */
export default function LandingPage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(20);
  const [activeStep, setActiveStep] = useState(0);
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-cream)" }}>

      {/* ━━━ TOP BANNER ━━━ */}
      <div className="text-center py-2 text-[11px] sm:text-xs font-medium tracking-wide"
        style={{ background: "var(--color-sage-muted)", color: "var(--color-forest)" }}>
        ✦ Now accepting new patients — <a href="#booking" className="underline font-semibold">Book your visit today</a>
      </div>

      {/* ━━━ STICKY NAV ━━━ */}
      <nav className="sticky top-0 z-40 backdrop-blur-md border-b"
        style={{ background: "rgba(247,243,237,0.92)", borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-tight">
            <span className="text-sm sm:text-base font-bold tracking-tight"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
              Dr. Gunja Gupta
            </span>
            <span className="text-[10px] tracking-widest uppercase"
              style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>
              Homeopathy & Psychology
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Services", "Contact"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-[13px] font-medium transition-colors duration-200 hover:opacity-70"
                style={{ color: "var(--color-text-secondary)" }}>
                {link}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a href="#booking"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-[13px] font-semibold text-white rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-sage)]/20 hover:-translate-y-0.5"
              style={{ background: "var(--color-sage-dark)" }}>
              Book appointment
            </a>
            <button className="md:hidden p-2 rounded-lg" onClick={() => setMobileNav(!mobileNav)}>
              {mobileNav ? <X size={22} style={{ color: "var(--color-forest)" }} /> : <Menu size={22} style={{ color: "var(--color-forest)" }} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
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

      {/* ━━━ HERO ━━━ */}
      <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center px-6 sm:px-8">
        <div className="max-w-3xl mx-auto text-center anim-fadeInUp">
          <h1 className="text-[2.5rem] sm:text-5xl md:text-[3.5rem] lg:text-[4rem] leading-[1.08] mb-6"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
            Healing that treats the{" "}
            <em className="not-italic" style={{ fontStyle: "italic" }}>whole</em>{" "}
            person
          </h1>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}>
            Dr. Gunja Gupta combines homeopathic medicine with psychological expertise to
            treat the whole person — mind, body, and spirit. Book your consultation
            online in just a few clicks.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14 anim-fadeInUp delay-2">
            <a href="#booking"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-sage)]/25 hover:-translate-y-0.5"
              style={{ background: "var(--color-sage-dark)" }}>
              Book an appointment <ArrowRight size={16} />
            </a>
            <a href="#about"
              className="flex items-center justify-center w-full sm:w-auto px-7 py-3.5 text-sm font-semibold rounded-full border transition-all duration-300 hover:bg-white/60"
              style={{ color: "var(--color-forest)", borderColor: "var(--color-border)" }}>
              Learn more
            </a>
          </div>

          {/* Trust Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 anim-fadeInUp delay-3">
            {[
              { val: "15+", label: "years experience" },
              { val: "2,000+", label: "patients treated" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl sm:text-2xl font-bold"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>{s.val}</div>
                <div className="text-[11px] sm:text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>{s.label}</div>
              </div>
            ))}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>4.9</span>
                <Star size={16} fill="var(--color-gold-star)" stroke="none" />
              </div>
              <div className="text-[11px] sm:text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>patient rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ MARQUEE TICKER ━━━ */}
      <section className="py-6 space-y-3 overflow-hidden anim-fadeIn delay-4">
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...conditionTags, ...conditionTags].map((t, i) => (
              <span key={`c-${i}`}
                className="inline-flex items-center px-4 py-1.5 text-[11px] sm:text-xs font-medium rounded-full whitespace-nowrap flex-shrink-0"
                style={{ background: "white", color: "var(--color-forest)", border: "1px solid var(--color-border)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track-reverse">
            {[...benefitTags, ...benefitTags].map((t, i) => (
              <span key={`b-${i}`}
                className="inline-flex items-center px-4 py-1.5 text-[11px] sm:text-xs font-medium rounded-full whitespace-nowrap flex-shrink-0"
                style={{ background: "var(--color-sage-muted)", color: "var(--color-sage-dark)", border: "1px solid transparent" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ABOUT ━━━ */}
      <section id="about" className="section-padding">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image */}
          <div className="anim-fadeInUp delay-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]"
              style={{ background: "linear-gradient(135deg, var(--color-sage-muted) 0%, var(--color-cream-dark) 100%)" }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-28 h-36 sm:w-36 sm:h-44 rounded-xl flex items-center justify-center text-4xl sm:text-5xl font-bold mb-4"
                  style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(10px)", color: "var(--color-forest)", fontFamily: "var(--font-heading)" }}>
                  GG
                </div>
                <span className="text-sm font-semibold mt-1"
                  style={{ color: "var(--color-forest)", fontFamily: "var(--font-heading)" }}>
                  Dr. Gunja Gupta
                </span>
                <span className="text-[10px] mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                  Homeopathy & Psychology
                </span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="anim-fadeInUp delay-2">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 block"
              style={{ color: "var(--color-sage-dark)" }}>
              About Dr. Gupta
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[2rem] leading-snug mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
              A holistic healer who treats the whole person, not just the symptoms.
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Dr. Gunja Gupta is a certified homeopathic physician with an MA in Psychology.
                She brings a unique combination of natural medicine and psychological
                expertise to her holistic practice, serving patients for over 15 years.
              </p>
              <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Her approach bridges mind and body — treating patients with individualized
                homeopathic remedies alongside a deep understanding of the constitutional,
                emotional, and psychological factors that influence health and well-being.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {aboutTags.map((tag) => (
                <span key={tag}
                  className="px-3.5 py-1.5 text-[11px] sm:text-xs font-medium rounded-full border"
                  style={{ borderColor: "var(--color-sage)", color: "var(--color-sage-dark)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ SERVICES ━━━ */}
      <section id="services" className="section-padding" style={{ background: "var(--color-cream-light)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 anim-fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
              Services
            </h2>
            <p className="text-sm sm:text-base max-w-lg mx-auto" style={{ color: "var(--color-text-muted)" }}>
              Comprehensive care tailored to every stage of life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {services.map((s, i) => (
              <div key={s.num}
                className="relative rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.03] anim-fadeInUp"
                style={{
                  background: "var(--color-cream-card)",
                  border: "1px solid var(--color-border)",
                  animationDelay: `${i * 0.1}s`,
                }}>
                {/* Large faint number */}
                <span className="absolute top-4 right-5 text-[3rem] sm:text-[3.5rem] font-bold leading-none select-none pointer-events-none"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-cream-dark)", opacity: 0.7 }}>
                  {s.num}
                </span>
                <h3 className="text-base sm:text-lg font-semibold mb-3 relative z-10"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
                  {s.title}
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed relative z-10"
                  style={{ color: "var(--color-text-secondary)" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ BOOKING ━━━ */}
      <section id="booking" className="section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 anim-fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
              Book an Appointment
            </h2>
            <p className="text-sm sm:text-base max-w-md mx-auto" style={{ color: "var(--color-text-muted)" }}>
              Choose a date and time that works for you.
            </p>
          </div>

          <div className="max-w-lg mx-auto anim-scaleIn delay-2">
            {/* Steps */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
              {bookingSteps.map((step, i) => (
                <button key={step.num}
                  onClick={() => setActiveStep(i)}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-300"
                  style={{
                    background: activeStep === i ? "var(--color-sage-dark)" : "white",
                    color: activeStep === i ? "#fff" : "var(--color-text-secondary)",
                    border: `1px solid ${activeStep === i ? "var(--color-sage-dark)" : "var(--color-border)"}`,
                  }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: activeStep === i ? "rgba(255,255,255,0.2)" : "var(--color-cream)",
                      color: activeStep === i ? "#fff" : "var(--color-text-muted)",
                    }}>
                    {step.num}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              ))}
            </div>

            {/* Calendar Card */}
            <div className="rounded-2xl p-5 sm:p-7"
              style={{ background: "var(--color-cream-card)", border: "1px solid var(--color-border)", boxShadow: "0 4px 24px rgba(0,0,0,0.03)" }}>
              {/* Month Header */}
              <div className="flex items-center justify-between mb-6">
                <button className="p-2 rounded-lg transition-colors hover:bg-[var(--color-cream)]">
                  <ChevronLeft size={18} style={{ color: "var(--color-forest)" }} />
                </button>
                <h3 className="text-sm sm:text-base font-semibold tracking-wide"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
                  March 2026
                </h3>
                <button className="p-2 rounded-lg transition-colors hover:bg-[var(--color-cream)]">
                  <ChevronRight size={18} style={{ color: "var(--color-forest)" }} />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map((d) => (
                  <div key={d} className="text-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider pb-2"
                    style={{ color: "var(--color-text-muted)" }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for March 2026 starting on Sunday */}
                {[...Array(31)].map((_, i) => {
                  const day = i + 1;
                  const isSelected = day === selectedDate;
                  const isWeekend = (() => {
                    // March 1, 2026 is a Sunday
                    const dayOfWeek = i % 7;
                    return dayOfWeek === 0 || dayOfWeek === 6;
                  })();

                  return (
                    <button key={day}
                      onClick={() => !isWeekend && setSelectedDate(day)}
                      disabled={isWeekend}
                      className="mx-auto w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-xs sm:text-sm rounded-xl transition-all duration-200"
                      style={{
                        background: isSelected ? "var(--color-sage-dark)" : "transparent",
                        color: isSelected ? "#fff" : isWeekend ? "var(--color-cream-dark)" : "var(--color-text-primary)",
                        fontWeight: isSelected ? 700 : 400,
                        cursor: isWeekend ? "default" : "pointer",
                      }}>
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-center text-xs mt-4" style={{ color: "var(--color-text-muted)" }}>
              Available Monday – Friday. Select a date to see open times.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ CONTACT ━━━ */}
      <section id="contact" className="section-padding" style={{ background: "var(--color-cream-light)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 anim-fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>
              Contact & Location
            </h2>
            <p className="text-sm sm:text-base max-w-md mx-auto" style={{ color: "var(--color-text-muted)" }}>
              We&apos;re here to help. Reach out anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                icon: Phone, title: "(555) 987-6543",
                sub: "Mon – Fri, 8am – 5pm",
                label: "Phone"
              },
              {
                icon: Mail, title: "hello@drgunjagupta.com",
                sub: "Replies within 24 hours",
                label: "Email"
              },
              {
                icon: MapPin, title: "123 Health Ave",
                sub: "Suite 200, City, ST 10001",
                label: "Office"
              },
            ].map((c, i) => (
              <div key={c.label}
                className="rounded-2xl p-6 sm:p-7 text-center transition-all duration-300 hover:-translate-y-1 anim-fadeInUp"
                style={{
                  background: "var(--color-cream-card)",
                  border: "1px solid var(--color-border)",
                  animationDelay: `${i * 0.12}s`,
                }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "var(--color-sage-muted)" }}>
                  <c.icon size={18} style={{ color: "var(--color-sage-dark)" }} />
                </div>
                <span className="block text-[10px] font-semibold tracking-[0.15em] uppercase mb-2"
                  style={{ color: "var(--color-text-muted)" }}>
                  {c.label}
                </span>
                <h4 className="text-sm sm:text-base font-semibold mb-1"
                  style={{ color: "var(--color-forest)" }}>
                  {c.title}
                </h4>
                <p className="text-xs sm:text-[13px]" style={{ color: "var(--color-text-muted)" }}>
                  {c.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="py-8 px-6 sm:px-8 border-t" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            © 2026 Dr. Gunja Gupta. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
            {["About", "Services", "Book", "Contact"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-xs font-medium transition-colors hover:underline"
                style={{ color: "var(--color-text-secondary)" }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
