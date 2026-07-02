"use client";

import { Trophy, Star, Heart, Sparkles, Quote, Award as AwardIcon } from "lucide-react";
import { AWARDS, PRESS_FEATURES, type Award } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const ICONS = {
  trophy: Trophy,
  star: Star,
  heart: Heart,
  sparkle: Sparkles,
};

const ACCENTS = [
  "from-rose to-rose-deep",
  "from-gold to-gold-soft",
  "from-rose-deep to-rose",
  "from-gold-soft to-gold",
];

export function PressAwards() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      id="awards"
      className="relative py-24 sm:py-28 bg-gradient-to-b from-white via-rose-soft/20 to-white overflow-hidden"
    >
      <div className="absolute top-1/4 -right-32 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Recognition
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Award-Winning <span className="text-gradient-rose">Beauty, Trusted</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            We&apos;re honoured to be recognised by leading publications and
            industry bodies — a testament to our artists&apos; passion and your
            love.
          </p>
        </div>

        {/* Awards grid */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AWARDS.map((award: Award, i: number) => {
            const Icon = ICONS[award.icon];
            return (
              <div
                key={award.id}
                className={cn(
                  "group relative rounded-3xl bg-white border border-rose-soft/50 p-6 text-center hover:shadow-2xl hover:shadow-rose/15 transition-all duration-500 card-lift overflow-hidden",
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-gold/10 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative">
                  <div
                    className={cn(
                      "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg group-hover:scale-110 transition-transform",
                      ACCENTS[i % ACCENTS.length]
                    )}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className="mt-4 inline-block rounded-full bg-gold-soft/60 text-amber-800 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                    {award.year}
                  </span>
                  <h3 className="mt-3 font-serif text-base font-bold text-foreground leading-snug">
                    {award.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-foreground/55">
                    {award.org}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Press features */}
        <div className="mt-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <AwardIcon className="h-5 w-5 text-gold" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/50">
              As Featured In
            </p>
            <AwardIcon className="h-5 w-5 text-gold" />
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PRESS_FEATURES.map((press, i) => (
              <div
                key={press.name}
                className={cn(
                  "relative rounded-3xl bg-gradient-to-br from-white to-rose-soft/20 border border-rose-soft/50 p-6 hover:shadow-xl hover:shadow-rose/10 transition-all duration-500",
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${i * 100 + 300}ms` }}
              >
                <Quote className="h-8 w-8 text-rose-soft/70 mb-3" />
                <p className="text-sm text-foreground/75 italic leading-relaxed">
                  &ldquo;{press.quote}&rdquo;
                </p>
                <p className="mt-4 font-serif text-lg font-bold text-gradient-rose">
                  {press.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
