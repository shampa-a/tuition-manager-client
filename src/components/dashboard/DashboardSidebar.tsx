"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Overview", href: "/dashboard/student", icon: "▦" },
  { name: "Find Tutors", href: "/dashboard/student/find-tutors", icon: "⌕" },
  { name: "My Bookings", href: "/dashboard/student/bookings", icon: "▣" },
  { name: "Tuition Requests", href: "/dashboard/student/tuition-requests", icon: "▤" },
  { name: "Messages", href: "/dashboard/student/messages", icon: "✉" },
  { name: "Notifications", href: "/dashboard/student/notifications", icon: "♧" },
  { name: "My Profile", href: "/dashboard/student/profile", icon: "♙" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-full flex-col border-r border-gray-200 bg-white md:w-64 md:shrink-0">
      <div className="border-b border-gray-100 px-6 py-6">
        <Link href="/" className="text-2xl font-bold text-violet-700">
          Tuition<span className="text-sky-500">Manager</span>
        </Link>

        <p className="mt-1 text-xs text-gray-500">
          Student Dashboard
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </p>

        {menuItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-violet-100 text-violet-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-violet-700"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 hover:bg-gray-100"
        >
          <span>⌂</span>
          Back to Website
        </Link>
      </div>
    </aside>
  );
}