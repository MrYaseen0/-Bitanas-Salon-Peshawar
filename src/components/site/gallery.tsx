"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Filter } from "lucide-react";
import { GALLERY } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("All");
  const { ref, visible } = useReveal<HTMLDivElement>();

  // Derive categories from gallery data
  const categories = useMemo(() => {
    const set = new Set(GALLERY.map((g) => g.category));
    return ["All", ...Array.from(set)];
  }, []);

  // Filtered gallery items
  const filtered = useMemo(() => {
    if (category === "All") return GALLERY.map((g, i) => ({ ...g, originalIndex: i }));
    return GALLERY
      .map((g, i) => ({ ...g, originalIndex: i }))
      .filter((g) => g.category === category);
  }, [category]);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () =>
      setLightbox((i) => {
        if (i === null) return i;
        // Navigate within filtered list
        const currentFilteredIdx = filtered.findIndex((f) => f.originalIndex === i);
        if (currentFilteredIdx === -1) return i;
        const prevIdx = (currentFilteredIdx - 1 + filtered.length) % filtered.length;
        return filtered[prevIdx].originalIndex;
      }),
    [filtered]
  );
  const next = useCallback(
    () =>
      setLightbox((i) => {
        if (i === null) return i;
        const currentFilteredIdx = filtered.findIndex((f) => f.originalIndex === i);
        if (currentFilteredIdx === -1) return i;
        const nextIdx = (currentFilteredIdx + 1) % filtered.length;
        return filtered[nextIdx].originalIndex;
      }),
    [filtered]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, prev, next]);

  // Masonry-style layout with varied heights
  const heights = [
    "h-64",
    "h-80",
    "h-56",
    "h-72",
    "h-80",
    "h-60",
    "h-72",
    "h-64",
  ];

  return (
    <section id="gallery" className="relative py-24 sm:py-28">
      <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Our Gallery
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            A Glimpse Into <span className="text-gradient-rose">Our World</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            Step inside Bitanas — from our serene interiors to the stunning
            results our artists create every single day.
          </p>
        </div>

        {/* Category filter */}
        <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/50 mr-1">
            <Filter className="h-3.5 w-3.5" />
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-all border",
                category === cat
                  ? "bg-gradient-to-r from-rose to-rose-deep text-white border-transparent shadow-sm"
                  : "bg-white border-rose-soft text-foreground/70 hover:text-rose-deep hover:border-rose/40"
              )}
            >
              {cat}
            </button>
          ))}
          <span className="ml-1 text-xs text-foreground/45">
            {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Masonry grid */}
        <div
          ref={ref}
          className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]"
        >
          {filtered.map((img, displayIdx) => {
            const i = img.originalIndex;
            return (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className={cn(
                "group relative w-full mb-5 break-inside-avoid rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-rose/20 transition-all duration-500 block",
                heights[displayIdx % heights.length],
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${displayIdx * 60}ms` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-left">
                <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-deep">
                    {img.category}
                  </span>
                </div>
                <p className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {img.alt}
                </p>
              </div>
              <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur text-rose-deep opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                <ZoomIn className="h-4 w-4" />
              </span>
            </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 sm:left-8 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 sm:right-8 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div
            className="relative w-full max-w-5xl h-[70vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <span className="rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-medium text-white">
              {filtered.findIndex((f) => f.originalIndex === lightbox) + 1} / {filtered.length} · {GALLERY[lightbox].category}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
