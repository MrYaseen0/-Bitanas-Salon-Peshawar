"use client";

import { useState } from "react";
import {
  Gift,
  Sparkles,
  Check,
  ArrowRight,
  Mail,
  Wallet,
  Search,
  Loader2,
  CheckCircle2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GIFT_CARDS, whatsappLink } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { GiftCardPurchase } from "@/components/site/gift-card-purchase";
import { cn } from "@/lib/utils";

export function GiftCards() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      id="gift-cards"
      className="relative py-24 sm:py-28 overflow-hidden"
    >
      <div className="absolute top-1/4 -left-32 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[120px] -z-10" />
      <div className="absolute bottom-10 -right-32 h-[400px] w-[400px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: intro */}
          <div>
            <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              The Perfect Gift
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Gift the Glow of{" "}
              <span className="text-gradient-rose">Bitanas</span>
            </h2>
            <p className="mt-5 text-foreground/60 leading-relaxed">
              Treat someone you love to a luxury beauty experience they&apos;ll
              never forget. Our digital gift cards never expire and can be used
              across any service — from a quick blow dry to a full bridal
              package.
            </p>

            {/* Features list */}
            <ul className="mt-7 space-y-3">
              {[
                "Digital delivery — instant or schedule for a special date",
                "Never expires · use across any service",
                "Custom amounts available on request",
                "Beautifully designed e-card with your personal message",
              ].map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-2.5 text-sm text-foreground/75"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-soft text-rose-deep mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  {feat}
                </li>
              ))}
            </ul>

            {/* Purchase CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <GiftCardPurchase
                triggerLabel="Buy Gift Card"
                variant="primary"
              />
              <a
                href={whatsappLink(
                  "Hi Bitanas Salon! ✨ I'd like to purchase a custom-amount gift card. Can you help?"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white border-2 border-rose-soft text-rose-deep hover:bg-rose-soft/50 px-6 py-3 text-sm font-semibold transition-colors group h-11"
              >
                <Mail className="h-4 w-4" />
                Custom Amount
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right: gift card tiers */}
          <div
            ref={ref}
            className={cn(
              "grid sm:grid-cols-1 gap-4 transition-all duration-700",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {GIFT_CARDS.map((card, i) => (
              <GiftCardTile key={card.amount} card={card} index={i} />
            ))}
          </div>
        </div>

        {/* Balance checker */}
        <BalanceChecker />
      </div>
    </section>
  );
}

function BalanceChecker() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(
        "/api/giftcard?code=" + encodeURIComponent(code.trim())
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Not found");
      } else {
        setResult(data);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 rounded-3xl bg-white border border-rose-soft/50 p-6 sm:p-8 shadow-sm">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-rose-deep">
            <Wallet className="h-3 w-3" />
            Balance Check
          </span>
          <h3 className="mt-3 font-serif text-2xl font-bold text-foreground">
            Check Your Gift Card Balance
          </h3>
          <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
            Already have a Bitanas gift card? Enter your code below to see your
            remaining balance and status instantly.
          </p>
          <p className="mt-3 text-xs text-foreground/45">
            Try a demo code:{" "}
            <button
              onClick={() => setCode("BITANAS-GLAM-10000")}
              className="font-mono font-semibold text-rose-deep hover:underline"
            >
              BITANAS-GLAM-10000
            </button>
          </p>
        </div>

        <div>
          <form onSubmit={check} className="space-y-3">
            <div className="relative">
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. BITANAS-GLOW-5000"
                className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-12 font-mono text-sm tracking-wider pr-10"
              />
              <Gift className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-rose-deep/50" />
            </div>
            <Button
              type="submit"
              disabled={loading || !code.trim()}
              className="w-full rounded-xl bg-gradient-to-r from-rose to-rose-deep text-white h-11 font-semibold disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Check Balance
                </>
              )}
            </Button>
          </form>

          {/* Result */}
          {error && (
            <div className="mt-3 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700 flex items-start gap-2">
              <X className="h-4 w-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}
          {result && (
            <div className="mt-3 rounded-xl bg-green-50 border border-green-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-700">
                  <CheckCircle2 className="h-4 w-4" />
                  {result.status === "active" ? "Active" : result.status}
                </span>
                <span className="text-[10px] text-foreground/45 font-mono">
                  {result.code}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-foreground/45 font-semibold">
                    Original
                  </p>
                  <p className="font-serif text-lg font-bold text-foreground">
                    PKR {result.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-green-700 font-semibold">
                    Balance
                  </p>
                  <p className="font-serif text-lg font-bold text-green-700">
                    PKR {result.balance.toLocaleString()}
                  </p>
                </div>
              </div>
              {result.recipientName && (
                <p className="mt-2 text-xs text-foreground/55">
                  For: {result.recipientName}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GiftCardTile({
  card,
  index,
}: {
  card: (typeof GIFT_CARDS)[number];
  index: number;
}) {
  const { ref: tileRef, visible } = useReveal<HTMLDivElement>();
  const link = whatsappLink(
    `Hi Bitanas Salon! ✨ I'd like to buy a ${card.label} gift card (PKR ${card.amount.toLocaleString()}).`
  );

  return (
    <div
      ref={tileRef}
      className={cn(
        "group relative rounded-3xl overflow-hidden transition-all duration-500 card-lift",
        card.popular
          ? "bg-gradient-to-br from-rose-deep via-rose to-rose-deep text-white shadow-2xl shadow-rose/30 ring-2 ring-gold/40"
          : "bg-white border border-rose-soft/50 text-foreground hover:shadow-xl hover:shadow-rose/10",
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Decorative pattern */}
      <div
        className={cn(
          "absolute inset-0 opacity-10 pointer-events-none",
          card.popular && "opacity-20"
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Popular badge */}
      {card.popular && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-gold text-amber-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md">
          <Sparkles className="h-3 w-3" />
          Popular
        </span>
      )}

      <div className="relative p-6 flex items-center gap-5">
        {/* Gift icon */}
        <div
          className={cn(
            "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-lg",
            card.popular
              ? "bg-white/20 backdrop-blur text-white"
              : "bg-gradient-to-br from-rose-soft to-rose-soft/40 text-rose-deep"
          )}
        >
          <Gift className="h-8 w-8" />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-serif text-3xl font-bold">
              PKR {card.amount.toLocaleString()}
            </span>
            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-wider",
                card.popular ? "text-white/80" : "text-rose-deep"
              )}
            >
              {card.label}
            </span>
          </div>
          <p
            className={cn(
              "text-sm mt-1 leading-relaxed",
              card.popular ? "text-white/85" : "text-foreground/60"
            )}
          >
            {card.perks}
          </p>
        </div>

        {/* Buy button */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "shrink-0 inline-flex items-center justify-center h-11 w-11 rounded-full transition-all hover:scale-110",
            card.popular
              ? "bg-white text-rose-deep hover:bg-cream"
              : "bg-gradient-to-br from-rose to-rose-deep text-white shadow-md"
          )}
          aria-label={`Buy ${card.label} gift card`}
        >
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
