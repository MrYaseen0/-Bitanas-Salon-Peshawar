// Centralized salon data for Bitanas Salon, Peshawar

export const SALON = {
  name: "Bitanas Salon",
  city: "Peshawar",
  tagline: "Where Beauty Meets Artistry",
  rating: 4.9,
  reviewCount: 125,
  phone: "0370 9931504",
  phoneHref: "tel:+923709931504",
  address: "Flat 6, Zangal Market, F-8 Phase 6, Hayatabad, Peshawar",
  addressShort: "Hayatabad, Peshawar",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Bitanas+salon+Peshawar+Hayatabad",
  mapsEmbed:
    "https://www.google.com/maps?q=Hayatabad+Phase+6+Peshawar&output=embed",
  hours: [
    { day: "Monday", time: "10:30 AM – 8:00 PM", closed: false },
    { day: "Tuesday", time: "10:30 AM – 8:00 PM", closed: false },
    { day: "Wednesday", time: "10:30 AM – 8:00 PM", closed: false },
    { day: "Thursday", time: "10:30 AM – 8:00 PM", closed: false },
    { day: "Friday", time: "2:00 PM – 8:00 PM", closed: false },
    { day: "Saturday", time: "10:30 AM – 8:00 PM", closed: false },
    { day: "Sunday", time: "Closed", closed: true },
  ],
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
};

// Professional images curated for the salon
export const IMAGES = {
  heroPrimary:
    "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHw0fHxiZWF1dHklMjBzYWxvbnxlbnwwfHx8fDE3ODI3MzQ5NDZ8MA&ixlib=rb-4.1.0&q=85",
  heroSecondary:
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbnxlbnwwfHx8fDE3ODI3MzQ5NDZ8MA&ixlib=rb-4.1.0&q=85",
  about:
    "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHw0fHxiZWF1dHklMjBzYWxvbnxlbnwwfHx8fDE3ODI3MzQ5NDZ8MA&ixlib=rb-4.1.0&q=85",
};

export type ServiceCategory =
  | "Hair"
  | "Makeup"
  | "Nails"
  | "Skin & Spa"
  | "Bridal";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  duration: string;
  price: string;
  popular?: boolean;
  image: string;
}

