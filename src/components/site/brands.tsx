"use client";

import { BRANDS } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function Brands() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  // Duplicate the list so the marquee loops seamlessly
  const loop = [...BRANDS, ...BRANDS];

  return (
    <section className="relative py-14 sm:py-16 overflow-hidden border-y border-rose-soft/40 bg-gradient-to-r from-rose-soft/20 via-white to-gold-soft/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p
          ref={ref}
          className={cn(
            "text-center text-xs font-semibold uppercase tracking-[0.35em] text-foreground/45 mb-8 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          We Only Use Authentic Premium Brands
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee gap-10 sm:gap-16 px-6 hover:[animation-play-state:paused]">
          {loop.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-serif text-2xl sm:text-3xl font-bold text-foreground/35 hover:text-rose-deep transition-colors whitespace-nowrap cursor-default select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
