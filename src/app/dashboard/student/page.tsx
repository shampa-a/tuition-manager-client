import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";

const recommendedTutors = [
  {
    name: "Rahim Ahmed",
    subject: "Mathematics & Physics",
    qualification: "BSc in Mathematics",
    location: "Mirpur, Dhaka",
    rating: "4.9",
  },
  {
    name: "Nusrat Jahan",
    subject: "English & Bangla",
    qualification: "MA in English",
    location: "Dhanmondi, Dhaka",
    rating: "4.8",
  },
  {
    name: "Sakib Hasan",
    subject: "Chemistry & Biology",
    qualification: "BSc in Chemistry",
    location: "Uttara, Dhaka",
    rating: "4.7",
  },
];

export default function StudentDashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Welcome Section */}
      <section className="rounded-2xl bg-gradient-to-r from-violet-700 to-indigo-600 p-6 text-white md:p-8">
        <h2 className="text-2xl font-bold md:text-3xl">
          Welcome to Your Dashboard!
        </h2>

        <p className="mt-2 max-w-2xl text-sm text-violet-100 md:text-base">
          Find qualified tutors, manage your tuition requests,
          and connect with the right teachers for your learning journey.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard/student/find-tutors"
            className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50"
          >
            Find a Tutor
          </Link>

          <Link
            href="/dashboard/student/tuition-requests"
            className="rounded-lg border border-white/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Post Tuition Request
          </Link>
        </div>
      </section>

      {/* Statistics */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-gray-800">
          Dashboard Overview
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Active Bookings"
            value={2}
            description="Your current tutor bookings"
            icon="▣"
            iconBg="bg-violet-100 text-violet-700"
          />

          <StatCard
            title="Tuition Requests"
            value={3}
            description="Your posted tuition requirements"
            icon="▤"
            iconBg="bg-sky-100 text-sky-600"
          />

          <StatCard
            title="Saved Tutors"
            value={5}
            description="Tutors saved to your list"
            icon="♡"
            iconBg="bg-pink-100 text-pink-600"
          />

          <StatCard
            title="Upcoming Lessons"
            value={2}
            description="Your scheduled lessons"
            icon="◷"
            iconBg="bg-orange-100 text-orange-600"
          />
        </div>
      </section>

      {/* Recent Activity */}
      <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            Recent Activity
          </h2>

          <Link
            href="/dashboard/student/bookings"
            className="text-sm font-medium text-violet-700 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <p className="font-medium text-gray-800">
                Mathematics tuition booking
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Applied to a tutor · 2 hours ago
              </p>
            </div>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
              Pending
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <p className="font-medium text-gray-800">
                English tuition request
              </p>
              <p className="mt-1 text-xs text-gray-500">
                New tutor application received · Yesterday
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Received
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-gray-800">
                Physics tuition booking
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Booking completed · 3 days ago
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              Completed
            </span>
          </div>
        </div>
      </section>

      {/* Recommended Tutors */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            Recommended Tutors
          </h2>

          <Link
            href="/dashboard/student/find-tutors"
            className="text-sm font-medium text-violet-700 hover:underline"
          >
            Explore All
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {recommendedTutors.map((tutor) => (
            <div
              key={tutor.name}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-lg font-bold text-violet-700">
                  {tutor.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {tutor.name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {tutor.qualification}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-2 text-sm text-gray-600">
                <p>📚 {tutor.subject}</p>
                <p>📍 {tutor.location}</p>
                <p>⭐ {tutor.rating} / 5.0</p>
              </div>

              <Link
                href="/dashboard/student/find-tutors"
                className="mt-5 block rounded-lg border border-violet-200 py-2.5 text-center text-sm font-semibold text-violet-700 hover:bg-violet-50"
              >
                View Profile
              </Link>
<Link
  href="/dashboard/student/become-tutor"
  className="rounded-lg border border-white/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
>
  Become a Tutor
</Link>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}