import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

function genCode(): string {
  const prefix = "BITANAS";
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let body = "";
  for (let i = 0; i < 6; i++) {
    body += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}-${body}`;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimit(`giftcard-purchase:${ip}`, 3, 60000)) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }
  try {
    const body = await req.json();
    const {
      buyerName,
      buyerEmail,
      buyerPhone,
      recipientName,
      recipientEmail,
      amount,
      message,
      deliveryDate,
    } = body;

    if (
      !buyerName ||
      !buyerEmail ||
      !buyerPhone ||
      !recipientName ||
      !recipientEmail ||
      !amount
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt < 1000) {
      return NextResponse.json(
        { error: "Amount must be at least PKR 1,000" },
        { status: 400 }
      );
    }

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_RE.test(String(buyerEmail)) || !EMAIL_RE.test(String(recipientEmail))) {
      return NextResponse.json(
        { error: "Please enter valid email addresses" },
        { status: 400 }
      );
    }

    // Create the order
    const order = await db.giftCardOrder.create({
      data: {
        buyerName: String(buyerName).slice(0, 120),
        buyerEmail: String(buyerEmail).slice(0, 160),
        buyerPhone: String(buyerPhone).slice(0, 40),
        recipientName: String(recipientName).slice(0, 120),
        recipientEmail: String(recipientEmail).slice(0, 160),
        amount: amt,
        message: message ? String(message).slice(0, 500) : null,
        deliveryDate: deliveryDate ? String(deliveryDate).slice(0, 20) : null,
        status: "issued",
      },
    });

    // Generate a unique gift card code
    let code = genCode();
    let attempts = 0;
    while (attempts < 5) {
      const existing = await db.giftCard.findUnique({ where: { code } });
      if (!existing) break;
      code = genCode();
      attempts++;
    }

    // Issue the actual gift card
    const card = await db.giftCard.create({
      data: {
        code,
        amount: amt,
        balance: amt,
        buyerName: String(buyerName),
        recipientName: String(recipientName),
        email: String(recipientEmail),
        status: "active",
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      cardCode: card.code,
      amount: amt,
      recipientName,
      message: `Gift card issued! Code: ${code}`,
    });
  } catch (err) {
    console.error("Gift card purchase error:", err);
    return NextResponse.json(
      { error: "Failed to process purchase. Please try again." },
      { status: 500 }
    );
  }
}
