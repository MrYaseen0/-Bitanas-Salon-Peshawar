"use client";
import { useState, useEffect } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { calculateGlowScore, type GlowScoreResult, glowShareText } from "@/lib/glow-score";
import { QUIZ_QUESTIONS, whatsappLink } from "@/lib/salon-data";
import { Sparkles, Heart, RotateCcw, Share2, Check, ArrowRight } from "lucide-react";

export function GlowScoreCard() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<GlowScoreResult | null>(null);
  const [copied, setCopied] = useState(false);

  const choose = (qid: string, value: string) => {
    const next = { ...answers, [qid]: value };
    setAnswers(next);
    setTimeout(() => {
      if (step >= QUIZ_QUESTIONS.length - 1) {
        const r = calculateGlowScore(next);
        setResult(r);
        setDone(true);
      } else {
        setStep((s) => s + 1);
      }
    }, 250);
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
    setResult(null);
  };

  const progress = done ? 100 : (step / QUIZ_QUESTIONS.length) * 100;

  const handleShare = () => {
    const text = result ? glowShareText(result) : "";
    if (navigator.share) {
      navigator.share({ title: "My Bitanas Glow Score", text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <section id="glow-score" className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-rose-soft/15 via-white to-transparent" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            What&apos;s Your <span className="text-gradient-rose">Glow Score</span>?
          </h2>
          <p className="mt-4 text-foreground/60 leading-relaxed">
            Answer 3 quick questions for a personalised radiance score.
          </p>
        </div>

        <div ref={ref} className={cn("relative rounded-3xl bg-white border border-rose-soft/20 shadow-lg overflow-hidden transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="h-1 bg-rose-soft/30">
            <div className="h-full bg-foreground transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          {!done ? (
            <div className="p-6 sm:p-10">
              <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-soft/50 px-3 py-1 text-xs font-semibold text-foreground/60">
                    Question {step + 1} of {QUIZ_QUESTIONS.length}
                  </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center mb-8">
                {QUIZ_QUESTIONS[step].question}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {QUIZ_QUESTIONS[step].options.map((opt) => {
                  const selected = answers[QUIZ_QUESTIONS[step].id] === opt.value;
                  return (
                    <button key={opt.value} onClick={() => choose(QUIZ_QUESTIONS[step].id, opt.value)}
                      className={cn("group flex items-center gap-4 p-4 rounded-2xl border text-left transition-all", selected ? "border-foreground bg-foreground/5" : "border-rose-soft/30 hover:border-rose/30 hover:bg-rose-soft/10")}>
                      <span className="flex-1 font-semibold text-foreground">{opt.label}</span>
                      <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all", selected ? "bg-foreground border-transparent text-white" : "border-rose-soft")}>
                        <Check className="h-3 w-3" />
                      </span>
                    </button>
                  );
                })}
              </div>
              {step > 0 && (
                <div className="mt-6 flex justify-center">
                  <button onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/50 hover:text-rose-deep transition-colors">
                    <ArrowRight className="h-4 w-4 rotate-180" /> Previous
                  </button>
                </div>
              )}
            </div>
          ) : result && (
            <div className="p-6 sm:p-10 text-center">
              <div className="mx-auto w-24 h-24 rounded-full bg-foreground text-white flex items-center justify-center animate-scale-in">
                <Sparkles className="h-8 w-8" />
              </div>
              <div className="mt-4">
                <span className="text-5xl font-bold font-serif text-foreground">{result.score}</span>
                <span className="text-foreground/40 text-xl">/100</span>
              </div>
              <h3 className="mt-2 font-serif text-2xl font-bold text-foreground">{result.label}</h3>
              <p className="mt-3 text-foreground/60 leading-relaxed max-w-md mx-auto text-sm">
                Your personalised glow plan.
              </p>

              <div className="mt-6 space-y-2 max-w-sm mx-auto">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-soft/10 text-left">
                    <Sparkles className="h-4 w-4 text-foreground/40 shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{rec}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                <a href={whatsappLink(`Hi Bitanas Salon! My Glow Score is ${result.score}/100 — ${result.label}. I'd love to book a session.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-white px-6 py-3 text-sm font-semibold hover:scale-[1.03] transition-transform">
                  <Sparkles className="h-4 w-4" /> Book My Glow-Up
                </a>
                <button onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-rose-soft text-foreground/60 hover:border-rose/50 px-6 py-3 text-sm font-semibold transition-colors">
                  {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                  {copied ? "Copied!" : "Share Score"}
                </button>
                <button onClick={restart}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-rose-soft text-foreground/60 hover:border-rose/50 px-6 py-3 text-sm font-semibold transition-colors">
                  <RotateCcw className="h-4 w-4" /> Retake
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
