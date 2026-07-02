"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, ChevronRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SERVICES, SALON, CALC_SERVICES, PACKAGES, OFFERS, ARTISTS,
  GIFT_CARDS, FAQS, REVIEWS, BRANDS, TRANSFORMATIONS, LOYALTY_TIERS,
  LOYALTY_HOW_IT_WORKS, BLOG_POSTS, REFERRAL_BENEFITS, REFERRAL_STEPS,
  COMPARISON_FEATURES, COMPARISON_TIERS, AWARDS, PRESS_FEATURES,
  BRAND_VALUES, JOB_OPENINGS, PERKS, STATS, WHATSAPP_DEFAULT,
} from "@/lib/salon-data";

interface Action {
  label: string;
  value: string;
}

interface Msg {
  role: "user" | "assistant" | "system";
  content: string;
  actions?: Action[];
}

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hi! I'm **Bella**, your beauty agent at Bitanas Salon.\n\nI can help you:\n- Find the perfect service\n- Estimate your total\n- Book an appointment\n- Answer any question\n\nWhat brings you in today?",
  actions: [
    { label: "Explore services", value: "What services do you offer?" },
    { label: "Price calculator", value: "help me calculate prices" },
    { label: "Book appointment", value: "I want to book" },
    { label: "Opening hours", value: "What are your hours?" },
  ],
};

