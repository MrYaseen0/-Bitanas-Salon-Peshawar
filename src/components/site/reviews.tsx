"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  PenLine,
  Loader2,
  BadgeCheck,
  Filter,
} from "lucide-react";
import { REVIEWS, SALON, type Review } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

// Rating distribution (derived from 4.9 average, 125 reviews)
const DISTRIBUTION = [
  { stars: 5, percent: 94, count: 118 },
  { stars: 4, percent: 4, count: 5 },
  { stars: 3, percent: 1, count: 1 },
  { stars: 2, percent: 0.5, count: 1 },
  { stars: 1, percent: 0.5, count: 0 },
];

interface DBReview {
  id: string;
  name: string;
  rating: number;
  service: string | null;
  comment: string;
  createdAt: string;
}

function formatRelative(d: string): string {
  const diff = Date.now() - new Date(d).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "Today";
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
  if (days < 365) return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""} ago`;
  return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? "s" : ""} ago`;
}

export function Reviews() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [page, setPage] = useState(0);
  const [dbReviews, setDbReviews] = useState<DBReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<number | "all">("all");

  // Fetch approved reviews from DB
  useEffect(() => {
    fetch("/api/review")
      .then((r) => r.json())
      .then((data) => {
        setDbReviews(data.reviews ?? []);
      })
      .catch(() => {
        /* silent fail — curated reviews still show */
      })
      .finally(() => setLoading(false));
  }, []);

  // Merge curated + DB reviews into a unified list
  const allReviews = useMemo(() => {
    const curated: (Review & { source: "curated" })[] = REVIEWS.map((r) => ({
      ...r,
      source: "curated",
    }));
    const fromDb: (Review & { source: "customer" })[] = dbReviews.map((r) => ({
      name: r.name,
      rating: r.rating,
      date: formatRelative(r.createdAt),
      service: r.service || "Verified Visit",
      comment: r.comment,
      initials: r.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase(),
      source: "customer",
    }));
    // DB reviews first (most recent), then curated
    return [...fromDb, ...curated];
  }, [dbReviews]);

  // Apply rating filter
  const filtered = useMemo(() => {
    if (filter === "all") return allReviews;
    return allReviews.filter((r) => r.rating === filter);
  }, [allReviews, filter]);

  const perPage = 3;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, pages - 1);
  const shown = filtered.slice(
    safePage * perPage,
    safePage * perPage + perPage
  );

  return (
    <section
      id="reviews"
      className="relative py-24 sm:py-28 overflow-hidden"
    >
      <div className="absolute -top-20 left-1/4 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Kind Words
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Loved By <span className="text-gradient-rose">Our Clients</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            Don&apos;t just take our word for it — here&apos;s what our lovely
            clients have to say about their Bitanas experience.
          </p>
        </div>

        {/* Rating filter */}
        <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/50 mr-1">
            <Filter className="h-3.5 w-3.5" />
            Filter:
          </span>
          {(["all", 5, 4, 3] as const).map((f) => (
            <button
              key={String(f)}
              onClick={() => {
                setFilter(f);
                setPage(0);
              }}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all border",
                filter === f
                  ? "bg-gradient-to-r from-rose to-rose-deep text-white border-transparent shadow-sm"
                  : "bg-white border-rose-soft text-foreground/70 hover:text-rose-deep hover:border-rose/40"
              )}
            >
              {f === "all" ? "All" : (
                <>
                  <Star className="h-3 w-3 fill-current" />
                  {f}
                </>
              )}
            </button>
          ))}
          <span className="ml-1 text-xs text-foreground/45">
            {filtered.length} review{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-8 items-start">
          {/* Summary card */}
          <div
            ref={ref}
            className={`lg:sticky lg:top-28 rounded-3xl bg-gradient-to-br from-rose-deep via-rose to-rose-deep p-7 text-white shadow-2xl shadow-rose/25 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="font-serif text-6xl font-bold leading-none">
                {SALON.rating}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-white/80 mt-1">
                  Based on {SALON.reviewCount + dbReviews.length} reviews
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              {DISTRIBUTION.map((d) => (
                <div key={d.stars} className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs w-10 text-white/80">
                    {d.stars}
                    <Star className="h-3 w-3 fill-current text-gold" />
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gold transition-all duration-1000"
                      style={{ width: `${d.percent}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/70 w-8 text-right">
                    {d.count}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 pt-6 border-t border-white/20">
              <p className="text-sm text-white/85 leading-relaxed">
                Rated <strong>4.9 ★</strong> on Google — one of the highest
                rated beauty salons in Peshawar.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-rose-deep px-4 py-2.5 text-xs font-semibold hover:bg-cream transition-colors"
                >
                  Rate on Google
                </a>
                <button
                  onClick={() => {
                    document
                      .querySelector("#faq")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur text-white px-4 py-2.5 text-xs font-semibold hover:bg-white/25 transition-colors"
                >
                  <PenLine className="h-3.5 w-3.5" />
                  Write a Review
                </button>
              </div>
            </div>
          </div>

          {/* Reviews list */}
          <div className="lg:col-span-2 space-y-5">
            {loading ? (
              <div className="grid sm:grid-cols-2 gap-5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-3xl bg-white border border-rose-soft/50 p-6 animate-pulse"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-rose-soft/40" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-24 bg-rose-soft/40 rounded" />
                        <div className="h-2 w-16 bg-rose-soft/30 rounded" />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-2.5 w-full bg-rose-soft/30 rounded" />
                      <div className="h-2.5 w-5/6 bg-rose-soft/30 rounded" />
                      <div className="h-2.5 w-2/3 bg-rose-soft/30 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {shown.map((review, i) => {
                  const isCustomer = (review as any).source === "customer";
                  return (
                    <article
                      key={(review.name || "") + i}
                      className={cn(
                        "relative rounded-3xl bg-white border border-rose-soft/50 p-6 shadow-sm hover:shadow-xl hover:shadow-rose/10 transition-all duration-500",
                        visible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      )}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <Quote className="absolute top-5 right-5 h-8 w-8 text-rose-soft/60" />
                      {isCustomer && (
                        <span className="absolute top-5 left-5 inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                          <BadgeCheck className="h-3 w-3" />
                          Verified
                        </span>
                      )}
                      <div className={cn("flex items-center gap-3", isCustomer && "mt-5")}>
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white font-bold text-sm shadow-md">
                          {review.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            {review.name}
                          </p>
                          <p className="text-xs text-foreground/50">{review.date}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center gap-0.5 text-gold">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <Star key={j} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-foreground/50">
                          · {review.service}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-foreground/70 leading-relaxed line-clamp-5">
                        {review.comment}
                      </p>
                    </article>
                  );
                })}
                {shown.length === 0 && (
                  <div className="sm:col-span-2 rounded-3xl bg-white border border-dashed border-rose-soft/50 p-10 text-center">
                    <p className="text-foreground/50 text-sm">
                      No reviews match this filter yet.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {!loading && pages > 1 && (
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setPage((p) => (p - 1 + pages) % pages)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white border border-rose-soft px-4 py-2 text-sm font-medium text-rose-deep hover:bg-rose-soft/50 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: pages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className={cn(
                        "h-2.5 rounded-full transition-all",
                        safePage === i
                          ? "w-8 bg-gradient-to-r from-rose to-rose-deep"
                          : "w-2.5 bg-rose-soft hover:bg-rose/40"
                      )}
                      aria-label={`Page ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setPage((p) => (p + 1) % pages)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white border border-rose-soft px-4 py-2 text-sm font-medium text-rose-deep hover:bg-rose-soft/50 transition-colors"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Live indicator */}
            {!loading && dbReviews.length > 0 && (
              <p className="text-center text-xs text-foreground/45 flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse-soft" />
                Showing {dbReviews.length} verified customer review
                {dbReviews.length !== 1 ? "s" : ""} live from our community
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
