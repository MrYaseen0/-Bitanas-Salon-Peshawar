"use client";

import { useEffect, useState } from "react";
import { Clock, Zap, X } from "lucide-react";
import { SALON } from "@/lib/salon-data";
import { cn } from "@/lib/utils";

interface AvailabilityState {
  open: boolean;
  status: "open" | "closing-soon" | "closed" | "opening-soon";
  label: string;
  busyLevel: "quiet" | "moderate" | "busy";
  nextChange: string;
}

function computeAvailability(): AvailabilityState {
  const now = new Date();
  const dayIdx = now.getDay(); // 0 Sun .. 6 Sat
  const dayLabel = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][dayIdx];
  const todayHours = SALON.hours.find((h) => h.day === dayLabel);

  if (!todayHours || todayHours.closed) {
    // Find next opening day
    const dayNames = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let nextDay = dayIdx;
    let nextLabel = "";
    for (let i = 1; i <= 7; i++) {
      const checkIdx = (dayIdx + i) % 7;
      const checkLabel = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][checkIdx];
      const checkHours = SALON.hours.find((h) => h.day === checkLabel);
      if (checkHours && !checkHours.closed) {
        nextLabel = checkLabel;
        break;
      }
    }
    return {
      open: false,
      status: "closed",
      label: "Closed now",
      busyLevel: "quiet",
      nextChange: `Opens ${nextLabel}`,
    };
  }

  // Parse today's hours (format: "10:30 AM – 8:00 PM")
  const parts = todayHours.time.split("–").map((s) => s.trim());
  if (parts.length < 2) {
    return {
      open: false,
      status: "closed",
      label: "Closed today",
      busyLevel: "quiet",
      nextChange: "Opens tomorrow",
    };
  }

  const openTime = parseTime(parts[0]);
  const closeTime = parseTime(parts[1]);
  const currentMins = now.getHours() * 60 + now.getMinutes();

  if (currentMins < openTime) {
    const minsUntilOpen = openTime - currentMins;
    return {
      open: false,
      status: "opening-soon",
      label: minsUntilOpen <= 60 ? "Opening soon" : "Closed now",
      busyLevel: "quiet",
      nextChange: `Opens ${parts[0]}`,
    };
  }

  if (currentMins >= closeTime) {
    return {
      open: false,
      status: "closed",
      label: "Closed now",
      busyLevel: "quiet",
      nextChange: "Opens tomorrow",
    };
  }

  // Within open hours
  const minsUntilClose = closeTime - currentMins;
  if (minsUntilClose <= 60) {
    return {
      open: true,
      status: "closing-soon",
      label: "Closing soon",
      busyLevel: "moderate",
      nextChange: `Closes ${parts[1]}`,
    };
  }

  // Determine busy level by time of day (heuristic)
  const hour = now.getHours();
  let busyLevel: AvailabilityState["busyLevel"] = "moderate";
  if (hour >= 11 && hour < 13) busyLevel = "busy"; // lunch rush
  else if (hour >= 16 && hour < 19) busyLevel = "busy"; // evening rush
  else if (hour >= 13 && hour < 16) busyLevel = "moderate";
  else busyLevel = "quiet";

  return {
    open: true,
    status: "open",
    label: "Open now",
    busyLevel,
    nextChange: `Closes ${parts[1]}`,
  };
}

function parseTime(str: string): number {
  // "10:30 AM" → minutes since midnight
  const m = str.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 0;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const ap = m[3].toUpperCase();
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return h * 60 + min;
}

const BUSY_LABELS = {
  quiet: { label: "Quiet now", color: "text-green-600", dot: "bg-green-500" },
  moderate: { label: "Moderate", color: "text-amber-600", dot: "bg-amber-500" },
  busy: { label: "Busy", color: "text-rose-deep", dot: "bg-rose-deep" },
};

export function AvailabilityWidget() {
  // Lazy init computes on first client render (no setState-in-effect needed)
  const [state, setState] = useState<AvailabilityState | null>(() =>
    typeof window === "undefined" ? null : computeAvailability()
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Re-check every minute; setState only fires in interval callback (not effect body)
    const id = setInterval(() => setState(computeAvailability()), 60000);
    return () => clearInterval(id);
  }, []);

  if (!state || dismissed) return null;

  const busy = BUSY_LABELS[state.busyLevel];

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-[260px] animate-fade-up">
      <div
        className={cn(
          "relative rounded-2xl shadow-2xl border backdrop-blur-md overflow-hidden",
          state.open
            ? "bg-white/95 border-rose-soft/60"
            : "bg-white/95 border-muted"
        )}
      >
        {/* Status strip */}
        <div
          className={cn(
            "h-1",
            state.open
              ? "bg-gradient-to-r from-green-400 to-green-500"
              : "bg-gradient-to-r from-rose to-rose-deep"
          )}
        />

        <div className="p-3.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                {state.open && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                )}
                <span
                  className={cn(
                    "relative inline-flex h-2.5 w-2.5 rounded-full",
                    state.open ? "bg-green-500" : "bg-rose-deep"
                  )}
                />
              </span>
              <div>
                <p
                  className={cn(
                    "text-sm font-bold leading-tight",
                    state.open ? "text-green-700" : "text-rose-deep"
                  )}
                >
                  {state.label}
                </p>
                <p className="text-[10px] text-foreground/55 flex items-center gap-1 mt-0.5">
                  <Clock className="h-2.5 w-2.5" />
                  {state.nextChange}
                </p>
              </div>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-foreground/30 hover:text-foreground/60 transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Busy level (only when open) */}
          {state.open && (
            <div className="mt-3 pt-3 border-t border-rose-soft/40 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-foreground/45 font-semibold flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Live
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-semibold",
                  busy.color
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse-soft", busy.dot)} />
                {busy.label}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