export const SERVICES: Service[] = [
  // Hair
  {
    id: "balayage",
    name: "Signature Balayage",
    category: "Hair",
    description:
      "Hand-painted, sun-kissed highlights blended seamlessly for a natural, lived-in glow.",
    duration: "3 hrs",
    price: "PKR 12,000+",
    popular: true,
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "blow-dry",
    name: "Luxury Blow Dry",
    category: "Hair",
    description:
      "Volume, shine and bounce — a salon-perfect blowout tailored to your hair type.",
    duration: "45 min",
    price: "PKR 2,500",
    popular: true,
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "haircut",
    name: "Designer Haircut",
    category: "Hair",
    description:
      "Precision cut and styling by senior stylists, finished with a smooth blow-dry.",
    duration: "1 hr",
    price: "PKR 3,500",
    image:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "braids",
    name: "Braids & Updos",
    category: "Hair",
    description:
      "From boho braids to elegant updos — perfect for parties, weddings and events.",
    duration: "1.5 hrs",
    price: "PKR 4,000+",
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  // Makeup
  {
    id: "party-makeup",
    name: "Party Makeup",
    category: "Makeup",
    description:
      "Camera-ready glam with flawless base, defined eyes and long-lasting finish.",
    duration: "1 hr",
    price: "PKR 6,000",
    popular: true,
    image:
      "https://images.unsplash.com/photo-1709477542170-f11ee7d471a0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHw0fHxtYWtldXAlMjBmYWNpYWx8ZW58MHx8fHwxNzgyNzM0OTQ3fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: "bridal-makeup",
    name: "Bridal Makeup",
    category: "Bridal",
    description:
      "Full bridal glam with HD foundation, contouring and lashes for your big day.",
    duration: "2 hrs",
    price: "PKR 25,000+",
    popular: true,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwyfHxtYWtldXAlMjBmYWNpYWx8ZW58MHx8fHwxNzgyNzM0OTQ3fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: "engagement-makeup",
    name: "Engagement Glam",
    category: "Bridal",
    description:
      "Soft romantic glam — dewy skin, fluffy lashes and a fresh, glowing finish.",
    duration: "1.5 hrs",
    price: "PKR 15,000",
    image:
      "https://images.unsplash.com/photo-1731514771613-991a02407132?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwzfHxtYWtldXAlMjBmYWNpYWx8ZW58MHx8fHwxNzgyNzM0OTQ3fDA&ixlib=rb-4.1.0&q=85",
  },
  // Nails
  {
    id: "acrylic-nails",
    name: "Acrylic Nails",
    category: "Nails",
    description:
      "Custom-shaped acrylic extensions with gel polish art — strong, sleek and stylish.",
    duration: "1.5 hrs",
    price: "PKR 5,500",
    popular: true,
    image:
      "https://images.pexels.com/photos/3992861/pexels-photo-3992861.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: "spa-mani-pedi",
    name: "Spa Mani / Pedi",
    category: "Nails",
    description:
      "Relaxing soak, exfoliation, mask, massage and gel polish for hands & feet.",
    duration: "1.5 hrs",
    price: "PKR 4,500",
    image:
      "https://images.pexels.com/photos/34930126/pexels-photo-34930126.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  // Skin & Spa
  {
    id: "facial",
    name: "Signature Facial",
    category: "Skin & Spa",
    description:
      "Deep cleanse, exfoliation and hydration tailored to your skin type for a radiant glow.",
    duration: "1 hr",
    price: "PKR 5,000",
    popular: true,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "body-waxing",
    name: "Body Waxing",
    category: "Skin & Spa",
    description:
      "Smooth, long-lasting hair removal with premium roll-on wax for sensitive skin.",
    duration: "45 min+",
    price: "PKR 2,000+",
    image:
      "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "spa-ritual",
    name: "Relaxation Spa Ritual",
    category: "Skin & Spa",
    description:
      "Full-body unwind with aromatherapy, hot stone massage and hydrating body wrap.",
    duration: "2 hrs",
    price: "PKR 9,000",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
];

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export const GALLERY: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Elegant salon interior with soft lighting",
    category: "Salon",
  },
  {
    src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Beauty treatment station",
    category: "Salon",
  },
  {
    src: "https://images.unsplash.com/photo-1709477542170-f11ee7d471a0?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Professional makeup application",
    category: "Makeup",
  },
  {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Bridal makeup look",
    category: "Makeup",
  },
  {
    src: "https://images.pexels.com/photos/3992861/pexels-photo-3992861.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Acrylic nail art design",
    category: "Nails",
  },
  {
    src: "https://images.pexels.com/photos/34930126/pexels-photo-34930126.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Spa manicure and pedicure",
    category: "Spa",
  },
  {
    src: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Salon styling area",
    category: "Salon",
  },
  {
    src: "https://images.unsplash.com/photo-1731514771613-991a02407132?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Soft glam makeup look",
    category: "Makeup",
  },
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Balayage hair color result",
    category: "Hair",
  },
  {
    src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Hair styling in progress",
    category: "Hair",
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Relaxing spa treatment",
    category: "Spa",
  },
  {
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Elegant braided hairstyle",
    category: "Hair",
  },
];

export interface Review {
  name: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  initials: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Ayesha Khan",
    rating: 5,
    date: "2 weeks ago",
    service: "Bridal Makeup",
    initials: "AK",
    comment:
      "Got my makeup done from their Peshawar branch for the first time yesterday and I absolutely loved my look. The hairstyle was stunning — it gave me such a lifted look. The whole team made me feel so special on my big day.",
  },
  {
    name: "Mahnoor Ali",
    rating: 5,
    date: "1 month ago",
    service: "Facial & Spa Mani/Pedi",
    initials: "MA",
    comment:
      "So happy that I visited Bitana's rather than any other parlour. I opted for their facial and spa mani/pedi. The girl who did my facial really knew what she was doing — my skin was glowing for days!",
  },
  {
    name: "Sara Bibi",
    rating: 5,
    date: "1 month ago",
    service: "Haircut & Blow Dry",
    initials: "SB",
    comment:
      "The vibe, the service, the haircut… everything was just perfect. Highly recommended. The salon is so clean and the stylists actually listen to what you want.",
  },
  {
    name: "Hira Shah",
    rating: 5,
    date: "2 months ago",
    service: "Acrylic Nails",
    initials: "HS",
    comment:
      "Best acrylic nails in Peshawar hands down! The shape, the art, the lasting power — all 10/10. Already booked my next refill.",
  },
  {
    name: "Fatima Rahman",
    rating: 5,
    date: "2 months ago",
    service: "Balayage",
    initials: "FR",
    comment:
      "My balayage turned out exactly like the reference picture. The colourist truly understood the assignment. Soft, blended and so natural looking.",
  },
  {
    name: "Zainab Younas",
    rating: 5,
    date: "3 months ago",
    service: "Party Makeup",
    initials: "ZY",
    comment:
      "Booked party makeup for a wedding and received so many compliments. Long-lasting, camera-ready and the team was so professional throughout.",
  },
];

