"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "@/hooks/useSearch";

export function MobileSearchBar() {
  const [expanded, setExpanded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { query, setQuery, handleSearch } = useSearch();

  // close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "lg:hidden absolute right-38 md:right-78 h-12 flex items-center rounded-full text-white",
        "transition-all duration-300 ease-out",
        expanded
          ? "justify-end w-52 px-4 bg-gray-600 gap-2"
          : "w-12 justify-center bg-transparent gap-0 px-0"
      )}
      onClick={(e) => {
        e.stopPropagation();
        setExpanded(true);
      }}
    >
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        className={cn(
          "shrink h-full outline-none border-none transition-all duration-300 ease-out",
          expanded ? "w-full opacity-100" : "w-0 opacity-0"
        )}
      />
      <Search className="cursor-pointer" />
    </div>
  );
}

export function DesktopSearchBar() {
  const { query, setQuery, handleSearch } = useSearch();

  return (
    <div className="bg-gray-600 text-gray-300 w-72 h-full lg:flex items-center justify-start gap-2 px-4 hidden">
      <Search />

      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        className="outline-none border-none h-full w-full px-2"
      />
    </div>
  );
}
