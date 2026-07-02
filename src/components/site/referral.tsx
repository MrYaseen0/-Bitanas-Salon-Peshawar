"use client";

import { useState } from "react";
import {
  Gift,
  Heart,
  Sparkles,
  Users,
  Copy,
  Check,
  ArrowRight,
  Share2,
} from "lucide-react";
import { REFERRAL_BENEFITS, REFERRAL_STEPS, whatsappLink, SALON } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const ICONS = { gift: Gift, heart: Heart, sparkles: Sparkles };

export function Referral() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Generate a pseudo referral code (in production this would come from the user's account)
  const code = "BITANAS-GLOW-4F2A";

  const shareLink = whatsappLink(
    `Hi! ✨ I highly recommend Bitanas Salon in Hayatabad, Peshawar. Use my referral code ${code} and you'll get 10% off your first appointment! Book here: ${SALON.phoneHref}`
  );

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast({
        title: "Code copied! 💖",
        description: "Now share it with your friends & family.",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast({
        title: "Couldn't copy",
        description: "Please copy the code manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      id="referral"
      className="relative py-24 sm:py-28 overflow-hidden"
    >
      <div className="absolute top-1/4 -right-32 h-[420px] w-[420px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -left-32 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Refer & Earn
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Share the Glow, <span className="text-gradient-rose">Earn Together</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            Love your Bitanas experience? Spread the word and you&apos;ll both
            get rewarded — discounts + bonus loyalty points, every single time.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid sm:grid-cols-3 gap-5">
          {REFERRAL_BENEFITS.map((b, i) => {
            const Icon = ICONS[b.icon as keyof typeof ICONS];
            return (
              <div
                key={b.title}
                className={cn(
                  "group relative rounded-3xl bg-white border border-rose-soft/50 p-6 text-center hover:shadow-xl hover:shadow-rose/10 transition-all duration-500 card-lift overflow-hidden",
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-rose-soft/30 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose to-rose-deep text-white shadow-lg shadow-rose/25 group-hover:scale-110 transition-transform">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-bold text-foreground">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* How it works + code generator */}
        <div
          ref={ref}
          className={cn(
            "mt-10 grid lg:grid-cols-5 gap-6 items-stretch transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Steps */}
          <div className="lg:col-span-3 rounded-3xl bg-white border border-rose-soft/50 p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-foreground flex items-center gap-2 mb-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-soft text-rose-deep">
                <Users className="h-5 w-5" />
              </span>
              How It Works
            </h3>
            <div className="space-y-5">
              {REFERRAL_STEPS.map((s, i) => (
                <div key={s.step} className="flex items-start gap-4 group">
                  <div className="relative shrink-0">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose to-rose-deep text-white font-serif text-lg font-bold shadow-md group-hover:scale-110 transition-transform">
                      {s.step}
                    </span>
                    {i < REFERRAL_STEPS.length - 1 && (
                      <span className="absolute top-11 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-rose/40 to-transparent" />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-semibold text-foreground">{s.title}</h4>
                    <p className="text-sm text-foreground/60 mt-0.5 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code generator card */}
          <div className="lg:col-span-2 relative rounded-3xl bg-gradient-to-br from-rose-deep via-rose to-rose-deep p-6 sm:p-8 text-white shadow-2xl shadow-rose/25 overflow-hidden">
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
                backgroundSize: "22px 22px, 28px 28px",
              }}
            />
            <div className="relative flex flex-col h-full">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                  <Share2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-serif text-lg font-bold leading-tight">
                    Your Referral Code
                  </p>
                  <p className="text-[11px] text-white/75">
                    Tap to copy &amp; share
                  </p>
                </div>
              </div>

              {/* Code box */}
              <button
                onClick={copyCode}
                className="mt-5 w-full rounded-2xl bg-white/95 backdrop-blur border-2 border-dashed border-white/60 px-4 py-4 flex items-center justify-between gap-2 hover:bg-white transition-colors group"
                aria-label="Copy referral code"
              >
                <span className="font-mono font-bold text-lg text-rose-deep tracking-wider">
                  {code}
                </span>
                {copied ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Copy className="h-5 w-5 text-rose-deep/60 group-hover:text-rose-deep transition-colors" />
                )}
              </button>

              <p className="mt-3 text-xs text-white/70 leading-relaxed">
                Share this code with friends. When they book &amp; visit, you
                both get 10% off + 100 bonus points.
              </p>

              {/* Share buttons */}
              <div className="mt-auto pt-5 space-y-2.5">
                <a
                  href={shareLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-rose-deep py-3 text-sm font-semibold hover:bg-cream hover:scale-[1.02] transition-all group"
                >
                  <Share2 className="h-4 w-4" />
                  Share on WhatsApp
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    "https://bitanas.pk"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-white/15 backdrop-blur py-2.5 text-xs font-semibold hover:bg-white/25 transition-colors"
                >
                  Share on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="mt-8 text-center text-xs text-foreground/45 max-w-2xl mx-auto">
          <Sparkles className="inline h-3.5 w-3.5 text-gold mr-1" />
          No limit on referrals — keep sharing, keep earning! Rewards are
          credited within 24 hours of your friend&apos;s completed visit.
        </p>
      </div>
    </section>
  );
}