export interface Artist {
  name: string;
  role: string;
  specialty: string;
  initials: string;
  experience: string;
  signature: string;
}

export const ARTISTS: Artist[] = [
  {
    name: "Bitana",
    role: "Founder & Lead Makeup Artist",
    specialty: "Bridal Glam · HD Makeup",
    initials: "B",
    experience: "10+ yrs",
    signature: "Soft glam & bridal looks",
  },
  {
    name: "Sana",
    role: "Senior Hair Stylist",
    specialty: "Balayage · Color & Cuts",
    initials: "S",
    experience: "7+ yrs",
    signature: "Dimensional color melts",
  },
  {
    name: "Areeba",
    role: "Nail & Spa Specialist",
    specialty: "Acrylics · Spa Rituals",
    initials: "A",
    experience: "6+ yrs",
    signature: "Detailed nail artistry",
  },
  {
    name: "Mehwish",
    role: "Skincare Aesthetician",
    specialty: "Facials · Skin Therapy",
    initials: "M",
    experience: "8+ yrs",
    signature: "Glow-boosting facials",
  },
];

export const STATS = [
  { value: 125, suffix: "+", label: "5-Star Reviews" },
  { value: 8, suffix: "+", label: "Years of Glam" },
  { value: 12, suffix: "+", label: "Signature Services" },
  { value: 5000, suffix: "+", label: "Happy Clients" },
];

export const FAQS = [
  {
    q: "Do I need an appointment or can I walk in?",
    a: "We strongly recommend booking an appointment to guarantee your preferred artist and time slot. Walk-ins are welcome but subject to availability, especially on weekends.",
  },
  {
    q: "How early should I book bridal services?",
    a: "For bridal makeup and full packages, we suggest booking at least 4–6 weeks in advance. A trial session can be scheduled 2–3 weeks before the event.",
  },
  {
    q: "Do you use original, skin-friendly products?",
    a: "Absolutely. We only use premium, authentic brands such as MAC, Huda Beauty, NARS, Kryolan and Charlotte Tilbury, all suited to South-Asian skin tones.",
  },
  {
    q: "What are your payment options?",
    a: "We accept cash, all major debit/credit cards, EasyPaisa and JazzCash. A 30% advance is required to confirm bridal and event bookings.",
  },
  {
    q: "Do you offer home services?",
    a: "Home services are available within Hayatabad and select areas of Peshawar for bridal and party packages. Additional travel charges may apply.",
  },
  {
    q: "Can I get a trial before my bridal booking?",
    a: "Yes! Every bridal package includes an optional trial session 2–3 weeks before your event. Trials are charged separately but fully adjusted into your final package if you proceed.",
  },
];

// ─── New: Special Offers ───────────────────────────────────────────────
export interface Offer {
  id: string;
  title: string;
  description: string;
  badge: string;
  discount: string;
  validUntil: string; // ISO date
  code: string;
  accent: "rose" | "gold" | "deep";
}

// Offers expire 21 days from now (rolling) so the countdown is always live
const inDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
};

export const OFFERS: Offer[] = [
  {
    id: "bridal-season",
    title: "Bridal Season Special",
    description:
      "Book any bridal package this month and receive a complimentary pre-bridal facial + complimentary touch-up kit worth PKR 8,000.",
    badge: "Limited Time",
    discount: "Save up to 15%",
    validUntil: inDays(14),
    code: "BRIDAL15",
    accent: "deep",
  },
  {
    id: "spa-duo",
    title: "Spa & Glow Duo",
    description:
      "Signature facial + spa mani/pedi bundle for the ultimate reset. Perfect before any big event or just to treat yourself.",
    badge: "Most Loved",
    discount: "Save PKR 2,500",
    validUntil: inDays(10),
    code: "GLOWDUO",
    accent: "rose",
  },
  {
    id: "friends-referral",
    title: "Bring a Friend, Both Save",
    description:
      "Refer a friend and you both receive 10% off your next service. Stackable with any ongoing promotion.",
    badge: "Refer & Earn",
    discount: "10% off for both",
    validUntil: inDays(30),
    code: "FRIENDS10",
    accent: "gold",
  },
];

// ─── New: Bridal Packages ──────────────────────────────────────────────
export interface BridalPackage {
  id: string;
  name: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  duration: string;
  popular?: boolean;
  includes: string[];
  accent: "rose" | "gold" | "deep";
}

