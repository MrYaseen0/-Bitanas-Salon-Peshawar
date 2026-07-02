"use client";

import { Check, X, Star, ArrowRight } from "lucide-react";
import {
  COMPARISON_FEATURES,
  COMPARISON_TIERS,
  whatsappLink,
} from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

function CellValue({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white shadow-sm">
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground/40">
        <X className="h-3.5 w-3.5" />
      </span>
    );
  return (
    <span className="text-sm font-medium text-foreground/80">{value}</span>
  );
}

export function Comparison() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const accentClasses: Record<string, { header: string; cell: string }> = {
    rose: { header: "text-rose-deep", cell: "" },
    gold: { header: "text-amber-700", cell: "bg-gold-soft/20" },
    deep: { header: "text-rose-deep", cell: "" },
  };

  return (
    <section
      id="comparison"
      className="relative py-24 sm:py-28 bg-gradient-to-b from-white via-rose-soft/20 to-white"
    >
      <div className="absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Compare Tiers
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Find Your Perfect <span className="text-gradient-rose">Service Level</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            Three experience tiers designed around your time, budget and
            occasion. Compare what&apos;s included at a glance.
          </p>
        </div>

        {/* Comparison table */}
        <div
          ref={ref}
          className={cn(
            "mt-12 rounded-3xl bg-white border border-rose-soft/50 shadow-xl shadow-rose/5 overflow-hidden transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-rose-soft/50">
                  <th className="text-left p-5 font-semibold text-foreground/60 text-sm uppercase tracking-wider min-w-[220px]">
                    Features
                  </th>
                  {COMPARISON_TIERS.map((tier) => (
                    <th
                      key={tier.id}
                      className={cn(
                        "p-5 text-center relative",
                        tier.popular && "bg-gold-soft/20"
                      )}
                    >
                      {tier.popular && (
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose to-rose-deep text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-b-md">
                          Popular
                        </span>
                      )}
                      <div className="pt-3">
                        <p
                          className={cn(
                            "font-serif text-xl font-bold",
                            accentClasses[tier.accent].header
                          )}
                        >
                          {tier.name}
                        </p>
                        <p className="text-xs text-foreground/50 mt-0.5">
                          {tier.tagline}
                        </p>
                        <p className="mt-2 font-semibold text-foreground">
                          {tier.price}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      "border-b border-rose-soft/30 last:border-0 hover:bg-rose-soft/10 transition-colors",
                      i % 2 === 1 && "bg-rose-soft/5"
                    )}
                  >
                    <td className="p-4 text-sm text-foreground/75 font-medium">
                      {row.feature}
                    </td>
                    <td className="p-4 text-center">
                      <CellValue value={row.express} />
                    </td>
                    <td className={cn("p-4 text-center", tier_popular_cell())}>
                      <CellValue value={row.signature} />
                    </td>
                    <td className="p-4 text-center">
                      <CellValue value={row.premium} />
                    </td>
                  </tr>
                ))}
                {/* CTA row */}
                <tr>
                  <td className="p-5"></td>
                  {COMPARISON_TIERS.map((tier) => (
                    <td
                      key={tier.id}
                      className={cn(
                        "p-5 text-center",
                        tier.popular && "bg-gold-soft/20"
                      )}
                    >
                      <a
                        href={whatsappLink(
                          `Hi Bitanas Salon! ✨ I'm interested in the ${tier.name} service tier (${tier.price}). Can you help me book?`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all hover:scale-[1.03] group",
                          tier.popular
                            ? "bg-gradient-to-r from-rose to-rose-deep text-white shadow-md"
                            : "bg-rose-soft text-rose-deep hover:bg-rose hover:text-white"
                        )}
                      >
                        Book {tier.name}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-rose-soft/40">
            {COMPARISON_TIERS.map((tier) => (
              <div key={tier.id} className={cn("p-5", tier.popular && "bg-gold-soft/15")}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className={cn("font-serif text-lg font-bold", accentClasses[tier.accent].header)}>
                        {tier.name}
                      </p>
                      {tier.popular && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                          <Star className="h-3 w-3 fill-current" />
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-foreground/50">{tier.tagline}</p>
                  </div>
                  <p className="font-semibold text-foreground">{tier.price}</p>
                </div>
                <ul className="space-y-2 mb-4">
                  {COMPARISON_FEATURES.map((row) => (
                    <li key={row.feature} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-foreground/65">{row.feature}</span>
                      <CellValue value={row[tier.id as "express" | "signature" | "premium"]} />
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappLink(
                    `Hi Bitanas Salon! ✨ I'm interested in the ${tier.name} service tier (${tier.price}). Can you help me book?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all",
                    tier.popular
                      ? "bg-gradient-to-r from-rose to-rose-deep text-white shadow-md"
                      : "bg-rose-soft text-rose-deep"
                  )}
                >
                  Book {tier.name}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-foreground/45">
          All tiers include a complimentary consultation and our signature
          hospitality. Prices are starting points — final quote at booking.
        </p>
      </div>
    </section>
  );
}

function tier_popular_cell() {
  return "bg-gold-soft/20";
}
