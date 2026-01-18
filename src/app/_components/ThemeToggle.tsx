"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "cream" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("cream");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or default to cream
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    // Default to cream theme if no stored preference
    const initialTheme = storedTheme || "cream";
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === "light") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", newTheme);
    }
  };

  const toggleTheme = () => {
    // Cycle through: cream -> light -> dark -> cream
    const themeOrder: Theme[] = ["cream", "light", "dark"];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const newTheme = themeOrder[nextIndex];
    
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-grey-100 hover:bg-grey-200 border border-grey-300 flex items-center justify-center transition-colors touch-manipulation text-grey-700"
        aria-label="Toggle theme"
        disabled
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-grey-100 hover:bg-grey-200 border border-grey-300 flex items-center justify-center transition-colors touch-manipulation text-grey-700 hover:text-grey-900 focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2"
      aria-label={`Switch theme (currently ${theme})`}
      title={`Current: ${theme}. Click to cycle themes.`}
    >
      {theme === "cream" ? (
        // Cream/beige icon - represents the cream theme (document/paper icon)
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ) : theme === "light" ? (
        // Sun icon - represents light theme
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon icon - represents dark theme
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
