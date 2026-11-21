"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface TutorDashboardData {
  _id: string;
  bio?: string;
  qualifications?: string[];
  subjects?: string[];
  experience?: number;
  city?: string;
  area?: string;
  expectedSalary?: number;
  applicationStatus: "pending" | "approved" | "rejected";
  subscriptionStatus:
    | "not_started"
    | "trial"
    | "active"
    | "expired";
  trialStartDate?: string;
  trialEndDate?: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  user?: {
    fullName?: string;
    email?: string;
    phone?: string;
  };
}


const navigationItems = [
  {
    title: "My Profile",
    description: "View and update your tutor profile.",
    href: "/dashboard/tutor/profile",
    icon: "👤",
  },
  {
    title: "Find Tuition",
    description: "Explore available tuition opportunities.",
    href: "/dashboard/tutor/find-tuition",
    icon: "🔍",
  },
  {
    title: "My Applications",
    description: "Track your tuition applications.",
    href: "/dashboard/tutor/applications",
    icon: "📝",
  },
  {
    title: "Booking Requests",
    description: "Manage requests from students and guardians.",
    href: "/dashboard/tutor/bookings",
    icon: "📩",
  },
  {
    title: "My Students",
    description: "View your connected students.",
    href: "/dashboard/tutor/students",
    icon: "🎓",
  },
  {
    title: "Messages",
    description: "Communicate with students and guardians.",
    href: "/dashboard/tutor/messages",
    icon: "💬",
  },
  {
    title: "Availability",
    description: "Manage your teaching availability.",
    href: "/dashboard/tutor/availability",
    icon: "📅",
  },
  {
    title: "Earnings",
    description: "Review your tuition earnings.",
    href: "/dashboard/tutor/earnings",
    icon: "💰",
  },
  {
    title: "Payments",
    description: "Manage subscription payments.",
    href: "/dashboard/tutor/payments",
    icon: "💳",
  },
  {
    title: "Reviews",
    description: "View feedback from students.",
    href: "/dashboard/tutor/reviews",
    icon: "⭐",
  },
];

