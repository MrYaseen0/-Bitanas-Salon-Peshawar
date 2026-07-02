"use client";

import { ARTISTS, whatsappLink } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { Sparkles, Instagram, ArrowRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-rose to-rose-deep",
  "from-gold to-gold-soft",
  "from-rose-deep to-rose",
  "from-gold-soft to-gold",
];

export function Artists() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      id="artists"
      className="relative py-24 sm:py-28 bg-gradient-to-b from-white via-rose-soft/20 to-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Meet The Team
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            The Artists Behind{" "}
            <span className="text-gradient-rose">Your Glow</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            Our certified, passionate stylists bring years of experience and a
            genuine love for beauty to every single appointment.
          </p>
        </div>

        <div ref={ref} className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {ARTISTS.map((artist, i) => (
            <div
              key={artist.name}
              className={cn(
                "group relative rounded-3xl bg-white border border-rose-soft/50 p-5 sm:p-6 text-center hover:shadow-2xl hover:shadow-rose/15 hover:border-rose/30 transition-all duration-500 card-lift overflow-hidden",
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Decorative corner */}
              <div
                className={cn(
                  "absolute -top-12 -right-12 h-28 w-28 rounded-full bg-gradient-to-br opacity-10 group-hover:opacity-25 group-hover:scale-125 transition-all duration-500",
                  GRADIENTS[i % GRADIENTS.length]
                )}
              />

              {/* Experience badge */}
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-rose-soft/70 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-rose-deep">
                <Award className="h-3 w-3" />
                {artist.experience}
              </span>

              {/* Avatar */}
              <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 mb-4">
                <div
                  className={cn(
                    "absolute inset-0 rounded-full bg-gradient-to-br opacity-20 group-hover:opacity-50 blur-md transition-opacity",
                    GRADIENTS[i % GRADIENTS.length]
                  )}
                />
                <div
                  className={cn(
                    "relative w-full h-full rounded-full bg-gradient-to-br flex items-center justify-center text-white font-serif text-3xl sm:text-4xl font-bold shadow-lg ring-4 ring-white",
                    GRADIENTS[i % GRADIENTS.length]
                  )}
                >
                  {artist.initials}
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                  <Sparkles className="h-4 w-4 text-gold" />
                </span>
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground">
                {artist.name}
              </h3>
              <p className="text-xs font-semibold text-rose-deep mt-0.5">
                {artist.role}
              </p>
              <p className="text-xs text-foreground/55 mt-2 leading-relaxed">
                {artist.specialty}
              </p>

              {/* Signature look */}
              <div className="mt-3 pt-3 border-t border-rose-soft/40">
                <p className="text-[10px] uppercase tracking-wider text-foreground/40 font-semibold">
                  Signature
                </p>
                <p className="text-xs text-foreground/65 mt-0.5 italic">
                  &ldquo;{artist.signature}&rdquo;
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <a
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-soft/60 text-rose-deep hover:bg-rose hover:text-white transition-colors"
                  aria-label={`${artist.name} on Instagram`}
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={whatsappLink(
                    `Hi Bitanas Salon! ✨ I'd like to book an appointment with ${artist.name}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose to-rose-deep text-white px-3.5 h-9 text-xs font-semibold shadow-sm hover:shadow-md hover:scale-[1.03] transition-all"
                >
                  Book
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
