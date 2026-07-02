import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimit(`contact:${ip}`, 5, 60000)) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_RE.test(String(email))) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const entry = await db.contactMessage.create({
      data: {
        name: String(name).slice(0, 120),
        email: String(email).slice(0, 160),
        subject: subject ? String(subject).slice(0, 200) : null,
        message: String(message).slice(0, 2000),
      },
    });

    return NextResponse.json({
      success: true,
      id: entry.id,
      message: "Thanks for reaching out! We'll reply within 24 hours.",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        message: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ messages: [] });
  }
}