export const PACKAGES: BridalPackage[] = [
  {
    id: "essentials",
    name: "Bridal Essentials",
    tagline: "For the bride who wants effortless elegance",
    price: "PKR 45,000",
    originalPrice: "PKR 52,000",
    duration: "1 event · 3 hrs",
    accent: "rose",
    includes: [
      "HD bridal makeup with lashes",
      "Hair styling (updo or open)",
      "Draping & setting",
      "Premium products (MAC, NARS)",
      "Touch-up powder compact",
      "Post-booking WhatsApp support",
    ],
  },
  {
    id: "royale",
    name: "Bridal Royale",
    tagline: "Our most-loved complete bridal experience",
    price: "PKR 85,000",
    originalPrice: "PKR 98,000",
    duration: "2 events · 2 days",
    popular: true,
    accent: "deep",
    includes: [
      "Everything in Essentials",
      "Makeup for 2 events (Barat + Walima)",
      "Hair styling for both events",
      "Pre-bridal glow facial (1 session)",
      "Spa mani/pedi for the bride",
      "Trial session included",
      "Bridal touch-up kit to take home",
    ],
  },
  {
    id: "maharani",
    name: "Maharani Experience",
    tagline: "The ultimate indulgence for the bride-to-be",
    price: "PKR 1,60,000",
    originalPrice: "PKR 1,85,000",
    duration: "3 events · 1 week prep",
    accent: "gold",
    includes: [
      "Everything in Royale",
      "Makeup for 3 events (Mehndi + Barat + Walima)",
      "4 pre-bridal facial sessions",
      "Full body spa ritual",
      "Hair treatment + blow dry",
      "Nail art for all events",
      "Personal stylist on-call all week",
      "Complimentary home service",
    ],
  },
];

// ─── New: Trusted Premium Brands ───────────────────────────────────────
export const BRANDS = [
  "MAC",
  "Huda Beauty",
  "NARS",
  "Charlotte Tilbury",
  "Kryolan",
  "Anastasia Beverly Hills",
  "Olaplex",
  "L'Oréal Pro",
  "Schwarzkopf",
  "OPI",
];

// ─── New: Before / After Transformations ───────────────────────────────
export interface Transformation {
  id: string;
  title: string;
  service: string;
  before: string;
  after: string;
  description: string;
}

export const TRANSFORMATIONS: Transformation[] = [
  {
    id: "balayage-glow",
    title: "Sun-Kissed Balayage",
    service: "Balayage · Blow Dry",
    before:
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?crop=entropy&cs=srgb&fm=jpg&q=80",
    after:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?crop=entropy&cs=srgb&fm=jpg&q=85",
    description:
      "A dimensional, hand-painted balayage that melts from deep brown to honeyed ends — finished with a glossy blow dry.",
  },
  {
    id: "bridal-glam",
    title: "Bridal Glam Transformation",
    service: "Bridal Makeup · HD",
    before:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?crop=entropy&cs=srgb&fm=jpg&q=80",
    after:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=srgb&fm=jpg&q=85",
    description:
      "Soft radiant base, defined eyes and a flushed lip — camera-ready bridal glam that lasts all day.",
  },
  {
    id: "nail-art",
    title: "Acrylic Nail Art",
    service: "Acrylic Nails · Gel Art",
    before:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=srgb&fm=jpg&q=80",
    after:
      "https://images.pexels.com/photos/3992861/pexels-photo-3992861.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    description:
      "Custom-shaped acrylic extensions with hand-painted gel art — strong, sleek and statement-making.",
  },
];

// ─── New: Gift Cards ───────────────────────────────────────────────────
export interface GiftCard {
  amount: number;
  label: string;
  perks: string;
  popular?: boolean;
}

export const GIFT_CARDS: GiftCard[] = [
  {
    amount: 5000,
    label: "Glow Getter",
    perks: "Perfect for a facial, blow dry or spa mani/pedi",
  },
  {
    amount: 10000,
    label: "Beauty Buffet",
    perks: "Covers a full spa ritual or a luxe party makeup look",
    popular: true,
  },
  {
    amount: 25000,
    label: "Glam Squad",
    perks: "Treat someone to bridal makeup or a custom package",
  },
];

