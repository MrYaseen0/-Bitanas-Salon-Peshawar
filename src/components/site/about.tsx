"use client";

import Image from "next/image";
import { Heart, Award, Leaf, Crown, CheckCircle2 } from "lucide-react";
import { IMAGES, SALON } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";

const PILLARS = [
  {
    icon: Crown,
    title: "Luxury Experience",
    desc: "A serene, premium space designed for total relaxation and indulgence.",
  },
  {
    icon: Award,
    title: "Expert Artists",
    desc: "Trained, certified stylists who genuinely care about your look.",
  },
  {
    icon: Leaf,
    title: "Skin-Safe Products",
    desc: "Only authentic, premium brands suited to South-Asian skin tones.",
  },
  {
    icon: Heart,
    title: "Personalised Care",
    desc: "Every service is tailored to your features, lifestyle and event.",
  },
];

const PROMISES = [
  "Hygienic, single-use tools for every client",
  "On-time appointments — no long waiting",
  "Honest consultations before every service",
  "Comfortable, private styling suites",
];

export function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div
            ref={ref}
            className={`relative transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative h-[480px] sm:h-[560px]">
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-rose/20 ring-4 ring-white">
                <Image
                  src={IMAGES.about}
                  alt="Inside Bitanas luxury salon"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
              </div>
              {/* Experience badge */}
              <div className="absolute -bottom-6 -left-2 sm:-left-6 glass rounded-3xl px-6 py-5 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose to-rose-deep text-white shadow-lg">
                    <Crown className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-serif text-3xl font-bold text-rose-deep leading-none">
                      8+ Years
                    </p>
                    <p className="text-xs text-foreground/60 mt-1">
                      of creating beauty
                    </p>
                  </div>
                </div>
              </div>
              {/* Floating accent */}
              <div className="absolute -top-5 -right-5 h-20 w-20 rounded-2xl bg-gradient-to-br from-gold to-gold-soft opacity-80 rotate-12 -z-10" />
            </div>
          </div>

          {/* Text side */}
          <div>
            <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Where Every Detail is{" "}
              <span className="text-gradient-rose">Crafted With Love</span>
            </h2>
            <p className="mt-6 text-foreground/65 leading-relaxed">
              Founded in the heart of Hayatabad, Bitanas Salon began with a
              simple belief — that every woman deserves to feel like the most
              beautiful version of herself. What started as a small studio has
              blossomed into Peshawar&apos;s most loved beauty destination,
              trusted by brides, professionals and beauty enthusiasts alike.
            </p>
            <p className="mt-4 text-foreground/65 leading-relaxed">
              Our team blends modern techniques with timeless elegance, using
              only authentic premium products. From the moment you step in,
              you&apos;re family — and your glow is our signature.
            </p>

            {/* Pillars */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {PILLARS.map((p, i) => (
                <div
                  key={p.title}
                  className="group flex gap-3 p-4 rounded-2xl bg-white/60 border border-rose-soft/50 hover:bg-white hover:shadow-lg hover:shadow-rose/10 transition-all"
                  style={{
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-soft to-rose-soft/40 text-rose-deep group-hover:from-rose group-hover:to-rose-deep group-hover:text-white transition-all">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {p.title}
                    </h3>
                    <p className="text-xs text-foreground/55 mt-0.5 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promises */}
            <ul className="mt-8 grid sm:grid-cols-2 gap-2.5">
              {PROMISES.map((promise) => (
                <li
                  key={promise}
                  className="flex items-start gap-2 text-sm text-foreground/70"
                >
                  <CheckCircle2 className="h-4 w-4 text-rose-deep mt-0.5 shrink-0" />
                  {promise}
                </li>
              ))}
            </ul>

            <p className="mt-8 font-script text-2xl text-rose-deep">
              — The Bitanas Family, {SALON.city}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
