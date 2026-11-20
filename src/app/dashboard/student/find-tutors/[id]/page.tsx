"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { sampleTutors } from "@/data/tutors";

export default function TutorProfilePage() {
  const params = useParams();
  const router = useRouter();

  const tutor = sampleTutors.find(
    (item) => item.id === params.id
  );

  if (!tutor) {
    return (
      <div className="rounded-xl bg-white p-10 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          Tutor Not Found
        </h2>

        <Link
          href="/dashboard/student/find-tutors"
          className="mt-5 inline-block text-violet-700"
        >
          Back to Find Tutors
        </Link>
      </div>
    );
  }

  const handleFavorite = () => {
    const existing = JSON.parse(
      localStorage.getItem("savedTutors") || "[]"
    ) as string[];

    const updated = existing.includes(tutor.id)
      ? existing.filter((id) => id !== tutor.id)
      : [...existing, tutor.id];

    localStorage.setItem("savedTutors", JSON.stringify(updated));

    alert(
      updated.includes(tutor.id)
        ? "Tutor added to favourites!"
        : "Tutor removed from favourites!"
    );
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      <Link
        href="/dashboard/student/find-tutors"
        className="text-sm font-medium text-violet-700 hover:underline"
      >
        ← Back to Find Tutors
      </Link>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-4xl font-bold text-violet-700">
            {tutor.fullName.charAt(0)}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {tutor.fullName}
            </h1>

            <p className="mt-2 text-gray-600">
              {tutor.qualification}
            </p>

            <p className="text-sm text-gray-500">
              {tutor.university}
            </p>

            <p className="mt-2 text-yellow-600">
              ★ {tutor.rating} / 5.0
            </p>
          </div>

          <button
            onClick={handleFavorite}
            className="rounded-lg border border-pink-200 px-4 py-2 text-sm font-semibold text-pink-600 hover:bg-pink-50"
          >
            ♡ Save Tutor
          </button>
        </div>

        <hr className="my-8" />

        <h2 className="text-lg font-bold text-gray-800">
          About the Tutor
        </h2>

        <p className="mt-3 leading-7 text-gray-600">
          {tutor.bio}
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">

          <div>
            <p className="text-sm text-gray-500">Experience</p>
            <p className="mt-1 font-semibold text-gray-800">
              {tutor.experience} Years
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="mt-1 font-semibold text-gray-800">
              {tutor.gender}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="mt-1 font-semibold text-gray-800">
              {tutor.area}, {tutor.city}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Expected Monthly Salary
            </p>
            <p className="mt-1 font-semibold text-violet-700">
              ৳{tutor.expectedSalary.toLocaleString("en-BD")}
            </p>
          </div>

        </div>

        <div className="mt-8">
          <h2 className="font-bold text-gray-800">
            Subjects
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {tutor.subjects.map((subject) => (
              <span
                key={subject}
                className="rounded-full bg-violet-50 px-4 py-2 text-sm text-violet-700"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            onClick={() =>
              router.push(
                `/dashboard/student/request-tutor/${tutor.id}`
              )
            }
            className="rounded-lg bg-violet-700 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-800"
          >
            Request This Tutor
          </button>

          <Link
            href="/dashboard/student/saved-tutors"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            View Saved Tutors
          </Link>

        </div>
      </div>
    </div>
  );
}