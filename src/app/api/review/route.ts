import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimit(`review:${ip}`, 5, 60000)) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }
  try {
    const body = await req.json();
    const { name, rating, service, comment } = body;

    if (!name || !rating || !comment) {
      return NextResponse.json(
        { error: "Name, rating and comment are required" },
        { status: 400 }
      );
    }

    const r = Number(rating);
    if (!Number.isInteger(r) || r < 1 || r > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const review = await db.review.create({
      data: {
        name: String(name).slice(0, 120),
        rating: r,
        service: service ? String(service).slice(0, 120) : null,
        comment: String(comment).slice(0, 1500),
        approved: true,
      },
    });

    return NextResponse.json({
      success: true,
      id: review.id,
      message: "Thank you! Your review has been submitted.",
    });
  } catch (err) {
    console.error("Review API error:", err);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const reviews = await db.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        name: true,
        rating: true,
        service: true,
        comment: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ reviews });
  } catch (err) {
    console.error("Review GET error:", err);
    return NextResponse.json({ reviews: [] });
  }
}