// ─── New: WhatsApp helper ──────────────────────────────────────────────
export function whatsappLink(message: string): string {
  // 0370 9931504 → international +92 370 9931504
  const number = "923709931504";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT = whatsappLink(
  `Hi Bitanas Salon! ✨ I'd like to know more about your services and availability.`
);

// ─── New: Loyalty / Rewards Program ────────────────────────────────────
export interface LoyaltyTier {
  id: string;
  name: string;
  threshold: string;
  color: string;
  perks: string[];
  accent: "rose" | "gold" | "deep";
  icon: "sparkle" | "crown" | "gem";
}

export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    id: "rose",
    name: "Rose Member",
    threshold: "Free to join",
    color: "from-rose-soft to-rose-soft/40",
    accent: "rose",
    icon: "sparkle",
    perks: [
      "1 point per PKR 100 spent",
      "Birthday month bonus gift",
      "Early access to seasonal offers",
      "Free brow shaping on 3rd visit",
    ],
  },
  {
    id: "gold",
    name: "Gold Member",
    threshold: "PKR 50,000 lifetime spend",
    color: "from-gold-soft to-gold/40",
    accent: "gold",
    icon: "gem",
    perks: [
      "1.5 points per PKR 100 spent",
      "Complimentary monthly facial",
      "Priority booking — skip the queue",
      "10% off all retail products",
      "Free upgrade to premium products",
    ],
  },
  {
    id: "elite",
    name: "Elite Maharani",
    threshold: "PKR 150,000 lifetime spend",
    color: "from-rose-deep to-rose",
    accent: "deep",
    icon: "crown",
    perks: [
      "2 points per PKR 100 spent",
      "Dedicated personal stylist",
      "2 complimentary spa rituals / year",
      "15% off all services & packages",
      "Exclusive event invitations",
      "Free home service within Hayatabad",
    ],
  },
];

export const LOYALTY_HOW_IT_WORKS = [
  {
    step: "01",
    title: "Visit & Earn",
    desc: "Every visit earns points automatically — 1 point per PKR 100 spent. No app needed, just your phone number.",
  },
  {
    step: "02",
    title: "Climb the Tiers",
    desc: "Unlock Rose → Gold → Elite as you spend. Each tier unlocks richer perks and priority treatment.",
  },
  {
    step: "03",
    title: "Redeem & Glow",
    desc: "Redeem points for free services, upgrades, or products. 500 points = PKR 1,000 off any treatment.",
  },
];

// ─── New: Beauty Tips Blog ─────────────────────────────────────────────
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: "Hair" | "Skin" | "Bridal" | "Nails" | "Self-Care";
  readTime: string;
  date: string;
  image: string;
  tips: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "pre-bridal-glow",
    title: "Your 30-Day Pre-Bridal Glow-Up Guide",
    excerpt:
      "A month-by-month roadmap to radiant skin, healthy hair and calm nerves before your big day.",
    category: "Bridal",
    readTime: "6 min read",
    date: "Jun 2026",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=srgb&fm=jpg&q=80",
    tips: [
      "Start a weekly facial routine 8 weeks out",
      "Hydrate — aim for 2.5L water daily",
      "Book a hair spa every 2 weeks",
      "Sleep 7-8 hours; stress shows on skin",
    ],
  },
  {
    id: "balayage-care",
    title: "How to Make Your Balayage Last 6+ Months",
    excerpt:
      "Color-safe washing, purple shampoo timing and heat protection — the secrets to sunkissed hair that stays luminous.",
    category: "Hair",
    readTime: "4 min read",
    date: "Jun 2026",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=srgb&fm=jpg&q=80",
    tips: [
      "Wash 2-3x a week with sulfate-free shampoo",
      "Use purple shampoo once a week, max",
      "Always apply heat protectant before styling",
      "Book a gloss treatment every 6 weeks",
    ],
  },
  {
    id: "winter-skincare",
    title: "5 Winter Skin Saviours for Peshawar Winters",
    excerpt:
      "Cold, dry air can strip your skin barrier. These hydrating heroes keep the glow alive all season.",
    category: "Skin",
    readTime: "5 min read",
    date: "May 2026",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=srgb&fm=jpg&q=80",
    tips: [
      "Switch to a cream cleanser",
      "Layer hyaluronic acid under moisturizer",
      "Never skip SPF — UV is year-round",
      "Add a weekly hydrating mask",
    ],
  },
];

// ─── New: Price Calculator options ─────────────────────────────────────
export interface CalcService {
  id: string;
  name: string;
  basePrice: number;
  duration: number; // minutes
  category: string;
}

