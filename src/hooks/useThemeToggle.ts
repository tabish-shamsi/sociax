"use client";

import { useEffect, useState } from "react";

export function useThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.body.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    if (theme === "light") {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return { theme, toggleTheme };
}
