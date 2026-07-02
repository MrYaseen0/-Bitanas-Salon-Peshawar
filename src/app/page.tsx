"use client";

import { ScrollProgress } from "@/components/site/scroll-progress";
import { SeasonalBanner } from "@/components/site/seasonal-banner";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Brands } from "@/components/site/brands";
import { About } from "@/components/site/about";
import { Services } from "@/components/site/services";
import { Comparison } from "@/components/site/comparison";
import { PriceCalculator } from "@/components/site/price-calculator";
import { Transformations } from "@/components/site/transformations";
import { Gallery } from "@/components/site/gallery";
import { Packages } from "@/components/site/packages";
import { Offers } from "@/components/site/offers";
import { Artists } from "@/components/site/artists";
import { Reviews } from "@/components/site/reviews";
import { PressAwards } from "@/components/site/press-awards";
import { Booking } from "@/components/site/booking";
import { GiftCards } from "@/components/site/gift-cards";
import { Loyalty } from "@/components/site/loyalty";
import { Referral } from "@/components/site/referral";
import { InstagramFeed } from "@/components/site/instagram-feed";
import { Waitlist } from "@/components/site/waitlist";
import { Faq } from "@/components/site/faq";
import { Blog } from "@/components/site/blog";
import { Newsletter } from "@/components/site/newsletter";
import { Sustainability } from "@/components/site/sustainability";
import { Careers } from "@/components/site/careers";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { ExperienceZone } from "@/components/site/experience-zone";
import { Chatbot } from "@/components/site/chatbot";
import { AvailabilityWidget } from "@/components/site/availability-widget";
import { AdminDashboard } from "@/components/site/admin-dashboard";
import { BookingFireworks } from "@/components/site/booking-fireworks";
import { AppointmentCountdown } from "@/components/site/appointment-countdown";
import { LiveFeed } from "@/components/site/live-feed";
import { LiveViewers } from "@/components/site/live-viewers";
import { RandomActOfBeauty } from "@/components/site/random-act-of-beauty";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollProgress />
      <SeasonalBanner />
      <Navbar />
      <main className="flex-1">
        {/* ── Brand Introduction ── */}
        <Hero />
        <Stats />
        <Brands />
        <About />

        {/* ── Services & Pricing ── */}
        <Services />
        <Comparison />
        <PriceCalculator />

        {/* ── Portfolio ── */}
        <Transformations />
        <Gallery />

        {/* ── Booking & Offers ── */}
        <Packages />
        <Offers />
        <Booking />
        <GiftCards />

        {/* ── Team & Trust ── */}
        <Artists />
        <Reviews />
        <PressAwards />

        {/* ── Rewards & Community ── */}
        <Loyalty />
        <Referral />
        <InstagramFeed />

        {/* ── Interactive Fun (tabbed) ── */}
        <ExperienceZone />

        {/* ── Connect ── */}
        <Waitlist />
        <Faq />
        <Blog />
        <Newsletter />
        <Sustainability />
        <Careers />
        <Contact />
      </main>
      <Footer />

      {/* ── Overlays ── */}
      <BookingFireworks />
      <AppointmentCountdown />
      <LiveFeed />
      <LiveViewers />
      <RandomActOfBeauty />
      <Chatbot />
      <AvailabilityWidget />
      <AdminDashboard />
    </div>
  );
}
