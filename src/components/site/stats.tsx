"use client";

import { Star, Award, Sparkles, Heart } from "lucide-react";
import { STATS } from "@/lib/salon-data";
import { useReveal, useCountUp } from "@/hooks/use-reveal";

const ICONS = [Star, Award, Sparkles, Heart];

function StatCard({
  value,
  suffix,
  label,
  delay,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const count = useCountUp(value, 2000, visible);
  const Icon = ICONS[index % ICONS.length];

  return (
    <div
      ref={ref}
      className="relative text-center transition-all duration-700 group"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {/* Icon */}
      <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-soft to-rose-soft/40 text-rose-deep shadow-sm group-hover:from-rose group-hover:to-rose-deep group-hover:text-white transition-all duration-300 group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-serif text-4xl sm:text-5xl font-bold text-gradient-rose leading-none">
        {count.toLocaleString()}
        <span className="text-gold">{suffix}</span>
      </div>
      <p className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-foreground/55">
        {label}
      </p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative -mt-8 z-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-white shadow-[0_20px_60px_-20px_rgba(190,80,110,0.3)] border border-rose-soft/40 px-6 py-8 sm:px-10 sm:py-10 overflow-hidden">
          {/* Subtle decorative blob */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-32 w-64 rounded-full bg-rose-soft/40 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {STATS.map((s, i) => (
              <div key={s.label} className="relative">
                <StatCard
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  delay={i * 120}
                  index={i}
                />
                {/* Divider between items on desktop */}
                {i < STATS.length - 1 && (
                  <span className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-4 h-12 w-px bg-gradient-to-b from-transparent via-rose-soft/60 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
