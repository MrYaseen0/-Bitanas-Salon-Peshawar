"use client";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { MysteryWheel } from "./mystery-wheel";
import { BeautySwiper } from "./beauty-swiper";
import { GlowScoreCard } from "./glow-score-card";
import { BeautyPersonalityCard } from "./beauty-personality-card";
import { GlowStreak } from "./glow-streak";
import { LoyaltyPass } from "./loyalty-pass";
import { DailyBeautyTip } from "./daily-beauty-tip";
import { BeautyMoodBoard } from "./beauty-mood-board";
import { VirtualTryOn } from "./virtual-try-on";
import { BeautyQuiz } from "./beauty-quiz";

const TABS = [
  { id: "wheel", label: "Mystery Wheel", component: MysteryWheel },
  { id: "tryon", label: "Virtual Try-On", component: VirtualTryOn },
  { id: "swiper", label: "Style Finder", component: BeautySwiper },
  { id: "quiz", label: "Beauty Quiz", component: BeautyQuiz },
  { id: "score", label: "Glow Score", component: GlowScoreCard },
  { id: "personality", label: "Personality", component: BeautyPersonalityCard },
  { id: "streak", label: "Glow Streak", component: GlowStreak },
  { id: "pass", label: "Loyalty Pass", component: LoyaltyPass },
  { id: "mood", label: "Mood Board", component: BeautyMoodBoard },
  { id: "tip", label: "Daily Tip", component: DailyBeautyTip },
];

export function ExperienceZone() {
  const [active, setActive] = useState(TABS[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ActiveComponent = TABS.find((t) => t.id === active)?.component;

  return (
    <section className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-rose-soft/10 via-white to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Experience <span className="text-gradient-rose">Zone</span>
          </h2>
          <p className="mt-4 text-foreground/60 leading-relaxed">
            Interactive tools to discover your style, try on colours, and earn rewards.
          </p>
        </div>

        <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur border-b border-rose-soft/10 mb-8">
          <div ref={scrollRef} className="flex overflow-x-auto gap-1 py-3 scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                  active === tab.id
                    ? "bg-rose-deep text-white shadow-sm"
                    : "bg-rose-soft/20 text-foreground/60 hover:bg-rose-soft/40 hover:text-foreground"
                )}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[400px]">
          {ActiveComponent && (
            <div className="-my-24 sm:-my-28">
              <ActiveComponent />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