type ConvStage = "greeting" | "exploring" | "booking" | "calculating" | "general";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<ConvStage>("greeting");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const bookingRef = useRef<Record<string, string>>({});

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const addMsg = useCallback((msg: Msg) => setMessages((p) => [...p, msg]), []);

  // ─── Agent: fully local, no API calls ─────────────────────────────
  const handleLocalAction = (text: string): boolean => {
    const lower = text.toLowerCase().trim();
    const kw = (k: string) => lower.includes(k);
    const has = (keys: string[]) => keys.some(kw);

    // ── Out-of-field topics ──
    const nonBeauty = ["crypto", "bitcoin", "ethereum", "stock ", "invest", "coding", "javascript", "python", "react", "api", "programming", "weather", "politics", "cricket", "football", "sport", "math", "science", "history", "geography", "computer", "software", "website", "app developer", "movie", "song", "recipe", "car ", "bike ", "travel to", "visa", "passport", "university", "school", "college", "exam"];
    const beautyWords = ["hair", "skin", "makeup", "nail", "facial", "spa", "beauty", "salon", "bridal", "glow", "cut", "color", "style", "treatment", "massage", "wax", "lash", "brow", "glam", "mua", "party", "wedding", "engagement", "mehndi", "walima", "manicure", "pedicure", "acrylic", "gel ", "balayage", "braid", "blow", "fade", "tier", "reward", "point", "offer", "discount", "gift", "voucher"];
    const isBeautyRelated = beautyWords.some(kw) || SERVICES.some(s => kw(s.name.toLowerCase()) || kw(s.category.toLowerCase()));
    if (!isBeautyRelated && nonBeauty.some(kw)) {
      addMsg({
        role: "assistant",
        content: "I'm here to help with all things beauty at Bitanas Salon! I can tell you about our services, help you book, or answer questions about hair, makeup, nails, skincare, bridal packages, and more. What can I help you with?",
        actions: WELCOME.actions,
      });
      return true;
    }

    // ── Bye / Goodbye ──
    if (has(["bye", "goodbye", "see you", "talk later", "gtg", "got to go"])) {
      addMsg({
        role: "assistant",
        content: "It was lovely chatting with you! Come visit us at Hayatabad anytime — we'd love to see you glow. Take care!",
        actions: [{ label: "Back to menu", value: "Hi" }],
      });
      return true;
    }

    // ── Greeting / Menu ──
    if (has(["hi", "hello", "hey", "start over", "menu", "help", "what can you do"]) && !has(["price", "cost", "book"])) {
      addMsg({ role: "assistant", content: WELCOME.content, actions: WELCOME.actions });
      return true;
    }

    // ── Bella identity ──
    if (has(["who are you", "what are you", "tell me about yourself", "your name"])) {
      addMsg({
        role: "assistant",
        content: "I'm **Bella**, your personal beauty agent at Bitanas Salon! I know everything about our services, artists, packages, and more. Ask me anything — what are you looking for today?",
        actions: WELCOME.actions,
      });
      return true;
    }

    // ── About Bitanas ──
    if (has(["what is bitanas", "tell me about the salon", "about bitanas", "about the salon", "what kind of salon", "more about the salon", "tell me more"])) {
      addMsg({
        role: "assistant",
        content: `**${SALON.name}** — ${SALON.tagline}\n\n${STATS[0].value}${STATS[0].suffix} ${STATS[0].label} · ${STATS[1].value}${STATS[1].suffix} ${STATS[1].label} · ${STATS[3].value}${STATS[3].suffix} ${STATS[3].label}\n\nLocated in ${SALON.address}, we offer premium hair, makeup, nails, skincare and bridal services. Our flagship salon has won multiple awards and is loved by ${STATS[3].value}+ happy clients.`,
        actions: [
          { label: "See services", value: "What services do you offer?" },
          { label: "Visit us", value: "Where are you located?" },
          { label: "Our artists", value: "Who are your artists?" },
        ],
      });
      return true;
    }

    // ── Contact / Phone / WhatsApp ──
    if (has(["phone", "call", "whatsapp", "contact", "reach", "number", "0370"])) {
      if (lower === "call") { window.open(SALON.phoneHref); return true; }
      addMsg({
        role: "assistant",
        content: `**Contact Us**\n\nPhone: **${SALON.phone}**\nLocation: ${SALON.address}\n\nYou can call us during business hours or WhatsApp us anytime!\n\nWhatsApp: [Chat with us on WhatsApp](${WHATSAPP_DEFAULT})`,
        actions: [
          { label: "Call now", value: "call" },
          { label: "Get directions", value: "Where are you located?" },
          { label: "Book appointment", value: "I want to book" },
        ],
      });
      return true;
    }
    if (lower === "call") { window.open(SALON.phoneHref); return true; }

    // ── Opening hours ──
    if (has(["hour", "open", "close", "when are you", "what time", "timing"])) {
      addMsg({
        role: "assistant",
        content: `**Hours**\n\n${SALON.hours.map((h) => `- **${h.day}**: ${h.closed ? "Closed" : h.time}`).join("\n")}\n\nWe're at ${SALON.addressShort}. Walk-ins welcome!`,
        actions: [
          { label: "Get directions", value: "Where are you located?" },
          { label: "Book now", value: "I want to book" },
        ],
      });
      return true;
    }

    // ── Location / address ──
    if (has(["where", "address", "location", "map", "located", "direction"])) {
      addMsg({
        role: "assistant",
        content: `**Visit Us**\n\n${SALON.address}\n\n[View on Google Maps](${SALON.mapUrl})`,
        actions: [
          { label: "Call salon", value: "call" },
          { label: "Book appointment", value: "I want to book" },
        ],
      });
      return true;
    }

    // ── Services listing ──
    if (has(["what services", "what do you offer", "view all", "list services", "show services", "all services"])) {
      const cats = [...new Set(SERVICES.map((s) => s.category))];
      addMsg({
        role: "assistant",
        content: `${cats.map((cat) =>
          `**${cat}**\n${SERVICES.filter((s) => s.category === cat).map((s) => `- ${s.name} — ${s.price}`).join("\n")}`
        ).join("\n\n")}\n\nWant pricing for specific services? Just ask!`,
        actions: [
          { label: "Calculate prices", value: "help me calculate prices" },
          { label: "Book a visit", value: "I want to book" },
        ],
      });
      return true;
    }

    // ── Recommendations ──
    if (has(["recommend", "suggest", "what's good", "what is good", "what should i", "which service", "suitable for me", "i have dry", "i have oily", "i have damaged", "i have sensitive", "for my skin", "for my hair", "best for"])) {
      const concerns: Record<string, string[]> = {
        dry: ["Signature Facial", "Relaxation Spa Ritual", "Spa Mani / Pedi"],
        oily: ["Signature Facial", "Body Waxing"],
        damaged: ["Signature Balayage", "Hair Spa Treatment", "Luxury Blow Dry"],
        sensitive: ["Signature Facial", "Spa Mani / Pedi"],
        dull: ["Signature Facial", "Relaxation Spa Ritual", "Luxury Blow Dry"],
        event: ["Party Makeup", "Engagement Glam", "Braids & Updos", "Bridal Makeup"],
        wedding: ["Bridal Royale Package", "Bridal Makeup", "Signature Balayage", "Acrylic Nails"],
        party: ["Party Makeup", "Braids & Updos", "Acrylic Nails", "Luxury Blow Dry"],
        summer: ["Body Waxing", "Signature Facial", "Spa Mani / Pedi"],
        winter: ["Relaxation Spa Ritual", "Signature Facial", "Hair Spa Treatment"],
      };
      let matchedConcern: string | null = null;
      for (const [key, _] of Object.entries(concerns)) {
        if (kw(key)) { matchedConcern = key; break; }
      }
      if (matchedConcern && concerns[matchedConcern]) {
        const names = concerns[matchedConcern];
        const recs = SERVICES.filter(s => names.includes(s.name));
        addMsg({
          role: "assistant",
          content: `Based on what you've shared, here's what I'd recommend:\n\n${recs.map(s => `- **${s.name}** — ${s.price}`).join("\n")}\n\nWould you like to book any of these?`,
          actions: [
            { label: "Book a recommendation", value: `I want to book ${recs[0]?.name || "a service"}` },
            { label: "See all services", value: "What services do you offer?" },
          ],
        });
      } else {
        addMsg({
          role: "assistant",
          content: "I'd love to help you find the perfect service! Tell me a bit about what you're looking for:\n\n- What type of service (hair, makeup, nails, skincare)?\n- Any specific concerns (dryness, damage, an event coming up)?\n- Your budget range?",
          actions: [
            { label: "I need hair help", value: "What hair services do you have?" },
            { label: "I need makeup", value: "What makeup services do you have?" },
            { label: "Facials & spa", value: "Do you do facials?" },
          ],
        });
      }
      return true;
    }

    // ── Comparison ──
    if (has(["compare", "difference", "vs", "versus", "which is better", "what's the difference"])) {
      addMsg({
        role: "assistant",
        content: `**Service Tiers**\n\n${COMPARISON_TIERS.map(t =>
          `**${t.name}** — ${t.tagline} — ${t.price}${t.popular ? " ★" : ""}`
        ).join("\n")}\n\nKey differences:\n${COMPARISON_FEATURES.slice(0, 5).map(f =>
          `- ${f.feature}: ${f.express} → ${f.signature} → ${f.premium}`
        ).join("\n")}\n\nWant me to help you choose?`,
        actions: [
          { label: "I need recommendations", value: "Can you recommend something?" },
          { label: "See all services", value: "What services do you offer?" },
        ],
      });
      return true;
    }

    // ── Tell me about X ──
    if (has(["tell me about", "what is", "details about", "info on", "information about", "more about"])) {
      const query = lower.replace(/tell me about|what is|details about|info on|information about|more about/g, "").trim();
      const findService = (q: string) => SERVICES.find(s => q.includes(s.name.toLowerCase()) || s.name.toLowerCase().includes(q) || s.id.includes(q));
      const findPkg = (q: string) => PACKAGES.find(p => q.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(q));

      const service = findService(query);
      if (service) {
        addMsg({
          role: "assistant",
          content: `**${service.name}**\n${service.description}\n\nPrice: **${service.price}** — Duration: ${service.duration}\nCategory: ${service.category}${service.popular ? "\n★ Popular choice" : ""}`,
          actions: [
            { label: `Book ${service.name}`, value: `I want to book ${service.name}` },
            { label: "See all services", value: "What services do you offer?" },
          ],
        });
        return true;
      }
      const pkg = findPkg(query);
      if (pkg) {
        addMsg({
          role: "assistant",
          content: `**${pkg.name}** — ${pkg.price}\n${pkg.tagline}\n\nIncludes:\n${pkg.includes.map(i => `- ${i}`).join("\n")}${pkg.popular ? "\n\n★ Most popular bridal choice" : ""}`,
          actions: [
            { label: "Book this package", value: `I want to book ${pkg.name}` },
            { label: "Compare packages", value: "What bridal packages do you have?" },
          ],
        });
        return true;
      }
      const artist = ARTISTS.find(a => query.includes(a.name.toLowerCase()) || a.role.toLowerCase().includes(query));
      if (artist) {
        addMsg({
          role: "assistant",
          content: `**${artist.name}** — ${artist.role}\n${artist.experience}\nSignature: ${artist.signature}`,
          actions: [{ label: "Book with this artist", value: "I want to book" }],
        });
        return true;
      }
    }

    // ── Category-specific ──
    if (has(["facial", "spa", "skin", "glow", "skincare", "face", "facial treatment"])) {
      const skinServices = SERVICES.filter(s => s.category === "Skin & Spa" || s.name.toLowerCase().includes("facial") || s.name.toLowerCase().includes("spa"));
      addMsg({
        role: "assistant",
        content: `**Skin & Spa Services**\n\n${skinServices.map(s => `- **${s.name}**: ${s.price} (${s.duration})`).join("\n")}\n\nWe also have spa packages available!`,
        actions: [
          { label: "Book a facial", value: "I want to book a facial" },
          { label: "See all services", value: "What services do you offer?" },
        ],
      });
      return true;
    }

    if (has(["hair", "balayage", "blow", "haircut", "hair cut", "hair color", "hair colour", "braid", "hairstyle"])) {
      const hairServices = SERVICES.filter(s => s.category === "Hair");
      addMsg({
        role: "assistant",
        content: `**Hair Services**\n\n${hairServices.map(s => `- **${s.name}**: ${s.price} (${s.duration})`).join("\n")}\n\nOur stylists specialise in balayage, precision cuts, braids and more!`,
        actions: [
          { label: "Book a hair service", value: "I want to book a hair service" },
          { label: "See all services", value: "What services do you offer?" },
        ],
      });
      return true;
    }

    if (has(["makeup", "make up", "make-up", "glam", "mua", "party makeup", "evening makeup", "occasion"])) {
      const makeupServices = SERVICES.filter(s => s.category === "Makeup");
      addMsg({
        role: "assistant",
        content: `**Makeup Services**\n\n${makeupServices.map(s => `- **${s.name}**: ${s.price} (${s.duration})${s.popular ? " ★" : ""}`).join("\n")}\n\nAll done with premium HD products.`,
        actions: [
          { label: "Book makeup", value: "I want to book a makeup service" },
          { label: "Bridal packages", value: "What bridal packages do you have?" },
        ],
      });
      return true;
    }

    if (has(["nail", "manicure", "pedicure", "acrylic", "gel nail", "nail art"])) {
      const nailServices = SERVICES.filter(s => s.category === "Nails");
      addMsg({
        role: "assistant",
        content: `**Nail Services**\n\n${nailServices.map(s => `- **${s.name}**: ${s.price} (${s.duration})`).join("\n")}\n\nFrom classic gels to custom art — your hands deserve it!`,
        actions: [
          { label: "Book nails", value: "I want to book nails" },
          { label: "See all services", value: "What services do you offer?" },
        ],
      });
      return true;
    }

    // ── Price calculator ──
    if (has(["calculate", "estimate", "how much", "total", "pricing", "price list"]) || stage === "calculating") {
      setStage("calculating");
      const selected = CALC_SERVICES.filter(s => lower.includes(s.name.toLowerCase()) || lower.includes(s.category.toLowerCase()));
      if (selected.length > 0) {
        const total = selected.reduce((a, s) => a + s.basePrice, 0);
        const totalMin = selected.reduce((a, s) => a + s.duration, 0);
        addMsg({
          role: "assistant",
          content: `Here's your estimate:\n\n${selected.map(s => `- **${s.name}** — PKR ${s.basePrice.toLocaleString()}`).join("\n")}\n\n**Total: PKR ${total.toLocaleString()}** — Time: ~${totalMin} min\n\nWant to book these?`,
          actions: [
            { label: "Book these", value: "I want to book these services" },
            { label: "Try different", value: "help me calculate prices" },
            { label: "Back to menu", value: "What can you do?" },
          ],
        });
      } else {
        addMsg({
          role: "assistant",
          content: "Tell me which services you're interested in.\n\nTry: \"I want balayage and a facial\"\n\nOr select from our menu:",
          actions: CALC_SERVICES.slice(0, 6).map(s => ({
            label: s.name,
            value: `How much is ${s.name}?`,
          })),
        });
      }
      setStage("general");
      return true;
    }

    // ── Artists / Stylists ──
    if (has(["artist", "stylist", "who does", "team", "staff", "makeup artist", "hair stylist"])) {
      addMsg({
        role: "assistant",
        content: `**Our Artists**\n\n${ARTISTS.map(a => `- **${a.name}**: ${a.role}\n  ${a.experience} — ${a.signature}`).join("\n\n")}`,
        actions: [
          { label: "Book with an artist", value: "I want to book" },
          { label: "See services", value: "What services do you offer?" },
        ],
      });
      return true;
    }

    // ── Brands ──
    if (has(["brand", "product", "mac", "huda", "nars", "products you use", "what products", "what brand"])) {
      addMsg({
        role: "assistant",
        content: `We use premium brands:\n\n${BRANDS.map(b => `- ${b}`).join("\n")}\n\nEvery product is authentic and suited for South-Asian skin tones.`,
        actions: [
          { label: "Book a service", value: "I want to book" },
          { label: "Ask about skincare", value: "Do you do facials?" },
        ],
      });
      return true;
    }

    // ── Offers / Deals / Discounts ──
    if (has(["offer", "deal", "discount", "sale", "promo", "code", "coupon"])) {
      addMsg({
        role: "assistant",
        content: `**Current Offers**\n\n${OFFERS.map(o => `- **${o.title}**: ${o.discount}\n  ${o.description}\n  Use code: **${o.code}**`).join("\n\n")}`,
        actions: [
          { label: "Book with offer", value: "I want to book" },
          { label: "Check packages", value: "What packages do you have?" },
        ],
      });
      return true;
    }

    // ── Gift cards ──
    if (has(["gift", "voucher", "gift card", "gift certificate"])) {
      addMsg({
        role: "assistant",
        content: `**Gift Cards**\n\n${GIFT_CARDS.map(g => `- **${g.label}** — PKR ${g.amount.toLocaleString()}\n  ${g.perks}${g.popular ? " ★ Popular" : ""}`).join("\n\n")}\n\nPerfect for birthdays, weddings or just because!`,
        actions: [
          { label: "Purchase a gift card", value: "I want to buy a gift card" },
          { label: "See services", value: "What services do you offer?" },
        ],
      });
      return true;
    }

    // ── Bridal / Packages ──
    if (has(["bridal", "package", "bridal package", "engagement", "walima", "mehndi", "shaadi", "wedding", "dulhan", "bride"])) {
      addMsg({
        role: "assistant",
        content: `**Bridal Packages**\n\n${PACKAGES.map(p => `- **${p.name}**: ${p.price}${p.popular ? " ★" : ""}`).join("\n")}\n\nEach includes premium products, trial session & post-booking support.`,
        actions: [
          { label: "Bridal Essentials", value: "Tell me about Bridal Essentials" },
          { label: "Bridal Royale", value: "Tell me about Bridal Royale" },
          { label: "Book a trial", value: "I want to book a trial" },
        ],
      });
      return true;
    }

    // ── Loyalty / Rewards / Points / Tiers ──
    if (has(["loyalty", "reward", "point", "tier", "member", "membership", "loyalty program", "how loyalty", "earn point"])) {
      addMsg({
        role: "assistant",
        content: `**Bitanas Loyalty Program**\n\n${LOYALTY_HOW_IT_WORKS.map(s => `**${s.title}**\n${s.desc}`).join("\n\n")}\n\n**Tiers:**\n\n${LOYALTY_TIERS.map(t =>
          `*${t.name}* (${t.threshold})\n${t.perks.slice(0, 3).map(p => `  - ${p}`).join("\n")}`
        ).join("\n\n")}\n\nStart earning points from your very first visit!`,
        actions: [
          { label: "Book & earn points", value: "I want to book" },
          { label: "See offers", value: "What offers do you have?" },
        ],
      });
      return true;
    }

    // ── Referral ──
    if (has(["refer", "referral", "refer a friend", "invite friend", "share", "tell a friend"])) {
      addMsg({
        role: "assistant",
        content: `**Refer a Friend**\n\n${REFERRAL_BENEFITS.map(r => `- **${r.title}**: ${r.desc}`).join("\n\n")}\n\nHow it works:\n${REFERRAL_STEPS.map(s => `**${s.step}.** ${s.title} — ${s.desc}`).join("\n")}\n\nAsk our team for your unique referral code on your next visit!`,
        actions: [
          { label: "Book a visit", value: "I want to book" },
          { label: "Check loyalty", value: "Tell me about loyalty rewards" },
        ],
      });
      return true;
    }

    // ── FAQs ──
    if (has(["faq", "question", "walk in", "walk-in", "payment", "cancel", "appointment policy", "what to bring", "how long", "parking"])) {
      addMsg({
        role: "assistant",
        content: FAQS.map(f => `**${f.q}**\n${f.a}`).join("\n\n"),
        actions: [
          { label: "Book now", value: "I want to book" },
          { label: "Contact us", value: "What's your phone number?" },
        ],
      });
      return true;
    }

    // ── Reviews / Ratings / Testimonials ──
    if (has(["review", "testimonial", "what people", "rating", "what others", "say", "clients say", "feedback", "reputation"])) {
      const top = REVIEWS.slice(0, 3);
      addMsg({
        role: "assistant",
        content: `**What our clients say**\n\n${top.map(r => `"${r.comment}"\n— **${r.name}** (${r.service})`).join("\n\n")}\n\n${SALON.rating} stars from ${SALON.reviewCount}+ reviews.`,
        actions: [
          { label: "Book your visit", value: "I want to book" },
          { label: "See services", value: "What services do you offer?" },
        ],
      });
      return true;
    }

    // ── Awards / Press / Recognition ──
    if (has(["award", "press", "recognition", "featured", "magazine", "achievement", "accolade"])) {
      addMsg({
        role: "assistant",
        content: `**Awards & Recognition**\n\n${AWARDS.map(a => `- **${a.title}** — ${a.org} (${a.year})`).join("\n")}\n\n**Press**\n\n${PRESS_FEATURES.map(p => `"${p.quote}" — *${p.name}*`).join("\n")}`,
        actions: [
          { label: "Book an appointment", value: "I want to book" },
          { label: "See services", value: "What services do you offer?" },
        ],
      });
      return true;
    }

    // ── Careers / Jobs ──
    if (has(["career", "job", "hiring", "work with us", "vacancy", "position", "join our team", "employment", "opening"])) {
      addMsg({
        role: "assistant",
        content: `**We're Hiring!**\n\n${JOB_OPENINGS.map(j => `- **${j.title}** (${j.type})\n  ${j.location} — ${j.experience}\n  ${j.description}`).join("\n\n")}\n\n**Perks:**\n${PERKS.map(p => `- ${p}`).join("\n")}\n\nInterested? Call us at ${SALON.phone} or WhatsApp us your CV!`,
        actions: [
          { label: "Contact us", value: "What's your phone number?" },
          { label: "About the salon", value: "Tell me about Bitanas" },
        ],
      });
      return true;
    }

    // ── Values / Sustainability ──
    if (has(["value", "sustainability", "eco", "ethical", "cruelty", "vegan", "recycle", "green", "environment", "clean beauty", "community"])) {
      addMsg({
        role: "assistant",
        content: `**Our Values**\n\n${BRAND_VALUES.map(v => `- **${v.title}**: ${v.desc}`).join("\n\n")}`,
        actions: [
          { label: "Book a service", value: "I want to book" },
          { label: "See awards", value: "What awards have you won?" },
        ],
      });
      return true;
    }

    // ── Gallery / Portfolio / Transformations ──
    if (has(["gallery", "portfolio", "transformation", "before after", "before and after", "work", "example", "photo", "picture", "instagram", "insta"])) {
      addMsg({
        role: "assistant",
        content: `**Transformations**\n\n${TRANSFORMATIONS.map(t => `- **${t.title}**: ${t.service}\n  ${t.description}`).join("\n\n")}\n\nYou can view our full gallery on the website or follow us on Instagram for daily inspiration!`,
        actions: [
          { label: "See services", value: "What services do you offer?" },
          { label: "Book a transformation", value: "I want to book" },
        ],
      });
      return true;
    }

    // ── Beauty Tips / Blog / Advice ──
    if (has(["tip", "advice", "blog", "how to", "tutorial", "care", "maintenance", "recommendation for", "should i", "guide", "suggestion"])) {
      const tips = BLOG_POSTS.slice(0, 3);
      addMsg({
        role: "assistant",
        content: `**Beauty Tips**\n\n${tips.map(b => `**${b.title}**\n${b.excerpt}\n  Tips: ${b.tips.slice(0, 2).join(" · ")}`).join("\n\n")}\n\nWant more personalised advice? Just ask!`,
        actions: [
          { label: "Get personalised advice", value: "Can you recommend something?" },
          { label: "Book a service", value: "I want to book" },
        ],
      });
      return true;
    }

    // ── Stats / About the salon ──
    if (has(["stat", "about", "info", "detail", "more about salon", "how many", "years"])) {
      addMsg({
        role: "assistant",
        content: `**About Bitanas**\n\n${STATS.map(s => `- **${s.value}${s.suffix}** ${s.label}`).join("\n")}\n\n${SALON.rating} stars · ${SALON.reviewCount} reviews\n\nLocated at ${SALON.address}`,
        actions: [
          { label: "See services", value: "What services do you offer?" },
          { label: "Visit us", value: "Where are you located?" },
        ],
      });
      return true;
    }

    // ── Booking flow ──
    if (has(["book", "appointment", "schedule", "reserve", "booking", "fix"]) || stage === "booking") {
      setStage("booking");
      const bd = bookingRef.current;

      if (!bd.name) {
        const match = lower.match(/my name is (\w+)/i) || lower.match(/i am (\w+)/i) || lower.match(/i'm (\w+)/i) || lower.match(/name is (\w+)/i);
        if (match) { bd.name = match[1].charAt(0).toUpperCase() + match[1].slice(1); bookingRef.current = bd; }
      }
      if (!bd.service) {
        const found = SERVICES.find(s => lower.includes(s.name.toLowerCase()) || lower.includes(s.category.toLowerCase()));
        if (found) { bd.service = found.name; bookingRef.current = bd; }
      }
      if (!bd.phone) {
        const match = lower.match(/03\d{8,9}/) || lower.match(/923\d{9}/) || lower.match(/\+923\d{9}/);
        if (match) { bd.phone = match[0]; bookingRef.current = bd; }
      }
      if (!bd.date) {
        const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
        const dateStr = tomorrow.toISOString().split("T")[0];
        if (lower.includes("tomorrow")) { bd.date = dateStr; bookingRef.current = bd; }
        else if (lower.includes("today")) { bd.date = new Date().toISOString().split("T")[0]; bookingRef.current = bd; }
        else {
          // "December 25" or "25 December" or "25th December" or "25 dec"
          const dateMatch = lower.match(/(\d{1,2})(?:st|nd|rd|th)?\s+(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)/i)
            || lower.match(/(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(\d{1,2})(?:st|nd|rd|th)?/i);
          if (dateMatch) {
            const months: Record<string, number> = { jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11 };
            const monStr = (dateMatch[1] || dateMatch[2] || "").slice(0,3).toLowerCase();
            const dayStr = dateMatch[2] || dateMatch[1] || "";
            const mon = months[monStr];
            if (mon !== undefined) {
              const d = new Date(new Date().getFullYear(), mon, parseInt(dayStr));
              bd.date = d.toISOString().split("T")[0];
              bookingRef.current = bd;
            }
          } else {
            // "next Monday", "this Friday"
            const dayNames: Record<string, number> = { sunday:0, monday:1, tuesday:2, wednesday:3, thursday:4, friday:5, saturday:6 };
            const dayMatch = lower.match(/(next|this|coming)\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i);
            if (dayMatch) {
              const targetDay = dayNames[dayMatch[2].toLowerCase()];
              const today = new Date();
              const currentDay = today.getDay();
              let diff = targetDay - currentDay;
              if (dayMatch[1].toLowerCase() === "next") diff += 7;
              else if (diff <= 0) diff += 7;
              const d = new Date(today);
              d.setDate(today.getDate() + diff);
              bd.date = d.toISOString().split("T")[0];
              bookingRef.current = bd;
            }
          }
        }
      }

      if (!bd.name) {
        addMsg({ role: "assistant", content: "I'd be happy to help you book! First, what's your name?" });
        return true;
      }
      if (!bd.phone) {
        addMsg({ role: "assistant", content: `Great, ${bd.name}! What's a good phone number so we can confirm your appointment?` });
        return true;
      }
      if (!bd.service) {
        addMsg({
          role: "assistant",
          content: `Thanks ${bd.name}! Which service are you looking for?`,
          actions: SERVICES.slice(0, 6).map(s => ({ label: s.name, value: `I'd like to book ${s.name}` })),
        });
        return true;
      }
      if (!bd.date) {
        addMsg({
          role: "assistant",
          content: `Perfect! What date works for you?\n\nTry: "Tomorrow", "This Friday", "Next Monday", or "December 25"`,
        });
        return true;
      }

      addMsg({
        role: "assistant",
        content: `**Booking Summary**\nName: ${bd.name}\nPhone: ${bd.phone}\nService: ${bd.service}\nDate: ${bd.date}\n\nAll set! Shall I send this to our team? They'll confirm via WhatsApp within a few hours.`,
        actions: [
          { label: "Yes, confirm!", value: "confirm booking" },
          { label: "Start over", value: "I want to book" },
        ],
      });
      return true;
    }

    // ── Confirm booking ──
    if (lower === "confirm booking" || lower === "yes confirm" || lower === "confirm" || lower === "send booking") {
      const bd = bookingRef.current;
      window.dispatchEvent(new CustomEvent("bitanas:booking-success", { detail: "CHAT" }));
      window.dispatchEvent(new CustomEvent("bitanas:appointment-booked", {
        detail: { date: bd.date || "", time: "11:00 AM", service: bd.service || "" },
      }));
      try {
        const v = JSON.parse(localStorage.getItem("bitanas:visits") || "[]");
        v.push(new Date().toISOString());
        localStorage.setItem("bitanas:visits", JSON.stringify(v));
      } catch {}
      addMsg({
        role: "assistant",
        content: "**Booking sent!** Our team will WhatsApp you within a few hours to confirm your slot. See you soon!",
        actions: [
          { label: "Track my streak", value: "What's my glow streak?" },
          { label: "Explore more", value: "What can you do?" },
        ],
      });
      bookingRef.current = {};
      return true;
    }

    // ── Glow streak ──
    if (has(["streak", "glow streak", "my visits", "visit history", "how many visits", "loyalty points"])) {
      const visits = JSON.parse(localStorage.getItem("bitanas:visits") || "[]");
      const thisMonth = visits.filter((v: string) => {
        const d = new Date(v);
        return d.getMonth() === new Date().getMonth() && d.getFullYear() === new Date().getFullYear();
      }).length;
      addMsg({
        role: "assistant",
        content: `**Your Glow Streak**\n\nTotal visits: **${visits.length}**\nThis month: **${thisMonth}**\n\n${thisMonth >= 3 ? "You're on fire! Keep that glow going!" : thisMonth >= 1 ? "Great start — book again this month to build your streak!" : "No visits yet this month — time to book your next glow-up!"}`,
        actions: [
          { label: "Book now", value: "I want to book" },
          { label: "See services", value: "What services do you offer?" },
        ],
      });
      return true;
    }

    // ── Thanks / Polite ──
    if (has(["thanks", "thank you", "thankyou", "thx", "okay", "ok", "got it", "alright", "sure", "perfect", "great", "awesome", "cool", "nice", "wonderful"])) {
      addMsg({
        role: "assistant",
        content: "You're most welcome! Is there anything else I can help you with?",
        actions: [
          { label: "Book appointment", value: "I want to book" },
          { label: "See services", value: "What services do you offer?" },
          { label: "Opening hours", value: "What are your hours?" },
        ],
      });
      return true;
    }

    // ── Negative / No ──
    if (has(["no thanks", "no that's it", "that's all", "nothing else", "i'm good", "i am good", "no i'm done", "no i am done"])) {
      addMsg({
        role: "assistant",
        content: "No problem at all! Feel free to come back whenever you need beauty advice or want to book. Have a beautiful day!",
        actions: [{ label: "Back to menu", value: "Hi" }],
      });
      return true;
    }

    // ── Catch-all: intelligent search across ALL data ──
    const searchResults: string[] = [];
    const searchTerms = lower.replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(w => w.length > 2);

    // Search services
    for (const s of SERVICES) {
      const matchName = searchTerms.some(t => s.name.toLowerCase().includes(t));
      const matchCat = searchTerms.some(t => s.category.toLowerCase().includes(t));
      const matchDesc = searchTerms.some(t => s.description.toLowerCase().includes(t));
      if (matchName || matchCat || matchDesc) {
        searchResults.push(`- **${s.name}** — ${s.price} (${s.category})`);
      }
    }

    // Search packages
    for (const p of PACKAGES) {
      if (searchTerms.some(t => p.name.toLowerCase().includes(t) || p.tagline.toLowerCase().includes(t))) {
        searchResults.push(`- **${p.name}** (Package) — ${p.price}`);
      }
    }

    // Search artists
    for (const a of ARTISTS) {
      if (searchTerms.some(t => a.name.toLowerCase().includes(t) || a.role.toLowerCase().includes(t) || a.signature.toLowerCase().includes(t))) {
        searchResults.push(`- **${a.name}** — ${a.role} (Artist)`);
      }
    }

    // Search offers
    for (const o of OFFERS) {
      if (searchTerms.some(t => o.title.toLowerCase().includes(t) || o.description.toLowerCase().includes(t))) {
        searchResults.push(`- **${o.title}** — ${o.discount} (Offer, code: ${o.code})`);
      }
    }

    // Search blog tips
    for (const b of BLOG_POSTS) {
      if (searchTerms.some(t => b.title.toLowerCase().includes(t) || b.excerpt.toLowerCase().includes(t) || b.category.toLowerCase().includes(t))) {
        searchResults.push(`- **${b.title}** (Beauty Tip — ${b.category})`);
      }
    }

    // Search brands
    for (const b of BRANDS) {
      if (searchTerms.some(t => b.toLowerCase().includes(t))) {
        searchResults.push(`- ${b} (Brand we use)`);
      }
    }

    // Search FAQs
    for (const f of FAQS) {
      if (searchTerms.some(t => f.q.toLowerCase().includes(t))) {
        searchResults.push(`- ${f.q}`);
      }
    }

    // Search gift cards
    for (const g of GIFT_CARDS) {
      if (searchTerms.some(t => g.label.toLowerCase().includes(t) || g.perks.toLowerCase().includes(t))) {
        searchResults.push(`- **${g.label}** — PKR ${g.amount.toLocaleString()} (Gift Card)`);
      }
    }

    if (searchResults.length > 0) {
      addMsg({
        role: "assistant",
        content: `Here's what I found about that:\n\n${searchResults.slice(0, 6).join("\n")}${searchResults.length > 6 ? `\n\n...and ${searchResults.length - 6} more results.` : ""}\n\nWant to know more about any of these?`,
        actions: [
          { label: "Calculate prices", value: "help me calculate prices" },
          { label: "Book now", value: "I want to book" },
        ],
      });
      return true;
    }

    // ── Final fallback ──
    addMsg({
      role: "assistant",
      content: "I'm not sure I understood that, but I'm here to help with all things beauty at Bitanas Salon! Try asking me about services, prices, bookings, bridal packages, or just say \"Hi\" to see what I can do.",
      actions: WELCOME.actions,
    });
    return true;
  };

  const send = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    addMsg({ role: "user", content: trimmed });
    setInput("");
    handleLocalAction(trimmed);
  }, [loading, addMsg]);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 group",
          open
            ? "bg-rose-deep text-white rotate-90"
            : "bg-rose-deep text-white hover:scale-110"
        )}
        aria-label="Open Bella"
      >
        {open ? <X className="h-6 w-6 relative" /> : <MessageCircle className="h-6 w-6 relative" />}
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-3 sm:right-5 z-50 w-[calc(100vw-1.5rem)] sm:w-96 origin-bottom-right transition-all duration-300",
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        )}
      >
        <div className="rounded-2xl bg-white shadow-lg border border-rose-soft/10 overflow-hidden flex flex-col max-h-[75vh]">
          <div className="bg-rose-deep p-4 text-white">
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <MessageCircle className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-white" />
              </span>
              <div className="flex-1">
                <p className="font-serif text-lg font-bold leading-none">Bella</p>
                <p className="text-xs text-white/60 mt-0.5">Your beauty agent</p>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3.5 space-y-2.5 bg-white min-h-[280px] max-h-[400px]">
            {messages.map((m, i) => (
              <div key={i}>
                <div className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-white text-foreground border border-rose-soft/20 rounded-bl-sm"
                  )}>
                    <span className="whitespace-pre-wrap [&_strong]:font-semibold [&_strong]:text-rose-deep">
                      {m.content.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                        part.startsWith("**") && part.endsWith("**")
                          ? <strong key={j}>{part.slice(2, -2)}</strong>
                          : part
                      )}
                    </span>
                  </div>
                </div>
                {m.actions && (
                  <div className="mt-1.5 ml-1 flex flex-wrap gap-1.5">
                    {m.actions.map((a) => (
                      <button
                        key={a.value}
                        onClick={() => send(a.value)}
                        className="inline-flex items-center gap-1 rounded-full bg-white border border-rose-soft/30 px-3 py-1.5 text-xs font-medium text-foreground/70 hover:border-foreground/30 hover:bg-rose-soft/10 transition-all"
                      >
                        {a.label}
                        <ChevronRight className="h-3 w-3 text-foreground/30" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-rose-soft/20 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-rose-soft/10 bg-white">
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Bella anything..."
                className="flex-1 h-11 rounded-full bg-rose-soft/20 border border-transparent focus:border-foreground/20 focus:bg-white px-4 text-sm outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-center gap-3 text-[10px] text-foreground/30">
              <span>AI assistant</span>
              <span>·</span>
              <a href={`tel:${SALON.phone}`} className="hover:text-foreground/60 transition-colors flex items-center gap-1">
                <Phone className="h-2.5 w-2.5" /> Call salon
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
