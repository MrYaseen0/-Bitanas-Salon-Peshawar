"use client";
import { useState, useEffect } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { BLOG_POSTS } from "@/lib/salon-data";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

const ALL_TIPS = BLOG_POSTS.flatMap((p) => p.tips.map((tip) => ({ tip, category: p.category })));

export function DailyBeautyTip() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % ALL_TIPS.length);
    }, 6000);
    return () => clearInterval(id);
  }, [isHovered]);

  const current = ALL_TIPS[index];

  return (
    <div className="fixed bottom-36 left-1/2 -translate-x-1/2 z-40 w-[90vw] max-w-md" ref={ref}>
      <div
        className="rounded-xl bg-white/80 backdrop-blur-sm border border-rose-soft/10 shadow-md p-3 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground/10 text-foreground/50">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-foreground/40">Tip</span>
              <span className="text-[9px] text-foreground/40">·</span>
              <span className="text-[9px] text-foreground/40">{current.category}</span>
            </div>
            <p className="text-xs text-foreground/70 leading-relaxed transition-opacity duration-300">
              {current.tip}
            </p>
          </div>
          <div className="flex gap-0.5 shrink-0">
            <button
              onClick={() => setIndex((prev) => (prev - 1 + ALL_TIPS.length) % ALL_TIPS.length)}
              className="h-6 w-6 rounded-full flex items-center justify-center text-foreground/40 hover:text-rose-deep hover:bg-rose-soft/30 transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setIndex((prev) => (prev + 1) % ALL_TIPS.length)}
              className="h-6 w-6 rounded-full flex items-center justify-center text-foreground/40 hover:text-rose-deep hover:bg-rose-soft/30 transition-colors"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
