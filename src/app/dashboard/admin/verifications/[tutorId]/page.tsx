 "use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface TutorApplication {
  _id: string;
  bio: string;
  qualifications: string[];
  subjects: string[];
  experience: number;
  city: string;
  area: string;
  expectedSalary: number;
  nidNumber: string;
  isCurrentlyStudent: boolean;
  applicationStatus: string;
  rejectionReason?: string;
  subscriptionStatus: string;
  createdAt: string;
  user: {
    fullName: string;
    email: string;
    phone?: string;
    role?: string;
  };
}

export default function TutorVerificationDetailsPage() {
  const params = useParams<{ tutorId: string }>();


  const tutorId = params.tutorId;

  const [tutor, setTutor] = useState<TutorApplication | null>(null);
  const [studentIdImage, setStudentIdImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const [processing, setProcessing] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Load tutor application details and protected student ID image.
  useEffect(() => {
    const controller = new AbortController();

    let temporaryImageUrl: string | null = null;

    const loadApplication = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("tuition_token");

        if (!token) {
          throw new Error("Please login first.");
        }

        const response = await fetch(
          `${API_URL}/admin/tutors/${tutorId}`,
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
            result.message || "Failed to load tutor application."
          );
        }

        if (controller.signal.aborted) return;

        setTutor(result.data);

        // Load student ID card through the admin-only API.
        if (result.data.isCurrentlyStudent) {
          setImageLoading(true);

          try {
            const imageResponse = await fetch(
              `${API_URL}/admin/tutors/${tutorId}/student-id`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                cache: "no-store",
                signal: controller.signal,
              }
            );

            if (!imageResponse.ok) {
              throw new Error("Unable to load student ID card.");
            }

            const imageBlob = await imageResponse.blob();

            if (controller.signal.aborted) return;

            temporaryImageUrl = URL.createObjectURL(imageBlob);

            setStudentIdImage(temporaryImageUrl);
          } catch (err) {
            if (
              err instanceof Error &&
              err.name === "AbortError"
            ) {
              return;
            }

            setImageError(
              err instanceof Error
                ? err.message
                : "Unable to load student ID image."
            );
          } finally {
            if (!controller.signal.aborted) {
              setImageLoading(false);
            }
          }
        }
      } catch (err) {
        if (
          err instanceof Error &&
          err.name === "AbortError"
        ) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadApplication();

    return () => {
      controller.abort();

      if (temporaryImageUrl) {
        URL.revokeObjectURL(temporaryImageUrl);
      }
    };
  }, [tutorId]);

  // Approve tutor application.
  const handleApprove = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this tutor application?"
    );

    if (!confirmed) return;

    try {
      setProcessing(true);
      setError("");
      setActionMessage("");

      const token = localStorage.getItem("tuition_token");

      if (!token) {
        throw new Error("Please login first.");
      }

      const response = await fetch(
        `${API_URL}/admin/tutors/${tutorId}/approve`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to approve tutor."
        );
      }

      setTutor((previous) =>
        previous
          ? {
              ...previous,
              applicationStatus: "approved",
              subscriptionStatus:
                result.data?.subscriptionStatus ||
                previous.subscriptionStatus,
            }
          : null
      );

      setActionMessage(
        "Tutor application approved successfully."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to approve tutor."
      );
    } finally {
      setProcessing(false);
    }
  };

  // Reject tutor application.
  const handleReject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rejectionReason.trim()) {
      setError("Please provide a rejection reason.");
      return;
    }

    if (rejectionReason.trim().length > 500) {
      setError("Rejection reason cannot exceed 500 characters.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to reject this tutor application?"
    );

    if (!confirmed) return;

    try {
      setProcessing(true);
      setError("");
      setActionMessage("");

      const token = localStorage.getItem("tuition_token");

      if (!token) {
        throw new Error("Please login first.");
      }

      const response = await fetch(
        `${API_URL}/admin/tutors/${tutorId}/reject`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: rejectionReason.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to reject tutor."
        );
      }

      setTutor((previous) =>
        previous
          ? {
              ...previous,
              applicationStatus: "rejected",
              rejectionReason: rejectionReason.trim(),
            }
          : null
      );

      setShowRejectForm(false);

      setActionMessage(
        "Tutor application rejected successfully."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to reject tutor."
      );
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">
          Loading tutor application...
        </p>
      </div>
    );
  }

  if (error && !tutor) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-sm">
          <p className="text-red-600">{error}</p>

          <Link
            href="/dashboard/admin/verifications"
            className="mt-5 inline-block text-blue-600 hover:underline"
          >
            Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  if (!tutor) return null;

  const isPending = tutor.applicationStatus === "pending";

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/admin/verifications"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            &larr; Back to Applications
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-800">
            Tutor Application Details
          </h1>

          <p className="mt-2 text-gray-500">
            Review applicant information and verify identity documents.
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {actionMessage && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
            {actionMessage}
          </div>
        )}

        {/* Applicant Information */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-gray-800">
              Applicant Information
            </h2>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                tutor.applicationStatus === "approved"
                  ? "bg-green-100 text-green-700"
                  : tutor.applicationStatus === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {tutor.applicationStatus.toUpperCase()}
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Info label="Full Name" value={tutor.user?.fullName} />
            <Info label="Email" value={tutor.user?.email} />
            <Info label="Phone" value={tutor.user?.phone} />
            <Info label="Account Role" value={tutor.user?.role} />

            <Info
              label="Application Date"
              value={new Date(tutor.createdAt).toLocaleDateString()}
            />

            <Info
              label="Currently a Student?"
              value={tutor.isCurrentlyStudent ? "Yes" : "No"}
            />
          </div>
        </section>

        {/* Academic Information */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-800">
            Academic & Teaching Information
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <Info
              label="Qualifications"
              value={tutor.qualifications?.join(", ")}
            />

            <Info
              label="Subjects"
              value={tutor.subjects?.join(", ")}
            />

            <Info
              label="Teaching Experience"
              value={`${tutor.experience} years`}
            />

            <Info
              label="Expected Salary"
              value={`৳${tutor.expectedSalary}`}
            />

            <Info label="City" value={tutor.city} />
            <Info label="Area" value={tutor.area} />
          </div>

          <div className="mt-6">
            <h3 className="mb-2 font-semibold text-gray-700">
              Tutor Bio
            </h3>

            <p className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 leading-7 text-gray-600">
              {tutor.bio}
            </p>
          </div>
        </section>

        {/* Identity Verification */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-800">
            Identity Verification
          </h2>

          {/* NID */}
          <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-5">
            <h3 className="mb-2 font-semibold text-gray-800">
              National ID (NID) Number
            </h3>

            <p className="text-lg font-bold tracking-wider text-blue-800">
              {tutor.nidNumber || "NID not available"}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Confidential identity information. Admin access only.
            </p>
          </div>

          {/* Student ID */}
          {tutor.isCurrentlyStudent && (
            <div>
              <h3 className="mb-3 font-semibold text-gray-800">
                Student ID Card
              </h3>

              {imageLoading ? (
                <div className="rounded-lg bg-gray-50 p-10 text-center text-gray-500">
                  Loading student ID image...
                </div>
              ) : imageError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">
                  {imageError}
                </div>
              ) : studentIdImage ? (
                <div className="overflow-hidden rounded-lg border bg-gray-50 p-3">
                 <Image
  src={studentIdImage}
  alt="Applicant student ID card"
  width={1000}
  height={700}
  unoptimized
  className="mx-auto max-h-[500px] max-w-full rounded-lg object-contain"
/>

                  <p className="mt-3 text-center text-xs text-gray-500">
                    Private document. Available to authorized administrators only.
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">
                  No student ID image available.
                </p>
              )}
            </div>
          )}

          {!tutor.isCurrentlyStudent && (
            <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
              The applicant is not currently a student. A student ID card is not required.
            </p>
          )}
        </section>

        {/* Subscription Information */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Subscription Information
          </h2>

          <Info
            label="Subscription Status"
            value={tutor.subscriptionStatus}
          />

          <p className="mt-3 text-sm text-gray-500">
            Eligible new tutors receive a one-time 7-day free trial after admin approval.
          </p>
        </section>

        {/* Rejection Information */}
        {tutor.applicationStatus === "rejected" && (
          <section className="mb-6 rounded-xl border border-red-200 bg-red-50 p-6">
            <h2 className="mb-2 font-bold text-red-800">
              Rejection Reason
            </h2>

            <p className="text-red-700">
              {tutor.rejectionReason || "No reason provided."}
            </p>
          </section>
        )}

        {/* Admin Actions */}
        {isPending && (
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-gray-800">
              Verification Decision
            </h2>

            {!showRejectForm ? (
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleApprove}
                  disabled={processing}
                  className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {processing ? "Processing..." : "Approve Tutor"}
                </button>

                <button
                  onClick={() => setShowRejectForm(true)}
                  disabled={processing}
                  className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                >
                  Reject Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleReject}>
                <label
                  htmlFor="rejectionReason"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Reason for Rejection
                </label>

                <textarea
                  id="rejectionReason"
                  value={rejectionReason}
                  onChange={(e) =>
                    setRejectionReason(e.target.value)
                  }
                  maxLength={500}
                  rows={4}
                  placeholder="Explain why this application is being rejected..."
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  required
                />

                <p className="mt-1 text-right text-xs text-gray-500">
                  {rejectionReason.length}/500 characters
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    {processing ? "Processing..." : "Confirm Rejection"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowRejectForm(false)}
                    disabled={processing}
                    className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

// Reusable information component.
function Info({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>

      <p className="mt-1 font-semibold text-gray-800">
        {value !== undefined && value !== null && value !== ""
          ? value
          : "Not provided"}
      </p>
    </div>
  );
}