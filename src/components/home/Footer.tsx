import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 py-12 text-gray-300">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">

        {/* Brand */}
        <div>
          <Link href="/" className="text-2xl font-bold text-white">
            Tuition<span className="text-sky-400">Manager</span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
            Connecting students, guardians and tutors through a simple
            and reliable tuition marketplace.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-white">Quick Links</h3>

          <div className="mt-5 flex flex-col gap-3 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/#features" className="hover:text-white">Features</Link>
            <Link href="/#how-it-works" className="hover:text-white">How It Works</Link>
            <Link href="/#pricing" className="hover:text-white">Pricing</Link>
          </div>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-bold text-white">Account</h3>

          <div className="mt-5 flex flex-col gap-3 text-sm">
            <Link href="/login" className="hover:text-white">Login</Link>
            <Link href="/register" className="hover:text-white">Register</Link>
          </div>
        </div>

      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-gray-800 px-6 pt-7 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Tuition Manager. All rights reserved.
      </div>

    </footer>
  );
}