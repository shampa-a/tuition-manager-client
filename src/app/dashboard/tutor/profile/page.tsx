"use client";

import { useEffect, useState, type FormEvent } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface TutorProfile {
  _id: string;
  bio: string;
  qualifications: string[];
  subjects: string[];
  experience: number;
  city: string;
  area: string;
  expectedSalary: number;
  applicationStatus: string;
  subscriptionStatus: string;
  trialEndDate?: string;
  subscriptionEndDate?: string;
  user: {
    fullName: string;
    email: string;
    phone?: string;
  };
}

export default function TutorProfilePage() {
  const [profile, setProfile] = useState<TutorProfile | null>(null);

  const [formData, setFormData] = useState({
    bio: "",
    qualifications: "",
    subjects: "",
    experience: "0",
    city: "",
    area: "",
    expectedSalary: "0",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch tutor profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("tuition_token");

        if (!token) {
          throw new Error("Please log in to view your profile.");
        }

        const response = await fetch(
          `${API_URL}/tutors/profile/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load tutor profile"
          );
        }

        const tutor: TutorProfile = result.data;

        setProfile(tutor);

        setFormData({
          bio: tutor.bio || "",
          qualifications: tutor.qualifications.join(", "),
          subjects: tutor.subjects.join(", "),
          experience: String(tutor.experience ?? 0),
          city: tutor.city || "",
          area: tutor.area || "",
          expectedSalary: String(tutor.expectedSalary ?? 0),
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Update tutor profile
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("tuition_token");

      if (!token) {
        throw new Error("Please log in again.");
      }

      const qualifications = formData.qualifications
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const subjects = formData.subjects
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const payload = {
        bio: formData.bio,
        qualifications,
        subjects,
        experience: Number(formData.experience),
        city: formData.city,
        area: formData.area,
        expectedSalary: Number(formData.expectedSalary),
      };

      const response = await fetch(
        `${API_URL}/tutors/profile/me`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update tutor profile"
        );
      }

      const updatedTutor: TutorProfile = result.data;

      setProfile(updatedTutor);

      setFormData({
        bio: updatedTutor.bio,
        qualifications: updatedTutor.qualifications.join(", "),
        subjects: updatedTutor.subjects.join(", "),
        experience: String(updatedTutor.experience),
        city: updatedTutor.city,
        area: updatedTutor.area,
        expectedSalary: String(updatedTutor.expectedSalary),
      });

      setMessage("Your tutor profile has been updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-gray-500">Loading tutor profile...</p>
      </div>
    );
  }

  // Error state
  if (!profile) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Unable to load tutor profile
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error || "Tutor profile not found."}
        </p>
      </div>
    );
  }

  const subscriptionLabel: Record<string, string> = {
    not_started: "Not Started",
    trial: "Free Trial",
    active: "Active",
    expired: "Expired",
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Tutor Profile
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your personal and teaching information.
        </p>
      </div>

      {/* Profile Header */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-700 to-indigo-600 p-6 text-white shadow-sm">

        <div className="flex flex-col items-center gap-4 sm:flex-row">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-violet-700">
            {profile.user.fullName.charAt(0).toUpperCase()}
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">
              {profile.user.fullName}
            </h2>

            <p className="mt-1 text-sm text-violet-100">
              {profile.user.email}
            </p>

            <span className="mt-3 inline-block rounded-full bg-green-400/20 px-3 py-1 text-xs font-semibold text-white">
              Approved Tutor
            </span>
          </div>

        </div>
      </div>

      {/* Subscription Information */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-gray-900">
          Subscription Information
        </h2>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">

          <div>
            <p className="text-sm text-gray-500">
              Current Subscription
            </p>

            <p className="mt-1 text-lg font-semibold capitalize text-violet-700">
              {subscriptionLabel[profile.subscriptionStatus] ||
                profile.subscriptionStatus}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Subscription Expiry
            </p>

            <p className="mt-1 font-semibold text-gray-800">
              {profile.subscriptionEndDate
                ? new Date(
                    profile.subscriptionEndDate
                  ).toLocaleDateString()
                : profile.trialEndDate
                  ? new Date(
                      profile.trialEndDate
                    ).toLocaleDateString()
                  : "Not available"}
            </p>
          </div>

        </div>
      </div>

      {/* Profile Form */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Teaching Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Keep your teaching information accurate and up to date.
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-5 rounded-lg bg-green-50 p-4 text-sm text-green-700">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Personal Information */}
          <div>
            <h3 className="mb-4 border-b border-gray-100 pb-3 font-semibold text-gray-800">
              Personal Information
            </h3>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={profile.user.fullName}
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={profile.user.email}
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={profile.user.phone || "Not provided"}
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
                />
              </div>

            </div>
          </div>

          {/* Teaching Details */}
          <div>
            <h3 className="mb-4 border-b border-gray-100 pb-3 font-semibold text-gray-800">
              Teaching Details
            </h3>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Professional Biography
                </label>

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                  minLength={30}
                  maxLength={1000}
                  rows={5}
                  placeholder="Introduce yourself and describe your teaching experience..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Minimum 30 and maximum 1000 characters.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Qualifications
                </label>

                <input
                  type="text"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  required
                  placeholder="BSc in Mathematics, MSc in Physics"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Separate multiple qualifications with commas.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Teaching Subjects
                </label>

                <input
                  type="text"
                  name="subjects"
                  value={formData.subjects}
                  onChange={handleChange}
                  required
                  placeholder="Mathematics, Physics, Chemistry"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Separate multiple subjects with commas.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Teaching Experience (Years)
                </label>

                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

            </div>
          </div>

          {/* Location and Salary */}
          <div>
            <h3 className="mb-4 border-b border-gray-100 pb-3 font-semibold text-gray-800">
              Location & Expected Salary
            </h3>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Dhaka"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Area
                </label>

                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Mirpur"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Expected Monthly Salary (৳)
                </label>

                <input
                  type="number"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

            </div>
          </div>

          {/* Save Button */}
          <div className="border-t border-gray-100 pt-6">

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-violet-700 px-8 py-3 font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving Changes..." : "Save Profile"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}