export const CALC_SERVICES: CalcService[] = [
  { id: "blow-dry", name: "Luxury Blow Dry", basePrice: 2500, duration: 45, category: "Hair" },
  { id: "haircut", name: "Designer Haircut", basePrice: 3500, duration: 60, category: "Hair" },
  { id: "balayage", name: "Signature Balayage", basePrice: 12000, duration: 180, category: "Hair" },
  { id: "party-makeup", name: "Party Makeup", basePrice: 6000, duration: 60, category: "Makeup" },
  { id: "bridal-makeup", name: "Bridal Makeup", basePrice: 25000, duration: 120, category: "Bridal" },
  { id: "acrylic-nails", name: "Acrylic Nails", basePrice: 5500, duration: 90, category: "Nails" },
  { id: "spa-mani-pedi", name: "Spa Mani / Pedi", basePrice: 4500, duration: 90, category: "Nails" },
  { id: "facial", name: "Signature Facial", basePrice: 5000, duration: 60, category: "Skin & Spa" },
  { id: "body-waxing", name: "Body Waxing", basePrice: 2000, duration: 45, category: "Skin & Spa" },
  { id: "spa-ritual", name: "Relaxation Spa Ritual", basePrice: 9000, duration: 120, category: "Skin & Spa" },
];

export interface CalcAddOn {
  id: string;
  name: string;
  price: number;
}

export const CALC_ADDONS: CalcAddOn[] = [
  { id: "hair-spa", name: "Hair Spa Treatment", price: 3000 },
  { id: "lash", name: "Premium Lashes", price: 2000 },
  { id: "trial", name: "Trial Session", price: 5000 },
  { id: "home-service", name: "Home Service (Hayatabad)", price: 2500 },
];

// ─── New: Referral Program ─────────────────────────────────────────────
export const REFERRAL_BENEFITS = [
  {
    icon: "gift",
    title: "You Get 10% Off",
    desc: "Receive a 10% discount on your next service the moment your friend completes their first visit.",
  },
  {
    icon: "heart",
    title: "Friend Gets 10% Off",
    desc: "Your friend enjoys 10% off their first appointment — a warm welcome from you to them.",
  },
  {
    icon: "sparkles",
    title: "Both Earn 100 Points",
    desc: "You and your friend each earn 100 bonus loyalty points, stackable with your tier rewards.",
  },
];

export const REFERRAL_STEPS = [
  {
    step: "01",
    title: "Share Your Code",
    desc: "Generate your unique referral code via WhatsApp and share it with friends & family.",
  },
  {
    step: "02",
    title: "Friend Books & Visits",
    desc: "Your friend mentions your code while booking and completes their first appointment.",
  },
  {
    step: "03",
    title: "Both Rewarded",
    desc: "Discounts + bonus points land in both accounts automatically. No limit on referrals!",
  },
];

// ─── New: Service Comparison ───────────────────────────────────────────
export interface ComparisonFeature {
  feature: string;
  express: boolean | string;
  signature: boolean | string;
  premium: boolean | string;
}

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  { feature: "Service duration", express: "30-45 min", signature: "60-90 min", premium: "120+ min" },
  { feature: "Senior artist", express: false, signature: true, premium: true },
  { feature: "Premium products (MAC, NARS)", express: false, signature: true, premium: true },
  { feature: "Hair wash & blow dry included", express: true, signature: true, premium: true },
  { feature: "Complimentary consultation", express: true, signature: true, premium: true },
  { feature: "Touch-up kit to take home", express: false, signature: false, premium: true },
  { feature: "Trial session included", express: false, signature: false, premium: true },
  { feature: "Priority booking", express: false, signature: false, premium: true },
  { feature: "Home service option", express: false, signature: false, premium: true },
  { feature: "Complimentary facial", express: false, signature: false, premium: true },
];

export const COMPARISON_TIERS = [
  {
    id: "express",
    name: "Express",
    tagline: "Quick refresh",
    price: "PKR 2,500+",
    accent: "rose" as const,
  },
  {
    id: "signature",
    name: "Signature",
    tagline: "Most chosen",
    price: "PKR 6,000+",
    accent: "gold" as const,
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Full indulgence",
    price: "PKR 15,000+",
    accent: "deep" as const,
  },
];

