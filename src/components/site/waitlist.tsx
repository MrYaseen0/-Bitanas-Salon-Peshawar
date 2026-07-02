"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Clock,
  User,
  Phone,
  Calendar,
  Loader2,
  CheckCircle2,
  Bell,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICES, SALON } from "@/lib/salon-data";
import { useToast } from "@/hooks/use-toast";
import { useReveal } from "@/hooks/use-reveal";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(8, "Please enter a valid phone"),
  service: z.string().min(1, "Please pick a service"),
  preferredDate: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function Waitlist() {
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
    defaultValues: { name: "", phone: "", service: "", preferredDate: "" },
  });

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          preferredDate: data.preferredDate || null,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: "You're on the list! 🔔",
        description: "We'll call you the moment a slot opens.",
      });
      setSuccess(true);
      reset();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please call us instead.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="relative py-20 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-rose-deep via-rose to-rose-deep p-8 sm:p-12 shadow-2xl shadow-rose/30 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Decorative pattern */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
              backgroundSize: "26px 26px, 34px 34px",
            }}
          />
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />

          <div className="relative grid lg:grid-cols-5 gap-8 items-center">
            {/* Copy */}
            <div className="lg:col-span-2 text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                <Bell className="h-3 w-3 text-gold animate-pulse-soft" />
                Waitlist Available
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Couldn&apos;t get your preferred slot?
              </h2>
              <p className="mt-3 text-white/85 leading-relaxed">
                Join our waitlist and we&apos;ll notify you the moment a slot
                opens up for your chosen service. No waiting on hold — we&apos;ll
                call you.
              </p>
              <div className="mt-5 space-y-2 text-sm text-white/80">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold" />
                  Free to join, no obligation
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold" />
                  Priority over walk-ins
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold" />
                  Notified within 24-48 hours typically
                </p>
              </div>
            </div>

            {/* Form / success */}
            <div className="lg:col-span-3">
              {success ? (
                <div className="rounded-3xl bg-white/15 backdrop-blur border border-white/20 p-7 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-rose-deep shadow-lg animate-scale-in">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-bold text-white">
                    You&apos;re on the list! 🔔
                  </h3>
                  <p className="mt-2 text-white/85 text-sm">
                    Sit back &amp; relax. Our team will call you on{" "}
                    <strong>{SALON.phone}</strong> the moment a slot opens up.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 text-xs text-white/70 underline hover:text-white"
                  >
                    Add another request
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="rounded-3xl bg-white/15 backdrop-blur border border-white/20 p-5 sm:p-6 space-y-3"
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-medium text-white/90 mb-1.5">
                        <User className="h-3.5 w-3.5" />
                        Name <span className="text-gold">*</span>
                      </label>
                      <Input
                        {...register("name")}
                        placeholder="Your name"
                        className="h-10 rounded-lg bg-white/95 border-transparent text-foreground placeholder:text-foreground/40 focus-visible:ring-gold/50"
                      />
                      {errors.name && (
                        <p className="mt-1 text-[11px] text-gold">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-medium text-white/90 mb-1.5">
                        <Phone className="h-3.5 w-3.5" />
                        Phone <span className="text-gold">*</span>
                      </label>
                      <Input
                        {...register("phone")}
                        placeholder="03XX XXXXXXX"
                        className="h-10 rounded-lg bg-white/95 border-transparent text-foreground placeholder:text-foreground/40 focus-visible:ring-gold/50"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-[11px] text-gold">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-white/90 mb-1.5 block">
                        Service <span className="text-gold">*</span>
                      </label>
                      <Select
                        onValueChange={(v) =>
                          setValue("service", v, { shouldValidate: true })
                        }
                        value={watch("service")}
                      >
                        <SelectTrigger className="h-10 rounded-lg bg-white/95 border-transparent text-foreground focus:ring-gold/50">
                          <SelectValue placeholder="Choose service" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg max-h-60">
                          {SERVICES.map((s) => (
                            <SelectItem key={s.id} value={s.name}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p className="mt-1 text-[11px] text-gold">
                          {errors.service.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-medium text-white/90 mb-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        Preferred date
                      </label>
                      <Input
                        {...register("preferredDate")}
                        type="date"
                        min={today}
                        className="h-10 rounded-lg bg-white/95 border-transparent text-foreground focus-visible:ring-gold/50"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-11 rounded-xl bg-white text-rose-deep hover:bg-cream font-semibold shadow-lg disabled:opacity-70 group"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        <Bell className="h-4 w-4" />
                        Join the Waitlist
                        <Sparkles className="h-4 w-4 text-gold" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-[10px] text-white/65 flex items-center justify-center gap-1">
                    <Clock className="h-3 w-3" />
                    We&apos;ll call within 24-48 hours when a slot opens
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
