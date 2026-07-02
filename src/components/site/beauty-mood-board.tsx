"use client";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { SERVICES, GALLERY } from "@/lib/salon-data";
import { Heart, Trash2, Bookmark, Check, Sparkles, Image } from "lucide-react";

export function BeautyMoodBoard() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [saved, setSaved] = useLocalStorage<string[]>("bitanas:moodboard", []);
  const [tab, setTab] = useState<"services" | "gallery">("services");

  const toggleSave = (id: string) => {
    setSaved((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const allItems = tab === "services"
    ? SERVICES.map((s) => ({ id: s.id, title: s.name, subtitle: `${s.category} · ${s.price}`, image: s.image, emoji: "✨" }))
    : GALLERY.map((g, i) => ({ id: `gallery-${i}`, title: g.alt, subtitle: g.category, image: g.src, emoji: "📸" }));

  const savedItems = allItems.filter((item) => saved.includes(item.id));

  return (
    <section id="mood-board" className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-rose-soft/10 to-transparent" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Your Beauty <span className="text-gradient-rose">Mood Board</span>
          </h2>
          <p className="mt-4 text-foreground/60 leading-relaxed">
            Save your favourite services and looks.
          </p>
        </div>

        <div ref={ref} className={cn("transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="flex justify-center gap-2 mb-8">
            {(["services", "gallery"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={cn("rounded-full px-5 py-2 text-sm font-semibold transition-all flex items-center gap-1.5", tab === t ? "bg-foreground text-white" : "bg-white border border-rose-soft/30 text-foreground/60 hover:border-foreground/30")}>
                {t === "services" ? <Sparkles className="h-3.5 w-3.5" /> : <Image className="h-3.5 w-3.5" />}
                {t === "services" ? "Services" : "Gallery"}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allItems.map((item) => {
              const isSaved = saved.includes(item.id);
              return (
                <div key={item.id} className={cn("group relative rounded-xl overflow-hidden border transition-all", isSaved ? "border-foreground/30 shadow-md" : "border-rose-soft/10 hover:border-rose-soft/30")}>
                  <div className="aspect-[4/3] bg-rose-soft/20 relative overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
                      <p className="text-xs text-foreground/50">{item.subtitle}</p>
                    </div>
                    <button onClick={() => toggleSave(item.id)}
                      className={cn("shrink-0 h-8 w-8 rounded-lg flex items-center justify-center transition-all", isSaved ? "bg-foreground text-white" : "bg-rose-soft/20 text-foreground/30 hover:text-foreground/60 hover:bg-rose-soft/40")}>
                      {isSaved ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {savedItems.length > 0 && (
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-soft/50 to-white border border-rose-soft/50 p-4 shadow-sm">
                <Heart className="h-5 w-5 text-rose-deep fill-rose-deep" />
                <span className="text-sm text-foreground/70">
                  <strong className="text-foreground">{savedItems.length}</strong> saved —{" "}
                  <a href="https://wa.me/923709931504" target="_blank" rel="noopener noreferrer"
                    className="text-rose-deep font-semibold underline-offset-2 hover:underline">
                    share with us on WhatsApp
                  </a>
                </span>
              </div>
            </div>
          )}

          {savedItems.length > 0 && (
            <div className="mt-6">
              <button onClick={() => setSaved([])}
                className="mx-auto inline-flex items-center gap-1.5 text-xs text-foreground/40 hover:text-destructive transition-colors">
                <Trash2 className="h-3.5 w-3.5" /> Clear all
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
