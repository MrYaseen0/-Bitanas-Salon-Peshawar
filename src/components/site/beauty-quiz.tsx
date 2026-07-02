"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  Heart,
  Instagram,
} from "lucide-react";
import {
  QUIZ_QUESTIONS,
  getQuizResult,
  whatsappLink,
} from "@/lib/salon-data";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function BeautyQuiz() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const totalSteps = QUIZ_QUESTIONS.length;
  const isLast = step === totalSteps - 1;
  const result = done ? getQuizResult(answers) : null;

  const choose = (qid: string, value: string) => {
    const next = { ...answers, [qid]: value };
    setAnswers(next);
    // auto-advance after a short beat
    setTimeout(() => {
      if (isLast) {
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
  };

  const progress = done ? 100 : (step / totalSteps) * 100;

  return (
    <section
      id="quiz"
      className="relative py-24 sm:py-28 bg-gradient-to-b from-white via-rose-soft/20 to-white overflow-hidden"
    >
      <div className="absolute top-1/4 -right-32 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -left-32 h-[420px] w-[420px] rounded-full bg-rose-soft/40 blur-[120px] -z-10" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="divider-luxe text-rose-deep text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Find Your Match
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Not Sure Where to Start? <span className="text-gradient-rose">Take the Quiz</span>
          </h2>
          <p className="mt-5 text-foreground/60 leading-relaxed">
            Answer 3 quick questions and we&apos;ll recommend the perfect
            services for your glow-up — personalised to your needs.
          </p>
        </div>

        <div
          ref={ref}
          className={cn(
            "relative rounded-3xl bg-white border border-rose-soft/50 shadow-2xl shadow-rose/10 overflow-hidden transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Progress bar */}
          <div className="h-1.5 bg-rose-soft/40">
            <div
              className="h-full bg-gradient-to-r from-rose to-rose-deep transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {!done ? (
            <div className="p-6 sm:p-10">
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-soft px-3 py-1 text-xs font-bold text-rose-deep">
                  <Sparkles className="h-3 w-3" />
                  Question {step + 1} of {totalSteps}
                </span>
                <div className="flex gap-1.5">
                  {QUIZ_QUESTIONS.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        i === step
                          ? "w-8 bg-gradient-to-r from-rose to-rose-deep"
                          : i < step
                            ? "w-2 bg-rose-deep"
                            : "w-2 bg-rose-soft"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Question */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center mb-8">
                {QUIZ_QUESTIONS[step].question}
              </h3>

              {/* Options */}
              <div className="grid sm:grid-cols-2 gap-3">
                {QUIZ_QUESTIONS[step].options.map((opt) => {
                  const selected = answers[QUIZ_QUESTIONS[step].id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => choose(QUIZ_QUESTIONS[step].id, opt.value)}
                      className={cn(
                        "group flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all",
                        selected
                          ? "border-rose bg-rose-soft/40 shadow-md scale-[1.02]"
                          : "border-rose-soft/40 hover:border-rose/50 hover:bg-rose-soft/20"
                      )}
                    >
                      <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform">
                        {opt.emoji}
                      </span>
                      <span className="flex-1 font-semibold text-foreground">
                        {opt.label}
                      </span>
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                          selected
                            ? "bg-gradient-to-br from-rose to-rose-deep border-transparent text-white"
                            : "border-rose-soft text-transparent group-hover:border-rose/50"
                        )}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Back nav */}
              {step > 0 && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/50 hover:text-rose-deep transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Previous question
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Result */
            <div className="p-6 sm:p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white shadow-lg shadow-rose/30 animate-scale-in">
                <Heart className="h-8 w-8 fill-current" />
              </div>
              <h3 className="mt-5 font-serif text-2xl sm:text-3xl font-bold text-gradient-rose">
                {result?.title}
              </h3>
              <p className="mt-3 text-foreground/65 leading-relaxed max-w-md mx-auto">
                {result?.message}
              </p>

              {/* Recommended services */}
              <div className="mt-7 grid sm:grid-cols-3 gap-3">
                {result?.services.map((s) => (
                  <div
                    key={s.name}
                    className="rounded-2xl bg-rose-soft/30 border border-rose-soft/50 p-4 text-left"
                  >
                    <span className="text-2xl">{s.emoji}</span>
                    <p className="mt-1.5 font-semibold text-foreground text-sm">
                      {s.name}
                    </p>
                    <p className="text-xs text-rose-deep font-semibold mt-0.5">
                      {s.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={whatsappLink(
                    `Hi Bitanas Salon! ✨ I took your beauty quiz and got "${result?.title}". I'd love to book: ${result?.services
                      .map((s) => s.name)
                      .join(", ")}. Could you help?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose to-rose-deep text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-rose/25 hover:scale-[1.03] transition-transform"
                >
                  <Sparkles className="h-4 w-4" />
                  Book My Recommendations
                </a>
                <button
                  onClick={restart}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white border-2 border-rose-soft text-rose-deep hover:bg-rose-soft/50 px-6 py-3 text-sm font-semibold transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-foreground/45 flex items-center justify-center gap-1.5">
          <Instagram className="h-3.5 w-3.5 text-rose-deep" />
          This is just a guide — our artists will give you a personalised
          consultation at your visit.
        </p>
      </div>
    </section>
  );
}
