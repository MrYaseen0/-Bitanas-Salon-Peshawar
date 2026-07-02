import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimit(`careers:${ip}`, 5, 60000)) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }
  try {
    const body = await req.json();
    const { name, email, phone, position, experience, message } = body;

    if (!name || !email || !phone || !position || !message) {
      return NextResponse.json(
        { error: "Name, email, phone, position and message are required" },
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

    const entry = await db.jobApplication.create({
      data: {
        name: String(name).slice(0, 120),
        email: String(email).slice(0, 160),
        phone: String(phone).slice(0, 40),
        position: String(position).slice(0, 160),
        experience: experience ? String(experience).slice(0, 120) : null,
        message: String(message).slice(0, 2000),
      },
    });

    return NextResponse.json({
      success: true,
      id: entry.id,
      message: "Application received! Our HR team will be in touch within 5-7 days.",
    });
  } catch (err) {
    console.error("Careers API error:", err);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.jobApplication.count();
    return NextResponse.json({ applications: count });
  } catch {
    return NextResponse.json({ applications: 0 });
  }
}
