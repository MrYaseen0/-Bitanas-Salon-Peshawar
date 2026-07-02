"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Gift,
  User,
  Mail,
  Phone,
  Calendar,
  Loader2,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  X,
} from "lucide-react";
import { GIFT_CARDS } from "@/lib/salon-data";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const schema = z.object({
  buyerName: z.string().min(2, "Please enter your name"),
  buyerEmail: z.string().email("Valid email required"),
  buyerPhone: z.string().min(8, "Valid phone required"),
  recipientName: z.string().min(2, "Recipient name required"),
  recipientEmail: z.string().email("Valid recipient email required"),
  amount: z.number().min(1000, "Minimum PKR 1,000"),
  message: z.string().optional(),
  deliveryDate: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function GiftCardPurchase({
  presetAmount,
  triggerLabel,
  variant = "primary",
}: {
  presetAmount?: number;
  triggerLabel: string;
  variant?: "primary" | "outline";
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{
    code: string;
    amount: number;
    recipient: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      buyerName: "",
      buyerEmail: "",
      buyerPhone: "",
      recipientName: "",
      recipientEmail: "",
      amount: presetAmount ?? 5000,
      message: "",
      deliveryDate: "",
    },
  });

  const selectedAmount = watch("amount");

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/giftcard/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          message: data.message || null,
          deliveryDate: data.deliveryDate || null,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed");
      toast({
        title: "Gift Card Issued! 🎁",
        description: `Code: ${result.cardCode}`,
      });
      setSuccess({
        code: result.cardCode,
        amount: result.amount,
        recipient: result.recipientName,
      });
      reset();
    } catch (err: any) {
      toast({
        title: "Purchase failed",
        description: err?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const copyCode = async () => {
    if (!success) return;
    try {
      await navigator.clipboard.writeText(success.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* noop */
    }
  };

  const handleClose = (o: boolean) => {
    setOpen(o);
    if (!o) {
      setTimeout(() => {
        setSuccess(null);
        setCustomAmount(null);
        reset();
      }, 250);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "rounded-full h-11 px-7 text-sm font-semibold transition-all",
            variant === "primary"
              ? "bg-gradient-to-r from-rose to-rose-deep text-white shadow-lg shadow-rose/25 hover:scale-[1.03]"
              : "bg-white border-2 border-rose-soft text-rose-deep hover:bg-rose-soft/50"
          )}
        >
          <Gift className="h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] rounded-3xl border-rose-soft/50 p-0 overflow-hidden gap-0 max-h-[90vh] overflow-y-auto">
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
          <DialogClose asChild>
            <button
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
          <DialogHeader className="relative space-y-1">
            <DialogTitle className="font-serif text-2xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold" />
              {success ? "Gift Card Ready!" : "Buy a Gift Card"}
            </DialogTitle>
            <DialogDescription className="text-white/85 text-sm">
              {success
                ? "Your gift card has been issued successfully."
                : "Treat someone special to the Bitanas experience."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          {success ? (
            /* Success state */
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white shadow-lg shadow-rose/30 animate-scale-in">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-foreground">
                All Set! 🎁
              </h3>
              <p className="mt-2 text-sm text-foreground/60 max-w-xs mx-auto">
                Your gift card for <strong>{success.recipient}</strong> worth{" "}
                <strong>PKR {success.amount.toLocaleString()}</strong> is ready.
                Share the code below:
              </p>

              {/* Code box */}
              <button
                onClick={copyCode}
                className="mt-5 w-full rounded-2xl bg-gradient-to-br from-rose-soft/40 to-gold-soft/30 border-2 border-dashed border-rose/40 px-4 py-4 flex items-center justify-between gap-2 hover:bg-rose-soft/30 transition-colors group"
              >
                <span className="font-mono font-bold text-xl text-rose-deep tracking-wider">
                  {success.code}
                </span>
                {copied ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Copy className="h-5 w-5 text-rose-deep/60 group-hover:text-rose-deep" />
                )}
              </button>
              <p className="mt-2 text-[11px] text-foreground/45">
                Tap to copy · The recipient can check balance anytime on this
                page.
              </p>

              <DialogClose asChild>
                <Button className="mt-5 rounded-full bg-gradient-to-r from-rose to-rose-deep text-white px-7">
                  Done
                </Button>
              </DialogClose>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Amount picker */}
              <div>
                <label className="text-sm font-medium text-foreground/80 mb-2 block">
                  Choose Amount <span className="text-rose-deep">*</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {GIFT_CARDS.map((c) => (
                    <button
                      key={c.amount}
                      type="button"
                      onClick={() => {
                        setValue("amount", c.amount, { shouldValidate: true });
                        setCustomAmount(null);
                      }}
                      className={cn(
                        "rounded-xl py-2.5 text-xs font-bold border-2 transition-all",
                        selectedAmount === c.amount && !customAmount
                          ? "border-rose bg-rose-soft/40 text-rose-deep shadow-sm"
                          : "border-rose-soft/40 text-foreground/70 hover:border-rose/40"
                      )}
                    >
                      {(c.amount / 1000).toFixed(0)}k
                    </button>
                  ))}
                </div>
                {/* Custom amount */}
                <div className="mt-2 relative">
                  <Input
                    type="number"
                    placeholder="Custom amount (min 1,000)"
                    value={customAmount ?? ""}
                    onChange={(e) => {
                      const v = e.target.value ? Number(e.target.value) : null;
                      setCustomAmount(v);
                      if (v && v >= 1000) {
                        setValue("amount", v, { shouldValidate: true });
                      }
                    }}
                    className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-10 pr-16"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-foreground/40">
                    PKR
                  </span>
                </div>
                {errors.amount && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {/* Buyer info */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 mb-1.5">
                    <User className="h-3.5 w-3.5 text-rose-deep" />
                    Your Name <span className="text-rose-deep">*</span>
                  </label>
                  <Input
                    {...register("buyerName")}
                    placeholder="Your name"
                    className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-10"
                  />
                  {errors.buyerName && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.buyerName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 mb-1.5">
                    <Phone className="h-3.5 w-3.5 text-rose-deep" />
                    Your Phone <span className="text-rose-deep">*</span>
                  </label>
                  <Input
                    {...register("buyerPhone")}
                    placeholder="03XX XXXXXXX"
                    className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-10"
                  />
                  {errors.buyerPhone && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.buyerPhone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 mb-1.5">
                  <Mail className="h-3.5 w-3.5 text-rose-deep" />
                  Your Email <span className="text-rose-deep">*</span>
                </label>
                <Input
                  {...register("buyerEmail")}
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-10"
                />
                {errors.buyerEmail && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.buyerEmail.message}
                  </p>
                )}
              </div>

              {/* Recipient info */}
              <div className="pt-2 border-t border-rose-soft/40">
                <p className="text-xs font-bold uppercase tracking-wider text-rose-deep mb-3">
                  Recipient Details
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 mb-1.5">
                      <User className="h-3.5 w-3.5 text-rose-deep" />
                      Recipient Name <span className="text-rose-deep">*</span>
                    </label>
                    <Input
                      {...register("recipientName")}
                      placeholder="Their name"
                      className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-10"
                    />
                    {errors.recipientName && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.recipientName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 mb-1.5">
                      <Mail className="h-3.5 w-3.5 text-rose-deep" />
                      Recipient Email <span className="text-rose-deep">*</span>
                    </label>
                    <Input
                      {...register("recipientEmail")}
                      type="email"
                      placeholder="them@example.com"
                      className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-10"
                    />
                    {errors.recipientEmail && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.recipientEmail.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Optional message + date */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 mb-1.5">
                    <Calendar className="h-3.5 w-3.5 text-rose-deep" />
                    Delivery date (optional)
                  </label>
                  <Input
                    {...register("deliveryDate")}
                    type="date"
                    min={today}
                    className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-10"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground/80 mb-1.5 block">
                    Personal message (optional)
                  </label>
                  <Input
                    {...register("message")}
                    placeholder="Happy birthday! 💖"
                    className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl bg-gradient-to-r from-rose to-rose-deep text-white shadow-lg shadow-rose/30 hover:scale-[1.01] transition-all h-12 font-semibold disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Issuing Gift Card...
                  </>
                ) : (
                  <>
                    <Gift className="h-5 w-5" />
                    Issue Gift Card · PKR {(selectedAmount || 0).toLocaleString()}
                  </>
                )}
              </Button>
              <p className="text-center text-[10px] text-foreground/45">
                Demo mode — no payment processed. The card code is generated
                instantly and can be used at the salon.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
