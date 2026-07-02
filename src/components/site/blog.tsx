"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, ArrowRight, BookOpen, X, Check } from "lucide-react";
import { BLOG_POSTS, whatsappLink, type BlogPost } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<BlogPost["category"], string> = {
  Hair: "bg-rose-soft text-rose-deep",
  Skin: "bg-gold-soft text-amber-800",
  Bridal: "bg-rose-deep text-white",
  Nails: "bg-rose-soft text-rose-deep",
  "Self-Care": "bg-gold-soft text-amber-800",
};

export function Blog() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [active, setActive] = useState<BlogPost | null>(null);

  return (
    <section
      id="blog"
      className="relative py-24 sm:py-28 overflow-hidden"
    >
      <div className="absolute top-10 right-1/4 h-[400px] w-[400px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Beauty Journal
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Tips From Our <span className="text-gradient-rose">Artists</span>
            </h2>
            <p className="mt-5 text-foreground/60 leading-relaxed">
              Expert advice, at-home rituals and insider secrets — straight
              from the Bitanas studio to your screen.
            </p>
          </div>
          <a
            href={whatsappLink(
              "Hi Bitanas Salon! ✨ I'd love to get personalised beauty advice from your artists."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white border-2 border-rose-soft text-rose-deep hover:bg-rose-soft/50 px-5 py-2.5 text-sm font-semibold transition-colors shrink-0"
          >
            <BookOpen className="h-4 w-4" />
            Ask an Artist
          </a>
        </div>

        {/* Blog grid */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <article
              key={post.id}
              className={cn(
                "group relative rounded-3xl bg-white border border-rose-soft/50 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-rose/15 transition-all duration-500 card-lift cursor-pointer flex flex-col",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setActive(post)}
            >
              {/* Image */}
              <div className="relative h-48 zoom-wrap">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span
                  className={cn(
                    "absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm",
                    CATEGORY_STYLES[post.category]
                  )}
                >
                  {post.category}
                </span>
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] font-medium text-foreground/70">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-[11px] uppercase tracking-wider text-foreground/40 font-semibold">
                  {post.date}
                </p>
                <h3 className="mt-1.5 font-serif text-lg font-bold text-foreground leading-snug group-hover:text-rose-deep transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-deep group-hover:gap-2.5 transition-all">
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero image */}
            <div className="relative h-52 sm:h-64">
              <Image
                src={active.image}
                alt={active.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur text-rose-deep hover:bg-white transition-colors"
                aria-label="Close article"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                    CATEGORY_STYLES[active.category]
                  )}
                >
                  {active.category}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] font-medium text-foreground/70">
                  <Clock className="h-3 w-3" />
                  {active.readTime}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-wider text-foreground/40 font-semibold">
                {active.date}
              </p>
              <h3 className="mt-1.5 font-serif text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                {active.title}
              </h3>
              <p className="mt-3 text-foreground/65 leading-relaxed">
                {active.excerpt}
              </p>

              <div className="mt-6">
                <h4 className="font-serif text-lg font-bold text-foreground mb-3">
                  Key Takeaways
                </h4>
                <ul className="space-y-2.5">
                  {active.tips.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-rose-soft/30 border border-rose-soft/40"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm text-foreground/75 leading-relaxed">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-7 pt-6 border-t border-rose-soft/40 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <p className="text-sm text-foreground/60 text-center sm:text-left">
                  Want personalised advice from our artists?
                </p>
                <a
                  href={whatsappLink(
                    `Hi Bitanas Salon! ✨ I read your article "${active.title}" and I'd love some personalised advice.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rose-deep text-white px-5 py-2.5 text-sm font-semibold shadow-md hover:scale-[1.03] transition-transform whitespace-nowrap"
                >
                  Book a Consult
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
