"use client";
import { useEffect, useState } from "react";
import { fireConfetti } from "@/lib/confetti";

export function BookingFireworks() {
  const [show, setShow] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      const ref = (e as CustomEvent<string>).detail;
      setBookingRef(ref);
      setShow(true);
      fireConfetti(120);
      setTimeout(() => setShow(false), 5000);
    };
    window.addEventListener("bitanas:booking-success", handler);
    return () => window.removeEventListener("bitanas:booking-success", handler);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-rose-soft/20 p-8 text-center shadow-lg animate-scale-in max-w-sm pointer-events-auto">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-white">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 font-serif text-2xl font-bold text-foreground">Booking Confirmed!</h3>
        <p className="mt-2 text-foreground/60 text-sm">Your appointment is confirmed.</p>
        {bookingRef && (
          <p className="mt-2 text-xs text-foreground/50 font-mono">Ref: {bookingRef}</p>
        )}
      </div>
    </div>
  );
}
