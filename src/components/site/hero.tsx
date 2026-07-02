"use client";

import Image from "next/image";
import {
  Star,
  MapPin,
  ArrowRight,
  Clock,
  Sparkles,
  CalendarHeart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SALON, IMAGES } from "@/lib/salon-data";
import { useLang } from "@/lib/i18n";

export function Hero() {
  const { t } = useLang();
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-12 pb-16"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-rose-soft/40 via-white to-gold-soft/30" />
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full bg-rose/20 blur-[120px]" />
        <div className="absolute top-1/3 -left-32 h-[480px] w-[480px] rounded-full bg-gold/15 blur-[120px]" />
        <div className="absolute -bottom-32 right-1/4 h-[400px] w-[400px] rounded-full bg-rose-deep/10 blur-[120px]" />
      </div>

      {/* Decorative dotted texture */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.55 0.18 355) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left content */}
          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-1.5 border border-rose-soft shadow-sm mb-6 animate-fade-up">
              <span className="flex items-center gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              <span className="text-xs font-semibold text-foreground/80">
                {SALON.rating} · {SALON.reviewCount}+ Happy Clients
              </span>
            </div>

            <p
              className="font-script text-2xl sm:text-3xl text-rose-deep mb-2 animate-fade-up"
              style={{ animationDelay: "0.05s", animationFillMode: "both" }}
            >
              {t("hero.tagline")}
            </p>

            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-foreground animate-fade-up"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              {t("hero.title1")}
              <br />
              <span className="text-gradient-rose">{t("hero.title2")}</span> {t("hero.title3")}
            </h1>

            <p
              className="mt-6 text-base sm:text-lg text-foreground/65 max-w-xl mx-auto lg:mx-0 animate-fade-up"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              {t("hero.subtitle")}
            </p>

            <div
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <Button
                onClick={() => scrollTo("#booking")}
                size="lg"
                className="rounded-full bg-gradient-to-r from-rose to-rose-deep text-white shadow-xl shadow-rose/30 hover:shadow-rose/50 hover:scale-[1.03] transition-all px-8 h-12 text-base group"
              >
                <CalendarHeart className="h-5 w-5" />
                {t("hero.bookVisit")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => scrollTo("#services")}
                size="lg"
                variant="outline"
                className="rounded-full bg-white/70 backdrop-blur border-rose-soft text-rose-deep hover:bg-rose-soft/60 h-12 px-8 text-base"
              >
                {t("hero.explore")}
              </Button>
            </div>

            {/* Limited offer banner */}
            <button
              onClick={() => scrollTo("#offers")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft/60 to-rose-soft/60 border border-gold/40 px-4 py-2 text-xs sm:text-sm font-medium text-foreground/80 hover:from-gold-soft hover:to-rose-soft transition-colors animate-fade-up group"
              style={{ animationDelay: "0.35s", animationFillMode: "both" }}
            >
              <span className="flex h-2 w-2 rounded-full bg-rose-deep animate-pulse-soft" />
              Bridal Season Special — save up to 15%
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Quick info chips */}
            <div
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start text-sm animate-fade-up"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-2 text-foreground/70">
                <MapPin className="h-4 w-4 text-rose" />
                {SALON.addressShort}
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <Clock className="h-4 w-4 text-rose" />
                {t("hero.open")}
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <Sparkles className="h-4 w-4 text-rose" />
                Premium Products
              </div>
            </div>
          </div>

          {/* Right image collage */}
          <div className="relative h-[460px] sm:h-[540px] lg:h-[620px] animate-scale-in">
            {/* Main image */}
            <div className="absolute top-0 right-0 w-[68%] h-[72%] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-rose/20 ring-4 ring-white/60">
              <Image
                src={IMAGES.heroPrimary}
                alt="Luxury beauty treatment at Bitanas Salon"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover"
              />
            </div>
            {/* Secondary image */}
            <div className="absolute bottom-0 left-0 w-[55%] h-[52%] rounded-[2rem] overflow-hidden shadow-2xl shadow-rose/20 ring-4 ring-white/60 animate-float">
              <Image
                src={IMAGES.heroSecondary}
                alt="Salon interior and styling"
                fill
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="object-cover"
              />
            </div>

            {/* Floating rating card */}
            <div className="absolute top-6 left-2 sm:left-6 glass rounded-2xl px-4 py-3 shadow-xl animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-soft text-white font-bold text-lg shadow-md">
                  {SALON.rating}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-[11px] text-foreground/60 mt-0.5 font-medium">
                    {SALON.reviewCount} Google reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute bottom-6 right-2 sm:right-6 glass rounded-2xl px-4 py-3 shadow-xl animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-soft text-rose-deep">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-foreground">Bridal Specialist</p>
                  <p className="text-[10px] text-foreground/55">HD Makeup · Trials</p>
                </div>
              </div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -bottom-8 right-1/3 h-24 w-24 rounded-full border-[6px] border-rose-soft/50 -z-10" />
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
