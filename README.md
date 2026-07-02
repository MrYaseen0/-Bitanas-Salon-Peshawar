# Bitanas Salon Peshawar — Luxury Beauty & Wellness

A full-stack, single-page Next.js website for **Bitanas Salon** — a luxury beauty salon in Hayatabad, Peshawar. The site combines a beautiful brand showcase with a complete business management system: online booking, reviews, gift cards, loyalty program, admin dashboard, and an AI-powered chatbot concierge.

---

## Screenshots

### Hero — Landing Page

![Hero Section](screenshots/01-hero.png)

Full-screen hero with image collage, floating 4.9-star rating card, gradient text, animated entrance, and dual CTAs — "Book a Visit" and "Explore Services".

---

### Services Overview

![Services Overview](screenshots/02-services-overview.png)

12 services across 5 categories (Hair, Makeup, Nails, Skin & Spa, Bridal) with filterable grid, popular badges, pricing, durations, and "Book" buttons that pre-fill the booking form.

---

### Bridal Packages (Mobile)

![Bridal Packages](screenshots/03-packages-mobile.png)

3 bridal tiers — Essentials (PKR 45k), Royale (PKR 85k), and Maharani (PKR 160k) — with feature lists, WhatsApp booking links, and original/discounted pricing display.

---

### Service Comparison (Mobile)

![Service Comparison](screenshots/04-comparison-mobile.png)

Express vs Signature vs Premium tier comparison table with 10 feature rows — duration, senior artist, premium products, home service, trial session, and more. Desktop shows a table; mobile shows cards.

---

### Price Calculator (Mobile)

![Price Calculator](screenshots/05-price-calculator-mobile.png)

Interactive price calculator with 10 service chips and 4 add-on toggles. Shows live-updating total, estimated duration, loyalty points earned, and a "Book This on WhatsApp" button.

---

### Transformations (Mobile)

![Transformations](screenshots/06-transformations-mobile.png)

Before/after comparison slider with 3 transformations — Sun-Kissed Balayage, Bridal Glam, and Acrylic Nail Art. Auto-advances every 7 seconds with draggable divider.

---

### Reviews (Mobile)

![Reviews](screenshots/07-reviews-mobile.png)

Dynamic reviews section with verified badges, 4.9-star summary card with distribution bars, rating filter (All/5/4/3), loading skeletons, and a review submission dialog with star rating.

---

### Admin Dashboard

![Admin Dashboard](screenshots/08-admin-dashboard.png)

Password-gated full-screen overlay with 6-tab sidebar — Bookings, Reviews, Messages, Newsletter, Waitlist, Applications. Features live search/filter, confirm/cancel bookings, approve/hide reviews, and CSV export for all data types.

---

### Dark Mode

![Dark Mode](screenshots/09-dark-mode.png)

Full dark theme with next-themes integration. Sun/moon toggle in navbar. All sections, components, and overlays adapt to the dark palette with proper contrast and rose-pink accents.

---

### Seasonal Banner

![Seasonal Banner](screenshots/10-seasonal-banner.png)

Month-aware campaign banner that auto-rotates between seasonal promotions — Wedding Season, Valentine's, Spring Glow, Summer Spa, Eid, and Winter themes. Dismissible with session persistence.

---

### Mobile View

![Mobile View](screenshots/11-mobile-view.png)

Fully responsive design optimized for mobile devices. Sticky glass navbar with hamburger menu, touch-friendly cards, swipeable carousels, and properly scaled typography.

---

### Viewport

![Viewport](screenshots/12-viewport.png)

Clean viewport with scroll progress bar, sticky navbar with active section detection, and smooth scroll-to-section navigation across all 8 section groups.

---

### Hero Desktop

![Hero Desktop](screenshots/13-hero-desktop.png)

Desktop hero layout with image collage, seasonal offer banner chip, brand marquee, and the full-width Stats counter strip (125+ reviews, 8+ years, 12+ services, 5000+ clients).

---

### Banner Fixed

![Banner Fixed](screenshots/14-banner-fixed.png)

Seasonal banner overlay that sits above the hero without blocking content. Properly positioned to scroll away while the sticky navbar remains fixed.

---

### Mobile Navigation

![Mobile Navigation](screenshots/15-mobile-r8.png)

Mobile navigation menu with all 9 section links, dark mode toggle, language switcher (English/Roman Urdu), and "Book Now" CTA button.

---

## Live Demo