// ─── New: Skin/Hair Type Quiz ──────────────────────────────────────────
export interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; value: string; emoji: string }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "type",
    question: "What are you here to glow up today?",
    options: [
      { label: "My hair", value: "hair", emoji: "💇‍♀️" },
      { label: "My skin", value: "skin", emoji: "✨" },
      { label: "My nails", value: "nails", emoji: "💅" },
      { label: "Full glam", value: "bridal", emoji: "👰" },
    ],
  },
  {
    id: "concern",
    question: "What's your main concern right now?",
    options: [
      { label: "Dryness / dullness", value: "dry", emoji: "🌙" },
      { label: "Damage / breakage", value: "damage", emoji: "⚠️" },
      { label: "Special occasion soon", value: "event", emoji: "🎉" },
      { label: "Just want to pamper", value: "pamper", emoji: "💖" },
    ],
  },
  {
    id: "budget",
    question: "What feels like the right treat?",
    options: [
      { label: "Quick refresh (under 3k)", value: "express", emoji: "⚡" },
      { label: "Signature service (3-10k)", value: "signature", emoji: "🌟" },
      { label: "Full indulgence (10k+)", value: "premium", emoji: "💎" },
      { label: "Bridal / event package", value: "bridal", emoji: "💍" },
    ],
  },
];

export interface QuizResult {
  title: string;
  message: string;
  services: { name: string; price: string; emoji: string }[];
}

export function getQuizResult(answers: Record<string, string>): QuizResult {
  const type = answers.type || "hair";
  const budget = answers.budget || "signature";

  const resultsByType: Record<
    string,
    { title: string; message: string; services: QuizResult["services"] }
  > = {
    hair: {
      title: "Hair Love Awaits ✨",
      message:
        "Based on your answers, these hair treatments will bring back the shine and health you're dreaming of.",
      services: [
        { name: "Signature Balayage", price: "PKR 12,000+", emoji: "🎨" },
        { name: "Hair Spa Treatment", price: "PKR 3,000", emoji: "🧖‍♀️" },
        { name: "Luxury Blow Dry", price: "PKR 2,500", emoji: "💨" },
      ],
    },
    skin: {
      title: "Glowing Skin Awaits ✨",
      message:
        "Your skin deserves some extra love. These treatments will restore radiance and hydration.",
      services: [
        { name: "Signature Facial", price: "PKR 5,000", emoji: "🌟" },
        { name: "Relaxation Spa Ritual", price: "PKR 9,000", emoji: "🧖‍♀️" },
        { name: "Body Waxing", price: "PKR 2,000+", emoji: "🌸" },
      ],
    },
    nails: {
      title: "Nail Art Awaits 💅",
      message:
        "Time for some statement nails! These treatments will leave your hands and feet camera-ready.",
      services: [
        { name: "Acrylic Nails", price: "PKR 5,500", emoji: "💎" },
        { name: "Spa Mani / Pedi", price: "PKR 4,500", emoji: "🌸" },
        { name: "Nail Art Add-on", price: "PKR 1,000+", emoji: "🎨" },
      ],
    },
    bridal: {
      title: "Bridal Glam Awaits 👰",
      message:
        "Your big day deserves the full Bitanas experience. Here's where we'd recommend starting.",
      services: [
        { name: "Bridal Royale Package", price: "PKR 85,000", emoji: "💍" },
        { name: "Pre-Bridal Facial", price: "PKR 5,000", emoji: "✨" },
        { name: "Trial Session", price: "PKR 5,000", emoji: "💄" },
      ],
    },
  };

  const base = resultsByType[type] || resultsByType.hair;
  if (budget === "express") {
    base.message = "Quick refresh picks that fit a busy schedule — big glow, minimal time investment.";
  } else if (budget === "premium") {
    base.message = "Go all out — these indulgent treatments are worth every rupee for the transformation.";
  }
  return base;
}

// ─── New: Instagram Feed ───────────────────────────────────────────────
export interface InstaPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
}

export const INSTA_POSTS: InstaPost[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?crop=entropy&cs=srgb&fm=jpg&q=80",
    caption: "Soft glam for the bride ✨ #BitanasBride",
    likes: 342,
    comments: 18,
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?crop=entropy&cs=srgb&fm=jpg&q=80",
    caption: "Fresh balayage glow-up 💫 #Balayage",
    likes: 289,
    comments: 24,
  },
  {
    id: "3",
    image:
      "https://images.pexels.com/photos/3992861/pexels-photo-3992861.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    caption: "Acrylic art that turns heads 💅",
    likes: 421,
    comments: 31,
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=srgb&fm=jpg&q=80",
    caption: "Bridal trial perfection 👰✨",
    likes: 518,
    comments: 42,
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=srgb&fm=jpg&q=80",
    caption: "Dimensional color melt 🎨",
    likes: 267,
    comments: 15,
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?crop=entropy&cs=srgb&fm=jpg&q=80",
    caption: "Spa day reset 🧖‍♀️ #SelfCare",
    likes: 198,
    comments: 12,
  },
];

