"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { MoveHorizontal, Sparkles, ArrowRight } from "lucide-react";
import { TRANSFORMATIONS, whatsappLink } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

function BeforeAfter({
  before,
  after,
  title,
}: {
  before: string;
  after: string;
  title: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(Math.max(pct, 0), 100));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-xl shadow-rose/15 ring-1 ring-rose-soft/50"
    >
      {/* After image (full, bottom layer) */}
      <Image
        src={after}
        alt={`${title} — after`}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover pointer-events-none"
        draggable={false}
      />
      {/* Before image (full-width, clipped via clip-path so it isn't squished) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${title} — before`}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 rounded-full bg-black/55 backdrop-blur text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 pointer-events-none">
        Before
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-rose to-rose-deep text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 shadow-md pointer-events-none">
        After ✨
      </span>

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-full w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-xl ring-2 ring-rose/30">
          <MoveHorizontal className="h-5 w-5 text-rose-deep" />
        </div>
      </div>
    </div>
  );
}

export function Transformations() {
  const [active, setActive] = useState(0);
  const { ref, visible } = useReveal<HTMLDivElement>();
  const t = TRANSFORMATIONS[active];

  // Auto-advance the showcase every 7s
  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % TRANSFORMATIONS.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="transformations"
      className="relative py-24 sm:py-28 bg-gradient-to-b from-white via-rose-soft/20 to-white overflow-hidden"
    >
      <div className="absolute top-10 right-1/4 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[120px] -z-10" />
      <div className="absolute bottom-10 left-1/4 h-[400px] w-[400px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Real Results
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Before &amp; After <span className="text-gradient-rose">Transformations</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            Drag the slider to reveal the Bitanas magic. Every look is crafted
            by our senior artists using premium products — see the difference
            for yourself.
          </p>
        </div>

        <div
          ref={ref}
          className={cn(
            "mt-12 grid lg:grid-cols-5 gap-8 items-center transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Slider */}
          <div className="lg:col-span-3">
            <BeforeAfter
              key={t.id}
              before={t.before}
              after={t.after}
              title={t.title}
            />
          </div>

          {/* Info + tabs */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-soft text-rose-deep px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="h-3 w-3" />
                {t.service}
              </span>
              <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-foreground">
                {t.title}
              </h3>
              <p className="mt-3 text-foreground/60 leading-relaxed text-sm sm:text-base">
                {t.description}
              </p>
            </div>

            {/* Tabs */}
            <div className="space-y-2">
              {TRANSFORMATIONS.map((tr, i) => (
                <button
                  key={tr.id}
                  onClick={() => setActive(i)}
                  className={cn(
                    "w-full text-left flex items-center gap-3 p-3 rounded-2xl border transition-all",
                    i === active
                      ? "bg-white border-rose/40 shadow-md"
                      : "bg-white/40 border-transparent hover:bg-white/70"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-sm transition-colors",
                      i === active
                        ? "bg-gradient-to-br from-rose to-rose-deep text-white"
                        : "bg-rose-soft/60 text-rose-deep"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-foreground truncate">
                      {tr.title}
                    </span>
                    <span className="block text-xs text-foreground/50 truncate">
                      {tr.service}
                    </span>
                  </span>
                  {i === active && (
                    <span className="h-2 w-2 rounded-full bg-rose-deep animate-pulse-soft" />
                  )}
                </button>
              ))}
            </div>

            <a
              href={whatsappLink(
                `Hi Bitanas Salon! ✨ I loved the "${t.title}" transformation — could I get a similar look?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose to-rose-deep text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-rose/25 hover:scale-[1.03] transition-transform w-full"
            >
              Get This Look
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Hint */}
        <p className="mt-6 text-center text-xs text-foreground/45 flex items-center justify-center gap-1.5">
          <MoveHorizontal className="h-3.5 w-3.5" />
          Drag the slider left &amp; right to compare
        </p>
      </div>
    </section>
  );
}
