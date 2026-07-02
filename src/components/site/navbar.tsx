"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SALON } from "@/lib/salon-data";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { LanguageToggle } from "@/components/site/language-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#comparison", label: "Compare" },
  { href: "#packages", label: "Packages" },
  { href: "#offers", label: "Offers" },
  { href: "#loyalty", label: "Rewards" },
  { href: "#blog", label: "Journal" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive("#" + sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "py-2 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(190,80,110,0.25)] border-b border-rose-soft/40"
          : "py-4 bg-white/40 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <button
            onClick={() => handleNav("#home")}
            className="flex items-center gap-2.5 group"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white shadow-lg shadow-rose/30 transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
              <span className="absolute -inset-1 rounded-full bg-rose/20 blur-md -z-10" />
            </span>
            <span className="flex flex-col leading-none text-left">
              <span className="font-serif text-xl font-bold text-foreground tracking-tight">
                Bitanas
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-rose-deep/70 font-medium">
                Salon · Peshawar
              </span>
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                  active === link.href
                    ? "text-rose-deep"
                    : "text-foreground/70 hover:text-rose-deep"
                )}
              >
                {link.label}
                {active === link.href && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-rose to-gold" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href={SALON.phoneHref}
              className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-rose-deep transition-colors px-1"
            >
              <Phone className="h-4 w-4" />
              {SALON.phone}
            </a>
            <Button
              onClick={() => handleNav("#booking")}
              className="rounded-full bg-gradient-to-r from-rose to-rose-deep text-white shadow-lg shadow-rose/25 hover:shadow-rose/40 hover:scale-[1.03] transition-all px-6"
            >
              Book Now
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-rose-soft/60 text-rose-deep hover:bg-rose-soft transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-500 ease-out",
          open ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-4 mt-3 rounded-3xl bg-white/95 backdrop-blur-xl border border-rose-soft/50 shadow-xl p-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-colors",
                active === link.href
                  ? "bg-rose-soft text-rose-deep"
                  : "text-foreground/80 hover:bg-rose-soft/50"
              )}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 space-y-2">
            <a
              href={SALON.phoneHref}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl bg-rose-soft/60 text-rose-deep text-sm font-medium"
            >
              <Phone className="h-4 w-4" /> {SALON.phone}
            </a>
            <Button
              onClick={() => handleNav("#booking")}
              className="w-full rounded-2xl bg-gradient-to-r from-rose to-rose-deep text-white py-3"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
