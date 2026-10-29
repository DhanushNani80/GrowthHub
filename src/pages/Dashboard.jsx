// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  getRegistrations,
  getReferralStats,
  getLeaderboard,
  getRegistrationsBySource,
  getRegistrationsByDay,
  getDemoDataFlag,
  setDemoDataFlag,
  clearAllData,
} from "../utils/storage";

// Simple demo dataset (will be marked as demo via flag)
const DEMO_REGISTRATIONS = [
  {
    name: "Alice Patel",
    email: "alice@example.com",
    college: "ABC Institute",
    branch: "CSE",
    gradYear: "2024",
    source: "College Clubs",
    referralCode: "ABC123",
    usedReferral: null,
    timestamp: "2026-10-23T10:00:00.000Z",
  },
  {
    name: "Bob Kumar",
    email: "bob@example.com",
    college: "XYZ College",
    branch: "IT",
    gradYear: "2024",
    source: "Peer Referrals",
    referralCode: "DEF456",
    usedReferral: "ABC123",
    timestamp: "2026-10-24T12:30:00.000Z",
  },
  {
    name: "Cara Singh",
    email: "cara@example.com",
    college: "LMN University",
    branch: "AI/ML",
    gradYear: "2025",
    source: "WhatsApp Groups",
    referralCode: "GHI789",
    usedReferral: "DEF456",
    timestamp: "2026-10-25T14:45:00.000Z",
  },
  // Add a few more to make charts meaningful
  {
    name: "Dinesh Rao",
    email: "dinesh@example.com",
    college: "PQR College",
    branch: "CSE",
    gradYear: "2024",
    source: "Paid Promotion",
    referralCode: "JKL012",
    usedReferral: null,
    timestamp: "2026-10-26T09:15:00.000Z",
  },
  {
    name: "Esha Verma",
    email: "esha@example.com",
    college: "STU Institute",
    branch: "IT",
    gradYear: "2025",
    source: "Other",
    referralCode: "MNO345",
    usedReferral: "GHI789",
    timestamp: "2026-10-27T16:20:00.000Z",
  },
];

const COLORS = ["#3B82F6", "#6366F1", "#10B981", "#F59E0B", "#EF4444"];

function Dashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [dayData, setDayData] = useState([]);
  const [demoLoaded, setDemoLoaded] = useState(false);

  const refreshData = () => {
    const regs = getRegistrations();
    setRegistrations(regs);
    setLeaderboard(getLeaderboard());
    // Convert source map to array for PieChart
    const srcMap = getRegistrationsBySource();
    setSourceData(Object.entries(srcMap).map(([name, value]) => ({ name, value })));
    setDayData(getRegistrationsByDay());
    setDemoLoaded(getDemoDataFlag());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const loadDemoData = () => {
    // Directly push into localStorage (bypass storage utils for simplicity)
    const existing = getRegistrations();
    const combined = [...existing, ...DEMO_REGISTRATIONS];
    localStorage.setItem("registrations", JSON.stringify(combined));
    setDemoDataFlag(true);
    refreshData();
  };

  const clearData = () => {
    clearAllData();
    refreshData();
  };

  const total = registrations.length;
  const target = 500;
  const percent = target ? Math.round((total / target) * 100) : 0;
  const referralCount = registrations.filter(r => r.usedReferral).length;
  const budget = 2000; // INR
  const spent = Math.round((total / target) * budget);
  const remaining = budget - spent;
  const cpr = spent / total || 0;

  return (
    <section className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">Growth Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-sm text-gray-500">Total Registrations</p>
          <p className="text-2xl font-semibold text-primary">{total}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-sm text-gray-500">Target (500)</p>
          <p className="text-2xl font-semibold text-primary">{target}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-sm text-gray-500">Achieved %</p>
          <p className="text-2xl font-semibold text-primary">{percent}%</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-sm text-gray-500">Referral Registrations</p>
          <p className="text-2xl font-semibold text-primary">{referralCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-sm text-gray-500">Budget Spent (₹)</p>
          <p className="text-2xl font-semibold text-primary">{spent}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-sm text-gray-500">Remaining Budget (₹)</p>
          <p className="text-2xl font-semibold text-primary">{remaining}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-sm text-gray-500">Cost per Registration (₹)</p>
          <p className="text-2xl font-semibold text-primary">{cpr.toFixed(2)}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow-sm h-80">
          <h2 className="font-medium mb-2">Registrations by Day</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dayData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded shadow-sm h-80">
          <h2 className="font-medium mb-2">Registrations by Source</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {sourceData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <section className="bg-white p-4 rounded shadow-sm">
        <h2 className="font-medium mb-4">Top Referrers</h2>
        {leaderboard.length === 0 ? (
          <p className="text-gray-600">No referrals yet.</p>
        ) : (
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1 text-left">#</th>
                <th className="px-2 py-1 text-left">Name</th>
                <th className="px-2 py-1 text-left">Code</th>
                <th className="px-2 py-1 text-left">Referrals</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((item, idx) => (
                <tr key={item.code} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-2 py-1">{idx + 1}</td>
                  <td className="px-2 py-1">{item.name}</td>
                  <td className="px-2 py-1 font-mono">{item.code}</td>
                  <td className="px-2 py-1">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <div className="flex space-x-4 mt-4 justify-center">
        {!demoLoaded && (
          <button
            onClick={loadDemoData}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition"
          >
            Load Demo Data
          </button>
        )}
        {(demoLoaded || total > 0) && (
          <button
            onClick={clearData}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Clear All Data
          </button>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
