"use client";

import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  Check,
  ArrowRight,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
  Heart,
  X,
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
import {
  JOB_OPENINGS,
  PERKS,
  SALON,
  whatsappLink,
} from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function Careers() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [applyFor, setApplyFor] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    message: "",
  });

  const openApply = (title: string) => {
    setApplyFor(title);
    setForm((f) => ({ ...f, position: title }));
    setSuccess(false);
  };

  const closeApply = () => {
    setApplyFor(null);
    setForm({ name: "", email: "", phone: "", position: "", experience: "", message: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.position || !form.message) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: "Application Sent! 🎉",
        description: "Our HR team will be in touch within 5-7 days.",
      });
      setSuccess(true);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please WhatsApp us instead.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="careers"
      className="relative py-24 sm:py-28 bg-gradient-to-b from-white via-rose-soft/20 to-white"
    >
      <div className="absolute top-1/4 -left-32 h-[420px] w-[420px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Join Our Team
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Build Your Career at <span className="text-gradient-rose">Bitanas</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            We&apos;re always looking for passionate, talented artists to join
            our women-led team. Grow your craft in a supportive, luxurious
            environment.
          </p>
        </div>

        {/* Perks strip */}
        <div className="rounded-3xl bg-gradient-to-r from-rose-deep via-rose to-rose-deep p-6 sm:p-7 mb-10 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, white 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative">
            <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-white/80 mb-4">
              Why Work With Us
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PERKS.map((perk) => (
                <div key={perk} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-white/90">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job openings */}
        <div ref={ref} className="grid md:grid-cols-2 gap-5">
          {JOB_OPENINGS.map((job, i) => (
            <div
              key={job.id}
              className={cn(
                "group relative rounded-3xl bg-white border border-rose-soft/50 p-6 hover:shadow-2xl hover:shadow-rose/15 hover:border-rose/30 transition-all duration-500 card-lift",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose to-rose-deep text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Briefcase className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-foreground/55">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {job.type}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5" />
                        {job.experience}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-rose-soft text-rose-deep px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                  Open
                </span>
              </div>

              <p className="mt-4 text-sm text-foreground/60 leading-relaxed">
                {job.description}
              </p>

              <div className="mt-5 flex items-center gap-2">
                <Button
                  onClick={() => openApply(job.title)}
                  className="rounded-full bg-gradient-to-r from-rose to-rose-deep text-white px-5 h-10 text-sm group/btn"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
                <a
                  href={whatsappLink(
                    `Hi Bitanas Salon! ✨ I'm interested in the ${job.title} position. Could you share more details?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-rose-soft/60 text-rose-deep hover:bg-rose-soft px-4 h-10 inline-flex items-center text-sm font-semibold transition-colors"
                >
                  Enquire
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* General CTA */}
        <div className="mt-10 text-center rounded-3xl bg-white/60 border border-rose-soft/50 p-6">
          <p className="text-sm text-foreground/65">
            Don&apos;t see your role? We&apos;re always keen to meet talented
            artists.
          </p>
          <Button
            onClick={() => openApply("General Application")}
            variant="outline"
            className="mt-3 rounded-full border-rose-soft text-rose-deep hover:bg-rose-soft/50"
          >
            <Heart className="h-4 w-4" />
            Send Open Application
          </Button>
        </div>
      </div>

      {/* Application modal */}
      {applyFor && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up"
          onClick={closeApply}
        >
          <div
            className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-rose-deep via-rose to-rose-deep p-6 text-white overflow-hidden">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 30%, white 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              <button
                onClick={closeApply}
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                  <Briefcase className="h-3 w-3 text-gold" />
                  Application
                </span>
                <h3 className="mt-3 font-serif text-2xl font-bold">
                  {success ? "Application Sent! 🎉" : `Apply: ${applyFor}`}
                </h3>
                {!success && (
                  <p className="mt-1 text-sm text-white/80">
                    Fill in your details — our HR team will be in touch.
                  </p>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {success ? (
                <div className="text-center py-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white shadow-lg animate-scale-in">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <p className="mt-4 text-foreground/70 max-w-sm mx-auto">
                    Thank you for your interest in joining Bitanas Salon! Our HR
                    team will review your application and reach out within 5-7
                    working days.
                  </p>
                  <Button
                    onClick={closeApply}
                    className="mt-5 rounded-full bg-gradient-to-r from-rose to-rose-deep text-white px-6"
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                        Full Name <span className="text-rose-deep">*</span>
                      </label>
                      <Input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-11"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                        Phone <span className="text-rose-deep">*</span>
                      </label>
                      <Input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="03XX XXXXXXX"
                        className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-11"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                      Email <span className="text-rose-deep">*</span>
                    </label>
                    <Input
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      type="email"
                      placeholder="you@example.com"
                      className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-11"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                      Position <span className="text-rose-deep">*</span>
                    </label>
                    <Select
                      value={form.position}
                      onValueChange={(v) => setForm({ ...form, position: v })}
                    >
                      <SelectTrigger className="rounded-xl border-rose-soft focus:ring-rose/40 h-11">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {JOB_OPENINGS.map((j) => (
                          <SelectItem key={j.id} value={j.title}>
                            {j.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="General Application">
                          General Application
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                      Years of Experience
                    </label>
                    <Input
                      value={form.experience}
                      onChange={(e) => setForm({ ...form, experience: e.target.value })}
                      placeholder="e.g. 3 years"
                      className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-11"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                      Tell us about yourself <span className="text-rose-deep">*</span>
                    </label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share your experience, strengths, and why you'd love to join Bitanas..."
                      className="rounded-xl border-rose-soft focus-visible:ring-rose/40 min-h-28 resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-2xl bg-gradient-to-r from-rose to-rose-deep text-white shadow-lg shadow-rose/30 hover:scale-[1.01] transition-all h-12 font-semibold disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit Application
                      </>
                    )}
                  </Button>
                  <p className="text-center text-[11px] text-foreground/45">
                    Or WhatsApp us directly at {SALON.phone}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