**Domain:** [bitanas.pk](https://bitanas.pk)  
**Business:** Luxury Beauty, Makeup & Spa | Hayatabad, Peshawar  
**Rating:** 4.9★ (125+ reviews)

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 + tw-animate-css |
| **UI Library** | shadcn/ui (New York style) with Radix UI primitives |
| **Fonts** | Geist, Playfair Display, Dancing Script |
| **ORM** | Prisma 6 with SQLite |
| **Forms** | react-hook-form + zod |
| **Charts** | recharts |
| **Animations** | framer-motion, CSS keyframes |
| **Icons** | lucide-react |
| **Carousel** | embla-carousel-react |
| **Package Manager** | bun |

---

## Features (40+)

### Core Business
- **Hero** — Full-screen with image collage, floating rating card, gradient text, animated entrance
- **About** — Brand story with 4 pillar cards, promises checklist
- **Services** — 12 services across 5 categories with filterable grid, popular badges, price calculator
- **Booking System** — Full form with zod validation, service/artist/date/time selection, WhatsApp quick-book
- **Gallery** — 12 images across 5 categories with filter tabs, keyboard-navigable lightbox
- **Transformations** — Interactive before/after comparison slider with auto-advance
- **Artists** — 4 team members with gradient avatars, experience badges, WhatsApp booking
- **Reviews** — Dynamic (API + curated), verified badges, rating filter, submission form with star rating
- **Contact** — Google Maps embed, hours table, social links, contact form

### Marketing & Engagement
- **Offers** — Limited-time promotions with live countdown timers, promo codes, urgency indicators
- **Packages** — 3 bridal tiers (Essentials/Royale/Maharani) with feature lists
- **Brands Marquee** — Infinite horizontal scrolling strip of 10 premium brands
- **Press & Awards** — 4 award cards + 3 press feature quotes
- **Instagram Feed** — 6 curated posts with likes/comments
- **Blog** — Beauty tips with modal articles, key takeaways
- **Seasonal Banner** — Month-aware campaign banner (dismissible)

### Rewards & Loyalty
- **Loyalty Program** — 3 tiers (Rose/Gold/Elite Maharani) with perks, points simulator
- **Referral Program** — Benefits cards, step-by-step timeline, social share buttons
- **Gift Cards** — 3 tiers, purchase flow with unique code generation, balance check
- **Beauty Quiz** — 3-question interactive quiz with personalised recommendations
- **Glow Score** — 0-100 personalised radiance score with share text
- **Mystery Wheel** — Canvas spin-to-win with 8 weighted segments, 1 spin/day
- **Beauty Swiper** — Tinder-style cards to discover your beauty vibe
- **Glow Streak** — Monthly visit tracker with milestone rewards
- **Loyalty Pass** — Digital wallet card with QR code, tier indicator
- **Beauty Personality** — 6 archetypes with shareable results card
- **Beauty Mood Board** — Save favourite services, share on WhatsApp
- **Daily Beauty Tip** — Rotating tips with auto-cycle, pause-on-hover

### AI & Automation
- **AI Chatbot "Bella"** — Fully local agent, no API calls. Handles services, pricing, booking flow, FAQs, artist lookup, brands, offers, gift cards, reviews — with intelligent catch-all search across all data
- **Live Feed** — Simulated social proof ticker ("Sarah just booked Balayage")
- **Live Viewers** — Simulated "18 viewing now" counter with random fluctuation
- **Random Act of Beauty** — Surprise reward popup every 30-90s

### Admin & Operations
- **Admin Dashboard** — Password-gated, 6-tab sidebar, confirm/cancel bookings, approve/hide reviews, CSV export
- **Availability Widget** — Live open/closed status, green/red pulse, next change time
- **Scroll Progress** — Thin gradient bar tracking scroll percentage
- **Dark Mode** — next-themes integration, full dark theme
- **i18n** — English / Roman Urdu language toggle (persisted in localStorage)
- **Audio Feedback** — Web Audio API sounds (booking chime, wheel tick/win, swipe whoosh)
- **Confetti** — Canvas-based celebration animation on booking success

---

## Quick Start

```bash
# Clone
git clone https://github.com/MrYaseen0/-Bitanas-Salon-Peshawar.git
cd Bitanas-Salon-Peshawar

# Install
bun install

# Set up database
bun run db:generate
bun run db:push

# Start dev server
bun dev
# → http://localhost:3000
```

### Environment

Create a `.env` file:

```env
DATABASE_URL=file:./db/custom.db
ADMIN_PASSWORD=your-admin-password
```

### Admin Access

Log in via the "Admin" button in the footer.  
Default credentials: `bitanas-admin-2026` (change in `.env`)

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              ← 8 logical section groups
│   ├── layout.tsx            ← Root layout (fonts, SEO, providers)
│   ├── globals.css           ← Theme variables, animations
│   └── api/                  ← 14 API routes
├── components/
│   ├── site/                 ← 50+ section components
│   └── ui/                   ← shadcn/ui primitives
├── hooks/                    ← use-reveal, use-countdown, use-local-storage
└── lib/                      ← db.ts, salon-data.ts, utils.ts, audio-feedback.ts, confetti.ts, glow-score.ts
```

---

## Database Models

| Model | Purpose |
|---|---|
| `Booking` | Appointment requests |
| `Review` | Customer reviews |
| `ContactMessage` | Contact form submissions |
| `Newsletter` | Email subscribers |
| `Waitlist` | Service waitlist |
| `JobApplication` | Career applications |
| `GiftCard` | Gift card codes & balances |
| `GiftCardOrder` | Gift card purchase orders |

Edit via: `npx prisma studio`

---

## Developer

**Yaseen Ahmad** — *Full-Stack Developer*

![Yaseen Ahmad](https://drive.google.com/uc?export=download&id=1Ig7ZxMz29coxDjWrletU1dYf0pNaEr_h)

> "I don't just write code; I build solutions."

Software Engineering student at CECOS University, Peshawar. Passionate about Web Development and creating responsive, user-friendly digital experiences.

| | |
|---|---|
| **Contact** | 0318-937042 |
| **WhatsApp** | 03189370042 |
| **GitHub** | [MrYaseenexe](https://github.com/MrYaseenexe) |
| **LinkedIn** | [Yaseen Ahmad](https://linkedin.com/in/yaseen-ahmad-489967280) |
| **Instagram** | [@yaseenahmadexe](https://www.instagram.com/yaseenahmadexe) |
| **Facebook** | [Yaseen Ahmad](https://www.facebook.com/share/1HN9vegPhd/) |
| **TikTok** | [@mryaseen.exe](https://www.tiktok.com/@mryaseen.exe) |

---

**License:** MIT  
**Copyright:** 2026 Bitanas Salon — Built by [Yaseen Ahmad](https://github.com/MrYaseenexe)
