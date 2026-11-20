"use client";

import { useMemo, useState } from "react";

interface Tutor {
  id: string;
  fullName: string;
  qualification: string;
  university: string;
  subjects: string[];
  experience: number;
  city: string;
  area: string;
  expectedSalary: number;
  bio: string;
  rating: number;
  gender: string;
}

const sampleTutors: Tutor[] = [
  {
    id: "1",
    fullName: "Rahim Ahmed",
    qualification: "BSc in Mathematics",
    university: "University of Dhaka",
    subjects: ["Mathematics", "Physics"],
    experience: 4,
    city: "Dhaka",
    area: "Mirpur",
    expectedSalary: 4000,
    bio: "Experienced mathematics tutor for SSC and HSC students.",
    rating: 4.9,
    gender: "Male",
  },
  {
    id: "2",
    fullName: "Nusrat Jahan",
    qualification: "MSc in English",
    university: "Jahangirnagar University",
    subjects: ["English", "Bangla"],
    experience: 3,
    city: "Dhaka",
    area: "Dhanmondi",
    expectedSalary: 3500,
    bio: "Passionate English teacher with three years of experience.",
    rating: 4.8,
    gender: "Female",
  },
  {
    id: "3",
    fullName: "Sakib Hasan",
    qualification: "BSc in Chemistry",
    university: "University of Rajshahi",
    subjects: ["Chemistry", "Biology"],
    experience: 5,
    city: "Dhaka",
    area: "Uttara",
    expectedSalary: 5000,
    bio: "Specialized in science subjects for SSC and HSC students.",
    rating: 4.7,
    gender: "Male",
  },
  {
    id: "4",
    fullName: "Ayesha Rahman",
    qualification: "BSc in Physics",
    university: "University of Dhaka",
    subjects: ["Physics", "Mathematics"],
    experience: 2,
    city: "Dhaka",
    area: "Mohammadpur",
    expectedSalary: 3000,
    bio: "Friendly tutor focused on building strong academic foundations.",
    rating: 4.6,
    gender: "Female",
  },
];

