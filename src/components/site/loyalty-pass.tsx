"use client";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { Wallet, Sparkles, Download, Check, Award, Gem, Crown, Smartphone } from "lucide-react";
import { useState, useRef } from "react";

export function LoyaltyPass() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [phone] = useLocalStorage("bitanas:phone", "");
  const [points] = useLocalStorage("bitanas:loyalty-points", 0);
  const [tier, setTier] = useState<"rose" | "gold" | "elite">("rose");
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const tierData = {
    rose: { name: "Rose Member", color: "from-rose-soft to-rose", textColor: "text-rose-deep", icon: Award },
    gold: { name: "Gold Member", color: "from-amber-300 to-amber-500", textColor: "text-amber-700", icon: Gem },
    elite: { name: "Elite Maharani", color: "from-purple-400 to-purple-600", textColor: "text-purple-800", icon: Crown },
  };

  const current = tierData[tier];

  const generateQRDataURL = () => {
    const num = phone || "923709931504";
    return `https://wa.me/${num}?text=Loyalty%20Pass%20Check`;
  };

  const handleCopy = () => {
    const text = `Bitanas Loyalty Pass\nTier: ${current.name} ${current.icon}\nPoints: ${points}\nMember since: ${new Date().toLocaleDateString()}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const memberSince = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <section id="loyalty-pass" className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-rose-soft/15 via-white to-transparent" />
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-md mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Your <span className="text-gradient-rose">Loyalty Pass</span>
          </h2>
        </div>

        <div ref={ref} className={cn("transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className={cn("rounded-3xl bg-gradient-to-br p-[2px] shadow-lg", current.color)}>
            <div className="rounded-[22px] bg-white p-6 sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-foreground/30" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/30">Bitanas Loyalty</span>
                  </div>
                  <h3 className={cn("mt-3 font-serif text-2xl font-bold", current.textColor)}>{current.name}</h3>
                  <current.icon className={cn("h-6 w-6 mt-1", current.textColor)} />
                </div>
                <div className="text-right">
                  <div className={cn("text-3xl font-bold font-serif", current.textColor)}>{points}</div>
                  <div className="text-[10px] text-foreground/40 uppercase tracking-wider">Points</div>
                </div>
              </div>

              <div className="mt-5 flex justify-between items-center border-t border-rose-soft/20 pt-4">
                <div className="text-[11px] text-foreground/50">
                  <span className="block font-medium text-foreground/60">Member since</span>
                  {memberSince}
                </div>
                <div className="text-[11px] text-foreground/50 text-right">
                  <span className="block font-medium text-foreground/60">Phone</span>
                  {phone || "Not linked"}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={handleCopy}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-soft/30 py-2.5 text-xs font-semibold text-foreground/60 hover:bg-rose-soft/50 transition-colors">
                  {copied ? <><Check className="h-3.5 w-3.5" /> Copied!</> : <><Download className="h-3.5 w-3.5" /> Save</>}
                </button>
                <button onClick={() => setShowQr(!showQr)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-foreground py-2.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity">
                  <Sparkles className="h-3.5 w-3.5" /> {showQr ? "Hide Code" : "Show QR"}
                </button>
              </div>

              {showQr && (
                <div ref={qrRef} className="mt-4 p-4 bg-white rounded-2xl border border-rose-soft/20 flex flex-col items-center animate-scale-in">
                  <div className="w-28 h-28 bg-rose-soft/10 rounded-xl flex items-center justify-center border border-rose-soft/20">
                    <Smartphone className="h-8 w-8 text-foreground/30" />
                  </div>
                  <p className="mt-2 text-[10px] text-foreground/50">Show this at the salon</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { tier: "rose", label: "Rose", icon: Award },
              { tier: "gold", label: "Gold", icon: Gem },
              { tier: "elite", label: "Elite", icon: Crown },
            ].map((t) => {
              const TierIcon = t.icon;
              return (
                <div key={t.tier} className={cn("rounded-xl border py-2 text-xs", tier === t.tier ? "bg-rose-soft/20 border-rose/20 font-semibold text-rose-deep" : "border-rose-soft/10 text-foreground/30")}>
                  <TierIcon className="h-4 w-4 mx-auto mb-1" />
                  {t.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
