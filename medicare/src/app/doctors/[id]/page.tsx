"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, MapPin, Clock, ChevronLeft, ChevronRight, BadgeCheck, ArrowLeft } from "lucide-react";

const doctor = {
  name: "Dr. Gunja Gupta", specialty: "Homeopathy & Psychology", initials: "GG",
  rating: 4.9, reviews: 312, fee: 800, exp: 15, city: "Delhi",
  qualifications: "BHMS, PhD (Psychology), Certified Homeopath",
  bio: "Dr. Gunja Gupta is a certified homeopathic physician with a PhD in Psychology. She brings a unique combination of natural medicine and psychological expertise to her holistic clinic. Her approach bridges mind and body, treating patients with individualized homeopathic remedies alongside deep understanding of constitutional factors.",
  languages: ["English", "Hindi"],
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const slots = [
  { time: "09:00 AM", booked: false }, { time: "09:30 AM", booked: true },
  { time: "10:00 AM", booked: false }, { time: "10:30 AM", booked: false },
  { time: "11:00 AM", booked: true },  { time: "11:30 AM", booked: false },
  { time: "02:00 PM", booked: false }, { time: "02:30 PM", booked: false },
  { time: "03:00 PM", booked: true },  { time: "03:30 PM", booked: false },
  { time: "04:00 PM", booked: false }, { time: "04:30 PM", booked: true },
];

export default function DoctorProfilePage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(28);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-cream)" }}>
      <header className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: "var(--color-cream-dark)" }}>
        <Link href="/" className="text-lg sm:text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>MediCare</Link>
        <Link href="/" className="flex items-center gap-2 text-xs hover:opacity-75" style={{ color: "var(--color-text-muted)" }}>
          <ArrowLeft size={14} /> Back
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Doctor Info */}
        <div className="lg:col-span-3 space-y-5 animate-fadeInUp">
          <div className="card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
                style={{ background: "#f2ebd9", color: "var(--color-forest)", fontFamily: "var(--font-heading)" }}>
                {doctor.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h1 className="text-xl sm:text-2xl" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>{doctor.name}</h1>
                  <BadgeCheck size={18} style={{ color: "var(--color-forest)" }} />
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-medium mb-3 border"
                  style={{ borderColor: "var(--color-forest)", color: "var(--color-forest)" }}>{doctor.specialty}</span>
                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs" style={{ color: "var(--color-text-muted)" }}>
                  <span className="flex items-center gap-1"><Star size={12} fill="#e5a936" stroke="none" /><strong style={{ color: "#e5a936" }}>{doctor.rating}</strong> ({doctor.reviews})</span>
                  <span className="flex items-center gap-1"><MapPin size={12} />{doctor.city}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{doctor.exp}y exp</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 sm:p-8 space-y-5">
            <div>
              <h3 className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "var(--color-text-muted)" }}>About</h3>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{doctor.bio}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "var(--color-text-muted)" }}>Qualifications</h3>
              <p className="text-xs sm:text-sm" style={{ color: "var(--color-text-secondary)" }}>{doctor.qualifications}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "var(--color-text-muted)" }}>Languages</h3>
              <div className="flex gap-2">
                {doctor.languages.map((l) => (
                  <span key={l} className="px-3 py-1 text-xs rounded-full border" style={{ borderColor: "var(--color-cream-dark)", color: "var(--color-text-secondary)" }}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking */}
        <div className="lg:col-span-2 space-y-4 animate-slideInRight">
          <div className="card p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <button className="p-1.5 rounded-lg hover:bg-[var(--color-cream)]"><ChevronLeft size={16} style={{ color: "var(--color-forest)" }} /></button>
              <h3 className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--color-forest)" }}>March 2026</h3>
              <button className="p-1.5 rounded-lg hover:bg-[var(--color-cream)]"><ChevronRight size={16} style={{ color: "var(--color-forest)" }} /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map((d) => (
                <div key={d} className="text-center text-[10px] font-semibold uppercase pb-1" style={{ color: "var(--color-text-muted)" }}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const isSelected = day === selectedDate;
                return (
                  <button key={day} onClick={() => setSelectedDate(day)}
                    className="mx-auto w-8 h-8 flex items-center justify-center text-xs rounded-lg transition-colors hover:bg-[var(--color-cream-dark)]"
                    style={{ background: isSelected ? "var(--color-forest)" : "transparent", color: isSelected ? "#fff" : "var(--color-forest)", fontWeight: isSelected ? 700 : 400 }}>
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card p-5 sm:p-6">
            <h3 className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "var(--color-text-muted)" }}>
              Available Slots — March {selectedDate}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {slots.map((slot) => (
                <button key={slot.time} disabled={slot.booked}
                  onClick={() => !slot.booked && setSelectedSlot(slot.time)}
                  className="py-2.5 text-xs font-medium rounded-lg transition-all"
                  style={{
                    background: slot.booked ? "var(--color-cream-dark)" : selectedSlot === slot.time ? "var(--color-forest)" : "var(--color-cream)",
                    color: slot.booked ? "var(--color-text-muted)" : selectedSlot === slot.time ? "white" : "var(--color-forest)",
                    opacity: slot.booked ? 0.5 : 1,
                    cursor: slot.booked ? "not-allowed" : "pointer",
                  }}>
                  {slot.time}
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Consultation Fee</p>
              <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>₹{doctor.fee}</p>
            </div>
            <Link href="/payment" className="btn-forest w-full sm:w-auto text-center"
              style={{ opacity: selectedSlot ? 1 : 0.5, pointerEvents: selectedSlot ? "auto" : "none" }}>
              Proceed to Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