export default function FindTutorsPage() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [maxSalary, setMaxSalary] = useState("10000");
  const [minExperience, setMinExperience] = useState("0");

  const [savedTutors, setSavedTutors] = useState<string[]>([]);

  const filteredTutors = useMemo(() => {
    return sampleTutors.filter((tutor) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        !search ||
        tutor.fullName.toLowerCase().includes(searchText) ||
        tutor.subjects.some((item) =>
          item.toLowerCase().includes(searchText)
        ) ||
        tutor.qualification.toLowerCase().includes(searchText) ||
        tutor.area.toLowerCase().includes(searchText);

      const matchesSubject =
        !subject || tutor.subjects.includes(subject);

      const matchesCity =
        !city || tutor.city === city;

      const matchesGender =
        !gender || tutor.gender === gender;

      const matchesSalary =
        tutor.expectedSalary <= Number(maxSalary);

      const matchesExperience =
        tutor.experience >= Number(minExperience);

      return (
        matchesSearch &&
        matchesSubject &&
        matchesCity &&
        matchesGender &&
        matchesSalary &&
        matchesExperience
      );
    });
  }, [search, subject, city, gender, maxSalary, minExperience]);

 const toggleFavorite = (tutorId: string) => {
  const existing = JSON.parse(
    localStorage.getItem("savedTutors") || "[]"
  ) as string[];

  const updated = existing.includes(tutorId)
    ? existing.filter((id) => id !== tutorId)
    : [...existing, tutorId];

  localStorage.setItem("savedTutors", JSON.stringify(updated));

  setSavedTutors(updated);

  window.dispatchEvent(new Event("saved-tutors-changed"));
};
  const resetFilters = () => {
    setSearch("");
    setSubject("");
    setCity("");
    setGender("");
    setMaxSalary("10000");
    setMinExperience("0");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Find Your Perfect Tutor
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Search and connect with qualified tutors for your learning needs.
        </p>
      </div>

      {/* Search Bar */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Search by tutor name, subject, qualification or area
        </label>

        <input
          type="text"
          placeholder="Example: Mathematics, Rahim, Mirpur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-4">

        {/* Filters */}
        <aside className="h-fit rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-bold text-gray-800">
              Filters
            </h2>

            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-violet-700 hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Subject */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Subject
            </label>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500"
            >
              <option value="">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
              <option value="Bangla">Bangla</option>
            </select>
          </div>

          {/* City */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              City
            </label>

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500"
            >
              <option value="">All Cities</option>
              <option value="Dhaka">Dhaka</option>
            </select>
          </div>

          {/* Gender */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tutor Gender
            </label>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500"
            >
              <option value="">Any Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Experience */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Minimum Experience
            </label>

            <select
              value={minExperience}
              onChange={(e) => setMinExperience(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500"
            >
              <option value="0">Any Experience</option>
              <option value="1">1+ Years</option>
              <option value="2">2+ Years</option>
              <option value="3">3+ Years</option>
              <option value="5">5+ Years</option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Maximum Monthly Salary
            </label>

            <select
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500"
            >
              <option value="3000">৳3,000</option>
              <option value="4000">৳4,000</option>
              <option value="5000">৳5,000</option>
              <option value="7000">৳7,000</option>
              <option value="10000">৳10,000</option>
              <option value="100000">Any Budget</option>
            </select>
          </div>

        </aside>

        {/* Tutor Results */}
        <section className="space-y-5 lg:col-span-3">

          {/* Results Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-gray-800">
                Available Tutors
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {filteredTutors.length} tutors found
              </p>
            </div>

            <span className="rounded-lg bg-violet-50 px-3 py-2 text-xs font-medium text-violet-700">
              Recommended Tutors
            </span>
          </div>

          {/* Tutor Cards */}
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <div
                key={tutor.id}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row">

                  <div className="flex gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-violet-100 text-2xl font-bold text-violet-700">
                      {tutor.fullName.charAt(0)}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {tutor.fullName}
                      </h3>

                      <p className="mt-1 text-sm text-gray-600">
                        {tutor.qualification}
                      </p>

                      <p className="text-xs text-gray-500">
                        {tutor.university}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {tutor.subjects.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFavorite(tutor.id)}
                    aria-label="Save tutor"
                    className="h-fit rounded-lg border border-gray-200 px-3 py-2 text-xl text-pink-500 hover:bg-pink-50"
                  >
                    {savedTutors.includes(tutor.id) ? "♥" : "♡"}
                  </button>

                </div>

                <div className="my-5 grid grid-cols-2 gap-4 border-y border-gray-100 py-4 text-sm sm:grid-cols-3">

                  <div>
                    <p className="text-xs text-gray-500">
                      Experience
                    </p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {tutor.experience} Years
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Location
                    </p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {tutor.area}, {tutor.city}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Monthly Salary
                    </p>
                    <p className="mt-1 font-semibold text-violet-700">
                      ৳{tutor.expectedSalary.toLocaleString("en-BD")}
                    </p>
                  </div>

                </div>

                <p className="text-sm leading-6 text-gray-600">
                  {tutor.bio}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">

                  <span className="text-sm font-medium text-yellow-600">
                    ★ {tutor.rating} / 5.0
                  </span>

                  <a
  href={`/dashboard/student/find-tutors/${tutor.id}`}
  className="rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-800"
>
  View Profile
</a>

                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-gray-100 bg-white px-5 py-16 text-center shadow-sm">
              <div className="text-4xl">🔎</div>

              <h3 className="mt-4 font-semibold text-gray-800">
                No tutors found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={resetFilters}
                className="mt-4 rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-800"
              >
                Clear Filters
              </button>
            </div>
          )}

        </section>
      </div>
    </div>
  );
}
