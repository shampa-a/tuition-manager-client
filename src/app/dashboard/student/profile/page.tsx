"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface StudentProfile {
  fullName: string;
  email: string;
  phone?: string;
  city?: string;
  area?: string;
}

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<StudentProfile>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    area: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("tuition_token");

        if (!token) {
          setError("Please log in to view your profile.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load profile");
        }

        setProfile({
          fullName: result.data.fullName || "",
          email: result.data.email || "",
          phone: result.data.phone || "",
          city: result.data.city || "",
          area: result.data.area || "",
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("tuition_token");

      const response = await fetch(`${API_URL}/auth/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: profile.fullName,
          phone: profile.phone,
          city: profile.city,
          area: profile.area,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update profile");
      }

      setProfile((previous) => ({
        ...previous,
        ...result.data,
      }));

      // Update locally stored user information
      localStorage.setItem(
        "tuition_user",
        JSON.stringify(result.data)
      );

      setMessage("Your profile has been updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          My Profile
        </h1>
        <p className="mt-2 text-gray-500">
          Manage your personal information and contact details.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-2xl font-bold text-violet-700">
            {profile.fullName.charAt(0).toUpperCase() || "S"}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {profile.fullName || "Student"}
            </h2>
            <p className="text-sm text-gray-500">
              Student Account
            </p>
          </div>
        </div>

        {message && (
          <div className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={100}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
            />
            <p className="mt-1 text-xs text-gray-400">
              Email address cannot currently be changed.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={profile.phone || ""}
              onChange={handleChange}
              maxLength={20}
              placeholder="Enter your phone number"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={profile.city || ""}
                onChange={handleChange}
                maxLength={100}
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
                value={profile.area || ""}
                onChange={handleChange}
                maxLength={100}
                placeholder="e.g. Mirpur"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-violet-700 px-6 py-3 font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}