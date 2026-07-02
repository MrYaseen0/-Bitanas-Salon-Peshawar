"use client";

import { MapPin, Phone, Clock, Navigation, Instagram, Facebook, Mail } from "lucide-react";
import { SALON } from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { ContactForm } from "@/components/site/contact-form";

export function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  // Determine today's status
  const todayIdx = new Date().getDay(); // 0 Sun .. 6 Sat
  const todayLabel = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][todayIdx];
  const todayHours = SALON.hours.find((h) => h.day === todayLabel);
  const isOpen = todayHours && !todayHours.closed;

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="absolute top-1/4 -left-40 h-[400px] w-[400px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Visit Us
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Find Your Way to <span className="text-gradient-rose">Bitanas</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            Conveniently located in Hayatabad, Peshawar. Walk in for a
            consultation or book ahead to secure your preferred time.
          </p>
        </div>

        <div
          ref={ref}
          className={`mt-12 grid lg:grid-cols-2 gap-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Map */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-rose/15 border border-rose-soft/50 h-[420px] lg:h-full min-h-[420px]">
            <iframe
              src={SALON.mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bitanas Salon Location Map"
              className="grayscale-[0.1]"
            />
            <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4 flex items-center gap-3 shadow-lg">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose to-rose-deep text-white">
                <MapPin className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {SALON.name}
                </p>
                <p className="text-xs text-foreground/60 truncate">
                  {SALON.address}
                </p>
              </div>
              <a
                href={SALON.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-rose-deep text-white px-3.5 py-2 text-xs font-semibold hover:bg-rose transition-colors"
              >
                <Navigation className="h-3.5 w-3.5" />
                Directions
              </a>
            </div>
          </div>

          {/* Info cards */}
          <div className="space-y-4">
            {/* Status card */}
            <div className="rounded-3xl bg-white border border-rose-soft/50 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`relative flex h-3 w-3 ${
                      isOpen ? "" : "opacity-40"
                    }`}
                  >
                    {isOpen && (
                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    )}
                    <span
                      className={`relative inline-flex h-3 w-3 rounded-full ${
                        isOpen ? "bg-green-500" : "bg-red-400"
                      }`}
                    />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {isOpen ? "Open Now" : "Closed Now"}
                    </p>
                    <p className="text-xs text-foreground/55">
                      {todayHours
                        ? todayHours.closed
                          ? "Opens Tuesday 10:30 AM"
                          : `Closes at ${todayHours.time.split("–")[1]?.trim() ?? "8:00 PM"}`
                        : "Check hours below"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact + hours */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href={SALON.phoneHref}
                className="group rounded-3xl bg-white border border-rose-soft/50 p-5 shadow-sm hover:shadow-lg hover:shadow-rose/10 hover:border-rose/40 transition-all"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-soft text-rose-deep group-hover:bg-rose group-hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-foreground/50">
                  Call Us
                </p>
                <p className="font-serif text-lg font-bold text-foreground">
                  {SALON.phone}
                </p>
              </a>
              <a
                href={`mailto:hello@bitanas.pk`}
                className="group rounded-3xl bg-white border border-rose-soft/50 p-5 shadow-sm hover:shadow-lg hover:shadow-rose/10 hover:border-rose/40 transition-all"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-soft text-rose-deep group-hover:bg-rose group-hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-foreground/50">
                  Email Us
                </p>
                <p className="font-serif text-lg font-bold text-foreground truncate">
                  hello@bitanas.pk
                </p>
              </a>
            </div>

            {/* Hours table */}
            <div className="rounded-3xl bg-white border border-rose-soft/50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-rose-deep" />
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Opening Hours
                </h3>
              </div>
              <ul className="space-y-2">
                {SALON.hours.map((h) => (
                  <li
                    key={h.day}
                    className={`flex items-center justify-between text-sm py-1.5 px-2 rounded-lg ${
                      h.day === todayLabel
                        ? "bg-rose-soft/50 font-semibold"
                        : ""
                    }`}
                  >
                    <span className="text-foreground/75">{h.day}</span>
                    <span
                      className={
                        h.closed
                          ? "text-foreground/40"
                          : "text-foreground font-medium"
                      }
                    >
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div className="rounded-3xl bg-gradient-to-r from-rose-deep via-rose to-rose-deep p-6 text-white flex items-center justify-between">
              <div>
                <p className="font-serif text-lg font-bold">Follow Our Journey</p>
                <p className="text-sm text-white/80">
                  @bitanas.salon · Daily inspo & offers
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={SALON.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 hover:bg-white hover:text-rose-deep transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={SALON.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 hover:bg-white hover:text-rose-deep transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form row */}
        <div className="mt-8 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Get In Touch
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-tight">
              Have a question?{" "}
              <span className="text-gradient-rose">Drop us a line.</span>
            </h3>
            <p className="mt-4 text-foreground/60 leading-relaxed">
              Whether it&apos;s a custom package enquiry, a beauty question, or
              feedback from your visit — we&apos;d love to hear from you. Fill
              out the form and our team will get back to you within 24 hours.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 text-sm text-foreground/70">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-soft text-rose-deep">
                  <Mail className="h-4 w-4" />
                </span>
                hello@bitanas.pk
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/70">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-soft text-rose-deep">
                  <Phone className="h-4 w-4" />
                </span>
                {SALON.phone}
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/70">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-soft text-rose-deep">
                  <Clock className="h-4 w-4" />
                </span>
                Mon – Sat, 10:30 AM – 8:00 PM
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
