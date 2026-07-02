"use client";

import { useState, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Phone,
  Sparkles,
  Calendar,
  ShieldCheck,
  CreditCard,
  Home,
  Search,
  X,
} from "lucide-react";
import { FAQS, SALON } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { ReviewForm } from "@/components/site/review-form";

// Match each FAQ to an icon for visual richness
const FAQ_ICONS = [
  Calendar,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Home,
  HelpCircle,
];

export function Faq() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS.map((f, i) => ({ faq: f, originalIndex: i }));
    return FAQS.map((f, i) => ({ faq: f, originalIndex: i })).filter(
      ({ faq }) =>
        faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-28 bg-gradient-to-b from-white via-rose-soft/20 to-white overflow-hidden"
    >
      {/* Decorative background blooms */}
      <div className="absolute top-10 -left-32 h-[380px] w-[380px] rounded-full bg-rose-soft/40 blur-[110px] -z-10" />
      <div className="absolute bottom-10 -right-32 h-[380px] w-[380px] rounded-full bg-gold/10 blur-[110px] -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left intro column */}
          <div className="lg:col-span-1">
            <p className="divider-luxe lg:justify-start text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Good To Know
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Frequently Asked{" "}
              <span className="text-gradient-rose">Questions</span>
            </h2>
            <p className="mt-5 text-foreground/60 leading-relaxed">
              Everything you need to know before your visit. Can&apos;t find your
              answer? Our team is one message away.
            </p>

            {/* Mini help card */}
            <div className="mt-8 rounded-3xl bg-gradient-to-br from-rose-deep via-rose to-rose-deep p-6 text-white shadow-xl shadow-rose/20 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, white 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold">
                  Still curious?
                </h3>
                <p className="mt-1.5 text-sm text-white/80 leading-relaxed">
                  Reach out on WhatsApp or call us — we usually reply within
                  the hour during opening times.
                </p>
                <div className="mt-5 space-y-2">
                  <a
                    href={SALON.phoneHref}
                    className="flex items-center gap-2 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur px-4 py-2.5 text-sm font-medium transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {SALON.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Review CTA */}
            <div className="mt-5 rounded-3xl bg-white border border-rose-soft/50 p-5 text-center shadow-sm">
              <p className="text-sm text-foreground/70">
                Visited us recently?
              </p>
              <p className="font-serif text-lg font-semibold text-foreground mt-0.5">
                Share your glow story ✨
              </p>
              <div className="mt-4 flex justify-center">
                <ReviewForm />
              </div>
            </div>
          </div>

          {/* Right FAQ accordion */}
          <div
            ref={ref}
            className={`lg:col-span-2 rounded-3xl bg-white border border-rose-soft/50 p-3 sm:p-5 shadow-sm transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Search */}
            <div className="relative mb-3 px-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions... (e.g. bridal, payment, home service)"
                className="pl-11 pr-10 rounded-xl border-rose-soft focus-visible:ring-rose/40 h-11"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full hover:bg-rose-soft text-foreground/50 hover:text-rose-deep transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {filtered.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filtered.map(({ faq, originalIndex: i }) => {
                  const Icon = FAQ_ICONS[i % FAQ_ICONS.length];
                  return (
                    <AccordionItem
                      key={i}
                      value={`item-${i}`}
                      className="border-rose-soft/40 last:border-0 rounded-2xl overflow-hidden hover:bg-rose-soft/20 transition-colors px-2 sm:px-3"
                    >
                      <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-foreground hover:text-rose-deep hover:no-underline py-5 group">
                        <span className="flex items-start gap-3 w-full">
                          <span className="flex items-center gap-2.5 shrink-0">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-soft text-rose-deep group-hover:bg-rose group-hover:text-white transition-colors">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="font-mono text-xs text-rose-deep/50 font-bold">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </span>
                          <span className="flex-1 pt-1.5">{faq.q}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground/65 leading-relaxed pl-14 pr-2 pb-5 text-sm sm:text-base">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : (
              <div className="text-center py-10 px-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-soft/60 text-rose-deep mb-3">
                  <Search className="h-6 w-6" />
                </div>
                <p className="font-semibold text-foreground">
                  No matching questions found
                </p>
                <p className="mt-1 text-sm text-foreground/55">
                  Try a different keyword, or reach out to us directly.
                </p>
                <button
                  onClick={() => setQuery("")}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-rose-soft text-rose-deep px-4 py-2 text-sm font-semibold hover:bg-rose hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                  Clear search
                </button>
              </div>
            )}

            {query && filtered.length > 0 && (
              <p className="mt-3 text-center text-xs text-foreground/45">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for
                &ldquo;{query}&rdquo;
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
