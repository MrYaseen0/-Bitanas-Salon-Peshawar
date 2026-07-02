import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET — check balance by code
export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) {
      return NextResponse.json(
        { error: "Please enter a gift card code" },
        { status: 400 }
      );
    }

    const clean = code.trim().toUpperCase();
    const card = await db.giftCard.findUnique({
      where: { code: clean },
    });

    if (!card) {
      return NextResponse.json(
        { error: "No gift card found with that code. Please check and try again." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      code: card.code,
      amount: card.amount,
      balance: card.balance,
      status: card.status,
      recipientName: card.recipientName,
      issued: card.createdAt,
    });
  } catch (err) {
    console.error("Gift card check error:", err);
    return NextResponse.json(
      { error: "Failed to check balance. Please try again." },
      { status: 500 }
    );
  }
}

// POST — seed demo gift cards (only if none exist, for demo purposes)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "seed") {
      const existing = await db.giftCard.count();
      if (existing > 0) {
        return NextResponse.json({ message: "Demo cards already exist", count: existing });
      }
      // Create a few demo gift cards
      const demos = [
        { code: "BITANAS-GLOW-5000", amount: 5000, balance: 5000, recipientName: "Ayesha" },
        { code: "BITANAS-GLAM-10000", amount: 10000, balance: 3500, recipientName: "Sara" },
        { code: "BITANAS-LUXE-25000", amount: 25000, balance: 25000, recipientName: "Hira" },
      ];
      await db.giftCard.createMany({ data: demos });
      return NextResponse.json({ success: true, count: demos.length });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("Gift card seed error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
