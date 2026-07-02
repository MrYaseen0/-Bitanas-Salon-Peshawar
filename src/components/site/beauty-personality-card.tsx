"use client";
import { useState, useRef } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import { Share2, Sparkles, Check, Copy, Sparkle, Palette, Crown, Gem, Heart, Zap } from "lucide-react";

const PERSONALITIES = [
  {
    id: "glow-seeker",
    icon: Sparkle,
    title: "The Glow Seeker",
    desc: "You chase radiance like it's your superpower. Facials, spa rituals, anything that makes you shine.",
    recs: ["Signature Facial", "Spa Ritual", "Glow Boosting Products"],
  },
  {
    id: "color-artist",
    icon: Palette,
    title: "The Color Artist",
    desc: "Hair is your canvas. Balayage, color melts, bold hues — you love experimenting with your look.",
    recs: ["Signature Balayage", "Color Melt", "Gloss Treatment"],
  },
  {
    id: "bridal-queen",
    icon: Crown,
    title: "The Bridal Queen",
    desc: "You believe every bride deserves to feel like royalty. Full glam, flawless execution, no compromises.",
    recs: ["Bridal Royale Package", "Pre-Bridal Facial", "Trial Session"],
  },
  {
    id: "nail-artist",
    icon: Gem,
    title: "The Nail Artist",
    desc: "Your hands are your accessory. Acrylics, art, gels — you treat every appointment as a masterpiece.",
    recs: ["Acrylic Nails", "Gel Art", "Spa Mani/Pedi"],
  },
  {
    id: "self-care-sage",
    icon: Heart,
    title: "The Self-Care Sage",
    desc: "You know beauty starts from within. Massages, facials, quiet moments — you prioritize you.",
    recs: ["Relaxation Spa", "Signature Facial", "Body Waxing"],
  },
  {
    id: "trendsetter",
    icon: Zap,
    title: "The Trendsetter",
    desc: "You're always one step ahead. The newest looks, boldest choices, most talked-about styles.",
    recs: ["Bold Glam Makeup", "Statement Nails", "Trend Haircut"],
  },
];

export function BeautyPersonalityCard() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [personality, setPersonality] = useLocalStorage<string>("bitanas:personality", "");
  const [selected, setSelected] = useState(personality);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const current = PERSONALITIES.find((p) => p.id === selected);
  const CurrentIcon = current?.icon;
  const [showResult, setShowResult] = useState(!!personality);

  const handleSelect = (id: string) => {
    setSelected(id);
    setPersonality(id);
    setShowResult(true);
  };

  const handleShare = () => {
    if (!current) return;
    const text = `✨ My Beauty Personality: ${current.title} ${current.emoji}\n\n${current.desc}\n\nDiscover yours at Bitanas Salon! bitanas.pk`;
    if (navigator.share) {
      navigator.share({ title: "My Beauty Personality", text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const reset = () => {
    setShowResult(false);
    setSelected("");
  };

  return (
    <section id="beauty-personality" className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-rose-soft/10 to-transparent" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            What&apos;s Your Beauty <span className="text-gradient-rose">Personality</span>?
          </h2>
        </div>

        <div ref={ref} className={cn("transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          {!showResult ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PERSONALITIES.map((p) => {
                const Icon = p.icon;
                return (
                  <button key={p.id} onClick={() => handleSelect(p.id)}
                    className="rounded-2xl border border-rose-soft/20 p-5 text-left transition-all hover:border-rose/30 bg-white hover:shadow-md">
                    <Icon className="h-6 w-6 text-foreground/50" />
                    <h3 className="mt-2 font-bold text-foreground text-sm">{p.title}</h3>
                    <p className="mt-1 text-xs text-foreground/60 leading-relaxed">{p.desc}</p>
                  </button>
                );
              })}
            </div>
          ) : current && CurrentIcon && (
            <div ref={cardRef} className="max-w-md mx-auto">
              <div className="rounded-2xl bg-white border border-rose-soft/20 shadow-md p-8 text-center">
                <CurrentIcon className="h-10 w-10 text-foreground/50 mx-auto animate-scale-in" />
                <h3 className="mt-4 font-serif text-2xl font-bold text-foreground">{current.title}</h3>
                <p className="mt-2 text-foreground/60 text-sm leading-relaxed">{current.desc}</p>

                <div className="mt-5 space-y-2 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/40">Recommended</p>
                  {current.recs.map((rec, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-soft/10 text-sm">
                      <Sparkles className="h-3.5 w-3.5 text-foreground/40 shrink-0" />
                      <span className="text-foreground/80">{rec}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-2 justify-center">
                  <button onClick={handleShare}
                    className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-white px-5 py-2.5 text-xs font-semibold hover:opacity-90 transition-opacity">
                    {copied ? <><Check className="h-3.5 w-3.5" /> Copied!</> : <><Share2 className="h-3.5 w-3.5" /> Share</>}
                  </button>
                  <button onClick={reset}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white border border-rose-soft text-foreground/60 px-5 py-2.5 text-xs font-semibold hover:border-rose/50 transition-colors">
                    <Copy className="h-3.5 w-3.5" /> Pick Again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
