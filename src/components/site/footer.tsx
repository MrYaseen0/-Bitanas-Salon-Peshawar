"use client";

import { Sparkles, Phone, MapPin, Instagram, Facebook, Heart, ArrowUp, Lock } from "lucide-react";
import { SALON } from "@/lib/salon-data";

const FOOTER_LINKS = {
  Explore: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Awards", href: "#awards" },
  ],
  Services: [
    { label: "Bridal Packages", href: "#packages" },
    { label: "Price Calculator", href: "#calculator" },
    { label: "Gift Cards", href: "#gift-cards" },
    { label: "Special Offers", href: "#offers" },
  ],
  Visit: [
    { label: "Glow Rewards", href: "#loyalty" },
    { label: "Our Values", href: "#values" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ],
};

export function Footer() {
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-auto bg-gradient-to-br from-[oklch(0.20_0.02_355)] via-[oklch(0.18_0.025_355)] to-[oklch(0.16_0.02_350)] text-white overflow-hidden">
      {/* Decorative top wave */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose/60 to-transparent" />
      <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-rose/15 blur-[100px]" />
      <div className="absolute -top-20 right-1/4 h-64 w-64 rounded-full bg-gold/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top CTA strip */}
        <div className="py-10 border-b border-white/10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
              Ready to glow with{" "}
              <span className="text-gradient-gold">Bitanas?</span>
            </h3>
            <p className="mt-2 text-white/70 text-sm">
              Book your appointment today and let our artists craft your perfect
              look.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <a
              href={SALON.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-6 py-3 text-sm font-semibold transition-colors"
            >
              <Phone className="h-4 w-4" />
              {SALON.phone}
            </a>
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose to-rose-deep px-6 py-3 text-sm font-semibold shadow-lg shadow-rose/30 hover:scale-[1.03] transition-transform"
            >
              <Sparkles className="h-4 w-4" />
              Book Now
            </a>
          </div>
        </div>

        {/* Main footer */}
        <div className="py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white shadow-lg">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="leading-none">
                <p className="font-serif text-xl font-bold">Bitanas Salon</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-rose/80 mt-1">
                  Peshawar
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm text-white/65 leading-relaxed max-w-sm">
              Peshawar&apos;s premier luxury beauty destination. From bridal
              glam to everyday pampering — we craft beauty, one client at a
              time.
            </p>
            <div className="mt-5 flex items-start gap-2 text-sm text-white/70">
              <MapPin className="h-4 w-4 mt-0.5 text-rose shrink-0" />
              <span>{SALON.address}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <a
                href={SALON.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-rose transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SALON.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-rose transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-rose/90 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/65 hover:text-white hover:translate-x-1 inline-block transition-all"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/55 text-center sm:text-left">
            © {new Date().getFullYear()} Bitanas Salon, Peshawar. All rights
            reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-white/55">
            Crafted with <Heart className="h-3.5 w-3.5 fill-rose text-rose" /> for
            beautiful people
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("bitanas:open-admin"))
              }
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3 py-2 text-[11px] font-semibold text-white/60 hover:text-white transition-colors"
              title="Staff login"
            >
              <Lock className="h-3 w-3" />
              Admin
            </button>
            <button
              onClick={scrollTop}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-rose px-4 py-2 text-xs font-semibold transition-colors"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
