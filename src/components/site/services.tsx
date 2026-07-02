"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Clock, ArrowRight, Star, Check, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES, type ServiceCategory } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const CATEGORIES: ("All" | ServiceCategory)[] = [
  "All",
  "Hair",
  "Makeup",
  "Nails",
  "Skin & Spa",
  "Bridal",
];

export function Services() {
  const [active, setActive] = useState<"All" | ServiceCategory>("All");
  const { ref, visible } = useReveal<HTMLDivElement>();

  const filtered = useMemo(
    () =>
      active === "All"
        ? SERVICES
        : SERVICES.filter((s) => s.category === active),
    [active]
  );

  const scrollToBooking = (service?: string) => {
    if (service) {
      window.dispatchEvent(
        new CustomEvent("bitanas:select-service", { detail: service })
      );
    }
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="services"
      className="relative py-24 sm:py-28 bg-gradient-to-b from-rose-soft/30 via-white to-white"
    >
      <div className="absolute top-20 -left-40 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Our Services
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Signature Treatments <span className="text-gradient-rose">For Every Glow</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            From everyday glam to bridal masterpieces — explore our curated
            menu of hair, makeup, nail and spa services, all delivered with
            premium products and personalised care.
          </p>
        </div>

        {/* Category filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all border",
                active === cat
                  ? "bg-gradient-to-r from-rose to-rose-deep text-white border-transparent shadow-lg shadow-rose/25 scale-105"
                  : "bg-white/70 border-rose-soft text-foreground/70 hover:text-rose-deep hover:border-rose/40 hover:bg-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services grid */}
        <div
          ref={ref}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((service, i) => (
            <article
              key={service.id}
              className={cn(
                "group relative rounded-3xl bg-white border border-rose-soft/50 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-rose/15 transition-all duration-500 card-lift",
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 zoom-wrap">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {service.popular && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-bold text-rose-deep shadow-md">
                    <Star className="h-3 w-3 fill-current text-gold" />
                    Popular
                  </span>
                )}
                <span className="absolute top-3 right-3 rounded-full bg-rose-deep/85 backdrop-blur px-3 py-1 text-[11px] font-semibold text-white">
                  {service.category}
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    {service.duration}
                  </span>
                  <span className="font-serif text-lg font-bold">{service.price}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-rose-deep transition-colors">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs text-foreground/50">
                    <Check className="h-3.5 w-3.5 text-rose-deep" />
                    Premium products
                  </span>
                  <Button
                    onClick={() => scrollToBooking(service.name)}
                    size="sm"
                    className="rounded-full bg-rose-soft text-rose-deep hover:bg-rose hover:text-white h-8 px-4 text-xs"
                  >
                    Book
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-rose-soft/40 group-hover:scale-150 transition-transform duration-700" />
            </article>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-rose-deep via-rose to-rose-deep p-8 sm:p-10 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="relative">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Can&apos;t find what you&apos;re looking for?
            </h3>
            <p className="mt-2 text-white/85 max-w-xl mx-auto">
              We offer custom packages for weddings, parties and group bookings.
              Call us and our team will design the perfect service for you.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => scrollToBooking()}
                className="rounded-full bg-white text-rose-deep hover:bg-cream h-11 px-7"
              >
                Request a Custom Package
              </Button>
              <a
                href="/api/pricelist"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 backdrop-blur text-white hover:bg-white/25 h-11 px-7 text-sm font-semibold transition-colors"
              >
                <FileDown className="h-4 w-4" />
                Download Price List
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
