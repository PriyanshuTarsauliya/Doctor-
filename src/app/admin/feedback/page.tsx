"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Users, Calendar, IndianRupee, MessageSquare, Stethoscope, LogOut, Star, Filter, Menu, X as XIcon } from "lucide-react";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Patients", href: "#" },
  { icon: Calendar, label: "Appointments", href: "#" },
  { icon: IndianRupee, label: "Income", href: "#" },
  { icon: MessageSquare, label: "Feedback", href: "/admin/feedback", active: true },
  { icon: Stethoscope, label: "Doctors", href: "#" },
  { icon: LogOut, label: "Logout", href: "/login" },
];

const feedbacks = [
  { id: 1, patient: "Arjun Patel", initials: "AP", doctor: "Dr. Gunja Gupta", rating: 5, date: "Mar 24, 2026", review: "Dr. Gupta is incredibly thorough and compassionate. She took the time to explain my condition and the treatment plan in detail." },
  { id: 2, patient: "Priya Sharma", initials: "PS", doctor: "Dr. Mark Wilson", rating: 4, date: "Mar 22, 2026", review: "Great experience with Dr. Wilson. Very knowledgeable about cardiology. The office was clean and staff was friendly." },
  { id: 3, patient: "Rahul Kumar", initials: "RK", doctor: "Dr. Gunja Gupta", rating: 5, date: "Mar 20, 2026", review: "Outstanding care. Dr. Gupta's integrative approach has significantly improved my overall well-being. Highly recommend." },
  { id: 4, patient: "Sneha Gupta", initials: "SG", doctor: "Dr. Sarah Lee", rating: 4, date: "Mar 18, 2026", review: "Dr. Lee was very professional. Good treatment for my skin condition. Would have liked more explanation about follow-up care." },
  { id: 5, patient: "Vikram Singh", initials: "VS", doctor: "Dr. Raj Patel", rating: 5, date: "Mar 15, 2026", review: "Exceptional neurological care. Dr. Patel explained everything clearly and the treatment plan was very effective." },
  { id: 6, patient: "Ananya Das", initials: "AD", doctor: "Dr. Lisa Chen", rating: 3, date: "Mar 12, 2026", review: "Good pediatrician but the wait time was quite long. Once we got in, the care was excellent." },
  { id: 7, patient: "Kiran Reddy", initials: "KR", doctor: "Dr. Gunja Gupta", rating: 5, date: "Mar 10, 2026", review: "Dr. Gupta's holistic approach to medicine is refreshing. She genuinely cares about her patients." },
  { id: 8, patient: "Meera Nair", initials: "MN", doctor: "Dr. Mark Wilson", rating: 4, date: "Mar 8, 2026", review: "Very happy with the cardiac checkup. Dr. Wilson was thorough and explained all the test results clearly." },
];

const ratingBreakdown = [
  { stars: 5, percent: 72 }, { stars: 4, percent: 18 },
  { stars: 3, percent: 6 }, { stars: 2, percent: 3 }, { stars: 1, percent: 1 },
];

export default function FeedbackPage() {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const filtered = filterRating ? feedbacks.filter((f) => f.rating === filterRating) : feedbacks;
  const avgRating = (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1);

  return (
    <div className="min-h-screen flex" style={{ background: "var(--color-cream)" }}>
      <div className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`} style={{ padding: "24px" }}>
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>MediCare</Link>
          <button className="md:hidden text-white" onClick={() => setSidebarOpen(false)}><XIcon size={20} /></button>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={`sidebar-nav-item ${item.active ? "active" : ""}`}>
              <item.icon size={18} />{item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 min-w-0 overflow-auto">
        <div className="mobile-header items-center gap-4 px-4 py-3 border-b" style={{ borderColor: "var(--color-cream-dark)", display: "none" }}>
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-white"><Menu size={20} style={{ color: "var(--color-forest)" }} /></button>
          <span className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>MediCare</span>
        </div>

        <div className="p-5 sm:p-8">
          <div className="mb-8 animate-fadeInUp">
            <h1 className="text-2xl sm:text-3xl mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>Patient Feedback</h1>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>See what patients are saying about your care.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="card p-6 text-center animate-fadeInUp">
              <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>{avgRating}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={16} fill={s <= Math.round(Number(avgRating)) ? "#e5a936" : "none"} style={{ color: s <= Math.round(Number(avgRating)) ? "#e5a936" : "var(--color-cream-dark)" }} />
                ))}
              </div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{feedbacks.length} total reviews</p>
            </div>

            <div className="sm:col-span-2 card p-5 sm:p-6 animate-fadeInUp delay-100">
              <h3 className="text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>Rating Distribution</h3>
              <div className="space-y-2.5">
                {ratingBreakdown.map((r) => (
                  <div key={r.stars} className="flex items-center gap-3">
                    <span className="text-xs font-medium w-8" style={{ color: "var(--color-text-secondary)" }}>{r.stars}★</span>
                    <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "var(--color-cream)" }}>
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${r.percent}%`, background: "var(--color-forest)" }} />
                    </div>
                    <span className="text-xs font-medium w-10 text-right" style={{ color: "var(--color-text-muted)" }}>{r.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
            <Filter size={14} className="flex-shrink-0" style={{ color: "var(--color-text-muted)" }} />
            <button onClick={() => setFilterRating(null)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex-shrink-0"
              style={{ background: filterRating === null ? "var(--color-forest)" : "var(--color-cream-card)", color: filterRating === null ? "#fff" : "var(--color-text-secondary)", border: `1px solid ${filterRating === null ? "var(--color-forest)" : "var(--color-cream-dark)"}` }}>
              All
            </button>
            {[5,4,3,2,1].map((r) => (
              <button key={r} onClick={() => setFilterRating(r)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex-shrink-0"
                style={{ background: filterRating === r ? "var(--color-forest)" : "var(--color-cream-card)", color: filterRating === r ? "#fff" : "var(--color-text-secondary)", border: `1px solid ${filterRating === r ? "var(--color-forest)" : "var(--color-cream-dark)"}` }}>
                {r}★
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((f, i) => (
              <div key={f.id} className="card p-5 transition-all duration-300 hover:-translate-y-0.5 animate-fadeInUp"
                style={{ animationDelay: `${i * 0.05}s`, opacity: 0, animationFillMode: "forwards" }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: "var(--color-cream)", color: "var(--color-forest)" }}>{f.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold truncate" style={{ color: "var(--color-text-primary)" }}>{f.patient}</h4>
                      <span className="text-[10px] flex-shrink-0" style={{ color: "var(--color-text-muted)" }}>{f.date}</span>
                    </div>
                    <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>for {f.doctor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-2">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={12} fill={s <= f.rating ? "#e5a936" : "none"} style={{ color: s <= f.rating ? "#e5a936" : "var(--color-cream-dark)" }} />
                  ))}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  &ldquo;{f.review}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
