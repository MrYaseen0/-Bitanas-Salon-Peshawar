"use client";
import { useState, useEffect } from "react";

export function useCountdown(target: Date | null) {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });
  useEffect(() => {
    if (!target) return;
    function tick() {
      const diff = target!.getTime() - Date.now();
      if (diff <= 0) { setRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }); return; }
      const total = Math.floor(diff / 1000);
      setRemaining({
        days: Math.floor(total / 86400),
        hours: Math.floor((total % 86400) / 3600),
        minutes: Math.floor((total % 3600) / 60),
        seconds: total % 60,
        expired: false,
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return remaining;
}
