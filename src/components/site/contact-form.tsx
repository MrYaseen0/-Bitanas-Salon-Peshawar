"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  Loader2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(10, "Tell us a bit more (min 10 chars)").max(2000),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          subject: data.subject || null,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: "Message Sent! 💖",
        description: "We'll reply within 24 hours.",
      });
      setSuccess(true);
      reset();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please call us instead.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-3xl bg-white border border-rose-soft/50 p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white shadow-lg shadow-rose/30 animate-scale-in">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 font-serif text-xl font-bold text-foreground">
          Thank You! 💖
        </h3>
        <p className="mt-2 text-sm text-foreground/60 max-w-sm mx-auto">
          Your message is on its way to our team. We&apos;ll get back to you
          within 24 hours.
        </p>
        <Button
          onClick={() => setSuccess(false)}
          className="mt-5 rounded-full bg-gradient-to-r from-rose to-rose-deep text-white px-6"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl bg-white border border-rose-soft/50 p-6 sm:p-8 shadow-sm space-y-4"
    >
      <div className="flex items-center gap-2.5 mb-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-soft text-rose-deep">
          <MessageSquare className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-serif text-lg font-bold text-foreground leading-tight">
            Send Us a Message
          </h3>
          <p className="text-[11px] text-foreground/55">
            We typically reply within 24 hours
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 mb-1.5">
            <User className="h-4 w-4 text-rose-deep" />
            Name <span className="text-rose-deep">*</span>
          </label>
          <Input
            {...register("name")}
            placeholder="Your name"
            className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-11"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 mb-1.5">
            <Mail className="h-4 w-4 text-rose-deep" />
            Email <span className="text-rose-deep">*</span>
          </label>
          <Input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-11"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
          Subject (optional)
        </label>
        <Input
          {...register("subject")}
          placeholder="What's this about?"
          className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-11"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
          Message <span className="text-rose-deep">*</span>
        </label>
        <Textarea
          {...register("message")}
          placeholder="Tell us how we can help..."
          className="rounded-xl border-rose-soft focus-visible:ring-rose/40 min-h-28 resize-none"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full rounded-2xl bg-gradient-to-r from-rose to-rose-deep text-white shadow-lg shadow-rose/30 hover:shadow-rose/50 hover:scale-[1.01] transition-all h-12 font-semibold disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
      <p className="text-center text-[11px] text-foreground/45 flex items-center justify-center gap-1">
        <Sparkles className="h-3 w-3 text-gold" />
        Your details are safe with us — we never share your info.
      </p>
    </form>
  );
}
