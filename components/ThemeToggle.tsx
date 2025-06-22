"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Temporarily disabled - always show dark mode
  // TODO: Re-enable theme switching in future
  return (
    <button
      // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full text-2xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary opacity-50 cursor-not-allowed"
      aria-label="Theme toggle (disabled)"
      disabled
    >
      <FiMoon />
    </button>
  );
};

export default ThemeToggle; 