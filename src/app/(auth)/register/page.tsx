"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { apiRequest } from "@/lib/api";
import { RegisterResponse } from "@/types/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await apiRequest<RegisterResponse>(
        "/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );

      setSuccess(response.message);

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-violet-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-violet-700">
            Tuition Manager
          </h1>

          <p className="mt-2 text-gray-500">
            Create your account and get started
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Create Account
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg bg-green-100 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              minLength={2}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="017XXXXXXXX"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              required
              minLength={8}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-violet-600 hover:underline"
          >
            Login
          </Link>
        </p>

        <p className="mt-5 text-center text-xs text-gray-400">
          By registering, you agree to our Terms and Privacy Policy.
        </p>

      </div>
    </div>
  );
}