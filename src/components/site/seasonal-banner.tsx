"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

interface SeasonalCampaign {
  key: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  gradient: string;
  emoji: string;
}

function getActiveCampaign(): SeasonalCampaign | null {
  const month = new Date().getMonth(); // 0-11
  const day = new Date().getDate();

  // Wedding season (Nov - Feb)
  if (month === 10 || month === 11 || month === 0 || month === 1) {
    return {
      key: "wedding-season",
      title: "Wedding Season is Here!",
      subtitle: "Book your bridal package early & save up to 15%",
      cta: "View Bridal Packages",
      href: "#packages",
      gradient: "from-rose-deep via-rose to-gold",
      emoji: "💍",
    };
  }
  // Valentine's (early Feb)
  if (month === 1 && day <= 14) {
    return {
      key: "valentine",
      title: "Valentine's Glam Special",
      subtitle: "Party makeup + blow dry bundle — save PKR 2,000",
      cta: "Claim Offer",
      href: "#offers",
      gradient: "from-rose-deep via-rose to-rose-deep",
      emoji: "💖",
    };
  }
  // Spring (Mar - Apr)
  if (month === 2 || month === 3) {
    return {
      key: "spring-glow",
      title: "Spring Glow Refresh",
      subtitle: "Signature facial + balayage touch-up at 10% off",
      cta: "Book Spring Glow",
      href: "#booking",
      gradient: "from-gold via-rose to-rose-deep",
      emoji: "🌸",
    };
  }
  // Summer (May - Jul)
  if (month === 4 || month === 5 || month === 6) {
    return {
      key: "summer-spa",
      title: "Summer Spa Escape",
      subtitle: "Cool off with our relaxation spa ritual — save 12%",
      cta: "Book Spa Day",
      href: "#booking",
      gradient: "from-gold-soft via-gold to-rose",
      emoji: "🧖‍♀️",
    };
  }
  // Eid period (Aug - Sep, approximate)
  if (month === 7 || month === 8) {
    return {
      key: "eid-glam",
      title: "Eid Mubarak Glam ✨",
      subtitle: "Exclusive Eid makeup packages — family bookings welcome",
      cta: "Book Eid Glam",
      href: "#packages",
      gradient: "from-rose-deep via-gold to-rose-deep",
      emoji: "🌙",
    };
  }
  // Winter (Oct)
  return {
    key: "winter-skincare",
    title: "Winter Skin SOS",
    subtitle: "Hydrating facials + spa mani/pedi to beat the dry",
    cta: "See Offers",
    href: "#offers",
    gradient: "from-rose via-rose-deep to-gold",
    emoji: "❄️",
  };
}

export function SeasonalBanner() {
  // Lazy init computes on first client render (no setState-in-effect)
  const [campaign, setCampaign] = useState<SeasonalCampaign | null>(() =>
    typeof window === "undefined" ? null : getActiveCampaign()
  );
  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const c = getActiveCampaign();
    return c
      ? sessionStorage.getItem("bitanas-banner-" + c.key) === "dismissed"
      : false;
  });

  // No effect needed — campaign + dismissed computed once on mount

  const dismiss = () => {
    setDismissed(true);
    if (campaign) {
      sessionStorage.setItem("bitanas-banner-" + campaign.key, "dismissed");
    }
  };

  if (!campaign || dismissed) return null;

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`relative bg-gradient-to-r ${campaign.gradient} text-white overflow-hidden`}
    >
      {/* Decorative dots */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
        <button
          onClick={() => scrollTo(campaign.href)}
          className="flex items-center gap-2.5 text-left group flex-1 min-w-0"
        >
          <span className="text-lg sm:text-xl shrink-0">{campaign.emoji}</span>
          <span className="min-w-0">
            <span className="block text-xs sm:text-sm font-bold leading-tight truncate">
              {campaign.title}
            </span>
            <span className="hidden sm:block text-[11px] text-white/85 truncate">
              {campaign.subtitle}
            </span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap group-hover:bg-white/30 transition-colors">
            {campaign.cta}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </button>
        <button
          onClick={dismiss}
          className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
