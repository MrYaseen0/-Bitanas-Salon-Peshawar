import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimit(`newsletter:${ip}`, 5, 60000)) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const clean = email.trim().toLowerCase().slice(0, 160);

    // Upsert so re-subscribing doesn't error on the unique constraint
    const sub = await db.newsletter.upsert({
      where: { email: clean },
      update: {},
      create: { email: clean },
    });

    return NextResponse.json({
      success: true,
      id: sub.id,
      message: "You're subscribed! Watch your inbox for beauty tips & offers.",
    });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.newsletter.count();
    return NextResponse.json({ subscribers: count });
  } catch {
    return NextResponse.json({ subscribers: 0 });
  }
}
