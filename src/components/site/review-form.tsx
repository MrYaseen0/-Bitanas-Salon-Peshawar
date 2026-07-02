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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, PenLine, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/salon-data";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  rating: z.number().int().min(1, "Please pick a rating").max(5),
  service: z.string().optional(),
  comment: z.string().min(10, "Tell us a bit more (min 10 chars)").max(1500),
});

type FormValues = z.infer<typeof schema>;

export function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hover, setHover] = useState(0);
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
    defaultValues: { name: "", rating: 0, service: "", comment: "" },
  });

  const rating = watch("rating");

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          service: data.service || null,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: "Review Submitted!",
        description: "Thank you for sharing your Bitanas experience 💖",
      });
      setSuccess(true);
      reset();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = (o: boolean) => {
    setOpen(o);
    if (!o) {
      // reset success state shortly after close
      setTimeout(() => {
        setSuccess(false);
        reset();
      }, 250);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full bg-white border-rose-soft text-rose-deep hover:bg-rose-soft/60 h-12 px-8 text-base shadow-sm"
        >
          <PenLine className="h-5 w-5" />
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] rounded-3xl border-rose-soft/50 p-0 overflow-hidden gap-0">
        {/* Decorative header */}
        <div className="relative bg-gradient-to-br from-rose-deep via-rose to-rose-deep p-6 text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <DialogHeader className="relative space-y-1">
            <DialogTitle className="font-serif text-2xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold" />
              Share Your Experience
            </DialogTitle>
            <DialogDescription className="text-white/85 text-sm">
              Loved your visit? We&apos;d be honoured to hear from you.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white shadow-lg shadow-rose/30 animate-scale-in">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-foreground">
                Thank You! 💖
              </h3>
              <p className="mt-2 text-sm text-foreground/60 max-w-xs mx-auto">
                Your review has been submitted and will inspire others to glow
                with us.
              </p>
              <DialogClose asChild>
                <Button className="mt-5 rounded-full bg-gradient-to-r from-rose to-rose-deep text-white px-7">
                  Done
                </Button>
              </DialogClose>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Star rating */}
              <div>
                <label className="text-sm font-medium text-foreground/80 mb-2 block">
                  Your Rating <span className="text-rose-deep">*</span>
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setValue("rating", star, { shouldValidate: true })}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="transition-transform hover:scale-110"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={cn(
                          "h-8 w-8 transition-colors",
                          (hover || rating) >= star
                            ? "fill-gold text-gold"
                            : "fill-transparent text-foreground/25"
                        )}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-sm font-semibold text-rose-deep">
                      {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
                    </span>
                  )}
                </div>
                {errors.rating && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                  Your Name <span className="text-rose-deep">*</span>
                </label>
                <Input
                  {...register("name")}
                  placeholder="e.g. Ayesha K."
                  className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-11"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Service */}
              <div>
                <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                  Service you had (optional)
                </label>
                <Select onValueChange={(v) => setValue("service", v)}>
                  <SelectTrigger className="rounded-xl border-rose-soft focus:ring-rose/40 h-11">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl max-h-60">
                    {SERVICES.map((s) => (
                      <SelectItem key={s.id} value={s.name}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Comment */}
              <div>
                <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                  Your Review <span className="text-rose-deep">*</span>
                </label>
                <Textarea
                  {...register("comment")}
                  placeholder="Tell us about your experience..."
                  className="rounded-xl border-rose-soft focus-visible:ring-rose/40 min-h-28 resize-none"
                />
                {errors.comment && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.comment.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl bg-gradient-to-r from-rose to-rose-deep text-white shadow-lg shadow-rose/30 hover:scale-[1.01] transition-all h-12 font-semibold disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <PenLine className="h-4 w-4" />
                    Submit Review
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
