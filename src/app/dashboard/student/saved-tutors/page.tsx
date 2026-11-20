"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { sampleTutors } from "@/data/tutors";

const STORAGE_KEY = "savedTutors";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("saved-tutors-changed", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("saved-tutors-changed", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) || "[]";
}

function getServerSnapshot() {
  return "[]";
}

export default function SavedTutorsPage() {
  const savedTutorsJson = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const savedTutors: string[] = JSON.parse(savedTutorsJson);

  const tutors = sampleTutors.filter((tutor) =>
    savedTutors.includes(tutor.id)
  );

  const removeFavorite = (id: string) => {
    const updated = savedTutors.filter(
      (tutorId) => tutorId !== id
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    window.dispatchEvent(new Event("saved-tutors-changed"));
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Saved Tutors
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your favourite tutors.
        </p>
      </div>

      {tutors.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white p-12 text-center">

          <div className="text-5xl">♡</div>

          <h2 className="mt-4 text-xl font-bold text-gray-800">
            No Saved Tutors Yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Explore tutors and save your favourites here.
          </p>

          <Link
            href="/dashboard/student/find-tutors"
            className="mt-5 inline-block rounded-lg bg-violet-700 px-6 py-3 text-sm font-semibold text-white"
          >
            Find Tutors
          </Link>

        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">

          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-xl font-bold text-violet-700">
                  {tutor.fullName.charAt(0)}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">
                    {tutor.fullName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {tutor.qualification}
                  </p>
                </div>

                <button
                  onClick={() => removeFavorite(tutor.id)}
                  className="text-xl text-pink-500"
                  title="Remove from saved tutors"
                >
                  ♥
                </button>

              </div>

              <div className="mt-5 space-y-2 text-sm text-gray-600">
                <p>📚 {tutor.subjects.join(", ")}</p>
                <p>📍 {tutor.area}, {tutor.city}</p>
                <p>⭐ {tutor.rating} / 5.0</p>
                <p>
                  Monthly Salary: ৳
                  {tutor.expectedSalary.toLocaleString("en-BD")}
                </p>
              </div>

              <div className="mt-5 flex gap-3">

                <Link
                  href={`/dashboard/student/find-tutors/${tutor.id}`}
                  className="flex-1 rounded-lg border border-violet-200 py-2 text-center text-sm font-semibold text-violet-700 hover:bg-violet-50"
                >
                  View Profile
                </Link>

                <Link
                  href={`/dashboard/student/request-tutor/${tutor.id}`}
                  className="flex-1 rounded-lg bg-violet-700 py-2 text-center text-sm font-semibold text-white hover:bg-violet-800"
                >
                  Request Tutor
                </Link>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}