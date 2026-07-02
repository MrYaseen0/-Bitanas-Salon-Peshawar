"use client";
import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

export function LiveViewers() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const base = 12 + Math.floor(Math.random() * 24);
    setCount(base);
    const interval = setInterval(() => {
      setCount((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(3, prev + delta);
      });
    }, 5000 + Math.random() * 10000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-28 left-4 z-40">
      <button onClick={() => setVisible(false)} className="float-right text-[9px] text-foreground/40 hover:text-rose-deep -mt-2 -mr-2">✕</button>
      <div className="flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-rose-soft/30 shadow-lg px-3 py-1.5 text-xs">
        <Eye className="h-3 w-3 text-rose-deep" />
        <span className="font-bold text-rose-deep">{count}</span>
        <span className="text-foreground/50">viewing now</span>
      </div>
    </div>
  );
}
