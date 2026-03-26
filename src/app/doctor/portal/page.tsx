"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Calendar, Users, Star, Clock, CheckCircle, Settings, LogOut, IndianRupee, Menu, X as XIcon } from "lucide-react";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/doctor/portal", active: true },
  { icon: Calendar, label: "Schedule", href: "#" },
  { icon: Users, label: "Patients", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
  { icon: LogOut, label: "Logout", href: "/login" },
];

const todayAppointments = [
  { id: 1, patient: "Arjun Patel", initials: "AP", time: "09:00 AM", status: "In Progress", type: "Follow-up" },
  { id: 2, patient: "Priya Sharma", initials: "PS", time: "10:00 AM", status: "Waiting", type: "New Patient" },
  { id: 3, patient: "Rahul Kumar", initials: "RK", time: "10:30 AM", status: "Waiting", type: "Consultation" },
  { id: 4, patient: "Sneha Gupta", initials: "SG", time: "11:00 AM", status: "Upcoming", type: "Follow-up" },
  { id: 5, patient: "Vikram Singh", initials: "VS", time: "02:00 PM", status: "Upcoming", type: "New Patient" },
  { id: 6, patient: "Ananya Das", initials: "AD", time: "02:30 PM", status: "Upcoming", type: "Check-up" },
  { id: 7, patient: "Kiran Reddy", initials: "KR", time: "03:00 PM", status: "Upcoming", type: "Follow-up" },
  { id: 8, patient: "Meera Nair", initials: "MN", time: "03:30 PM", status: "Upcoming", type: "Consultation" },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const timeBlocks = ["9AM", "10AM", "11AM", "12PM", "2PM", "3PM", "4PM"];
const heatmapData: Record<string, number> = {};
weekDays.forEach((d) => timeBlocks.forEach((t) => { heatmapData[`${d}-${t}`] = Math.random(); }));

export default function DoctorPortalPage() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <div className="flex items-center gap-3 px-4 py-3 mt-4">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--color-forest-light)", color: "var(--color-gold)" }}>GG</div>
          <div>
            <p className="text-xs font-medium text-white">Dr. Gunja Gupta</p>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Family Medicine</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-auto">
        <div className="mobile-header items-center gap-4 px-4 py-3 border-b" style={{ borderColor: "var(--color-cream-dark)", display: "none" }}>
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-white"><Menu size={20} style={{ color: "var(--color-forest)" }} /></button>
          <span className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>MediCare</span>
        </div>

        <div className="p-5 sm:p-8">
          <div className="mb-8 animate-fadeInUp">
            <h1 className="text-2xl sm:text-3xl mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>Doctor Portal</h1>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Welcome back, Dr. Gupta. Here&apos;s your day at a glance.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {[
              { label: "Today's Appointments", value: "34", icon: Calendar, color: "#3b82f6" },
              { label: "Total Patients", value: "248", icon: Users, color: "var(--color-forest)" },
              { label: "Avg Rating", value: "4.7", icon: Star, color: "#e5a936" },
              { label: "Monthly Earnings", value: "₹1.8L", icon: IndianRupee, color: "var(--color-success)" },
            ].map((stat, i) => (
              <div key={stat.label} className="card p-4 sm:p-5 animate-fadeInUp"
                style={{ animationDelay: `${i * 0.1}s`, opacity: 0, animationFillMode: "forwards" }}>
                <stat.icon size={20} style={{ color: stat.color }} className="mb-3" />
                <div className="text-xl sm:text-2xl font-bold mb-0.5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>{stat.value}</div>
                <div className="text-[10px] sm:text-xs" style={{ color: "var(--color-text-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 card p-5 sm:p-6">
              <h3 className="text-base font-semibold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>Weekly Availability</h3>
              <div className="overflow-x-auto">
                <div className="min-w-[340px]">
                  <div className="grid grid-cols-7 gap-1">
                    <div />
                    {weekDays.map((d) => (
                      <div key={d} className="text-center text-[10px] font-medium py-1" style={{ color: "var(--color-text-muted)" }}>{d}</div>
                    ))}
                  </div>
                  {timeBlocks.map((time) => (
                    <div key={time} className="grid grid-cols-7 gap-1 mb-1">
                      <div className="text-[10px] py-2 text-right pr-2" style={{ color: "var(--color-text-muted)" }}>{time}</div>
                      {weekDays.map((day) => {
                        const val = heatmapData[`${day}-${time}`] || 0;
                        return (
                          <div key={`${day}-${time}`} className="h-7 sm:h-8 rounded-md transition-transform hover:scale-105 cursor-pointer"
                            style={{
                              background: val > 0.7 ? "var(--color-forest)" : val > 0.4 ? "var(--color-forest-muted)" : val > 0.2 ? "var(--color-cream-dark)" : "var(--color-cream)",
                              opacity: val > 0.7 ? 1 : val > 0.4 ? 0.6 : 0.4,
                            }} />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 mt-3 justify-end flex-wrap">
                {[{ bg: "var(--color-cream)", label: "Free" }, { bg: "var(--color-cream-dark)", label: "Few" }, { bg: "var(--color-forest)", label: "Busy" }].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ background: l.bg }} />
                    <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5 sm:p-6">
              <h3 className="text-base font-semibold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>Today&apos;s Queue</h3>
              <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
                {todayAppointments.map((apt) => {
                  const isDone = completed.includes(apt.id);
                  return (
                    <div key={apt.id} className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all hover:bg-[var(--color-cream)]">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{ background: "var(--color-cream)", color: "var(--color-forest)" }}>{apt.initials}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: "var(--color-forest)", textDecoration: isDone ? "line-through" : undefined }}>{apt.patient}</p>
                        <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>{apt.time} · {apt.type}</p>
                      </div>
                      {isDone ? (
                        <CheckCircle size={16} style={{ color: "var(--color-success)" }} />
                      ) : apt.status === "In Progress" ? (
                        <span className="badge" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>Active</span>
                      ) : apt.status === "Waiting" ? (
                        <span className="badge" style={{ background: "rgba(229,169,54,0.1)", color: "#e5a936" }}>Waiting</span>
                      ) : (
                        <button onClick={() => setCompleted((p) => [...p, apt.id])}
                          className="px-3 py-1 text-[10px] font-medium rounded-lg flex-shrink-0"
                          style={{ background: "var(--color-cream-dark)", color: "var(--color-forest)" }}>Start</button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
