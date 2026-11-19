"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const router = useRouter();
  const [fullName, setFullName] = useState("Student");

  useEffect(() => {
    const storedUser = localStorage.getItem("tuition_user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setFullName(user.fullName || "Student");
      } catch {
        setFullName("Student");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tuition_token");
    localStorage.removeItem("tuition_user");

    router.push("/login");
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-5 md:px-8">
      <div>
        <h1 className="text-lg font-semibold text-gray-800">
          Student Portal
        </h1>
        <p className="text-xs text-gray-500">
          Manage your tuition activities
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Notifications"
          className="relative rounded-full p-2 text-xl text-gray-600 hover:bg-gray-100"
        >
          ♧
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-pink-500" />
        </button>

        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-gray-800">
            {fullName}
          </p>
          <p className="text-xs text-gray-500">Student</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700">
          {fullName.charAt(0).toUpperCase()}
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}