"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        404
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