// ─── New: Press & Awards ───────────────────────────────────────────────
export interface Award {
  id: string;
  title: string;
  org: string;
  year: string;
  icon: "trophy" | "star" | "heart" | "sparkle";
}

export const AWARDS: Award[] = [
  {
    id: "top-salon-2025",
    title: "Top 10 Beauty Salons in Peshawar",
    org: "Peshawar Lifestyle Magazine",
    year: "2025",
    icon: "trophy",
  },
  {
    id: "bridal-excellence",
    title: "Bridal Makeup Excellence Award",
    org: "KP Beauty Council",
    year: "2024",
    icon: "star",
  },
  {
    id: "customer-choice",
    title: "Customer Choice — Best Salon",
    org: "Hayatabad Business Awards",
    year: "2024",
    icon: "heart",
  },
  {
    id: "rising-star",
    title: "Rising Star in Beauty & Wellness",
    org: "Pakistan Glam Awards",
    year: "2023",
    icon: "sparkle",
  },
];

export const PRESS_FEATURES = [
  { name: "Dawn Images", quote: "Bitanas is redefining bridal glam in Peshawar." },
  { name: "Mango Baat", quote: "The go-to salon for Hayatabad's style-setters." },
  { name: "Peshawar Lifestyle", quote: "A sanctuary of beauty and calm in the city." },
];

// ─── New: Sustainability / Brand Values ─────────────────────────────────
export interface BrandValue {
  id: string;
  title: string;
  desc: string;
  icon: "leaf" | "heart" | "recycle" | "sparkle" | "users" | "shield";
}

export const BRAND_VALUES: BrandValue[] = [
  {
    id: "clean-beauty",
    title: "Clean, Skin-Safe Beauty",
    desc: "We use cruelty-free, dermatologist-tested products that are kind to your skin and the planet.",
    icon: "leaf",
  },
  {
    id: "single-use",
    title: "Single-Use Hygiene",
    desc: "Every tool is single-use or fully sanitised. Your safety is non-negotiable at Bitanas.",
    icon: "shield",
  },
  {
    id: "recycle",
    title: "Recycling Programme",
    desc: "We recycle product packaging and use biodegradable disposables across all services.",
    icon: "recycle",
  },
  {
    id: "empower",
    title: "Empowering Women",
    desc: "100% women-led team. We train and employ local female artists, fostering financial independence.",
    icon: "users",
  },
  {
    id: "community",
    title: "Community First",
    desc: "Free bridal makeovers for orphan brides and quarterly charity spa days — beauty with purpose.",
    icon: "heart",
  },
  {
    id: "local",
    title: "Locally Sourced",
    desc: "Where possible we partner with Pakistani beauty brands, supporting local makers and reducing footprint.",
    icon: "sparkle",
  },
];

// ─── New: Careers / Job Openings ───────────────────────────────────────
export interface JobOpening {
  id: string;
  title: string;
  type: string;
  location: string;
  experience: string;
  description: string;
}

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "senior-mua",
    title: "Senior Makeup Artist",
    type: "Full-time",
    location: "Hayatabad, Peshawar",
    experience: "3+ years",
    description:
      "Lead bridal and party makeup services. Must be skilled in HD makeup, airbrush, and South-Asian skin tones. Strong portfolio required.",
  },
  {
    id: "hair-stylist",
    title: "Hair Stylist & Colourist",
    type: "Full-time",
    location: "Hayatabad, Peshawar",
    experience: "2+ years",
    description:
      "Specialise in cuts, blow drys, balayage and hair treatments. Certification in colour therapy is a plus.",
  },
  {
    id: "nail-tech",
    title: "Nail Technician",
    type: "Part-time",
    location: "Hayatabad, Peshawar",
    experience: "1+ years",
    description:
      "Deliver acrylics, gel polish, nail art and spa mani/pedi. Creative flair and attention to detail essential.",
  },
  {
    id: "receptionist",
    title: "Front Desk Receptionist",
    type: "Full-time",
    location: "Hayatabad, Peshawar",
    experience: "1+ years",
    description:
      "Welcome clients, manage bookings, handle WhatsApp enquiries. Friendly, organised and fluent in Urdu & English.",
  },
];

export const PERKS = [
  "Above-market salary + service commissions",
  "Health insurance for full-time staff",
  "Paid training & certification courses",
  "Annual loyalty bonus",
  "Staff discount on all services & products",
  "Positive, women-led work environment",
];
