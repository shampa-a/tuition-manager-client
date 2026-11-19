"use client";

import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      <DashboardSidebar />

      <div className="min-w-0 flex-1">
        <DashboardNavbar />

        <main className="p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}