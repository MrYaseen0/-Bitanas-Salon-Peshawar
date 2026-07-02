"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

// Detect whether the component has mounted on the client (avoids hydration
// mismatch for theme-dependent UI) without calling setState in an effect.
const emptySubscribe = () => () => {};
function getMountedSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getMountedSnapshot,
    getServerSnapshot
  );

  const current = theme === "system" ? resolvedTheme : theme;
  const isDark = current === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-soft/60 text-rose-deep hover:bg-rose-soft transition-colors overflow-hidden group",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {/* Sun icon (shown in dark mode → click to go light) */}
      <Sun
        className={cn(
          "absolute h-5 w-5 transition-all duration-500",
          mounted && isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        )}
      />
      {/* Moon icon (shown in light mode → click to go dark) */}
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all duration-500",
          mounted && !isDark
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        )}
      />
      {/* Loading placeholder before mount to keep layout stable */}
      {!mounted && <span className="h-5 w-5" />}
    </button>
  );
}
