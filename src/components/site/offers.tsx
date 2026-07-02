"use client";

import { useState, useEffect } from "react";
import { Tag, Copy, Check, Clock, Sparkles, Flame, TrendingUp } from "lucide-react";
import { OFFERS, whatsappLink, type Offer } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

function useCountdown(target: string) {
  const [remaining, setRemaining] = useState(() => calc(target));
  useEffect(() => {
    const id = setInterval(() => setRemaining(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return remaining;
}

function calc(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

const ACCENT: Record<Offer["accent"], { ring: string; bg: string; text: string; chip: string }> = {
  rose: {
    ring: "ring-rose-soft/60",
    bg: "from-rose-soft/50 to-white",
    text: "text-rose-deep",
    chip: "bg-rose-soft text-rose-deep",
  },
  gold: {
    ring: "ring-gold-soft/60",
    bg: "from-gold-soft/40 to-white",
    text: "text-gold",
    chip: "bg-gold-soft text-amber-800",
  },
  deep: {
    ring: "ring-rose-deep/30",
    bg: "from-rose-deep/5 to-white",
    text: "text-rose-deep",
    chip: "bg-rose-deep text-white",
  },
};

function OfferCard({ offer, index }: { offer: Offer; index: number }) {
  const time = useCountdown(offer.validUntil);
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [copied, setCopied] = useState(false);
  const accent = ACCENT[offer.accent];

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(offer.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const claim = whatsappLink(
    `Hi Bitanas Salon! ✨ I'd like to claim the "${offer.title}" offer (code: ${offer.code}). Could you help me book?`
  );

  return (
    <div
      ref={ref}
      className={cn(
        "group relative rounded-3xl overflow-hidden bg-gradient-to-br border shadow-sm hover:shadow-2xl hover:shadow-rose/15 transition-all duration-500 card-lift",
        accent.bg,
        accent.ring,
        "ring-1",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Decorative corner bloom */}
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-rose/15 to-gold/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* Badge */}
      <div className="relative p-5 pb-0 flex items-start justify-between">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow-sm",
            accent.chip
          )}
        >
          {offer.badge === "Limited Time" ? (
            <Flame className="h-3 w-3" />
          ) : (
            <Sparkles className="h-3 w-3" />
          )}
          {offer.badge}
        </span>
        <span className={cn("font-serif text-lg font-bold", accent.text)}>
          {offer.discount}
        </span>
      </div>

      <div className="relative p-5 pt-3">
        <h3 className="font-serif text-xl font-bold text-foreground">
          {offer.title}
        </h3>
        <p className="mt-1.5 text-sm text-foreground/60 leading-relaxed">
          {offer.description}
        </p>

        {/* Countdown */}
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/50">
            <Clock className="h-3.5 w-3.5" />
            Ends in
          </span>
          <div className="flex items-center gap-1.5">
            {[
              { v: time.days, l: "d" },
              { v: time.hours, l: "h" },
              { v: time.minutes, l: "m" },
              { v: time.seconds, l: "s" },
            ].map((unit) => (
              <span
                key={unit.l}
                className="inline-flex flex-col items-center justify-center rounded-lg bg-white/80 backdrop-blur border border-rose-soft/60 min-w-[38px] py-1 px-1.5 shadow-sm"
              >
                <span className="font-mono font-bold text-sm text-rose-deep leading-none tabular-nums">
                  {String(unit.v).padStart(2, "0")}
                </span>
                <span className="text-[9px] uppercase text-foreground/40 mt-0.5">
                  {unit.l}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Urgency bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] font-medium text-foreground/45 mb-1">
            <span className="inline-flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {Math.floor(Math.random() * 80) + 40} claimed this week
            </span>
            <span className="text-rose-deep font-bold">Limited stock</span>
          </div>
          <div className="h-1.5 rounded-full bg-rose-soft/40 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose to-rose-deep animate-pulse-soft"
              style={{ width: `${Math.min(85, 50 + (index + 1) * 12)}%` }}
            />
          </div>
        </div>

        {/* Promo code + claim */}
        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={copyCode}
            className="group/code flex-1 flex items-center justify-between gap-2 rounded-xl border-2 border-dashed border-rose/40 bg-white/60 px-3 py-2.5 hover:border-rose hover:bg-white transition-colors"
            aria-label="Copy promo code"
          >
            <span className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-rose-deep" />
              <span className="font-mono font-bold text-sm text-foreground tracking-wider">
                {offer.code}
              </span>
            </span>
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 text-foreground/40 group-hover/code:text-rose-deep transition-colors" />
            )}
          </button>
          <a
            href={claim}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-rose to-rose-deep text-white px-4 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-rose/30 hover:scale-[1.03] transition-all whitespace-nowrap"
          >
            Claim
          </a>
        </div>
      </div>
    </div>
  );
}

export function Offers() {
  return (
    <section
      id="offers"
      className="relative py-24 sm:py-28 overflow-hidden"
    >
      <div className="absolute top-10 left-1/3 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[120px] -z-10" />
      <div className="absolute bottom-10 right-1/4 h-[400px] w-[400px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Special Offers
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Limited-Time <span className="text-gradient-rose">Beauty Deals</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            Save on your favourite services with our seasonal promotions. Copy a
            code and claim it on WhatsApp — but hurry, these glow-ups don&apos;t
            last forever!
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {OFFERS.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-foreground/45">
          * Offers cannot be combined unless stated. Bridal packages excluded
          from referral discount. Subject to availability.
        </p>
      </div>
    </section>
  );
}
