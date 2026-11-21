"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardStats {
  totalUsers: number;
  totalStudents: number;
  totalTutors: number;
  pendingTutors: number;
  approvedTutors: number;
  totalTuitions: number;
  totalBookings: number;
  totalApplications: number;
  activeSubscriptions: number;
  expiredSubscriptions: number;
  totalRevenue: number;
}

const initialStats: DashboardStats = {
  totalUsers: 0,
  totalStudents: 0,
  totalTutors: 0,
  pendingTutors: 0,
  approvedTutors: 0,
  totalTuitions: 0,
  totalBookings: 0,
  totalApplications: 0,
  activeSubscriptions: 0,
  expiredSubscriptions: 0,
  totalRevenue: 0,
};

const menuItems = [
  {
    title: "Overview",
    href: "/dashboard/admin",
    icon: "📊",
  },
  {
    title: "Students",
    href: "/dashboard/admin/students",
    icon: "🎓",
  },
  {
    title: "Tutors",
    href: "/dashboard/admin/tutors",
    icon: "👨‍🏫",
  },
  {
    title: "Tutor Verification",
    href: "/dashboard/admin/verifications",
    icon: "🛡️",
  },
  {
    title: "Tuition Posts",
    href: "/dashboard/admin/tuitions",
    icon: "📚",
  },
  {
    title: "Bookings",
    href: "/dashboard/admin/bookings",
    icon: "📅",
  },
  {
    title: "Applications",
    href: "/dashboard/admin/applications",
    icon: "📝",
  },
  {
    title: "Subscriptions",
    href: "/dashboard/admin/subscriptions",
    icon: "💳",
  },
  {
    title: "Payments",
    href: "/dashboard/admin/payments",
    icon: "💰",
  },
  {
    title: "Reports",
    href: "/dashboard/admin/reports",
    icon: "📈",
  },
  {
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: "⚙️",
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("tuition_token");

        if (!token) {
          throw new Error("Please login first.");
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(
          `${API_URL}/admin/dashboard/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load dashboard."
          );
        }

        setStats({
          ...initialStats,
          ...result.data,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: "🎓",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Total Tutors",
      value: stats.totalTutors,
      icon: "👨‍🏫",
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Pending Tutors",
      value: stats.pendingTutors,
      icon: "⏳",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Approved Tutors",
      value: stats.approvedTutors,
      icon: "✅",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Tuition Posts",
      value: stats.totalTuitions,
      icon: "📚",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: "📅",
      color: "bg-pink-100 text-pink-700",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: "📝",
      color: "bg-orange-100 text-orange-700",
    },
    {
      title: "Active Subscriptions",
      value: stats.activeSubscriptions,
      icon: "💳",
      color: "bg-teal-100 text-teal-700",
    },
    {
      title: "Expired Subscriptions",
      value: stats.expiredSubscriptions,
      icon: "⚠️",
      color: "bg-red-100 text-red-700",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          Loading Admin Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <aside className="hidden w-64 shrink-0 bg-slate-900 text-white md:block">

        <div className="border-b border-slate-700 p-6">
          <h1 className="text-2xl font-bold">
            Tuition Manager
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Admin Panel
          </p>
        </div>

        <nav className="space-y-1 p-4">

          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                item.title === "Overview"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-slate-800"
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">
                {item.title}
              </span>
            </Link>
          ))}

        </nav>

      </aside>

      {/* Main Content */}

      <main className="min-w-0 flex-1">

        {/* Header */}

        <header className="flex flex-wrap items-center justify-between gap-3 border-b bg-white px-4 py-5 sm:px-8">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Welcome to Tuition Manager administration.
            </p>
          </div>

          <div className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Administrator
          </div>

        </header>

        <div className="p-4 sm:p-8">

          {/* Error */}

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Statistics */}

          <h3 className="mb-5 text-xl font-bold text-gray-800">
            Platform Overview
          </h3>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {statCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
              >

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {card.title}
                    </p>

                    <h3 className="mt-3 text-3xl font-bold text-gray-800">
                      {card.value.toLocaleString()}
                    </h3>
                  </div>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${card.color}`}
                  >
                    {card.icon}
                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* Revenue */}

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

            <div className="rounded-xl bg-white p-6 shadow-sm">

              <h3 className="text-lg font-bold text-gray-800">
                Subscription Revenue
              </h3>

              <p className="mt-4 text-3xl font-bold text-green-600">
                ৳{stats.totalRevenue.toLocaleString()}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Total recorded subscription revenue
              </p>

              <div className="mt-5 border-t pt-4">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Monthly Subscription
                  </span>

                  <span className="font-semibold">
                    ৳500 / 30 days
                  </span>
                </div>

                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-gray-500">
                    Free Trial
                  </span>

                  <span className="font-semibold text-green-600">
                    7 Days
                  </span>
                </div>

              </div>

            </div>

            {/* Tutor Verification */}

            <div className="rounded-xl bg-white p-6 shadow-sm">

              <h3 className="text-lg font-bold text-gray-800">
                Tutor Verification
              </h3>

              <p className="mt-3 text-4xl font-bold text-yellow-600">
                {stats.pendingTutors}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Tutor applications waiting for verification.
              </p>

              <Link
                href="/dashboard/admin/verifications"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Review Applications
              </Link>

            </div>

          </div>

          {/* Quick Actions */}

          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-lg font-bold text-gray-800">
              Quick Actions
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              <Link
                href="/dashboard/admin/verifications"
                className="rounded-lg border p-5 transition hover:border-blue-500 hover:bg-blue-50"
              >
                <span className="text-2xl">🛡️</span>

                <h4 className="mt-3 font-semibold text-gray-800">
                  Verify Tutors
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Review tutor applications and documents.
                </p>
              </Link>

              <Link
                href="/dashboard/admin/students"
                className="rounded-lg border p-5 transition hover:border-blue-500 hover:bg-blue-50"
              >
                <span className="text-2xl">🎓</span>

                <h4 className="mt-3 font-semibold text-gray-800">
                  Manage Students
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  View and manage student accounts.
                </p>
              </Link>

              <Link
                href="/dashboard/admin/subscriptions"
                className="rounded-lg border p-5 transition hover:border-blue-500 hover:bg-blue-50"
              >
                <span className="text-2xl">💳</span>

                <h4 className="mt-3 font-semibold text-gray-800">
                  Manage Subscriptions
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Monitor tutor subscription status.
                </p>
              </Link>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}