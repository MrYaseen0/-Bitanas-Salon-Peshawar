"use client";

import { useState, useMemo } from "react";
import {
  Sparkles,
  Calculator,
  RotateCcw,
  TrendingUp,
  Gift,
  ArrowRight,
} from "lucide-react";
import { LOYALTY_TIERS, whatsappLink } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const SERVICES = [
  { id: "blow-dry", name: "Luxury Blow Dry", price: 2500 },
  { id: "haircut", name: "Designer Haircut", price: 3500 },
  { id: "balayage", name: "Signature Balayage", price: 12000 },
  { id: "party-makeup", name: "Party Makeup", price: 6000 },
  { id: "bridal-makeup", name: "Bridal Makeup", price: 25000 },
  { id: "acrylic-nails", name: "Acrylic Nails", price: 5500 },
  { id: "spa-mani-pedi", name: "Spa Mani / Pedi", price: 4500 },
  { id: "facial", name: "Signature Facial", price: 5000 },
  { id: "spa-ritual", name: "Relaxation Spa Ritual", price: 9000 },
];

const TIERS = [
  { id: "rose", name: "Rose", multiplier: 1, threshold: 0, color: "from-rose-soft to-rose-soft/40", text: "text-rose-deep" },
  { id: "gold", name: "Gold", multiplier: 1.5, threshold: 50000, color: "from-gold-soft to-gold/40", text: "text-amber-700" },
  { id: "elite", name: "Elite", multiplier: 2, threshold: 150000, color: "from-rose-deep to-rose", text: "text-white" },
];

export function LoyaltySimulator() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [tier, setTier] = useState<"rose" | "gold" | "elite">("rose");

  const toggle = (id: string, price: number) => {
    setSelected((s) => {
      const next = { ...s };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = price;
      }
      return next;
    });
  };

  const reset = () => {
    setSelected({});
    setTier("rose");
  };

  const { totalSpent, pointsEarned, rewards, nextTier } = useMemo(() => {
    const spent = Object.values(selected).reduce((sum, p) => sum + p, 0);
    const mult = TIERS.find((t) => t.id === tier)?.multiplier ?? 1;
    const points = Math.floor((spent / 100) * mult);
    // 500 points = PKR 1000 off
    const rewards = Math.floor(points / 500) * 1000;

    // Next tier calculation
    let next = null;
    for (let i = 0; i < TIERS.length; i++) {
      if (TIERS[i].id === tier && i < TIERS.length - 1) {
        const nextTierObj = TIERS[i + 1];
        const remaining = nextTierObj.threshold - spent;
        next = {
          name: nextTierObj.name,
          remaining: Math.max(0, remaining),
        };
        break;
      }
    }
    return { totalSpent: spent, pointsEarned: points, rewards, nextTier: next };
  }, [selected, tier]);

  return (
    <div
      ref={ref}
      className={cn(
        "mt-14 rounded-3xl bg-white border border-rose-soft/50 shadow-xl shadow-rose/5 overflow-hidden transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-deep via-rose to-rose-deep p-5 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
            <Calculator className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-serif text-lg font-bold leading-tight">
              Points Simulator
            </h3>
            <p className="text-[11px] text-white/75">
              See how fast your points add up — try it now!
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 grid lg:grid-cols-5 gap-6">
        {/* Service picker */}
        <div className="lg:col-span-3">
          <p className="text-xs font-bold uppercase tracking-wider text-foreground/50 mb-3">
            1. Pick your services
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {SERVICES.map((s) => {
              const isOn = !!selected[s.id];
              return (
                <button
                  key={s.id}
                  onClick={() => toggle(s.id, s.price)}
                  className={cn(
                    "flex items-center justify-between gap-2 p-2.5 rounded-xl border-2 text-left transition-all",
                    isOn
                      ? "border-rose bg-rose-soft/40"
                      : "border-rose-soft/40 hover:border-rose/40 hover:bg-rose-soft/20"
                  )}
                >
                  <span className="text-sm font-medium text-foreground flex-1">
                    {s.name}
                  </span>
                  <span className="text-xs font-semibold text-rose-deep whitespace-nowrap">
                    PKR {s.price.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tier selector */}
          <p className="text-xs font-bold uppercase tracking-wider text-foreground/50 mb-3 mt-5">
            2. Your membership tier
          </p>
          <div className="grid grid-cols-3 gap-2">
            {TIERS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTier(t.id as any)}
                className={cn(
                  "rounded-xl p-3 border-2 text-center transition-all",
                  tier === t.id
                    ? "border-rose bg-rose-soft/40 shadow-sm"
                    : "border-rose-soft/40 hover:border-rose/40"
                )}
              >
                <div
                  className={cn(
                    "mx-auto h-8 w-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold mb-1",
                    t.color
                  )}
                >
                  {t.multiplier}x
                </div>
                <p className="text-xs font-bold text-foreground">{t.name}</p>
                <p className="text-[10px] text-foreground/50">
                  {t.id === "rose"
                    ? "Free"
                    : `PKR ${(t.threshold / 1000).toFixed(0)}k+`}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          <div className="sticky top-4 space-y-3">
            {/* Total spent */}
            <div className="rounded-2xl bg-rose-soft/30 border border-rose-soft/50 p-4">
              <p className="text-[10px] uppercase tracking-wider text-foreground/50 font-semibold">
                Total Spent
              </p>
              <p className="font-serif text-3xl font-bold text-foreground">
                PKR {totalSpent.toLocaleString()}
              </p>
            </div>

            {/* Points earned */}
            <div className="rounded-2xl bg-gradient-to-br from-rose-deep to-rose p-4 text-white relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                    Points Earned
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-bold">
                    <TrendingUp className="h-2.5 w-2.5" />
                    {TIERS.find((t) => t.id === tier)?.multiplier}x multiplier
                  </span>
                </div>
                <p className="font-serif text-4xl font-bold mt-1">
                  {pointsEarned.toLocaleString()}
                  <Sparkles className="inline h-5 w-5 text-gold ml-1" />
                </p>
                {rewards > 0 && (
                  <p className="mt-1 text-xs text-gold inline-flex items-center gap-1">
                    <Gift className="h-3 w-3" />
                    = PKR {rewards.toLocaleString()} off your next visit
                  </p>
                )}
              </div>
            </div>

            {/* Next tier */}
            {nextTier && totalSpent > 0 && (
              <div className="rounded-2xl bg-gold-soft/30 border border-gold-soft/50 p-4">
                <p className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold">
                  Next Tier: {nextTier.name}
                </p>
                <p className="text-sm text-foreground/70 mt-0.5">
                  Spend{" "}
                  <strong className="text-amber-700">
                    PKR {nextTier.remaining.toLocaleString()}
                  </strong>{" "}
                  more to unlock
                </p>
                <div className="mt-2 h-1.5 rounded-full bg-gold-soft/60 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold to-amber-600 transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (totalSpent / (nextTier.remaining + totalSpent)) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Reset + CTA */}
            <div className="flex gap-2">
              <button
                onClick={reset}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-white border border-rose-soft text-rose-deep hover:bg-rose-soft/30 py-2.5 text-xs font-semibold transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
              {totalSpent > 0 && (
                <a
                  href={whatsappLink(
                    `Hi Bitanas Salon! ✨ I used your points simulator and I'm excited to earn ${pointsEarned} points on PKR ${totalSpent.toLocaleString()} of services. Can I book?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-rose to-rose-deep text-white py-2.5 text-xs font-semibold shadow-md hover:scale-[1.02] transition-transform group"
                >
                  Book & Earn
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
