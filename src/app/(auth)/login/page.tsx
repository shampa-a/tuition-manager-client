"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { apiRequest } from "@/lib/api";
import { AuthResponse } from "@/types/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await apiRequest<AuthResponse>(
        "/auth/login",
        {
          method: "POST",
          body: {
            email,
            password,
          },
        }
      );

      // Store authentication information
      localStorage.setItem(
        "tuition_token",
        response.data.token
      );

      localStorage.setItem(
        "tuition_user",
        JSON.stringify(response.data.user)
      );

      // Redirect based on role
      switch (response.data.user.role) {
        case "admin":
          router.push("/dashboard/admin");
          break;

        case "tutor":
          router.push("/dashboard/tutor");
          break;

        default:
          router.push("/dashboard/student");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed"
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
            Welcome back!
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Login to Your Account
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-violet-600 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}