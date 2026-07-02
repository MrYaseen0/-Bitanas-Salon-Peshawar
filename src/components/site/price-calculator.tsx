"use client";

import { useState, useMemo } from "react";
import {
  Calculator,
  Clock,
  Plus,
  Check,
  Sparkles,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import {
  CALC_SERVICES,
  CALC_ADDONS,
  whatsappLink,
  SALON,
} from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function PriceCalculator() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<Record<string, boolean>>({
    "blow-dry": true,
  });
  const [addons, setAddons] = useState<Record<string, boolean>>({});

  const toggle = (id: string, isAddon: boolean) => {
    if (isAddon) {
      setAddons((a) => ({ ...a, [id]: !a[id] }));
    } else {
      setSelected((s) => ({ ...s, [id]: !s[id] }));
    }
  };

  const reset = () => {
    setSelected({});
    setAddons({});
  };

  const { total, duration, selectedServices, selectedAddons, estimatedPoints } =
    useMemo(() => {
      const sel = CALC_SERVICES.filter((s) => selected[s.id]);
      const adn = CALC_ADDONS.filter((a) => addons[a.id]);
      const total = sel.reduce((sum, s) => sum + s.basePrice, 0) + adn.reduce((sum, a) => sum + a.price, 0);
      const duration = sel.reduce((sum, s) => sum + s.duration, 0);
      const points = Math.floor(total / 100);
      return {
        total,
        duration,
        selectedServices: sel,
        selectedAddons: adn,
        estimatedPoints: points,
      };
    }, [selected, addons]);

  const bookLink = whatsappLink(
    `Hi Bitanas Salon! ✨ I'd like to book the following:\n${selectedServices
      .map((s) => `• ${s.name} (PKR ${s.basePrice.toLocaleString()})`)
      .join("\n")}${
      selectedAddons.length
        ? `\nAdd-ons:\n${selectedAddons
            .map((a) => `• ${a.name} (PKR ${a.price.toLocaleString()})`)
            .join("\n")}`
        : ""
    }\nEstimated total: PKR ${total.toLocaleString()}. Could you confirm availability?`
  );

  const formatDuration = (mins: number) => {
    if (mins === 0) return "—";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} hr`;
    return `${h} hr ${m} min`;
  };

  return (
    <section
      id="calculator"
      className="relative py-24 sm:py-28 bg-gradient-to-b from-white via-rose-soft/20 to-white"
    >
      <div className="absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Plan Your Visit
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Build Your <span className="text-gradient-rose">Beauty Bill</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            Pick the services you want, add any extras, and get an instant
            estimate — then book it in one tap on WhatsApp.
          </p>
        </div>

        <div
          ref={ref}
          className={cn(
            "mt-12 grid lg:grid-cols-3 gap-6 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Services + addons (left, 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Services */}
            <div className="rounded-3xl bg-white border border-rose-soft/50 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-soft text-rose-deep">
                    <Calculator className="h-4 w-4" />
                  </span>
                  Select Services
                </h3>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/50 hover:text-rose-deep transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {CALC_SERVICES.map((s) => {
                  const isOn = !!selected[s.id];
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggle(s.id, false)}
                      className={cn(
                        "group flex items-start gap-3 p-3 rounded-2xl border-2 text-left transition-all",
                        isOn
                          ? "border-rose bg-rose-soft/40 shadow-sm"
                          : "border-rose-soft/40 hover:border-rose/40 hover:bg-rose-soft/20"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all mt-0.5",
                          isOn
                            ? "bg-gradient-to-br from-rose to-rose-deep border-transparent text-white"
                            : "border-rose-soft text-transparent"
                        )}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="text-xs px-1.5 py-0.5 rounded bg-rose-soft/60 text-rose-deep font-medium">
                            {s.category}
                          </span>
                        </span>
                        <span className="block text-sm font-semibold text-foreground mt-1">
                          {s.name}
                        </span>
                        <span className="flex items-center gap-3 mt-1 text-xs text-foreground/55">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDuration(s.duration)}
                          </span>
                          <span className="font-semibold text-rose-deep">
                            PKR {s.basePrice.toLocaleString()}
                          </span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add-ons */}
            <div className="rounded-3xl bg-white border border-rose-soft/50 p-5 sm:p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-foreground flex items-center gap-2 mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-soft text-amber-700">
                  <Plus className="h-4 w-4" />
                </span>
                Add-Ons
              </h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {CALC_ADDONS.map((a) => {
                  const isOn = !!addons[a.id];
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggle(a.id, true)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-2xl border-2 transition-all text-left",
                        isOn
                          ? "border-gold bg-gold-soft/40 shadow-sm"
                          : "border-rose-soft/40 hover:border-gold/40 hover:bg-gold-soft/20"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all",
                          isOn
                            ? "bg-gradient-to-br from-gold to-gold-soft border-transparent text-white"
                            : "border-rose-soft text-transparent"
                        )}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-foreground">
                          {a.name}
                        </span>
                        <span className="text-xs font-semibold text-amber-700">
                          + PKR {a.price.toLocaleString()}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Summary (right, sticky) */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="rounded-3xl bg-gradient-to-br from-rose-deep via-rose to-rose-deep p-6 text-white shadow-2xl shadow-rose/25 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                      <Sparkles className="h-5 w-5 text-gold" />
                    </span>
                    Your Estimate
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-white">
                    <Check className="h-3 w-3" />
                    {selectedServices.length + selectedAddons.length} item{selectedServices.length + selectedAddons.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Selected items */}
                <div className="mt-5 space-y-2 min-h-[60px]">
                  {selectedServices.length === 0 &&
                    selectedAddons.length === 0 && (
                      <div className="text-center py-6 px-3 rounded-2xl bg-white/10 border border-dashed border-white/30">
                        <Calculator className="h-8 w-8 mx-auto text-white/50 mb-2" />
                        <p className="text-sm text-white/75">
                          Select services to see your estimate ✨
                        </p>
                      </div>
                    )}
                  {selectedServices.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1.5">
                        Services
                      </p>
                      <div className="space-y-1.5">
                        {selectedServices.map((s) => (
                          <div
                            key={s.id}
                            className="flex items-center justify-between text-sm rounded-lg bg-white/10 px-2.5 py-1.5"
                          >
                            <span className="text-white/90 truncate pr-2 flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                              {s.name}
                            </span>
                            <span className="font-semibold whitespace-nowrap tabular-nums">
                              {s.basePrice.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedAddons.length > 0 && (
                    <div className="pt-1">
                      <p className="text-[10px] uppercase tracking-wider text-white/60 font-bold mb-1.5">
                        Add-ons
                      </p>
                      <div className="space-y-1.5">
                        {selectedAddons.map((a) => (
                          <div
                            key={a.id}
                            className="flex items-center justify-between text-sm text-white/75"
                          >
                            <span className="truncate pr-2 flex items-center gap-1.5">
                              <Plus className="h-3 w-3 text-white/50" />
                              {a.name}
                            </span>
                            <span className="font-semibold whitespace-nowrap tabular-nums">
                              {a.price.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Duration */}
                {duration > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-1.5 text-white/80">
                      <Clock className="h-4 w-4" />
                      Est. Duration
                    </span>
                    <span className="font-semibold">{formatDuration(duration)}</span>
                  </div>
                )}

                {/* Total */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-white/80 uppercase tracking-wider">
                      Total
                    </span>
                    <span className="font-serif text-3xl font-bold">
                      PKR {total.toLocaleString()}
                    </span>
                  </div>
                  {estimatedPoints > 0 && (
                    <p className="mt-2 text-xs text-gold inline-flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Earn ~{estimatedPoints} loyalty points
                    </p>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={total > 0 ? bookLink : "#calculator"}
                  target={total > 0 ? "_blank" : undefined}
                  rel={total > 0 ? "noopener noreferrer" : undefined}
                  className={cn(
                    "mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold transition-all group",
                    total > 0
                      ? "bg-white text-rose-deep hover:bg-cream hover:scale-[1.02]"
                      : "bg-white/15 text-white/50 cursor-not-allowed"
                  )}
                >
                  {total > 0 ? (
                    <>
                      Book This on WhatsApp
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  ) : (
                    "Select a service to book"
                  )}
                </a>

                <p className="mt-3 text-center text-[10px] text-white/55">
                  Estimate only — final price confirmed at salon. Call {SALON.phone} for exact quotes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
