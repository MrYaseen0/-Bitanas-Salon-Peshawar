"use client";

import Image from "next/image";
import { Instagram, Heart, MessageCircle, ArrowUpRight } from "lucide-react";
import { INSTA_POSTS, SALON } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function InstagramFeed() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      id="instagram"
      className="relative py-24 sm:py-28 overflow-hidden"
    >
      <div className="absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Follow the Glow
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              @bitanas.salon <span className="text-gradient-rose">on Instagram</span>
            </h2>
            <p className="mt-5 text-foreground/60 leading-relaxed">
              Daily inspiration, behind-the-scenes, real client transformations
              and exclusive offers — join our growing community of glow-getters.
            </p>
          </div>
          <a
            href={SALON.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E1306C] via-[#C13584] to-[#833AB4] text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-rose/25 hover:scale-[1.03] transition-transform shrink-0"
          >
            <Instagram className="h-5 w-5" />
            Follow Us
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-md">
          {[
            { value: "12.4k", label: "Followers" },
            { value: "850+", label: "Posts" },
            { value: "98%", label: "Engagement" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center rounded-2xl bg-white border border-rose-soft/50 py-3 px-2 shadow-sm"
            >
              <p className="font-serif text-xl sm:text-2xl font-bold text-gradient-rose">
                {stat.value}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-foreground/50 font-semibold mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Feed grid */}
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {INSTA_POSTS.map((post, i) => (
            <a
              key={post.id}
              href={SALON.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative aspect-square rounded-2xl overflow-hidden zoom-wrap shadow-sm hover:shadow-xl hover:shadow-rose/20 transition-all duration-500",
                visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Instagram icon corner */}
              <span className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Instagram className="h-3.5 w-3.5" />
              </span>
              {/* Caption + stats */}
              <div className="absolute inset-x-0 bottom-0 p-3 text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <div className="flex items-center gap-3 text-xs font-medium mb-1.5">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 fill-current text-rose-soft" />
                    {post.likes}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    {post.comments}
                  </span>
                </div>
                <p className="text-[11px] line-clamp-2 leading-tight">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-foreground/55">
            Tag{" "}
            <span className="font-semibold text-rose-deep">@bitanas.salon</span>{" "}
            in your posts for a chance to be featured! ✨
          </p>
        </div>
      </div>
    </section>
  );
}
