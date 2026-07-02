"use client";

import { useEffect, useState } from "react";

/**
 * A thin gradient scroll-progress bar fixed to the very top of the viewport.
 * Tracks how far the user has scrolled through the page.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(Math.max(pct, 0), 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-1 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-rose via-rose-deep to-gold transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(190,80,110,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
