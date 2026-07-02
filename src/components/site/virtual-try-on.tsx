"use client";
import { useState, useRef, useEffect } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { Upload, Sparkles, RotateCcw, Eye, EyeOff, Check } from "lucide-react";

const COLORS = [
  { name: "Honey Blonde", hex: "#d4a574" },
  { name: "Chocolate Brown", hex: "#6b3a2a" },
  { name: "Caramel Balayage", hex: "#c68e5b" },
  { name: "Burgundy", hex: "#6a0d3a" },
  { name: "Jet Black", hex: "#1a1a1a" },
  { name: "Rose Gold", hex: "#e8a0bf" },
  { name: "Platinum Blonde", hex: "#e8ddd0" },
  { name: "Auburn", hex: "#922724" },
];

export function VirtualTryOn() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [image, setImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedColorName, setSelectedColorName] = useState<string>("");
  const [overlayOpacity, setOverlayOpacity] = useState(0.3);
  const [showOriginal, setShowOriginal] = useState(false);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
      setSelectedColor("");
      setSelectedColorName("");
      setOverlayOpacity(0.3);
      setShowOriginal(false);
    };
    reader.readAsDataURL(file);
  };

  const applyColor = () => {
    if (!image || !selectedColor || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;
    const img = imgRef.current;
    if (!img) return;
    const maxW = 400;
    const scale = maxW / img.width;
    canvas.width = maxW;
    canvas.height = img.height * scale;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    if (showOriginal) return;
    ctx.globalCompositeOperation = "color";
    ctx.globalAlpha = overlayOpacity;
    ctx.fillStyle = selectedColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    setLoading(false);
  };

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      if (!selectedColor) {
        const maxW = 400;
        const scale = maxW / img.width;
        canvas.width = maxW;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setLoading(false);
      }
    };
    img.src = image;
  }, [image]);

  useEffect(() => {
    if (!image || !selectedColor || !canvasRef.current) return;
    setLoading(true);
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth) {
      applyColor();
    } else {
      const check = setInterval(() => {
        if (imgRef.current?.complete && imgRef.current?.naturalWidth) {
          clearInterval(check);
          applyColor();
        }
      }, 50);
      return () => clearInterval(check);
    }
  }, [selectedColor, overlayOpacity, showOriginal, image]);

  const pickColor = (hex: string, name: string) => {
    if (hex === selectedColor) {
      setSelectedColor("");
      setSelectedColorName("");
    } else {
      setSelectedColor(hex);
      setSelectedColorName(name);
    }
  };

  const reset = () => {
    setImage(null);
    setSelectedColor("");
    setSelectedColorName("");
    setOverlayOpacity(0.3);
    setShowOriginal(false);
  };

  const whatsappMsg = selectedColorName
    ? `Hi Bitanas Salon! I'd love to book a service to get this hair colour: ${selectedColorName} (from your Virtual Try-On)`
    : "Hi Bitanas Salon! I'd love to book a service I tried on your Virtual Try-On.";

  return (
    <section id="virtual-try-on" className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-rose-soft/15 via-white to-transparent" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Virtual <span className="text-gradient-rose">Try-On</span>
          </h2>
          <p className="mt-4 text-foreground/60 leading-relaxed">
            Upload a selfie and see yourself with different hair colours instantly.
          </p>
        </div>

        <div ref={ref} className={cn("transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="rounded-2xl bg-white border border-rose-soft/20 shadow-md overflow-hidden">
            <div className="p-6 sm:p-8">
              {!image ? (
                <div className="flex flex-col items-center justify-center h-[320px]">
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="cursor-pointer flex flex-col items-center gap-3 p-10 rounded-2xl border border-dashed border-rose-soft/30 hover:border-foreground/30 hover:bg-rose-soft/10 transition-all"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-soft/30 text-foreground/50">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="font-semibold text-foreground">Upload Your Photo</p>
                    <p className="text-xs text-foreground/50">Tap to upload a selfie or portrait</p>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </div>
              ) : (
                <div>
                  <div className="relative rounded-2xl overflow-hidden bg-rose-soft/10">
                    {loading && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    )}
                    <canvas ref={canvasRef} className="w-full h-auto" />
                    {selectedColor && (
                      <button
                        onClick={() => setShowOriginal(!showOriginal)}
                        className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-white/80 backdrop-blur px-2.5 py-1.5 text-[10px] font-semibold text-foreground/60 hover:bg-white hover:text-foreground transition-all shadow-sm"
                      >
                        {showOriginal ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        {showOriginal ? "See colour" : "Original"}
                      </button>
                    )}
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground/50 mb-3">Choose a colour</p>
                    <div className="flex flex-wrap gap-2">
                      {COLORS.map((c) => (
                        <button key={c.name} onClick={() => pickColor(c.hex, c.name)}
                          className={cn("flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all", selectedColor === c.hex ? "border-foreground bg-foreground/5 ring-1 ring-foreground/20" : "border-rose-soft/20 hover:border-foreground/30")}>
                          <span className="h-4 w-4 rounded-full border border-white/30 shrink-0" style={{ backgroundColor: c.hex }} />
                          {c.name}
                          {selectedColor === c.hex && <Check className="h-3 w-3 text-foreground/60" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedColor && (
                    <div className="mt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-foreground/50 mb-2">Intensity</p>
                      <input
                        type="range" min="0.05" max="0.55" step="0.05"
                        value={overlayOpacity}
                        onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                        className="w-full accent-rose-deep"
                      />
                      <div className="flex justify-between text-[10px] text-foreground/40 mt-1">
                        <span>Subtle</span>
                        <span>Bold</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 flex gap-2">
                    <button onClick={() => fileRef.current?.click()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-soft/30 text-foreground/60 py-2.5 text-xs font-semibold hover:bg-rose-soft/10 transition-colors">
                      <Upload className="h-3.5 w-3.5" /> New Photo
                    </button>
                    <button onClick={reset}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-soft/30 text-foreground/60 py-2.5 text-xs font-semibold hover:bg-rose-soft/10 transition-colors">
                      <RotateCcw className="h-3.5 w-3.5" /> Reset
                    </button>
                    <a
                      href={`https://wa.me/923709931504?text=${encodeURIComponent(whatsappMsg)}`}
                      target="_blank" rel="noopener noreferrer"
                      className={cn("flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-opacity", selectedColor ? "bg-foreground text-white hover:opacity-90" : "bg-foreground/20 text-foreground/40 pointer-events-none")}>
                      <Sparkles className="h-3.5 w-3.5" /> Book This
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
