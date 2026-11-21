"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TutorApplication {
  _id: string;
  bio: string;
  qualifications: string[];
  subjects: string[];
  experience: number;
  city: string;
  area: string;
  expectedSalary: number;
  isCurrentlyStudent: boolean;
  applicationStatus: string;
  createdAt: string;
  user: {
    fullName: string;
    email: string;
    phone?: string;
  };
}

export default function TutorVerificationsPage() {
  const [tutors, setTutors] = useState<TutorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const controller = new AbortController();

    const loadTutors = async () => {
      try {
        const token = localStorage.getItem("tuition_token");

        if (!token) {
          throw new Error("Please login first.");
        }

        const response = await fetch(
          `${API_URL}/admin/tutors/pending?page=${page}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
            signal: controller.signal,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load applications"
          );
        }

        if (!controller.signal.aborted) {
          setTutors(result.data || []);
          setTotalPages(result.pagination?.totalPages || 1);
          setError("");
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        if (!controller.signal.aborted) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong"
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadTutors();

    return () => {
      controller.abort();
    };
  }, [page, refreshKey, API_URL]);

  const handleRefresh = () => {
    setLoading(true);
    setError("");
    setRefreshKey((current) => current + 1);
  };

  const handlePageChange = (newPage: number) => {
    setLoading(true);
    setError("");
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="mb-8">
        <Link
          href="/dashboard/admin"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-gray-800">
          Tutor Verification
        </h1>

        <p className="mt-2 text-gray-500">
          Review and verify tutor applications.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-800">
            Pending Applications
          </h2>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-500">
            Loading applications...
          </div>
        ) : tutors.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-3 text-5xl">🎉</div>

            <h3 className="font-semibold text-gray-800">
              No pending applications
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              All tutor applications have been processed.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-4">Tutor</th>
                    <th className="px-4 py-4">Contact</th>
                    <th className="px-4 py-4">Subjects</th>
                    <th className="px-4 py-4">Location</th>
                    <th className="px-4 py-4">Experience</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {tutors.map((tutor) => (
                    <tr
                      key={tutor._id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-800">
                          {tutor.user?.fullName || "Unknown"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {tutor.isCurrentlyStudent
                            ? "Currently a student"
                            : "Non-student"}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <p>{tutor.user?.email}</p>
                        <p className="mt-1 text-gray-500">
                          {tutor.user?.phone || "No phone"}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        {tutor.subjects?.join(", ")}
                      </td>

                      <td className="px-4 py-4">
                        {tutor.city}, {tutor.area}
                      </td>

                      <td className="px-4 py-4">
                        {tutor.experience} years
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                          Pending
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <Link
                          href={`/dashboard/admin/verifications/${tutor._id}`}
                          className="whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                disabled={page <= 1 || loading}
                onClick={() => handlePageChange(page - 1)}
                className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page >= totalPages || loading}
                onClick={() => handlePageChange(page + 1)}
                className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}