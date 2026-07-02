import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimit(`waitlist:${ip}`, 5, 60000)) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }
  try {
    const body = await req.json();
    const { name, phone, service, preferredDate, notes } = body;

    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: "Name, phone and service are required" },
        { status: 400 }
      );
    }

    const entry = await db.waitlist.create({
      data: {
        name: String(name).slice(0, 120),
        phone: String(phone).slice(0, 40),
        service: String(service).slice(0, 160),
        preferredDate: preferredDate ? String(preferredDate).slice(0, 20) : null,
        notes: notes ? String(notes).slice(0, 500) : null,
      },
    });

    return NextResponse.json({
      success: true,
      id: entry.id,
      message: "You're on the waitlist! We'll call you the moment a slot opens up.",
    });
  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json(
      { error: "Failed to join waitlist. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.waitlist.count();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
