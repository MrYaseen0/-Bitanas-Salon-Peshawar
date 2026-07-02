"use client";

import { Check, Crown, Heart, Sparkles, Clock, ArrowRight } from "lucide-react";
import { PACKAGES, whatsappLink, type BridalPackage } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const ACCENT: Record<
  BridalPackage["accent"],
  { border: string; bg: string; btn: string; chip: string; glow: string }
> = {
  rose: {
    border: "border-rose-soft/60",
    bg: "bg-white",
    btn: "bg-rose-soft text-rose-deep hover:bg-rose hover:text-white",
    chip: "bg-rose-soft text-rose-deep",
    glow: "bg-rose/10",
  },
  gold: {
    border: "border-gold-soft/60",
    bg: "bg-white",
    btn: "bg-gradient-to-r from-gold to-gold-soft text-white hover:shadow-lg hover:shadow-gold/30",
    chip: "bg-gold-soft text-amber-800",
    glow: "bg-gold/10",
  },
  deep: {
    border: "border-rose-deep/40",
    bg: "bg-gradient-to-br from-white via-rose-soft/20 to-white",
    btn: "bg-gradient-to-r from-rose to-rose-deep text-white hover:shadow-lg hover:shadow-rose/30",
    chip: "bg-rose-deep text-white",
    glow: "bg-rose-deep/15",
  },
};

const ICONS = [Heart, Crown, Sparkles];

function PackageCard({
  pkg,
  index,
}: {
  pkg: BridalPackage;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const accent = ACCENT[pkg.accent];
  const Icon = ICONS[index % ICONS.length];
  const isPopular = pkg.popular;

  const bookLink = whatsappLink(
    `Hi Bitanas Salon! ✨ I'm interested in the "${pkg.name}" bridal package (${pkg.price}). Could you share availability and next steps?`
  );

  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-3xl border-2 shadow-sm transition-all duration-500 card-lift overflow-hidden",
        accent.border,
        accent.bg,
        isPopular
          ? "lg:scale-105 lg:-mt-4 shadow-xl shadow-rose/15 ring-2 ring-rose-deep/30"
          : "hover:shadow-xl hover:shadow-rose/10",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Glow */}
      <div
        className={cn(
          "absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-60",
          accent.glow
        )}
      />

      {/* Popular ribbon */}
      {isPopular && (
        <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-rose via-rose-deep to-rose text-white text-center py-1.5 text-xs font-bold uppercase tracking-[0.2em] shadow-md">
          ★ Most Popular ★
        </div>
      )}

      <div className={cn("relative p-7", isPopular && "pt-12")}>
        {/* Icon + name */}
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl shadow-md",
              accent.chip
            )}
          >
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-serif text-2xl font-bold text-foreground leading-tight">
              {pkg.name}
            </h3>
            <p className="text-xs text-foreground/55 mt-0.5">{pkg.tagline}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-end gap-2">
          <span className="font-serif text-4xl font-bold text-gradient-rose">
            {pkg.price}
          </span>
          {pkg.originalPrice && (
            <span className="text-sm text-foreground/40 line-through mb-1">
              {pkg.originalPrice}
            </span>
          )}
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-foreground/50">
          <Clock className="h-3.5 w-3.5" />
          {pkg.duration}
        </div>

        {/* Includes */}
        <ul className="mt-6 space-y-2.5">
          {pkg.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm">
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5",
                  accent.chip
                )}
              >
                <Check className="h-3 w-3" />
              </span>
              <span className="text-foreground/75 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={bookLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-7 w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold transition-all hover:scale-[1.02] group",
            accent.btn
          )}
        >
          Book on WhatsApp
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

export function Packages() {
  return (
    <section
      id="packages"
      className="relative py-24 sm:py-28 bg-gradient-to-b from-white via-rose-soft/20 to-white"
    >
      <div className="absolute top-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Bridal Packages
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Curated Bridal <span className="text-gradient-rose">Experiences</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            From intimate essentials to the full Maharani experience — choose a
            package designed around your big day. All packages include a trial
            session and premium products.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-gradient-to-r from-rose-deep/5 via-rose-soft/30 to-gold-soft/20 border border-rose-soft/50 p-6 sm:p-8 text-center">
          <p className="font-serif text-lg sm:text-xl font-semibold text-foreground">
            Planning a destination wedding or need a custom package?
          </p>
          <p className="mt-2 text-sm text-foreground/60 max-w-2xl mx-auto">
            We tailor bespoke bridal experiences for destination weddings, group
            bookings (bridesmaids & family), and multi-day events. Let&apos;s
            design something uniquely yours.
          </p>
          <a
            href={whatsappLink(
              "Hi Bitanas Salon! ✨ I'd like to discuss a custom bridal package. Can we talk?"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rose-deep text-white px-7 py-3 text-sm font-semibold shadow-lg shadow-rose/25 hover:scale-[1.03] transition-transform"
          >
            <Sparkles className="h-4 w-4" />
            Design My Custom Package
          </a>
        </div>
      </div>
    </section>
  );
}
