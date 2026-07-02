"use client";
import { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { Gift, Sparkles, RotateCcw, Check } from "lucide-react";
import { playWheelTick, playWheelWin } from "@/lib/audio-feedback";

const SEGMENTS = [
  { label: "5% Off", color: "#fecdd3", textColor: "#be123c", weight: 20 },
  { label: "10% Off", color: "#fda4af", textColor: "#be123c", weight: 18 },
  { label: "15% Off", color: "#fb7185", textColor: "#881337", weight: 10 },
  { label: "Free Upgrade", color: "#e11d48", textColor: "#fff", weight: 5 },
  { label: "Free Brow Shape", color: "#f43f5e", textColor: "#fff", weight: 12 },
  { label: "500 Bonus Pts", color: "#fecdd3", textColor: "#be123c", weight: 15 },
  { label: "20% Off Next", color: "#fda4af", textColor: "#be123c", weight: 8 },
  { label: "Try Again!", color: "#fb7185", textColor: "#881337", weight: 12 },
];

const TOTAL_WEIGHT = SEGMENTS.reduce((a, s) => a + s.weight, 0);

export function MysteryWheel() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [lastUsed, setLastUsed] = useLocalStorage<string>("bitanas:wheel-last", "");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canSpin = () => {
    if (!lastUsed) return true;
    const diff = Date.now() - new Date(lastUsed).getTime();
    return diff > 24 * 60 * 60 * 1000;
  };

  const pickSegment = () => {
    const r = Math.random() * TOTAL_WEIGHT;
    let c = 0;
    for (let i = 0; i < SEGMENTS.length; i++) {
      c += SEGMENTS[i].weight;
      if (r <= c) return i;
    }
    return 0;
  };

  const drawWheel = (rot: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const cx = w / 2, cy = w / 2, r = w / 2 - 4;
    const segAngle = (2 * Math.PI) / SEGMENTS.length;

    ctx.clearRect(0, 0, w, w);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);

    for (let i = 0; i < SEGMENTS.length; i++) {
      const startAngle = i * segAngle - Math.PI / 2;
      const endAngle = startAngle + segAngle;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = SEGMENTS[i].color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.rotate(startAngle + segAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = SEGMENTS[i].textColor;
      ctx.font = "bold 11px sans-serif";
      ctx.fillText(SEGMENTS[i].label, r - 12, 4);
      ctx.restore();
    }

    ctx.restore();
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, 2 * Math.PI);
    ctx.fillStyle = "#e11d48";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const spin = () => {
    if (spinning || !canSpin()) return;
    setSpinning(true);
    setResult(null);
    const seg = pickSegment();
    const segAngle = 360 / SEGMENTS.length;
    const targetSegCenter = seg * segAngle + segAngle / 2;
    const extraSpins = 5 + Math.floor(Math.random() * 4);
    const totalRot = extraSpins * 360 + (360 - targetSegCenter) + Math.random() * 10;
    const newRot = rotation + totalRot;
    setRotation(newRot);

    const startTime = Date.now();
    const duration = 4000;

    let lastTick = 0;
    function animate() {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const currentRot = rotation + totalRot * ease;
      drawWheel((currentRot * Math.PI) / 180);
      const tickInterval = Math.max(30, 200 - p * 190);
      if (elapsed - lastTick > tickInterval) { playWheelTick(); lastTick = elapsed; }
      if (p < 1) requestAnimationFrame(animate);
      else {
        setSpinning(false);
        setResult(SEGMENTS[seg].label);
        setLastUsed(new Date().toISOString());
        playWheelWin();
      }
    }
    animate();
  };

  useEffect(() => { drawWheel(0); }, []);

  return (
    <section id="mystery-wheel" className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-rose-soft/20 via-white to-transparent" />
      <div className="absolute bottom-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-rose-soft/20 blur-[120px] -z-10" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
          Spin & <span className="text-gradient-rose">Win</span>
        </h2>
        <p className="mt-4 text-foreground/60 leading-relaxed max-w-md mx-auto">
          One free spin per day. Discounts, upgrades & bonus points await.
        </p>

        <div ref={ref} className={cn("mt-10 flex flex-col items-center gap-6 transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-rose-deep drop-shadow-lg" />
            </div>
            <canvas ref={canvasRef} width={280} height={280} className="rounded-full shadow-lg" />
          </div>

          {!canSpin() && !result ? (
            <p className="text-sm text-foreground/50 flex items-center gap-1.5">
              <Check className="h-4 w-4 text-green-500" /> Come back tomorrow for your next spin!
            </p>
          ) : (
            <button
              onClick={spin}
              disabled={spinning}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold transition-all",
                spinning
                  ? "bg-rose-soft text-rose-deep cursor-not-allowed"
                  : "bg-foreground text-white hover:bg-foreground/90"
              )}
            >
              {spinning ? (
                <><RotateCcw className="h-4 w-4 animate-spin" /> Spinning...</>
              ) : (
                <><Gift className="h-4 w-4" /> Spin the Wheel</>
              )}
            </button>
          )}

          {result && (
            <div className="animate-scale-in rounded-2xl bg-foreground text-white p-6 shadow-lg max-w-xs">
              <Sparkles className="h-6 w-6 mx-auto" />
              <p className="mt-2 font-bold text-lg">You won: {result}!</p>
              <p className="text-xs text-white/70 mt-1">Show this screen at the salon to claim.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
