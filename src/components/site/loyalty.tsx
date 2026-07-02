"use client";

import { Sparkles, Gem, Crown, Check, ArrowRight, Gift } from "lucide-react";
import {
  LOYALTY_TIERS,
  LOYALTY_HOW_IT_WORKS,
  whatsappLink,
  type LoyaltyTier,
} from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { LoyaltySimulator } from "@/components/site/loyalty-simulator";
import { cn } from "@/lib/utils";

const ICONS = { sparkle: Sparkles, gem: Gem, crown: Crown };

const ACCENT: Record<
  LoyaltyTier["accent"],
  { card: string; chip: string; icon: string; ring: string }
> = {
  rose: {
    card: "bg-white border-rose-soft/60",
    chip: "bg-rose-soft text-rose-deep",
    icon: "from-rose-soft to-rose-soft/40 text-rose-deep",
    ring: "ring-rose-soft/60",
  },
  gold: {
    card: "bg-white border-gold-soft/60",
    chip: "bg-gold-soft text-amber-800",
    icon: "from-gold-soft to-gold/40 text-amber-700",
    ring: "ring-gold-soft/60",
  },
  deep: {
    card:
      "bg-gradient-to-br from-rose-deep via-rose to-rose-deep text-white border-transparent",
    chip: "bg-white/20 text-white",
    icon: "from-white/20 to-white/10 text-white",
    ring: "ring-gold/40",
  },
};

export function Loyalty() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      id="loyalty"
      className="relative py-24 sm:py-28 bg-gradient-to-b from-white via-rose-soft/20 to-white overflow-hidden"
    >
      <div className="absolute top-1/4 -left-32 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-32 h-[420px] w-[420px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Glow Rewards
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Loyalty That <span className="text-gradient-rose">Glow Back</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            The more you visit, the more you earn. Our 3-tier rewards program
            turns every appointment into points, perks and pampering —
            automatically.
          </p>
        </div>

        {/* How it works */}
        <div className="mt-12 grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {LOYALTY_HOW_IT_WORKS.map((step, i) => (
            <div
              key={step.step}
              className={cn(
                "relative rounded-3xl bg-white border border-rose-soft/50 p-6 text-center transition-all duration-500",
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="font-serif text-5xl font-bold text-gradient-rose/40 block leading-none">
                {step.step}
              </span>
              <h3 className="mt-3 font-serif text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                {step.desc}
              </p>
              {/* Connector arrow */}
              {i < LOYALTY_HOW_IT_WORKS.length - 1 && (
                <ArrowRight className="hidden sm:block absolute top-1/2 -right-3.5 -translate-y-1/2 h-5 w-5 text-rose/40" />
              )}
            </div>
          ))}
        </div>

        {/* Tiers */}
        <div
          ref={ref}
          className="mt-14 grid md:grid-cols-3 gap-6 items-start"
        >
          {LOYALTY_TIERS.map((tier, i) => {
            const accent = ACCENT[tier.accent];
            const Icon = ICONS[tier.icon];
            const isElite = tier.accent === "deep";
            return (
              <div
                key={tier.id}
                className={cn(
                  "relative rounded-3xl border-2 p-7 transition-all duration-500 card-lift overflow-hidden",
                  accent.card,
                  isElite &&
                    "lg:scale-105 shadow-2xl shadow-rose/25 ring-2 ring-gold/30",
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Decorative pattern for elite */}
                {isElite && (
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                )}

                <div className="relative">
                  {/* Icon + tier name */}
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
                        accent.icon
                      )}
                    >
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <h3
                        className={cn(
                          "font-serif text-2xl font-bold leading-tight",
                          isElite ? "text-white" : "text-foreground"
                        )}
                      >
                        {tier.name}
                      </h3>
                      <p
                        className={cn(
                          "text-xs font-medium mt-0.5",
                          isElite ? "text-white/75" : "text-foreground/55"
                        )}
                      >
                        {tier.threshold}
                      </p>
                    </div>
                  </div>

                  {/* Perks */}
                  <ul className="mt-6 space-y-2.5">
                    {tier.perks.map((perk) => (
                      <li
                        key={perk}
                        className={cn(
                          "flex items-start gap-2.5 text-sm",
                          isElite ? "text-white/90" : "text-foreground/75"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5",
                            accent.chip
                          )}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={whatsappLink(
                      `Hi Bitanas Salon! ✨ I'd like to join the ${tier.name} loyalty tier. How do I sign up?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "mt-7 w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold transition-all hover:scale-[1.02] group",
                      isElite
                        ? "bg-white text-rose-deep hover:bg-cream"
                        : "bg-gradient-to-r from-rose to-rose-deep text-white shadow-md hover:shadow-lg hover:shadow-rose/30"
                    )}
                  >
                    <Gift className="h-4 w-4" />
                    Join {tier.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Points Simulator */}
        <LoyaltySimulator />

        {/* Note */}
        <p className="mt-10 text-center text-sm text-foreground/55 max-w-2xl mx-auto">
          <Sparkles className="inline h-4 w-4 text-gold mr-1.5" />
          Membership is automatic — just use the same phone number at every
          visit. Points expire after 18 months of inactivity.
        </p>
      </div>
    </section>
  );
}
