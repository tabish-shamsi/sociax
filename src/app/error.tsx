"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-destructive mb-4">Something Went Wrong</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        An unexpected error occurred.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
      >
        Try Again
      </button>
    </div>
  );
}
