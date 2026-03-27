"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Calendar, FileText, User, LogOut, Clock, CheckCircle, X, RotateCcw, Menu, X as XIcon } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Calendar, label: "My Appointments", href: "/dashboard", active: true },
  { icon: FileText, label: "Medical History", href: "#" },
  { icon: User, label: "Profile", href: "#" },
  { icon: LogOut, label: "Logout", href: "/login" },
];

const appointments = [
  { id: 1, doctor: "Dr. Gunja Gupta", initials: "GG", specialty: "Family Medicine", date: "Mar 28, 2026", time: "10:00 AM", status: "Confirmed" },
  { id: 2, doctor: "Dr. Mark Wilson", initials: "MW", specialty: "Cardiology", date: "Apr 02, 2026", time: "02:30 PM", status: "Pending" },
  { id: 3, doctor: "Dr. Sarah Lee", initials: "SL", specialty: "Dermatology", date: "Apr 10, 2026", time: "11:00 AM", status: "Confirmed" },
  { id: 4, doctor: "Dr. Raj Patel", initials: "RP", specialty: "Neurology", date: "Mar 15, 2026", time: "03:00 PM", status: "Completed" },
  { id: 5, doctor: "Dr. Lisa Chen", initials: "LC", specialty: "Pediatrics", date: "Feb 20, 2026", time: "09:30 AM", status: "Completed" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = appointments.filter((a) => {
    if (activeTab === "upcoming") return a.status === "Confirmed" || a.status === "Pending";
    if (activeTab === "past") return a.status === "Completed";
    return true;
  });

  return (
    <div className="min-h-screen flex" style={{ background: "var(--color-cream)" }}>
      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
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
        <div className="flex items-center gap-3 px-4 py-3 mt-4">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--color-forest-light)", color: "var(--color-gold)" }}>AP</div>
          <div>
            <p className="text-xs font-medium text-white">Arjun Patel</p>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Patient</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-auto">
        {/* Mobile Header */}
        <div className="mobile-header items-center gap-4 px-4 py-3 border-b" style={{ borderColor: "var(--color-cream-dark)", display: "none" }}>
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-white"><Menu size={20} style={{ color: "var(--color-forest)" }} /></button>
          <span className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>MediCare</span>
        </div>

        <div className="p-5 sm:p-8">
          <div className="mb-8 animate-fadeInUp">
            <h1 className="text-2xl sm:text-3xl mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>Welcome back, Arjun</h1>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Here&apos;s your appointment overview.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { label: "Total Visits", value: "5", icon: CheckCircle, color: "var(--color-success)" },
              { label: "Upcoming", value: "2", icon: Clock, color: "var(--color-warning)" },
            ].map((stat) => (
              <div key={stat.label} className="card p-5 sm:p-6 animate-fadeInUp">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon size={20} style={{ color: stat.color }} />
                  <span className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>{stat.value}</span>
                </div>
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {[{ key: "upcoming", label: "Upcoming" }, { key: "past", label: "Past" }, { key: "all", label: "All" }].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className="px-5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex-shrink-0"
                style={{
                  background: activeTab === tab.key ? "var(--color-forest)" : "var(--color-cream-card)",
                  color: activeTab === tab.key ? "#fff" : "var(--color-text-secondary)",
                  border: `1px solid ${activeTab === tab.key ? "var(--color-forest)" : "var(--color-cream-dark)"}`,
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((apt, i) => (
              <div key={apt.id}
                className="card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 transition-all duration-300 hover:-translate-y-0.5 animate-fadeInUp"
                style={{ animationDelay: `${i * 0.08}s`, opacity: 0, animationFillMode: "forwards" }}>
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: "var(--color-cream)", color: "var(--color-forest)", fontFamily: "var(--font-heading)" }}>
                    {apt.initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold truncate" style={{ color: "var(--color-forest)" }}>{apt.doctor}</h4>
                    <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>{apt.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                  <div className="text-left sm:text-right">
                    <p className="text-xs font-medium" style={{ color: "var(--color-text-primary)" }}>{apt.date}</p>
                    <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>{apt.time}</p>
                  </div>
                  <span className={`badge badge-${apt.status.toLowerCase()}`}>{apt.status}</span>
                  {(apt.status === "Confirmed" || apt.status === "Pending") && (
                    <div className="flex gap-1">
                      <button className="p-2 rounded-lg hover:bg-[var(--color-cream)] transition-colors" title="Reschedule"><RotateCcw size={14} style={{ color: "var(--color-text-muted)" }} /></button>
                      <button className="p-2 rounded-lg hover:bg-[var(--color-cream)] transition-colors" title="Cancel"><X size={14} style={{ color: "var(--color-error)" }} /></button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
