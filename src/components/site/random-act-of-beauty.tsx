"use client";
import { useState, useEffect, useCallback } from "react";
import { Gift, Sparkles, X, Crown, Star, Gem, Award } from "lucide-react";

const SURPRISES = [
  { title: "You've Been Upgraded!", desc: "Free upgrade to premium products on your next visit.", icon: Star },
  { title: "Surprise Freebie!", desc: "You get a complimentary brow shaping with your next booking.", icon: Gift },
  { title: "Bonus Points!", desc: "We've added 200 bonus loyalty points to your account.", icon: Gem },
  { title: "VIP Treatment!", desc: "Priority booking unlocked for your next appointment.", icon: Crown },
];

export function RandomActOfBeauty() {
  const [current, setCurrent] = useState<typeof SURPRISES[0] | null>(null);
  const [dismissed, setDismissed] = useState<string[]>([]);

  const showRandom = useCallback(() => {
    const available = SURPRISES.filter((s) => !dismissed.includes(s.title));
    if (available.length === 0) return;
    const pick = available[Math.floor(Math.random() * available.length)];
    setCurrent(pick);
    setTimeout(() => setCurrent(null), 8000);
  }, [dismissed]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timeout = setTimeout(showRandom, 30000 + Math.random() * 60000);
    return () => clearTimeout(timeout);
  }, [showRandom]);

  const dismiss = () => {
    if (current) setDismissed((p) => [...p, current.title]);
    setCurrent(null);
    setTimeout(showRandom, 60000 + Math.random() * 120000);
  };

  if (!current) return null;

  const Icon = current.icon;

  return (
    <div className="fixed top-24 right-4 z-50 max-w-[280px] animate-fade-in">
      <div className="relative rounded-2xl bg-white/90 backdrop-blur-md border border-rose-soft/20 shadow-lg p-4">
        <button onClick={dismiss} className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-foreground/10 text-foreground/40 flex items-center justify-center hover:bg-foreground/20 transition-colors">
          <X className="h-3 w-3" />
        </button>
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-soft/30 text-foreground/60">
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <h4 className="font-semibold text-sm text-foreground">{current.title}</h4>
            <p className="mt-1 text-xs text-foreground/60 leading-relaxed">{current.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
