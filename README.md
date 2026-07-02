# Bitanas Salon Peshawar — Luxury Beauty & Wellness

![Bitanas Salon](https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=1200&q=80)

A full-stack, single-page Next.js website for **Bitanas Salon** — a luxury beauty salon in Hayatabad, Peshawar. The site combines a beautiful brand showcase with a complete business management system: online booking, reviews, gift cards, loyalty program, admin dashboard, and an AI-powered chatbot concierge.

---

## Screenshots

| Hero Section | Services | Booking |
|:---:|:---:|:---:|
| ![Hero](https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400&q=60) | ![Services](https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=60) | ![Booking](https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=60) |
| **Gallery** | **Transformations** | **Admin Dashboard** |
| ![Gallery](https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=60) | ![Transformations](https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=60) | ![Admin](https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=60) |

> Screenshots above are placeholders from the Unsplash collection. Replace with actual site captures for production use.

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
- **AI Chatbot "Bella"** — Fully local agent, no API calls. Handles services, pricing, booking flow, FAQs, artist lookup, brands, offers, gift cards, reviews, and more — with intelligent catch-all search across all data
- **Live Feed** — Simulated social proof ticker ("Sarah just booked Balayage")
- **Live Viewers** — Simulated "18 viewing now" counter with random fluctuation
- **Random Act of Beauty** — Surprise reward popup every 30-90s

### Admin & Operations
- **Admin Dashboard** — Password-gated full-screen overlay, 6-tab sidebar (Bookings, Reviews, Messages, Newsletter, Waitlist, Applications), confirm/cancel bookings, approve/hide reviews, CSV export
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

### Page Sections (in order)

```
Brand Introduction → Services & Pricing → Portfolio → Booking & Offers
→ Team & Trust → Rewards & Community → Experience Zone (tabbed) → Connect
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

![Yaseen Ahmad](https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80)

> "I don't just write code; I build solutions."

Software Engineering student at CECOS University, Peshawar. Passionate about Web Development and creating responsive, user-friendly digital experiences.

- **Contact:** 0318-937042
- **WhatsApp:** 03189370042
- **GitHub:** [MrYaseenexe](https://github.com/MrYaseenexe)
- **LinkedIn:** [Yaseen Ahmad](https://linkedin.com/in/yaseen-ahmad-489967280)
- **Instagram:** [@yaseenahmadexe](https://www.instagram.com/yaseenahmadexe)
- **Facebook:** [Yaseen Ahmad](https://www.facebook.com/share/1HN9vegPhd/)
- **TikTok:** [@mryaseen.exe](https://www.tiktok.com/@mryaseen.exe)

---

**License:** MIT  
**Copyright:** 2026 Bitanas Salon — Built by [Yaseen Ahmad](https://github.com/MrYaseenexe)
