import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Tuition Manager"
            width={180}
            height={120}
            priority
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium hover:text-violet-700">
            Home
          </Link>

          <Link href="/#features" className="text-sm font-medium hover:text-violet-700">
            Features
          </Link>

          <Link href="/#how-it-works" className="text-sm font-medium hover:text-violet-700">
            How It Works
          </Link>

          <Link href="/#pricing" className="text-sm font-medium hover:text-violet-700">
            Pricing
          </Link>
        </nav>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50 sm:block"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}