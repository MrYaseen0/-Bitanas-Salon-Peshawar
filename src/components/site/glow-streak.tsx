"use client";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { Flame, CalendarDays, Trophy, Target } from "lucide-react";
import { useState, useEffect } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function GlowStreak() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [visits] = useLocalStorage<string[]>("bitanas:visits", []);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (visits.length === 0) { setStreak(0); return; }
    const sorted = [...visits].sort().reverse();
    let count = 0;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    for (const v of sorted) {
      const d = new Date(v);
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) count++;
      else break;
    }
    setStreak(count);
  }, [visits]);

  const recent = visits.slice(-6).reverse().map((v) => new Date(v));

  const fireColor = streak >= 3 ? "text-amber-500" : streak >= 1 ? "text-rose-soft" : "text-foreground/30";

  return (
    <section id="glow-streak" className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-rose-soft/15 via-white to-transparent" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Your <span className="text-gradient-rose">Glow Streak</span>
          </h2>
        </div>

        <div ref={ref} className={cn("transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          {streak === 0 ? (
            <div className="text-center rounded-2xl bg-white border border-rose-soft/20 p-10 shadow-md">
              <Flame className="h-10 w-10 text-rose-soft/50 mx-auto" />
              <h3 className="mt-4 font-serif text-xl font-bold text-foreground">No visits yet this month</h3>
              <p className="mt-2 text-foreground/50 text-sm">Book your first appointment to start your streak!</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-rose-soft/20 p-8 sm:p-10 shadow-md text-center">
              <div className="flex items-center justify-center gap-3">
                <Flame className={cn("h-10 w-10", fireColor)} />
                <div>
                  <span className="block text-5xl font-bold font-serif text-foreground">{streak}</span>
                  <span className="text-foreground/50 text-sm">visits this month</span>
                </div>
              </div>

              {streak >= 3 && (
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-700">
                  <Flame className="h-3.5 w-3.5" /> On Fire!
                </div>
              )}

              {recent.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-3 flex items-center justify-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" /> Recent Visits
                  </p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {recent.map((d, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-rose-soft/20 min-w-[56px]">
                        <span className="text-xs font-bold text-foreground">{d.getDate()}</span>
                        <span className="text-[10px] text-foreground/50">{MONTHS[d.getMonth()]}</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-rose-deep" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 grid grid-cols-3 gap-3 text-left">
                {[
                  { label: "3 visits", perk: "Free brow shaping", active: streak >= 3 },
                  { label: "5 visits", perk: "10% off any service", active: streak >= 5 },
                  { label: "8 visits", perk: "Free signature facial", active: streak >= 8 },
                ].map((milestone) => (
                  <div key={milestone.label} className={cn("rounded-xl border p-3", milestone.active ? "bg-rose-soft/10 border-rose/20" : "bg-white/50 border-rose-soft/10 opacity-40")}>
                    {milestone.active ? <Trophy className="h-5 w-5 text-amber-600" /> : <Target className="h-5 w-5 text-foreground/30" />}
                    <p className="mt-1 text-xs font-bold text-foreground">{milestone.label}</p>
                    <p className="text-[10px] text-foreground/50">{milestone.perk}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
