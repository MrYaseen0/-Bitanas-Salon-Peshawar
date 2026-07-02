import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n";
import { SALON } from "@/lib/salon-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bitanas.pk"),
  title: "Bitanas Salon, Peshawar | Luxury Beauty, Makeup & Spa",
  description:
    "Bitanas Salon in Hayatabad, Peshawar — a luxury beauty destination offering acrylic nails, balayage, blow dry, body waxing, braids, facials, spa mani/pedi & bridal makeup. Rated 4.9★ by 125+ happy clients.",
  keywords: [
    "Bitanas salon",
    "beauty salon Peshawar",
    "Hayatabad salon",
    "makeup Peshawar",
    "balayage Peshawar",
    "acrylic nails",
    "bridal makeup",
    "spa Peshawar",
    "luxury salon Pakistan",
  ],
  authors: [{ name: "Bitanas Salon" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Bitanas Salon, Peshawar | Luxury Beauty & Makeup",
    description:
      "A luxury beauty destination in Hayatabad, Peshawar. Acrylic nails, balayage, facials, spa, bridal makeup & more. Rated 4.9★.",
    siteName: "Bitanas Salon",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Bitanas Salon — Luxury Beauty in Peshawar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitanas Salon, Peshawar",
    description: "Luxury beauty, makeup & spa in Hayatabad, Peshawar. 4.9★ rated.",
  },
};

// JSON-LD structured data for SEO / Google rich results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: SALON.name,
  description:
    "Luxury beauty salon in Hayatabad, Peshawar offering bridal makeup, balayage, acrylic nails, facials and spa services.",
  image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6",
  telephone: SALON.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Flat 6, Zangal Market, F-8 Phase 6, Hayatabad",
    addressLocality: "Peshawar",
    addressRegion: "Khyber Pakhtunkhwa",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.993,
    longitude: 71.415,
  },
  url: "https://bitanas.pk",
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: SALON.rating,
    reviewCount: SALON.reviewCount,
    bestRating: 5,
    worstRating: 1,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Saturday",
      ],
      opens: "10:30",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "14:00",
      closes: "20:00",
    },
  ],
  makesOffer: [
    "Bridal Makeup",
    "Balayage",
    "Acrylic Nails",
    "Spa Mani/Pedi",
    "Signature Facial",
    "Body Waxing",
    "Blow Dry",
    "Braids & Updos",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${dancing.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
