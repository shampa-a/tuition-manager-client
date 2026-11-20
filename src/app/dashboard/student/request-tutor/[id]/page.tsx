"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { sampleTutors } from "@/data/tutors";

export default function RequestTutorPage() {
  const params = useParams();

  const tutor = sampleTutors.find(
    (item) => item.id === params.id
  );

  const [form, setForm] = useState({
    subject: "",
    className: "",
    location: "",
    tuitionType: "Home Tuition",
    preferredDays: "",
    preferredTime: "",
    monthlyBudget: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!tutor) {
    return (
      <div className="rounded-xl bg-white p-10 text-center">
        <h2 className="font-bold">Tutor not found</h2>
        <Link
          href="/dashboard/student/find-tutors"
          className="mt-4 inline-block text-violet-700"
        >
          Back to Find Tutors
        </Link>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const existingRequests = JSON.parse(
      localStorage.getItem("demoBookingRequests") || "[]"
    );

    const newRequest = {
      id: Date.now().toString(),
      tutorId: tutor.id,
      tutorName: tutor.fullName,
      ...form,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "demoBookingRequests",
      JSON.stringify([...existingRequests, newRequest])
    );

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">

        <div className="text-5xl text-green-500">✓</div>

        <h1 className="mt-5 text-2xl font-bold text-gray-800">
          Request Submitted!
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Your tuition request for {tutor.fullName} has been saved in this
          browser as a demonstration. Backend submission and tutor
          notification will be implemented next.
        </p>

        <Link
          href="/dashboard/student/find-tutors"
          className="mt-6 inline-block rounded-lg bg-violet-700 px-6 py-3 text-sm font-semibold text-white"
        >
          Find More Tutors
        </Link>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      <div>
        <Link
          href={`/dashboard/student/find-tutors/${tutor.id}`}
          className="text-sm text-violet-700 hover:underline"
        >
          ← Back to Tutor Profile
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          Request a Tutor
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Send your tuition requirements to {tutor.fullName}.
        </p>
      </div>

      <div className="rounded-xl border border-violet-100 bg-violet-50 p-5">
        <p className="text-sm text-violet-700">
          Selected Tutor
        </p>

        <h2 className="mt-1 text-lg font-bold text-gray-800">
          {tutor.fullName}
        </h2>

        <p className="text-sm text-gray-600">
          {tutor.qualification}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
      >

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Subject *
          </label>

          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
          >
            <option value="">Select Subject</option>

            {tutor.subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Student Class *
          </label>

          <select
            name="className"
            value={form.className}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
          >
            <option value="">Select Class</option>
            {["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "HSC"].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Student Location *
          </label>

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="Example: Mirpur, Dhaka"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Tuition Type *
          </label>

          <select
            name="tuitionType"
            value={form.tuitionType}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
          >
            <option>Home Tuition</option>
            <option>Online Tuition</option>
            <option>Group Tuition</option>
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Preferred Days *
            </label>

            <input
              name="preferredDays"
              value={form.preferredDays}
              onChange={handleChange}
              required
              placeholder="Example: Sat, Mon, Wed"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Preferred Time *
            </label>

            <input
              name="preferredTime"
              value={form.preferredTime}
              onChange={handleChange}
              required
              placeholder="Example: 5 PM - 7 PM"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
            />
          </div>

        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Monthly Budget (BDT) *
          </label>

          <input
            type="number"
            name="monthlyBudget"
            value={form.monthlyBudget}
            onChange={handleChange}
            required
            min="1"
            placeholder="Example: 4000"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Additional Requirements
          </label>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell the tutor about your learning requirements..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-violet-700 py-3 font-semibold text-white hover:bg-violet-800"
        >
          Submit Tuition Request
        </button>

      </form>
    </div>
  );
}