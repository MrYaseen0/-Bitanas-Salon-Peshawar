import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimit(`booking:${ip}`, 5, 60000)) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }
  try {
    const body = await req.json();
    const { name, phone, email, service, artist, date, time, notes } = body;

    if (!name || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const booking = await db.booking.create({
      data: {
        name: String(name).slice(0, 120),
        phone: String(phone).slice(0, 40),
        email: email ? String(email).slice(0, 160) : null,
        service: String(service).slice(0, 160),
        artist: artist ? String(artist).slice(0, 80) : null,
        date: String(date).slice(0, 20),
        time: String(time).slice(0, 20),
        notes: notes ? String(notes).slice(0, 1000) : null,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      id: booking.id,
      message: "Booking received. Our team will confirm shortly.",
    });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json(
      { error: "Failed to submit booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await db.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        name: true,
        service: true,
        date: true,
        time: true,
        status: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ bookings });
  } catch (err) {
    console.error("Booking GET error:", err);
    return NextResponse.json({ bookings: [] });
  }
}
