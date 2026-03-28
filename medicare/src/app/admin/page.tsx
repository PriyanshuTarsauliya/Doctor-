"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Calendar, IndianRupee, MessageSquare, Stethoscope, LogOut, TrendingUp, TrendingDown, Star, Eye, Menu, X as XIcon } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
  { icon: Users, label: "Patients", href: "#" },
  { icon: Calendar, label: "Appointments", href: "#" },
  { icon: IndianRupee, label: "Income", href: "#" },
  { icon: MessageSquare, label: "Feedback", href: "/admin/feedback" },
  { icon: Stethoscope, label: "Doctors", href: "#" },
  { icon: LogOut, label: "Logout", href: "/login" },
];

const patients = [
  { id: 1, name: "Arjun Patel", initials: "AP", doctor: "Dr. Gunja Gupta", dept: "Family Medicine", status: "Confirmed", amount: 800 },
  { id: 2, name: "Priya Sharma", initials: "PS", doctor: "Dr. Mark Wilson", dept: "Cardiology", status: "Pending", amount: 1000 },
  { id: 3, name: "Rahul Kumar", initials: "RK", doctor: "Dr. Sarah Lee", dept: "Dermatology", status: "Confirmed", amount: 600 },
  { id: 4, name: "Sneha Gupta", initials: "SG", doctor: "Dr. Raj Patel", dept: "Neurology", status: "Completed", amount: 900 },
  { id: 5, name: "Vikram Singh", initials: "VS", doctor: "Dr. Lisa Chen", dept: "Pediatrics", status: "Cancelled", amount: 500 },
];

const monthlyVisits = [
  { month: "Oct", newP: 68, ret: 42 }, { month: "Nov", newP: 75, ret: 51 },
  { month: "Dec", newP: 62, ret: 48 }, { month: "Jan", newP: 89, ret: 67 },
  { month: "Feb", newP: 95, ret: 71 }, { month: "Mar", newP: 112, ret: 88 },
];
const maxVal = Math.max(...monthlyVisits.map((m) => m.newP + m.ret));

const deptColors = ["var(--color-forest)", "#3b82f6", "#e5a936", "var(--color-success)", "var(--color-error)"];
const deptData = [
  { name: "Family Medicine", pct: 32 }, { name: "Cardiology", pct: 24 },
  { name: "Dermatology", pct: 18 }, { name: "Pediatrics", pct: 14 }, { name: "Other", pct: 12 },
];

