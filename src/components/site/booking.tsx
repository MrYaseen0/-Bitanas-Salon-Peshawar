"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Sparkles,
  CheckCircle2,
  Loader2,
  Stethoscope,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICES, SALON, WHATSAPP_DEFAULT } from "@/lib/salon-data";
import { useToast } from "@/hooks/use-toast";
import { useReveal } from "@/hooks/use-reveal";
import { playBookingChime } from "@/lib/audio-feedback";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  artist: z.string().optional(),
  date: z.string().min(1, "Please pick a date"),
  time: z.string().min(1, "Please pick a time"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const TIME_SLOTS = [
  "10:30 AM",
  "11:30 AM",
  "12:30 PM",
  "1:30 PM",
  "2:30 PM",
  "3:30 PM",
  "4:30 PM",
  "5:30 PM",
  "6:30 PM",
];

export function Booking() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { service: "", artist: "", date: "", time: "" },
  });

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) setValue("service", detail, { shouldValidate: true });
    };
    window.addEventListener("bitanas:select-service", handler);
    return () => window.removeEventListener("bitanas:select-service", handler);
  }, [setValue]);

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          email: data.email || null,
          artist: data.artist || null,
          notes: data.notes || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit booking");
      const result = await res.json();
      toast({
        title: "Booking Received!",
        description: `We'll confirm your appointment shortly. Reference: ${result.id?.slice(-6).toUpperCase() ?? "BIT"}`,
      });
      setSuccess(true);
      reset();
      playBookingChime();

      const ref = result.id?.slice(-6).toUpperCase() ?? "BIT";
      window.dispatchEvent(new CustomEvent("bitanas:booking-success", { detail: ref }));
      window.dispatchEvent(new CustomEvent("bitanas:appointment-booked", {
        detail: { date: data.date, time: data.time, service: data.service },
      }));
      try {
        const visits = JSON.parse(localStorage.getItem("bitanas:visits") || "[]");
        visits.push(new Date().toISOString());
        localStorage.setItem("bitanas:visits", JSON.stringify(visits));
      } catch {}
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="booking"
      className="relative py-24 sm:py-28 bg-gradient-to-b from-rose-soft/30 to-white"
    >
      <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-rose/10 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left info panel */}
          <div
            ref={ref}
            className={`lg:col-span-2 transition-all duration-700 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Book Appointment
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Reserve Your <span className="text-gradient-rose">Beauty Session</span>
            </h2>
            <p className="mt-5 text-foreground/60 leading-relaxed">
              Fill in your details and our front desk will confirm your
              appointment within a few hours. For urgent or same-day bookings,
              please call us directly.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/70 border border-rose-soft/50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-soft text-rose-deep">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                    Call / WhatsApp
                  </p>
                  <a
                    href={SALON.phoneHref}
                    className="font-serif text-lg font-bold text-foreground hover:text-rose-deep transition-colors"
                  >
                    {SALON.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/70 border border-rose-soft/50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-soft text-rose-deep">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                    Opening Hours
                  </p>
                  <p className="text-sm text-foreground/80 mt-0.5">
                    Mon – Sat: 10:30 AM – 8:00 PM
                  </p>
                  <p className="text-sm text-foreground/60">Friday: 2:00 PM – 8:00 PM · Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/70 border border-rose-soft/50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-soft text-rose-deep">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                    Why Book With Us?
                  </p>
                  <ul className="mt-1.5 space-y-1 text-sm text-foreground/70">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-rose-deep" />
                      Free 10-min consultation
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-rose-deep" />
                      Flexible rescheduling
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-rose-deep" />
                      Choose your preferred artist
                    </li>
                  </ul>
                </div>
              </div>

              {/* WhatsApp quick book */}
              <a
                href={WHATSAPP_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1ebe57] text-white shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold leading-tight">
                      Quick Book on WhatsApp
                    </p>
                    <p className="text-xs text-white/85 mt-0.5">
                      Fastest reply · Usually within minutes
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {success ? (
              <div className="rounded-3xl bg-white border border-rose-soft/50 p-10 text-center shadow-xl">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white shadow-lg shadow-rose/30 animate-scale-in">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-bold text-foreground">
                  Booking Request Sent!
                </h3>
                <p className="mt-3 text-foreground/60 max-w-md mx-auto">
                  Thank you for choosing Bitanas Salon. Our team will reach out
                  on WhatsApp within a few hours to confirm your slot.
                </p>
                <Button
                  onClick={() => setSuccess(false)}
                  className="mt-6 rounded-full bg-gradient-to-r from-rose to-rose-deep text-white px-7"
                >
                  Book Another Appointment
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative rounded-3xl bg-white border border-rose-soft/50 overflow-hidden shadow-xl shadow-rose/10"
              >
                {/* Luxury gradient header strip */}
                <div className="relative bg-gradient-to-r from-rose-deep via-rose to-rose-deep px-6 sm:px-8 py-4 text-white overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 30%, white 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                  <div className="relative flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                      <Calendar className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-serif text-lg font-bold leading-tight">
                        Appointment Request
                      </p>
                      <p className="text-[11px] text-white/80">
                        We&apos;ll confirm on WhatsApp within a few hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Full Name"
                    icon={<User className="h-4 w-4" />}
                    error={errors.name?.message}
                  >
                    <Input
                      {...register("name")}
                      placeholder="e.g. Ayesha Khan"
                      className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-11"
                    />
                  </Field>
                  <Field
                    label="Phone Number"
                    icon={<Phone className="h-4 w-4" />}
                    error={errors.phone?.message}
                  >
                    <Input
                      {...register("phone")}
                      placeholder="03XX XXXXXXX"
                      className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-11"
                    />
                  </Field>
                </div>

                <Field
                  label="Email (optional)"
                  icon={<Mail className="h-4 w-4" />}
                  error={errors.email?.message}
                >
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-11"
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Service"
                    icon={<Stethoscope className="h-4 w-4" />}
                    error={errors.service?.message}
                  >
                    <Select
                      onValueChange={(v) => setValue("service", v, { shouldValidate: true })}
                      value={watch("service")}
                    >
                      <SelectTrigger className="rounded-xl border-rose-soft focus:ring-rose/40 h-11">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl max-h-72">
                        {SERVICES.map((s) => (
                          <SelectItem key={s.id} value={s.name} className="rounded-lg">
                            <span className="flex items-center gap-2">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-soft text-rose-deep font-medium">
                                {s.category}
                              </span>
                              {s.name}
                              <span className="text-muted-foreground">· {s.price}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field
                    label="Preferred Artist (optional)"
                    icon={<Sparkles className="h-4 w-4" />}
                  >
                    <Select
                      onValueChange={(v) => setValue("artist", v)}
                      value={watch("artist")}
                    >
                      <SelectTrigger className="rounded-xl border-rose-soft focus:ring-rose/40 h-11">
                        <SelectValue placeholder="Any available" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Bitana">Bitana — Lead MUA</SelectItem>
                        <SelectItem value="Sana">Sana — Hair Stylist</SelectItem>
                        <SelectItem value="Areeba">Areeba — Nail & Spa</SelectItem>
                        <SelectItem value="Mehwish">Mehwish — Skincare</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Preferred Date"
                    icon={<Calendar className="h-4 w-4" />}
                    error={errors.date?.message}
                  >
                    <Input
                      {...register("date")}
                      type="date"
                      min={today}
                      className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-11"
                    />
                  </Field>
                  <Field
                    label="Preferred Time"
                    icon={<Clock className="h-4 w-4" />}
                    error={errors.time?.message}
                  >
                    <Select
                      onValueChange={(v) => setValue("time", v, { shouldValidate: true })}
                      value={watch("time")}
                    >
                      <SelectTrigger className="rounded-xl border-rose-soft focus:ring-rose/40 h-11">
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {TIME_SLOTS.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                <Field label="Notes (optional)">
                  <Textarea
                    {...register("notes")}
                    placeholder="Tell us about your skin concerns, references, allergies, or any special requests..."
                    className="rounded-xl border-rose-soft focus-visible:ring-rose/40 min-h-24 resize-none"
                  />
                </Field>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-2xl bg-gradient-to-r from-rose to-rose-deep text-white shadow-xl shadow-rose/30 hover:shadow-rose/50 hover:scale-[1.01] transition-all h-13 py-3.5 text-base font-semibold disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Confirm Booking Request
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-foreground/50">
                  By booking, you agree to our cancellation policy. No payment
                  required now — pay at the salon.
                </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 mb-1.5">
        {icon && <span className="text-rose-deep">{icon}</span>}
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
