"use client";

import {
  Leaf,
  Heart,
  Recycle,
  Sparkles,
  Users,
  ShieldCheck,
} from "lucide-react";
import { BRAND_VALUES, type BrandValue } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const ICONS: Record<BrandValue["icon"], typeof Leaf> = {
  leaf: Leaf,
  heart: Heart,
  recycle: Recycle,
  sparkle: Sparkles,
  users: Users,
  shield: ShieldCheck,
};

export function Sustainability() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      id="values"
      className="relative py-24 sm:py-28 overflow-hidden"
    >
      <div className="absolute top-1/3 -left-32 h-[420px] w-[420px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-32 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Left intro - sticky */}
          <div className="lg:col-span-1">
            <p className="divider-luxe lg:justify-start text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Our Values
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Beauty With a{" "}
              <span className="text-gradient-rose">Conscience</span>
            </h2>
            <p className="mt-5 text-foreground/60 leading-relaxed">
              Looking gorgeous shouldn&apos;t cost the earth. At Bitanas, we
              blend luxury with responsibility — clean products, ethical
              practices, and a deep love for our community.
            </p>

            {/* Highlight stats */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { value: "100%", label: "Cruelty-free" },
                { value: "0", label: "Single-use tools reused" },
                { value: "12+", label: "Women employed" },
                { value: "50+", label: "Charity makeovers" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white border border-rose-soft/50 p-4 text-center shadow-sm"
                >
                  <p className="font-serif text-2xl font-bold text-gradient-rose">
                    {stat.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-foreground/50 font-semibold mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - values grid */}
          <div
            ref={ref}
            className="lg:col-span-2 grid sm:grid-cols-2 gap-4"
          >
            {BRAND_VALUES.map((value, i) => {
              const Icon = ICONS[value.icon];
              return (
                <div
                  key={value.id}
                  className={cn(
                    "group flex gap-4 p-5 rounded-3xl bg-white border border-rose-soft/50 hover:shadow-xl hover:shadow-rose/10 hover:border-rose/30 transition-all duration-500",
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-soft to-rose-soft/40 text-rose-deep group-hover:from-rose group-hover:to-rose-deep group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-foreground/60 leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
