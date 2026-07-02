"use client";

import { Languages, Check } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ur", label: "Roman Urdu", flag: "🇵🇰" },
];

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-soft/60 text-rose-deep hover:bg-rose-soft transition-colors"
        aria-label="Change language"
        title={`Language: ${current.label}`}
      >
        <Languages className="h-5 w-5" />
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute right-0 top-12 z-50 w-44 rounded-2xl bg-white border border-rose-soft/60 shadow-xl p-1.5 origin-top-right transition-all duration-200",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none"
        )}
      >
        <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground/40">
          Select Language
        </p>
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => {
              setLang(l.code);
              setOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left",
              lang === l.code
                ? "bg-rose-soft/60 text-rose-deep"
                : "text-foreground/75 hover:bg-rose-soft/30"
            )}
          >
            <span className="text-base">{l.flag}</span>
            <span className="flex-1">{l.label}</span>
            {lang === l.code && <Check className="h-4 w-4" />}
          </button>
        ))}
      </div>
    </div>
  );
}