function formatDate(date?: string) {
  if (!date) return "Not available";

  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getSubscriptionLabel(status: string) {
  switch (status) {
    case "trial":
      return "Free Trial";

    case "active":
      return "Active Subscription";

    case "expired":
      return "Expired";

    case "not_started":
      return "Not Started";

    default:
      return status;
  }
}

function getSubscriptionColor(status: string) {
  switch (status) {
    case "trial":
      return "bg-blue-100 text-blue-700";

    case "active":
      return "bg-green-100 text-green-700";

    case "expired":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function TutorDashboardPage() {
  const [tutor, setTutor] = useState<TutorDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("tuition_token");

        if (!token) {
          setError("Please log in to access your dashboard.");
          return;
        }

        const response = await fetch(
          `${API_URL}/tutors/profile/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Unable to load tutor profile."
          );
        }

        const profile = result.data?.data ?? result.data;

        setTutor(profile);
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

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="mt-4 text-gray-600">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Unable to load dashboard
        </h2>

        <p className="mt-2 text-sm text-red-600">{error}</p>

        <Link
          href="/login"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (!tutor) return null;

  const subscriptionEndDate =
    tutor.subscriptionStatus === "trial"
      ? tutor.trialEndDate
      : tutor.subscriptionEndDate;

  const isSubscriptionActive =
    tutor.subscriptionStatus === "trial" ||
    tutor.subscriptionStatus === "active";

  return (
    <div className="space-y-8">

      {/* Welcome Section */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-white">
        <p className="text-sm text-blue-100">
          Tutor Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Welcome, {tutor.user?.fullName || "Tutor"}!
        </h1>

        <p className="mt-3 text-blue-100">
          Manage your teaching profile, find tuition opportunities,
          and connect with students.
        </p>

        <Link
          href="/dashboard/tutor/profile"
          className="mt-6 inline-block rounded-lg bg-white px-5 py-2.5 font-semibold text-blue-700 hover:bg-blue-50"
        >
          View My Profile
        </Link>
      </section>

      {/* Account Status */}
      {tutor.applicationStatus === "pending" && (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
          <h2 className="font-semibold text-yellow-800">
            Application Under Review
          </h2>

          <p className="mt-1 text-sm text-yellow-700">
            Your tutor application is waiting for admin approval.
            Your 7-day free trial will begin after approval.
          </p>
        </div>
      )}

      {tutor.applicationStatus === "rejected" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h2 className="font-semibold text-red-800">
            Application Rejected
          </h2>

          <p className="mt-1 text-sm text-red-700">
            Your tutor application was not approved.
            Please contact support for more information.
          </p>
        </div>
      )}

      {/* Subscription Card */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Subscription Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your tutor membership.
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${getSubscriptionColor(
              tutor.subscriptionStatus
            )}`}
          >
            {getSubscriptionLabel(tutor.subscriptionStatus)}
          </span>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Monthly Subscription
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-800">
              ৳500
            </p>

            <p className="text-xs text-gray-500">
              Per 30 days
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Subscription Expiry
            </p>

            <p className="mt-2 text-lg font-bold text-gray-800">
              {formatDate(subscriptionEndDate)}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Account Status
            </p>

            <p className="mt-2 text-lg font-bold text-gray-800">
              {tutor.applicationStatus === "approved"
                ? "Approved"
                : tutor.applicationStatus}
            </p>
          </div>
        </div>

        {tutor.subscriptionStatus === "trial" && (
          <div className="mt-5 rounded-lg bg-blue-50 p-4">
            <p className="font-semibold text-blue-800">
              You are enjoying your 7-day free trial!
            </p>

            <p className="mt-1 text-sm text-blue-700">
              Your trial ends on {formatDate(tutor.trialEndDate)}.
              Subscribe before expiry to continue using paid tutor features.
            </p>
          </div>
        )}

        {!isSubscriptionActive &&
          tutor.applicationStatus === "approved" && (
            <div className="mt-5 rounded-lg bg-orange-50 p-4">
              <p className="font-semibold text-orange-800">
                Subscription required
              </p>

              <p className="mt-1 text-sm text-orange-700">
                Your subscription is not active. Subscribe for ৳500
                per 30 days to access paid tutor features.
              </p>

              <Link
                href="/dashboard/tutor/payments"
                className="mt-3 inline-block rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Subscribe Now
              </Link>
            </div>
          )}
      </section>

      {/* Profile Overview */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            My Teaching Profile
          </h2>

          <Link
            href="/dashboard/tutor/profile"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Edit Profile
          </Link>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Experience</p>
            <p className="mt-1 font-semibold text-gray-800">
              {tutor.experience ?? 0} years
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="mt-1 font-semibold text-gray-800">
              {tutor.area}, {tutor.city}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Expected Salary
            </p>
            <p className="mt-1 font-semibold text-gray-800">
              ৳{tutor.expectedSalary?.toLocaleString("en-BD") ?? "Not set"}
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm text-gray-500">Subjects</p>

            <div className="mt-2 flex flex-wrap gap-2">
              {tutor.subjects?.length ? (
                tutor.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
                  >
                    {subject}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">
                  No subjects added.
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-gray-800">
          Tutor Services
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {navigationItems.map((item) => {
            const isPaidFeature = [
              "Find Tuition",
              "My Applications",
              "Booking Requests",
              "My Students",
              "Messages",
              "Assignments",
              "Availability",
            ].includes(item.title);

            const isDisabled =
              tutor.applicationStatus !== "approved" ||
              (isPaidFeature && !isSubscriptionActive);

            return (
              <div
                key={item.title}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.icon}</span>

                  <h3 className="font-semibold text-gray-800">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-3 min-h-10 text-sm text-gray-500">
                  {item.description}
                </p>

                {isDisabled ? (
                  <span className="mt-4 inline-block text-sm font-medium text-gray-400">
                    Access unavailable
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
                  >
                    Open →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}