export default function AdminPage() {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const selected = patients.find((p) => p.id === selectedPatient);

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
            <h1 className="text-2xl sm:text-3xl mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>Admin Dashboard</h1>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Platform overview and analytics</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {[
              { label: "Total Patients", value: "248", change: "+12%", up: true, icon: Users, color: "var(--color-forest)" },
              { label: "Appointments", value: "34", change: "+5%", up: true, icon: Calendar, color: "#3b82f6" },
              { label: "Monthly Income", value: "₹1.8L", change: "+22%", up: true, icon: IndianRupee, color: "var(--color-success)" },
              { label: "Avg Rating", value: "4.7★", change: "-0.1", up: false, icon: Star, color: "#e5a936" },
            ].map((stat, i) => (
              <div key={stat.label} className="card p-4 sm:p-5 animate-fadeInUp"
                style={{ animationDelay: `${i * 0.1}s`, opacity: 0, animationFillMode: "forwards" }}>
                <div className="flex items-start justify-between mb-3">
                  <stat.icon size={20} style={{ color: stat.color }} />
                  <span className="flex items-center gap-1 text-[10px] font-semibold"
                    style={{ color: stat.up ? "var(--color-success)" : "var(--color-error)" }}>
                    {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {stat.change}
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-bold mb-0.5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>{stat.value}</p>
                <p className="text-[10px] sm:text-xs" style={{ color: "var(--color-text-muted)" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
            <div className="lg:col-span-2 card p-5 sm:p-6">
              <h3 className="text-base font-semibold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>Monthly Patient Visits</h3>
              <div className="flex items-end gap-3 sm:gap-4 h-36 sm:h-40">
                {monthlyVisits.map((m) => (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-0.5 sm:gap-1 items-end" style={{ height: "140px" }}>
                      <div className="flex-1 rounded-t-md sm:rounded-t-lg transition-all" style={{ height: `${(m.newP / maxVal) * 140}px`, background: "var(--color-forest)", opacity: 0.8 }} />
                      <div className="flex-1 rounded-t-md sm:rounded-t-lg transition-all" style={{ height: `${(m.ret / maxVal) * 140}px`, background: "#3b82f6", opacity: 0.6 }} />
                    </div>
                    <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>{m.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-3">
                {[{ color: "var(--color-forest)", label: "New" }, { color: "#3b82f6", label: "Returning" }].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
                    <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5 sm:p-6">
              <h3 className="text-base font-semibold mb-5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>Income by Dept</h3>
              <div className="flex justify-center mb-5">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    {(() => {
                      let currentOffset = 0;
                      const circles = [];
                      for (let i = 0; i < deptData.length; i++) {
                        const d = deptData[i];
                        circles.push(
                          <circle key={d.name} cx="18" cy="18" r="15.9" fill="transparent" strokeWidth="3.5"
                            stroke={deptColors[i]} strokeDasharray={`${d.pct} ${100 - d.pct}`} strokeDashoffset={-currentOffset} strokeLinecap="round" />
                        );
                        currentOffset += d.pct;
                      }
                      return circles;
                    })()}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>₹1.8L</span>
                    <span className="text-[9px]" style={{ color: "var(--color-text-muted)" }}>Total</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {deptData.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: deptColors[i] }} />
                      <span className="text-[10px] truncate" style={{ color: "var(--color-text-muted)" }}>{d.name}</span>
                    </div>
                    <span className="text-[10px] font-semibold flex-shrink-0 ml-2" style={{ color: "var(--color-text-primary)" }}>{d.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-5 sm:p-6 overflow-hidden">
            <h3 className="text-base font-semibold mb-5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>Recent Patients</h3>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    {["Patient", "Doctor", "Dept", "Status", "Amount", ""].map((h) => (
                      <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider pb-3 px-2"
                        style={{ color: "var(--color-text-muted)", borderBottom: "1px solid var(--color-cream-dark)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p, i) => (
                    <tr key={p.id} style={{ borderBottom: i < patients.length - 1 ? "1px solid var(--color-cream)" : "none" }}>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                            style={{ background: "var(--color-cream)", color: "var(--color-forest)" }}>{p.initials}</div>
                          <span className="text-xs font-medium" style={{ color: "var(--color-text-primary)" }}>{p.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2"><span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{p.doctor}</span></td>
                      <td className="py-3 px-2"><span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{p.dept}</span></td>
                      <td className="py-3 px-2"><span className={`badge badge-${p.status.toLowerCase()}`}>{p.status}</span></td>
                      <td className="py-3 px-2"><span className="text-xs font-semibold" style={{ color: "var(--color-forest)" }}>₹{p.amount}</span></td>
                      <td className="py-3 px-2">
                        <button onClick={() => setSelectedPatient(p.id === selectedPatient ? null : p.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all"
                          style={{ background: "var(--color-cream)", color: "var(--color-text-secondary)" }}>
                          <Eye size={12} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={() => setSelectedPatient(null)} />
          <div className="relative w-full max-w-sm min-h-screen overflow-y-auto p-6 sm:p-8 animate-slideInRight"
            style={{ background: "var(--color-cream-card)", borderLeft: "1px solid var(--color-cream-dark)" }}>
            <button onClick={() => setSelectedPatient(null)} className="absolute top-5 right-5 p-2 rounded-lg hover:bg-[var(--color-cream)]"
              style={{ color: "var(--color-text-muted)" }}>✕</button>
            <div className="text-center mb-8 pt-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-3"
                style={{ background: "var(--color-cream)", color: "var(--color-forest)", fontFamily: "var(--font-heading)" }}>
                {selected.initials}
              </div>
              <h2 className="text-lg sm:text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-forest)" }}>{selected.name}</h2>
            </div>
            <div className="space-y-4">
              {[{ l: "Doctor", v: selected.doctor }, { l: "Department", v: selected.dept }, { l: "Status", v: selected.status }, { l: "Amount", v: `₹${selected.amount}` }].map((i) => (
                <div key={i.l} className="flex justify-between pb-3" style={{ borderBottom: "1px solid var(--color-cream-dark)" }}>
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{i.l}</span>
                  <span className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>{i.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
