"use client";
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const FALLBACK_EVENTS = [
  { name: "Ayesha", service: "Bridal Makeup", time: "2 min ago" },
  { name: "Mahnoor", service: "Signature Facial", time: "5 min ago" },
  { name: "Sara", service: "Balayage", time: "8 min ago" },
  { name: "Hira", service: "Acrylic Nails", time: "12 min ago" },
  { name: "Fatima", service: "Party Makeup", time: "18 min ago" },
];

const SERVICES = ["Bridal Makeup", "Signature Facial", "Balayage", "Acrylic Nails", "Party Makeup", "Luxury Blow Dry", "Spa Ritual", "Engagement Glam"];

function randomName() {
  const names = ["Ayesha", "Mahnoor", "Sara", "Hira", "Fatima", "Zainab", "Sana", "Areeba", "Mehwish", "Komal", "Rabia", "Iqra", "Noor", "Zara", "Aleena"];
  return names[Math.floor(Math.random() * names.length)];
}

export function LiveFeed() {
  const [events, setEvents] = useState<{ name: string; service: string; time: string }[]>(FALLBACK_EVENTS);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = {
        name: randomName(),
        service: SERVICES[Math.floor(Math.random() * SERVICES.length)],
        time: "just now",
      };
      setEvents((prev) => {
        const updated = [newEvent, ...prev].map((e) => {
          if (e.time === "just now") return e;
          const num = parseInt(e.time) || 0;
          return { ...e, time: `${num + 1} min ago` };
        });
        return updated.slice(0, 5);
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-4 z-40 max-w-[220px]">
      <div className="rounded-xl bg-white/80 backdrop-blur-sm border border-rose-soft/10 shadow-md p-3">
        <button onClick={() => setVisible(false)} className="float-right text-[10px] text-foreground/30 hover:text-foreground/60">✕</button>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] font-semibold uppercase tracking-wider text-foreground/40">Live Bookings</span>
        </div>
        <div className="space-y-1.5">
          {events.map((ev, i) => (
            <div key={i} className="text-[11px] leading-tight">
              <p className="text-foreground/70">
                <span className="font-medium text-foreground">{ev.name}</span> booked <span className="text-foreground/80">{ev.service}</span>
              </p>
              <p className="text-[9px] text-foreground/30 flex items-center gap-1 mt-0.5">
                <Clock className="h-2.5 w-2.5" /> {ev.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
