"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function useSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return { query, setQuery, handleSearch };
}
