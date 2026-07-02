"use client";
import { useEffect, useState } from "react";
import { useCountdown } from "@/hooks/use-countdown";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Clock, X } from "lucide-react";

interface Appointment {
  date: string;
  time: string;
  service: string;
}

export function AppointmentCountdown() {
  const [appt, setAppt] = useLocalStorage<Appointment | null>("bitanas:appointment", null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Appointment>).detail;
      setAppt(detail);
      setDismissed(false);
    };
    window.addEventListener("bitanas:appointment-booked", handler);
    return () => window.removeEventListener("bitanas:appointment-booked", handler);
  }, [setAppt]);

  if (!appt || dismissed) return null;

  const [timePart, period] = appt.time.split(" ");
  const [h, m] = timePart.split(":").map(Number);
  const isPM = period === "PM";
  const hour24 = isPM && h < 12 ? h + 12 : !isPM && h === 12 ? 0 : h;
  const target = new Date(`${appt.date}T${String(hour24).padStart(2, "0")}:${String(m || 0).padStart(2, "0")}:00`);
  const count = useCountdown(target);

  if (count.expired) return null;

  return (
    <div className="fixed bottom-24 right-4 z-40 max-w-[220px] animate-fade-in">
      <div className="relative rounded-2xl bg-white border border-rose-soft/50 shadow-xl shadow-rose/10 p-4">
        <button
          onClick={() => setDismissed(true)}
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-rose-deep text-white flex items-center justify-center hover:scale-110 transition-transform"
        >
          <X className="h-3 w-3" />
        </button>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-rose-deep" />
          <span className="text-xs font-bold text-foreground uppercase tracking-wider">Countdown</span>
        </div>
        <p className="text-[11px] text-foreground/60 mb-2 truncate">{appt.service}</p>
        <div className="grid grid-cols-4 gap-1 text-center">
          {[
            { label: "Days", value: count.days },
            { label: "Hrs", value: count.hours },
            { label: "Min", value: count.minutes },
            { label: "Sec", value: count.seconds },
          ].map((seg) => (
            <div key={seg.label} className="bg-gradient-to-b from-rose-soft/40 to-white rounded-lg py-1.5">
              <div className="text-lg font-bold text-rose-deep leading-none">{String(seg.value).padStart(2, "0")}</div>
              <div className="text-[9px] text-foreground/50 uppercase tracking-wider mt-0.5">{seg.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
