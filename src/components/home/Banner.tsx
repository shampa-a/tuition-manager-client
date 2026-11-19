import Link from "next/link";

const features = [
  {
    icon: "🔎",
    title: "Find Qualified Tutors",
    description:
      "Discover suitable tutors based on subject, location, qualification and experience.",
  },
  {
    icon: "📚",
    title: "Post Tuition Requirements",
    description:
      "Share your tuition requirements and receive applications from interested tutors.",
  },
  {
    icon: "💬",
    title: "Direct Communication",
    description:
      "Connect with tutors and students through in-platform messaging.",
  },
  {
    icon: "📅",
    title: "Manage Bookings",
    description:
      "Send booking requests and manage your tuition arrangements conveniently.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create an Account",
    description: "Register and explore the Tuition Manager platform.",
  },
  {
    number: "02",
    title: "Find Your Match",
    description: "Search for tutors or post your tuition requirements.",
  },
  {
    number: "03",
    title: "Connect and Learn",
    description: "Contact your preferred tutor and arrange your tuition.",
  },
];

export default function Banner() {
  return (
    <>
      {/* Platform Benefits */}
      <section className="border-y border-gray-100 bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 text-center sm:grid-cols-3">

          <div>
            <h3 className="text-3xl font-extrabold text-violet-700">
              100%
            </h3>
            <p className="mt-2 text-gray-600">Free for Students</p>
          </div>

          <div>
            <h3 className="text-3xl font-extrabold text-sky-600">
              7 Days
            </h3>
            <p className="mt-2 text-gray-600">Tutor Free Trial</p>
          </div>

          <div>
            <h3 className="text-3xl font-extrabold text-pink-600">
              ৳500
            </h3>
            <p className="mt-2 text-gray-600">
              Tutor Subscription / 30 Days
            </p>
          </div>

        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="font-semibold text-violet-700">
              OUR FEATURES
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything You Need in One Platform
            </h2>

            <p className="mt-4 text-gray-600">
              A simple platform designed to bring students, guardians and
              tutors together.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100 text-3xl">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="font-semibold text-violet-700">
              SIMPLE PROCESS
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How Tuition Manager Works
            </h2>

            <p className="mt-4 text-gray-600">
              Getting started takes only a few simple steps.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-xl font-bold text-white">
                  {step.number}
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-violet-50 py-24">
        <div className="mx-auto max-w-5xl px-6">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="font-semibold text-violet-700">
              SIMPLE PRICING
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Affordable for Everyone
            </h2>

            <p className="mt-4 text-gray-600">
              Students use the platform for free. Tutors get access to
              marketplace features through a simple subscription.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2">

            {/* Student Plan */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
                Students & Guardians
              </span>

              <h3 className="mt-7 text-4xl font-extrabold text-gray-900">
                ৳0
                <span className="text-base font-normal text-gray-500">
                  {" "}/ always
                </span>
              </h3>

              <p className="mt-4 text-gray-600">
                Access the platform without a subscription fee.
              </p>

              <ul className="mt-7 space-y-4 text-sm text-gray-700">
                <li>✓ Search and discover tutors</li>
                <li>✓ Post tuition requirements</li>
                <li>✓ Send booking requests</li>
                <li>✓ Communicate with tutors</li>
                <li>✓ Manage booking history</li>
              </ul>

              <Link
                href="/register"
                className="mt-9 block rounded-xl border border-violet-600 py-3 text-center font-semibold text-violet-700 hover:bg-violet-50"
              >
                Register as Student
              </Link>
            </div>

            {/* Tutor Plan */}
            <div className="rounded-2xl border-2 border-violet-600 bg-white p-8 shadow-xl shadow-violet-100">
              <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
                Tutors
              </span>

              <h3 className="mt-7 text-4xl font-extrabold text-gray-900">
                ৳500
                <span className="text-base font-normal text-gray-500">
                  {" "}/ 30 days
                </span>
              </h3>

              <p className="mt-4 text-gray-600">
                Start with a one-time 7-day free trial after admin approval.
              </p>

              <ul className="mt-7 space-y-4 text-sm text-gray-700">
                <li>✓ Create a tutor profile</li>
                <li>✓ Discover tuition opportunities</li>
                <li>✓ Apply for tuition posts</li>
                <li>✓ Manage booking requests</li>
                <li>✓ Communicate with students</li>
              </ul>

              <Link
                href="/register"
                className="mt-9 block rounded-xl bg-violet-600 py-3 text-center font-semibold text-white hover:bg-violet-700"
              >
                Join as Tutor
              </Link>
            </div>

          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Tutor applications require admin approval. The free trial is
            available once per eligible tutor.
          </p>

        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-violet-700 to-sky-600 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Start Your Learning Journey?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-violet-100">
            Join Tuition Manager today and connect with the right people
            for your educational goals.
          </p>

          <Link
            href="/register"
            className="mt-9 inline-block rounded-xl bg-white px-8 py-4 font-bold text-violet-700 hover:bg-violet-50"
          >
            Create Your Free Account →
          </Link>

        </div>
      </section>
    </>
  );
}