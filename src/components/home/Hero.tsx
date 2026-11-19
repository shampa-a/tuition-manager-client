import Link from "next/link";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-violet-50 via-white to-sky-50">

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">

        {/* Left Content */}
        <div>
          <span className="inline-block rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Your Learning Journey Starts Here
          </span>

          <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Find the Right Tutor.
            <span className="block text-violet-700">
              Achieve More.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Connect with qualified tutors, discover tuition opportunities
            and manage your learning journey with Tuition Manager.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="rounded-xl bg-violet-600 px-7 py-4 text-center font-semibold text-white shadow-lg shadow-violet-200 hover:bg-violet-700"
            >
              Find a Tutor →
            </Link>

            <Link
              href="/register"
              className="rounded-xl border border-violet-200 bg-white px-7 py-4 text-center font-semibold text-violet-700 hover:bg-violet-50"
            >
              Become a Tutor
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-600">
            <span>✓ Easy Registration</span>
            <span>✓ Verified Tutors</span>
            <span>✓ Free for Students</span>
          </div>
        </div>

        {/* Right Content */}
        <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-sky-500 p-8 shadow-2xl shadow-violet-200">

          <div className="rounded-2xl bg-white p-7">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Welcome to Tuition Manager
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  Learning Made Easier
                </h2>
              </div>

              <span className="text-4xl">🎓</span>
            </div>

            <div className="mt-8 space-y-4">

              <div className="rounded-xl bg-violet-50 p-5">
                <h3 className="font-bold text-gray-800">
                  👩‍🏫 Qualified Tutors
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Find your ideal tutor.
                </p>
              </div>

              <div className="rounded-xl bg-sky-50 p-5">
                <h3 className="font-bold text-gray-800">
                  📖 Tuition Opportunities
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Discover suitable tuition posts.
                </p>
              </div>

              <div className="rounded-xl bg-pink-50 p-5">
                <h3 className="font-bold text-gray-800">
                  💬 Direct Communication
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Connect with confidence.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}