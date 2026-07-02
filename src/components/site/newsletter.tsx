"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle2, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useReveal } from "@/hooks/use-reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast({
        title: "Welcome to the family! 💖",
        description: data.message,
      });
      setDone(true);
      setEmail("");
    } catch (err: any) {
      toast({
        title: "Couldn't subscribe",
        description: err?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-rose-deep via-rose to-rose-deep p-8 sm:p-12 lg:p-16 text-white shadow-2xl shadow-rose/30 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Decorative pattern */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
              backgroundSize: "28px 28px, 36px 36px",
            }}
          />
          {/* Floating blobs */}
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            {/* Copy */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="h-3 w-3 text-gold" />
                Beauty Insider
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Get exclusive offers &amp; beauty tips
              </h2>
              <p className="mt-3 text-white/80 leading-relaxed max-w-md">
                Join our insider list for first dibs on seasonal deals, bridal
                packages, and expert beauty advice — straight to your inbox.
              </p>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-gold" />
                  Exclusive discounts
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-gold" />
                  Early bridal slots
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-gold" />
                  No spam, ever
                </span>
              </div>
            </div>

            {/* Form */}
            <div className="lg:pl-6">
              {done ? (
                <div className="rounded-3xl bg-white/15 backdrop-blur border border-white/20 p-7 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-rose-deep shadow-lg animate-scale-in">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-bold">
                    You&apos;re In! 💖
                  </h3>
                  <p className="mt-2 text-white/85 text-sm">
                    Check your inbox for a welcome gift — a little something to
                    start your glow journey.
                  </p>
                  <button
                    onClick={() => setDone(false)}
                    className="mt-4 text-xs text-white/70 underline hover:text-white"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={subscribe}
                  className="rounded-3xl bg-white/15 backdrop-blur border border-white/20 p-5 sm:p-6 space-y-3"
                >
                  <label className="block text-sm font-medium text-white/90">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-12 pl-11 rounded-xl bg-white/95 border-transparent text-foreground placeholder:text-foreground/40 focus-visible:ring-gold/50"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-white text-rose-deep hover:bg-cream font-semibold shadow-lg disabled:opacity-70 group"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Gift className="h-5 w-5" />
                        Subscribe &amp; Get 10% Off
                      </>
                    )}
                  </Button>
                  <p className="text-center text-[11px] text-white/65">
                    By subscribing you agree to receive beauty emails from
                    Bitanas Salon. Unsubscribe anytime.
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
