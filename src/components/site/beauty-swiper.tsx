"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { Heart, X, Sparkles, ChevronLeft, Sun, Sparkle, Flower2 } from "lucide-react";

import { playSwipe } from "@/lib/audio-feedback";

interface SwipeCard {
  id: string;
  title: string;
  description: string;
  emoji: string;
  vibe: string;
}

const CARDS: SwipeCard[] = [
  { id: "soft-glam", title: "Soft Glam", description: "Dewy skin, fluffy lashes, nude lips", emoji: "Soft", vibe: "romantic" },
  { id: "bold-glam", title: "Bold Glam", description: "Smoky eye, defined contour, red lip", emoji: "Bold", vibe: "edgy" },
  { id: "balayage", title: "Sun-Kissed Balayage", description: "Hand-painted highlights, beachy waves", emoji: "Sun", vibe: "natural" },
  { id: "acrylic-art", title: "Statement Nails", description: "Long acrylics with custom art", emoji: "Nail", vibe: "edgy" },
  { id: "bridal", title: "Bridal Elegance", description: "Timeless bridal glam HD finish", emoji: "Bridal", vibe: "romantic" },
  { id: "spa-retreat", title: "Spa Retreat", description: "Full body relaxation ritual", emoji: "Spa", vibe: "natural" },
];

export function BeautySwiper() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [cards, setCards] = useState<SwipeCard[]>(CARDS);
  const [likes, setLikes] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [result, setResult] = useState<string>("");

  const current = cards[0];

  const handleSwipe = (dir: "left" | "right") => {
    if (!current) return;
    playSwipe();
    if (dir === "right") setLikes((p) => [...p, current.id]);
    setCards((p) => p.slice(1));
    setOffsetX(0);
    if (cards.length <= 1) {
      setDone(true);
      const liked = dir === "right" ? [...likes, current.id] : likes;
      const edgy = liked.filter((id) => CARDS.find((c) => c.id === id)?.vibe === "edgy").length;
      const romantic = liked.filter((id) => CARDS.find((c) => c.id === id)?.vibe === "romantic").length;
      const natural = liked.filter((id) => CARDS.find((c) => c.id === id)?.vibe === "natural").length;
      if (edgy >= romantic && edgy >= natural) setResult("🔥 Bold & Edgy");
      else if (romantic >= natural) setResult("🌸 Soft & Romantic");
      else setResult("🌿 Natural & Fresh");
    }
  };

  const handleTouchStart = (x: number) => { setStartX(x); setSwiping(true); };
  const handleTouchMove = (x: number) => { if (swiping) setOffsetX(x - startX); };
  const handleTouchEnd = () => {
    if (offsetX > 80) handleSwipe("right");
    else if (offsetX < -80) handleSwipe("left");
    else setOffsetX(0);
    setSwiping(false);
  };

  const reset = () => {
    setCards(CARDS);
    setLikes([]);
    setDone(false);
    setResult("");
    setOffsetX(0);
  };

  const rotate = offsetX * 0.05;

  return (
    <section id="beauty-swiper" className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-rose-soft/10 to-transparent" />
      <div className="absolute top-1/4 -left-32 h-[420px] w-[420px] rounded-full bg-rose-soft/20 blur-[120px] -z-10" />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Find Your <span className="text-gradient-rose">Style</span>
          </h2>
          <p className="mt-4 text-foreground/60 leading-relaxed">Swipe right or left to discover your beauty personality.</p>
        </div>

        <div ref={ref} className={cn("transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          {!done ? (
            <div className="flex flex-col items-center">
              <div
                className="relative w-full max-w-sm h-[340px] cursor-grab active:cursor-grabbing select-none"
                onMouseDown={(e) => handleTouchStart(e.clientX)}
                onMouseMove={(e) => swiping && handleTouchMove(e.clientX)}
                onMouseUp={handleTouchEnd}
                onMouseLeave={() => { if (swiping) { setOffsetX(0); setSwiping(false); } }}
                onTouchStart={(e) => handleTouchStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleTouchMove(e.touches[0].clientX)}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="absolute inset-0 rounded-3xl bg-white border border-rose-soft/30 shadow-lg p-8 flex flex-col items-center justify-center text-center transition-all duration-100"
                  style={{ transform: `translateX(${offsetX}px) rotate(${rotate}deg)`, opacity: 1 - Math.abs(offsetX) / 400 }}
                >
                  {current?.vibe === "romantic" ? <Flower2 className="h-10 w-10 text-rose-deep" /> : current?.vibe === "edgy" ? <Sparkle className="h-10 w-10 text-rose-deep" /> : <Sun className="h-10 w-10 text-rose-deep" />}
                  <h3 className="mt-4 font-serif text-2xl font-bold text-foreground">{current?.title}</h3>
                  <p className="mt-2 text-foreground/60">{current?.description}</p>
                  <p className="mt-4 text-xs text-foreground/50">{cards.length} remaining</p>
                </div>

                {offsetX > 20 && (
                  <div className="absolute top-6 right-6 rotate-12 border-2 border-green-500/60 rounded-lg px-3 py-1 bg-white/80 backdrop-blur">
                    <span className="text-green-600 font-bold text-sm">LIKE</span>
                  </div>
                )}
                {offsetX < -20 && (
                  <div className="absolute top-6 left-6 -rotate-12 border-2 border-rose-deep/60 rounded-lg px-3 py-1 bg-white/80 backdrop-blur">
                    <span className="text-rose-deep font-bold text-sm">NOPE</span>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <button onClick={() => handleSwipe("left")} className="h-12 w-12 rounded-full bg-white border border-rose-soft shadow flex items-center justify-center hover:bg-rose-soft/20 transition-colors">
                  <X className="h-5 w-5 text-foreground/50" />
                </button>
                <button onClick={() => handleSwipe("right")} className="h-12 w-12 rounded-full bg-foreground shadow flex items-center justify-center hover:scale-110 transition-transform">
                  <Heart className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center rounded-3xl bg-white border border-rose-soft/30 p-10 shadow-lg">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-white animate-scale-in">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-bold text-foreground">Your Vibe: {result}</h3>
              <p className="mt-3 text-foreground/60 text-sm max-w-sm mx-auto">
                Based on your swipes, you love {result.toLowerCase()} styles.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://wa.me/923709931504" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground text-white px-6 py-3 text-sm font-semibold hover:scale-[1.03] transition-transform">
                  <Sparkles className="h-4 w-4" /> Book a Consult
                </a>
                <button onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-rose-soft text-foreground/60 px-6 py-3 text-sm font-semibold hover:border-rose/50 transition-colors">
                  <ChevronLeft className="h-4 w-4" /> Retake
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
